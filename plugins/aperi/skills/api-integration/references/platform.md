# Aperi REST API: Platform & discovery

Reference snapshot: 2026-10-11. This is API documentation; app/private/financial operations are outside the hosted MCP tool permissions. Examples are illustrative, not live observations. See [the operation index](api-index.md) and [current OpenAPI](https://aperi.io/api/v1/openapi.json).

## getCalendar

Read the economic calendar

`GET /api/v1/calendar`

The dashboard calendar with its source and coverage metadata.

Authentication: Public. No credential required.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| week | query | string | No | Monday date in YYYY-MM-DD format; defaults to the current week. |

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "events": []
}
```

## getLeaderboard

Read the leaderboard

`GET /api/v1/leaderboard`

Read the same opt-in public leaderboard as the dashboard.

Authentication: Public. No credential required.

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "entries": []
}
```

## getApiHealth

Check service health

`GET /api/v1/health`

Check that the edge API is responding. Health does not qualify funded execution.

Authentication: Public. No credential required.

Illustrative response (examples are not live observations):

```json
{
  "status": "ok",
  "service": "aperi-edge",
  "execution": "unavailable"
}
```

## getApiStatus

Read service configuration

`GET /api/v1/status`

Discover the API version and configured private gateway availability. Configuration does not prove native trading qualification.

Authentication: Public. No credential required.

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1"
}
```

## getApiCapabilities

Inspect capabilities

`GET /api/v1/capabilities`

Discover public venues and the platform’s declared trading capabilities before choosing a workflow.

Authentication: Public. No credential required.

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "liveTradingQualified": false,
  "venues": [
    "hyperliquid",
    "aster",
    "ostium",
    "gtrade",
    "avantis"
  ]
}
```

## listApiKeys

List your market keys

`GET /api/v1/keys`

List the current app account’s read-only market keys, policy, accepted-request usage and account daily allowance. Secret token values are never returned again.

Authentication: Current Aperi app session cookie. Writes require Origin matching the app. Market keys are not accepted.

Response schema:

