import type { OpenApiRouteSpec } from "../../../../lib/openapi/types";

const getAccountRouteSpec = {
  path: "/v1/accounts/{accountId}",
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
    delete: {
      tags: ["Accounts"],
      summary: "Delete an account for the authenticated user",
      description:
        "Deletes a single account owned by the user identified by the bearer token.",
      operationId: "deleteAccountForAuthenticatedUser",
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
          description: "Deleted account",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/DeleteAccountResponse",
              },
            },
          },
        },
        "400": {
          description: "Invalid account identifier",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AccountDeleteErrorResponse",
              },
            },
          },
        },
        "401": {
          description: "Missing or invalid authentication token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AccountDeleteErrorResponse",
              },
            },
          },
        },
        "404": {
          description: "Account not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AccountDeleteErrorResponse",
              },
            },
          },
        },
        "409": {
          description: "Account has related transactions and cannot be deleted",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AccountDeleteErrorResponse",
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ["Accounts"],
      summary: "Update account details for the authenticated user",
      description:
        "Updates one or more fields on a single account owned by the user identified by the bearer token.",
      operationId: "updateAccountForAuthenticatedUser",
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
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateAccountRequest",
            },
            examples: {
              rename: {
                value: {
                  name: "Primary Salary",
                },
              },
              full: {
                value: {
                  name: "Salary",
                  description: "Updated monthly income account",
                  type: "income",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Updated account",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateAccountResponse",
              },
            },
          },
        },
        "400": {
          description: "Validation error or invalid account identifier",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AccountMutationErrorResponse",
              },
            },
          },
        },
        "401": {
          description: "Missing or invalid authentication token",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AccountMutationErrorResponse",
              },
            },
          },
        },
        "404": {
          description: "Account not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AccountMutationErrorResponse",
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
      UpdateAccountRequest: {
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
        additionalProperties: false,
        minProperties: 1,
      },

      UpdateAccountResponse: {
        type: "object",
        properties: {
          account: {
            $ref: "#/components/schemas/AccountDetail",
          },
        },
        required: ["account"],
      },
      AccountMutationErrorResponse: {
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
