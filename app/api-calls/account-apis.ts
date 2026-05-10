import api from "./client";

export interface AccountObject333 {
  id: string;
  name: string;
  description: string;
  type: string;
}

export const createAccount = async (data: AccountObject333) => {
  const res = await api.post(`/v1/accounts`, data);
  return res.data.data;
};

export const getAccountList = async (): Promise<AccountObject333[]> => {
  const res = await api.get("/v1/accounts");
  return res.data.data;
};
