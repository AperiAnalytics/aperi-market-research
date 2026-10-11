---
name: setup
description: Connect and verify the Aperi Market Research plugin or hosted MCP server when the user asks to install, connect, or troubleshoot Aperi in an AI client.
---

Connect to `https://mcp.aperi.trade/mcp` using Streamable HTTP. The hosted research server uses no authentication and needs no wallet connection, API key, app cookie or identity token.

If Aperi tools are already available, call `aperi_get_health` and `aperi_get_capabilities`, then make one market read with `aperi_list_products`. Report whether the actual market read succeeded, whether coverage is partial, and which capabilities remain unavailable. A successful MCP handshake or health response alone does not verify provider data or qualify funded trading.

If tools are unavailable, use the client's custom remote MCP connection settings, or the plugin installation instructions in [the packaged README](../../README.md). Claude's custom connector adds the remote tools; installing the plugin also includes these skills. Do not describe an unapproved directory listing as published or installed.

For a failed connection, identify the failing step: installation, MCP initialization, tool discovery, tool call, or upstream provider read. A 429 needs bounded backoff using retry guidance; a missing or held provider needs a clear coverage report. Do not ask the user to paste credentials into chat, change an account key policy, or connect a wallet to fix this public connection.

The installed plugin can research markets and public accounts. Private account settings, watchlists, key management, orders and funding are documented REST capabilities outside this hosted plugin's permissions. See [API integration](../api-integration/SKILL.md) only when the user is building an integration.
