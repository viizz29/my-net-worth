import type { OpenApiRouteSpec } from "../../../../lib/openapi/types";

const loginRouteSpec = {
  path: "/v1/auth/login",
  tags: [
    {
      name: "Auth",
      description: "Authentication endpoints",
    },
  ],
  operations: {
    post: {
      tags: ["Auth"],
      summary: "Log a user in",
      operationId: "loginUser",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginRequest",
            },
            examples: {
              default: {
                value: {
                  email: "avery.patel@example.com",
                  password: "password123",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Successful login",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginSuccessResponse",
              },
            },
          },
        },
        "400": {
          description: "Validation or login error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      LoginRequest: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          password: {
            type: "string",
            minLength: 6,
            example: "secret123",
          },
        },
        required: ["email", "password"],
      },
      AuthenticatedUser: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          name: {
            type: "string",
            nullable: true,
            example: "Demo User",
          },
        },
        required: ["email"],
      },
      LoginSuccessResponse: {
        type: "object",
        properties: {
          user: {
            $ref: "#/components/schemas/AuthenticatedUser",
          },
          token: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
        },
        required: ["user", "token"],
      },
      LoginErrorResponse: {
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
                example: "Invalid Password. Please try again",
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

export default loginRouteSpec;
