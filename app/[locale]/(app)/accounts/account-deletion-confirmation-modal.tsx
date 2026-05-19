import { AccountObject333 } from "@/app/api-calls/account-apis";
import { useTranslations } from "next-intl";
import ConfirmModal from "@/app/components/modals/confirmation-modal";

interface AccountDeletionModalProps {
  account: AccountObject333 | null;
  onSubmit: (dataNode: AccountObject333) => void;
  onCancel: () => void;
}

export default function AccountDeletionModal({
  account,
  onCancel,
  onSubmit,
}: AccountDeletionModalProps) {
  const t = useTranslations("accountsPage");

  return (
    account && (
      <ConfirmModal
        open={account !== null}
        title={t("deleteConfirmationTitle")}
        message={t("deleteConfirmationMessage", { name: account.name })}
        onConfirm={() => onSubmit(account)}
        onCancel={onCancel}
        cancelLabel={t("cancel")}
        confirmLabel={t("yes")}
      />
    )
  );
}
