import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Landing";
import ProfilePage from "./pages/Profile";
import ListPage from "./pages/Lists";
import ErrorPage from "./pages/Error";
import LoginPage from "./pages/Login";
import Layout from "./pages/Layout";
import ProtectedPage from "./pages/Protected";
import ListViewing from "./components/Lists/ListView";
import ListCreate from "./components/Lists/ListCreate";
import ListsContent from "./components/Lists/ListsContent";
import { serverFetcher } from "./utils/helpers/serverFetcher";

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
                element: <ListsContent />,
              },
              {
                path: "/lists/:id",
                element: <ListViewing />,
                loader: async ({ params }) => {
                  return serverFetcher(`/list/${params["id"]}`);
                },
              },
              {
                path: "/lists/create",
                element: <ListCreate />,
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
