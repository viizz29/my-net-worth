import { NextRequest } from "next/server";
import { ApiV1Wrapper } from "../../../api-v1-wrapper";
import { parseGetAccountRequestDto } from "../../get/[accountId]/dtos/get-account-request-dto";
import { deleteAccountForUser } from "./services/delete-account";

export const DELETE = (
  req: NextRequest,
  { params }: { params: Promise<{ accountId: string }> },
) =>
  ApiV1Wrapper(req, async (apiReq) => {
    const userId = apiReq.getUser().getId();
    const { accountId } = await params;
    const { account_sn } = parseGetAccountRequestDto(accountId, userId);
    return deleteAccountForUser(userId, account_sn);
  });
