import styled from "styled-components";
import LoginForm from "../components/Login/LoginForm";
import { FadeIn } from "../utils/styles/Keyframes";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Redirect } from "wouter";

const StyledLoginPage = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .loginPageContent {
    display: grid;
    grid-template-columns: repeat(2, minmax(auto, 440px));
    grid-template-rows: repeat(1, 300px);
    gap: 4rem;
  }
`;

const StyledLeftContent = styled.div`
  border: 3px solid black;
  padding: 1rem;
`;

const StyledRightContent = styled.div`
  height: 100%;
  position: relative;
  border: 3px solid black;
  padding: 1rem;

  display: flex;
  flex-direction: column;

  & > * {
    animation: ${FadeIn} 500ms ease;
  }
`;

const LoginPage = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" replace={true} />;
  }

  return (
    <StyledLoginPage>
      <div className="loginPageContent">
        <StyledLeftContent>
          <h1>The days of forgetting your movie list are gone.</h1>
          <p>Keep track of movies, shows and much more!</p>
        </StyledLeftContent>
        <StyledRightContent>
          <LoginForm />
        </StyledRightContent>
      </div>
    </StyledLoginPage>
  );
};

export default LoginPage;
