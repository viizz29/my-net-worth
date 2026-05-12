import api from "./client";

export interface TransactionInputObject {
  amount: number;
  comment: string;
}

export interface Transaction333 extends TransactionInputObject {
  id: string;
}

export const createTransaction = async (data: TransactionInputObject) => {
  const res = await api.post(`/v1/transactions`, data);
  return res.data.data;
};

export const getTransactionList = async (): Promise<Transaction333[]> => {
  const res = await api.get("/v1/transactions");
  return res.data.data;
};

export const deleteTransaction = async (id: string) => {
  const res = await api.delete(`/v1/transactions/${id}`);
  return res.data;
};

export const updateTransaction = async (id: string, note: string) => {
  const res = await api.patch(`/v1/transactions/${id}`, { note });
  return res.data;
};
