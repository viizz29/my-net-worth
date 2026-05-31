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
  id: bigint[];
  name: string;
  description: string;
  type: string;
}[];

export type CreateAccountResponseDto = {
  id: bigint[];
  name: string;
};

export type AccountDetailsDto = {
  id: [bigint, bigint];
  name: string;
  description: string;
  type: string;
  created_at: Date;
  updated_at: Date;
};

export type GetAccountResponseDto = {
  account: AccountDetailsDto;
};

export type UpdateAccountResponseDto = {
  account: AccountDetailsDto;
};

export type DeleteAccountResponseDto = {
  account: AccountDetailsDto;
};
