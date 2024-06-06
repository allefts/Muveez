import styled from "styled-components";
import { Movie } from "../../utils/types";
import ListViewCard from "./ListViewCard";
import ListViewCardCompact from "./ListViewCardCompact";

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
  const renderListWithMoviesFancy = () =>
    movies.map((movie, idx) => <ListViewCard key={idx} movie={movie} />);

  const renderListWithMoviesCompact = () =>
    movies.map((movie, idx) => (
      <ListViewCardCompact key={idx} idx={idx} movie={movie} />
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
