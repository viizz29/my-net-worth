import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import type { GetTransactionsResponseDto } from "../dtos/transactions-response-dto";

export async function getTransactionsForUser(
  userId: bigint,
): Promise<GetTransactionsResponseDto> {
  const prisma = getPrismaConnection();

  const transactions = await prisma.transactions.findMany({
    select: {
      id: true,
      account_id: true,
      amount: true,
      comment: true,
      created_at: true,
      updated_at: true,
    },
    where: { user_id: userId },
    orderBy: { sn: "desc" },
  });

  return { transactions };
}
