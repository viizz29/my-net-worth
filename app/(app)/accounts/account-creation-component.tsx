"use client"

import { AccountObject333, createAccount } from "@/app/api-calls/account-apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AccountDetailsInputModal from "./account-details-input-modal";
import { useState } from "react";
import { Button } from "@mui/material";

export default function AccountCreationComponent() {

  const [noteInputModalOpen, setNoteInputModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const createDataNodeMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-list"] });
    },
  });


  const handleNoteCreation = (data: AccountObject333) => {
    createDataNodeMutation.mutate(data);
    setNoteInputModalOpen(false);
  };



  return (
    <div>
      <Button onClick={() => setNoteInputModalOpen(true)}>Create New Account</Button>

      <AccountDetailsInputModal open={noteInputModalOpen} onClose={() => setNoteInputModalOpen(false)} onSubmit={handleNoteCreation} title={"Create New Account"} />
    </div>
  );

}