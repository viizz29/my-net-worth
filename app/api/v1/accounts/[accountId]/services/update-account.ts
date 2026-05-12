import { AppError } from "@/app/api/_lib/my-error";
import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import type { UpdateAccountRequestDto } from "../dtos/update-account-request-dto";
import type { UpdateAccountResponseDto } from "../../dtos/accounts-response-dto";

export async function updateAccountForUser(
  userId: bigint,
  accountSn: bigint,
  data: UpdateAccountRequestDto,
): Promise<UpdateAccountResponseDto> {
  const prisma = getPrismaConnection();

  const existingAccount = await prisma.accounts.findFirst({
    select: {
      id: true,
    },
    where: {
      user_id: userId,
      sn: accountSn,
    },
  });

  if (!existingAccount) {
    throw new AppError(404, "Account not found");
  }

  const updatedAccount = await prisma.accounts.update({
    select: {
      id: true,
      name: true,
      description: true,
      type: true,
      created_at: true,
      updated_at: true,
    },
    where: {
      user_id_sn: {
        user_id: userId,
        sn: accountSn,
      },
    },
    data,
  });

  return {
    account: updatedAccount,
  };
}
