import { Box } from "@mui/material";
import TransactionCreationComponent from "./transaction-creation-component";
import TransactionListComponent from "./transaction-list-component";

export default function TransactionsPage() {
  return (
    <Box>
      <h2 className="mb-4 text-2xl font-bold">Transactions</h2>
      <TransactionCreationComponent />
      <TransactionListComponent />
    </Box>
  );
}
