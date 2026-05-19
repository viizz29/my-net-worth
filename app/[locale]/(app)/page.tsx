import Header from "@/app/components/Header";
import { getTranslations } from "next-intl/server";

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
        <div>
          <h2 className="mb-4 text-2xl font-bold">{t("name")}</h2>
        </div>
      </main>
    </>
  );
}
