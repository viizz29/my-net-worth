import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import type { CreateAccountRequestDto } from "../dtos/create-account-request-dto";
import { type CreateAccountResponseDto } from "../../get/dtos/accounts-response-dto";

export async function createAccountForUser(
  userId: bigint,
  data: CreateAccountRequestDto,
): Promise<CreateAccountResponseDto> {
  const prisma = getPrismaConnection();

  const createdAccount = await prisma.accounts.create({
    select: {
      id: true,
      name: true,
    },
    data: {
      user_id: userId,
      // The database trigger replaces this placeholder with the next per-user sequence.
      sn: 0n,
      name: data.name,
      description: data.description,
      type: data.type,
    },
  });

  return createdAccount;
}
