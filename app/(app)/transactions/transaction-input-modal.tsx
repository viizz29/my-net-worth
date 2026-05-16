
import { getAccountList } from "@/app/api-calls/account-apis";
import { TransactionInputObject } from "@/app/api-calls/transaction-apis";
import DynamicForm from "@/app/components/forms/dynamic-form";
import GenericModal from "@/app/components/modals/generic-modal";
import { useQuery } from "@tanstack/react-query";
import * as Yup from 'yup';


interface TransactionDetailsInputModalProps {
  open: boolean;
  onSubmit: (data: TransactionInputObject) => void;
  onClose: () => void;
  title: string;
}


export default function TransactionDetailsInputModal({ open, onClose, title, onSubmit }: TransactionDetailsInputModalProps) {
  const { data: accountList } = useQuery({
    queryKey: ["account-list"],
    queryFn: getAccountList,
    enabled: open,
  });
  const accounts = (accountList ?? []).map((item) => ({ label: item.name, value: item.id }));


  const fields = [{
    name: 'account', type: 'select', options: accounts
  }, 'amount', 'comment'];

  const validations = {
    amount: Yup.number().required('Amount is required'),
    comment: Yup.string().required('Comment is required'),
  };


  return (

    <GenericModal
      open={open}
      onClose={onClose}
      onCancel={onClose}
      title={title}
    >
      <DynamicForm
        fields={fields}
        validationSchema={validations}
        onSubmit={(values) => onSubmit({
          accountId: values.account,
          amount: Number(values.amount),
          comment: values.comment,
        })}
      />
    </GenericModal>

  );
}
