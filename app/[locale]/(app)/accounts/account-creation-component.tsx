"use client";

import { AccountObject333, createAccount } from "@/app/api-calls/account-apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import AccountDetailsInputModal from "./account-details-input-modal";
import { useState } from "react";
import { Button } from "@mui/material";

export default function AccountCreationComponent() {
  const t = useTranslations("accountsPage");

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
    <div className="flex justify-end">
      <Button
        variant="contained"
        onClick={() => setNoteInputModalOpen(true)}
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
        {t("createNewAccount")}
      </Button>

      <AccountDetailsInputModal
        open={noteInputModalOpen}
        onClose={() => setNoteInputModalOpen(false)}
        onSubmit={handleNoteCreation}
        title={t("createNewAccount")}
      />
    </div>
  );
}
