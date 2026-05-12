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

export type GetTransactionsResponseDto = {
  transactions: TransactionListItemDto[];
};

export type CreateTransactionResponseDto = {
  transaction: TransactionListItemDto;
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
  transaction: TransactionDetailsDto;
};

export type UpdateTransactionResponseDto = {
  transaction: TransactionDetailsDto;
};

export type DeleteTransactionResponseDto = {
  transaction: TransactionDetailsDto;
};
