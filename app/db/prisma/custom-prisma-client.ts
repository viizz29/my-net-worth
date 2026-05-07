import { DATABASE_URL } from "@/app/backend-config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma-client";

const globalForPrisma = globalThis as typeof globalThis & {
  customPrismaClient?: PrismaClient;
};

const adapter = new PrismaPg({ connectionString: DATABASE_URL });

export const customPrismaClient =
  globalForPrisma.customPrismaClient ??
  new PrismaClient({
    adapter,
  }).$extends({});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.customPrismaClient = customPrismaClient;
}
