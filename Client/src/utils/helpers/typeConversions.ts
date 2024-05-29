/* eslint-disable @typescript-eslint/no-explicit-any */
import { List, Movie, UserData } from "../types";

const toUser = (obj: any) => {
  const user = {} as UserData;
  user.user_id = parseInt(obj.user_id);
  user.google_id = obj.google_id;
  user.name = obj.name;
  user.username = obj.username;
  user.email = obj.email;
  user.avatar_url = obj.avatar_url;
  user.created_at = obj.created_at;
  return user;
};

const toList = (obj: any) => {
  const list = {} as List;
  list.list_id = obj["list_id"];
  list.user_id = obj["user_id"];
  list.list_name = obj["list_name"];
  list.created_at = obj["created_at"];
  return list;
};

const toMovie = (obj: any) => {
  const movie = {} as Movie;
  movie.movie_id = obj["movie_id"];
  movie.tmdb_id = obj["tmdb_id"];
  movie.title = obj["title"];
  movie.overview = obj["overview"];
  movie.release_date = obj["release_date"];
  movie.image_url = obj["image_url"];
};

export { toList, toMovie, toUser };
