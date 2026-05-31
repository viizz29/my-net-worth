import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/app/backend-config";
import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import {
  toAuthSuccessResponseDto,
  type LoginRequestDto,
  type LoginResponseDto,
} from "@/app/api/v1/auth/dtos/login-request-dto";
import { AuthServiceError } from "./auth-service-error";
import { encodeId } from "@/app/api/_lib/camelize-and-kebabize";

export async function loginUser({
  email,
  password,
}: LoginRequestDto): Promise<LoginResponseDto> {
  const prisma = getPrismaConnection();

  const foundUser = await prisma.users.findFirst({
    where: { email },
  });

  if (!foundUser) {
    throw new AuthServiceError("No such user account", 404);
  }

  const isMatch = bcrypt.compareSync(password, foundUser.password);
  if (!isMatch) {
    throw new AuthServiceError("Invalid Password. Please try again", 401);
  }

  if (!JWT_SECRET) {
    throw new AuthServiceError("Server error, secret key not set", 500);
  }

  const token = jwt.sign({ sub: encodeId([foundUser.id]) }, JWT_SECRET, {
    expiresIn: "2 days",
  });

  return toAuthSuccessResponseDto(foundUser, token);
}
