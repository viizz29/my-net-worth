import type { OpenApiRouteSpec } from "../../../../../lib/openapi/types";

const deleteTransactionRouteSpec = {
  path: "/v1/transactions/delete/{transactionId}",
  tags: [
    {
      name: "Transactions",
      description: "Transaction management endpoints",
    },
  ],
  operations: {
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
    },
  },
} satisfies OpenApiRouteSpec;

export default deleteTransactionRouteSpec;
