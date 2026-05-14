import { AccountObject333, NewAccountInfo } from "@/app/api-calls/account-apis";
import DynamicForm from "@/app/components/forms/dynamic-form";
import GenericModal from "@/app/components/modals/generic-modal";
import { useTranslation } from "react-i18next";
import * as Yup from 'yup';


interface AccountEditingModalProps {
  account: AccountObject333 | null;
  onSubmit: (account: AccountObject333, newData: NewAccountInfo) => void;
  onClose: () => void;
  title: string;
}


export default function AccountEditingModal({ account, onClose, title, onSubmit }: AccountEditingModalProps) {
  const { t } = useTranslation();

  const fields = ['name', 'description', 'type'];

  const validations = {
    name: Yup.string().required('Account name is required'),
    description: Yup.string().required('Account description is required'),
    type: Yup.string().required('Account type is required'),
  };

  return (

    <GenericModal
      open={account !== null}
      onClose={onClose}
      onCancel={onClose}
      title={title}
    >

      {account &&
        <DynamicForm
          fields={fields}
          initialValues={{ name: account?.name, description: account?.description, type: account?.type }}
          validationSchema={validations}
          onSubmit={(values) => onSubmit(account, {
            name: values.name,
            description: values.description,
            type: values.type,
          })}
        />}
    </GenericModal>

  );
}