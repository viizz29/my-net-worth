import { TypeBasicUserInfo } from "@/lib/app-context";
import axios, { baseURL } from "@/lib/axiosConfig";
import { usePathname } from "next/navigation";
import { useQuery, QueryClient} from "react-query";

const userInfoApi = `/user/info`;
export const  USER_INFO_QUERY_KEY = userInfoApi;

export const useUserInfo = () => {
  return useQuery([USER_INFO_QUERY_KEY], (): Promise<TypeBasicUserInfo> => {
    return new Promise((resolve, reject) => {
      axios.get(`${userInfoApi}`).then(resp => {
        console.log(resp.data);
        if (resp.data.msg !== "OK") {
          resolve({name: "Guest"});
        } else {
          resolve(resp.data.data);
        }
      }).catch((reason) => {
        reject(reason);
      });
    });
  });
}