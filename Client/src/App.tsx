import styled from "styled-components";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";

const StyledApp = styled.div`
  // padding: 1.5rem;
`;

function App() {
  return (
    <StyledApp>
      <RouterProvider router={Router} />
    </StyledApp>
  );
}

export default App;
