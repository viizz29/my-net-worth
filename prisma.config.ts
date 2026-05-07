import { defineConfig } from "prisma/config";
import { DATABASE_URL } from "./app/backend-config";

export default defineConfig({
  schema: "app/db/prisma/schema.prisma",
  migrations: {
    seed: "./app/db/prisma/seed.ts",
  },
  datasource: {
    url: DATABASE_URL,
  },
});
