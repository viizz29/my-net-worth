import Header from "@/app/components/Header";
import { getTranslations } from "next-intl/server";
import Last10DaysExpenseChart from "./last-10-days-expense-chart";
import Last6MonthsIncomeChart from "./last-6-months-income-chart";
import NetWorthCard from "./net-worth-card";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "homePage" });

  return (
    <>
      <Header locale={locale} contentKey="dashboard" />
      <main className="flex-1 bg-background p-6 text-foreground transition-colors duration-300">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{t("name")}</h2>
        </div>
        <div className="mb-6">
          <NetWorthCard />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Last10DaysExpenseChart />
          <Last6MonthsIncomeChart />
        </div>
      </main>
    </>
  );
}
