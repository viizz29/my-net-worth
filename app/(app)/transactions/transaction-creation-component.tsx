"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import TransactionDetailsInputModal from "./transaction-input-modal";
import { useState } from "react";
import { Button } from "@mui/material";
import { createTransaction, TransactionInputObject } from "@/app/api-calls/transaction-apis";

export default function TransactionCreationComponent() {

  const [noteInputModalOpen, setNoteInputModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const createDataNodeMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-list"] });
    },
  });


  const handleNoteCreation = (data: TransactionInputObject) => {
    createDataNodeMutation.mutate(data);
    setNoteInputModalOpen(false);
  };



  return (
    <div>
      <Button onClick={() => setNoteInputModalOpen(true)}>Create New Transaction</Button>

      <TransactionDetailsInputModal open={noteInputModalOpen} onClose={() => setNoteInputModalOpen(false)} onSubmit={handleNoteCreation} title={"Create New Transaction"} />
    </div>
  );

}