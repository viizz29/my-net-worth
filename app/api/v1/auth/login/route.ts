import { parseLoginRequestDto } from "@/app/api/v1/auth/dtos/login-request-dto";
import { loginUser } from "@/app/api/v1/auth/services/login-user";
import { NextRequest } from "next/server";
import { ApiV1Request, ApiV1Wrapper } from "../../api-v1-wrapper";

export const POST = (req: NextRequest) =>
  ApiV1Wrapper(
    req,
    async (req: ApiV1Request) => {
      console.log("Parsed login request DTO:", req.getBody);
      const input = await parseLoginRequestDto(req.getBody());
      console.log("Parsed login request DTO:", input);
      return loginUser(input);
    },
    { publicAPI: true, doNotWrap: true },
  );
