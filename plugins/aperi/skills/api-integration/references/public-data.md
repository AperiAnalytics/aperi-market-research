# Aperi REST API: Market data

Reference snapshot: 2026-10-11. This is API documentation; app/private/financial operations are outside the hosted MCP tool permissions. Examples are illustrative, not live observations. See [the operation index](api-index.md) and [current OpenAPI](https://aperi.trade/api/v1/openapi.json).

## listProducts

Discover products

`GET /api/v1/products`

The canonical dashboard catalogue, with selected native route, candidates, product specifications, availability and statistics. Use product IDs for discovery and market IDs for venue data.

Authentication: Public read. Optional Authorization: Bearer aperi_market_… key with markets:read scope.

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "products": [],
  "sources": []
}
```

- Unavailable prices remain null. A selected public route is not permission to execute.
- Market-key authentication is optional for public data.

## getProduct

Get a product

`GET /api/v1/products/{productId}`

Read one canonical product and its exact selected venue contract.

Authentication: Public read. Optional Authorization: Bearer aperi_market_… key with markets:read scope.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| productId | path | string | Yes | Canonical product ID from GET /products; encode it as a URL path segment. |

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "product": {
    "id": "NVDA",
    "symbol": "NVDA",
    "status": "available",
    "executionReady": false
  }
}
```

## listMarkets

List native markets

`GET /api/v1/markets`

Return the native market catalogue and source status: prices, mark/index, 24h change and volume, funding, open interest, leverage limits, size steps and price ticks where the venue supplies them.

Authentication: Public read. Optional Authorization: Bearer aperi_market_… key with markets:read scope.

Response schema:

