import { decodeId } from "@/app/api/_lib/camelize-and-kebabize";
import { AppError } from "@/app/api/_lib/my-error";

export interface GetAccountRequestDto {
  account_sn: bigint;
}

export function parseGetAccountRequestDto(
  accountId: string,
  userId: bigint,
): GetAccountRequestDto {
  const decodedAccountId = decodeId(accountId);

  if (decodedAccountId.length !== 2) {
    throw new AppError(400, "An invalid account id has been provided");
  }

  const [accountUserId, accountSn] = decodedAccountId;

  if (BigInt(accountUserId) !== userId) {
    throw new AppError(404, "Account not found");
  }

  return {
    account_sn: BigInt(accountSn),
  };
}
