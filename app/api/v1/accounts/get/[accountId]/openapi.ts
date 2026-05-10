import type { OpenApiRouteSpec } from "../../../../../lib/openapi/types";

const getAccountRouteSpec = {
  path: "/v1/accounts/get/{accountId}",
  tags: [
    {
      name: "Accounts",
      description: "Account management endpoints",
    },
  ],
  operations: {
    get: {
      tags: ["Accounts"],
      summary: "Get account details for the authenticated user",
      description:
        "Returns the details of a single account owned by the user identified by the bearer token.",
      operationId: "getAccountForAuthenticatedUser",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "accountId",
          in: "path",
          required: true,
          description: "Encoded account identifier",
          schema: {
            type: "string",
          },
          example: "495048525151534953",
        },
      ],
      responses: {
        "200": {
          description: "Account details",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/GetAccountResponse",
              },
            },
          },
        },
        "400": {
          description: "Invalid account identifier",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AccountErrorResponse",
              },
            },
          },
        },
        "401": {
          description: "Missing or invalid authentication token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AccountErrorResponse",
              },
            },
          },
        },
        "404": {
          description: "Account not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AccountErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      AccountDetail: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "495048525151534953",
          },
          name: {
            type: "string",
            example: "Salary",
          },
          description: {
            type: "string",
            example: "Monthly income account",
          },
          type: {
            type: "string",
            enum: ["income", "expense"],
            example: "income",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-05-08T12:34:56.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-05-08T12:34:56.000Z",
          },
        },
        required: [
          "id",
          "name",
          "description",
          "type",
          "createdAt",
          "updatedAt",
        ],
      },
      GetAccountResponse: {
        type: "object",
        properties: {
          account: {
            $ref: "#/components/schemas/AccountDetail",
          },
        },
        required: ["account"],
      },
      AccountErrorResponse: {
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
                example: "Account not found",
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

export default getAccountRouteSpec;
