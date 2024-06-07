import styled from "styled-components";
import { Movie } from "../../utils/types";
import ListViewCard from "./ListViewCard";
import ListViewCardCompact from "./ListViewCardCompact";
import { useParams, useRevalidator } from "react-router-dom";
import { deleteListFetcher } from "../../utils/helpers/serverFetcher";

const StyledMoviesContainer = styled.div`
  width: 100%;
  border-radius: 0.5rem;

  .fancy_container {
    display: grid;
    flex-direction: column;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .compact_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
`;

type ListViewMoviesContainerProps = {
  listStyle: string;
  movies: Movie[];
};

const ListViewMoviesContainer = ({
  listStyle,
  movies,
}: ListViewMoviesContainerProps) => {
  const listId = useParams()["id"];
  const revalidator = useRevalidator();

  const handleDeleteMovieFromList = async (movieId: number) => {
    const res = await deleteListFetcher("/list", parseInt(listId!), movieId);
    if (res) {
      revalidator.revalidate();
    }
  };

  const renderListWithMoviesFancy = () =>
    movies.map((movie, idx) => (
      <ListViewCard
        key={idx}
        movie={movie}
        handleDeleteMovieFromList={handleDeleteMovieFromList}
      />
    ));

  const renderListWithMoviesCompact = () =>
    movies.map((movie, idx) => (
      <ListViewCardCompact
        key={idx}
        idx={idx}
        movie={movie}
        handleDeleteMovieFromList={handleDeleteMovieFromList}
      />
    ));

  return (
    <StyledMoviesContainer>
      {listStyle === "fanc" ? (
        <div className="fancy_container">{renderListWithMoviesFancy()}</div>
      ) : (
        <div className="compact_container">{renderListWithMoviesCompact()}</div>
      )}
    </StyledMoviesContainer>
  );
};

export default ListViewMoviesContainer;
