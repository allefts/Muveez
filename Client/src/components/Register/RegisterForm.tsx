import styled from "styled-components";
import { DefaultAnchor } from "../../utils/DefaultStyles";
import React, { FormEvent, useState } from "react";
import { validateInput } from "../../utils/ValidateUserInput";
import { useFormErrors } from "../../utils/FormErrorHook";
import LineError from "../LineError";

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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const { errors, setError, clearError, noErrors } = useFormErrors();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    clearError(name);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tempErrors = validateInput(formData);
    for (const [key, val] of Object.entries(tempErrors)) {
      setError(key, val);
    }

    console.log(formData);

    if (noErrors() === true) {
      fetch("http://localhost:8000/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }).then((res) => 
        res.json().then((res) => console.log(res))
      );
    }
  };

  return (
    <>
      <h1>Join Muveez</h1>
      <p>
        Already have an account?{"  "}
        <DefaultAnchor $color="#EF4040" onClick={() => changeForm("Login")}>
          Log in
        </DefaultAnchor>
      </p>
      <StyledRegisterForm onSubmit={handleSubmit}>
        {/* <input name="bot-field" placeholder="do not fill this" hidden /> */}
        <StyledInput>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </StyledInput>
        <StyledInput>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </StyledInput>
        <StyledInput>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            min={6}
            max={18}
            required
          />
        </StyledInput>
        <br />
        {Object.entries(errors).map(([_, val], idx) => {
          return <LineError key={idx + _} msg={val} />;
        })}
        <SubmitBtn type="submit">Next</SubmitBtn>
      </StyledRegisterForm>
    </>
  );
};

export default RegisterForm;
