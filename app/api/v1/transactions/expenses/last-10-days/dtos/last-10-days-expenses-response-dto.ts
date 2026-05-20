export type DailyExpenseDto = {
  date: string;
  amount: string;
};

export type GetLast10DaysExpensesResponseDto = {
  expenses: DailyExpenseDto[];
};
