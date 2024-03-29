import styled from "styled-components";
import LoginForm from "../components/Login/LoginForm";

const StyledLoginPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginPage = () => {
  return (
    <StyledLoginPage>
      <LoginForm />
    </StyledLoginPage>
  );
};

export default LoginPage;
