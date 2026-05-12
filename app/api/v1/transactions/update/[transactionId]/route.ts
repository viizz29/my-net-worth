import { NextRequest } from "next/server";
import { ApiV1Wrapper } from "../../../api-v1-wrapper";
import { parseGetTransactionRequestDto } from "../../[transactionId]/dtos/get-transaction-request-dto";
import { parseUpdateTransactionRequestDto } from "../dtos/update-transaction-request-dto";
import { updateTransactionForUser } from "./services/update-transaction";

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
    const body = await parseUpdateTransactionRequestDto(apiReq.getBody());

    return updateTransactionForUser(userId, transaction_sn, body);
  });
