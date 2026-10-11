import assert from 'node:assert/strict';
import test from 'node:test';
import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { AperiPublicClient } from '../src/client.ts';
import { TOOL_OPERATIONS } from '../src/server.ts';
import { handleRequest } from '../src/worker.ts';
import type { Env } from '../src/worker.ts';

const MARKET = 'hyperliquid.xyz.NVDA.USDC';
const SOURCE_MS = 1791742930089;
const ENDPOINT = 'https://mcp.aperi.io/mcp';
const REQUEST_ID = '5493d5e3-bca6-4284-8a53-e1ac581d7eae';
type Mode = 'legacy' | 'modern';
type Trace = { method: string; rpcMethod?: string; protocol?: string | null; session?: string | null; status: number; responseSession: string | null; body?: Record<string, unknown> };

function fixture() {
  const upstream: string[] = [];
  const trace: Trace[] = [];
  const market = { id: MARKET, symbol: 'NVDA', name: 'NVIDIA', category: 'stocks', venue: 'hyperliquid', venueSymbol: 'xyz:NVDA', collateral: 'USDC', price: '231.4500000000001', volume24h: '9007199254740993.0001', maxLeverage: 20, sourceTime: SOURCE_MS, executionReady: false };
  const source = { venue: 'hyperliquid', status: 'connected', observedAt: SOURCE_MS };
  const product = { id: 'NVDA', symbol: 'NVDA', name: 'NVIDIA', category: 'stocks', route: { marketId: MARKET, venue: 'hyperliquid' }, market, executionReady: false };
  const status = { schemaVersion: '1', status: 'ok', financialAuthority: false, liveTradingQualified: false, protectedGatewaysConfigured: { trading: false, funding: false, ostium: false } };
  const api = new AperiPublicClient({ fetch: async input => {
    const url = new URL(String(input));
    assert.equal(url.origin, 'https://aperi.io');
    upstream.push(url.href);
    let data: unknown;
    let code = 200;
    switch (url.pathname) {
      case '/api/v1/products': data = { schemaVersion: '1', asOf: SOURCE_MS, routingRevision: 'fixture-routing', products: [product], sources: [source] }; break;
      case '/api/v1/products/NVDA': data = { schemaVersion: '1', asOf: SOURCE_MS, product }; break;
      case '/api/v1/markets': data = { schemaVersion: '1', asOf: SOURCE_MS, markets: [market], sources: [source] }; break;
      case `/api/v1/markets/${MARKET}`: data = { schemaVersion: '1', asOf: SOURCE_MS, market }; break;
      case `/api/v1/markets/${MARKET}/quote`: data = { schemaVersion: '1', marketId: MARKET, ...market, receivedAt: SOURCE_MS + 1000, markPrice: null }; break;
      case `/api/v1/markets/${MARKET}/book`: data = { marketId: MARKET, venue: 'hyperliquid', sourceTime: SOURCE_MS, receivedAt: SOURCE_MS + 1000, bids: [{ price: '231.440000000001', size: '0.000001', orders: 1 }], asks: [{ price: '231.460000000001', size: '1.000001', orders: 2 }] }; break;
      case `/api/v1/markets/${MARKET}/trades`: data = { marketId: MARKET, sourceTime: SOURCE_MS, trades: [{ id: '9007199254740993', price: '231.4500000000001', size: '0.000001', side: 'buy', time: SOURCE_MS }] }; break;
      case `/api/v1/markets/${MARKET}/candles`: data = { schemaVersion: '1', marketId: MARKET, interval: url.searchParams.get('interval'), sourceTime: SOURCE_MS, candles: [{ time: 1791742800, open: '231.440000000001', high: '231.460000000001', low: '231.430000000001', close: '231.450000000001', volume: null }] }; break;
      case '/api/v1/markets/ostium.18.USDC/book': code = 422; data = { error: { code: 'DATASET_UNSUPPORTED', message: 'This raw provider message must not appear in tool output.' }, requestId: REQUEST_ID }; break;
      case '/api/v1/venues': data = { schemaVersion: '1', venues: [{ venue: 'hyperliquid', status: 'connected', pricingModel: 'orderbook' }, { venue: 'ostium', status: 'connected', pricingModel: 'oracle', orderBookSupported: false }], financialAuthority: false }; break;
      case '/api/v1/capital/status': data = { schemaVersion: '1', totalEquityUsd: null, availableMargin: null, coverageComplete: false, executionReady: false, financialAuthority: false }; break;
      case '/api/v1/calendar': data = { schemaVersion: '1', week: '2026-10-12', status: 'unavailable', asOf: SOURCE_MS, days: [{ date: '2026-10-12', events: [], earnings: [], earningsStatus: 'unavailable' }], sources: { economic: { status: 'unavailable', coverageStart: null, coverageEnd: null }, earnings: { status: 'unavailable' } } }; break;
      case '/api/v1/leaderboard': data = { schemaVersion: '1', entries: [], status: 'unavailable', coverageReason: 'Fixture source unavailable', currency: 'USDC', period: '30d' }; break;
      case '/api/v1/health': case '/api/v1/status': case '/api/v1/capabilities': data = status; break;
      case '/api/v1/accounts/0x1111111111111111111111111111111111111111': data = { address: '0x1111111111111111111111111111111111111111', venue: 'hyperliquid', sourceTime: SOURCE_MS, accounts: [], fills: [], coverage: { complete: false, dexes: ['', 'xyz'], accountModeQualified: false } }; break;
      default: throw new Error(`Unexpected fixture API request: ${url.pathname}`);
    }
    return new Response(JSON.stringify(data), { status: code, headers: { 'content-type': 'application/json' } });
  } });
  const allow = { limit: async (_options: { key: string }) => ({ success: true }) };
  const env: Env = { MCP_REQUEST_BUDGET: allow, MCP_GLOBAL_BUDGET: allow, MCP_DATA_BUDGET: allow };
  const mockFetch: typeof fetch = async (input, init) => {
    const incoming = new Request(input, init);
    const headers = new Headers(incoming.headers);
    headers.set('host', 'mcp.aperi.io');
    headers.set('cf-connecting-ip', '203.0.113.10');
    const request = new Request(incoming, { headers });
    let body: Record<string, unknown> | undefined;
    if (request.method === 'POST') {
      const parsed: unknown = await request.clone().json();
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) body = parsed as Record<string, unknown>;
    }
    const result = await handleRequest(request, env, api);
    trace.push({ method: request.method, rpcMethod: typeof body?.method === 'string' ? body.method : undefined, protocol: headers.get('mcp-protocol-version'), session: headers.get('mcp-session-id'), status: result.status, responseSession: result.headers.get('mcp-session-id'), body });
    return result;
  };
  return { upstream, trace, mockFetch };
}

