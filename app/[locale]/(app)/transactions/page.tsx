import Header from "@/app/components/Header";
import TransactionCreationComponent from "./transaction-creation-component";
import TransactionListComponent from "./transaction-list-component";

export default async function TransactionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Header locale={locale} contentKey="transactions" />
      <main className="flex-1 bg-background p-6 text-foreground transition-colors duration-300">
        <section className="space-y-6 text-foreground">
          <TransactionCreationComponent />
          <TransactionListComponent />
        </section>
      </main>
    </>
  );
}
