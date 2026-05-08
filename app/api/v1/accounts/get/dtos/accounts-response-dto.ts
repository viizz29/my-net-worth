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

export const toAccountListItemDto = (account: accounts): AccountListItemDto => ({
  userId: account.user_id.toString(),
  sn: account.sn.toString(),
  name: account.name,
  description: account.description,
  type: account.type,
  createdAt: account.created_at.toISOString(),
  updatedAt: account.updated_at.toISOString(),
});

export const toGetAccountsResponseDto = (
  accountsList: accounts[],
): GetAccountsResponseDto => ({
  accounts: accountsList.map(toAccountListItemDto),
});

export const toCreateAccountResponseDto = (
  account: accounts,
): CreateAccountResponseDto => ({
  account: toAccountListItemDto(account),
});
