import { getTranslations } from "next-intl/server";

export default async function TransactionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">{t("name")}</h2>
    </div>
  );
}
