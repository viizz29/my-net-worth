"use client";

import {
  AccountObject333,
  deleteAccount,
  getAccountList,
  NewAccountInfo,
  updateAccount,
} from "@/app/api-calls/account-apis";
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
import { useTranslations } from "next-intl";
import AccountDeletionModal from "./account-deletion-confirmation-modal";
import { useState } from "react";
import AccountEditingModal from "./account-editing-modal";

export default function AccountListComponent() {
  const t = useTranslations("accountsPage");

  const [accountToDelete, setAccountToDelete] =
    useState<AccountObject333 | null>(null);
  const [accountToEdit, setAccountToEdit] = useState<AccountObject333 | null>(
    null,
  );

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
    mutationFn: (data: { id: string; newData: NewAccountInfo }) =>
      updateAccount(data.id, data.newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-list"] });
    },
  });

  const handleAccountDeletionStep2 = (account: AccountObject333) => {
    deleteAccountMutation.mutate(account);
    setAccountToDelete(null);
  };

  const handleAccountEditingStep2 = (
    account: AccountObject333,
    newData: NewAccountInfo,
  ) => {
    updateAccountDetailsMutation.mutate({ id: account.id, newData });
    setAccountToEdit(null);
  };

  const fields: Array<{ key: keyof AccountObject333; label: string }> = [
    { key: "id", label: t("field.id") },
    { key: "name", label: t("field.name") },
    { key: "type", label: t("field.type") },
  ];
  const accounts = accountList ?? [];
  const hasAccounts = accounts.length > 0;

  const tableCellSx = {
    borderColor: "var(--color-border)",
    color: "var(--color-foreground)",
  };

  return (
    <Box sx={{ color: "var(--color-foreground)" }}>
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-foreground">
            {t("accountList")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {hasAccounts
              ? t("accountsAvailable", { count: accounts.length })
              : t("noAccountsYet")}
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
              <TableRow
                sx={{
                  backgroundColor:
                    "color-mix(in srgb, var(--color-muted) 70%, transparent)",
                }}
              >
                <TableCell key={"SN"} sx={{ ...tableCellSx, fontWeight: 600 }}>
                  {t("serialNumber")}
                </TableCell>

                {fields.map((field) => (
                  <TableCell
                    key={String(field.key)}
                    sx={{ ...tableCellSx, fontWeight: 600 }}
                  >
                    {field.label}
                  </TableCell>
                ))}

                <TableCell
                  key={"Actions"}
                  sx={{ ...tableCellSx, fontWeight: 600 }}
                >
                  {t("actions")}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {hasAccounts ? (
                accounts.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    hover
                    sx={{
                      "&:last-child td": { borderBottom: "none" },
                      "&.MuiTableRow-hover:hover": {
                        backgroundColor:
                          "color-mix(in srgb, var(--color-muted) 55%, transparent)",
                      },
                    }}
                  >
                    <TableCell key={"Sn"} sx={tableCellSx}>
                      {rowIndex + 1}
                    </TableCell>

                    {fields.map((field) => (
                      <TableCell key={String(field.key)} sx={tableCellSx}>
                        {String(row[field.key])}
                      </TableCell>
                    ))}

                    <TableCell key={"Actions"} sx={tableCellSx}>
                      <Button
                        onClick={() => setAccountToDelete(row)}
                        color="error"
                        sx={{ textTransform: "none" }}
                      >
                        {t("delete")}
                      </Button>
                      <Button
                        onClick={() => setAccountToEdit(row)}
                        sx={{
                          color: "var(--color-primary)",
                          textTransform: "none",
                        }}
                      >
                        {t("edit")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={fields.length + 2}
                    align="center"
                    sx={tableCellSx}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--color-muted-foreground)" }}
                    >
                      {t("noAccountsAvailableYet")}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <AccountDeletionModal
        account={accountToDelete}
        onCancel={() => setAccountToDelete(null)}
        onSubmit={handleAccountDeletionStep2}
      />
      <AccountEditingModal
        account={accountToEdit}
        onClose={() => setAccountToEdit(null)}
        onSubmit={handleAccountEditingStep2}
        title={t("editAccount")}
      />
    </Box>
  );
}
