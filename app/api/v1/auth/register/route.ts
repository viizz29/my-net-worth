import { withApiHandler } from "@/app/api/_lib/with-api-handler";
import { parseRegisterRequestDto } from "@/app/api/v1/auth/dtos/register-request-dto";
import { registerUser } from "@/app/api/v1/auth/services/register-user";

export const POST = withApiHandler(
  async function POST(request: Request) {
    const body = await parseRegisterRequestDto(await request.json());
    return registerUser(body);
  },
  { successStatus: 201 },
);
