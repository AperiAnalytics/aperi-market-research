# Aperi REST API: Watchlists & settings

Reference snapshot: 2026-10-11. This is API documentation; app/private/financial operations are outside the hosted MCP tool permissions. Examples are illustrative, not live observations. See [the operation index](api-index.md) and [current OpenAPI](https://aperi.io/api/v1/openapi.json).

## getWatchlist

Read your watchlist

`GET /api/v1/watchlist`

Read the same saved favorite market/product identities used by the dashboard.

Authentication: Current Aperi app session cookie. Writes require Origin matching the app. Market keys are not accepted.

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "marketIds": []
}
```

## replaceWatchlist

Save your watchlist

`PUT /api/v1/watchlist`

Replace your favorites with up to 256 distinct reviewed IDs. Other settings are preserved.

Authentication: Current Aperi app session cookie. Writes require Origin matching the app. Market keys are not accepted.

Request example:

```json
{
  "marketIds": []
}
```

Request schema:

```json
{
  "type": "object",
  "properties": {
    "marketIds": {
      "type": "array",
      "maxItems": 256,
      "uniqueItems": true,
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "marketIds"
  ],
  "additionalProperties": false
}
```

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "marketIds": []
}
```

- Use reviewed IDs from the dashboard catalogue. The empty example clears the watchlist. PUT replaces the complete list.

## getPreferences

Read preferences

`GET /api/v1/preferences`

Read theme, favorites, watched accounts, notifications, confirmation and customer allocation preferences.

Authentication: Current Aperi app session cookie. Writes require Origin matching the app. Market keys are not accepted.

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "preferences": {
    "theme": "light",
    "favorites": []
  }
}
```

## updatePreferences

Update preferences

`PATCH /api/v1/preferences`

Change supported dashboard preferences. Watched accounts are a maximum of 20 {name,address,venue} entries. Allocation preferences express a target; they do not move funds.

Authentication: Current Aperi app session cookie. Writes require Origin matching the app. Market keys are not accepted.

Request example:

```json
{
  "theme": "dark"
}
```

Request schema:

```json
{
  "type": "object",
  "properties": {
    "theme": {
      "type": "string",
      "enum": [
        "light",
        "dark",
        "system"
      ]
    },
    "favorites": {
      "type": "array",
      "maxItems": 256,
      "uniqueItems": true,
      "items": {
        "type": "string"
      }
    },
    "watchAccounts": {
      "type": "array",
      "maxItems": 20,
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 80
          },
          "address": {
            "type": "string",
            "pattern": "^0x[a-fA-F0-9]{40}$"
          },
          "venue": {
            "type": "string",
            "enum": [
              "hyperliquid",
              "aster"
            ]
          }
        },
        "required": [
          "name",
          "address",
          "venue"
        ],
        "additionalProperties": false
      }
    },
    "orderConfirmation": {
      "type": "boolean"
    },
    "sideSequence": {
      "enum": [
        "buy-sell",
        "sell-buy"
      ]
    },
    "defaultVenue": {
      "enum": [
        "hyperliquid",
        "aster"
      ]
    },
    "leaderboard": {
      "type": "boolean"
    },
    "shareTrades": {
      "type": "boolean"
    },
    "managedAccountInterest": {
      "type": "boolean"
    },
    "notifications": {
      "type": "object"
    },
    "channels": {
      "type": "object"
    },
    "skip": {
      "type": "object"
    },
    "wallets": {
      "type": "array"
    },
    "capitalAllocation": {
      "type": "object"
    }
  },
  "additionalProperties": false
}
```

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "preferences": {
    "theme": "dark"
  }
}
```

## getProfile

Read your profile

`GET /api/v1/profile`

Read the current app account profile.

Authentication: Current Aperi app session cookie. Writes require Origin matching the app. Market keys are not accepted.

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "profile": {
    "displayName": "Aperi trader",
    "handle": ""
  }
}
```

## updateProfile

Update your profile

`PATCH /api/v1/profile`

Update displayName, username/handle, bio or a supported profile photo.

Authentication: Current Aperi app session cookie. Writes require Origin matching the app. Market keys are not accepted.

Request example:

```json
{
  "displayName": "Aperi trader"
}
```

Request schema:

```json
{
  "type": "object",
  "properties": {
    "displayName": {
      "type": "string",
      "minLength": 1,
      "maxLength": 80
    },
    "username": {
      "type": "string"
    },
    "handle": {
      "type": "string"
    },
    "bio": {
      "type": "string",
      "maxLength": 500
    },
    "photo": {
      "type": [
        "string",
        "null"
      ]
    }
  },
  "additionalProperties": false
}
```

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "profile": {
    "displayName": "Aperi trader"
  }
}
```

