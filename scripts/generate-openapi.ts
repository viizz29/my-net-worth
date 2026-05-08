import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { stringify } from "yaml";
import type { OpenApiRouteSpec } from "../app/lib/openapi/types";

const repoRoot = process.cwd();
const apiRoot = path.join(repoRoot, "app", "api");
const outputFile = path.join(repoRoot, "public", "openapi.yaml");

const baseDocument = {
  openapi: "3.0.3",
  info: {
    title: "My Net Worth API",
    version: "1.0.0",
    description: "API documentation for the My Net Worth Next.js application.",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local development",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

async function findSpecFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir);
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry);
      const entryStats = await stat(fullPath);

      if (entryStats.isDirectory()) {
        return findSpecFiles(fullPath);
      }

      if (entry === "openapi.ts") {
        return [fullPath];
      }

      return [];
    }),
  );

  return files.flat().sort();
}

async function loadSpecs(): Promise<OpenApiRouteSpec[]> {
  const specFiles = await findSpecFiles(apiRoot);

  return Promise.all(
    specFiles.map(async (filePath) => {
      const moduleUrl = pathToFileURL(filePath).href;
      const imported = (await import(moduleUrl)) as {
        default: OpenApiRouteSpec;
      };

      return imported.default;
    }),
  );
}

async function generateOpenApiDocument() {
  const specs = await loadSpecs();
  const paths: Record<string, Record<string, unknown>> = {};
  const schemas: Record<string, unknown> = {};
  const tags = new Map<string, { name: string; description?: string }>();

  for (const spec of specs) {
    paths[spec.path] = spec.operations;

    for (const tag of spec.tags ?? []) {
      tags.set(tag.name, tag);
    }

    for (const [schemaName, schema] of Object.entries(
      spec.components?.schemas ?? {},
    )) {
      schemas[schemaName] = schema;
    }
  }

  return {
    ...baseDocument,
    tags: [...tags.values()],
    paths,
    components: {
      ...baseDocument.components,
      schemas,
    },
  };
}

async function main() {
  const document = await generateOpenApiDocument();
  const yaml = [
    "# This file is generated from TypeScript OpenAPI specs.",
    "# Run `npm run openapi:generate` to refresh it.",
    stringify(document),
  ].join("\n");

  await writeFile(outputFile, yaml, "utf8");
  console.log(`Generated ${path.relative(repoRoot, outputFile)}`);
}

main().catch((error) => {
  console.error("Failed to generate OpenAPI document");
  console.error(error);
  process.exit(1);
});
