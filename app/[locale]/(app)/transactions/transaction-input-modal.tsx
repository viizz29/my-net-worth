import { getAccountList } from "@/app/api-calls/account-apis";
import { TransactionInputObject } from "@/app/api-calls/transaction-apis";
import { useTranslations } from "next-intl";
import DynamicForm from "@/app/components/forms/dynamic-form";
import GenericModal from "@/app/components/modals/generic-modal";
import { useQuery } from "@tanstack/react-query";
import * as Yup from "yup";

interface TransactionDetailsInputModalProps {
  open: boolean;
  onSubmit: (data: TransactionInputObject) => void;
  onClose: () => void;
  title: string;
}

export default function TransactionDetailsInputModal({
  open,
  onClose,
  title,
  onSubmit,
}: TransactionDetailsInputModalProps) {
  const t = useTranslations("transactionsPage");
  const { data: accountList } = useQuery({
    queryKey: ["account-list"],
    queryFn: getAccountList,
    enabled: open,
  });
  const accounts = (accountList ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const fields = [
    {
      name: "account",
      type: "select",
      options: accounts,
      label: t("field.account"),
    },
    { name: "amount", label: t("field.amount") },
    { name: "comment", label: t("field.comment") },
  ];

  const validations = {
    amount: Yup.number().required(t("validation.amountRequired")),
    comment: Yup.string().required(t("validation.commentRequired")),
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
            accountId: values.account,
            amount: Number(values.amount),
            comment: values.comment,
          })
        }
      />
    </GenericModal>
  );
}
