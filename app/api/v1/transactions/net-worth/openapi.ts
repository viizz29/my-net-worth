import type { OpenApiRouteSpec } from "@/app/lib/openapi/types";

const netWorthRouteSpec = {
  path: "/v1/transactions/net-worth",
  tags: [
    {
      name: "Transactions",
      description: "Transaction management endpoints",
    },
  ],
  operations: {
    get: {
      tags: ["Transactions"],
      summary: "Get net worth for the authenticated user",
      description:
        "Returns the net worth (total income minus total expenses) for all time for the authenticated user.",
      operationId: "getNetWorthForAuthenticatedUser",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Net worth data for the authenticated user",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/GetNetWorthResponse",
              },
            },
          },
        },
        "401": {
          description: "Missing or invalid authentication token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/NetWorthErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      GetNetWorthResponse: {
        type: "object",
        properties: {
          netWorth: {
            type: "string",
            example: "15250.75",
          },
          totalIncome: {
            type: "string",
            example: "45000.00",
          },
          totalExpenses: {
            type: "string",
            example: "29749.25",
          },
        },
        required: ["netWorth", "totalIncome", "totalExpenses"],
      },
      NetWorthErrorResponse: {
        type: "object",
        properties: {
          msg: {
            type: "string",
            example: "Authentication required.",
          },
        },
        required: ["msg"],
      },
    },
  },
} satisfies OpenApiRouteSpec;

export default netWorthRouteSpec;
