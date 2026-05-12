import { AppError } from "@/app/api/_lib/my-error";
import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import type { GetTransactionResponseDto } from "../../dtos/transactions-response-dto";

export async function getTransactionForUser(
  userId: bigint,
  transactionSn: bigint,
): Promise<GetTransactionResponseDto> {
  const prisma = getPrismaConnection();

  const transaction = await prisma.transactions.findFirst({
    select: {
      id: true,
      account_id: true,
      amount: true,
      comment: true,
      created_at: true,
      updated_at: true,
    },
    where: {
      user_id: userId,
      sn: transactionSn,
    },
  });

  if (!transaction) {
    throw new AppError(404, "Transaction not found");
  }

  return {
    transaction,
  };
}
