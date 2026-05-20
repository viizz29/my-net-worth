import type { OpenApiRouteSpec } from "@/app/lib/openapi/types";

const last6MonthsIncomeRouteSpec = {
  path: "/v1/transactions/income/last-6-months",
  tags: [
    {
      name: "Transactions",
      description: "Transaction management endpoints",
    },
  ],
  operations: {
    get: {
      tags: ["Transactions"],
      summary: "Get last 6 months income month wise",
      description:
        "Returns monthly income totals for the authenticated user for the current month and the previous 5 months. Months without income are returned with 0.00.",
      operationId: "getLast6MonthsIncomeForAuthenticatedUser",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Monthly income totals for the last 6 months",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/GetLast6MonthsIncomeResponse",
              },
            },
          },
        },
        "401": {
          description: "Missing or invalid authentication token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Last6MonthsIncomeErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      MonthlyIncome: {
        type: "object",
        properties: {
          month: {
            type: "string",
            format: "date",
            example: "2026-01",
          },
          amount: {
            type: "string",
            example: "5250.00",
          },
        },
        required: ["month", "amount"],
      },
      GetLast6MonthsIncomeResponse: {
        type: "object",
        properties: {
          income: {
            type: "array",
            items: {
              $ref: "#/components/schemas/MonthlyIncome",
            },
          },
        },
        required: ["income"],
      },
      Last6MonthsIncomeErrorResponse: {
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

export default last6MonthsIncomeRouteSpec;
