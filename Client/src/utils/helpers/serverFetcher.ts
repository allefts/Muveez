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

//HOOK to get all user lists and movies along with them
const useAllUserListsWithMovies = () => {
  const { data, isLoading, error } = useSWRImmutable<ListWithMovies[]>(
    "/user/lists",
    serverFetcher
  );

  if (data) {
    return { lists: data, isLoading, error };
  }

  return { lists: null, isLoading, isError: error };
};

export { useAllUserListsWithMovies, useUser, serverFetcher };