```json
{
  "type": "object",
  "properties": {
    "schemaVersion": {
      "const": "1"
    },
    "keys": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "prefix": {
            "type": "string"
          },
          "scopes": {
            "type": "array",
            "items": {
              "const": "markets:read"
            }
          },
          "createdAt": {
            "type": "integer"
          },
          "expiresAt": {
            "type": "integer"
          },
          "enabled": {
            "type": "boolean"
          },
          "allowedIps": {
            "type": "array",
            "maxItems": 20,
            "items": {
              "type": "string",
              "description": "An IPv4/IPv6 address or CIDR. Empty allows any trusted ingress IP."
            }
          },
          "allowedOrigins": {
            "type": "array",
            "maxItems": 20,
            "items": {
              "type": "string",
              "format": "uri",
              "description": "Exact HTTPS Origin. If set, requests without a matching Origin are refused. This header policy does not attest a server client’s origin."
            }
          },
          "limits": {
            "type": "object",
            "properties": {
              "requestsPerMinute": {
                "type": "integer",
                "minimum": 1,
                "maximum": 120,
                "default": 60
              },
              "requestsPerDay": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100000,
                "default": 10000
              },
              "totalRequests": {
                "type": [
                  "integer",
                  "null"
                ],
                "minimum": 1,
                "maximum": 1000000000,
                "default": null
              }
            },
            "required": [
              "requestsPerMinute",
              "requestsPerDay",
              "totalRequests"
            ],
            "additionalProperties": false
          },
          "usage": {
            "type": "object",
            "properties": {
              "minute": {
                "type": "integer"
              },
              "day": {
                "type": "integer"
              },
              "total": {
                "type": "integer"
              },
              "minuteResetsAt": {
                "type": "integer"
              },
              "dayResetsAt": {
                "type": "integer"
              },
              "lastUsedAt": {
                "type": [
                  "integer",
                  "null"
                ]
              },
              "lastIp": {
                "type": [
                  "string",
                  "null"
                ]
              },
              "lastEndpoint": {
                "type": [
                  "string",
                  "null"
                ]
              },
              "lastMethod": {
                "type": [
                  "string",
                  "null"
                ]
              }
            },
            "additionalProperties": true
          }
        },
        "required": [
          "id",
          "name",
          "prefix",
          "scopes",
          "createdAt",
          "expiresAt",
          "enabled",
          "allowedIps",
          "allowedOrigins",
          "limits",
          "usage"
        ],
        "additionalProperties": false
      }
    },
    "ownerDailyLimit": {
      "type": "integer"
    },
    "ownerDailyUsed": {
      "type": "integer"
    },
    "ownerDailyResetsAt": {
      "type": "integer"
    }
  },
  "additionalProperties": true
}
```

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "keys": [],
  "ownerDailyLimit": 20000,
  "ownerDailyUsed": 0
}
```

## createApiKey

Create a market key

`POST /api/v1/keys`

Create one of up to ten non-expired read-only market keys. Copy the secret from the one-time response.

Authentication: Current Aperi app session cookie. Writes require Origin matching the app. Market keys are not accepted.

Request example:

```json
{
  "name": "Research",
  "expiresInDays": 30,
  "allowedIps": [
    "203.0.113.10/32"
  ],
  "allowedOrigins": [],
  "limits": {
    "requestsPerMinute": 60,
    "requestsPerDay": 10000,
    "totalRequests": null
  }
}
```

Request schema:

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 80
    },
    "allowedIps": {
      "type": "array",
      "maxItems": 20,
      "items": {
        "type": "string",
        "description": "An IPv4/IPv6 address or CIDR. Empty allows any trusted ingress IP."
      }
    },
    "allowedOrigins": {
      "type": "array",
      "maxItems": 20,
      "items": {
        "type": "string",
        "format": "uri",
        "description": "Exact HTTPS Origin. If set, requests without a matching Origin are refused. This header policy does not attest a server client’s origin."
      }
    },
    "limits": {
      "type": "object",
      "properties": {
        "requestsPerMinute": {
          "type": "integer",
          "minimum": 1,
          "maximum": 120,
          "default": 60
        },
        "requestsPerDay": {
          "type": "integer",
          "minimum": 1,
          "maximum": 100000,
          "default": 10000
        },
        "totalRequests": {
          "type": [
            "integer",
            "null"
          ],
          "minimum": 1,
          "maximum": 1000000000,
          "default": null
        }
      },
      "required": [
        "requestsPerMinute",
        "requestsPerDay",
        "totalRequests"
      ],
      "additionalProperties": false
    },
    "scopes": {
      "type": "array",
      "items": {
        "const": "markets:read"
      },
      "minItems": 1,
      "maxItems": 1
    },
    "expiresInDays": {
      "type": "integer",
      "minimum": 1,
      "maximum": 90,
      "default": 30
    }
  },
  "required": [
    "name"
  ],
  "additionalProperties": false
}
```

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "key": {
    "scopes": [
      "markets:read"
    ]
  }
}
```

- Requires the current app session and same-origin request. Default expiry is 30 days; choose 1–90 days. The 256-bit secret is stored only as a SHA-256 digest.
- Per-key minute, UTC-day and lifetime budgets are atomic across clients. An account-wide 20000 requests/day ceiling prevents multiplying the allowance with more keys. Accepted key requests count even if a provider later fails. Denied IP/scope/Origin requests do not count.
- IP restrictions use only explicitly trusted Cloudflare ingress. Restricted keys fail closed when trusted client IP is unavailable, including local development. Origin restrictions are an additional header check, not a substitute for IP restrictions or authorization.
- A market key can read markets, products and venue discovery. It cannot read private accounts, save watchlists or trade. Public reads remain available without keys under shared ingress limits.

## updateApiKey

Update key restrictions

`PATCH /api/v1/keys/{keyId}`

Change the name, enabled state, IP/CIDR allowlist, exact Origin policy or usage limits of your own key. Existing usage is preserved.

Authentication: Current Aperi app session cookie. Writes require Origin matching the app. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| keyId | path | string | Yes | Key UUID owned by the current account. |

Request example:

```json
{
  "enabled": false
}
```

Request schema:

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 80
    },
    "allowedIps": {
      "type": "array",
      "maxItems": 20,
      "items": {
        "type": "string",
        "description": "An IPv4/IPv6 address or CIDR. Empty allows any trusted ingress IP."
      }
    },
    "allowedOrigins": {
      "type": "array",
      "maxItems": 20,
      "items": {
        "type": "string",
        "format": "uri",
        "description": "Exact HTTPS Origin. If set, requests without a matching Origin are refused. This header policy does not attest a server client’s origin."
      }
    },
    "limits": {
      "type": "object",
      "properties": {
        "requestsPerMinute": {
          "type": "integer",
          "minimum": 1,
          "maximum": 120,
          "default": 60
        },
        "requestsPerDay": {
          "type": "integer",
          "minimum": 1,
          "maximum": 100000,
          "default": 10000
        },
        "totalRequests": {
          "type": [
            "integer",
            "null"
          ],
          "minimum": 1,
          "maximum": 1000000000,
          "default": null
        }
      },
      "required": [
        "requestsPerMinute",
        "requestsPerDay",
        "totalRequests"
      ],
      "additionalProperties": false
    },
    "enabled": {
      "type": "boolean"
    }
  },
  "additionalProperties": false
}
```

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "key": {
    "enabled": false
  }
}
```

- Pause disables requests immediately. Resume retains the original expiry and usage. Lowering a limit below current usage holds requests until its reset or a policy change.
- Revocation and expiry remain authoritative on every request; client-side controls are never trusted.

## getApiKeyAudit

Read key activity

`GET /api/v1/keys/audit`

Read the last 50 key creation, policy change, pause, resume and revocation events owned by the current account.

Authentication: Current Aperi app session cookie. Writes require Origin matching the app. Market keys are not accepted.

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "events": []
}
```

- Does not include secret tokens or token hashes. Use per-key last-used details and counters for request usage.

## revokeApiKey

Revoke a market key

`DELETE /api/v1/keys/{keyId}`

Revoke a key owned by the current app account.

Authentication: Current Aperi app session cookie. Writes require Origin matching the app. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| keyId | path | string | Yes | Key UUID from GET /keys. |

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "revoked": true
}
```

## getOpenApi

Download OpenAPI

`GET /api/v1/openapi.json`

Machine-readable endpoint, authentication and request schemas for clients and future MCP tools.

Authentication: Public. No credential required.

Illustrative response (examples are not live observations):

```json
{
  "openapi": "3.1.0"
}
```

## getApiMarkdown

Download Markdown

`GET /api/v1/docs.md`

The same documentation as this page, ready for agents and your own tooling.

Authentication: Public. No credential required.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| section | query | string | No | Export one section by its section ID. |
| endpoint | query | string | No | Export one operation by its OpenAPI operationId. |

Illustrative response (examples are not live observations):

```json
"Aperi API documentation"
```

