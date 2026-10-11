/** Fixed-destination, read-only transport. Tool arguments never supply URLs or credentials. */
export const API_BASE = 'https://aperi.io/api/v1';
export const PUBLIC_OPERATIONS = Object.freeze({
  listProducts: '/products', getProduct: '/products/{productId}',
  listMarkets: '/markets', getMarket: '/markets/{marketId}',
  getQuote: '/markets/{marketId}/quote', getBook: '/markets/{marketId}/book',
  getTrades: '/markets/{marketId}/trades', getCandles: '/markets/{marketId}/candles',
  listVenues: '/venues', readAccount: '/accounts/{wallet}', capitalStatus: '/capital/status',
  getCalendar: '/calendar', getLeaderboard: '/leaderboard', getApiHealth: '/health',
  getApiStatus: '/status', getApiCapabilities: '/capabilities'
});
export type PublicOperation = keyof typeof PUBLIC_OPERATIONS;
export type ApiParams = Record<string, string | number | undefined>;
export class ApiFailure extends Error {
  code: string;
  status: number;
  requestId?: string;
  constructor(code: string, status = 502, requestId?: string) {
    super(code);
    this.code = code;
    this.status = status;
    this.requestId = requestId;
  }
}
/** Bound even adapters which fail to implement cancellation themselves. */
export async function withDeadline<T>(work: () => Promise<T>, signal: AbortSignal): Promise<T> {
  signal.throwIfAborted();
  let abort: () => void = () => {};
  const cancelled = new Promise<never>((_, reject) => {
    abort = () => reject(signal.reason);
    signal.addEventListener('abort', abort, { once: true });
  });
  try { return await Promise.race([work(), cancelled]); }
  finally { signal.removeEventListener('abort', abort); }
}
export async function readBytes(body: ReadableStream<Uint8Array> | null, maximum: number, signal: AbortSignal): Promise<Uint8Array<ArrayBuffer>> {
  if (!body) return new Uint8Array();
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  const cancel = () => { void reader.cancel().catch(() => {}); };
  signal.addEventListener('abort', cancel, { once: true });
  try {
    signal.throwIfAborted();
    for (;;) {
      const next = await withDeadline(() => reader.read(), signal);
      signal.throwIfAborted();
      if (next.done) break;
      total += next.value.byteLength;
      if (total > maximum) throw new ApiFailure('RESPONSE_TOO_LARGE');
      chunks.push(next.value);
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return bytes;
  } catch (error) {
    void reader.cancel().catch(() => {});
    throw error;
  } finally {
    signal.removeEventListener('abort', cancel);
    try { reader.releaseLock(); } catch { /* A non-cooperative stream is already cancelled. */ }
  }
}
export function nativeId(value: unknown): string {
  if (typeof value !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,159}$/.test(value) || value.includes('..') || value.startsWith('aperi_market_') || /^0x[a-fA-F0-9]{64}$/.test(value)) {
    throw new ApiFailure('INVALID_INSTRUMENT_ID', 400);
  }
  return value;
}
function integer(value: unknown, min: number, max: number): number {
  if (!Number.isSafeInteger(value) || (value as number) < min || (value as number) > max) throw new ApiFailure('INVALID_PARAMETER', 400);
  return value as number;
}
export const INTERVALS = ['1m','3m','5m','15m','30m','1h','2h','4h','6h','8h','12h','1d','3d','1w','1M'] as const;
export function operationUrl(operation: PublicOperation, params: ApiParams = {}): URL {
  if (!Object.hasOwn(PUBLIC_OPERATIONS, operation)) throw new ApiFailure('OPERATION_NOT_ALLOWED', 403);
  let path: string = PUBLIC_OPERATIONS[operation];
  for (const name of ['productId','marketId']) if (path.includes(`{${name}}`)) path = path.replace(`{${name}}`, encodeURIComponent(nativeId(params[name])));
  if (path.includes('{wallet}')) {
    if (typeof params.wallet !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(params.wallet)) throw new ApiFailure('INVALID_WALLET', 400);
    path = path.replace('{wallet}', params.wallet.toLowerCase());
  }
  const url = new URL(API_BASE + path);
  if (operation === 'getCandles') {
    const interval = params.interval ?? '30m';
    if (!INTERVALS.includes(interval as typeof INTERVALS[number])) throw new ApiFailure('INVALID_INTERVAL', 400);
    url.searchParams.set('interval', String(interval));
    url.searchParams.set('limit', String(integer(params.limit ?? 50, 1, 100)));
    for (const name of ['startTime','endTime']) if (params[name] !== undefined) url.searchParams.set(name, String(integer(params[name], 0, 8640000000000000)));
    if (params.startTime !== undefined && params.endTime !== undefined && Number(params.startTime) >= Number(params.endTime)) throw new ApiFailure('INVALID_TIME_WINDOW', 400);
  }
  if (operation === 'getCalendar' && params.week !== undefined) {
    const week = String(params.week);
    const date = new Date(week + 'T00:00:00Z');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(week) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0,10) !== week || date.getUTCDay() !== 1) throw new ApiFailure('INVALID_MONDAY_DATE', 400);
    url.searchParams.set('week', week);
  }
  return url;
}
export interface ApiRead {
  data: Record<string, unknown>;
  provenance: { api: string; operationId: PublicOperation; url: string; readAt: string; cached: boolean };
}
export interface ApiClientOptions {
  fetch?: typeof fetch;
  /** Set only by the local stdio launcher; never read from a tool or remote caller. */
  marketKey?: string;
  timeoutMs?: number;
  cache?: Pick<Cache, 'match' | 'put'>;
}
export class AperiPublicClient {
  private options: ApiClientOptions;
  constructor(options: ApiClientOptions = {}) {
    if (options.marketKey !== undefined && !/^aperi_market_[a-f0-9]{64}$/.test(options.marketKey)) throw new ApiFailure('INVALID_MARKET_KEY', 400);
    const timeoutMs = options.timeoutMs ?? 12000;
    if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 15000) throw new ApiFailure('INVALID_TIMEOUT', 400);
    this.options = { ...options, timeoutMs };
  }
  async read(operation: PublicOperation, params: ApiParams = {}, callerSignal?: AbortSignal): Promise<ApiRead> {
    const url = operationUrl(operation, params);
    const timeout = AbortSignal.timeout(this.options.timeoutMs!);
    const signal = callerSignal ? AbortSignal.any([callerSignal, timeout]) : timeout;
    const headers = new Headers({ accept: 'application/json', 'user-agent': 'aperi-mcp/0.1.0' });
    if (this.options.marketKey && ['listProducts','getProduct','listMarkets','getMarket','getQuote','getBook','getTrades','getCandles','listVenues'].includes(operation)) {
      headers.set('authorization', `Bearer ${this.options.marketKey}`);
    }
    // Public reference/catalogue responses may be briefly cached. Account observations never are.
    const cacheable = !this.options.marketKey && operation !== 'readAccount';
    const cacheRequest = new Request(url, { headers: { accept: 'application/json' } });
    let cached = false;
    try {
      signal.throwIfAborted();
      let response = cacheable && this.options.cache ? await withDeadline(() => this.options.cache!.match(cacheRequest),signal).catch(error => { signal.throwIfAborted(); return undefined; }) : undefined;
      cached = !!response;
      response ??= await withDeadline(() => (this.options.fetch ?? fetch)(url, { method: 'GET', headers, redirect: 'manual', signal }),signal);
      if (response.status >= 300 && response.status < 400) throw new ApiFailure('UPSTREAM_REDIRECT_REFUSED');
      const contentType = response.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase();
      if (contentType !== 'application/json') throw new ApiFailure('UPSTREAM_INVALID_RESPONSE');
      const bytes = await readBytes(response.body, 2 * 1024 * 1024, signal);
      const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
      const data: unknown = JSON.parse(text);
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new ApiFailure('UPSTREAM_INVALID_RESPONSE');
      if (!response.ok) {
        const detail = data as { error?: { code?: unknown }; requestId?: unknown };
        const code = typeof detail.error?.code === 'string' && /^[A-Z0-9_]{1,80}$/.test(detail.error.code) ? detail.error.code : 'UPSTREAM_UNAVAILABLE';
        const requestId = typeof detail.requestId === 'string' && /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(detail.requestId) ? detail.requestId : undefined;
        throw new ApiFailure(code, response.status, requestId);
      }
      if (cacheable && !cached && this.options.cache) {
        // Never cache cookies, auth state or an unsuccessful/incomplete HTTP exchange.
        const cachedResponse = new Response(bytes, { headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=5' } });
        await withDeadline(() => this.options.cache!.put(cacheRequest, cachedResponse), signal).catch(() => {});
      }
      signal.throwIfAborted();
      return { data: data as Record<string, unknown>, provenance: { api: API_BASE, operationId: operation, url: url.href, readAt: new Date().toISOString(), cached } };
    } catch (error) {
      if (error instanceof ApiFailure) throw error;
      if (signal.aborted) throw new ApiFailure('UPSTREAM_TIMEOUT', 504);
      throw new ApiFailure('UPSTREAM_INVALID_RESPONSE');
    }
  }
}
