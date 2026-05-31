import { AppError } from "@/app/api/_lib/my-error";
import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import { DeleteTransactionResponseDto } from "../../dtos/transactions-response-dto";

export async function deleteTransactionForUser(
  userId: bigint,
  transactionSn: bigint,
): Promise<DeleteTransactionResponseDto> {
  const prisma = getPrismaConnection();

  const existingTransaction = await prisma.transactions.findFirst({
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

  if (!existingTransaction) {
    throw new AppError(404, "Transaction not found");
  }

  await prisma.transactions.delete({
    where: {
      user_id_sn: {
        user_id: userId,
        sn: transactionSn,
      },
    },
  });

  return {
    transaction: existingTransaction,
  };
}
