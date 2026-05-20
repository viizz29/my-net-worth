export type MonthlyIncomeDto = {
  month: string;
  amount: string;
};

export type GetLast6MonthsIncomeResponseDto = {
  income: MonthlyIncomeDto[];
};
