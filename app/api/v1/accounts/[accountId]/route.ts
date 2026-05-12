import { NextRequest } from "next/server";
import { ApiV1Wrapper } from "../../api-v1-wrapper";
import { parseGetAccountRequestDto } from "./dtos/get-account-request-dto";
import { deleteAccountForUser } from "./services/delete-account";
import { getAccountForUser } from "./services/get-account";
import { parseUpdateAccountRequestDto } from "./dtos/update-account-request-dto";
import { updateAccountForUser } from "./services/update-account";

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
