"use client";

import { useQuery } from "@tanstack/react-query";
import { getNetWorth } from "@/app/api-calls/transaction-apis";
import { useTranslations } from "next-intl";

function formatCurrency(value: string) {
  const num = Number(value);
  return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function NetWorthCard() {
  const t = useTranslations("homePage");

  const { data: netWorth, isPending } = useQuery({
    queryKey: ["net-worth"],
    queryFn: getNetWorth,
  });

  if (isPending) {
    return (
      <div className="rounded-2xl border border-border bg-background p-6">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-8 w-48 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  const worth = Number(netWorth?.netWorth ?? 0);

  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <h3 className="mb-1 text-xl font-semibold text-foreground">
        {t("netWorth")}
      </h3>
      <p className="text-sm text-muted-foreground">
        {t("netWorthDesc")}
      </p>
      <p className={`mt-4 text-3xl font-bold ${worth >= 0 ? "text-green-600" : "text-red-600"}`}>
        {formatCurrency(netWorth?.netWorth ?? "0.00")}
      </p>
      <div className="mt-4 flex gap-6 text-sm">
        <div>
          <p className="text-muted-foreground">{t("totalIncome")}</p>
          <p className="font-semibold text-green-600">
            {formatCurrency(netWorth?.totalIncome ?? "0.00")}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">{t("totalExpenses")}</p>
          <p className="font-semibold text-red-600">
            {formatCurrency(netWorth?.totalExpenses ?? "0.00")}
          </p>
        </div>
      </div>
    </div>
  );
}
