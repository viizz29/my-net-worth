import type { OpenApiRouteSpec } from "../../../../lib/openapi/types";

const createAccountsRouteSpec = {
  path: "/v1/accounts/create",
  tags: [
    {
      name: "Accounts",
      description: "Account management endpoints",
    },
  ],
  operations: {
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
      CreateAccountResponse: {
        type: "object",
        properties: {
          account: {
            $ref: "#/components/schemas/AccountListItem",
          },
        },
        required: ["account"],
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
    },
  },
} satisfies OpenApiRouteSpec;

export default createAccountsRouteSpec;
