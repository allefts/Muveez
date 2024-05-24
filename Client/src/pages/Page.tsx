// import { useContext } from "react";
// import { AuthContext } from "../atoms/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./Error";
import LandingPage from "./Landing";
import LoginPage from "./Login";
// import { useContext } from "react";
// import { AuthContext } from "../atoms/AuthProvider";

const Page = () => {
  // const { authState } = useContext(AuthContext);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} errorElement={<ErrorPage />} />
          <Route
            path="/login"
            element={<LoginPage />}
            errorElement={<ErrorPage />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default Page;
