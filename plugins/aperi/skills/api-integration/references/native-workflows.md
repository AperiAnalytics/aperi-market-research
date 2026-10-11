# Aperi REST API: Advanced venue workflows

Reference snapshot: 2026-10-11. This is API documentation; app/private/financial operations are outside the hosted MCP tool permissions. Examples are illustrative, not live observations. See [the operation index](api-index.md) and [current OpenAPI](https://aperi.trade/api/v1/openapi.json).

## native_post_accounts_standardmode_context

accounts · standard mode · context

`POST /api/v1/accounts/standard-mode/context`

Continue the accounts · standard mode · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_accounts_standardmode_originalcontext

accounts · standard mode · original context

`POST /api/v1/accounts/standard-mode/original-context`

Continue the accounts · standard mode · original context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_accounts_standardmode_prepare

accounts · standard mode · prepare

`POST /api/v1/accounts/standard-mode/prepare`

Continue the accounts · standard mode · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_accounts_standardmode_retire

accounts · standard mode · retire

`POST /api/v1/accounts/standard-mode/retire`

Continue the accounts · standard mode · retire workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_accounts_standardmode_submit

accounts · standard mode · submit

`POST /api/v1/accounts/standard-mode/submit`

Continue the accounts · standard mode · submit workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_agents_context

agents · context

`POST /api/v1/agents/context`

Continue the agents · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_agents_prepare

agents · prepare

`POST /api/v1/agents/prepare`

Continue the agents · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_agents_retireunsubmitted

agents · retire unsubmitted

`POST /api/v1/agents/retire-unsubmitted`

Continue the agents · retire unsubmitted workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_agents_submit

agents · submit

`POST /api/v1/agents/submit`

Continue the agents · submit workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_aster_agents_context

aster · agents · context

`POST /api/v1/aster/agents/context`

Continue the aster · agents · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_aster_agents_prepare

aster · agents · prepare

`POST /api/v1/aster/agents/prepare`

Continue the aster · agents · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_aster_agents_submit

aster · agents · submit

`POST /api/v1/aster/agents/submit`

Continue the aster · agents · submit workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_commands

commands

`POST /api/v1/commands`

Continue the commands workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_commands_prepare

commands · prepare

`POST /api/v1/commands/prepare`

Continue the commands · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fees_canary_exit_prepare

fees · canary · exit · prepare

`POST /api/v1/fees/canary/exit/prepare`

Continue the fees · canary · exit · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fees_canary_exit_submit

fees · canary · exit · submit

`POST /api/v1/fees/canary/exit/submit`

Continue the fees · canary · exit · submit workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fees_canary_mode_prepare

fees · canary · mode · prepare

`POST /api/v1/fees/canary/mode/prepare`

Continue the fees · canary · mode · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fees_canary_mode_submit

fees · canary · mode · submit

`POST /api/v1/fees/canary/mode/submit`

Continue the fees · canary · mode · submit workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fees_canary_prepare

fees · canary · prepare

`POST /api/v1/fees/canary/prepare`

Continue the fees · canary · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fees_canary_submit

fees · canary · submit

`POST /api/v1/fees/canary/submit`

Continue the fees · canary · submit workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fees_commissioning_prepare

fees · commissioning · prepare

`POST /api/v1/fees/commissioning/prepare`

Continue the fees · commissioning · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fees_commissioning_retireunsubmitted

fees · commissioning · retire unsubmitted

`POST /api/v1/fees/commissioning/retire-unsubmitted`

Continue the fees · commissioning · retire unsubmitted workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fees_commissioning_submit

fees · commissioning · submit

`POST /api/v1/fees/commissioning/submit`

Continue the fees · commissioning · submit workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fees_prepare

fees · prepare

`POST /api/v1/fees/prepare`

Continue the fees · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fees_submit

fees · submit

`POST /api/v1/fees/submit`

Continue the fees · submit workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fundingagents_context

funding agents · context

`POST /api/v1/funding-agents/context`

Continue the funding agents · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fundingagents_prepare

funding agents · prepare

`POST /api/v1/funding-agents/prepare`

Continue the funding agents · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fundingagents_retire

funding agents · retire

`POST /api/v1/funding-agents/retire`

Continue the funding agents · retire workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_fundingagents_submit

funding agents · submit

`POST /api/v1/funding-agents/submit`

Continue the funding agents · submit workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_allowance_claimexternal

funding · aster · allowance · claim external

`POST /api/v1/funding/aster/allowance/claim-external`

Continue the funding · aster · allowance · claim external workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_allowance_hint

funding · aster · allowance · hint

`POST /api/v1/funding/aster/allowance/hint`

Continue the funding · aster · allowance · hint workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_allowance_prepare

funding · aster · allowance · prepare

`POST /api/v1/funding/aster/allowance/prepare`

Continue the funding · aster · allowance · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_claimexternal

funding · aster · claim external

`POST /api/v1/funding/aster/claim-external`

Continue the funding · aster · claim external workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_evmsuccessor_claim

funding · aster · evm successor · claim

`POST /api/v1/funding/aster/evm-successor/claim`

Continue the funding · aster · evm successor · claim workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_evmsuccessor_hint

funding · aster · evm successor · hint

`POST /api/v1/funding/aster/evm-successor/hint`

Continue the funding · aster · evm successor · hint workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_evmsuccessor_prepare

funding · aster · evm successor · prepare

`POST /api/v1/funding/aster/evm-successor/prepare`

Continue the funding · aster · evm successor · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_evmsuccessor_refresh

funding · aster · evm successor · refresh

`POST /api/v1/funding/aster/evm-successor/refresh`

Continue the funding · aster · evm successor · refresh workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_evmsuccessor_request

funding · aster · evm successor · request

`POST /api/v1/funding/aster/evm-successor/request`

Continue the funding · aster · evm successor · request workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_evmsuccessor_retirerequest

funding · aster · evm successor · retire request

`POST /api/v1/funding/aster/evm-successor/retire-request`

Continue the funding · aster · evm successor · retire request workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_evmsuccessor_retireunsigned

funding · aster · evm successor · retire unsigned

`POST /api/v1/funding/aster/evm-successor/retire-unsigned`

Continue the funding · aster · evm successor · retire unsigned workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_hint

funding · aster · hint

`POST /api/v1/funding/aster/hint`

Continue the funding · aster · hint workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_initialdeposit_claim

funding · aster · initial deposit · claim

`POST /api/v1/funding/aster/initial-deposit/claim`

Continue the funding · aster · initial deposit · claim workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_initialdeposit_hint

funding · aster · initial deposit · hint

`POST /api/v1/funding/aster/initial-deposit/hint`

Continue the funding · aster · initial deposit · hint workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_initialdeposit_intent

funding · aster · initial deposit · intent

`POST /api/v1/funding/aster/initial-deposit/intent`

Continue the funding · aster · initial deposit · intent workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_initialdeposit_prepare

funding · aster · initial deposit · prepare

`POST /api/v1/funding/aster/initial-deposit/prepare`

Continue the funding · aster · initial deposit · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_initialdeposit_retireunsigned

funding · aster · initial deposit · retire unsigned

`POST /api/v1/funding/aster/initial-deposit/retire-unsigned`

Continue the funding · aster · initial deposit · retire unsigned workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_initialdeposit_unprepareddisposition

funding · aster · initial deposit · unprepared disposition

`POST /api/v1/funding/aster/initial-deposit/unprepared-disposition`

Continue the funding · aster · initial deposit · unprepared disposition workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_plan

funding · aster · plan

`POST /api/v1/funding/aster/plan`

Continue the funding · aster · plan workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_prepare

funding · aster · prepare

`POST /api/v1/funding/aster/prepare`

Continue the funding · aster · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_prepareplanned

funding · aster · prepare planned

`POST /api/v1/funding/aster/prepare-planned`

Continue the funding · aster · prepare planned workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_aster_reserve

funding · aster · reserve

`POST /api/v1/funding/aster/reserve`

Continue the funding · aster · reserve workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_evmsuccessor_claim

funding · evm successor · claim

`POST /api/v1/funding/evm-successor/claim`

Continue the funding · evm successor · claim workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_evmsuccessor_hint

funding · evm successor · hint

`POST /api/v1/funding/evm-successor/hint`

Continue the funding · evm successor · hint workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_evmsuccessor_prepare

funding · evm successor · prepare

`POST /api/v1/funding/evm-successor/prepare`

Continue the funding · evm successor · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_evmsuccessor_refresh

funding · evm successor · refresh

`POST /api/v1/funding/evm-successor/refresh`

Continue the funding · evm successor · refresh workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_evmsuccessor_request

funding · evm successor · request

`POST /api/v1/funding/evm-successor/request`

Continue the funding · evm successor · request workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_evmsuccessor_retirerequest

funding · evm successor · retire request

`POST /api/v1/funding/evm-successor/retire-request`

Continue the funding · evm successor · retire request workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_evmsuccessor_retireunsigned

funding · evm successor · retire unsigned

`POST /api/v1/funding/evm-successor/retire-unsigned`

Continue the funding · evm successor · retire unsigned workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_hypercore_inward_claim

funding · hypercore · inward · claim

`POST /api/v1/funding/hypercore/inward/claim`

Continue the funding · hypercore · inward · claim workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_hypercore_inward_plan

funding · hypercore · inward · plan

`POST /api/v1/funding/hypercore/inward/plan`

Continue the funding · hypercore · inward · plan workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_hypercore_inward_prepare

funding · hypercore · inward · prepare

`POST /api/v1/funding/hypercore/inward/prepare`

Continue the funding · hypercore · inward · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_hypercore_inward_report

funding · hypercore · inward · report

`POST /api/v1/funding/hypercore/inward/report`

Continue the funding · hypercore · inward · report workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_hypercore_prepare

funding · hypercore · prepare

`POST /api/v1/funding/hypercore/prepare`

Continue the funding · hypercore · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_hypercore_submit

funding · hypercore · submit

`POST /api/v1/funding/hypercore/submit`

Continue the funding · hypercore · submit workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_legacydeposit_claim

funding · legacy deposit · claim

`POST /api/v1/funding/legacy-deposit/claim`

Continue the funding · legacy deposit · claim workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_legacydeposit_hashhint

funding · legacy deposit · hash hint

`POST /api/v1/funding/legacy-deposit/hash-hint`

Continue the funding · legacy deposit · hash hint workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_legacydeposit_plan

funding · legacy deposit · plan

`POST /api/v1/funding/legacy-deposit/plan`

Continue the funding · legacy deposit · plan workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_legacydeposit_prepare

funding · legacy deposit · prepare

`POST /api/v1/funding/legacy-deposit/prepare`

Continue the funding · legacy deposit · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_legacydeposit_reserve

funding · legacy deposit · reserve

`POST /api/v1/funding/legacy-deposit/reserve`

Continue the funding · legacy deposit · reserve workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_ostium_plan

funding · ostium · plan

`POST /api/v1/funding/ostium/plan`

Continue the funding · ostium · plan workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_ostium_reserve

funding · ostium · reserve

`POST /api/v1/funding/ostium/reserve`

Continue the funding · ostium · reserve workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_ownerinitialdeposit_claim

funding · owner initial deposit · claim

`POST /api/v1/funding/owner-initial-deposit/claim`

Continue the funding · owner initial deposit · claim workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_ownerinitialdeposit_hashhint

funding · owner initial deposit · hash hint

`POST /api/v1/funding/owner-initial-deposit/hash-hint`

Continue the funding · owner initial deposit · hash hint workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_ownerinitialdeposit_prepare

funding · owner initial deposit · prepare

`POST /api/v1/funding/owner-initial-deposit/prepare`

Continue the funding · owner initial deposit · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_ownerinitialdeposit_releaseunclaimed

funding · owner initial deposit · release unclaimed

`POST /api/v1/funding/owner-initial-deposit/release-unclaimed`

Continue the funding · owner initial deposit · release unclaimed workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_ownerinitialdeposit_request

funding · owner initial deposit · request

`POST /api/v1/funding/owner-initial-deposit/request`

Continue the funding · owner initial deposit · request workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_ownerinitialdeposit_unprepareddisposition

funding · owner initial deposit · unprepared disposition

`POST /api/v1/funding/owner-initial-deposit/unprepared-disposition`

Continue the funding · owner initial deposit · unprepared disposition workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_reserve

funding · reserve

`POST /api/v1/funding/reserve`

Continue the funding · reserve workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_funding_retireoriginal

funding · retire original

`POST /api/v1/funding/retire-original`

Continue the funding · retire original workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_ostium_context

ostium · context

`POST /api/v1/ostium/context`

Continue the ostium · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_ostium_planning

ostium · planning

`POST /api/v1/ostium/planning`

Continue the ostium · planning workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_ostium_prepare

ostium · prepare

`POST /api/v1/ostium/prepare`

Continue the ostium · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_ostium_setup_context

ostium · setup · context

`POST /api/v1/ostium/setup/context`

Continue the ostium · setup · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_ostium_setup_externalclaim

ostium · setup · external claim

`POST /api/v1/ostium/setup/external-claim`

Continue the ostium · setup · external claim workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_ostium_setup_externalhint

ostium · setup · external hint

`POST /api/v1/ostium/setup/external-hint`

Continue the ostium · setup · external hint workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_ostium_setup_prepare

ostium · setup · prepare

`POST /api/v1/ostium/setup/prepare`

Continue the ostium · setup · prepare workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_ostium_setup_submit

ostium · setup · submit

`POST /api/v1/ostium/setup/submit`

Continue the ostium · setup · submit workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_post_trading_modeljobs

trading · model jobs

`POST /api/v1/trading/model-jobs`

Continue the trading · model jobs workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "description": "Exact native workflow payload from the dashboard context/preparation protocol; the regional service validates its fields. Never substitute a generic command or send a private key."
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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_accounts_standardmode_status

accounts · standard mode · status

`GET /api/v1/accounts/standard-mode/status`

Read the accounts · standard mode · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| challengeId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_agents_originalcontext

agents · original context

`GET /api/v1/agents/original-context`

Read the agents · original context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| accountId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_agents_status

agents · status

`GET /api/v1/agents/status`

Read the agents · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| challengeId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_aster_agents_status

aster · agents · status

`GET /api/v1/aster/agents/status`

Read the aster · agents · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| challengeId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_commands_intentId

commands · status

`GET /api/v1/commands/{intentId}`

Read the commands · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| intentId | path | string | Yes | Original lowercase UUID owned by this identity. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_fees_canary_context

fees · canary · context

`GET /api/v1/fees/canary/context`

Read the fees · canary · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| accountId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_fees_canary_exit_context

fees · canary · exit · context

`GET /api/v1/fees/canary/exit/context`

Read the fees · canary · exit · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| canaryId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_fees_canary_exit_status

fees · canary · exit · status

`GET /api/v1/fees/canary/exit/status`

Read the fees · canary · exit · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| exitId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_fees_canary_mode_context

fees · canary · mode · context

`GET /api/v1/fees/canary/mode/context`

Read the fees · canary · mode · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| accountId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_fees_canary_mode_status

fees · canary · mode · status

`GET /api/v1/fees/canary/mode/status`

Read the fees · canary · mode · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| setupId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_fees_canary_status

fees · canary · status

`GET /api/v1/fees/canary/status`

Read the fees · canary · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| canaryId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_fees_commissioning_context

fees · commissioning · context

`GET /api/v1/fees/commissioning/context`

Read the fees · commissioning · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| accountId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_fees_commissioning_originalcontext

fees · commissioning · original context

`GET /api/v1/fees/commissioning/original-context`

Read the fees · commissioning · original context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| accountId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_fees_commissioning_status

fees · commissioning · status

`GET /api/v1/fees/commissioning/status`

Read the fees · commissioning · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| challengeId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_fees_context

fees · context

`GET /api/v1/fees/context`

Read the fees · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| marketId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_fees_status

fees · status

`GET /api/v1/fees/status`

Read the fees · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| challengeId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_fundingagents_status

funding agents · status

`GET /api/v1/funding-agents/status`

Read the funding agents · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| challengeId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_aster_allowance_status

funding · aster · allowance · status

`GET /api/v1/funding/aster/allowance/status`

Read the funding · aster · allowance · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| fundingId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_aster_context

funding · aster · context

`GET /api/v1/funding/aster/context`

Read the funding · aster · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_aster_evmsuccessor_context

funding · aster · evm successor · context

`GET /api/v1/funding/aster/evm-successor/context`

Read the funding · aster · evm successor · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| rootAttemptId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |
| lane | query | string | Yes | Native lane: HYPERLIQUID_INITIAL or HYPERLIQUID_LEGACY; Aster uses ASTER_INITIAL_ALLOWANCE or ASTER_INITIAL_DEPOSIT. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_aster_evmsuccessor_history

funding · aster · evm successor · history

`GET /api/v1/funding/aster/evm-successor/history`

Read the funding · aster · evm successor · history workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| rootAttemptId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |
| lane | query | string | Yes | Native lane: HYPERLIQUID_INITIAL or HYPERLIQUID_LEGACY; Aster uses ASTER_INITIAL_ALLOWANCE or ASTER_INITIAL_DEPOSIT. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_aster_evmsuccessor_status

funding · aster · evm successor · status

`GET /api/v1/funding/aster/evm-successor/status`

Read the funding · aster · evm successor · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| attemptId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_aster_initialdeposit_context

funding · aster · initial deposit · context

`GET /api/v1/funding/aster/initial-deposit/context`

Read the funding · aster · initial deposit · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| depositId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_aster_initialdeposit_setup

funding · aster · initial deposit · setup

`GET /api/v1/funding/aster/initial-deposit/setup`

Read the funding · aster · initial deposit · setup workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_aster_initialdeposit_status

funding · aster · initial deposit · status

`GET /api/v1/funding/aster/initial-deposit/status`

Read the funding · aster · initial deposit · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| attemptId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_aster_originals

funding · aster · originals

`GET /api/v1/funding/aster/originals`

Read the funding · aster · originals workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| cursor | query | string | No | Optional opaque hex cursor returned by the previous original-request page. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_aster_plannedstatus

funding · aster · planned status

`GET /api/v1/funding/aster/planned-status`

Read the funding · aster · planned status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| fundingId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_aster_status

funding · aster · status

`GET /api/v1/funding/aster/status`

Read the funding · aster · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| fundingId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_evmsuccessor_context

funding · evm successor · context

`GET /api/v1/funding/evm-successor/context`

Read the funding · evm successor · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| rootAttemptId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |
| lane | query | string | Yes | Native lane: HYPERLIQUID_INITIAL or HYPERLIQUID_LEGACY; Aster uses ASTER_INITIAL_ALLOWANCE or ASTER_INITIAL_DEPOSIT. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_evmsuccessor_history

funding · evm successor · history

`GET /api/v1/funding/evm-successor/history`

Read the funding · evm successor · history workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| rootAttemptId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |
| lane | query | string | Yes | Native lane: HYPERLIQUID_INITIAL or HYPERLIQUID_LEGACY; Aster uses ASTER_INITIAL_ALLOWANCE or ASTER_INITIAL_DEPOSIT. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_evmsuccessor_status

funding · evm successor · status

`GET /api/v1/funding/evm-successor/status`

Read the funding · evm successor · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| attemptId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_hypercore_context

funding · hypercore · context

`GET /api/v1/funding/hypercore/context`

Read the funding · hypercore · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| fundingId | query | string | No | Original lowercase funding UUID. Supply exactly one of fundingId or policyId. |
| policyId | query | string | No | Original lowercase policy UUID. Supply exactly one of fundingId or policyId. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_hypercore_inward_context

funding · hypercore · inward · context

`GET /api/v1/funding/hypercore/inward/context`

Read the funding · hypercore · inward · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| accountId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_hypercore_inward_status

funding · hypercore · inward · status

`GET /api/v1/funding/hypercore/inward/status`

Read the funding · hypercore · inward · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| planId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_hypercore_status

funding · hypercore · status

`GET /api/v1/funding/hypercore/status`

Read the funding · hypercore · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| fundingId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_legacydeposit_context

funding · legacy deposit · context

`GET /api/v1/funding/legacy-deposit/context`

Read the funding · legacy deposit · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| fundingId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_legacydeposit_status

funding · legacy deposit · status

`GET /api/v1/funding/legacy-deposit/status`

Read the funding · legacy deposit · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| attemptId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_originals

funding · originals

`GET /api/v1/funding/originals`

Read the funding · originals workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| cursor | query | string | No | Optional opaque hex cursor returned by the previous original-request page. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_ownerinitialdeposit_context

funding · owner initial deposit · context

`GET /api/v1/funding/owner-initial-deposit/context`

Read the funding · owner initial deposit · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| depositId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_ownerinitialdeposit_setup

funding · owner initial deposit · setup

`GET /api/v1/funding/owner-initial-deposit/setup`

Read the funding · owner initial deposit · setup workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_funding_ownerinitialdeposit_status

funding · owner initial deposit · status

`GET /api/v1/funding/owner-initial-deposit/status`

Read the funding · owner initial deposit · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| attemptId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_ostium_accounts

ostium · accounts

`GET /api/v1/ostium/accounts`

Read the ostium · accounts workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_ostium_accounts_accountId_positions

ostium · accounts · status · positions

`GET /api/v1/ostium/accounts/{accountId}/positions`

Read the ostium · accounts · status · positions workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| accountId | path | string | Yes | Original lowercase UUID owned by this identity. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_ostium_intents_intentId

ostium · intents · status

`GET /api/v1/ostium/intents/{intentId}`

Read the ostium · intents · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| intentId | path | string | Yes | Original lowercase UUID owned by this identity. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_ostium_setup_intents_intentId

ostium · setup · intents · status

`GET /api/v1/ostium/setup/intents/{intentId}`

Read the ostium · setup · intents · status workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| intentId | path | string | Yes | Original lowercase UUID owned by this identity. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

## native_get_trading_context

trading · context

`GET /api/v1/trading/context`

Read the trading · context workflow using the same protocol as the dashboard. The fixed regional gateway validates the exact route, identifiers, body and identity.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| marketId | query | string | Yes | Original owner-bound identifier from this workflow’s prior response. |

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

- This advanced route preserves the existing native protocol. It does not provide automatic consent, retry or new venue authority.
- Availability depends on the configured regional service and independent native qualification.

