import { getTransactionsForUser } from "./services/get-transactions";
import { NextRequest } from "next/server";
import { ApiV1Request, ApiV1Wrapper } from "../api-v1-wrapper";
import { parseCreateTransactionRequestDto } from "./dtos/create-transaction-request-dto";
import { createTransactionForUser } from "./services/create-transaction";

export const GET = (req: NextRequest) =>
  ApiV1Wrapper(req, async (req) => {
    const userId = req.getUser().getId();
    return getTransactionsForUser(userId);
  });

export const POST = (req: NextRequest) =>
  ApiV1Wrapper(
    req,
    async (req: ApiV1Request) => {
      const userId = req.getUser().getId();
      const body = await parseCreateTransactionRequestDto(
        req.getBody(),
        userId,
      );

      return createTransactionForUser(userId, body);
    },
    // { successStatus: 201 },
  );

