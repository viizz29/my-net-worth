import { getAccountList } from "@/app/api-calls/account-apis";
import {
  Transaction333,
  TransactionInputObject,
} from "@/app/api-calls/transaction-apis";
import { useTranslations } from "next-intl";
import DynamicForm, { FormField } from "@/app/components/forms/dynamic-form";
import GenericModal from "@/app/components/modals/generic-modal";
import { useQuery } from "@tanstack/react-query";
import * as Yup from "yup";

interface TransactionEditingModalProps {
  transaction: Transaction333 | null;
  onSubmit: (
    transaction: Transaction333,
    newData: TransactionInputObject,
  ) => void;
  onClose: () => void;
  title: string;
}

export default function TransactionEditingModal({
  transaction,
  onClose,
  title,
  onSubmit,
}: TransactionEditingModalProps) {
  const t = useTranslations("transactionsPage");
  const { data: accountList } = useQuery({
    queryKey: ["account-list"],
    queryFn: getAccountList,
    enabled: transaction != null,
  });
  const accounts = (accountList ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const fields: FormField[] = [
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
      open={transaction !== null}
      onClose={onClose}
      onCancel={onClose}
      cancelLabel={t("cancel")}
      title={title}
    >
      {transaction && (
        <DynamicForm
          fields={fields}
          initialValues={{
            account: transaction?.accountId,
            amount: transaction?.amount,
            comment: transaction?.comment,
          }}
          validationSchema={validations}
          submitLabel={t("submit")}
          onSubmit={(values) =>
            onSubmit(transaction, {
              accountId: values.account as string,
              amount: Number(values.amount),
              comment: values.comment as string,
            })
          }
        />
      )}
    </GenericModal>
  );
}
