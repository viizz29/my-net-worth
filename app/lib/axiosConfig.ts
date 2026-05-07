import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("wealth-tracker-token");

export const baseURL = `${process.env.backend}`;
export const Authorization = `Bearer ${token}`;

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


export default instance;
