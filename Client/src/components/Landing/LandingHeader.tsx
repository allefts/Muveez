import styled from "styled-components";

const StyledLandingHeader = styled.div`
  max-width: 900px;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 5rem;
  text-align: center;

  h1 {
    font-size: 3rem;
    span {
      color: ${({ theme }) => theme.primary};
      background: ${({ theme }) => theme.background};
    }
  }

  p {
    margin-top: 1.5rem;
    font-size: 1.25rem;
    opacity: 0.8;
    color: ${({ theme }) => theme.text};
  }
`;

const LandingHeader = () => {
  return (
    <StyledLandingHeader>
      <h1>
        Keep track of all your favorite <span>movies</span>
      </h1>
      <p>
        Think Spotify, but for films. Your tool to never forget what you've
        watched.
      </p>
    </StyledLandingHeader>
  );
};

export default LandingHeader;
