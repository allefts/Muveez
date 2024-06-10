import styled from "styled-components";
import LandingHeader from "../components/Landing/LandingHeader";
import LandingPopularMovies from "../components/Landing/LandingPopular";
import { useLoaderData } from "react-router-dom";
import { FetchedMovie } from "../utils/types";

const StyledLandingPage = styled.section`
  margin: 10rem 0;
  padding: 0 2rem;
  // display: flex;
  // flex-flow: row wrap;
  // align-items: center;
  // justify-content: center;
`;

const LandingPage = () => {
  const movies = useLoaderData() as FetchedMovie[];

  return (
    <StyledLandingPage>
      <LandingHeader />
      <LandingPopularMovies movies={movies.slice(0, 7)} />
      <LandingPopularMovies movies={movies.slice(7, 12)} />
    </StyledLandingPage>
  );
};

export default LandingPage;
