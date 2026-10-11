import assert from 'node:assert/strict';
import test from 'node:test';
import { handleRequest, type Env } from '../src/worker.ts';
import { AperiPublicClient } from '../src/client.ts';

const ENDPOINT = 'https://mcp.aperi.io/mcp';
const IP = '192.0.2.15';
const VERSION = '2026-07-28';
type Json = Record<string, any>;
function fixture() {
  const calls = { ip: [] as string[], global: [] as string[], data: [] as string[], api: [] as string[] };
  const budget = (list: string[]) => ({ limit: async ({ key }: { key: string }) => { list.push(key); return { success: true }; } });
  const env: Env = { MCP_REQUEST_BUDGET: budget(calls.ip), MCP_GLOBAL_BUDGET: budget(calls.global), MCP_DATA_BUDGET: budget(calls.data) };
  const client = new AperiPublicClient({ fetch: (async input => {
    calls.api.push(String(input));
    return new Response(JSON.stringify({ status: 'available', price: '123.0000000001', sourceTime: 1791742930089 }), { headers: { 'content-type': 'application/json' } });
  }) as typeof fetch });
  return { env, client, calls };
}
function message(method = 'tools/list', params: Json = {}, id: string | number = 1): Json {
  return { jsonrpc: '2.0', id, method, params: { ...params, _meta: { 'io.modelcontextprotocol/protocolVersion': VERSION, 'io.modelcontextprotocol/clientInfo': { name: 'independent-security-review', version: '1.0.0' }, 'io.modelcontextprotocol/clientCapabilities': {} } } };
}
function request(body: Json | string = message(), options: RequestInit = {}, endpoint = ENDPOINT): Request {
  const data = typeof body === 'string' ? body : JSON.stringify(body);
  const parsed = typeof body === 'string' ? undefined : body;
  const headers = new Headers({ 'content-type': 'application/json', accept: 'application/json, text/event-stream', 'cf-connecting-ip': IP, 'mcp-protocol-version': VERSION, 'mcp-method': String(parsed?.method ?? 'tools/list') });
  if (parsed?.params?.name || parsed?.params?.uri) headers.set('mcp-name', String(parsed.params.name ?? parsed.params.uri));
  new Headers(options.headers).forEach((value, name) => headers.set(name, value));
  return new Request(endpoint, { ...options, method: options.method ?? 'POST', headers, ...(['GET', 'HEAD', 'OPTIONS'].includes(options.method ?? '') ? {} : { body: options.body ?? data }) });
}
async function rpc(response: Response): Promise<Json> {
  if (response.headers.get('content-type')?.startsWith('application/json')) return response.json();
  assert.ok(response.headers.get('content-type')?.startsWith('text/event-stream'));
  const frames = (await response.text()).split('\n').filter(line => line.startsWith('data:')).map(line => JSON.parse(line.slice(5).trim()));
  assert.ok(frames.length > 0, 'legacy stream must deliver a complete response before closing');
  return frames.at(-1);
}
async function bounded<T>(work: Promise<T>, milliseconds = 350): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try { return await Promise.race([work, new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error('WORKER_REQUEST_DID_NOT_TERMINATE')), milliseconds); })]); }
  finally { clearTimeout(timer); }
}

test('TLS, authority, encoded-path and query checks prevent alternative ingress destinations', async () => {
  const f = fixture();
  for (const endpoint of ['http://mcp.aperi.io/mcp', 'https://attacker.example/mcp', 'https://mcp.aperi.io:8443/mcp', 'https://mcp.aperi.io/mcp?api_key=secret', 'https://mcp.aperi.io/mcp#fragment']) {
    const response = await handleRequest(request(message(), {}, endpoint), f.env, f.client);
    assert.ok(response.status >= 400, endpoint);
  }
  assert.equal((await handleRequest(request(message(), { headers: { host: 'attacker.example' } }), f.env, f.client)).status, 403);
  assert.ok((await handleRequest(request(message(), {}, 'https://mcp.aperi.io/%6dcp'), f.env, f.client)).status >= 400);
  assert.equal(f.calls.api.length, 0);
});

test('legacy TLS metadata is refused independently of the HTTPS URL', async () => {
  const f = fixture();
  for (const tlsVersion of ['TLSv1', 'TLSv1.0', 'TLSv1.1']) {
    const input = request();
    Object.defineProperty(input, 'cf', { value: { tlsVersion } });
    assert.equal((await handleRequest(input, f.env, f.client)).status, 403);
  }
  assert.equal(f.calls.ip.length, 0);
});

