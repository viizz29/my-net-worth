import { NextRequest } from "next/server";
import { ApiV1Wrapper } from "../../../api-v1-wrapper";
import { parseGetAccountRequestDto } from "../../get/[accountId]/dtos/get-account-request-dto";
import { parseUpdateAccountRequestDto } from "../dtos/update-account-request-dto";
import { updateAccountForUser } from "./services/update-account";

export const PATCH = (
  req: NextRequest,
  { params }: { params: Promise<{ accountId: string }> },
) =>
  ApiV1Wrapper(req, async (apiReq) => {
    const userId = apiReq.getUser().getId();
    const { accountId } = await params;
    const { account_sn } = parseGetAccountRequestDto(accountId, userId);
    const body = await parseUpdateAccountRequestDto(apiReq.getBody());

    return updateAccountForUser(userId, account_sn, body);
  });
