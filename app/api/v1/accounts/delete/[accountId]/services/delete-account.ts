import { AppError } from "@/app/api/_lib/my-error";
import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import { Prisma } from "@/app/generated/prisma-client";
import type { DeleteAccountResponseDto } from "../../../get/dtos/accounts-response-dto";

export async function deleteAccountForUser(
  userId: bigint,
  accountSn: bigint,
): Promise<DeleteAccountResponseDto> {
  const prisma = getPrismaConnection();

  const existingAccount = await prisma.accounts.findFirst({
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

  if (!existingAccount) {
    throw new AppError(404, "Account not found");
  }

  try {
    await prisma.accounts.delete({
      where: {
        user_id_sn: {
          user_id: userId,
          sn: accountSn,
        },
      },
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      throw new AppError(
        409,
        "Account cannot be deleted because it has related transactions",
      );
    }

    throw error;
  }

  return {
    account: existingAccount,
  };
}
