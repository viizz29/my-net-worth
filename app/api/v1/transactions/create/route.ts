import { withApiHandler } from "@/app/api/_lib/with-api-handler";
import { requireAuth } from "@/app/api/_lib/require-auth";
import { parseCreateTransactionRequestDto } from "./dtos/create-transaction-request-dto";
import { createTransactionForUser } from "./services/create-transaction";
import { ApiV1Wrapper, ApiV1Request } from "../../api-v1-wrapper";
import { NextRequest } from "next/server";

export const POST = (req: NextRequest) =>
  ApiV1Wrapper(
    req,
    async (req: ApiV1Request) => {
      const userId = req.user.getId();
      const body = await parseCreateTransactionRequestDto(req.body, userId);

      return createTransactionForUser(userId, body);
    },
    // { successStatus: 201 },
  );
