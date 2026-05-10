import { NextRequest } from "next/server";
import { ApiV1Wrapper } from "../../../api-v1-wrapper";
import { parseGetTransactionRequestDto } from "./dtos/get-transaction-request-dto";
import { getTransactionForUser } from "./services/get-transaction";

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
