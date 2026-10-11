# Aperi REST API: Orders & protection

Reference snapshot: 2026-10-11. This is API documentation; app/private/financial operations are outside the hosted MCP tool permissions. Examples are illustrative, not live observations. See [the operation index](api-index.md) and [current OpenAPI](https://aperi.io/api/v1/openapi.json).

## previewOrder

Preview an order

`POST /api/v1/orders/preview`

Validate native precision, notional and leverage and estimate margin. This public calculation creates no order or permission.

Authentication: Public. No credential required.

Request example:

```json
{
  "marketId": "hyperliquid.xyz.NVDA.USDC",
  "side": "buy",
  "quantity": "1",
  "limitPrice": "150",
  "leverage": 2
}
```

Request schema:

```json
{
  "type": "object",
  "properties": {
    "marketId": {
      "type": "string"
    },
    "side": {
      "enum": [
        "buy",
        "sell"
      ]
    },
    "quantity": {
      "type": "string",
      "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
      "description": "Plain decimal string. Never convert money to binary floating point."
    },
    "limitPrice": {
      "type": "string",
      "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
      "description": "Plain decimal string. Never convert money to binary floating point."
    },
    "leverage": {
      "type": "integer",
      "minimum": 1
    },
    "timeInForce": {
      "enum": [
        "GTC",
        "IOC",
        "ALO",
        "GTX"
      ]
    },
    "reduceOnly": {
      "type": "boolean"
    },
    "walletAddress": {
      "type": "string",
      "pattern": "^0x[a-fA-F0-9]{40}$"
    },
    "accountAddress": {
      "type": "string",
      "pattern": "^0x[a-fA-F0-9]{40}$"
    },
    "intentId": {
      "type": "string",
      "format": "uuid"
    }
  },
  "required": [
    "marketId",
    "side",
    "quantity",
    "limitPrice"
  ],
  "additionalProperties": false
}
```

Illustrative response (examples are not live observations):

```json
{
  "marketId": "hyperliquid.xyz.NVDA.USDC",
  "notional": "150",
  "estimatedMargin": "75",
  "leverage": 2,
  "executionReady": false,
  "venueFee": null
}
```

- Include Origin matching the app origin. Estimates exclude unobserved venue fees and funding. Oracle execution may be unavailable.

## getTradingContext

Read trading context

`GET /api/v1/orders/context`

Read owner account, exact market identity, policies, fee requirements, risk references and position binding.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| marketId | query | string | Yes | Exact native market ID. |

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

## refreshTradingModel

Refresh the account check

`POST /api/v1/orders/model-jobs`

Request the independent financial model observation for the exact operation. Refresh context until a matching unexpired risk reference is available.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request example:

```json
{
  "accountId": "11111111-1111-4111-8111-111111111111",
  "operation": {
    "operation": "place",
    "order": {
      "marketId": "hyperliquid.xyz.NVDA.USDC",
      "side": "buy",
      "quantity": "1",
      "limitPrice": "150",
      "timeInForce": "GTC",
      "reduceOnly": false,
      "walletAddress": "0x1111111111111111111111111111111111111111",
      "intentId": "22222222-2222-4222-8222-222222222222",
      "leverage": 2
    }
  }
}
```

Request schema:

```json
{
  "type": "object",
  "properties": {
    "accountId": {
      "type": "string",
      "format": "uuid"
    },
    "operation": {
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "operation": {
              "const": "place"
            },
            "order": {
              "type": "object",
              "properties": {
                "marketId": {
                  "type": "string"
                },
                "side": {
                  "type": "string",
                  "enum": [
                    "buy",
                    "sell"
                  ]
                },
                "quantity": {
                  "type": "string",
                  "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                  "description": "Plain decimal string. Never convert money to binary floating point."
                },
                "limitPrice": {
                  "type": "string",
                  "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                  "description": "Plain decimal string. Never convert money to binary floating point."
                },
                "timeInForce": {
                  "type": "string",
                  "enum": [
                    "GTC",
                    "IOC",
                    "ALO",
                    "GTX"
                  ]
                },
                "reduceOnly": {
                  "type": "boolean"
                },
                "walletAddress": {
                  "type": "string",
                  "pattern": "^0x[a-fA-F0-9]{40}$"
                },
                "intentId": {
                  "type": "string",
                  "format": "uuid"
                },
                "leverage": {
                  "type": "integer",
                  "minimum": 1,
                  "maximum": 1000
                },
                "marginMode": {
                  "type": "string",
                  "enum": [
                    "cross",
                    "isolated"
                  ]
                },
                "builderFee": {
                  "type": "object",
                  "properties": {
                    "feeBps": {
                      "type": "integer",
                      "const": 5
                    },
                    "recipient": {
                      "type": "string",
                      "pattern": "^0x[a-fA-F0-9]{40}$"
                    },
                    "policyRevision": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "feeBps",
                    "recipient",
                    "policyRevision"
                  ],
                  "additionalProperties": false
                },
                "execution": {
                  "oneOf": [
                    {
                      "type": "object",
                      "properties": {
                        "kind": {
                          "const": "trigger"
                        },
                        "tpsl": {
                          "type": "string",
                          "enum": [
                            "sl",
                            "tp"
                          ]
                        },
                        "triggerPrice": {
                          "type": "string",
                          "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                          "description": "Plain decimal string. Never convert money to binary floating point."
                        },
                        "isMarket": {
                          "type": "boolean"
                        },
                        "positionSourceHash": {
                          "type": "string",
                          "pattern": "^[a-f0-9]{64}$"
                        }
                      },
                      "required": [
                        "kind",
                        "tpsl",
                        "triggerPrice",
                        "isMarket",
                        "positionSourceHash"
                      ],
                      "additionalProperties": false
                    },
                    {
                      "type": "object",
                      "properties": {
                        "kind": {
                          "const": "twap"
                        },
                        "minutes": {
                          "type": "integer",
                          "minimum": 5,
                          "maximum": 1440
                        },
                        "randomize": {
                          "type": "boolean"
                        },
                        "positionSourceHash": {
                          "type": "string",
                          "pattern": "^[a-f0-9]{64}$"
                        }
                      },
                      "required": [
                        "kind",
                        "minutes",
                        "randomize",
                        "positionSourceHash"
                      ],
                      "additionalProperties": false
                    }
                  ],
                  "description": "Native advanced exits require reduceOnly=true, GTC and a fresh original-position binding. Availability is venue-specific."
                }
              },
              "required": [
                "marketId",
                "side",
                "quantity",
                "limitPrice",
                "timeInForce",
                "reduceOnly",
                "walletAddress",
                "intentId",
                "leverage"
              ],
              "additionalProperties": false
            }
          },
          "required": [
            "operation",
            "order"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "operation": {
              "const": "cancel"
            },
            "marketId": {
              "type": "string"
            },
            "walletAddress": {
              "type": "string",
              "pattern": "^0x[a-fA-F0-9]{40}$"
            },
            "venueOrderId": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          "required": [
            "operation",
            "marketId",
            "walletAddress",
            "venueOrderId"
          ],
          "additionalProperties": false
        }
      ]
    }
  },
  "required": [
    "accountId",
    "operation"
  ],
  "additionalProperties": false
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

## prepareOrder

Prepare an order or cancellation

`POST /api/v1/orders/prepare`

Prepare the exact owner-bound command and return wallet typed data. The leverage, margin mode and exit semantics are bound to the reviewed operation.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request example:

```json
{
  "accountId": "11111111-1111-4111-8111-111111111111",
  "operation": {
    "operation": "place",
    "order": {
      "marketId": "hyperliquid.xyz.NVDA.USDC",
      "side": "buy",
      "quantity": "1",
      "limitPrice": "150",
      "timeInForce": "GTC",
      "reduceOnly": false,
      "walletAddress": "0x1111111111111111111111111111111111111111",
      "intentId": "22222222-2222-4222-8222-222222222222",
      "leverage": 2
    }
  },
  "maxOpeningQty": "1"
}
```

Request schema:

```json
{
  "type": "object",
  "properties": {
    "accountId": {
      "type": "string",
      "format": "uuid"
    },
    "operation": {
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "operation": {
              "const": "place"
            },
            "order": {
              "type": "object",
              "properties": {
                "marketId": {
                  "type": "string"
                },
                "side": {
                  "type": "string",
                  "enum": [
                    "buy",
                    "sell"
                  ]
                },
                "quantity": {
                  "type": "string",
                  "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                  "description": "Plain decimal string. Never convert money to binary floating point."
                },
                "limitPrice": {
                  "type": "string",
                  "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                  "description": "Plain decimal string. Never convert money to binary floating point."
                },
                "timeInForce": {
                  "type": "string",
                  "enum": [
                    "GTC",
                    "IOC",
                    "ALO",
                    "GTX"
                  ]
                },
                "reduceOnly": {
                  "type": "boolean"
                },
                "walletAddress": {
                  "type": "string",
                  "pattern": "^0x[a-fA-F0-9]{40}$"
                },
                "intentId": {
                  "type": "string",
                  "format": "uuid"
                },
                "leverage": {
                  "type": "integer",
                  "minimum": 1,
                  "maximum": 1000
                },
                "marginMode": {
                  "type": "string",
                  "enum": [
                    "cross",
                    "isolated"
                  ]
                },
                "builderFee": {
                  "type": "object",
                  "properties": {
                    "feeBps": {
                      "type": "integer",
                      "const": 5
                    },
                    "recipient": {
                      "type": "string",
                      "pattern": "^0x[a-fA-F0-9]{40}$"
                    },
                    "policyRevision": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "feeBps",
                    "recipient",
                    "policyRevision"
                  ],
                  "additionalProperties": false
                },
                "execution": {
                  "oneOf": [
                    {
                      "type": "object",
                      "properties": {
                        "kind": {
                          "const": "trigger"
                        },
                        "tpsl": {
                          "type": "string",
                          "enum": [
                            "sl",
                            "tp"
                          ]
                        },
                        "triggerPrice": {
                          "type": "string",
                          "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                          "description": "Plain decimal string. Never convert money to binary floating point."
                        },
                        "isMarket": {
                          "type": "boolean"
                        },
                        "positionSourceHash": {
                          "type": "string",
                          "pattern": "^[a-f0-9]{64}$"
                        }
                      },
                      "required": [
                        "kind",
                        "tpsl",
                        "triggerPrice",
                        "isMarket",
                        "positionSourceHash"
                      ],
                      "additionalProperties": false
                    },
                    {
                      "type": "object",
                      "properties": {
                        "kind": {
                          "const": "twap"
                        },
                        "minutes": {
                          "type": "integer",
                          "minimum": 5,
                          "maximum": 1440
                        },
                        "randomize": {
                          "type": "boolean"
                        },
                        "positionSourceHash": {
                          "type": "string",
                          "pattern": "^[a-f0-9]{64}$"
                        }
                      },
                      "required": [
                        "kind",
                        "minutes",
                        "randomize",
                        "positionSourceHash"
                      ],
                      "additionalProperties": false
                    }
                  ],
                  "description": "Native advanced exits require reduceOnly=true, GTC and a fresh original-position binding. Availability is venue-specific."
                }
              },
              "required": [
                "marketId",
                "side",
                "quantity",
                "limitPrice",
                "timeInForce",
                "reduceOnly",
                "walletAddress",
                "intentId",
                "leverage"
              ],
              "additionalProperties": false
            }
          },
          "required": [
            "operation",
            "order"
          ],
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "operation": {
              "const": "cancel"
            },
            "marketId": {
              "type": "string"
            },
            "walletAddress": {
              "type": "string",
              "pattern": "^0x[a-fA-F0-9]{40}$"
            },
            "venueOrderId": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          "required": [
            "operation",
            "marketId",
            "walletAddress",
            "venueOrderId"
          ],
          "additionalProperties": false
        }
      ]
    },
    "maxOpeningQty": {
      "type": "string",
      "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
      "description": "Plain decimal string. Never convert money to binary floating point."
    },
    "intentId": {
      "type": "string",
      "format": "uuid"
    }
  },
  "required": [
    "accountId",
    "operation",
    "maxOpeningQty"
  ],
  "additionalProperties": false
}
```

Response schema:

```json
{
  "type": "object",
  "properties": {
    "consent": {
      "type": "object",
      "properties": {
        "customerId": {
          "type": "string",
          "format": "uuid"
        },
        "accountId": {
          "type": "string",
          "format": "uuid"
        },
        "intentId": {
          "type": "string",
          "format": "uuid"
        },
        "wallet": {
          "type": "string",
          "pattern": "^0x[a-fA-F0-9]{40}$"
        },
        "venue": {
          "enum": [
            "hyperliquid",
            "aster"
          ]
        },
        "instrument": {
          "type": "string"
        },
        "registryRevision": {
          "type": "string"
        },
        "policyRevision": {
          "type": "string"
        },
        "action": {
          "enum": [
            "place",
            "cancel"
          ]
        },
        "bodyHash": {
          "type": "string",
          "pattern": "^[a-f0-9]{64}$"
        },
        "side": {
          "type": "string"
        },
        "quantity": {
          "type": "string",
          "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
          "description": "Plain decimal string. Never convert money to binary floating point."
        },
        "limitPrice": {
          "type": "string",
          "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
          "description": "Plain decimal string. Never convert money to binary floating point."
        },
        "timeInForce": {
          "type": "string"
        },
        "leverage": {
          "type": "integer"
        },
        "reduceOnly": {
          "type": "boolean"
        },
        "originalVenueOrderId": {
          "type": "string"
        },
        "maxOpeningQty": {
          "type": "string",
          "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
          "description": "Plain decimal string. Never convert money to binary floating point."
        },
        "maxPlatformFeeBps": {
          "type": "integer"
        },
        "builderRecipient": {
          "type": "string",
          "pattern": "^0x[a-fA-F0-9]{40}$"
        },
        "nonce": {
          "type": "string",
          "pattern": "^[a-f0-9]{64}$"
        },
        "issuedAt": {
          "type": "integer"
        },
        "expiresAt": {
          "type": "integer"
        }
      },
      "required": [
        "customerId",
        "accountId",
        "intentId",
        "wallet",
        "venue",
        "instrument",
        "registryRevision",
        "policyRevision",
        "action",
        "bodyHash",
        "side",
        "quantity",
        "limitPrice",
        "timeInForce",
        "leverage",
        "reduceOnly",
        "originalVenueOrderId",
        "maxOpeningQty",
        "maxPlatformFeeBps",
        "builderRecipient",
        "nonce",
        "issuedAt",
        "expiresAt"
      ],
      "additionalProperties": false
    },
    "typedData": {
      "type": "object",
      "properties": {
        "domain": {
          "type": "object"
        },
        "types": {
          "type": "object"
        },
        "primaryType": {
          "type": "string"
        },
        "message": {
          "type": "object"
        }
      },
      "required": [
        "domain",
        "types",
        "primaryType",
        "message"
      ],
      "additionalProperties": true
    },
    "signatureMethod": {
      "const": "eth_signTypedData_v4"
    },
    "financialAuthority": {
      "const": false
    },
    "tradingQualified": {
      "const": false
    }
  },
  "required": [
    "consent",
    "typedData",
    "signatureMethod",
    "financialAuthority",
    "tradingQualified"
  ],
  "additionalProperties": true
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

- Market execution uses a bounded IOC price; limit execution uses GTC/ALO/GTX according to venue support.
- Cancel uses operation="cancel", marketId, walletAddress, original venueOrderId and an outer intentId; maxOpeningQty="0".
- Close/reduce uses the opposite side, reduceOnly=true, a quantity no greater than the observed position, and its current leverage.
- Stop loss/take profit use execution.kind="trigger", tpsl="sl" or "tp", triggerPrice, isMarket and a fresh positionSourceHash. GTC and reduceOnly are required.
- Leverage is a signed order field; there is no standalone leverage update endpoint. Native support and admission policy decide what can execute.

## submitOrder

Confirm the signed command

`POST /api/v1/orders`

Submit exact wallet-signed consent and fresh risk snapshot IDs. The regional service rechecks ownership, policy, fees, risk, durability and qualification before admission.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

Request schema:

```json
{
  "type": "object",
  "properties": {
    "signedConsent": {
      "type": "object",
      "properties": {
        "consent": {
          "type": "object",
          "properties": {
            "customerId": {
              "type": "string",
              "format": "uuid"
            },
            "accountId": {
              "type": "string",
              "format": "uuid"
            },
            "intentId": {
              "type": "string",
              "format": "uuid"
            },
            "wallet": {
              "type": "string",
              "pattern": "^0x[a-fA-F0-9]{40}$"
            },
            "venue": {
              "enum": [
                "hyperliquid",
                "aster"
              ]
            },
            "instrument": {
              "type": "string"
            },
            "registryRevision": {
              "type": "string"
            },
            "policyRevision": {
              "type": "string"
            },
            "action": {
              "enum": [
                "place",
                "cancel"
              ]
            },
            "bodyHash": {
              "type": "string",
              "pattern": "^[a-f0-9]{64}$"
            },
            "side": {
              "type": "string"
            },
            "quantity": {
              "type": "string",
              "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
              "description": "Plain decimal string. Never convert money to binary floating point."
            },
            "limitPrice": {
              "type": "string",
              "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
              "description": "Plain decimal string. Never convert money to binary floating point."
            },
            "timeInForce": {
              "type": "string"
            },
            "leverage": {
              "type": "integer"
            },
            "reduceOnly": {
              "type": "boolean"
            },
            "originalVenueOrderId": {
              "type": "string"
            },
            "maxOpeningQty": {
              "type": "string",
              "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
              "description": "Plain decimal string. Never convert money to binary floating point."
            },
            "maxPlatformFeeBps": {
              "type": "integer"
            },
            "builderRecipient": {
              "type": "string",
              "pattern": "^0x[a-fA-F0-9]{40}$"
            },
            "nonce": {
              "type": "string",
              "pattern": "^[a-f0-9]{64}$"
            },
            "issuedAt": {
              "type": "integer"
            },
            "expiresAt": {
              "type": "integer"
            }
          },
          "required": [
            "customerId",
            "accountId",
            "intentId",
            "wallet",
            "venue",
            "instrument",
            "registryRevision",
            "policyRevision",
            "action",
            "bodyHash",
            "side",
            "quantity",
            "limitPrice",
            "timeInForce",
            "leverage",
            "reduceOnly",
            "originalVenueOrderId",
            "maxOpeningQty",
            "maxPlatformFeeBps",
            "builderRecipient",
            "nonce",
            "issuedAt",
            "expiresAt"
          ],
          "additionalProperties": false
        },
        "signature": {
          "type": "string",
          "pattern": "^0x[a-fA-F0-9]{130}$"
        },
        "execution": {
          "oneOf": [
            {
              "type": "object",
              "properties": {
                "kind": {
                  "const": "trigger"
                },
                "tpsl": {
                  "type": "string",
                  "enum": [
                    "sl",
                    "tp"
                  ]
                },
                "triggerPrice": {
                  "type": "string",
                  "pattern": "^-?[0-9]+(?:\\.[0-9]+)?$",
                  "description": "Plain decimal string. Never convert money to binary floating point."
                },
                "isMarket": {
                  "type": "boolean"
                },
                "positionSourceHash": {
                  "type": "string",
                  "pattern": "^[a-f0-9]{64}$"
                }
              },
              "required": [
                "kind",
                "tpsl",
                "triggerPrice",
                "isMarket",
                "positionSourceHash"
              ],
              "additionalProperties": false
            },
            {
              "type": "object",
              "properties": {
                "kind": {
                  "const": "twap"
                },
                "minutes": {
                  "type": "integer",
                  "minimum": 5,
                  "maximum": 1440
                },
                "randomize": {
                  "type": "boolean"
                },
                "positionSourceHash": {
                  "type": "string",
                  "pattern": "^[a-f0-9]{64}$"
                }
              },
              "required": [
                "kind",
                "minutes",
                "randomize",
                "positionSourceHash"
              ],
              "additionalProperties": false
            }
          ],
          "description": "Native advanced exits require reduceOnly=true, GTC and a fresh original-position binding. Availability is venue-specific."
        },
        "marginMode": {
          "enum": [
            "cross",
            "isolated"
          ]
        }
      },
      "required": [
        "consent",
        "signature"
      ],
      "additionalProperties": false
    },
    "riskSnapshotIds": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "uuid"
      }
    },
    "ttlMs": {
      "type": "integer",
      "minimum": 1,
      "maximum": 5000
    }
  },
  "required": [
    "signedConsent",
    "riskSnapshotIds",
    "ttlMs"
  ],
  "additionalProperties": false
}
```

Response schema:

```json
{
  "type": "object",
  "properties": {
    "intentId": {
      "type": "string",
      "format": "uuid"
    },
    "status": {
      "type": "string"
    },
    "idempotentReplay": {
      "type": "boolean"
    }
  },
  "required": [
    "intentId",
    "status",
    "idempotentReplay"
  ],
  "additionalProperties": true
}
```

Illustrative response (examples are not live observations):

```json
{
  "intentId": "22222222-2222-4222-8222-222222222222",
  "status": "UNKNOWN",
  "idempotentReplay": false
}
```

- Sign the exact typedData from preparation using eth_signTypedData_v4. Never send a private key.
- Preparation is not a venue order. A receipt is not proof of a fill or settlement.
- Retain the original intentId. On timeouts or uncertain execution, query its status; do not automatically submit a new intent.

## getOrderStatus

Check the original command

`GET /api/v1/orders/{intentId}`

Read durable admission and native-send state for an original intent, including execution uncertainty and replay status.

Authentication: Authorization: Bearer <short-lived app identity proof>, with Origin matching the app. The regional service independently verifies owner identity. Market keys are not accepted.

| Parameter | Location | Type | Required | Description |
| --- | --- | --- | --- | --- |
| intentId | path | string | Yes | Original lowercase UUID from the prepared command. |

Response schema:

```json
{
  "type": "object",
  "properties": {
    "schemaVersion": {
      "const": "1"
    },
    "intentId": {
      "type": "string",
      "format": "uuid"
    },
    "accountId": {
      "type": "string",
      "format": "uuid"
    },
    "marketId": {
      "type": "string"
    },
    "operationHash": {
      "type": "string"
    },
    "recordedStatus": {
      "type": "string"
    },
    "executionUncertain": {
      "type": "boolean"
    },
    "nativeSendStarted": {
      "type": "boolean"
    },
    "venueResponseRecorded": {
      "type": "boolean"
    },
    "admittedAt": {
      "type": "integer"
    },
    "updatedAt": {
      "type": "integer"
    },
    "automaticRetry": {
      "const": false
    },
    "financialAuthority": {
      "const": false
    },
    "settlementQualified": {
      "const": false
    },
    "message": {
      "type": "string"
    }
  },
  "required": [
    "intentId",
    "recordedStatus",
    "executionUncertain",
    "automaticRetry"
  ],
  "additionalProperties": true
}
```

Illustrative response (examples are not live observations):

```json
{
  "schemaVersion": "1",
  "intentId": "22222222-2222-4222-8222-222222222222",
  "accountId": "11111111-1111-4111-8111-111111111111",
  "marketId": "hyperliquid.xyz.NVDA.USDC",
  "recordedStatus": "UNKNOWN",
  "executionUncertain": true,
  "nativeSendStarted": true,
  "venueResponseRecorded": false,
  "automaticRetry": false,
  "financialAuthority": false,
  "settlementQualified": false,
  "message": "Inspect the original native order before submitting another intent."
}
```

