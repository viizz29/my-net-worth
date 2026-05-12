"use client"

import { getTransactionList } from "@/app/api-calls/transaction-apis";
import GenericTable from "@/app/misc/generic-table";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";


export default function TransactionListComponent() {


  const { data: accountList } = useQuery({
    queryKey: ["transaction-list"],
    queryFn: getTransactionList,
  });

  return (
    <Box>
      {accountList && accountList.length > 0 && <div><h2 className="mb-4 text-2xl font-bold">Account List</h2>
        <GenericTable data={accountList} fields={["id", "amount", "comment"]} />
      </div>}
    </Box>
  );

}