
import { getAccountList } from "@/app/api-calls/account-apis";
import { Transaction333, TransactionInputObject } from "@/app/api-calls/transaction-apis";
import DynamicForm from "@/app/components/forms/dynamic-form";
import GenericModal from "@/app/components/modals/generic-modal";
import { useQuery } from "@tanstack/react-query";
import * as Yup from 'yup';


interface TransactionEditingModalProps {
  transaction: Transaction333 | null;
  onSubmit: (transaction: Transaction333, newData: TransactionInputObject) => void;
  onClose: () => void;
  title: string;
}


export default function TransactionEditingModal({ transaction, onClose, title, onSubmit }: TransactionEditingModalProps) {
  const { data: accountList } = useQuery({
    queryKey: ["account-list"],
    queryFn: getAccountList,
    enabled: transaction != null,
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
      open={transaction !== null}
      onClose={onClose}
      onCancel={onClose}
      title={title}
    >

      {transaction &&
        <DynamicForm
          fields={fields}
          initialValues={{
            account: transaction?.accountId,
            amount: transaction?.amount,
            comment: transaction?.comment
          }}
          validationSchema={validations}
          onSubmit={(values) => onSubmit(transaction, {
            accountId: values.account,
            amount: Number(values.amount),
            comment: values.comment,
          })}
        />}
    </GenericModal>

  );
}
