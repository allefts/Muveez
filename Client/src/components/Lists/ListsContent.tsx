import { ListWithMovies, Movie } from "../../utils/types";

type ListsContentProps = {
  lists: ListWithMovies[];
};

const ListsContent = ({ lists }: ListsContentProps) => {
  const renderLists = () =>
    lists.map((list, idx) => {
      return (
        <li key={idx}>
          <p>
            <b>{list.list.list_id}</b>
          </p>
          <p>
            <b>{list.list.list_name}</b>
          </p>
          {renderMovies(list.movies)}
        </li>
      );
    });

  const renderMovies = (movies: Movie[]) =>
    movies.map((movie, idx) => {
      return (
        <div key={idx}>
          <br />
          <p>
            <b>{movie.title}</b>
          </p>
          <p>
            <b>{movie.overview}</b>
          </p>
          <p>
            <b>{movie.release_date}</b>
          </p>
          <img
            height="150"
            width="100"
            src={movie.image_url}
            alt="Movie Poster"
          />
        </div>
      );
    });

  return (
    <div>
      <ul>{renderLists()}</ul>
    </div>
  );
};

export default ListsContent;
