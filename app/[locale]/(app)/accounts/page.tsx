import AccountCreationComponent from "./account-creation-component";
import AccountListComponent from "./account-list-component";

export default function AccountsPage() {
  return (
    <section className="space-y-6 text-foreground">
      <AccountCreationComponent />
      <AccountListComponent />
    </section>
  );
}
