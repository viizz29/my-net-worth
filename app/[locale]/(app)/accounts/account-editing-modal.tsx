import { AccountObject333, NewAccountInfo } from "@/app/api-calls/account-apis";
import { useTranslations } from "next-intl";
import DynamicForm from "@/app/components/forms/dynamic-form";
import GenericModal from "@/app/components/modals/generic-modal";
import * as Yup from "yup";

interface AccountEditingModalProps {
  account: AccountObject333 | null;
  onSubmit: (account: AccountObject333, newData: NewAccountInfo) => void;
  onClose: () => void;
  title: string;
}

export default function AccountEditingModal({
  account,
  onClose,
  title,
  onSubmit,
}: AccountEditingModalProps) {
  const t = useTranslations("accountsPage");
  const fields = [
    { name: "name", label: t("field.name"), type: "textfield" as const },
    {
      name: "description",
      label: t("field.description"),
      type: "textfield" as const,
    },
    { name: "type", label: t("field.type"), type: "textfield" as const },
  ];

  const validations = {
    name: Yup.string().required(t("validation.nameRequired")),
    description: Yup.string().required(t("validation.descriptionRequired")),
    type: Yup.string().required(t("validation.typeRequired")),
  };

  return (
    <GenericModal
      open={account !== null}
      onClose={onClose}
      onCancel={onClose}
      cancelLabel={t("cancel")}
      title={title}
    >
      {account && (
        <DynamicForm
          fields={fields}
          initialValues={{
            name: account?.name,
            description: account?.description,
            type: account?.type,
          }}
          validationSchema={validations}
          submitLabel={t("submit")}
          onSubmit={(values) =>
            onSubmit(account, {
              name: values.name,
              description: values.description,
              type: values.type,
            })
          }
        />
      )}
    </GenericModal>
  );
}
