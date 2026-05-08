import type { users } from "@/app/generated/prisma-client";

export type AuthUserDto = {
  name: string;
  email: string;
};

export type AuthSuccessResponseDto = {
  user: AuthUserDto;
  token: string;
};

export type ErrorResponseDto = {
  msg: "NOT OK";
  data: unknown;
};

export const toAuthUserDto = (user: users): AuthUserDto => ({
  name: user.name,
  email: user.email,
});

export const toAuthSuccessResponseDto = (
  user: users,
  token: string,
): AuthSuccessResponseDto => ({
  user: toAuthUserDto(user),
  token,
});
