import { NextRequest } from "next/server";
import { ApiV1Wrapper } from "../../../api-v1-wrapper";
import { parseGetTransactionRequestDto } from "../../[transactionId]/dtos/get-transaction-request-dto";
import { deleteTransactionForUser } from "./services/delete-transaction";

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
