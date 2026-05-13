"use client"

import { AccountObject333, deleteAccount, getAccountList, NewAccountInfo, updateAccount } from "@/app/api-calls/account-apis";
import { Box, Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import AccountDeletionModal from "./account-deletion-confirmation-modal";
import { useState } from "react";
import AccountEditingModal from "./note-editing-modal";


export default function AccountListComponent() {

  const [accountToDelete, setAccountToDelete] = useState<AccountObject333 | null>(null);
  const [accountToEdit, setAccountToEdit] = useState<AccountObject333 | null>(null);

  const queryClient = useQueryClient();

  const { data: accountList } = useQuery({
    queryKey: ["account-list"],
    queryFn: getAccountList,
  });


  const deleteAccountMutation = useMutation({
    mutationFn: (account: AccountObject333) => deleteAccount(account.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-list"] });
    },
  });


  const updateAccountDetailsMutation = useMutation({
    mutationFn: (data: { id: string, newData: NewAccountInfo }) => updateAccount(data.id, data.newData),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["account-list"] });
    },
  });


  const handleAccountDeletionStep2 = (account: AccountObject333) => {
    deleteAccountMutation.mutate(account);
    setAccountToDelete(null);
  };



  const handleAccountEditingStep2 = (account: AccountObject333, newData: NewAccountInfo) => {
    updateAccountDetailsMutation.mutate({ id: account.id, newData });
    setAccountToEdit(null);
  };

  const fields = ["id", "name", "type"]

  return (
    <Box>
      {accountList && accountList.length > 0 && <div><h2 className="mb-4 text-2xl font-bold">Account List</h2>
        <TableContainer component={Paper} elevation={1}>
          <Table size="small">
            {/* Header */}
            <TableHead>
              <TableRow>

                <TableCell
                  key={"SN"}
                  sx={{ fontWeight: 600 }}
                >
                  SN
                </TableCell>

                {fields.map((field) => (
                  <TableCell
                    key={String(field)}
                    sx={{ fontWeight: 600 }}
                  >
                    {String(field)}
                  </TableCell>
                ))}

                <TableCell
                  key={"Actions"}
                  sx={{ fontWeight: 600 }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Body */}
            <TableBody>
              {accountList.length > 0 ? (
                accountList.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    hover
                  >
                    <TableCell key={"Sn"}>
                      {rowIndex + 1}
                    </TableCell>

                    {fields.map((field) => (
                      <TableCell key={String(field)}>
                        {String(row[field])}
                      </TableCell>
                    ))}

                    <TableCell key={"Actions"}>
                      <Button onClick={() => setAccountToDelete(row)}>Delete</Button>
                      <Button onClick={() => setAccountToEdit(row)}>Edit</Button>
                    </TableCell>
                  </TableRow>


                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={fields.length} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No data available
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>}


      <AccountDeletionModal account={accountToDelete} onCancel={() => setAccountToDelete(null)} onSubmit={handleAccountDeletionStep2} />
      <AccountEditingModal account={accountToEdit} onClose={() => setAccountToEdit(null)} onSubmit={handleAccountEditingStep2} title={"Edit Account"} />
    </Box>
  );

}