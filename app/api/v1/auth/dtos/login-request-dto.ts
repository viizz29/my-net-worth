import * as Yup from "yup";
import type { InferType } from "yup";
export type { ErrorResponseDto } from "./auth-dto";
export { toAuthUserDto, toAuthSuccessResponseDto } from "./auth-dto";

export const loginRequestDtoSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
}).noUnknown();

export type LoginRequestDto = InferType<typeof loginRequestDtoSchema>;
export type { AuthSuccessResponseDto as LoginResponseDto } from "./auth-dto";

export async function parseLoginRequestDto(
  body: unknown,
): Promise<LoginRequestDto> {
  return loginRequestDtoSchema.validate(body, {
    abortEarly: false,
    stripUnknown: true,
  });
}
