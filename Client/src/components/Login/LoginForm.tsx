import styled from "styled-components";
import { FaGoogle } from "react-icons/fa";

const SubmitBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: 3px solid black;
  font-size: 1rem;
  cursor: pointer;
  transition: all 300ms ease;
  font-weight: bold;

  svg {
    margin-right: 1rem;
  }

  &:hover {
    background-color: #ef4040;
  }
`;

const StyledLoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  height: 100%;

  .buttonContainer {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 1.5rem;
  }
`;

const LoginForm = () => {
  const handleLoginWithGoogle = async () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <StyledLoginForm>
      <h1>Log in to Muveez</h1>
      <div className="buttonContainer">
        <SubmitBtn onClick={handleLoginWithGoogle}>
          <FaGoogle />
          Log in with Google
        </SubmitBtn>
      </div>
    </StyledLoginForm>
  );
};

export default LoginForm;
