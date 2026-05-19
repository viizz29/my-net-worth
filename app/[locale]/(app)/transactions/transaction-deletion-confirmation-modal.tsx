import { Transaction333 } from "@/app/api-calls/transaction-apis";
import { useTranslations } from "next-intl";
import ConfirmModal from "@/app/components/modals/confirmation-modal";

interface TransactionDeletionModalProps {
  transaction: Transaction333 | null;
  onSubmit: (dataNode: Transaction333) => void;
  onCancel: () => void;
}

export default function TransactionDeletionModal({
  transaction,
  onCancel,
  onSubmit,
}: TransactionDeletionModalProps) {
  const t = useTranslations("transactionsPage");

  return (
    transaction && (
      <ConfirmModal
        open={transaction !== null}
        title={t("deleteConfirmationTitle")}
        message={t("deleteConfirmationMessage", {
          comment: transaction.comment,
        })}
        onConfirm={() => onSubmit(transaction)}
        onCancel={onCancel}
        cancelLabel={t("cancel")}
        confirmLabel={t("yes")}
      />
    )
  );
}
