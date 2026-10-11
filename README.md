# Aperi Market Research

Public, read-only Aperi market research tools and four packaged skills for
Claude Code, Codex and compatible MCP clients.

MCP endpoint: `https://mcp.aperi.io/mcp` (Streamable HTTP, no authentication).
No API key, wallet connection or local server is needed. The plugin reads
market data and explicitly requested public account observations; it does
not access private accounts, save watchlists, manage keys, sign consent,
place orders or transfer funds.

## Install in Claude Code

```sh
claude plugin marketplace add AperiAnalytics/aperi-market-research
claude plugin install aperi-market-research@aperi-plugins
```

Run `/aperi-market-research:setup` to verify an actual market read.

## Install in Codex

```sh
codex plugin marketplace add AperiAnalytics/aperi-market-research
codex plugin add aperi-market-research@aperi-plugins
```

Run the packaged setup skill after installation. Other skills cover market
research, public account observations and safe API integration. The API
reference describes all 180 REST operations; it does not make protected
operations executable through this public plugin.

## Custom remote connection

Add `https://mcp.aperi.io/mcp` in the client's custom MCP connection settings
with no authentication. This supplies tools; plugin installation also supplies
the skills on supported hosts.

[Package details and local development](plugins/aperi/README.md) ·
[Aperi API](https://aperi.io/api) ·
[Privacy](https://mcp.aperi.io/privacy-policy) ·
[Terms](https://mcp.aperi.io/terms) ·
[Support](https://aperi.io/support).

Direct GitHub installation is separate from official directory approval.
The new plugin instructions and packaging are [MIT licensed](plugins/aperi/LICENSE).
Existing platform code, third-party services and Aperi trademarks are outside
that license.
