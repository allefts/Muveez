import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#edf2f4",
  text: "#1c1c1c",
  primary: "rgba(3, 102, 214, 1)",
  background: "#f8f9fa",
};

export const darkTheme = {
  body: "#1c1c1c",
  text: "#edf2f4",
  primary: "rgba(3, 102, 214, 1)",
  background: "#333333",
};

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Libre Franklin", "Inter", "sans-serif";
        line-height: 1.4;
    }

    body {
        background-color: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text}
    }

  a {
    text-decoration: none;
    font-weight: bold;
    transition: all 300ms ease;
    cursor: pointer;
    color: inherit;

    &:hover {
      // text-decoration: underline;
    }

  }

  input {
    outline: none;
    border: 2px solid ${({ theme }) => theme.text};
    border-radius: .5rem;
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  dialog {
    display: none;
    opacity: 0;
    transform: translateY(300px);
    transition-property: display opacity transform;
    transition-duration: 300ms;
    transition-behavior: allow-discrete;
    
  }
  
  dialog[open] {
    display: block;
    opacity: 1;
    transform: translateY(0);
    
    @starting-style {
      transform: translateY(300px);
      opacity: 0;
    }
  }
`;