test('Origin validation rejects malicious and null origins before quota or protocol work', async () => {
  const f = fixture();
  for (const origin of ['https://attacker.example', 'null', 'https://claude.ai.attacker.example', 'http://claude.ai', 'https://claude.ai/']) {
    assert.equal((await handleRequest(request(message(), { headers: { origin } }), f.env, f.client)).status, 403);
  }
  assert.equal(f.calls.ip.length, 0);
});

test('no-auth MCP rejects credentials instead of silently accepting or forwarding them', async () => {
  const f = fixture();
  for (const name of ['authorization', 'cookie', 'x-api-key']) {
    const response = await handleRequest(request(message(), { headers: { [name]: 'secret-do-not-reflect' } }), f.env, f.client);
    assert.equal(response.status, 400);
    assert.equal((await response.text()).includes('secret-do-not-reflect'), false);
  }
  assert.equal(f.calls.ip.length, 0);
  assert.equal(f.calls.api.length, 0);
});

test('forwarded client addresses cannot substitute for Cloudflare ingress identity', async () => {
  const f = fixture();
  const input = request(message(), { headers: { 'x-forwarded-for': IP, 'x-real-ip': IP, forwarded: `for=${IP}` } });
  input.headers.delete('cf-connecting-ip');
  assert.equal((await handleRequest(input, f.env, f.client)).status, 403);
  assert.equal(f.calls.ip.length, 0);
});

test('preflight permits only the exact allowed origin and never enables credentialed CORS', async () => {
  const f = fixture();
  const response = await handleRequest(request(message(), { method: 'OPTIONS', headers: { origin: 'https://claude.ai' } }), f.env, f.client);
  assert.equal(response.status, 204);
  assert.equal(response.headers.get('access-control-allow-origin'), 'https://claude.ai');
  assert.equal(response.headers.get('access-control-allow-credentials'), null);
  assert.ok(!response.headers.get('access-control-allow-headers')?.includes('authorization'));
  assert.equal(f.calls.ip.length, 0);
});

test('GET streams and HTTP write methods cannot create sessions or financial actions', async () => {
  const f = fixture();
  for (const method of ['GET', 'HEAD', 'PUT', 'PATCH', 'DELETE']) {
    const response = await handleRequest(request(message(), { method }), f.env, f.client);
    assert.equal(response.status, 405);
    assert.equal(response.headers.get('allow'), 'POST, OPTIONS');
  }
  assert.equal(f.calls.api.length, 0);
});

test('content types, compression, declared lengths and aggregate headers are bounded before parsing', async () => {
  const f = fixture();
  for (const headers of [{ 'content-type': 'text/plain' }, { 'content-type': 'application/json-evil' }, { 'content-encoding': 'gzip' }] as Record<string, string>[]) {
    assert.equal((await handleRequest(request('{}', { headers }), f.env, f.client)).status, 415);
  }
  assert.equal((await handleRequest(request('{}', { headers: { 'content-length': '16385' } }), f.env, f.client)).status, 413);
  assert.equal((await handleRequest(request('{}', { headers: { 'x-padding': 'a'.repeat(16400) } }), f.env, f.client)).status, 431);
  assert.equal(f.calls.ip.length, 0);
});

test('invalid UTF-8, JSON batches, scalars and oversized streamed requests never dispatch', async () => {
  const f = fixture();
  for (const body of ['[{}]', 'null', '1', '"secret"', '{broken', '{"padding":"' + 'a'.repeat(16400) + '"}']) {
    assert.ok((await handleRequest(request(body), f.env, f.client)).status >= 400);
  }
  const invalidUtf8 = request('{}', { body: new Uint8Array([0xc3, 0x28]) });
  assert.equal((await handleRequest(invalidUtf8, f.env, f.client)).status, 400);
  assert.equal(f.calls.api.length, 0);
});

test('per-ingress and aggregate quota refusals fail closed and include a retry window', async () => {
  for (const binding of ['MCP_REQUEST_BUDGET', 'MCP_GLOBAL_BUDGET'] as const) {
    const f = fixture();
    f.env[binding] = { limit: async () => ({ success: false }) };
    const response = await handleRequest(request(), f.env, f.client);
    assert.equal(response.status, 429);
    assert.equal(response.headers.get('retry-after'), '60');
    assert.equal(f.calls.api.length, 0);
  }
});

