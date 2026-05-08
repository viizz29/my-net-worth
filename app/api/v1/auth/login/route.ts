import { withApiHandler } from "@/app/api/_lib/with-api-handler";
import { parseLoginRequestDto } from "@/app/api/v1/auth/dtos/login-request-dto";
import { loginUser } from "@/app/api/v1/auth/services/login-user";

export const POST = withApiHandler(async function POST(request: Request) {
    const body = await parseLoginRequestDto(await request.json());
    return loginUser(body);
});
