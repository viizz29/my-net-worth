import { NextRequest } from "next/server";
import { ApiV1Wrapper } from "../../../api-v1-wrapper";
import { getLast6MonthsIncomeForUser } from "./services/get-last-6-months-income";

export const dynamic = "force-dynamic";

export const GET = (req: NextRequest) =>
  ApiV1Wrapper(req, async (req) => {
    const userId = req.getUser().getId();
    return getLast6MonthsIncomeForUser(userId);
  });
