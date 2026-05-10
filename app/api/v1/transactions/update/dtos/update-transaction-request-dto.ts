import * as Yup from "yup";
import type { InferType } from "yup";

export const updateTransactionRequestDtoSchema = Yup.object({
  amount: Yup.number().required().moreThan(0),
}).noUnknown();

export type UpdateTransactionRequestDto = InferType<
  typeof updateTransactionRequestDtoSchema
>;

export async function parseUpdateTransactionRequestDto(
  body: unknown,
): Promise<UpdateTransactionRequestDto> {
  return updateTransactionRequestDtoSchema.validate(body, {
    abortEarly: false,
    stripUnknown: true,
  });
}
