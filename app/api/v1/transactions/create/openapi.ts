import type { OpenApiRouteSpec } from "../../../../lib/openapi/types";

const createTransactionsRouteSpec = {
  path: "/v1/transactions/create",
  tags: [
    {
      name: "Transactions",
      description: "Transaction management endpoints",
    },
  ],
  operations: {
    post: {
      tags: ["Transactions"],
      summary: "Create a transaction for the authenticated user",
      description:
        "Creates a new transaction tied to one of the authenticated user's accounts.",
      operationId: "createTransactionForAuthenticatedUser",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateTransactionRequest",
            },
            examples: {
              default: {
                value: {
                  accountId: "495048525151534953",
                  amount: 1250.5,
                  comment: "May salary credited",
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Created transaction",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateTransactionResponse",
              },
            },
          },
        },
        "400": {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransactionsErrorResponse",
              },
            },
          },
        },
        "401": {
          description: "Missing or invalid authentication token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransactionsErrorResponse",
              },
            },
          },
        },
        "404": {
          description: "Referenced account was not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TransactionsErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      CreateTransactionRequest: {
        type: "object",
        properties: {
          accountId: {
            type: "string",
            example: "495048525151534953",
          },
          amount: {
            type: "number",
            format: "float",
            example: 1250.5,
          },
          comment: {
            type: "string",
            example: "May salary credited",
          },
        },
        required: ["accountId", "amount", "comment"],
      },
      TransactionListItem: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "495048525151534954",
          },
          userId: {
            type: "string",
            example: "4950485251515348",
          },
          sn: {
            type: "string",
            example: "7",
          },
          accountId: {
            type: "string",
            example: "495048525151534953",
          },
          accountSn: {
            type: "string",
            example: "1",
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
          "userId",
          "sn",
          "accountId",
          "accountSn",
          "amount",
          "comment",
          "createdAt",
          "updatedAt",
        ],
      },
      CreateTransactionResponse: {
        type: "object",
        properties: {
          transaction: {
            $ref: "#/components/schemas/TransactionListItem",
          },
        },
        required: ["transaction"],
      },
      TransactionsErrorResponse: {
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
                example: "Invalid or expired token",
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

export default createTransactionsRouteSpec;
