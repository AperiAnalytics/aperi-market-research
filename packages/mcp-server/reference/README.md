# Aperi API reference snapshot

Captured from `https://aperi.io/api/v1/openapi.json` on 2026-10-11 at 18:21 UTC. The live and local developer contracts match all 180 operation IDs, HTTP methods and paths. `operations.json` includes endpoint descriptions, authentication classes, parameters and schemas from `contracts/developer-api.ts` at the same checkout.

The reference includes financial and account administration workflows for documentation. Their inclusion does not make them executable MCP tools. The research server uses a fixed allowlist of 16 public read operations; app cookies, owner identity proofs, key administration and financial writes are outside its tool surface. The public API currently declares every protected financial gateway unavailable and `liveTradingQualified: false`.

Hashes (SHA-256):

| Artifact | Hash |
| --- | --- |
| Original public HTTP response | `c9ea656b3e731888e570ed06ff97098e6feff8b5a68b1a2aefabbb558efeb0a3` |
| Stored `openapi.json`, formatted with a trailing newline | `576308792b427eec086cdbdb5196c5338501796dbf19c6d20e9ec02c1d5d8abf` |
| Stored `operations.json` | `036bd3eaf346f38d9c82d2c5c762098db73f9d95c62b01c753daba9c1281a4c1` |

This public source release includes `operations.json`; the original OpenAPI response is linked at the public URL above rather than bundled. Detailed platform release receipts remain in the private development repository. Refreshing this snapshot requires a source review; a new operation in a fetched specification does not automatically grant executable authority.
