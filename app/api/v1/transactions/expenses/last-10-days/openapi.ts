import type { OpenApiRouteSpec } from "../../../../../lib/openapi/types";

const last10DaysExpensesRouteSpec = {
  path: "/v1/transactions/expenses/last-10-days",
  tags: [
    {
      name: "Transactions",
      description: "Transaction management endpoints",
    },
  ],
  operations: {
    get: {
      tags: ["Transactions"],
      summary: "Get last 10 days expenses day wise",
      description:
        "Returns daily expense totals for the authenticated user for today and the previous 9 days. Days without expenses are returned with 0.00.",
      operationId: "getLast10DaysExpensesForAuthenticatedUser",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Daily expense totals for the last 10 days",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/GetLast10DaysExpensesResponse",
              },
            },
          },
        },
        "401": {
          description: "Missing or invalid authentication token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Last10DaysExpensesErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      DailyExpense: {
        type: "object",
        properties: {
          date: {
            type: "string",
            format: "date",
            example: "2026-05-20",
          },
          amount: {
            type: "string",
            example: "246.38",
          },
        },
        required: ["date", "amount"],
      },
      GetLast10DaysExpensesResponse: {
        type: "object",
        properties: {
          expenses: {
            type: "array",
            items: {
              $ref: "#/components/schemas/DailyExpense",
            },
          },
        },
        required: ["expenses"],
      },
      Last10DaysExpensesErrorResponse: {
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

export default last10DaysExpensesRouteSpec;
