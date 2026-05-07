import { customPrismaClient } from "./custom-prisma-client";

export const getPrismaConnection = () => {
  return customPrismaClient;
};
