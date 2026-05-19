import Header from "@/app/components/Header";
import AccountCreationComponent from "./account-creation-component";
import AccountListComponent from "./account-list-component";

export default async function AccountsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Header locale={locale} contentKey="accounts" />
      <main className="flex-1 bg-background p-6 text-foreground transition-colors duration-300">
        <section className="space-y-6 text-foreground">
          <AccountCreationComponent />
          <AccountListComponent />
        </section>
      </main>
    </>
  );
}
