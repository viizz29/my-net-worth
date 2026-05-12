import api from "./client";

export interface NewAccountInfo {
  name: string;
  description: string;
  type: string;
}

export interface AccountObject333 extends NewAccountInfo {
  id: string;
}

export const createAccount = async (data: NewAccountInfo) => {
  const res = await api.post(`/v1/accounts`, data);
  return res.data.data;
};

export const getAccountList = async (): Promise<AccountObject333[]> => {
  const res = await api.get("/v1/accounts");
  return res.data.data;
};

export const deleteAccount = async (id: string) => {
  const res = await api.delete(`/v1/accounts/${id}`);
  return res.data;
};

export const updateAccount = async (id: string, info: NewAccountInfo) => {
  const res = await api.patch(`/v1/accounts/${id}`, info);
  return res.data;
};
