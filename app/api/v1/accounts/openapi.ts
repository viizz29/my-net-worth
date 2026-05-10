import type { OpenApiRouteSpec } from "../../../lib/openapi/types";

const getAccountsRouteSpec = {
  path: "/v1/accounts",
  tags: [
    {
      name: "Accounts",
      description: "Account management endpoints",
    },
  ],
  operations: {
    get: {
      tags: ["Accounts"],
      summary: "Get accounts for the authenticated user",
      description:
        "Returns the list of accounts owned by the user identified by the bearer token.",
      operationId: "getAccountsForAuthenticatedUser",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "List of accounts owned by the authenticated user",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/GetAccountsResponse",
              },
            },
          },
        },
        "401": {
          description: "Missing or invalid authentication token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AccountsErrorResponse",
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Accounts"],
      summary: "Create an account for the authenticated user",
      description:
        "Creates a new account owned by the user identified by the bearer token.",
      operationId: "createAccountForAuthenticatedUser",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateAccountRequest",
            },
            examples: {
              default: {
                value: {
                  name: "Salary",
                  description: "Monthly income account",
                  type: "income",
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Created account",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateAccountResponse",
              },
            },
          },
        },
        "400": {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AccountsErrorResponse",
              },
            },
          },
        },
        "401": {
          description: "Missing or invalid authentication token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AccountsErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      AccountListItem: {
        type: "object",
        properties: {
          userId: {
            type: "string",
            example: "1",
          },
          sn: {
            type: "string",
            example: "1",
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
          "userId",
          "sn",
          "name",
          "description",
          "type",
          "createdAt",
          "updatedAt",
        ],
      },
      GetAccountsResponse: {
        type: "object",
        properties: {
          accounts: {
            type: "array",
            items: {
              $ref: "#/components/schemas/AccountListItem",
            },
          },
        },
        required: ["accounts"],
      },
      AccountsErrorResponse: {
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
      CreateAccountRequest: {
        type: "object",
        properties: {
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
        },
        required: ["name", "description", "type"],
      },
      CreateAccountResponse: {
        type: "object",
        properties: {
          account: {
            $ref: "#/components/schemas/AccountListItem",
          },
        },
        required: ["account"],
      },
    },
  },
} satisfies OpenApiRouteSpec;

export default getAccountsRouteSpec;
