



import { AccountObject333 } from "@/app/api-calls/account-apis";
import ConfirmModal from "@/app/components/modals/confirmation-modal";
import { useTranslation } from "react-i18next";



interface AccountDeletionModalProps {
  account: AccountObject333 | null;
  onSubmit: (dataNode: AccountObject333) => void;
  onCancel: () => void;
}


export default function AccountDeletionModal({ account, onCancel, onSubmit }: AccountDeletionModalProps) {
  const { t } = useTranslation();

  return (

    account &&
    <ConfirmModal open={account !== null} message={`Are you sure you want to delete this account '${account.name}'`} onConfirm={() => onSubmit(account)} onCancel={onCancel} />

  );
}