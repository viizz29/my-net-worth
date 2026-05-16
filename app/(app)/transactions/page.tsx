import TransactionCreationComponent from "./transaction-creation-component";
import TransactionListComponent from "./transaction-list-component";

export default function TransactionsPage() {
  return (
    <section className="space-y-6 text-foreground">
      <TransactionCreationComponent />
      <TransactionListComponent />
    </section>
  );
}
