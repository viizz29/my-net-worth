import * as Yup from "yup";


export interface TypeAccountingHead {
    type: number;
    name: string;
    description: string;
    balance: number;
};

export const accountHeadSchema : Yup.Schema<TypeAccountingHead> = Yup.object({
    type: Yup.number().required().oneOf([1, 2], "Invalid account type"),
    name: Yup.string().required().min(5),
    description: Yup.string().required().min(20),
    balance: Yup.number().required().integer(),
}).noUnknown();


export interface TypeTransaction {
    debitHeadId: string;
    creditHeadId: string;
    amount: number;
    description: string;
};



export const transactionRecordSchema: Yup.Schema<TypeTransaction> = Yup.object({
    debitHeadId: Yup.string().required()
    .notOneOf([Yup.ref('creditHeadId')], "Kindly select a different debit account."),

    creditHeadId: Yup.string().required()
    .notOneOf([Yup.ref('debitHeadId')], "Kindly select a different credit account."),
    amount: Yup.number().required().integer().positive(),

    description: Yup.string().required().min(20),
}).noUnknown(true);