async function connect(mode: Mode) {
  const f = fixture();
  const client = new Client({ name: 'aperi-independent-protocol-test', version: '0.1.0' }, {
    capabilities: {}, versionNegotiation: { mode: mode === 'modern' ? { pin: '2026-07-28' } : 'legacy' }
  });
  const transport = new StreamableHTTPClientTransport(new URL(ENDPOINT), {
    fetch: f.mockFetch,
    reconnectionOptions: { maxRetries: 0, maxReconnectionDelay: 1, initialReconnectionDelay: 1, reconnectionDelayGrowFactor: 1 }
  });
  await client.connect(transport);
  return { ...f, client, transport };
}

function structured(result: Awaited<ReturnType<Client['callTool']>>) {
  assert.ok(result.structuredContent);
  const data = result.structuredContent as { ok: boolean; data?: Record<string, unknown>; error?: { code: string; httpStatus: number; automaticRetry: boolean; message: string }; provenance?: { operationId: string; cached: boolean } };
  assert.equal(result.content[0]?.type, 'text');
  if (result.content[0]?.type === 'text') assert.deepEqual(JSON.parse(result.content[0].text), data);
  return data;
}

for (const mode of ['legacy', 'modern'] as const) {
  test(`${mode} official HTTP client discovers the complete research surface with validated schemas`, async () => {
    const f = await connect(mode);
    try {
      assert.equal(f.client.getProtocolEra(), mode);
      assert.equal(f.client.getNegotiatedProtocolVersion(), mode === 'modern' ? '2026-07-28' : '2025-11-25');
      const { tools } = await f.client.listTools();
      assert.deepEqual(tools.map(x => x.name).sort(), Object.keys(TOOL_OPERATIONS).sort());
      for (const tool of tools) {
        assert.equal(tool.inputSchema.type, 'object');
        assert.equal(tool.inputSchema.additionalProperties, false);
        assert.equal(tool.outputSchema?.type, 'object');
        assert.equal(tool.annotations?.readOnlyHint, true);
        assert.equal(tool.annotations?.destructiveHint, false);
        assert.equal(tool.annotations?.idempotentHint, true);
        assert.equal(tool.annotations?.openWorldHint, true);
      }
      const toolList = f.trace.find(x => x.rpcMethod === 'tools/list');
      assert.ok(toolList);
      if (mode === 'legacy') assert.ok(f.trace.some(x => x.rpcMethod === 'initialize'));
      else assert.ok(f.trace.some(x => x.rpcMethod === 'server/discover'));
      assert.ok(f.trace.every(x => x.session === null && x.responseSession === null));
      assert.equal(f.upstream.length, 0);
    } finally { await f.client.close(); }
  });

  test(`${mode} stateless parallel market reads preserve prices, source clocks, coverage and holds`, async () => {
    const f = await connect(mode);
    try {
      await f.client.listTools();
      const [quote, book, candles, calendar, capital] = await Promise.all([
        f.client.callTool({ name: 'aperi_get_quote', arguments: { marketId: MARKET } }),
        f.client.callTool({ name: 'aperi_get_order_book', arguments: { marketId: MARKET } }),
        f.client.callTool({ name: 'aperi_get_candles', arguments: { marketId: MARKET, interval: '30m', limit: 10, startTime: SOURCE_MS - 3600000, endTime: SOURCE_MS } }),
        f.client.callTool({ name: 'aperi_get_calendar', arguments: { week: '2026-10-12', limit: 10 } }),
        f.client.callTool({ name: 'aperi_get_capital_status', arguments: {} })
      ]);
      for (const result of [quote, book, candles, calendar, capital]) assert.equal(structured(result).ok, true);
      assert.equal(structured(quote).data?.price, '231.4500000000001');
      assert.equal(structured(quote).data?.volume24h, '9007199254740993.0001');
      assert.equal(structured(quote).data?.markPrice, null);
      assert.equal(structured(quote).data?.sourceTime, SOURCE_MS);
      assert.equal((structured(book).data?.bids as Array<{ price: string }>)[0].price, '231.440000000001');
      const bar = (structured(candles).data?.candles as Array<{ time: number; volume: null }>)[0];
      assert.equal(bar.time, 1791742800);
      assert.equal(bar.volume, null);
      assert.equal(structured(candles).data?.sourceTime, SOURCE_MS);
      assert.equal(structured(calendar).data?.status, 'unavailable');
      assert.equal(((structured(calendar).data?.sources as Record<string, { status: string }>).economic).status, 'unavailable');
      assert.equal(structured(capital).data?.coverageComplete, false);
      assert.equal(structured(capital).data?.totalEquityUsd, null);
      assert.equal(structured(capital).data?.financialAuthority, false);
      assert.equal(f.upstream.length, 5);
      assert.ok(f.trace.every(x => x.responseSession === null && x.session === null));
      assert.ok(f.trace.filter(x => x.rpcMethod === 'tools/call').every(x => x.method === 'POST'));
    } finally { await f.client.close(); }
  });
}

