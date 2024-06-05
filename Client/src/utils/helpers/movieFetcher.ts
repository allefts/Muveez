import axios from "axios";
import { FetchedMovie } from "../types";
import useSWRImmutable from "swr/immutable";
import { parseMoviesFromTMDB } from "./typeConversions";

// const POSTER_IMAGE_ENDPOINT = "https://image.tmdb.org/t/p/original/";

const movieAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  method: "GET",
  responseType: "json",
  responseEncoding: "utf8",
  headers: { Authorization: "Bearer " + import.meta.env.VITE_TMDB_TOKEN },
});

const movieFetcher = (url: string) => movieAPI.get(url).then((res) => res.data);

// const testAPI = () => {
//   axios
//     .get("https://api.themoviedb.org/3/authentication")
//     .then((res) => console.log(res));
// };

const getPopularMovies = async () => {
  const res = await movieFetcher("/movie/popular?language=en-US&page=1");
  if (res.results) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.results.map((movie: any) => {
      const fetchedMovie: FetchedMovie = {
        tmdb_id: movie.id,
        title: movie.title,
        overview: movie.overview,
        popularity: movie.popularity,
        release_date: movie.release_date,
        image_url: "https://image.tmdb.org/t/p/original" + movie.poster_path,
      };
      return fetchedMovie;
    });
  }
  return [] as Partial<FetchedMovie>;
};

//SEARCH FOR MOVIES
const useSearchForMovies = (searchValue: string) => {
  const { data, isLoading, error } = useSWRImmutable(
    searchValue
      ? `/search/movie?include_adult=false&language=en-US&page=1&query=${searchValue}`
      : null,
    movieFetcher
  );

  if (data) {
    const parsedMovies = parseMoviesFromTMDB(data.results);
    return { data: parsedMovies, isLoading, isError: error };
  }

  return { data: null, isLoading, isError: error };
};

//GETS *TRENDING* MOVIES FROM API
const useGetDiscoverMovies = () => {
  const { data, isLoading, error } = useSWRImmutable(
    "/discover/movie",
    movieFetcher
  );

  return { data, isLoading, error };
};

export {
  getPopularMovies,
  useSearchForMovies,
  useGetDiscoverMovies,
  movieFetcher,
};
