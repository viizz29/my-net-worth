import { AccountObject333 } from "@/app/api-calls/account-apis";
import DynamicForm from "@/app/components/forms/dynamic-form";
import GenericModal from "@/app/components/modals/generic-modal";
import * as Yup from 'yup';


interface AccountDetailsInputModalProps {
  open: boolean;
  onSubmit: (data: AccountObject333) => void;
  onClose: () => void;
  title: string;
}


export default function AccountDetailsInputModal({ open, onClose, title, onSubmit }: AccountDetailsInputModalProps) {
  const fields = ['name', 'description', 'type'];

  const validations = {
    name: Yup.string().required('Account name is required'),
    description: Yup.string().required('Account description is required'),
    type: Yup.string().required('Account type is required'),
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
          name: values.name,
          description: values.description,
          type: values.type
        })}
      />
    </GenericModal>

  );
}
