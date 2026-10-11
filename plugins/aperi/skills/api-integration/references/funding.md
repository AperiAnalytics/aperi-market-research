# Aperi REST API: Funding & permissions

Reference snapshot: 2026-10-11. This is API documentation; app/private/financial operations are outside the hosted MCP tool permissions. Examples are illustrative, not live observations. See [the operation index](api-index.md) and [current OpenAPI](https://aperi.io/api/v1/openapi.json).

## fundingContext

Read funding context

`GET /api/v1/funding/context`

Inspect the existing customer-owned funding context and observed eligibility.

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

## fundingPlan

Plan venue funding

`POST /api/v1/funding/plan`

Use the dashboard’s bounded funding planner. Plans do not authorize transfers.

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

## fundingPrepare

Prepare funding consent

`POST /api/v1/funding/prepare`

Prepare the existing funding workflow’s exact wallet consent.

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

## fundingSubmit

Confirm funding consent

`POST /api/v1/funding/submit`

Submit the existing signed funding request to its independently verified regional service.

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

- Preserves the current workflow’s transfer bounds, identity and admission checks. No API key authorizes transfers.

## fundingStatus

Read original funding status

`GET /api/v1/funding/status`

Inspect the original funding request; a relay receipt alone does not prove native settlement.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| fundingId | query | string | Yes | Original lowercase funding UUID. |

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

