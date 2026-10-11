---
name: public-account
description: Inspect public Aperi account observations when the user supplies an EVM wallet address and asks about its visible positions, balances, orders or coverage.
---

Use `aperi_read_public_account` only for the wallet address the user supplies or explicitly selects. If the address is missing or ambiguous, ask for a public EVM address; do not request a private key, seed phrase, session cookie or identity token. Observing a public address grants no ownership or trading authority.

Inspect source status, coverage and freshness before summarizing balances, positions or orders. Public observation can cover some venues or fields while other values remain unavailable. Preserve account and venue boundaries. Null or absent balance fields are not zero, and partial equity is not a complete portfolio valuation. Do not infer a person's identity or related wallets from the observed address.

Keep financial values as decimal strings. For derived totals, use exact decimal arithmetic and combine values only when their units, collateral and coverage make the calculation valid. Report leverage only as observed; an advertised maximum is not the account's selected leverage. Preserve the native market ID on positions so they cannot be confused with another venue's contract.

Answer with the requested public facts, a link to the public source when available, observation time when relevant, and any missing coverage. If the server cannot observe the requested account, say so. Do not call public account data a verified private account, use it to sign messages, or present a venue receipt as evidence of a fill or settlement.

For requests to modify orders, stop losses, watchlists, permissions or funding, explain that the hosted plugin has public read-only permissions. API developers can consult [API integration](../api-integration/SKILL.md) for the documented interfaces; it does not grant execution access.
