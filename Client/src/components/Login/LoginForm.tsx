import styled from "styled-components";
import { DefaultAnchor } from "../../utils/DefaultStyles";
import { FormEvent, useState } from "react";

const StyledLogin = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 440px));
  grid-template-rows: repeat(1, 500px);
  gap: 4rem;
`;

const StyledLeftContent = styled.div`
  border: 3px solid black;
  padding: 1rem;
`;

const StyledRightContent = styled.div`
  border: 3px solid black;
  padding: 1rem;
`;

const StyledLoginForm = styled.form`
  width: 100%;
`;

const StyledInput = styled.div`
  padding-top: 2rem;
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
  margin-top: 8rem;
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

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await fetch("http://localhost:8000/login", {
      body: formData,
      method: "POST",
    });
  };

  return (
    <StyledLogin>
      <StyledLeftContent>
        <h1>The days of forgetting your movie list are gone.</h1>
        <p>Keep track of movies, shows and much more!</p>
      </StyledLeftContent>
      <StyledRightContent>
        <h1>Log in to Muveez</h1>
        <p>
          Not a member?{"  "}
          <DefaultAnchor $color="#EF4040" href="/register">
            Sign up now
          </DefaultAnchor>
        </p>
        <StyledLoginForm onSubmit={handleSubmit}>
          <input
            name="bot-field"
            placeholder="do not fill this"
            type="hidden"
          />
          <StyledInput>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              min={3}
              max={9}
              required
            />
          </StyledInput>
          <StyledInput>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              min={6}
              max={18}
            />
          </StyledInput>
          <SubmitBtn type="submit">Next</SubmitBtn>
        </StyledLoginForm>
      </StyledRightContent>
    </StyledLogin>
  );
};

export default LoginForm;
