import { AppError } from "@/app/api/_lib/my-error";
import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import type { UpdateTransactionResponseDto } from "../../../dtos/transactions-response-dto";
import type { UpdateTransactionRequestDto } from "../../dtos/update-transaction-request-dto";

export async function updateTransactionForUser(
  userId: bigint,
  transactionSn: bigint,
  data: UpdateTransactionRequestDto,
): Promise<UpdateTransactionResponseDto> {
  const prisma = getPrismaConnection();

  const existingTransaction = await prisma.transactions.findFirst({
    select: {
      id: true,
    },
    where: {
      user_id: userId,
      sn: transactionSn,
    },
  });

  if (!existingTransaction) {
    throw new AppError(404, "Transaction not found");
  }

  const updatedTransaction = await prisma.transactions.update({
    select: {
      id: true,
      account_id: true,
      amount: true,
      comment: true,
      created_at: true,
      updated_at: true,
    },
    where: {
      user_id_sn: {
        user_id: userId,
        sn: transactionSn,
      },
    },
    data: {
      amount: data.amount,
    },
  });

  return {
    transaction: updatedTransaction,
  };
}
