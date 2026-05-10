"use client"

import { getAccountList } from "@/app/api-calls/account-apis";
import GenericTable from "@/app/misc/generic-table";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";


export default function AccountListComponent() {


  const { data: accountList } = useQuery({
    queryKey: ["account-list"],
    queryFn: getAccountList,
  });

  return (
    <Box>
      {accountList && accountList.length > 0 && <div><h2 className="mb-4 text-2xl font-bold">Account List</h2>
        <GenericTable data={accountList} fields={["id", "name", "description", "type"]} />
      </div>}


    </Box>
  );

}