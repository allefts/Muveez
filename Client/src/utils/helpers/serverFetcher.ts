import axios from "axios";
import { toUser } from "./typeConversions";
import { FetchedMovie, ListWithMovies, Movie } from "../types";
import useSWRImmutable from "swr/immutable";

const serverAPI = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://api.muveez.pro",
  responseType: "json",
  responseEncoding: "utf8",
  withCredentials: true,
});

const serverFetcher = (url: string) =>
  serverAPI.get(url).then((res) => res.data);

const createListFetcher = async (url: string, listName: string | undefined) => {
  const wah = localStorage.getItem("wah");
  if (wah && listName) {
    const form = new FormData();
    form.append("user_id", wah);
    form.append("list_name", listName);
    try {
      const res = await serverAPI.post(url, form).then((res) => res);
      if (res.status === 201) {
        //List Created
        return "";
      } else {
        return res.data;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response.status === 409) {
        return err.response.data;
      }
    }
  }
};

const deleteListFetcher = async (
  url: string,
  listId: number,
  movieId: number
) => {
  const wah = localStorage.getItem("wah");
  if (wah) {
    try {
      const res = await serverAPI.delete(url, {
        data: { list_id: listId, user_id: wah, movie_id: movieId },
      });
      if (res.status === 200) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }
  return false;
};

const addMovieToListFetcher = async (url: string, movie: FetchedMovie) => {
  const dbMovie = {
    movie_id: 0,
    tmdb_id: movie.tmdb_id,
    title: movie.title,
    overview: movie.overview,
    image_url: movie.image_url,
    release_date: movie.release_date,
  } as Movie;

  try {
    const res = await serverAPI.post(url, {
      ...dbMovie,
    });

    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    return false;
  }

  return false;
};

//HOOK to get current user
const useUser = () => {
  const { data, isLoading, error, mutate } = useSWRImmutable(
    "/user",
    serverFetcher
  );

  if (data) {
    return { user: toUser(data), isLoading, isError: error, mutate };
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

export {
  addMovieToListFetcher,
  deleteListFetcher,
  createListFetcher,
  useListWithMovies,
  useAllUserListsWithMovies,
  useUser,
  serverAPI,
  serverFetcher,
};
