import { AppError } from "@/app/api/_lib/my-error";
import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import type { GetAccountResponseDto } from "../../dtos/accounts-response-dto";

export async function getAccountForUser(
  userId: bigint,
  accountSn: bigint,
): Promise<GetAccountResponseDto> {
  const prisma = getPrismaConnection();

  const account = await prisma.accounts.findFirst({
    select: {
      id: true,
      name: true,
      description: true,
      type: true,
      created_at: true,
      updated_at: true,
    },
    where: {
      user_id: userId,
      sn: accountSn,
    },
  });

  if (!account) {
    throw new AppError(404, "Account not found");
  }

  return {
    account,
  };
}