test('upstream budget denial prevents API requests while preserving discovery access', async () => {
  const f = fixture();
  f.env.MCP_DATA_BUDGET = { limit: async () => ({ success: false }) };
  const denied = await handleRequest(request(message('tools/call', { name: 'aperi_get_health', arguments: {} })), f.env, f.client);
  assert.equal(denied.status, 429);
  assert.equal((await denied.json()).error.code, 'MCP_DATA_RATE_LIMITED');
  const listed = await rpc(await handleRequest(request(), f.env, f.client));
  assert.equal(listed.result.tools.length, 16);
  assert.equal(f.calls.api.length, 0);
});

test('quota identities come from ingress and fixed resource classes, never tool or proxy headers', async () => {
  const f = fixture();
  await rpc(await handleRequest(request(message('tools/call', { name: 'aperi_get_health', arguments: {} }), { headers: { 'x-forwarded-for': '203.0.113.9', 'x-real-ip': '203.0.113.10' } }), f.env, f.client));
  assert.deepEqual(f.calls.ip, [`ip:${IP}`]);
  assert.deepEqual(f.calls.global, ['mcp-public']);
  assert.deepEqual(f.calls.data, ['upstream-public']);
});

test('quota binding failures return a sanitized service error without fetching data', async () => {
  const f = fixture();
  f.env.MCP_GLOBAL_BUDGET = { limit: async () => { throw new Error('private-infrastructure-secret'); } };
  const response = await handleRequest(request(), f.env, f.client);
  assert.equal(response.status, 503);
  assert.equal((await response.text()).includes('private-infrastructure-secret'), false);
  assert.equal(f.calls.api.length, 0);
});

test('modern protocol and method header mismatches are refused before calling any tool', async () => {
  const f = fixture();
  for (const headers of [{ 'mcp-protocol-version': '2025-11-25' }, { 'mcp-method': 'tools/call' }] as Record<string, string>[]) {
    const response = await handleRequest(request(message(), { headers }), f.env, f.client);
    assert.equal(response.status, 400);
    assert.ok((await response.json()).error);
  }
  const wrongName = await handleRequest(request(message('tools/call', { name: 'aperi_get_health', arguments: {} }), { headers: { 'mcp-name': 'aperi_submit_order' } }), f.env, f.client);
  assert.equal(wrongName.status, 400);
  assert.equal(f.calls.api.length, 0);
});

test('tool discovery contains only public reads and complete safety annotations', async () => {
  const f = fixture();
  const response = await handleRequest(request(message()), f.env, f.client);
  assert.equal(response.headers.get('content-type'), 'application/json');
  const body = await rpc(response);
  assert.equal(body.result.tools.length, 16);
  for (const tool of body.result.tools) {
    assert.ok(tool.name.startsWith('aperi_') && tool.name.length <= 64);
    assert.ok(tool.title);
    assert.equal(tool.annotations.readOnlyHint, true);
    assert.equal(tool.annotations.destructiveHint, false);
    assert.equal(tool.annotations.idempotentHint, true);
    assert.ok(!/(submit|transfer|withdraw|deposit|create_key|replace_watchlist|set_leverage)/.test(tool.name));
  }
});

test('unknown financial tools and attempted credential or URL arguments cannot reach the API', async () => {
  const f = fixture();
  for (const params of [
    { name: 'aperi_submit_order', arguments: { marketId: 'hyperliquid.xyz.NVDA.USDC' } },
    { name: 'aperi_get_health', arguments: { apiKey: 'secret-do-not-reflect' } },
    { name: 'aperi_get_quote', arguments: { marketId: 'https://attacker.example/collect' } },
    { name: 'aperi_get_quote', arguments: { marketId: 'hyperliquid.xyz.NVDA.USDC', authorization: 'secret' } }
  ]) {
    const body = await rpc(await handleRequest(request(message('tools/call', params)), f.env, f.client));
    assert.ok(body.error || body.result?.isError);
  }
  assert.equal(f.calls.api.length, 0);
});

