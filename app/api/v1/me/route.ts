import { NextRequest } from "next/server";
import { ApiV1Wrapper } from "../api-v1-wrapper";
import { getUserInfo } from "./service/get-user-info";

export const GET = (req: NextRequest) =>
  ApiV1Wrapper(req, async (req) => {
    const userId = req.getUser().getId();
    return getUserInfo(userId);
  });
