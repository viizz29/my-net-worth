import * as Yup from "yup";
import type { InferType } from "yup";

const accountTypes = ["income", "expense"] as const;

export const createAccountRequestDtoSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  type: Yup.string()
    .oneOf([...accountTypes], "Invalid account type")
    .required(),
}).noUnknown();

export type CreateAccountRequestDto = InferType<
  typeof createAccountRequestDtoSchema
>;

export async function parseCreateAccountRequestDto(
  body: unknown,
): Promise<CreateAccountRequestDto> {
  return createAccountRequestDtoSchema.validate(body, {
    abortEarly: false,
    stripUnknown: true,
  });
}
