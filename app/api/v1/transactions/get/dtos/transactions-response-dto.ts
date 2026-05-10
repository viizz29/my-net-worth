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
