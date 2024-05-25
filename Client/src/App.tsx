import styled from "styled-components";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Navbar/Nav";
import Page from "./pages/Page";

const StyledApp = styled.div`
  // padding: 1.5rem;
`;

function App() {
  return (
    <StyledApp>
      <Nav />
      <Page />
      <Footer />
    </StyledApp>
  );
}

export default App;
