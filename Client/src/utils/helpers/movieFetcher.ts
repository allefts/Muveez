import axios from "axios";
import useSWR from "swr";

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

//GETS *TRENDING* MOVIES FROM API
//!!!!! LOTS OF DATA
const useGetDiscoverMovies = () => {
  const { data, isLoading, error } = useSWR("/discover/movie", movieFetcher);

  return { data, isLoading, error };
};

export { useGetDiscoverMovies, movieFetcher };
