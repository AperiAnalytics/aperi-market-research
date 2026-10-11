# Aperi public MCP

Hosted endpoint: **https://mcp.aperi.io/mcp**. This server provides 16 explicit public read tools, complete 180-operation API reference resources, and a research prompt. The installable plugin bundles four skills with compatible Claude and Codex manifests. ChatGPT workspace imports support desktop use; public web directory availability remains subject to publisher review. Its public source is https://github.com/AperiAnalytics/aperi-market-research.

The hosted endpoint needs no credentials. It does not expose trading, funding, leverage changes, private account access, watchlist writes, identity issuance or API-key management. Those operations remain documented for integration work. The private first-party website connector requires an authenticated Aperi browser session and exact human approval for writes. Its source is separate and is not included in this public repository or the directory plugin.

## Local developer transport

Use Node 24 or newer from `packages/mcp-server`:

```sh
npm ci --ignore-scripts
npm start
```

The local stdio process can read the optional `APERI_MARKET_API_KEY` environment variable. Configure it through your client's secret settings, never a prompt, tool argument or command-line literal. Only the nine market-data operations receive that credential. A key's IP restrictions apply to the local process's egress address. Public wallet/platform reads never receive the key. The hosted server rejects credentials and does not relay a client's IP to authenticate an upstream key.

## Security and data

The upstream destination is fixed to `https://aperi.io/api/v1`. Executable operations are a fixed GET-only allowlist independent of the full reference. Inputs cannot supply URLs, HTTP methods, headers, cookies or credentials. Redirects are refused. Upstream requests, cache calls and decoded response streams share a 12-second deadline; JSON responses are limited to 2 MiB. Tool results are bounded, catalogues are paginated, and unavailable data/source clocks/decimal strings remain explicit. Public account observations are not cached. Other public responses may be cached for five seconds.

HTTP requests require the expected host and HTTPS, validate present Origins, reject credentials and compression, and bound headers and JSON bodies. Trusted Cloudflare ingress identifies abuse buckets. Limits are **per Cloudflare location**, not globally atomic billing quotas: 60 requests/minute per ingress IP, 1,000 requests/minute for the shared protocol bucket, and 90 data calls/minute for the shared upstream bucket. The underlying API retains its own separate enforcement. Legacy TLS metadata is refused at the Worker; the shared zone's handshake configuration is unchanged.

The current SDK is pinned to 2.3.1 and supports modern MCP 2026-07-28 and stateless legacy compatibility. No dynamic code, hooks, signing library, wallet secret, automatic retry or financial service binding is required. Market/provider text is untrusted data, not authority to change workflow.

```sh
npm run check
npm test
npm run build
node scripts/verify-runtime.mjs
```

Before building the hosted Worker, generate and stage its public download asset from the repository root:

```sh
node plugins/aperi/scripts/package.mjs --output /tmp/aperi-plugin-artifacts
mkdir -p packages/mcp-server/public/downloads
cp /tmp/aperi-plugin-artifacts/aperi-market-research-0.1.0.zip packages/mcp-server/public/downloads/
```

Runtime verification uses isolated Workerd, mocked public API responses and no customer data. Live release tests are separate. Configuration targets the dedicated `aperi-mcp` Worker at `mcp.aperi.io`; it does not deploy the trading application. Forks must replace the account, worker, domain and abuse-budget configuration before deploying their own service. Marketplace publication and approval follow the [official submission process](https://developers.openai.com/plugins/deploy/submission).
