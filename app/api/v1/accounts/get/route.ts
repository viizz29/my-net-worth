import { getAccountsForUser } from "./services/get-accounts";
import { ApiV1Wrapper } from "../../api-v1-wrapper";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const GET = (req: NextRequest) =>
  ApiV1Wrapper(req, async (req) => {
    const userId = req.getUser().getId();
    return getAccountsForUser(userId);
  });
