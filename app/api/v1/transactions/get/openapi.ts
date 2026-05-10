import type { OpenApiRouteSpec } from "../../../../lib/openapi/types";

const getTransactionsRouteSpec = {
  path: "/v1/transactions/get",
  tags: [
    {
      name: "Transactions",
      description: "Transaction management endpoints",
    },
  ],
  operations: {
    get: {
      tags: ["Transactions"],
      summary: "Get transactions for the authenticated user",
      description:
        "Returns the list of transactions owned by the user identified by the bearer token.",
      operationId: "getTransactionsForAuthenticatedUser",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "List of transactions owned by the authenticated user",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/GetTransactionsResponse",
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
      },
    },
  },
  components: {
    schemas: {
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
      GetTransactionsResponse: {
        type: "object",
        properties: {
          transactions: {
            type: "array",
            items: {
              $ref: "#/components/schemas/TransactionListItem",
            },
          },
        },
        required: ["transactions"],
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

export default getTransactionsRouteSpec;