test('all sixteen tools execute through the official legacy client using only fixed public mock routes', async () => {
  const f = await connect('legacy');
  try {
    await f.client.listTools();
    const argumentsByTool: Record<string, Record<string, unknown>> = {
      aperi_list_products: { search: 'NVDA', venue: 'hyperliquid', limit: 1 },
      aperi_get_product: { productId: 'NVDA' }, aperi_list_markets: { search: 'NVDA', limit: 1 },
      aperi_get_market: { marketId: MARKET }, aperi_get_quote: { marketId: MARKET },
      aperi_get_order_book: { marketId: MARKET }, aperi_get_recent_trades: { marketId: MARKET },
      aperi_get_candles: { marketId: MARKET, interval: '30m', limit: 10 }, aperi_list_venues: {},
      aperi_read_public_account: { wallet: '0x' + '1'.repeat(40), limit: 10 }, aperi_get_capital_status: {},
      aperi_get_calendar: { week: '2026-10-12', limit: 10 }, aperi_get_leaderboard: { limit: 10 },
      aperi_get_health: {}, aperi_get_platform_status: {}, aperi_get_capabilities: {}
    };
    for (const [name, args] of Object.entries(argumentsByTool)) {
      const result = structured(await f.client.callTool({ name, arguments: args }));
      assert.equal(result.ok, true, name);
      assert.equal(result.provenance?.operationId, TOOL_OPERATIONS[name as keyof typeof TOOL_OPERATIONS]);
    }
    assert.equal(f.upstream.length, 16);
    assert.ok(f.upstream.every(url => new URL(url).pathname.startsWith('/api/v1/')));
    assert.ok(f.upstream.every(url => !/\/(orders|funding|wallet|keys|identity)(\/|$)/.test(new URL(url).pathname)));
  } finally { await f.client.close(); }
});

