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
    <div>
      <Button onClick={() => setTransactionInputModalOpen(true)}>Create New Transaction</Button>

      <TransactionDetailsInputModal open={transactionInputModalOpen} onClose={() => setTransactionInputModalOpen(false)} onSubmit={handleTransactionCreation} title={"Create New Transaction"} />
    </div>
  );

}