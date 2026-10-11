/** Verify the frozen compiled MCP Worker in isolated Workerd.
 * Outbound traffic is intercepted: only fixed-origin Aperi GET fixtures are
 * allowed. No production key, account, provider, signer or financial operation
 * is used. Build packages/mcp-server first, then run this file with Node 24.
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';

const require = createRequire(new URL('../package.json', import.meta.url));
const { Miniflare } = require('miniflare');
const bundle = new URL('../.cloudflare/output/v0/workers/default/bundle/index.js', import.meta.url);
const compiled = await readFile(bundle);
const manifest = JSON.parse(await readFile(new URL('.vite/manifest.json', bundle), 'utf8'));
const modules = { 'index.js': { type: 'esm', contents: compiled.toString('utf8') } };
for (const entry of Object.values(manifest)) if (entry.file !== 'index.js') {
  modules[entry.file] = { type: 'esm', contents: await readFile(new URL(entry.file, bundle), 'utf8') };
}
// Miniflare transports preserve the supplied URL but replace Host with their
// loopback bridge authority. Normalize that harness-only header before calling
// the unchanged compiled Worker. The controlled override proves its guard is
// still enforced; this module is not part of a deployed artifact.
modules['fixture-entry.js'] = { type: 'esm', contents: `
import worker from './index.js';
export default { fetch(request, env, ctx) {
  const headers = new Headers(request.headers);
  headers.set('host', headers.get('x-fixture-host') ?? new URL(request.url).host);
  headers.delete('x-fixture-host');
  if (headers.has('x-fixture-origin')) headers.set('origin', headers.get('x-fixture-origin'));
  headers.delete('x-fixture-origin');
  return worker.fetch(new Request(request, { headers }), env, ctx);
} };
` };
const service = 'https://mcp.aperi.trade';
const market = 'hyperliquid.xyz.NVDA.USDC';
const wallet = '0x' + '0'.repeat(40);
const clock = 1791742930089;
const price = '9007199254740993.0000000001';
const cases = [];
const outbound = [];
let rejectedOutbound = 0;
const fixtureFailures = [];
let nextId = 1;
const products = Array.from({ length: 12 }, (_, i) => ({ id: i === 0 ? 'NVDA' : `PRODUCT${i}`, symbol: i === 0 ? 'NVDA' : `PRODUCT${i}`, name: 'Isolated public product', category: 'equity', route: { venue: 'hyperliquid', marketId: market } }));
const positions = Array.from({ length: 8 }, (_, i) => ({ marketId: market, size: String(i), financialAuthority: false }));
const fixture = pathname => {
  const common = { status: 'available', sourceTime: clock, price, financialAuthority: false, executionQualified: false };
  if (pathname === '/api/v1/products') return { ...common, products };
  if (pathname === '/api/v1/products/NVDA') return { ...common, product: products[0] };
  if (pathname === '/api/v1/markets') return { ...common, markets: [{ id: market, symbol: 'NVDA', name: 'Isolated native contract', venue: 'hyperliquid', category: 'equity' }] };
  if (pathname === `/api/v1/markets/${market}`) return { ...common, market: { id: market, maxLeverage: 5 } };
  if (pathname === `/api/v1/markets/${market}/quote`) return { ...common, quote: { price, volume24h: null, sourceTime: clock } };
  if (pathname === `/api/v1/markets/${market}/book`) return { ...common, book: { bids: [[price, '1']], asks: [[price, '2']] } };
  if (pathname === `/api/v1/markets/${market}/trades`) return { ...common, trades: [{ price, time: clock }] };
  if (pathname === `/api/v1/markets/${market}/candles`) return { ...common, candles: [{ time: 1791742930, open: price, high: price, low: price, close: price, volume: null }] };
  if (pathname === '/api/v1/venues') return { ...common, venues: [{ id: 'hyperliquid', orderBook: true }] };
  if (pathname === `/api/v1/accounts/${wallet}`) return { ...common, account: { wallet, positions, coverage: 'public-only', equity: null } };
  if (pathname === '/api/v1/capital/status') return { ...common, funding: { enabled: false, financialAuthority: false } };
  if (pathname === '/api/v1/calendar') return { ...common, status: 'partial', sources: { economic: { status: 'unavailable' }, earnings: { status: 'available' } }, days: [{ date: '2026-10-12', events: [], earnings: [] }] };
  if (pathname === '/api/v1/leaderboard') return { ...common, entries: [{ rank: 1, displayName: 'Isolated opted-in fixture', optedIn: true }] };
  if (pathname === '/api/v1/health') return { ...common, health: 'edge-only' };
  if (pathname === '/api/v1/status') return { ...common, financialGateway: { enabled: false } };
  if (pathname === '/api/v1/capabilities') return { ...common, financialGatewayEnabled: false };
  return undefined;
};
const runtime = new Miniflare({ host: '127.0.0.1', port: 0, cf: false, logRequests: false, telemetry: { enabled: false }, workers: [{
  config: { name: 'aperi-mcp-isolated-runtime', compatibilityDate: '2026-10-11', manifest: { mainModule: 'fixture-entry.js', modules }, env: {
    MCP_REQUEST_BUDGET: { type: 'rate-limit', namespace: '10411101', simple: { limit: 60, period: 60 } },
    MCP_GLOBAL_BUDGET: { type: 'rate-limit', namespace: '10411102', simple: { limit: 1000, period: 60 } },
    MCP_DATA_BUDGET: { type: 'rate-limit', namespace: '10411103', simple: { limit: 90, period: 60 } }
  } },
  dev: { outboundService: { type: 'fetcher', handler: async request => {
    try {
    const url = new URL(request.url);
    const data = fixture(url.pathname);
    if (url.origin !== 'https://aperi.trade' || request.method !== 'GET' || data === undefined || request.headers.has('authorization') || request.headers.has('cookie') || request.headers.has('x-api-key')) {
      rejectedOutbound++;
      throw new Error('Isolated MCP runtime forbids non-Aperi destinations, non-GET operations and credentials');
    }
    assert.equal(await request.text(), '');
    assert.equal(request.headers.get('accept'), 'application/json');
    assert.equal(request.headers.get('user-agent'), 'aperi-mcp/0.1.0');
    if (url.pathname.endsWith('/candles')) {
      assert.equal(url.searchParams.get('interval'), '30m');
      assert.equal(url.searchParams.get('limit'), '2');
    } else if (url.pathname === '/api/v1/calendar') assert.equal(url.search, '?week=2026-10-12');
    else assert.equal(url.search, '');
    outbound.push({ method: request.method, path: url.pathname, credentials: false });
    return Response.json(data);
    } catch (error) { fixtureFailures.push(String(error)); throw error; }
  } } }
}] });
const entry = await runtime.getWorker('aperi-mcp-isolated-runtime');

const modernMessage = (method, params = {}, id = nextId++) => ({ jsonrpc: '2.0', id, method, params: { ...params, _meta: { 'io.modelcontextprotocol/protocolVersion': '2026-07-28', 'io.modelcontextprotocol/clientInfo': { name: 'isolated-workerd-proof', version: '1.0.0' }, 'io.modelcontextprotocol/clientCapabilities': {} } } });
function headers(message, legacy = false) {
  // Miniflare's local bridge otherwise inserts its loopback Host; the compiled
  // Worker enforces the production authority independently of request.url.
  return { host: 'mcp.aperi.trade', 'content-type': 'application/json', accept: 'application/json, text/event-stream', 'cf-connecting-ip': '192.0.2.20', 'mcp-protocol-version': legacy ? '2025-11-25' : '2026-07-28', 'mcp-method': message.method, ...(message.params?.name || message.params?.uri ? { 'mcp-name': message.params.name ?? message.params.uri } : {}) };
}
async function bounded(work, milliseconds = 5000) {
  let timer;
  try { return await Promise.race([work, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('COMPILED_MCP_EXCHANGE_DID_NOT_TERMINATE')), milliseconds); })]); }
  finally { clearTimeout(timer); }
}
async function decode(response) {
  if (response.headers.get('content-type')?.startsWith('application/json')) return response.json();
  assert.ok(response.headers.get('content-type')?.startsWith('text/event-stream'));
  const frames = (await bounded(response.text())).split('\n').filter(line => line.startsWith('data:')).map(line => JSON.parse(line.slice(5).trim()));
  assert.ok(frames.length > 0);
  return frames.at(-1);
}
async function send(label, message, { expected = 200, legacy = false, extraHeaders = {}, path = '/mcp', method = 'POST' } = {}) {
  const requestHeaders = { ...headers(message, legacy), ...extraHeaders };
  // The RPC bridge rejects remote Origin before reaching a user Worker. Deliver
  // the controlled header inside the fixture wrapper to exercise its own guard.
  if (requestHeaders.origin) { requestHeaders['x-fixture-origin'] = requestHeaders.origin; delete requestHeaders.origin; }
  const response = await bounded(entry.fetch(service + path, { method, headers: requestHeaders, ...(method === 'GET' ? {} : { body: JSON.stringify(message) }) }));
  const failureCode = response.status !== expected ? (await response.clone().json().catch(() => ({}))).error?.code : undefined;
  assert.equal(response.status, expected, label + (failureCode ? ` (${failureCode})` : ''));
  assert.equal(response.headers.get('cache-control'), 'no-store', label + ' headers:' + JSON.stringify([...response.headers]) + ' status:' + response.status);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
  assert.match(response.headers.get('x-request-id') ?? '', /^[a-f0-9-]{36}$/);
  const result = await bounded(decode(response));
  cases.push({ label, httpStatus: response.status, protocol: legacy ? '2025-11-25' : '2026-07-28', contentType: response.headers.get('content-type'), errorCode: result.error?.code ?? result.result?.structuredContent?.error?.code ?? null, requestId: response.headers.get('x-request-id') });
  return result;
}
const tools = {
  aperi_list_products: { limit: 2 }, aperi_get_product: { productId: 'NVDA' },
  aperi_list_markets: { limit: 2 }, aperi_get_market: { marketId: market },
  aperi_get_quote: { marketId: market }, aperi_get_order_book: { marketId: market },
  aperi_get_recent_trades: { marketId: market }, aperi_get_candles: { marketId: market, interval: '30m', limit: 2 },
  aperi_list_venues: {}, aperi_read_public_account: { wallet, limit: 2 },
  aperi_get_capital_status: {}, aperi_get_calendar: { week: '2026-10-12', limit: 2 },
  aperi_get_leaderboard: { limit: 2 }, aperi_get_health: {},
  aperi_get_platform_status: {}, aperi_get_capabilities: {}
};
try {
  const listing = await send('modern tool discovery validates compiled schemas', modernMessage('tools/list'));
  assert.deepEqual(listing.result.tools.map(tool => tool.name).sort(), Object.keys(tools).sort());
  for (const tool of listing.result.tools) {
    assert.ok(tool.title);
    assert.equal(tool.annotations.readOnlyHint, true);
    assert.equal(tool.annotations.destructiveHint, false);
  }
  const initialization = await send('legacy initialization completes its SSE exchange', { jsonrpc: '2.0', id: nextId++, method: 'initialize', params: { protocolVersion: '2025-11-25', capabilities: {}, clientInfo: { name: 'isolated-legacy-proof', version: '1.0.0' } } }, { legacy: true });
  assert.equal(initialization.result.protocolVersion, '2025-11-25');
  const oldListing = await send('legacy stateless discovery survives per-request teardown', { jsonrpc: '2.0', id: nextId++, method: 'tools/list', params: {} }, { legacy: true });
  assert.equal(oldListing.result.tools.length, 16);
  for (const [name, args] of Object.entries(tools)) {
    const body = await send('compiled valid tool: ' + name, modernMessage('tools/call', { name, arguments: args }));
    assert.equal(body.result.isError, undefined, name + ' ' + JSON.stringify(body.result.structuredContent) + ' ' + fixtureFailures.join(';'));
    const output = body.result.structuredContent;
    assert.equal(output.ok, true, name);
    assert.equal(output.data.price, price, name);
    assert.equal(output.data.sourceTime, clock, name);
    assert.equal(output.data.financialAuthority, false, name);
    assert.equal(output.provenance.api, 'https://aperi.trade/api/v1');
    if (name === 'aperi_list_products') { assert.equal(output.data.products.length, 2); assert.equal(output.pagination.total, 12); assert.equal(output.pagination.nextOffset, 2); }
    if (name === 'aperi_read_public_account') { assert.equal(output.data.account.positions.length, 2); assert.equal(output.truncatedCollections[0].total, 8); }
    if (name === 'aperi_get_calendar') { assert.equal(output.data.status, 'partial'); assert.equal(output.data.sources.economic.status, 'unavailable'); }
    if (name === 'aperi_get_candles') assert.equal(output.data.candles[0].volume, null);
  }
  const legacyCall = await send('legacy real tool response completes after upstream read', { jsonrpc: '2.0', id: nextId++, method: 'tools/call', params: { name: 'aperi_get_quote', arguments: { marketId: market } } }, { legacy: true });
  assert.equal(legacyCall.result.structuredContent.data.quote.price, price);
  const references = await send('compiled complete operation resource stays reference-only', modernMessage('resources/read', { uri: 'aperi://api/operations' }));
  const index = JSON.parse(references.result.contents[0].text);
  assert.equal(index.referenceOnly, true);
  assert.equal(index.executableOperations.length, 16);
  assert.ok(index.operationCount > 16);
  const protectedOperation = index.operations.find(operation => operation.method === 'POST' && /orders|funding/.test(operation.path));
  assert.ok(protectedOperation);
  const protectedDoc = await send('financial operation resource cannot execute its documented route', modernMessage('resources/read', { uri: `aperi://api/operations/${protectedOperation.id}` }));
  assert.equal(JSON.parse(protectedDoc.result.contents[0].text).executableThroughThisMcp, false);
  const beforeAttacks = outbound.length;
  for (const [name, args] of [
    ['aperi_submit_order', { marketId: market }],
    ['aperi_transfer_assets', { wallet }],
    ['aperi_get_health', { authorization: 'isolated-refused-secret' }],
    ['aperi_get_quote', { marketId: 'https://foreign.example.invalid/collect' }],
    ['aperi_get_quote', { marketId: market, privateKey: 'isolated-refused-secret' }]
  ]) {
    const body = await send('compiled refusal: ' + name + Object.keys(args).join(','), modernMessage('tools/call', { name, arguments: args }));
    assert.ok(body.error || body.result?.isError);
  }
  assert.equal(outbound.length, beforeAttacks);
  await send('credential header is refused at public ingress', modernMessage('tools/list'), { expected: 400, extraHeaders: { authorization: 'Bearer isolated-refused-secret' } });
  await send('compiled production Host guard remains active', modernMessage('tools/list'), { expected: 403, extraHeaders: { 'x-fixture-host': 'foreign.example.invalid' } });
  await send('foreign Origin is refused at public ingress', modernMessage('tools/list'), { expected: 403, extraHeaders: { origin: 'https://foreign.example.invalid' } });
  await send('retired MCP authority is refused', modernMessage('tools/list'), { expected: 403, extraHeaders: { 'x-fixture-host': 'mcp.aperi.io' } });
  await send('retired app Origin is refused', modernMessage('tools/list'), { expected: 403, extraHeaders: { origin: 'https://aperi.io' } });
  await send('retired MCP Origin is refused', modernMessage('tools/list'), { expected: 403, extraHeaders: { origin: 'https://mcp.aperi.io' } });
  await send('modern header/body mismatch is refused by compiled SDK', modernMessage('tools/list'), { expected: 400, extraHeaders: { 'mcp-method': 'tools/call' } });
  const missingResource = await send('unknown resource produces a protocol error, never network I/O', modernMessage('resources/read', { uri: 'https://foreign.example.invalid/collect' }));
  assert.ok(missingResource.error);
  assert.equal(outbound.length, beforeAttacks);
  const beforeAccount = outbound.filter(call => call.path.startsWith('/api/v1/accounts/')).length;
  await send('public account observation is not served from public market cache', modernMessage('tools/call', { name: 'aperi_read_public_account', arguments: { wallet, limit: 2 } }));
  assert.equal(outbound.filter(call => call.path.startsWith('/api/v1/accounts/')).length, beforeAccount + 1);
  const parallel = await Promise.all(Array.from({ length: 8 }, (_, i) => send(`parallel request ${i + 1} keeps identity and source units`, modernMessage('tools/call', { name: 'aperi_get_quote', arguments: { marketId: market } }), { extraHeaders: { 'cf-connecting-ip': `192.0.2.${30 + i}` } })));
  assert.equal(new Set(parallel.map(body => body.id)).size, 8);
  for (const body of parallel) assert.equal(body.result.structuredContent.data.quote.price, price);
  const streamRefusal = await send('compiled server refuses subscription streams', modernMessage('subscriptions/listen'));
  assert.equal(streamRefusal.error.code, -32601);
  const health = await entry.fetch(service + '/health', { method: 'GET', headers: { host: 'mcp.aperi.trade' } });
  assert.equal(health.status, 200);
  assert.equal((await health.json()).financialAuthority, false);
  cases.push({ label: 'compiled health declares absent financial authority', httpStatus: 200, protocol: null, contentType: health.headers.get('content-type'), errorCode: null, requestId: health.headers.get('x-request-id') });
  assert.equal(rejectedOutbound, 0);
  const receipt = { observedAt: new Date().toISOString(), environment: 'isolated local Workerd with frozen compiled MCP Worker; exact production rate-limit bindings; mocked fixed-origin Aperi GET data', harnessAuthorityNormalization: 'Local bridge Host is restored from the controlled production request URL and Origin delivered inside the isolated fixture entry; hostile Host and Origin overrides are independently refused by the unchanged compiled Worker.', bundleSha256: createHash('sha256').update(compiled).digest('hex'), passed: true, caseCount: cases.length, toolCount: Object.keys(tools).length, documentedOperationCount: index.operationCount, cases, outboundFixtureCalls: outbound.length, outboundOperations: [...new Set(outbound.map(call => call.method + ' ' + call.path))].sort(), unexpectedOutboundAttempts: rejectedOutbound, realNetworkCalls: 0, productionOperations: 0, financialAuthority: false, liveFlagsModified: false, credentialsRecorded: false, marketPriceAndClockPreserved: true, publicAccountCacheBypassed: true, modernAndLegacyResponsesComplete: true, parallelRequests: parallel.length, quotaNote: 'Cloudflare binding limits are per location abuse controls, not globally atomic counters.' };
  const output = new URL('../../../docs/evidence/local/mcp-domain-migration-2026-10-12/runtime.json', import.meta.url);
  await mkdir(new URL('.', output), { recursive: true });
  await writeFile(output, JSON.stringify(receipt, null, 2) + '\n');
  console.log(JSON.stringify({ passed: true, caseCount: cases.length, toolCount: 16, bundleSha256: receipt.bundleSha256, outfile: output.pathname, outboundFixtureCalls: outbound.length, realNetworkCalls: 0 }));
} finally { await runtime.dispose(); }
