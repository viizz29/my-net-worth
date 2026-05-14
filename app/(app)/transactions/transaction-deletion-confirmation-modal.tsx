



import { Transaction333 } from "@/app/api-calls/transaction-apis";
import ConfirmModal from "@/app/components/modals/confirmation-modal";
import { useTranslation } from "react-i18next";



interface TransactionDeletionModalProps {
  transaction: Transaction333 | null;
  onSubmit: (dataNode: Transaction333) => void;
  onCancel: () => void;
}


export default function TransactionDeletionModal({ transaction, onCancel, onSubmit }: TransactionDeletionModalProps) {
  const { t } = useTranslation();

  return (
    transaction &&
    <ConfirmModal open={transaction !== null} message={`Are you sure you want to delete this transaction '${transaction.comment}'`} onConfirm={() => onSubmit(transaction)} onCancel={onCancel} />
  );
}