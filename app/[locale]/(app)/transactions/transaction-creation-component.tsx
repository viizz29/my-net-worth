"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import TransactionDetailsInputModal from "./transaction-input-modal";
import { useState } from "react";
import { Button } from "@mui/material";
import { createTransaction, TransactionInputObject } from "@/app/api-calls/transaction-apis";

export default function TransactionCreationComponent() {

  const [transactionInputModalOpen, setTransactionInputModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const createTransactionMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction-list"] });
    },
  });


  const handleTransactionCreation = (data: TransactionInputObject) => {
    createTransactionMutation.mutate(data);
    setTransactionInputModalOpen(false);
  };



  return (
    <div className="flex justify-end">
      <Button
        variant="contained"
        onClick={() => setTransactionInputModalOpen(true)}
        sx={{
          borderRadius: "0.75rem",
          px: 2,
          py: 1,
          backgroundColor: "var(--color-primary)",
          color: "var(--color-primary-foreground)",
          boxShadow: "none",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "var(--color-primary)",
            filter: "brightness(0.95)",
            boxShadow: "none",
          },
        }}
      >
        Create New Transaction
      </Button>

      <TransactionDetailsInputModal open={transactionInputModalOpen} onClose={() => setTransactionInputModalOpen(false)} onSubmit={handleTransactionCreation} title={"Create New Transaction"} />
    </div>
  );

}
