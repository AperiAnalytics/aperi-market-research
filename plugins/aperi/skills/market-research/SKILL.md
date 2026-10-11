---
name: market-research
description: Research products, quotes, liquidity, candle history, funding and calendar context on Aperi when the user asks about listed perpetual markets or compares their available venues.
---

Start with `aperi_list_products` for a company, ticker or asset request. Use the returned canonical product ID with `aperi_get_product`. Use `aperi_list_markets` or the product's returned candidates to select the exact native market ID. Keep the venue, collateral, market kind and native instrument identity with every observation; a ticker alone does not identify a perpetual contract. If multiple candidates fit and the choice changes the result, ask which venue or compare the candidates without choosing one silently.

Use the available tools for the user's question:

- `aperi_get_market` and `aperi_get_quote`: specifications, current prices and statistics.
- `aperi_get_order_book` and `aperi_get_recent_trades`: native liquidity and trade observations where supported.
- `aperi_get_candles`: historical prices for the selected native market; choose a bounded interval and window.
- `aperi_list_venues` and `aperi_get_capabilities`: venue support and declared capability coverage.
- `aperi_get_calendar` and `aperi_get_leaderboard`: requested calendar context or the opt-in public leaderboard.
- `aperi_get_platform_status` and `aperi_get_capital_status`: configured service availability and capital coverage.

Use the tool's advertised input schema rather than inventing arguments. Never synthesize market IDs, switch venues after a failed read, or substitute another venue's candles. Oracle instruments may have quotes without an order book or native trade tape; report unsupported data without fabricating it.

Preserve decimal strings for money, size, funding and rates. Use exact decimal arithmetic or string formatting for calculations; do not parse financial values into binary floating point. A numeric display may be rounded only with its units and rounding made clear. Do not label volume or open interest as USD unless the source explicitly identifies that unit. Most source observation clocks are Unix milliseconds; candle timestamps are Unix seconds. Interpret each field according to its schema.

Inspect source status, freshness, coverage and errors before drawing conclusions. Null, missing and held values are unavailable, not zero. Do not imply complete balances, a reliable price or current liquidity from an incomplete provider response. Explain a partial calendar instead of calling missing events an empty week.

Return a concise sourced comparison or answer with exact market identity, requested metrics and their units, observation time when relevant, and material coverage limits. Keep factual observations distinct from calculations or interpretation. A public quote, leverage limit or configured service does not authorize a trade or prove execution readiness. This workflow does not place orders, sign consent, transfer funds or give personalized investment instructions.

Example requests: “Compare the available NVDA perpetual markets and their coverage”; “Show recent native trades and the book for this market”; “Chart this exact market's daily candles for the requested period.”
