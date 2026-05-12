import { ApiError } from "@/app/api/_lib/api-error";
import * as Yup from "yup";
import type { InferType } from "yup";

const createTransactionRequestDtoSchema = Yup.object({
  account_id: Yup.array()
    .of(Yup.number().integer().required())
    .length(2, "Invalid account id")
    .required("accountId is a required field"),
  amount: Yup.number().required().moreThan(0),
  comment: Yup.string().required(),
}).noUnknown();

type CreateTransactionRequestSchemaDto = InferType<
  typeof createTransactionRequestDtoSchema
>;

export interface CreateTransactionRequestDto {
  account_sn: bigint;
  amount: number;
  comment: string;
}

export async function parseCreateTransactionRequestDto(
  body: unknown,
  userId: bigint,
): Promise<CreateTransactionRequestDto> {
  console.log("Parsing create transaction request DTO with body:", body);
  const parsed = await createTransactionRequestDtoSchema.validate(body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const [accountUserId, accountSn] =
    parsed.account_id as CreateTransactionRequestSchemaDto["account_id"];

  if (BigInt(accountUserId) !== userId) {
    throw new ApiError(
      "Account does not belong to the authenticated user",
      400,
    );
  }

  return {
    account_sn: BigInt(accountSn),
    amount: parsed.amount,
    comment: parsed.comment,
  };
}
