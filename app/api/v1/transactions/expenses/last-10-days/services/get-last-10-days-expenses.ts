import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import type { GetLast10DaysExpensesResponseDto } from "../dtos/last-10-days-expenses-response-dto";

type DailyExpenseRow = {
  date: Date | string;
  amount: string;
};

function formatDate(value: Date | string) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value.slice(0, 10);
}

export async function getLast10DaysExpensesForUser(
  userId: bigint,
): Promise<GetLast10DaysExpensesResponseDto> {
  const prisma = getPrismaConnection();

  const rows = await prisma.$queryRaw<DailyExpenseRow[]>`
    WITH days AS (
      SELECT generate_series(
        (CURRENT_DATE - INTERVAL '9 days')::date,
        CURRENT_DATE::date,
        INTERVAL '1 day'
      )::date AS day
    ), expense_totals AS (
      SELECT
        transactions.created_at::date AS day,
        SUM(transactions.amount) AS amount
      FROM transactions
      INNER JOIN accounts
        ON accounts.user_id = transactions.user_id
        AND accounts.sn = transactions.account_sn
        AND accounts.type = 'expense'
      WHERE transactions.user_id = ${userId}
        AND transactions.created_at >= (CURRENT_DATE - INTERVAL '9 days')::date
        AND transactions.created_at < (CURRENT_DATE + INTERVAL '1 day')::date
      GROUP BY transactions.created_at::date
    )
    SELECT
      days.day AS date,
      COALESCE(expense_totals.amount, 0)::text AS amount
    FROM days
    LEFT JOIN expense_totals ON expense_totals.day = days.day
    ORDER BY days.day ASC;
  `;

  return {
    expenses: rows.map((row) => ({
      date: formatDate(row.date),
      amount: Number(row.amount).toFixed(2),
    })),
  };
}
