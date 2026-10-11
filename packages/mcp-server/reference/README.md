# Aperi API reference snapshot

Originally captured from the former production API on 2026-10-11 at 18:21 UTC. On 2026-10-12 the stored specification’s server URL and app-origin examples were normalized to the new `https://aperi.trade/api/v1` destination; this source edit is not a new live observation. The live and local developer contracts match all 180 operation IDs, HTTP methods and paths. `operations.json` includes endpoint descriptions, authentication classes, parameters and schemas from `contracts/developer-api.ts` at the same checkout.

The reference includes financial and account administration workflows for documentation. Their inclusion does not make them executable MCP tools. The research server uses a fixed allowlist of 16 public read operations; app cookies, owner identity proofs, key administration and financial writes are outside its tool surface. The public API currently declares every protected financial gateway unavailable and `liveTradingQualified: false`.

Hashes (SHA-256); the original response hash describes the historical capture:

| Artifact | Hash |
| --- | --- |
| Original public HTTP response | `c9ea656b3e731888e570ed06ff97098e6feff8b5a68b1a2aefabbb558efeb0a3` |
| Current normalized `openapi.json`, formatted with a trailing newline | `1f180c9aa56401b3de6d14fa21cda8789889a9e703ebffd73910c66e8b6fa132` |
| Stored `operations.json` | `036bd3eaf346f38d9c82d2c5c762098db73f9d95c62b01c753daba9c1281a4c1` |

See `docs/mcp-api-audit.md` and `docs/evidence/local/mcp-plugin-api-audit-2026-10-11/` for the live checks and limitations. Refreshing this snapshot requires a source review; a new operation in a fetched specification does not automatically grant executable authority.