test('private tools, invalid IDs and unknown arguments are rejected before any API fetch', async () => {
  const f = await connect('legacy');
  try {
    await f.client.listTools();
    const refused = [
      { name: 'submitOrder', arguments: {} },
      { name: 'aperi_submit_order', arguments: { signature: 'do-not-send' } },
      { name: 'aperi_get_quote', arguments: { marketId: '../orders' } },
      { name: 'aperi_get_quote', arguments: { marketId: '%2e%2e' } },
      { name: 'aperi_get_quote', arguments: { marketId: MARKET, authorization: 'do-not-send' } },
      { name: 'aperi_get_quote', arguments: { marketId: MARKET, url: 'https://attacker.example' } },
      { name: 'aperi_get_quote', arguments: { marketId: MARKET, signedConsent: {} } }
    ];
    for (const params of refused) {
      let blocked = false;
      try { blocked = (await f.client.callTool(params)).isError === true; }
      catch { blocked = true; }
      assert.equal(blocked, true, params.name);
      assert.equal(f.upstream.length, 0);
    }
  } finally { await f.client.close(); }
});

test('unsupported venue data returns a structured error without provider instructions or automatic retry', async () => {
  const f = await connect('legacy');
  try {
    await f.client.listTools();
    const result = await f.client.callTool({ name: 'aperi_get_order_book', arguments: { marketId: 'ostium.18.USDC' } });
    assert.equal(result.isError, true);
    const output = structured(result);
    assert.equal(output.ok, false);
    assert.equal(output.error?.code, 'DATASET_UNSUPPORTED');
    assert.equal(output.error?.httpStatus, 422);
    assert.equal(output.error?.automaticRetry, false);
    assert.equal(output.error?.message.includes('raw provider message'), false);
    assert.equal(f.upstream.length, 1);
  } finally { await f.client.close(); }
});

test('resource index documents all 180 operations while protected operations remain reference only', async () => {
  const f = await connect('legacy');
  try {
    const resources = await f.client.listResources();
    assert.ok(resources.resources.some(x => x.uri === 'aperi://guide/quickstart'));
    assert.ok(resources.resources.some(x => x.uri === 'aperi://api/operations'));
    const templates = await f.client.listResourceTemplates();
    assert.ok(templates.resourceTemplates.some(x => x.uriTemplate === 'aperi://api/operations/{operationId}'));
    const index = await f.client.readResource({ uri: 'aperi://api/operations' });
    assert.ok('text' in index.contents[0]);
    const data = JSON.parse(index.contents[0].text as string) as { referenceOnly: boolean; operationCount: number; executableOperations: string[]; operations: Array<{ id: string; auth: string }> };
    assert.equal(data.referenceOnly, true);
    assert.equal(data.operationCount, 180);
    assert.equal(data.operations.length, 180);
    assert.equal(data.executableOperations.length, 16);
    assert.ok(data.operations.some(x => x.id === 'submitOrder' && x.auth === 'owner'));
    const reference = await f.client.readResource({ uri: 'aperi://api/operations/submitOrder' });
    assert.ok('text' in reference.contents[0]);
    const operation = JSON.parse(reference.contents[0].text as string);
    assert.equal(operation.referenceOnly, true);
    assert.equal(operation.executableThroughThisMcp, false);
    assert.equal(operation.operation.auth, 'owner');
    assert.equal(operation.operation.method, 'POST');
    assert.equal(f.upstream.length, 0);
    await assert.rejects(f.client.readResource({ uri: 'aperi://api/operations/does-not-exist' }));
  } finally { await f.client.close(); }
});

test('research prompt and quickstart preserve the public research boundary without executing a lookup', async () => {
  const f = await connect('modern');
  try {
    const prompts = await f.client.listPrompts();
    assert.ok(prompts.prompts.some(x => x.name === 'aperi-market-research'));
    const prompt = await f.client.getPrompt({ name: 'aperi-market-research', arguments: { symbol: 'NVDA' } });
    assert.equal(prompt.messages[0]?.role, 'user');
    assert.equal(prompt.messages[0]?.content.type, 'text');
    if (prompt.messages[0]?.content.type === 'text') {
      assert.match(prompt.messages[0].content.text, /NVDA/);
      assert.match(prompt.messages[0].content.text, /Do not execute or recommend a transaction/);
    }
    const quickstart = await f.client.readResource({ uri: 'aperi://guide/quickstart' });
    assert.ok('text' in quickstart.contents[0]);
    assert.match(quickstart.contents[0].text as string, /Read-only public data/);
    assert.equal(f.upstream.length, 0);
  } finally { await f.client.close(); }
});
