import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import type { GetLast6MonthsIncomeResponseDto } from "../dtos/last-6-months-income-response-dto";

type MonthlyIncomeRow = {
  month: Date | string;
  amount: string;
};

function formatMonth(value: Date | string) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 7);
  }
  return value.slice(0, 7);
}

export async function getLast6MonthsIncomeForUser(
  userId: bigint,
): Promise<GetLast6MonthsIncomeResponseDto> {
  const prisma = getPrismaConnection();

  const rows = await prisma.$queryRaw<MonthlyIncomeRow[]>`
    WITH months AS (
      SELECT generate_series(
        (date_trunc('month', CURRENT_DATE) - INTERVAL '5 months')::date,
        date_trunc('month', CURRENT_DATE)::date,
        INTERVAL '1 month'
      )::date AS month
    ), income_totals AS (
      SELECT
        date_trunc('month', transactions.created_at)::date AS month,
        SUM(transactions.amount) AS amount
      FROM transactions
      INNER JOIN accounts
        ON accounts.user_id = transactions.user_id
        AND accounts.sn = transactions.account_sn
        AND accounts.type = 'income'
      WHERE transactions.user_id = ${userId}
        AND transactions.created_at >= (date_trunc('month', CURRENT_DATE) - INTERVAL '5 months')::date
        AND transactions.created_at < (date_trunc('month', CURRENT_DATE) + INTERVAL '1 month')::date
      GROUP BY date_trunc('month', transactions.created_at)
    )
    SELECT
      months.month AS month,
      COALESCE(income_totals.amount, 0)::text AS amount
    FROM months
    LEFT JOIN income_totals ON income_totals.month = months.month
    ORDER BY months.month ASC;
  `;

  return {
    income: rows.map((row) => ({
      month: formatMonth(row.month),
      amount: Number(row.amount).toFixed(2),
    })),
  };
}
