import { createMcpHandler } from '@modelcontextprotocol/server';
import { AperiPublicClient, ApiFailure, readBytes, withDeadline } from './client.ts';
import { createAperiServer, SERVER_VERSION, TOOL_OPERATIONS } from './server.ts';

interface Budget { limit(options: {key:string}): Promise<{success:boolean}>; }
export interface Env {
  MCP_REQUEST_BUDGET: Budget;
  MCP_GLOBAL_BUDGET: Budget;
  MCP_DATA_BUDGET: Budget;
  ASSETS?: {fetch(request:Request):Promise<Response>};
}
const ORIGINS = new Set(['https://claude.ai','https://claude.com','https://chatgpt.com','https://aperi.io','https://mcp.aperi.io']);
const PAGE = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Aperi Market Research MCP</title><link rel="stylesheet" href="/style.css"><main><a class="brand" href="https://aperi.io">Aperi</a><h1>Market research, connected.</h1><p>Explore Aperi’s equity, index and commodity markets from Claude, Codex and other MCP clients. Inspect exact venue contracts, prices, volume, funding, chart history and public account coverage.</p><section><h2>Connect</h2><p>Choose a remote MCP connection and enter:</p><pre>https://mcp.aperi.io/mcp</pre><p>No sign-in or API key is required for public data.</p></section><section><h2>Install the plugin</h2><p>The plugin includes guided setup, market research, public account analysis and API integration skills.</p><p><a class="button" href="/downloads/aperi-market-research-0.1.0.zip">Download plugin ZIP</a> <a href="https://aperi.io/api">API documentation</a></p><p>Upload the ZIP in Claude’s plugin settings, or use the repository marketplace in Claude Code and Codex. Directory listing is subject to marketplace review.</p></section><section><h2>Try it</h2><ul><li>Find NVIDIA’s native Aperi market and inspect its quote, volume and leverage ceiling.</li><li>Compare native order-book and oracle data coverage for gold.</li><li>Explain which API operations require owner authentication and signed trading consent.</li></ul></section><section><h2>Data and permissions</h2><p>This connector provides 16 public read tools. Source timestamps, unavailable data and coverage limits remain explicit. It provides the full 180-operation API reference for integration work.</p><p>Trading, funding, leverage changes, private account access, watchlist writes and key management are outside this public connector. No tool signs or submits a financial action. Funded gateway qualification remains independent.</p></section><footer><a href="/privacy-policy">Connector privacy</a> · <a href="/terms">Terms</a> · <a href="https://aperi.io/support">Support</a> · <a href="/health">Health</a></footer></main></html>`;
const STYLE = `:root{color-scheme:dark;font-family:Inter,system-ui,sans-serif;background:#09141c;color:#dfebf3}body{margin:0}main{max-width:780px;margin:auto;padding:60px 24px 70px}.brand{font-size:24px;font-weight:700;color:#7ce3c6;text-decoration:none}h1{font-size:clamp(32px,6vw,54px);line-height:1.1;margin:38px 0 24px;letter-spacing:-.04em}h2{font-size:22px;color:#e9f5fc}p,li{line-height:1.7;color:#b3c5d2}section{padding:18px 0;border-top:1px solid #283a45;margin-top:24px}a{color:#7ce3c6}pre{padding:18px;background:#172731;border-radius:8px;overflow:auto;font-size:16px}.button{display:inline-block;background:#7ce3c6;color:#09221a;padding:12px 18px;margin:0 12px 12px 0;border-radius:7px;text-decoration:none;font-weight:600}footer{margin-top:24px;font-size:13px}`;
const PRIVACY = `# Aperi MCP privacy\n\nThis public research connector does not require an account, API key or wallet credentials. Never send seed phrases, private keys, session cookies or signed financial instructions.\n\nAperi processes the tool inputs necessary for each requested lookup. A wallet address is sent to Aperi and the relevant public venue only when you explicitly request a public account observation. Market lookups are sent to the existing Aperi API, which obtains data from its documented native sources. Public account observations are not cached by this connector. Public market responses may be cached for five seconds and retain their original source clocks.\n\nCloudflare hosts the service and processes network/security metadata, including IP address, request path, response status and timing, to deliver the service and enforce abuse limits. Connector code does not persist prompts, conversation history, tool request bodies, wallet addresses or API credentials. It does not request Claude or Codex memory or files. Infrastructure logs can contain network metadata; this statement does not promise that hosting providers retain no data.\n\nYour AI client processes tool inputs and results under its own privacy policy. Do not submit personal information that is unnecessary for the lookup. Support: https://aperi.io/support. Platform policy: https://aperi.io/privacy-policy. Cloudflare policy: https://www.cloudflare.com/privacypolicy/.\n`;
const TERMS = `# Aperi MCP terms\n\nThis development release provides public market research and API reference information. It does not execute trades, transfer assets, change leverage, or provide private portfolio access. Market data may be partial, stale or unavailable; inspect native source timestamps, currencies and coverage before interpreting it. No successful health check, observed balance, preview or API reference qualifies funded execution.\n\nUse the connector within published rate limits. Do not send account credentials, secrets, signatures or unrelated personal data. The connector makes no automatic retry of a failed request. Access can be limited to protect service availability. Marketplace listing and verification require independent review and are not implied by installing this package.\n\nExisting platform terms: https://aperi.io/client-agreement. Risk disclosure: https://aperi.io/risk. Support: https://aperi.io/support.\n`;
function responseHeaders(requestId:string,contentType='application/json') {
  return new Headers({'content-type':contentType,'cache-control':'no-store','x-content-type-options':'nosniff','referrer-policy':'no-referrer','content-security-policy':"default-src 'none'; style-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",'strict-transport-security':'max-age=31536000','x-request-id':requestId});
}
function error(status:number,code:string,requestId:string) { return new Response(JSON.stringify({error:{code},requestId}),{status,headers:responseHeaders(requestId)}); }
export async function handleRequest(request:Request,env:Env,client?:AperiPublicClient):Promise<Response> {
  const requestId=crypto.randomUUID();
  try {
    const url=new URL(request.url);
    if (url.protocol !== 'https:' || url.hostname !== 'mcp.aperi.io' || (url.port && url.port !== '443')) return error(403,'HOST_OR_TLS_REFUSED',requestId);
    if (request.headers.has('host') && request.headers.get('host') !== 'mcp.aperi.io') return error(403,'HOST_REFUSED',requestId);
    if (url.search || url.hash || url.username || url.password || url.href.length>2048) return error(400,'URL_PARAMETERS_REFUSED',requestId);
    let headerBytes=0;
    for (const [name,value] of request.headers) headerBytes+=name.length+value.length;
    if(headerBytes>16384) return error(431,'HEADERS_TOO_LARGE',requestId);
    const tls=(request as Request & {cf?:{tlsVersion?:string}}).cf?.tlsVersion;
    if(tls && ['TLSv1','TLSv1.0','TLSv1.1'].includes(tls))return error(403,'TLS_VERSION_REFUSED',requestId);
    if (url.pathname !== '/mcp') {
      if (!['GET','HEAD'].includes(request.method)) return error(405,'METHOD_NOT_ALLOWED',requestId);
      const contentType=url.pathname==='/style.css'?'text/css; charset=utf-8':url.pathname==='/'?'text/html; charset=utf-8':url.pathname==='/health'?'application/json':'text/markdown; charset=utf-8';
      const content=url.pathname==='/'?PAGE:url.pathname==='/style.css'?STYLE:url.pathname==='/privacy-policy'?PRIVACY:url.pathname==='/terms'?TERMS:url.pathname==='/health'?JSON.stringify({status:'ok',service:'aperi-mcp-server',version:SERVER_VERSION,authentication:'none',tools:Object.keys(TOOL_OPERATIONS).length,financialAuthority:false}):undefined;
      if(content!==undefined)return new Response(request.method==='HEAD'?null:content,{headers:responseHeaders(requestId,contentType)});
      if(url.pathname.startsWith('/downloads/') && env.ASSETS) {
        const asset=await env.ASSETS.fetch(request);
        const headers=responseHeaders(requestId,asset.headers.get('content-type')??'application/octet-stream');
        if(asset.ok)headers.set('content-disposition','attachment; filename="aperi-market-research-0.1.0.zip"');
        return new Response(asset.body,{status:asset.status,headers});
      }
      return error(404,'NOT_FOUND',requestId);
    }
    const origin=request.headers.get('origin');
    if(origin && !ORIGINS.has(origin))return error(403,'ORIGIN_REFUSED',requestId);
    if(request.headers.has('authorization') || request.headers.has('cookie') || request.headers.has('x-api-key'))return error(400,'CREDENTIALS_NOT_ACCEPTED',requestId);
    if (!['POST','OPTIONS'].includes(request.method)) {
      const denied=error(405,'METHOD_NOT_ALLOWED',requestId);denied.headers.set('allow','POST, OPTIONS');return denied;
    }
    if(request.method==='OPTIONS') {
      const headers=responseHeaders(requestId);
      if(origin)headers.set('access-control-allow-origin',origin);
      headers.set('access-control-allow-methods','POST, OPTIONS');
      headers.set('access-control-allow-headers','content-type, accept, mcp-protocol-version, mcp-method, mcp-name');
      headers.set('vary','Origin');
      return new Response(null,{status:204,headers});
    }
    if(request.headers.get('content-encoding') && request.headers.get('content-encoding')!=='identity')return error(415,'COMPRESSED_REQUEST_REFUSED',requestId);
    if(request.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase() !== 'application/json')return error(415,'JSON_REQUIRED',requestId);
    const length=request.headers.get('content-length');
    if(length && (!/^\d+$/.test(length) || Number(length)>16384))return error(413,'REQUEST_TOO_LARGE',requestId);
    // Cloudflare supplies this header at public ingress. Forwarded headers and
    // tool-supplied addresses never establish a quota or authentication identity.
    const ip=request.headers.get('cf-connecting-ip');
    if(!ip || !/^[a-fA-F0-9.:]{3,45}$/.test(ip))return error(403,'TRUSTED_INGRESS_REQUIRED',requestId);
    const budgetSignal=AbortSignal.any([request.signal,AbortSignal.timeout(5000)]);
    const requests=await withDeadline(()=>env.MCP_REQUEST_BUDGET.limit({key:`ip:${ip}`}),budgetSignal);
    const global=await withDeadline(()=>env.MCP_GLOBAL_BUDGET.limit({key:'mcp-public'}),budgetSignal);
    if(!requests.success || !global.success) {const denied=error(429,'MCP_RATE_LIMITED',requestId);denied.headers.set('retry-after','60');return denied;}
    let body:unknown;
    try {
      const bytes=await readBytes(request.body,16384,AbortSignal.any([request.signal,AbortSignal.timeout(5000)]));
      body=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
    } catch (failure) {return failure instanceof ApiFailure && failure.code==='RESPONSE_TOO_LARGE'?error(413,'REQUEST_TOO_LARGE',requestId):error(400,'INVALID_JSON_BODY',requestId);}
    if(!body || typeof body!=='object' || Array.isArray(body))return error(400,'JSON_OBJECT_REQUIRED',requestId);
    const message=body as {method?:unknown;id?:unknown};
    if(message.method==='subscriptions/listen')return new Response(JSON.stringify({jsonrpc:'2.0',id:message.id??null,error:{code:-32601,message:'This read-only server does not provide subscription streams.'}}),{headers:responseHeaders(requestId)});
    if(message.method==='tools/call') {
      const budget=await withDeadline(()=>env.MCP_DATA_BUDGET.limit({key:'upstream-public'}),budgetSignal);
      if(!budget.success){const denied=error(429,'MCP_DATA_RATE_LIMITED',requestId);denied.headers.set('retry-after','60');return denied;}
    }
    const cachesWithDefault=globalThis.caches as CacheStorage & {default?:Cache};
    const handler=createMcpHandler(() => createAperiServer(client??new AperiPublicClient({cache:cachesWithDefault?.default})),{legacy:'stateless',responseMode:'auto',maxRequestBodySize:16384,maxSubscriptions:1,keepAliveMs:0});
    try {
      const served=await handler.fetch(request,{parsedBody:body});
      const headers=responseHeaders(requestId);
      for(const [name,value]of served.headers)headers.set(name,value);
      headers.set('cache-control','no-store');
      if(origin)headers.set('access-control-allow-origin',origin);
      headers.set('access-control-expose-headers','mcp-protocol-version, x-request-id');
      headers.set('vary','Origin');
      return new Response(served.body,{status:served.status,headers});
    } finally {await handler.close();}
  } catch {return error(503,'MCP_SERVICE_UNAVAILABLE',requestId);}
}
// Workerd supplies ExecutionContext as the third fetch argument. Keep the
// optional test client out of that runtime signature.
export default {fetch(request:Request,env:Env){return handleRequest(request,env);}};
