# Aperi Market Research

Version `0.1.2` bundles four skills with the public Aperi MCP connection at
`https://mcp.aperi.trade/mcp`. The connection uses Streamable HTTP and no
authentication. No local server, wallet connection or API key is needed.

The tools read products, native markets, quotes, order books, recent trades,
candles, venues, a public wallet address supplied by the user, calendar,
leaderboard, platform status and capabilities. Availability and source coverage
remain explicit. The plugin does not access private accounts, save watchlists,
manage keys, sign consent, place orders or transfer funds. The API integration
skill includes a searchable reference for all 180 REST operations without
making protected operations executable through this plugin.

## Claude Code

Install from Aperi's public repository:

```sh
claude plugin marketplace add AperiAnalytics/aperi-market-research
claude plugin install aperi-market-research@aperi-plugins
```

From the repository root, validate and load the plugin for one session:

```sh
claude plugin validate ./plugins/aperi --strict
claude --plugin-dir ./plugins/aperi
```

Run `/aperi-market-research:setup` to verify the connection. Other bundled
skills are `market-research`, `public-account`, and `api-integration`.

For a persistent local installation, register this repository's catalog:

```sh
claude plugin marketplace add .
claude plugin install aperi-market-research@aperi-plugins
```

These commands change the caller's own plugin configuration. Publishing the
catalog on a public Git repository makes it available through that repository;
it does not by itself create an approved Anthropic directory listing.

## Codex

The portable `plugin.json` and `mcp.json` use the Agent Plugins 1.0.0 schemas.
The repository catalog is `.agents/plugins/marketplace.json`. Install from
Aperi's public repository:

```sh
codex plugin marketplace add AperiAnalytics/aperi-market-research
codex plugin add aperi-market-research@aperi-plugins
codex plugin list --marketplace aperi-plugins
```

For a local checkout, use `codex plugin marketplace add .` from its root before
the same plugin installation command.

Invoke the packaged `setup` skill after installation and verify an actual
market read. The CLI syntax was checked with Codex `0.159.1` and Claude Code
`2.1.296`; use a current host with the documented plugin support.

## Claude or ChatGPT remote connection

Add `https://mcp.aperi.trade/mcp` in the client's custom remote MCP connection
settings, choosing no authentication. A custom connection supplies the MCP
tools. The plugin package supplies the additional skills on hosts that support
plugin installation; connecting the URL alone does not install the skills.

The root `mcp.json` declares portable `streamable-http` transport. Claude's
compatibility `.mcp.json` declares `http` transport, as required by that host.
Both point at the same public endpoint. No lifecycle hooks, app references,
installation scripts or credential variables are included.

## Useful prompts

- “Compare available NVDA perpetual markets and tell me which sources are missing.”
- “Read the latest quote and native order book for this exact market.”
- “Inspect public positions for this wallet address and explain partial coverage.”
- “Build a minimal public Aperi market-data client using the documented schemas.”

## Distribution and review

The same plugin folder can be distributed as a ZIP or through either supplied
repository catalog. Public directories have independent reviews. An OpenAI
submission needs a verified publishing identity, domain verification, valid
listing and support/privacy/terms URLs, an icon, review cases and an accessible
demo recording. Official approval cannot be inferred from local validation or
successful live MCP tests. The [public plugin repository](https://github.com/AperiAnalytics/aperi-market-research)
provides direct installation; publisher verification, submission contact,
review materials and each directory's approval remain separate steps.

Publisher contact: `info@aperi.trade`. Mailbox activation and email delivery
are pending verification. Current support remains available through
[Aperi Support](https://aperi.trade/support).

The new plugin instructions and packaging are MIT licensed. Existing platform
code, third-party data and Aperi trademarks are outside that license.

To build a reproducible plugin ZIP and a ZIP containing both local marketplace
catalogs, run this package's maintenance script from the repository root:

```sh
node plugins/aperi/scripts/package.mjs --output .local/aperi-plugin-package
```

The script includes only manifests, skills and their references, brand assets,
README and license. It excludes server dependencies, build output, local
configuration and the maintenance script itself. `release-manifest.json`
records every distributed file and archive hash. The ZIP can be unpacked into
a local directory; the marketplace ZIP supports both installation command
sequences above from its extracted root.

References: [OpenAI packaging](https://developers.openai.com/plugins/build/plugins),
[OpenAI submission](https://developers.openai.com/plugins/deploy/submission),
[OpenAI guidelines](https://developers.openai.com/plugins/plugin-guidelines),
[Claude plugin manifests](https://code.claude.com/docs/en/plugins-reference),
[Claude marketplaces](https://code.claude.com/docs/en/plugin-marketplaces).
