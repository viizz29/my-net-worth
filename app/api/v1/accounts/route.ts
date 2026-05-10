import { ApiV1Request, ApiV1Wrapper } from "../api-v1-wrapper";
import { parseCreateAccountRequestDto } from "./dtos/create-account-request-dto";
import { createAccountForUser } from "./services/create-account";
import { getAccountsForUser } from "./services/get-accounts";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const GET = (req: NextRequest) =>
  ApiV1Wrapper(req, async (req) => {
    const userId = req.getUser().getId();
    return getAccountsForUser(userId);
  });

export const POST = (req: NextRequest) =>
  ApiV1Wrapper(
    req,
    async (req: ApiV1Request) => {
      const userId = req.getUser().getId();
      const body = await parseCreateAccountRequestDto(req.getBody());
      return createAccountForUser(userId, body);
    },
    // { successStatus: 201 },
  );
