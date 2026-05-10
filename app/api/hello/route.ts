import { NextRequest } from "next/server";
import { ApiV1Wrapper } from "../v1/api-v1-wrapper";

export const GET = (req: NextRequest) =>
  ApiV1Wrapper(
    req,
    async (req) => {
      return "Hello World!";
    },
    { publicAPI: true },
  );
