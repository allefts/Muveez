import styled from "styled-components";
import { FetchedMovie } from "../../utils/types";
import PopularMovieCard from "./PopularMovieCard";

const StyledLandingPopularMovies = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}
`;

type LandingMovieProps = {
  movies: FetchedMovie[];
};

const LandingPopularMovies = ({ movies }: LandingMovieProps) => {
  const renderPopularMovies = () =>
    movies.map((movie, idx) => (
      <PopularMovieCard movie={movie} key={idx} idx={idx} />
    ));

  return (
    <StyledLandingPopularMovies>
      {renderPopularMovies()}
    </StyledLandingPopularMovies>
  );
};

export default LandingPopularMovies;
