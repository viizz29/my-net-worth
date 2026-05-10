import { NextRequest } from "next/server";
import { ApiV1Wrapper } from "../../api-v1-wrapper";
import { parseGetAccountRequestDto } from "./dtos/get-account-request-dto";
import { getAccountForUser } from "./services/get-account";

export const dynamic = "force-dynamic";

export const GET = (
  req: NextRequest,
  { params }: { params: Promise<{ accountId: string }> },
) =>
  ApiV1Wrapper(req, async (apiReq) => {
    const userId = apiReq.getUser().getId();
    const { accountId } = await params;
    const { account_sn } = parseGetAccountRequestDto(accountId, userId);

    return getAccountForUser(userId, account_sn);
  });
