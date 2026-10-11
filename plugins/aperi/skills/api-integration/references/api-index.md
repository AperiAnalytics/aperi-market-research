# Aperi REST operation index

Reference snapshot: 2026-10-11. All 180 documented operations from the shared API contract are indexed here. This catalogue is reference material; it does not expand the hosted plugin's public read-only permissions. Protected routes may be unavailable or unqualified in production.

Base URL: `https://aperi.trade/api/v1`. [Live OpenAPI](https://aperi.trade/api/v1/openapi.json) · [Live Markdown](https://aperi.trade/api/v1/docs.md) · [API page](https://aperi.trade/api).

Source SHA-256 (developer API, workflow and key contracts in that order): `49ede3089057c62746cd99523d3334d281f6ad56ea1303e234563f4ace79bc2d`.

Authentication: `public` needs no credential; `market-key` is a public read with an optional `markets:read` key; `app` needs the current app session; `owner` needs independently verified identity and the existing native workflow checks. This hosted MCP uses no credentials and performs no app/owner writes.

Search by operation ID, route, venue, or section, then open only the linked section needed. Native workflow paths preserve their exact dashboard protocol; documentation is not permission to sign or execute.

## Market data

| Operation ID | Method | Route | Authentication |
| --- | --- | --- | --- |
| [listProducts](public-data.md#listproducts) | GET | `/api/v1/products` | market-key |
| [getProduct](public-data.md#getproduct) | GET | `/api/v1/products/{productId}` | market-key |
| [listMarkets](public-data.md#listmarkets) | GET | `/api/v1/markets` | market-key |
| [getMarket](public-data.md#getmarket) | GET | `/api/v1/markets/{marketId}` | market-key |
| [getQuote](public-data.md#getquote) | GET | `/api/v1/markets/{marketId}/quote` | market-key |
| [getBook](public-data.md#getbook) | GET | `/api/v1/markets/{marketId}/book` | market-key |
| [getTrades](public-data.md#gettrades) | GET | `/api/v1/markets/{marketId}/trades` | market-key |
| [getCandles](public-data.md#getcandles) | GET | `/api/v1/markets/{marketId}/candles` | market-key |
| [listVenues](public-data.md#listvenues) | GET | `/api/v1/venues` | market-key |

## Accounts & portfolio

| Operation ID | Method | Route | Authentication |
| --- | --- | --- | --- |
| [readAccount](accounts.md#readaccount) | GET | `/api/v1/accounts/{wallet}` | public |
| [readPortfolio](accounts.md#readportfolio) | GET | `/api/v1/portfolio` | owner |
| [readWallet](accounts.md#readwallet) | GET | `/api/v1/wallet` | owner |
| [walletChallenge](accounts.md#walletchallenge) | POST | `/api/v1/wallet/challenge` | owner |
| [walletEnroll](accounts.md#walletenroll) | POST | `/api/v1/wallet/enroll` | owner |
| [capitalStatus](accounts.md#capitalstatus) | GET | `/api/v1/capital/status` | public |
| [getSession](accounts.md#getsession) | GET | `/api/v1/session` | public |
| [createIdentityProof](accounts.md#createidentityproof) | POST | `/api/v1/identity` | app |

## Watchlists & settings

| Operation ID | Method | Route | Authentication |
| --- | --- | --- | --- |
| [getWatchlist](watchlists.md#getwatchlist) | GET | `/api/v1/watchlist` | app |
| [replaceWatchlist](watchlists.md#replacewatchlist) | PUT | `/api/v1/watchlist` | app |
| [getPreferences](watchlists.md#getpreferences) | GET | `/api/v1/preferences` | app |
| [updatePreferences](watchlists.md#updatepreferences) | PATCH | `/api/v1/preferences` | app |
| [getProfile](watchlists.md#getprofile) | GET | `/api/v1/profile` | app |
| [updateProfile](watchlists.md#updateprofile) | PATCH | `/api/v1/profile` | app |

## Orders & protection

| Operation ID | Method | Route | Authentication |
| --- | --- | --- | --- |
| [previewOrder](trading.md#previeworder) | POST | `/api/v1/orders/preview` | public |
| [getTradingContext](trading.md#gettradingcontext) | GET | `/api/v1/orders/context` | owner |
| [refreshTradingModel](trading.md#refreshtradingmodel) | POST | `/api/v1/orders/model-jobs` | owner |
| [prepareOrder](trading.md#prepareorder) | POST | `/api/v1/orders/prepare` | owner |
| [submitOrder](trading.md#submitorder) | POST | `/api/v1/orders` | owner |
| [getOrderStatus](trading.md#getorderstatus) | GET | `/api/v1/orders/{intentId}` | owner |

## Funding & permissions

| Operation ID | Method | Route | Authentication |
| --- | --- | --- | --- |
| [fundingContext](funding.md#fundingcontext) | GET | `/api/v1/funding/context` | owner |
| [fundingPlan](funding.md#fundingplan) | POST | `/api/v1/funding/plan` | owner |
| [fundingPrepare](funding.md#fundingprepare) | POST | `/api/v1/funding/prepare` | owner |
| [fundingSubmit](funding.md#fundingsubmit) | POST | `/api/v1/funding/submit` | owner |
| [fundingStatus](funding.md#fundingstatus) | GET | `/api/v1/funding/status` | owner |

## Advanced venue workflows

| Operation ID | Method | Route | Authentication |
| --- | --- | --- | --- |
| [native_post_accounts_standardmode_context](native-workflows.md#native_post_accounts_standardmode_context) | POST | `/api/v1/accounts/standard-mode/context` | owner |
| [native_post_accounts_standardmode_originalcontext](native-workflows.md#native_post_accounts_standardmode_originalcontext) | POST | `/api/v1/accounts/standard-mode/original-context` | owner |
| [native_post_accounts_standardmode_prepare](native-workflows.md#native_post_accounts_standardmode_prepare) | POST | `/api/v1/accounts/standard-mode/prepare` | owner |
| [native_post_accounts_standardmode_retire](native-workflows.md#native_post_accounts_standardmode_retire) | POST | `/api/v1/accounts/standard-mode/retire` | owner |
| [native_post_accounts_standardmode_submit](native-workflows.md#native_post_accounts_standardmode_submit) | POST | `/api/v1/accounts/standard-mode/submit` | owner |
| [native_post_agents_context](native-workflows.md#native_post_agents_context) | POST | `/api/v1/agents/context` | owner |
| [native_post_agents_prepare](native-workflows.md#native_post_agents_prepare) | POST | `/api/v1/agents/prepare` | owner |
| [native_post_agents_retireunsubmitted](native-workflows.md#native_post_agents_retireunsubmitted) | POST | `/api/v1/agents/retire-unsubmitted` | owner |
| [native_post_agents_submit](native-workflows.md#native_post_agents_submit) | POST | `/api/v1/agents/submit` | owner |
| [native_post_aster_agents_context](native-workflows.md#native_post_aster_agents_context) | POST | `/api/v1/aster/agents/context` | owner |
| [native_post_aster_agents_prepare](native-workflows.md#native_post_aster_agents_prepare) | POST | `/api/v1/aster/agents/prepare` | owner |
| [native_post_aster_agents_submit](native-workflows.md#native_post_aster_agents_submit) | POST | `/api/v1/aster/agents/submit` | owner |
| [native_post_commands](native-workflows.md#native_post_commands) | POST | `/api/v1/commands` | owner |
| [native_post_commands_prepare](native-workflows.md#native_post_commands_prepare) | POST | `/api/v1/commands/prepare` | owner |
| [native_post_fees_canary_exit_prepare](native-workflows.md#native_post_fees_canary_exit_prepare) | POST | `/api/v1/fees/canary/exit/prepare` | owner |
| [native_post_fees_canary_exit_submit](native-workflows.md#native_post_fees_canary_exit_submit) | POST | `/api/v1/fees/canary/exit/submit` | owner |
| [native_post_fees_canary_mode_prepare](native-workflows.md#native_post_fees_canary_mode_prepare) | POST | `/api/v1/fees/canary/mode/prepare` | owner |
| [native_post_fees_canary_mode_submit](native-workflows.md#native_post_fees_canary_mode_submit) | POST | `/api/v1/fees/canary/mode/submit` | owner |
| [native_post_fees_canary_prepare](native-workflows.md#native_post_fees_canary_prepare) | POST | `/api/v1/fees/canary/prepare` | owner |
| [native_post_fees_canary_submit](native-workflows.md#native_post_fees_canary_submit) | POST | `/api/v1/fees/canary/submit` | owner |
| [native_post_fees_commissioning_prepare](native-workflows.md#native_post_fees_commissioning_prepare) | POST | `/api/v1/fees/commissioning/prepare` | owner |
| [native_post_fees_commissioning_retireunsubmitted](native-workflows.md#native_post_fees_commissioning_retireunsubmitted) | POST | `/api/v1/fees/commissioning/retire-unsubmitted` | owner |
| [native_post_fees_commissioning_submit](native-workflows.md#native_post_fees_commissioning_submit) | POST | `/api/v1/fees/commissioning/submit` | owner |
| [native_post_fees_prepare](native-workflows.md#native_post_fees_prepare) | POST | `/api/v1/fees/prepare` | owner |
| [native_post_fees_submit](native-workflows.md#native_post_fees_submit) | POST | `/api/v1/fees/submit` | owner |
| [native_post_fundingagents_context](native-workflows.md#native_post_fundingagents_context) | POST | `/api/v1/funding-agents/context` | owner |
| [native_post_fundingagents_prepare](native-workflows.md#native_post_fundingagents_prepare) | POST | `/api/v1/funding-agents/prepare` | owner |
| [native_post_fundingagents_retire](native-workflows.md#native_post_fundingagents_retire) | POST | `/api/v1/funding-agents/retire` | owner |
| [native_post_fundingagents_submit](native-workflows.md#native_post_fundingagents_submit) | POST | `/api/v1/funding-agents/submit` | owner |
| [native_post_funding_aster_allowance_claimexternal](native-workflows.md#native_post_funding_aster_allowance_claimexternal) | POST | `/api/v1/funding/aster/allowance/claim-external` | owner |
| [native_post_funding_aster_allowance_hint](native-workflows.md#native_post_funding_aster_allowance_hint) | POST | `/api/v1/funding/aster/allowance/hint` | owner |
| [native_post_funding_aster_allowance_prepare](native-workflows.md#native_post_funding_aster_allowance_prepare) | POST | `/api/v1/funding/aster/allowance/prepare` | owner |
| [native_post_funding_aster_claimexternal](native-workflows.md#native_post_funding_aster_claimexternal) | POST | `/api/v1/funding/aster/claim-external` | owner |
| [native_post_funding_aster_evmsuccessor_claim](native-workflows.md#native_post_funding_aster_evmsuccessor_claim) | POST | `/api/v1/funding/aster/evm-successor/claim` | owner |
| [native_post_funding_aster_evmsuccessor_hint](native-workflows.md#native_post_funding_aster_evmsuccessor_hint) | POST | `/api/v1/funding/aster/evm-successor/hint` | owner |
| [native_post_funding_aster_evmsuccessor_prepare](native-workflows.md#native_post_funding_aster_evmsuccessor_prepare) | POST | `/api/v1/funding/aster/evm-successor/prepare` | owner |
| [native_post_funding_aster_evmsuccessor_refresh](native-workflows.md#native_post_funding_aster_evmsuccessor_refresh) | POST | `/api/v1/funding/aster/evm-successor/refresh` | owner |
| [native_post_funding_aster_evmsuccessor_request](native-workflows.md#native_post_funding_aster_evmsuccessor_request) | POST | `/api/v1/funding/aster/evm-successor/request` | owner |
| [native_post_funding_aster_evmsuccessor_retirerequest](native-workflows.md#native_post_funding_aster_evmsuccessor_retirerequest) | POST | `/api/v1/funding/aster/evm-successor/retire-request` | owner |
| [native_post_funding_aster_evmsuccessor_retireunsigned](native-workflows.md#native_post_funding_aster_evmsuccessor_retireunsigned) | POST | `/api/v1/funding/aster/evm-successor/retire-unsigned` | owner |
| [native_post_funding_aster_hint](native-workflows.md#native_post_funding_aster_hint) | POST | `/api/v1/funding/aster/hint` | owner |
| [native_post_funding_aster_initialdeposit_claim](native-workflows.md#native_post_funding_aster_initialdeposit_claim) | POST | `/api/v1/funding/aster/initial-deposit/claim` | owner |
| [native_post_funding_aster_initialdeposit_hint](native-workflows.md#native_post_funding_aster_initialdeposit_hint) | POST | `/api/v1/funding/aster/initial-deposit/hint` | owner |
| [native_post_funding_aster_initialdeposit_intent](native-workflows.md#native_post_funding_aster_initialdeposit_intent) | POST | `/api/v1/funding/aster/initial-deposit/intent` | owner |
| [native_post_funding_aster_initialdeposit_prepare](native-workflows.md#native_post_funding_aster_initialdeposit_prepare) | POST | `/api/v1/funding/aster/initial-deposit/prepare` | owner |
| [native_post_funding_aster_initialdeposit_retireunsigned](native-workflows.md#native_post_funding_aster_initialdeposit_retireunsigned) | POST | `/api/v1/funding/aster/initial-deposit/retire-unsigned` | owner |
| [native_post_funding_aster_initialdeposit_unprepareddisposition](native-workflows.md#native_post_funding_aster_initialdeposit_unprepareddisposition) | POST | `/api/v1/funding/aster/initial-deposit/unprepared-disposition` | owner |
| [native_post_funding_aster_plan](native-workflows.md#native_post_funding_aster_plan) | POST | `/api/v1/funding/aster/plan` | owner |
| [native_post_funding_aster_prepare](native-workflows.md#native_post_funding_aster_prepare) | POST | `/api/v1/funding/aster/prepare` | owner |
| [native_post_funding_aster_prepareplanned](native-workflows.md#native_post_funding_aster_prepareplanned) | POST | `/api/v1/funding/aster/prepare-planned` | owner |
| [native_post_funding_aster_reserve](native-workflows.md#native_post_funding_aster_reserve) | POST | `/api/v1/funding/aster/reserve` | owner |
| [native_post_funding_evmsuccessor_claim](native-workflows.md#native_post_funding_evmsuccessor_claim) | POST | `/api/v1/funding/evm-successor/claim` | owner |
| [native_post_funding_evmsuccessor_hint](native-workflows.md#native_post_funding_evmsuccessor_hint) | POST | `/api/v1/funding/evm-successor/hint` | owner |
| [native_post_funding_evmsuccessor_prepare](native-workflows.md#native_post_funding_evmsuccessor_prepare) | POST | `/api/v1/funding/evm-successor/prepare` | owner |
| [native_post_funding_evmsuccessor_refresh](native-workflows.md#native_post_funding_evmsuccessor_refresh) | POST | `/api/v1/funding/evm-successor/refresh` | owner |
| [native_post_funding_evmsuccessor_request](native-workflows.md#native_post_funding_evmsuccessor_request) | POST | `/api/v1/funding/evm-successor/request` | owner |
| [native_post_funding_evmsuccessor_retirerequest](native-workflows.md#native_post_funding_evmsuccessor_retirerequest) | POST | `/api/v1/funding/evm-successor/retire-request` | owner |
| [native_post_funding_evmsuccessor_retireunsigned](native-workflows.md#native_post_funding_evmsuccessor_retireunsigned) | POST | `/api/v1/funding/evm-successor/retire-unsigned` | owner |
| [native_post_funding_hypercore_inward_claim](native-workflows.md#native_post_funding_hypercore_inward_claim) | POST | `/api/v1/funding/hypercore/inward/claim` | owner |
| [native_post_funding_hypercore_inward_plan](native-workflows.md#native_post_funding_hypercore_inward_plan) | POST | `/api/v1/funding/hypercore/inward/plan` | owner |
| [native_post_funding_hypercore_inward_prepare](native-workflows.md#native_post_funding_hypercore_inward_prepare) | POST | `/api/v1/funding/hypercore/inward/prepare` | owner |
| [native_post_funding_hypercore_inward_report](native-workflows.md#native_post_funding_hypercore_inward_report) | POST | `/api/v1/funding/hypercore/inward/report` | owner |
| [native_post_funding_hypercore_prepare](native-workflows.md#native_post_funding_hypercore_prepare) | POST | `/api/v1/funding/hypercore/prepare` | owner |
| [native_post_funding_hypercore_submit](native-workflows.md#native_post_funding_hypercore_submit) | POST | `/api/v1/funding/hypercore/submit` | owner |
| [native_post_funding_legacydeposit_claim](native-workflows.md#native_post_funding_legacydeposit_claim) | POST | `/api/v1/funding/legacy-deposit/claim` | owner |
| [native_post_funding_legacydeposit_hashhint](native-workflows.md#native_post_funding_legacydeposit_hashhint) | POST | `/api/v1/funding/legacy-deposit/hash-hint` | owner |
| [native_post_funding_legacydeposit_plan](native-workflows.md#native_post_funding_legacydeposit_plan) | POST | `/api/v1/funding/legacy-deposit/plan` | owner |
| [native_post_funding_legacydeposit_prepare](native-workflows.md#native_post_funding_legacydeposit_prepare) | POST | `/api/v1/funding/legacy-deposit/prepare` | owner |
| [native_post_funding_legacydeposit_reserve](native-workflows.md#native_post_funding_legacydeposit_reserve) | POST | `/api/v1/funding/legacy-deposit/reserve` | owner |
| [native_post_funding_ostium_plan](native-workflows.md#native_post_funding_ostium_plan) | POST | `/api/v1/funding/ostium/plan` | owner |
| [native_post_funding_ostium_reserve](native-workflows.md#native_post_funding_ostium_reserve) | POST | `/api/v1/funding/ostium/reserve` | owner |
| [native_post_funding_ownerinitialdeposit_claim](native-workflows.md#native_post_funding_ownerinitialdeposit_claim) | POST | `/api/v1/funding/owner-initial-deposit/claim` | owner |
| [native_post_funding_ownerinitialdeposit_hashhint](native-workflows.md#native_post_funding_ownerinitialdeposit_hashhint) | POST | `/api/v1/funding/owner-initial-deposit/hash-hint` | owner |
| [native_post_funding_ownerinitialdeposit_prepare](native-workflows.md#native_post_funding_ownerinitialdeposit_prepare) | POST | `/api/v1/funding/owner-initial-deposit/prepare` | owner |
| [native_post_funding_ownerinitialdeposit_releaseunclaimed](native-workflows.md#native_post_funding_ownerinitialdeposit_releaseunclaimed) | POST | `/api/v1/funding/owner-initial-deposit/release-unclaimed` | owner |
| [native_post_funding_ownerinitialdeposit_request](native-workflows.md#native_post_funding_ownerinitialdeposit_request) | POST | `/api/v1/funding/owner-initial-deposit/request` | owner |
| [native_post_funding_ownerinitialdeposit_unprepareddisposition](native-workflows.md#native_post_funding_ownerinitialdeposit_unprepareddisposition) | POST | `/api/v1/funding/owner-initial-deposit/unprepared-disposition` | owner |
| [native_post_funding_reserve](native-workflows.md#native_post_funding_reserve) | POST | `/api/v1/funding/reserve` | owner |
| [native_post_funding_retireoriginal](native-workflows.md#native_post_funding_retireoriginal) | POST | `/api/v1/funding/retire-original` | owner |
| [native_post_ostium_context](native-workflows.md#native_post_ostium_context) | POST | `/api/v1/ostium/context` | owner |
| [native_post_ostium_planning](native-workflows.md#native_post_ostium_planning) | POST | `/api/v1/ostium/planning` | owner |
| [native_post_ostium_prepare](native-workflows.md#native_post_ostium_prepare) | POST | `/api/v1/ostium/prepare` | owner |
| [native_post_ostium_setup_context](native-workflows.md#native_post_ostium_setup_context) | POST | `/api/v1/ostium/setup/context` | owner |
| [native_post_ostium_setup_externalclaim](native-workflows.md#native_post_ostium_setup_externalclaim) | POST | `/api/v1/ostium/setup/external-claim` | owner |
| [native_post_ostium_setup_externalhint](native-workflows.md#native_post_ostium_setup_externalhint) | POST | `/api/v1/ostium/setup/external-hint` | owner |
| [native_post_ostium_setup_prepare](native-workflows.md#native_post_ostium_setup_prepare) | POST | `/api/v1/ostium/setup/prepare` | owner |
| [native_post_ostium_setup_submit](native-workflows.md#native_post_ostium_setup_submit) | POST | `/api/v1/ostium/setup/submit` | owner |
| [native_post_trading_modeljobs](native-workflows.md#native_post_trading_modeljobs) | POST | `/api/v1/trading/model-jobs` | owner |
| [native_get_accounts_standardmode_status](native-workflows.md#native_get_accounts_standardmode_status) | GET | `/api/v1/accounts/standard-mode/status` | owner |
| [native_get_agents_originalcontext](native-workflows.md#native_get_agents_originalcontext) | GET | `/api/v1/agents/original-context` | owner |
| [native_get_agents_status](native-workflows.md#native_get_agents_status) | GET | `/api/v1/agents/status` | owner |
| [native_get_aster_agents_status](native-workflows.md#native_get_aster_agents_status) | GET | `/api/v1/aster/agents/status` | owner |
| [native_get_commands_intentId](native-workflows.md#native_get_commands_intentid) | GET | `/api/v1/commands/{intentId}` | owner |
| [native_get_fees_canary_context](native-workflows.md#native_get_fees_canary_context) | GET | `/api/v1/fees/canary/context` | owner |
| [native_get_fees_canary_exit_context](native-workflows.md#native_get_fees_canary_exit_context) | GET | `/api/v1/fees/canary/exit/context` | owner |
| [native_get_fees_canary_exit_status](native-workflows.md#native_get_fees_canary_exit_status) | GET | `/api/v1/fees/canary/exit/status` | owner |
| [native_get_fees_canary_mode_context](native-workflows.md#native_get_fees_canary_mode_context) | GET | `/api/v1/fees/canary/mode/context` | owner |
| [native_get_fees_canary_mode_status](native-workflows.md#native_get_fees_canary_mode_status) | GET | `/api/v1/fees/canary/mode/status` | owner |
| [native_get_fees_canary_status](native-workflows.md#native_get_fees_canary_status) | GET | `/api/v1/fees/canary/status` | owner |
| [native_get_fees_commissioning_context](native-workflows.md#native_get_fees_commissioning_context) | GET | `/api/v1/fees/commissioning/context` | owner |
| [native_get_fees_commissioning_originalcontext](native-workflows.md#native_get_fees_commissioning_originalcontext) | GET | `/api/v1/fees/commissioning/original-context` | owner |
| [native_get_fees_commissioning_status](native-workflows.md#native_get_fees_commissioning_status) | GET | `/api/v1/fees/commissioning/status` | owner |
| [native_get_fees_context](native-workflows.md#native_get_fees_context) | GET | `/api/v1/fees/context` | owner |
| [native_get_fees_status](native-workflows.md#native_get_fees_status) | GET | `/api/v1/fees/status` | owner |
| [native_get_fundingagents_status](native-workflows.md#native_get_fundingagents_status) | GET | `/api/v1/funding-agents/status` | owner |
| [native_get_funding_aster_allowance_status](native-workflows.md#native_get_funding_aster_allowance_status) | GET | `/api/v1/funding/aster/allowance/status` | owner |
| [native_get_funding_aster_context](native-workflows.md#native_get_funding_aster_context) | GET | `/api/v1/funding/aster/context` | owner |
| [native_get_funding_aster_evmsuccessor_context](native-workflows.md#native_get_funding_aster_evmsuccessor_context) | GET | `/api/v1/funding/aster/evm-successor/context` | owner |
| [native_get_funding_aster_evmsuccessor_history](native-workflows.md#native_get_funding_aster_evmsuccessor_history) | GET | `/api/v1/funding/aster/evm-successor/history` | owner |
| [native_get_funding_aster_evmsuccessor_status](native-workflows.md#native_get_funding_aster_evmsuccessor_status) | GET | `/api/v1/funding/aster/evm-successor/status` | owner |
| [native_get_funding_aster_initialdeposit_context](native-workflows.md#native_get_funding_aster_initialdeposit_context) | GET | `/api/v1/funding/aster/initial-deposit/context` | owner |
| [native_get_funding_aster_initialdeposit_setup](native-workflows.md#native_get_funding_aster_initialdeposit_setup) | GET | `/api/v1/funding/aster/initial-deposit/setup` | owner |
| [native_get_funding_aster_initialdeposit_status](native-workflows.md#native_get_funding_aster_initialdeposit_status) | GET | `/api/v1/funding/aster/initial-deposit/status` | owner |
| [native_get_funding_aster_originals](native-workflows.md#native_get_funding_aster_originals) | GET | `/api/v1/funding/aster/originals` | owner |
| [native_get_funding_aster_plannedstatus](native-workflows.md#native_get_funding_aster_plannedstatus) | GET | `/api/v1/funding/aster/planned-status` | owner |
| [native_get_funding_aster_status](native-workflows.md#native_get_funding_aster_status) | GET | `/api/v1/funding/aster/status` | owner |
| [native_get_funding_evmsuccessor_context](native-workflows.md#native_get_funding_evmsuccessor_context) | GET | `/api/v1/funding/evm-successor/context` | owner |
| [native_get_funding_evmsuccessor_history](native-workflows.md#native_get_funding_evmsuccessor_history) | GET | `/api/v1/funding/evm-successor/history` | owner |
| [native_get_funding_evmsuccessor_status](native-workflows.md#native_get_funding_evmsuccessor_status) | GET | `/api/v1/funding/evm-successor/status` | owner |
| [native_get_funding_hypercore_context](native-workflows.md#native_get_funding_hypercore_context) | GET | `/api/v1/funding/hypercore/context` | owner |
| [native_get_funding_hypercore_inward_context](native-workflows.md#native_get_funding_hypercore_inward_context) | GET | `/api/v1/funding/hypercore/inward/context` | owner |
| [native_get_funding_hypercore_inward_status](native-workflows.md#native_get_funding_hypercore_inward_status) | GET | `/api/v1/funding/hypercore/inward/status` | owner |
| [native_get_funding_hypercore_status](native-workflows.md#native_get_funding_hypercore_status) | GET | `/api/v1/funding/hypercore/status` | owner |
| [native_get_funding_legacydeposit_context](native-workflows.md#native_get_funding_legacydeposit_context) | GET | `/api/v1/funding/legacy-deposit/context` | owner |
| [native_get_funding_legacydeposit_status](native-workflows.md#native_get_funding_legacydeposit_status) | GET | `/api/v1/funding/legacy-deposit/status` | owner |
| [native_get_funding_originals](native-workflows.md#native_get_funding_originals) | GET | `/api/v1/funding/originals` | owner |
| [native_get_funding_ownerinitialdeposit_context](native-workflows.md#native_get_funding_ownerinitialdeposit_context) | GET | `/api/v1/funding/owner-initial-deposit/context` | owner |
| [native_get_funding_ownerinitialdeposit_setup](native-workflows.md#native_get_funding_ownerinitialdeposit_setup) | GET | `/api/v1/funding/owner-initial-deposit/setup` | owner |
| [native_get_funding_ownerinitialdeposit_status](native-workflows.md#native_get_funding_ownerinitialdeposit_status) | GET | `/api/v1/funding/owner-initial-deposit/status` | owner |
| [native_get_ostium_accounts](native-workflows.md#native_get_ostium_accounts) | GET | `/api/v1/ostium/accounts` | owner |
| [native_get_ostium_accounts_accountId_positions](native-workflows.md#native_get_ostium_accounts_accountid_positions) | GET | `/api/v1/ostium/accounts/{accountId}/positions` | owner |
| [native_get_ostium_intents_intentId](native-workflows.md#native_get_ostium_intents_intentid) | GET | `/api/v1/ostium/intents/{intentId}` | owner |
| [native_get_ostium_setup_intents_intentId](native-workflows.md#native_get_ostium_setup_intents_intentid) | GET | `/api/v1/ostium/setup/intents/{intentId}` | owner |
| [native_get_trading_context](native-workflows.md#native_get_trading_context) | GET | `/api/v1/trading/context` | owner |

## Platform & discovery

| Operation ID | Method | Route | Authentication |
| --- | --- | --- | --- |
| [getCalendar](platform.md#getcalendar) | GET | `/api/v1/calendar` | public |
| [getLeaderboard](platform.md#getleaderboard) | GET | `/api/v1/leaderboard` | public |
| [getApiHealth](platform.md#getapihealth) | GET | `/api/v1/health` | public |
| [getApiStatus](platform.md#getapistatus) | GET | `/api/v1/status` | public |
| [getApiCapabilities](platform.md#getapicapabilities) | GET | `/api/v1/capabilities` | public |
| [listApiKeys](platform.md#listapikeys) | GET | `/api/v1/keys` | app |
| [createApiKey](platform.md#createapikey) | POST | `/api/v1/keys` | app |
| [updateApiKey](platform.md#updateapikey) | PATCH | `/api/v1/keys/{keyId}` | app |
| [getApiKeyAudit](platform.md#getapikeyaudit) | GET | `/api/v1/keys/audit` | app |
| [revokeApiKey](platform.md#revokeapikey) | DELETE | `/api/v1/keys/{keyId}` | app |
| [getOpenApi](platform.md#getopenapi) | GET | `/api/v1/openapi.json` | public |
| [getApiMarkdown](platform.md#getapimarkdown) | GET | `/api/v1/docs.md` | public |
