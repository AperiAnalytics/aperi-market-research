/** Read-only production verification. No API keys, cookies or financial calls. */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { TOOL_OPERATIONS } from '../src/server.ts';

const endpoint = new URL('https://mcp.aperi.io/mcp');
const evidence = new URL('../../../docs/evidence/live/mcp-release-2026-10-11/', import.meta.url);
const cases = [];
const wire = [];
const syntheticWallet = '0x' + createHash('sha256').update('aperi-mcp-read-only-canary-2026-10-11').digest('hex').slice(0,40);
const fetchObserved = async (input, init) => {
  const response = await fetch(input, init);
  wire.push({ status:response.status, contentType:response.headers.get('content-type'), cacheControl:response.headers.get('cache-control'), requestId:response.headers.get('x-request-id') });
  assert.equal(response.headers.get('cache-control'),'no-store');
  return response;
};
const connect = async mode => {
  const client = new Client({name:'aperi-live-read-only-verification',version:'0.1.0'}, {capabilities:{},versionNegotiation:{mode:mode==='modern'?{pin:'2026-07-28'}:'legacy'}});
  await client.connect(new StreamableHTTPClientTransport(endpoint,{fetch:fetchObserved,reconnectionOptions:{maxRetries:0}}));
  return client;
};
const brief = result => {
  const value = result.structuredContent;
  assert.ok(value && typeof value.ok === 'boolean');
  assert.deepEqual(JSON.parse(result.content.find(x=>x.type==='text').text),value);
  if (!value.ok) assert.equal(value.error.automaticRetry,false);
  return value;
};
const main = await connect('modern');
let marketId;
try {
  const {tools} = await main.listTools();
  assert.deepEqual(tools.map(x=>x.name).sort(),Object.keys(TOOL_OPERATIONS).sort());
  for(const tool of tools) {
    assert.equal(tool.annotations.readOnlyHint,true);
    assert.equal(tool.annotations.destructiveHint,false);
    assert.equal(tool.inputSchema.additionalProperties,false);
  }
  cases.push({label:'modern discovery',passed:true,protocol:main.getNegotiatedProtocolVersion(),toolCount:tools.length});
  const markets = brief(await main.callTool({name:'aperi_list_markets',arguments:{search:'NVDA',venue:'hyperliquid',limit:1}}));
  assert.equal(markets.ok,true);
  marketId = markets.data.markets[0].id;
  assert.match(marketId,/^hyperliquid\./);
  cases.push({label:'discover exact native route',passed:true,marketId,availableRecords:markets.pagination.total});
  const invocations = [
    ['aperi_list_products',{search:'NVDA',limit:1}], ['aperi_get_product',{productId:'NVDA'}],
    ['aperi_list_markets',{search:'NVDA',venue:'hyperliquid',limit:1}],
    ...['aperi_get_market','aperi_get_quote','aperi_get_order_book','aperi_get_recent_trades'].map(name=>[name,{marketId}]),
    ['aperi_get_candles',{marketId,interval:'30m',limit:10}],
    ['aperi_list_venues',{}], ['aperi_read_public_account',{wallet:syntheticWallet,limit:1}],
    ['aperi_get_capital_status',{}], ['aperi_get_calendar',{limit:5}], ['aperi_get_leaderboard',{limit:1}],
    ['aperi_get_health',{}], ['aperi_get_platform_status',{}], ['aperi_get_capabilities',{}]
  ];
  for(const [name,args] of invocations) {
    const result=brief(await main.callTool({name,arguments:args}));
    assert.equal(result.ok,true,`${name}: ${result.error?.code}`);
    const data=result.data;
    cases.push({label:name,passed:true,apiOperation:result.provenance.operationId,cached:result.provenance.cached,status:data.status??null,sourceTime:data.sourceTime??data.asOf??null,bidCount:data.bids?.length??null,askCount:data.asks?.length??null,candleCount:data.candles?.length??null,tradeCount:data.trades?.length??null,liveTradingQualified:data.liveTradingQualified??null});
  }
  const resources=await main.listResources();
  assert.ok(resources.resources.some(x=>x.uri==='aperi://api/operations'));
  const index=await main.readResource({uri:'aperi://api/operations'});
  const operations=JSON.parse(index.contents[0].text);
  assert.equal(operations.operationCount,180);
  assert.equal(operations.referenceOnly,true);
  const order=await main.readResource({uri:'aperi://api/operations/submitOrder'});
  const orderReference=JSON.parse(order.contents[0].text);
  assert.equal(orderReference.executableThroughThisMcp,false);
  assert.equal(orderReference.referenceOnly,true);
  await main.getPrompt({name:'aperi-market-research',arguments:{symbol:'NVDA'}});
  cases.push({label:'resources and research prompt',passed:true,referenceOperations:operations.operationCount,financialReferenceExecutable:false});
} finally { await main.close(); }

const legacy=await connect('legacy');
try {
  assert.equal((await legacy.listTools()).tools.length,16);
  assert.equal(brief(await legacy.callTool({name:'aperi_get_quote',arguments:{marketId}})).ok,true);
  cases.push({label:'legacy stateless client',passed:true,protocol:legacy.getNegotiatedProtocolVersion()});
} finally { await legacy.close(); }

for(const [label,headers,status,path] of [
  ['foreign Origin refused',{origin:'https://untrusted.example'},403,'/mcp'],
  ['credential refused',{authorization:'Bearer not-a-secret'},400,'/mcp'],
  ['query parameter refused',{},400,'/mcp?url=https://untrusted.example']
]) {
  const response=await fetch('https://mcp.aperi.io'+path,{method:'POST',headers:{'content-type':'application/json',...headers},body:'{}',redirect:'manual'});
  assert.equal(response.status,status);
  cases.push({label,passed:true,httpStatus:response.status,code:(await response.json()).error.code});
}
for(const path of ['/','/style.css','/health','/privacy-policy','/terms']) {
  const response=await fetch('https://mcp.aperi.io'+path,{redirect:'manual'});
  assert.equal(response.status,200);
  assert.equal(response.headers.get('x-content-type-options'),'nosniff');
  cases.push({label:'public surface '+path,passed:true,httpStatus:response.status});
}
const archive=await fetch('https://mcp.aperi.io/downloads/aperi-market-research-0.1.1.zip',{redirect:'manual'});
assert.equal(archive.status,200);
const bytes=Buffer.from(await archive.arrayBuffer());
const zipSha256=createHash('sha256').update(bytes).digest('hex');
assert.equal(zipSha256,'6779e60aac9755407897ca1cac7c9dffe892b576e90fd5e39ddf3f262f2e26b9');
cases.push({label:'live plugin archive matches reviewed package',passed:true,bytes:bytes.length,sha256:zipSha256});
const receipt={observedAt:new Date().toISOString(),endpoint:endpoint.href,passed:true,caseCount:cases.length,toolCount:16,referenceOperationCount:180,cases,wire,financialActions:0,credentialsUsed:false,syntheticPublicWallet:syntheticWallet,automaticMutationRetry:false};
await mkdir(evidence,{recursive:true});
await writeFile(new URL('public-canary.json',evidence),JSON.stringify(receipt,null,2)+'\n');
console.log(JSON.stringify({passed:true,caseCount:cases.length,all16Tools:true,marketId,zipSha256,evidence:new URL('public-canary.json',evidence).pathname}));
