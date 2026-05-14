import { NextRequest } from "next/server";
import { ApiV1Wrapper } from "../../api-v1-wrapper";
import { parseGetTransactionRequestDto } from "./dtos/get-transaction-request-dto";
import { getTransactionForUser } from "./services/get-transaction";
import { deleteTransactionForUser } from "./services/delete-transaction";
import { parseUpdateTransactionRequestDto } from "./dtos/update-transaction-request-dto";
import { updateTransactionForUser } from "./services/update-transaction";

export const dynamic = "force-dynamic";

export const GET = (
  req: NextRequest,
  { params }: { params: Promise<{ transactionId: string }> },
) =>
  ApiV1Wrapper(req, async (apiReq) => {
    const userId = apiReq.getUser().getId();
    const { transactionId } = await params;
    const { transaction_sn } = parseGetTransactionRequestDto(
      transactionId,
      userId,
    );

    return getTransactionForUser(userId, transaction_sn);
  });

export const DELETE = (
  req: NextRequest,
  { params }: { params: Promise<{ transactionId: string }> },
) =>
  ApiV1Wrapper(req, async (apiReq) => {
    const userId = apiReq.getUser().getId();
    const { transactionId } = await params;
    const { transaction_sn } = parseGetTransactionRequestDto(
      transactionId,
      userId,
    );

    return deleteTransactionForUser(userId, transaction_sn);
  });

export const PATCH = (
  req: NextRequest,
  { params }: { params: Promise<{ transactionId: string }> },
) =>
  ApiV1Wrapper(req, async (apiReq) => {
    const userId = apiReq.getUser().getId();
    const { transactionId } = await params;
    const { transaction_sn } = parseGetTransactionRequestDto(
      transactionId,
      userId,
    );
    const body = await parseUpdateTransactionRequestDto(
      apiReq.getBody(),
      userId,
    );

    return updateTransactionForUser(userId, transaction_sn, body);
  });
