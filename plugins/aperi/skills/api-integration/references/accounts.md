# Aperi REST API: Accounts & portfolio

Reference snapshot: 2026-10-11. This is API documentation; app/private/financial operations are outside the hosted MCP tool permissions. Examples are illustrative, not live observations. See [the operation index](api-index.md) and [current OpenAPI](https://aperi.trade/api/v1/openapi.json).

## readAccount

Read an observed account

`GET /api/v1/accounts/{wallet}`

Public Hyperliquid account observations: main and xyz perpetual pools, spot balances, positions, open orders, fills, funding, order history and portfolio series.

Authentication: Public. No credential required.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| wallet | path | string | Yes | EVM wallet address to observe; observing a wallet grants no authority. |

Illustrative response (examples are not live observations):

```json
{
  "address": "0x1111111111111111111111111111111111111111",
  "venue": "hyperliquid",
  "accounts": [],
  "coverage": {
    "dexes": [
      "",
      "xyz"
    ],
    "accountModeQualified": false
  },
  "aster": {
    "status": "signed_read_required"
  }
}
```

- Not a complete multi-venue balance. Aster private data requires an independently authorized venue account.
- Fills and orders are venue-retained windows. Funding is the first page of the recent 30-day window. Inspect coverage.sources for missing reads.

## readPortfolio

Read owned portfolio

`GET /api/v1/portfolio`

Read the protected native portfolio for the identity-bound wallet, including the observer’s freshness and coverage holds.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| wallet | query | string | Yes | Lowercase owner EVM wallet address. |

Illustrative response (examples are not live observations):

```json
{
  "error": {
    "code": "PRIVATE_GATEWAY_NOT_CONFIGURED",
    "message": "The protected trading service could not accept this request."
  },
  "financialAuthority": false
}
```

- The current observer covers approved Hyperliquid USDC pools. It does not convert Aster USDT or claim complete USD equity.

## readWallet

Read wallet enrollment

`GET /api/v1/wallet`

Inspect the wallet enrolled to the current independently verified identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Illustrative response (examples are not live observations):

```json
{
  "error": {
    "code": "PRIVATE_GATEWAY_NOT_CONFIGURED",
    "message": "The protected trading service could not accept this request."
  },
  "financialAuthority": false
}
```

## walletChallenge

Prepare wallet verification

`POST /api/v1/wallet/challenge`

Request the existing owner-bound enrollment challenge.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object"
}
```

Illustrative response (examples are not live observations):

```json
{
  "error": {
    "code": "PRIVATE_GATEWAY_NOT_CONFIGURED",
    "message": "The protected trading service could not accept this request."
  },
  "financialAuthority": false
}
```

- Complete the exact returned off-chain wallet signature. A challenge creates no trading permission.

## walletEnroll

Verify wallet ownership

`POST /api/v1/wallet/enroll`

Submit the owner-bound enrollment proof to the regional wallet service.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object"
}
```

Illustrative response (examples are not live observations):

```json
{
  "error": {
    "code": "PRIVATE_GATEWAY_NOT_CONFIGURED",
    "message": "The protected trading service could not accept this request."
  },
  "financialAuthority": false
}
```

## capitalStatus

Read capital capabilities

`GET /api/v1/capital/status`

Inspect customer-owned funding design, coverage and rebalancing qualification without asserting complete balances.

Authentication: Public. No credential required.

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "totalEquityUsd": null,
  "availableMargin": null,
  "coverageComplete": false,
  "executionReady": false
}
```

## getSession

Inspect your session

`GET /api/v1/session`

Read whether the current app session is authenticated and its public account information. The anonymous response has authenticated=false.

Authentication: Public. No credential required.

Illustrative response (examples are not live observations):

```json
{
  "authenticated": false,
  "user": null
}
```

- Uses the current app cookie where available. A session is not wallet ownership or trading authority.

## createIdentityProof

Request an app identity proof

`POST /api/v1/identity`

Request the short-lived independently signed app identity proof for a signed-in native Aperi account.

Authentication: Current Aperi app session cookie. Writes require Origin matching the app. Market keys are not accepted.

Request example:

```json
{}
```

Request schema:

```json
{
  "type": "object",
  "properties": {},
  "additionalProperties": false
}
```

Illustrative response (examples are not live observations):

```json
{
  "purpose": "app-identity-only"
}
```

- Requires a provisioned app identity signer and a current native Aperi account session. Tokens are credentials: keep them in memory and never log them.
- Legacy Cloudflare accounts use the existing POST /auth/identity with no body. Local legacy login retains its identity proof from the verified login exchange.
- The regional service must trust this identity issuer. Native app proof trust is currently provisioned for the local workflow; production acceptance must be verified independently.

