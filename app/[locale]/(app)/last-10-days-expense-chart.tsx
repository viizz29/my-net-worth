"use client";

import { useQuery } from "@tanstack/react-query";
import { getLast10DaysExpenses } from "@/app/api-calls/transaction-apis";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";

export default function Last10DaysExpenseChart() {
  const t = useTranslations("homePage");

  const { data: expenses } = useQuery({
    queryKey: ["last-10-days-expenses"],
    queryFn: getLast10DaysExpenses,
  });

  const chartData = (expenses ?? []).map((entry) => ({
    date: dayjs(entry.date).format("D MMM"),
    amount: Number(entry.amount),
  }));

  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <h3 className="mb-1 text-xl font-semibold text-foreground">
        {t("last10Transactions")}
      </h3>
      <p className="mb-6 text-sm text-muted-foreground">
        {t("last10TransactionsDesc")}
      </p>

      {chartData.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {t("noTransactionsYet")}
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 8, left: -16 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--color-border)" }}
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--color-border)" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-background)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.75rem",
                color: "var(--color-foreground)",
                fontSize: "0.875rem",
              }}
              labelStyle={{ fontWeight: 600, marginBottom: 4 }}
            />
            <Bar
              dataKey="amount"
              fill="var(--color-primary)"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
