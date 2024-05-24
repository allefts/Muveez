import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./Error";
import LandingPage from "./Landing";
import LoginPage from "./Login";
import ListPage from "./Lists";
import ProfilePage from "./Profile";
// import { useContext } from "react";
// import { AuthContext } from "../atoms/AuthProvider";
import ProtectedPage from "./Protected";

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
          <Route element={<ProtectedPage />}>
            <Route
              path="/lists"
              element={<ListPage />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/profile"
              element={<ProfilePage />}
              errorElement={<ErrorPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default Page;
