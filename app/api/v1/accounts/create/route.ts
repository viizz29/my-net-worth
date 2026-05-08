import { withApiHandler } from "@/app/api/_lib/with-api-handler";
import { requireAuth } from "@/app/api/_lib/require-auth";
import { parseCreateAccountRequestDto } from "./dtos/create-account-request-dto";
import { createAccountForUser } from "./services/create-account";

export const POST = withApiHandler(
  async function POST(request: Request) {
    const { userId } = requireAuth(request);
    const body = await parseCreateAccountRequestDto(await request.json());

    return createAccountForUser(userId, body);
  },
  { successStatus: 201 },
);
