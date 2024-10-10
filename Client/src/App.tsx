import styled from "styled-components";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Router";
import { AuthProvider } from "./context/AuthContext";

const StyledApp = styled.div`
  // padding: 1.5rem;
`;

function App() {
  return (
    <StyledApp>
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </StyledApp>
  );
}

export default App;
