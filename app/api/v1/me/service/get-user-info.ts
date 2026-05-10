import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";

export async function getUserInfo(userId: bigint) {
  const prisma = getPrismaConnection();

  const userDetails = await prisma.users.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
    },
    where: {
      id: userId,
    },
  });
  return userDetails;
}