test('modern tool JSON stays readable after request-scoped handler cleanup', async () => {
  const f = fixture();
  const response = await handleRequest(request(message('tools/call', { name: 'aperi_get_health', arguments: {} })), f.env, f.client);
  const body = await bounded(rpc(response));
  assert.equal(body.result.structuredContent.ok, true);
  assert.equal(body.result.structuredContent.data.price, '123.0000000001');
  assert.deepEqual(f.calls.api, ['https://aperi.io/api/v1/health']);
});

test('legacy initialization, discovery and tool SSE streams finish after complete results', async () => {
  const f = fixture();
  const frames: Json[] = [
    { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-11-25', capabilities: {}, clientInfo: { name: 'legacy-review', version: '1.0.0' } } },
    { jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} },
    { jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'aperi_get_health', arguments: {} } }
  ];
  for (const frame of frames) {
    const input = request(frame, { headers: { 'mcp-protocol-version': '2025-11-25' } });
    const response = await handleRequest(input, f.env, f.client);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('mcp-session-id'), null);
    const result = await bounded(rpc(response));
    assert.equal(result.id, frame.id);
    assert.ok(result.result);
  }
  assert.equal(f.calls.api.length, 1);
});

test('unknown resources and methods produce bounded protocol errors without fetching arbitrary URLs', async () => {
  const f = fixture();
  for (const frame of [message('resources/read', { uri: 'aperi://api/operations/does-not-exist' }), message('resources/read', { uri: 'https://attacker.example/collect' }), message('financial/execute', {})]) {
    const response = await handleRequest(request(frame), f.env, f.client);
    const body = await rpc(response);
    assert.ok(body.error);
    assert.equal(JSON.stringify(body).includes('node_modules'), false);
    assert.equal(JSON.stringify(body).includes('/Users/'), false);
  }
  assert.equal(f.calls.api.length, 0);
});

test('reference-only financial operation documentation never becomes an executable tool', async () => {
  const f = fixture();
  const body = await rpc(await handleRequest(request(message('resources/read', { uri: 'aperi://api/operations' })), f.env, f.client));
  const reference = JSON.parse(body.result.contents[0].text);
  assert.equal(reference.referenceOnly, true);
  assert.equal(reference.executableOperations.length, 16);
  assert.ok(reference.operations.length > reference.executableOperations.length);
  assert.equal(f.calls.api.length, 0);
});

test('subscription requests cannot hold an open SSE connection', async () => {
  const f = fixture();
  const response = await handleRequest(request(message('subscriptions/listen', {})), f.env, f.client);
  assert.equal(response.headers.get('content-type'), 'application/json');
  assert.equal((await bounded(response.json())).error.code, -32601);
  assert.equal(f.calls.api.length, 0);
});

test('request cancellation bounds a stalled ingress stream even if cancellation never resolves', async () => {
  const f = fixture();
  const controller = new AbortController();
  const body = new ReadableStream<Uint8Array>({ cancel: () => new Promise<void>(() => {}) });
  const input = request('{}', { body, signal: controller.signal, duplex: 'half' } as RequestInit);
  const pending = handleRequest(input, f.env, f.client);
  const timer = setTimeout(() => controller.abort(), 10);
  try { assert.equal((await bounded(pending)).status, 400); }
  finally { clearTimeout(timer); }
  assert.equal(f.calls.api.length, 0);
});

test('request cancellation bounds stalled quota checks and keeps the upstream untouched', async () => {
  const f = fixture();
  f.env.MCP_REQUEST_BUDGET = { limit: () => new Promise<{ success: boolean }>(() => {}) };
  const controller = new AbortController();
  const pending = handleRequest(request(message(), { signal: controller.signal }), f.env, f.client);
  const timer = setTimeout(() => controller.abort(), 10);
  try { assert.ok((await bounded(pending)).status >= 400); }
  finally { clearTimeout(timer); }
  assert.equal(f.calls.api.length, 0);
});

test('success, validation and quota responses carry privacy and browser protection headers', async () => {
  const f = fixture();
  const responses = [await handleRequest(request(), f.env, f.client), await handleRequest(request('{}', { headers: { authorization: 'secret' } }), f.env, f.client)];
  for (const response of responses) {
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
    assert.ok(response.headers.get('content-security-policy')?.includes("frame-ancestors 'none'"));
    assert.ok(response.headers.get('x-request-id'));
    await response.body?.cancel();
  }
});
