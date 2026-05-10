import type { OpenApiRouteSpec } from "../../../../../lib/openapi/types";

const deleteAccountRouteSpec = {
  path: "/v1/accounts/delete/{accountId}",
  tags: [
    {
      name: "Accounts",
      description: "Account management endpoints",
    },
  ],
  operations: {
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
      DeleteAccountResponse: {
        type: "object",
        properties: {
          account: {
            $ref: "#/components/schemas/AccountDetail",
          },
        },
        required: ["account"],
      },
      AccountDeleteErrorResponse: {
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
                example: "Account cannot be deleted because it has related transactions",
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

export default deleteAccountRouteSpec;