```json
{
  "type": "object",
  "properties": {
    "schemaVersion": {
      "const": "1"
    },
    "markets": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "venue": {
            "type": "string",
            "enum": [
              "hyperliquid",
              "aster",
              "ostium",
              "gtrade",
              "avantis"
            ]
          },
          "symbol": {
            "type": "string"
          },
          "venueSymbol": {
            "type": "string"
          },
          "collateral": {
            "type": "string",
            "enum": [
              "USDC",
              "USDT",
              "USD1"
            ]
          },
          "category": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string"
          },
          "price": {
            "anyOf": [
              {
                "type": "string",
                "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                "description": "Plain decimal string. Never convert money to binary floating point."
              },
              {
                "type": "null"
              }
            ]
          },
          "markPrice": {
            "anyOf": [
              {
                "type": "string",
                "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                "description": "Plain decimal string. Never convert money to binary floating point."
              },
              {
                "type": "null"
              }
            ]
          },
          "indexPrice": {
            "anyOf": [
              {
                "type": "string",
                "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                "description": "Plain decimal string. Never convert money to binary floating point."
              },
              {
                "type": "null"
              }
            ]
          },
          "change24hPercent": {
            "anyOf": [
              {
                "type": "string",
                "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                "description": "Plain decimal string. Never convert money to binary floating point."
              },
              {
                "type": "null"
              }
            ]
          },
          "volume24h": {
            "anyOf": [
              {
                "type": "string",
                "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                "description": "Plain decimal string. Never convert money to binary floating point."
              },
              {
                "type": "null"
              }
            ]
          },
          "fundingRate": {
            "anyOf": [
              {
                "type": "string",
                "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                "description": "Plain decimal string. Never convert money to binary floating point."
              },
              {
                "type": "null"
              }
            ]
          },
          "openInterest": {
            "anyOf": [
              {
                "type": "string",
                "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                "description": "Plain decimal string. Never convert money to binary floating point."
              },
              {
                "type": "null"
              }
            ]
          },
          "maxLeverage": {
            "type": [
              "integer",
              "null"
            ],
            "minimum": 1
          },
          "sizeDecimals": {
            "type": [
              "integer",
              "null"
            ]
          },
          "sizeStep": {
            "anyOf": [
              {
                "type": "string",
                "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                "description": "Plain decimal string. Never convert money to binary floating point."
              },
              {
                "type": "null"
              }
            ]
          },
          "priceTick": {
            "anyOf": [
              {
                "type": "string",
                "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                "description": "Plain decimal string. Never convert money to binary floating point."
              },
              {
                "type": "null"
              }
            ]
          },
          "minNotional": {
            "anyOf": [
              {
                "type": "string",
                "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                "description": "Plain decimal string. Never convert money to binary floating point."
              },
              {
                "type": "null"
              }
            ]
          },
          "sourceTime": {
            "type": [
              "integer",
              "null"
            ]
          },
          "receivedAt": {
            "type": [
              "integer",
              "null"
            ]
          }
        },
        "additionalProperties": true
      }
    },
    "sources": {}
  },
  "required": [
    "markets"
  ],
  "additionalProperties": true
}
```

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "markets": [],
  "sources": []
}
```

- Use exact IDs returned by the catalogue. The catalogue may have partial venue coverage; inspect sources and errors.
- Null or missing statistics mean unavailable data. Oracle venues do not expose a synthetic order book or trade tape.

## getMarket

Get a market

`GET /api/v1/markets/{marketId}`

Read one exact native instrument, including precision, leverage limits and observed statistics.

Authentication: Public read. Optional Authorization: Bearer aperi_market_… key with markets:read scope.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| marketId | path | string | Yes | Exact native market ID from the catalogue. |

Response schema:

```json
{
  "type": "object",
  "properties": {
    "schemaVersion": {
      "const": "1"
    },
    "market": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "venue": {
          "type": "string",
          "enum": [
            "hyperliquid",
            "aster",
            "ostium",
            "gtrade",
            "avantis"
          ]
        },
        "symbol": {
          "type": "string"
        },
        "venueSymbol": {
          "type": "string"
        },
        "collateral": {
          "type": "string",
          "enum": [
            "USDC",
            "USDT",
            "USD1"
          ]
        },
        "category": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "status": {
          "type": "string"
        },
        "price": {
          "anyOf": [
            {
              "type": "string",
              "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
              "description": "Plain decimal string. Never convert money to binary floating point."
            },
            {
              "type": "null"
            }
          ]
        },
        "markPrice": {
          "anyOf": [
            {
              "type": "string",
              "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
              "description": "Plain decimal string. Never convert money to binary floating point."
            },
            {
              "type": "null"
            }
          ]
        },
        "indexPrice": {
          "anyOf": [
            {
              "type": "string",
              "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
              "description": "Plain decimal string. Never convert money to binary floating point."
            },
            {
              "type": "null"
            }
          ]
        },
        "change24hPercent": {
          "anyOf": [
            {
              "type": "string",
              "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
              "description": "Plain decimal string. Never convert money to binary floating point."
            },
            {
              "type": "null"
            }
          ]
        },
        "volume24h": {
          "anyOf": [
            {
              "type": "string",
              "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
              "description": "Plain decimal string. Never convert money to binary floating point."
            },
            {
              "type": "null"
            }
          ]
        },
        "fundingRate": {
          "anyOf": [
            {
              "type": "string",
              "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
              "description": "Plain decimal string. Never convert money to binary floating point."
            },
            {
              "type": "null"
            }
          ]
        },
        "openInterest": {
          "anyOf": [
            {
              "type": "string",
              "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
              "description": "Plain decimal string. Never convert money to binary floating point."
            },
            {
              "type": "null"
            }
          ]
        },
        "maxLeverage": {
          "type": [
            "integer",
            "null"
          ],
          "minimum": 1
        },
        "sizeDecimals": {
          "type": [
            "integer",
            "null"
          ]
        },
        "sizeStep": {
          "anyOf": [
            {
              "type": "string",
              "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
              "description": "Plain decimal string. Never convert money to binary floating point."
            },
            {
              "type": "null"
            }
          ]
        },
        "priceTick": {
          "anyOf": [
            {
              "type": "string",
              "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
              "description": "Plain decimal string. Never convert money to binary floating point."
            },
            {
              "type": "null"
            }
          ]
        },
        "minNotional": {
          "anyOf": [
            {
              "type": "string",
              "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
              "description": "Plain decimal string. Never convert money to binary floating point."
            },
            {
              "type": "null"
            }
          ]
        },
        "sourceTime": {
          "type": [
            "integer",
            "null"
          ]
        },
        "receivedAt": {
          "type": [
            "integer",
            "null"
          ]
        }
      },
      "additionalProperties": true
    }
  },
  "additionalProperties": true
}
```

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "market": {
    "id": "hyperliquid.xyz.NVDA.USDC"
  }
}
```

