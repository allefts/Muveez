import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import { FetchedMovie } from "../../utils/types";
import PopularMovieCard from "./PopularMovieCard";

const StyledLandingPopularMovies = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
`;

const LandingPopularMovies = () => {
  const movies = useLoaderData() as FetchedMovie[];

  const renderPopularMovies = () =>
    movies
      .slice(0, 10)
      .map((movie, idx) => <PopularMovieCard movie={movie} key={idx} />);

  return (
    <StyledLandingPopularMovies>
      {renderPopularMovies()}
    </StyledLandingPopularMovies>
  );
};

export default LandingPopularMovies;
