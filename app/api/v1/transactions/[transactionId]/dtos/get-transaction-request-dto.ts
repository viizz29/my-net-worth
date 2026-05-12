import { decodeId } from "@/app/api/_lib/camelize-and-kebabize";
import { AppError } from "@/app/api/_lib/my-error";

export interface GetTransactionRequestDto {
  transaction_sn: bigint;
}

export function parseGetTransactionRequestDto(
  transactionId: string,
  userId: bigint,
): GetTransactionRequestDto {
  const decodedTransactionId = decodeId(transactionId);

  if (decodedTransactionId.length !== 2) {
    throw new AppError(400, "An invalid transaction id has been provided");
  }

  const [transactionUserId, transactionSn] = decodedTransactionId;

  if (BigInt(transactionUserId) !== userId) {
    throw new AppError(404, "Transaction not found");
  }

  return {
    transaction_sn: BigInt(transactionSn),
  };
}
