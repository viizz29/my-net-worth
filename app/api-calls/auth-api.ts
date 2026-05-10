import api from "./client";

export const loginApi = async (email: string, password: string) => {
  const response = await api.post("/v1/auth/login", {
    email,
    password,
  });

  return response.data;
  // expected: { token: "...", user: {...} }
};

interface ApiResponse001 {
  code: number;
  msg: string;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  const res: { data: ApiResponse001 & { data: UserInfo } } =
    await api.get("/v1/me");
  return res.data.data;
};
