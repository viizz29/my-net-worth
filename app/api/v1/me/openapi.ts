import type { OpenApiRouteSpec } from "@/app/lib/openapi/types";

const meRouteSpec = {
  path: "/v1/me",
  tags: [
    {
      name: "Me",
      description: "Simple utility endpoints",
    },
  ],
  operations: {
    get: {
      tags: ["Me"],
      summary: "Logged in user information endpoint",
      operationId: "me",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/HelloResponse",
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      HelloResponse: {
        type: "object",
        properties: {
          msg: {
            type: "string",
            example: "OK",
          },
          code: {
            type: "number",
            example: 200,
          },
          data: {
            id: "string",
            name: "Hello World!",
            email: "user1@example.com",
          },
        },
        required: ["msg", "code"],
      },
    },
  },
} satisfies OpenApiRouteSpec;

export default meRouteSpec;