## getQuote

Read a quote

`GET /api/v1/markets/{marketId}/quote`

Read native instrument prices and available statistics, preserving the source and receipt clocks.

Authentication: Public read. Optional Authorization: Bearer aperi_market_… key with markets:read scope.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| marketId | path | string | Yes | Exact native market ID; encode the path segment. |

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "marketId": "hyperliquid.xyz.NVDA.USDC",
  "venue": "hyperliquid",
  "price": "150",
  "markPrice": "150",
  "volume24h": "1000000",
  "sourceTime": null,
  "receivedAt": null
}
```

- Inspect sourceTime, receivedAt and venue availability before acting. The API never switches your chosen market to another venue.
- Order-book market readers expose price, markPrice and available statistics. Ostium oracle quotes retain bid, mid, ask, marketOpen and quoteStatus. All values preserve native price units.

## getBook

Read the order book

`GET /api/v1/markets/{marketId}/book`

Up to 20 native bid and ask levels for an order-book venue. Oracle markets return their existing unavailable response.

Authentication: Public read. Optional Authorization: Bearer aperi_market_… key with markets:read scope.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| marketId | path | string | Yes | Exact native market ID. |

Illustrative response (examples are not live observations):

```json
{
  "marketId": "hyperliquid.xyz.NVDA.USDC",
  "venue": "hyperliquid",
  "bids": [
    {
      "price": "150",
      "size": "1",
      "orders": 1
    }
  ],
  "asks": [
    {
      "price": "150.1",
      "size": "2",
      "orders": 1
    }
  ]
}
```

## getTrades

Read recent trades

`GET /api/v1/markets/{marketId}/trades`

Read the venue-retained public trade tape where available. Trade prices and sizes are decimal strings.

Authentication: Public read. Optional Authorization: Bearer aperi_market_… key with markets:read scope.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| marketId | path | string | Yes | Exact native market ID. |

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "marketId": "hyperliquid.xyz.NVDA.USDC",
  "trades": [
    {
      "id": "123",
      "price": "150",
      "size": "1",
      "side": "buy",
      "time": 1800000000000
    }
  ]
}
```

- Oracle venues may provide no public tape. An empty tape is not evidence of zero market volume.

## getCandles

Read chart history

`GET /api/v1/markets/{marketId}/candles`

Get native OHLC history with bounded windows and venue-specific interval support.

Authentication: Public read. Optional Authorization: Bearer aperi_market_… key with markets:read scope.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| marketId | path | string | Yes | Exact native market ID. |
| interval | query | string | No | Chart interval, e.g. 1m, 5m, 15m, 30m, 1h, 4h, 1d; supported intervals vary by venue. |
| limit | query | integer | No | Maximum candles, bounded by the venue reader; use 100 for a portable request. |
| startTime | query | integer | No | Window start in Unix milliseconds. |
| endTime | query | integer | No | Window end in Unix milliseconds. |

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "marketId": "hyperliquid.xyz.NVDA.USDC",
  "interval": "30m",
  "candles": [
    {
      "time": 1800000000,
      "open": "150",
      "high": "151",
      "low": "149",
      "close": "150.5",
      "volume": "100"
    }
  ]
}
```

- Candle time is Unix seconds. Request window timestamps use Unix milliseconds.
- Oracle candle volume may be null; OHLC and indexed 24h volume have different coverage.

## listVenues

Discover venue capabilities

`GET /api/v1/venues`

Read the venue catalogue and distinguish order-book data from oracle data and configured trading workflows.

Authentication: Public read. Optional Authorization: Bearer aperi_market_… key with markets:read scope.

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "venues": []
}
```

