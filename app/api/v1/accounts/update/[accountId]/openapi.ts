import type { OpenApiRouteSpec } from "../../../../../lib/openapi/types";

const updateAccountRouteSpec = {
  path: "/v1/accounts/update/{accountId}",
  tags: [
    {
      name: "Accounts",
      description: "Account management endpoints",
    },
  ],
  operations: {
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

export default updateAccountRouteSpec;
