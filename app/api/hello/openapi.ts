import type { OpenApiRouteSpec } from "../../lib/openapi/types";

const helloRouteSpec = {
  path: "/hello",
  tags: [
    {
      name: "Health",
      description: "Simple utility endpoints",
    },
  ],
  operations: {
    get: {
      tags: ["Health"],
      summary: "Hello world endpoint",
      operationId: "getHello",
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
          data: {
            type: "string",
            example: "Hello World!",
          },
        },
        required: ["msg", "data"],
      },
    },
  },
} satisfies OpenApiRouteSpec;

export default helloRouteSpec;
