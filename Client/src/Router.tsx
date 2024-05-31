import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Landing";
import ProfilePage from "./pages/Profile";
import ListPage, { ListPageState } from "./pages/Lists";
import ErrorPage from "./pages/Error";
import LoginPage from "./pages/Login";
import Layout from "./pages/Layout";
import ProtectedPage from "./pages/Protected";

export const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        element: <ProtectedPage />,
        children: [
          {
            path: "/profile",
            element: <ProfilePage />,
          },
          {
            path: "/lists",
            element: <ListPage />,
            children: [
              {
                //Maybe run a loader function that fetches based off of the user id and populates the listview component
                path: "/lists/:id",
                element: <ListPage defaultState={ListPageState.VIEWING} />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
