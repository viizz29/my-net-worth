import { NewAccountInfo } from "@/app/api-calls/account-apis";
import { useTranslations } from "next-intl";
import DynamicForm from "@/app/components/forms/dynamic-form";
import GenericModal from "@/app/components/modals/generic-modal";
import * as Yup from "yup";

interface AccountDetailsInputModalProps {
  open: boolean;
  onSubmit: (data: NewAccountInfo) => void;
  onClose: () => void;
  title: string;
}

export default function AccountDetailsInputModal({
  open,
  onClose,
  title,
  onSubmit,
}: AccountDetailsInputModalProps) {
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
      open={open}
      onClose={onClose}
      onCancel={onClose}
      cancelLabel={t("cancel")}
      title={title}
    >
      <DynamicForm
        fields={fields}
        validationSchema={validations}
        submitLabel={t("submit")}
        onSubmit={(values) =>
          onSubmit({
            name: values.name as string,
            description: values.description as string,
            type: values.type as string,
          })
        }
      />
    </GenericModal>
  );
}
