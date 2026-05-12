import { ApiError } from "@/app/api/_lib/api-error";
import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import type { CreateTransactionResponseDto } from "../dtos/transactions-response-dto";
import { CreateTransactionRequestDto } from "../dtos/create-transaction-request-dto";

export async function createTransactionForUser(
  userId: bigint,
  data: CreateTransactionRequestDto,
): Promise<CreateTransactionResponseDto> {
  const prisma = getPrismaConnection();

  const account = await prisma.accounts.findFirst({
    select: { sn: true },
    where: {
      user_id: userId,
      sn: data.account_sn,
    },
  });

  if (!account) {
    throw new ApiError("Account not found", 404);
  }

  const transaction = await prisma.transactions.create({
    select: {
      id: true,
      account_id: true,
      amount: true,
      comment: true,
      created_at: true,
      updated_at: true,
    },
    data: {
      user_id: userId,
      sn: 0n,
      account_sn: data.account_sn,
      amount: data.amount,
      comment: data.comment,
    },
  });

  return { transaction };
}
