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
  }).$extends({
    result: {
      accounts: {
        id: {
          needs: { user_id: true, sn: true },
          compute(rec): [bigint, bigint] {
            return [rec.user_id, rec.sn];
          },
        },
      },
      transactions: {
        id: {
          needs: { user_id: true, sn: true },
          compute(rec): [bigint, bigint] {
            return [rec.user_id, rec.sn];
          },
        },
        account_id: {
          needs: { user_id: true, account_sn: true },
          compute(rec): [bigint, bigint] {
            return [rec.user_id, rec.account_sn];
          },
        },
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.customPrismaClient = customPrismaClient;
}
