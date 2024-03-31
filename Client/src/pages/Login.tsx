import styled from "styled-components";
import LoginForm from "../components/Login/LoginForm";
import { useState } from "react";
import RegisterForm from "../components/Register/RegisterForm";
import { FadeIn } from "../components/FadeIn";

const StyledLoginPage = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .loginPageContent {
    display: grid;
    grid-template-columns: repeat(2, minmax(auto, 440px));
    grid-template-rows: repeat(1, 500px);
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
  const [currentAuthForm, setCurrentAuthForm] = useState<string>("Login");

  const changeForm = (formTo: string) => {
    setCurrentAuthForm(formTo);
  };

  return (
    <StyledLoginPage>
      <div className="loginPageContent">
        <StyledLeftContent>
          <h1>The days of forgetting your movie list are gone.</h1>
          <p>Keep track of movies, shows and much more!</p>
        </StyledLeftContent>
        <StyledRightContent>
          {currentAuthForm === "Login" ? (
            <LoginForm changeForm={changeForm} />
          ) : (
            <RegisterForm changeForm={changeForm} />
          )}
        </StyledRightContent>
      </div>
    </StyledLoginPage>
  );
};

export default LoginPage;
