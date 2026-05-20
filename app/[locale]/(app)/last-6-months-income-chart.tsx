"use client";

import { useQuery } from "@tanstack/react-query";
import { getLast6MonthsIncome } from "@/app/api-calls/transaction-apis";
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

export default function Last6MonthsIncomeChart() {
  const t = useTranslations("homePage");

  const { data: income } = useQuery({
    queryKey: ["last-6-months-income"],
    queryFn: getLast6MonthsIncome,
  });

  const chartData = (income ?? []).map((entry) => ({
    month: dayjs(entry.month).format("MMM"),
    amount: Number(entry.amount),
  }));

  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <h3 className="mb-1 text-xl font-semibold text-foreground">
        {t("last6MonthsIncome")}
      </h3>
      <p className="mb-6 text-sm text-muted-foreground">
        {t("last6MonthsIncomeDesc")}
      </p>

      {chartData.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {t("noIncomeData")}
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 8, left: -16 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--color-border)" }}
              tickLine={false}
              interval={0}
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
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
