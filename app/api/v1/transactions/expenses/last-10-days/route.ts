import { NextRequest } from "next/server";
import { ApiV1Wrapper } from "../../../api-v1-wrapper";
import { getLast10DaysExpensesForUser } from "./services/get-last-10-days-expenses";

export const dynamic = "force-dynamic";

export const GET = (req: NextRequest) =>
  ApiV1Wrapper(req, async (req) => {
    const userId = req.getUser().getId();
    return getLast10DaysExpensesForUser(userId);
  });
