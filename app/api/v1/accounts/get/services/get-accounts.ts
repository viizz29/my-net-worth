import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import { type GetAccountsResponseDto } from "../dtos/accounts-response-dto";

export async function getAccountsForUser(
  userId: bigint,
): Promise<GetAccountsResponseDto> {
  const prisma = getPrismaConnection();

  const accounts = await prisma.accounts.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
    where: { user_id: userId },
    orderBy: { sn: "asc" },
  });

  return accounts;
}
