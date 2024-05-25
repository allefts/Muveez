import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./atoms/AuthProvider.tsx";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
    font-weight: bold;
    transition: all 300ms ease;
    cursor: pointer;
    color: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <GlobalStyle />
    <App />
  </AuthProvider>
);
