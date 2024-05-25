import styled, { ThemeProvider } from "styled-components";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Navbar/Nav";
import Page from "./pages/Page";
import { useState } from "react";
import { lightTheme, darkTheme, GlobalStyle } from "./utils/styles/Themes";

const StyledApp = styled.div`
  // padding: 1.5rem;
`;

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <StyledApp>
        <GlobalStyle />
        <Nav theme={theme} toggleTheme={toggleTheme} />
        <Page />
        <Footer />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
