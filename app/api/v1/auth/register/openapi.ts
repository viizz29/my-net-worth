import type { OpenApiRouteSpec } from "../../../../lib/openapi/types";

const registerRouteSpec = {
  path: "/v1/auth/register",
  tags: [
    {
      name: "Auth",
      description: "Authentication endpoints",
    },
  ],
  operations: {
    post: {
      tags: ["Auth"],
      summary: "Register a new user",
      operationId: "registerUser",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegisterRequest",
            },
            examples: {
              default: {
                value: {
                  name: "Demo User",
                  email: "user20@example.com",
                  password: "password123",
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Successful registration",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterSuccessResponse",
              },
            },
          },
        },
        "400": {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterErrorResponse",
              },
            },
          },
        },
        "409": {
          description: "User already exists",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterErrorResponse",
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      RegisterRequest: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "Demo User",
          },
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          password: {
            type: "string",
            minLength: 6,
            example: "password123",
          },
        },
        required: ["name", "email", "password"],
      },
      RegisterSuccessResponse: {
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
      RegisterErrorResponse: {
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
                example: "A user with this email already exists",
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

export default registerRouteSpec;
