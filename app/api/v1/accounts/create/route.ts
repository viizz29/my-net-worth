import { parseCreateAccountRequestDto } from "./dtos/create-account-request-dto";
import { createAccountForUser } from "./services/create-account";
import { ApiV1Wrapper, ApiV1Request } from "../../api-v1-wrapper";
import { NextRequest } from "next/server";

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
