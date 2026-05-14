"use client"

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

import { useState } from "react";
import { deleteTransaction, getTransactionList, Transaction333, TransactionInputObject, updateTransaction } from "@/app/api-calls/transaction-apis";
import TransactionDeletionModal from "./transaction-deletion-confirmation-modal";
import TransactionEditingModal from "./transaction-editing-modal";


export default function AccountListComponent() {

  const [transactionToDelete, setTransactionToDelete] = useState<Transaction333 | null>(null);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction333 | null>(null);

  const queryClient = useQueryClient();

  const { data: transactionList } = useQuery({
    queryKey: ["transaction-list"],
    queryFn: getTransactionList,
  });


  const deleteTransactionMutation = useMutation({
    mutationFn: (account: Transaction333) => deleteTransaction(account.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction-list"] });
    },
  });


  const updateTransactionDetailsMutation = useMutation({
    mutationFn: (data: { id: string, newData: TransactionInputObject }) => updateTransaction(data.id, data.newData),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["transaction-list"] });
    },
  });


  const handleAccountDeletionStep2 = (account: Transaction333) => {
    deleteTransactionMutation.mutate(account);
    setTransactionToDelete(null);
  };



  const handleAccountEditingStep2 = (account: Transaction333, newData: TransactionInputObject) => {
    updateTransactionDetailsMutation.mutate({ id: account.id, newData });
    setTransactionToEdit(null);
  };

  const fields = ["id", "accountId", "amount", "comment"]

  return (
    <Box>
      {transactionList && transactionList.length > 0 && <div><h2 className="mb-4 text-2xl font-bold">Account List</h2>
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
              {transactionList.length > 0 ? (
                transactionList.map((row, rowIndex) => (
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
                      <Button onClick={() => setTransactionToDelete(row)}>Delete</Button>
                      <Button onClick={() => setTransactionToEdit(row)}>Edit</Button>
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


      <TransactionDeletionModal transaction={transactionToDelete} onCancel={() => setTransactionToDelete(null)} onSubmit={handleAccountDeletionStep2} />
      <TransactionEditingModal transaction={transactionToEdit} onClose={() => setTransactionToEdit(null)} onSubmit={handleAccountEditingStep2} title={"Edit Transaction"} />
    </Box>
  );

}