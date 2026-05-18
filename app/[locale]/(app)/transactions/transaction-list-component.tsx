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


export default function TransactionListComponent() {

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
    onSuccess: () => {
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
  const transactions = transactionList ?? [];
  const hasTransactions = transactions.length > 0;

  const tableCellSx = {
    borderColor: "var(--color-border)",
    color: "var(--color-foreground)",
  };

  return (
    <Box sx={{ color: "var(--color-foreground)" }}>
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-foreground">Transaction List</h3>
          <p className="text-sm text-muted-foreground">
            {hasTransactions ? `${transactions.length} transaction${transactions.length === 1 ? "" : "s"} recorded.` : "No transactions yet."}
          </p>
        </div>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            overflow: "hidden",
            borderRadius: "1rem",
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-background)",
            color: "var(--color-foreground)",
            backgroundImage: "none",
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "color-mix(in srgb, var(--color-muted) 70%, transparent)" }}>

                <TableCell
                  key={"SN"}
                  sx={{ ...tableCellSx, fontWeight: 600 }}
                >
                  SN
                </TableCell>

                {fields.map((field) => (
                  <TableCell
                    key={String(field)}
                    sx={{ ...tableCellSx, fontWeight: 600, textTransform: "capitalize" }}
                  >
                    {String(field)}
                  </TableCell>
                ))}

                <TableCell
                  key={"Actions"}
                  sx={{ ...tableCellSx, fontWeight: 600 }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {hasTransactions ? (
                transactions.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    hover
                    sx={{
                      "&:last-child td": { borderBottom: "none" },
                      "&.MuiTableRow-hover:hover": {
                        backgroundColor: "color-mix(in srgb, var(--color-muted) 55%, transparent)",
                      },
                    }}
                  >
                    <TableCell key={"Sn"} sx={tableCellSx}>
                      {rowIndex + 1}
                    </TableCell>

                    {fields.map((field) => (
                      <TableCell key={String(field)} sx={tableCellSx}>
                        {String(row[field])}
                      </TableCell>
                    ))}

                    <TableCell key={"Actions"} sx={tableCellSx}>
                      <Button
                        onClick={() => setTransactionToDelete(row)}
                        color="error"
                        sx={{ textTransform: "none" }}
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => setTransactionToEdit(row)}
                        sx={{ color: "var(--color-primary)", textTransform: "none" }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={fields.length + 2} align="center" sx={tableCellSx}>
                    <Typography variant="body2" sx={{ color: "var(--color-muted-foreground)" }}>
                      No transactions available yet.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>


      <TransactionDeletionModal transaction={transactionToDelete} onCancel={() => setTransactionToDelete(null)} onSubmit={handleAccountDeletionStep2} />
      <TransactionEditingModal transaction={transactionToEdit} onClose={() => setTransactionToEdit(null)} onSubmit={handleAccountEditingStep2} title={"Edit Transaction"} />
    </Box>
  );

}
