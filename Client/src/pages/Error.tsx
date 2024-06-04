import styled from "styled-components";

const StyledErrorPage = styled.section`
  display: grid;
  place-items: center;
  padding: 2rem;

  h1 {
    font-size: 4rem;
  }
  p {
    font-size: 2rem;
  }
`;

const ErrorPage = () => {
  return (
    <StyledErrorPage>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
    </StyledErrorPage>
  );
};

export default ErrorPage;
