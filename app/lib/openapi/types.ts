export type OpenApiHttpMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "head"
  | "options";

export type OpenApiSchema = Record<string, unknown>;

export type OpenApiResponse = {
  description: string;
  content?: {
    [contentType: string]: {
      schema?: OpenApiSchema;
      examples?: Record<string, unknown>;
    };
  };
};

export type OpenApiOperation = {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: Array<Record<string, unknown>>;
  security?: Array<Record<string, string[]>>;
  requestBody?: {
    required?: boolean;
    content: {
      [contentType: string]: {
        schema?: OpenApiSchema;
        examples?: Record<string, unknown>;
      };
    };
  };
  responses: Record<string, OpenApiResponse>;
};

export type OpenApiRouteSpec = {
  path: string;
  operations: Partial<Record<OpenApiHttpMethod, OpenApiOperation>>;
  components?: {
    schemas?: Record<string, OpenApiSchema>;
  };
  tags?: Array<{
    name: string;
    description?: string;
  }>;
};
