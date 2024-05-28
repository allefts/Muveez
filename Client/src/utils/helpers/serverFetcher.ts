import axios from "axios";
import useSWR from "swr";
import { toUser } from "./toUser";

const serverAPI = axios.create({
  baseURL: "http://localhost:8000",
  responseType: "json",
  responseEncoding: "utf8",
  withCredentials: true,
});

const serverFetcher = (url: string) =>
  serverAPI.get(url).then((res) => res.data);

//HOOK to get current user
const useUser = () => {
  const { data, isLoading, error } = useSWR("/user", serverFetcher);

  if (data) {
    return { user: toUser(data), isLoading, isError: error };
  }

  return {
    user: null,
    isLoading,
    isError: error,
  };
};

export { useUser, serverFetcher };
