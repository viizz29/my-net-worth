import * as Yup from "yup";
import type { InferType } from "yup";

export type { ErrorResponseDto } from "./auth-dto";
export type { AuthSuccessResponseDto as RegisterResponseDto } from "./auth-dto";

export const registerRequestDtoSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
}).noUnknown();

export type RegisterRequestDto = InferType<typeof registerRequestDtoSchema>;

export async function parseRegisterRequestDto(
  body: unknown,
): Promise<RegisterRequestDto> {
  return registerRequestDtoSchema.validate(body, {
    abortEarly: false,
    stripUnknown: true,
  });
}
