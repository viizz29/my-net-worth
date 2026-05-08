import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/app/backend-config";
import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import type {
  RegisterRequestDto,
  RegisterResponseDto,
} from "@/app/api/v1/auth/dtos/register-request-dto";
import { toAuthSuccessResponseDto } from "../dtos/auth-dto";
import { AuthServiceError } from "./auth-service-error";

export async function registerUser({
  name,
  email,
  password,
}: RegisterRequestDto): Promise<RegisterResponseDto> {
  const prisma = getPrismaConnection();

  const existingUser = await prisma.users.findFirst({
    where: { email },
  });

  if (existingUser) {
    throw new AuthServiceError("A user with this email already exists", 409);
  }

  if (!JWT_SECRET) {
    throw new AuthServiceError("Server error, secret key not set", 500);
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const createdUser = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign(
    { id: createdUser.id.toString(), name: createdUser.name },
    JWT_SECRET,
    {
      expiresIn: "2 days",
    },
  );

  return toAuthSuccessResponseDto(createdUser, token);
}
