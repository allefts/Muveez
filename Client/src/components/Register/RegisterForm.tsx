import styled from "styled-components";
import { DefaultAnchor } from "../../utils/DefaultStyles";
import { FadeIn } from "../FadeIn";

const StyledRegisterForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
  }

  input {
    font-size: 1rem;
    padding: 0.25rem;
    outline: none;
    transition: all 300ms ease;
    border: 1px solid black;

    &:focus {
      border: 1px solid #ef4040;
    }
  }
`;

const SubmitBtn = styled.button`
  margin-top: auto;
  padding: 0.5rem;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: 3px solid black;
  font-size: 1rem;
  cursor: pointer;
  transition: all 300ms ease;
  font-weight: bold;

  &:hover {
    background-color: #ef4040;
  }
`;

const RegisterForm = ({
  changeForm,
}: {
  changeForm: (formTo: string) => void;
}) => {
  return (
    <>
      <h1>Join Muveez</h1>
      <p>
        Already have an account?{"  "}
        <DefaultAnchor $color="#EF4040" onClick={() => changeForm("Login")}>
          Log in
        </DefaultAnchor>
      </p>
      <StyledRegisterForm>
        {/* <input name="bot-field" placeholder="do not fill this" hidden /> */}
        <StyledInput>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" required />
        </StyledInput>
        <StyledInput>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
            required
          />
        </StyledInput>
        <StyledInput>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            min={6}
            max={18}
            required
          />
        </StyledInput>
        <SubmitBtn type="submit">Next</SubmitBtn>
      </StyledRegisterForm>
    </>
  );
};

export default RegisterForm;
