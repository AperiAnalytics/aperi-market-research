import {bindings,defineConfig} from 'cf/config';
import * as entrypoint from './src/worker.ts' with {type:'cf-worker'};
export default defineConfig({
  accountId:'95954b4a76db9d1eec8c4080deed4730',
  worker:{
    name:'aperi-mcp',entrypoint,compatibilityDate:'2026-10-11',workersDev:false,
    domains:['mcp.aperi.io'],limits:{cpuMs:1000},
    assets:{runWorkerFirst:true},
    observability:{enabled:true,redactQueryString:true},
    env:{
      ASSETS:bindings.assets(),
      MCP_REQUEST_BUDGET:bindings.rateLimit({namespace:'10411101',simple:{limit:60,period:60}}),
      MCP_GLOBAL_BUDGET:bindings.rateLimit({namespace:'10411102',simple:{limit:1000,period:60}}),
      MCP_DATA_BUDGET:bindings.rateLimit({namespace:'10411103',simple:{limit:90,period:60}})
    }
  }
});
