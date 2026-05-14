import type { OpenApiRouteSpec } from "../../../../lib/openapi/types";

const getTransactionRouteSpec = {
  path: "/v1/transactions/get/{transactionId}",
  tags: [
    {
      name: "Transactions",
      description: "Transaction management endpoints",
    },
  ],
  operations: {
    get: {
      tags: ["Transactions"],
      summary: "Get transaction details for the authenticated user",
      description:
        "Returns the details of a single transaction owned by the user identified by the bearer token.",
      operationId: "getTransactionForAuthenticatedUser",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "transactionId",
          in: "path",
          required: true,
          description: "Encoded transaction identifier",
          schema: {
            type: "string",
          },
          example: "495048525151534954",
        },
      ],
      responses: {
        "200": {
          description: "Transaction details",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/GetTransactionResponse",
              },
            },
          },
        },
        "400": {
          description: "Invalid transaction identifier",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransactionErrorResponse",
              },
            },
          },
        },
        "401": {
          description: "Missing or invalid authentication token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransactionErrorResponse",
              },
            },
          },
        },
        "404": {
          description: "Transaction not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransactionErrorResponse",
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Transactions"],
      summary: "Delete a transaction for the authenticated user",
      description:
        "Deletes a single transaction owned by the user identified by the bearer token.",
      operationId: "deleteTransactionForAuthenticatedUser",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "transactionId",
          in: "path",
          required: true,
          description: "Encoded transaction identifier",
          schema: {
            type: "string",
          },
          example: "495048525151534954",
        },
      ],
      responses: {
        "200": {
          description: "Deleted transaction",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/DeleteTransactionResponse",
              },
            },
          },
        },
        "400": {
          description: "Invalid transaction identifier",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransactionDeleteErrorResponse",
              },
            },
          },
        },
        "401": {
          description: "Missing or invalid authentication token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransactionDeleteErrorResponse",
              },
            },
          },
        },
        "404": {
          description: "Transaction not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransactionDeleteErrorResponse",
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ["Transactions"],
      summary: "Update a transaction amount for the authenticated user",
      description:
        "Updates only the amount of a single transaction owned by the user identified by the bearer token.",
      operationId: "updateTransactionForAuthenticatedUser",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "transactionId",
          in: "path",
          required: true,
          description: "Encoded transaction identifier",
          schema: {
            type: "string",
          },
          example: "495048525151534954",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateTransactionRequest",
            },
            examples: {
              default: {
                value: {
                  amount: 1500.75,
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Updated transaction",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateTransactionResponse",
              },
            },
          },
        },
        "400": {
          description: "Validation error or invalid transaction identifier",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransactionMutationErrorResponse",
              },
            },
          },
        },
        "401": {
          description: "Missing or invalid authentication token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransactionMutationErrorResponse",
              },
            },
          },
        },
        "404": {
          description: "Transaction not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransactionMutationErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      TransactionDetail: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "495048525151534954",
          },
          accountId: {
            type: "string",
            example: "495048525151534953",
          },
          amount: {
            type: "string",
            example: "1250.5",
          },
          comment: {
            type: "string",
            example: "May salary credited",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-05-10T12:34:56.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-05-10T12:34:56.000Z",
          },
        },
        required: [
          "id",
          "accountId",
          "amount",
          "comment",
          "createdAt",
          "updatedAt",
        ],
      },
      GetTransactionResponse: {
        type: "object",
        properties: {
          transaction: {
            $ref: "#/components/schemas/TransactionDetail",
          },
        },
        required: ["transaction"],
      },
      TransactionErrorResponse: {
        type: "object",
        properties: {
          msg: {
            type: "string",
            example: "NOT OK",
          },
          data: {
            oneOf: [
              {
                type: "string",
                example: "Transaction not found",
              },
              {
                type: "array",
                items: {
                  type: "string",
                },
              },
              {
                type: "object",
                additionalProperties: true,
              },
            ],
          },
        },
        required: ["msg", "data"],
      },
      DeleteTransactionResponse: {
        type: "object",
        properties: {
          transaction: {
            $ref: "#/components/schemas/TransactionDetail",
          },
        },
        required: ["transaction"],
      },
      TransactionDeleteErrorResponse: {
        type: "object",
        properties: {
          msg: {
            type: "string",
            example: "NOT OK",
          },
          data: {
            oneOf: [
              {
                type: "string",
                example: "Transaction not found",
              },
              {
                type: "array",
                items: {
                  type: "string",
                },
              },
              {
                type: "object",
                additionalProperties: true,
              },
            ],
          },
        },
        required: ["msg", "data"],
      },
      UpdateTransactionRequest: {
        type: "object",
        properties: {
          amount: {
            type: "number",
            format: "float",
            example: 1500.75,
          },
        },
        required: ["amount"],
        additionalProperties: false,
      },
      UpdateTransactionResponse: {
        type: "object",
        properties: {
          transaction: {
            $ref: "#/components/schemas/TransactionDetail",
          },
        },
        required: ["transaction"],
      },
      TransactionMutationErrorResponse: {
        type: "object",
        properties: {
          msg: {
            type: "string",
            example: "NOT OK",
          },
          data: {
            oneOf: [
              {
                type: "string",
                example: "Transaction not found",
              },
              {
                type: "array",
                items: {
                  type: "string",
                },
              },
              {
                type: "object",
                additionalProperties: true,
              },
            ],
          },
        },
        required: ["msg", "data"],
      },
    },
  },
} satisfies OpenApiRouteSpec;

export default getTransactionRouteSpec;
