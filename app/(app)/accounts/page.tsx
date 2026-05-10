import { Box } from "@mui/material";
import AccountCreationComponent from "./account-creation-component";
import AccountListComponent from "./account-list-component";

export default function AccountsPage() {



  return (
    <Box>
      <h2 className="mb-4 text-2xl font-bold">Accounts</h2>
      <AccountCreationComponent />
      <AccountListComponent />
    </Box>
  );
}
