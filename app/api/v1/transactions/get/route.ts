import { getTransactionsForUser } from "./services/get-transactions";
import { NextRequest } from "next/server";
import { ApiV1Wrapper } from "../../api-v1-wrapper";

export const GET = (req: NextRequest) =>
  ApiV1Wrapper(req, async (wealthTrackerRequest) => {
    const userId = wealthTrackerRequest.user.getId();
    return getTransactionsForUser(userId);
  });
