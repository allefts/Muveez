type UserData = {
  user_id: number;
  google_id: string;
  email: string;
  username: string;
  name: string;
  avatar_url: string;
  created_at: string;
};

type List = {
  list_id: number;
  user_id: number;
  list_name: string;
  created_at: string;
};

type Movie = {
  movie_id: number;
  tmdb_id: number;
  title: string;
  overview: string;
  release_date: string;
  image_url: string;
};

type ListWithMovies = {
  list: List;
  movies: Movie[];
};

type Error = {
  msg: string;
};

export enum Mode {
  DEFAULT,
  CREATING,
}
export enum View {
  FANCY,
  COMPACT,
}

export type { Error, List, Movie, ListWithMovies, UserData };
