export type TransactionListItemDto = {
  id: string;
  userId: string;
  sn: string;
  accountId: string;
  accountSn: string;
  amount: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export type GetTransactionsResponseDto = unknown[];

export type CreateTransactionResponseDto = {
  transaction: unknown;
};

export type TransactionDetailsDto = {
  id: [bigint, bigint];
  account_id: [bigint, bigint];
  amount: string;
  comment: string;
  created_at: Date;
  updated_at: Date;
};

export type GetTransactionResponseDto = {
  transaction: unknown;
};

export type UpdateTransactionResponseDto = {
  transaction: unknown;
};

export type DeleteTransactionResponseDto = {
  transaction: unknown;
};
