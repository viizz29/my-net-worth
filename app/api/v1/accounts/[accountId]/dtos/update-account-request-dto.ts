import * as Yup from "yup";
import type { InferType } from "yup";

const accountTypes = ["income", "expense"] as const;

export const updateAccountRequestDtoSchema = Yup.object({
  name: Yup.string().optional(),
  description: Yup.string().optional(),
  type: Yup.string()
    .oneOf([...accountTypes], "Invalid account type")
    .optional(),
})
  .noUnknown()
  .test(
    "at-least-one-field",
    "At least one field must be provided",
    (value) =>
      value != null &&
      Object.values(value).some((fieldValue) => fieldValue !== undefined),
  );

export type UpdateAccountRequestDto = InferType<
  typeof updateAccountRequestDtoSchema
>;

export async function parseUpdateAccountRequestDto(
  body: unknown,
): Promise<UpdateAccountRequestDto> {
  return updateAccountRequestDtoSchema.validate(body, {
    abortEarly: false,
    stripUnknown: true,
  });
}
