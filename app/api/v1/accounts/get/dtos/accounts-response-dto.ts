import type { accounts } from "@/app/generated/prisma-client";

export type AccountListItemDto = {
  userId: string;
  sn: string;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type GetAccountsResponseDto = {
  accounts: AccountListItemDto[];
};

export type CreateAccountResponseDto = {
  account: AccountListItemDto;
};
