import { getPrismaConnection } from "@/app/db/prisma/prisma-connection";
import type { GetNetWorthResponseDto } from "../dtos/net-worth-response-dto";

type NetWorthRow = {
  totalIncome: string;
  totalExpenses: string;
};

export async function getNetWorthForUser(
  userId: bigint,
): Promise<GetNetWorthResponseDto> {
  const prisma = getPrismaConnection();

  const rows = await prisma.$queryRaw<NetWorthRow[]>`
    SELECT
      COALESCE(SUM(CASE WHEN accounts.type = 'income' THEN transactions.amount ELSE 0 END), 0)::text AS "totalIncome",
      COALESCE(SUM(CASE WHEN accounts.type = 'expense' THEN transactions.amount ELSE 0 END), 0)::text AS "totalExpenses"
    FROM transactions
    INNER JOIN accounts
      ON accounts.user_id = transactions.user_id
      AND accounts.sn = transactions.account_sn
    WHERE transactions.user_id = ${userId};
  `;

  const row = rows[0];
  const totalIncome = Number(row.totalIncome);
  const totalExpenses = Number(row.totalExpenses);
  const netWorth = totalIncome - totalExpenses;

  return {
    netWorth: netWorth.toFixed(2),
    totalIncome: totalIncome.toFixed(2),
    totalExpenses: totalExpenses.toFixed(2),
  };
}
