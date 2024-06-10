import styled from "styled-components";
import LandingHeader from "../components/Landing/LandingHeader";
import LandingPopularMovies from "../components/Landing/LandingPopular";

const StyledLandingPage = styled.section`
  padding: 0 2rem;
`;

const LandingPage = () => {
  return (
    <StyledLandingPage>
      <LandingHeader />
      <LandingPopularMovies />
    </StyledLandingPage>
  );
};

export default LandingPage;
