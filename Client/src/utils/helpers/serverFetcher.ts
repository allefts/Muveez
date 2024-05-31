import axios from "axios";
import { toUser } from "./typeConversions";
import { ListWithMovies } from "../types";
import useSWRImmutable from "swr/immutable";

const serverAPI = axios.create({
  baseURL: "http://localhost:8000",
  responseType: "json",
  responseEncoding: "utf8",
  withCredentials: true,
});

const serverFetcher = (url: string) =>
  serverAPI.get(url).then((res) => res.data);

// const routerLoaderFetcher = <T>(url: string, params?: Params<string>) => {
//   if (params) {
//     const res = serverFetcher(`${url}` + params);
//   }
// };

//HOOK to get current user
const useUser = () => {
  const { data, isLoading, error } = useSWRImmutable("/user", serverFetcher);

  if (data) {
    return { user: toUser(data), isLoading, isError: error };
  }

  return {
    user: null,
    isLoading,
    isError: error,
  };
};

//HOOK to get a list with its movies by listId
const useListWithMovies = (listId: string) => {
  const { data, isLoading, error } = useSWRImmutable<ListWithMovies>(
    `/list/${listId}`,
    serverFetcher
  );

  return {
    list: data ?? null,
    isLoading,
    isError: error,
  };
};

//HOOK to get all user lists and movies along with them
const useAllUserListsWithMovies = () => {
  const { data, isLoading, error } = useSWRImmutable<ListWithMovies[]>(
    "/user/lists",
    serverFetcher
  );

  return { lists: data ?? null, isLoading, isError: error };
};

export { useListWithMovies, useAllUserListsWithMovies, useUser, serverFetcher };
