---
name: api-integration
description: Explain or build client integrations for Aperi's documented REST API and MCP tools when the user asks about endpoint schemas, authentication, exact market identifiers, key restrictions or safe integration behavior.
---

The production REST base is `https://aperi.io/api/v1`; the hosted public MCP endpoint is `https://mcp.aperi.io/mcp`. Match the user's requested interface. Use the advertised MCP schemas for tool calls and the REST operation's own schema for client code. The plugin provides individually declared public read-only tools, not a generic executor.

For a REST integration, open [the complete operation index](references/api-index.md), find the operation ID, and load its linked section reference. The bundled snapshot covers all 180 documented operations, including protected routes that this MCP does not execute. Check [live OpenAPI](https://aperi.io/api/v1/openapi.json) or [live Markdown](https://aperi.io/api/v1/docs.md) when current behavior or a changed schema matters. Documentation examples are illustrative and are never live account, market or settlement evidence.

Keep these authentication boundaries explicit:

- Public data needs no credential. `markets:read` keys optionally authenticate market, product and venue reads only.
- App settings, watchlists, profile and key management require the user's current app session; keys do not authorize them.
- Protected owner workflows require a short-lived independently verified identity, matching app Origin and each existing native ownership, consent and qualification check. An API key, public address or app cookie alone grants no financial authority.

For an API-key client, read credentials from the caller's secure configuration at runtime; never embed or echo them in generated code, URLs, logs, skills or chat. Keep HTTPS, request deadlines and bounded response sizes. Explain expiry, pause/revocation, IP/CIDR and minute/day/lifetime limits using the actual policy. Direct API IP restrictions observe the trusted client ingress; a hosted MCP relay has a different egress IP and this public MCP does not forward API keys. Origin restrictions are header checks, not authentication of a server caller. Do not advise removing safety restrictions to make a connection work.

Discover product IDs and exact native market IDs rather than inventing them. Encode each REST path segment once, use only documented query fields, preserve decimal strings and identify units. REST candle windows use Unix milliseconds and returned candle time uses Unix seconds. Report missing provider data without changing venue or converting it to zero. Parse HTTP errors and follow bounded retry guidance for reads. Never automatically retry writes or create a fresh intent after an uncertain financial send.

Use protected endpoint references to explain schemas and build reviewable client code. This installed plugin does not send financial requests, sign wallet consent, store wallet secrets, manage app settings or create credentials. Preparation, admission, a venue receipt, a fill and settlement are different states; preserve the original intent and status semantics in any code example. A declared endpoint or enabled configuration does not prove production qualification.

Useful integration outputs include a minimal public market client, an exact endpoint/schema explanation, a read-only MCP configuration, or a clear map of available versus protected API capabilities. Do not add a generic HTTP proxy or use another tool to bypass this plugin's documented permissions.
