import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Landing";
import ProfilePage from "./pages/Profile";
import ListPage from "./pages/Lists";
import ErrorPage from "./pages/Error";
import LoginPage from "./pages/Login";
import Layout from "./pages/Layout";
import ProtectedPage from "./pages/Protected";
import ListView from "./components/Lists/ListView";
import ListsContent from "./components/Lists/ListsContent";
import { serverFetcher } from "./utils/helpers/serverFetcher";
import ListsHeader from "./components/Lists/ListsHeader";

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
                index: true,
                element: (
                  <>
                    <ListsHeader />
                    <ListsContent />
                  </>
                ),
              },
              {
                path: "/lists/:id",
                element: <ListView />,
                loader: async ({ params }) => {
                  return serverFetcher(`/list/${params["id"]}`);
                },
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
