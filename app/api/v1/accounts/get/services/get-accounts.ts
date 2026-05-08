import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import {
  toGetAccountsResponseDto,
  type GetAccountsResponseDto,
} from "../dtos/accounts-response-dto";

export async function getAccountsForUser(
  userId: bigint,
): Promise<GetAccountsResponseDto> {
  const prisma = getPrismaConnection();

  const accounts = await prisma.accounts.findMany({
    where: { user_id: userId },
    orderBy: { sn: "asc" },
  });

  return toGetAccountsResponseDto(accounts);
}
