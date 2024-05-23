import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LandingPage from "./Landing";
import LoginPage from "./Login";
import ErrorPage from "./Error";
import { useContext, useMemo } from "react";
import { AuthContext } from "../atoms/AuthProvider";
import ListPage from "./Lists";
import ProfilePage from "./Profile";

const Page = () => {
  const { authState } = useContext(AuthContext);

  const availableRoutes = useMemo(() => {
    const publicRoutes: RouteObject[] = [
      { path: "/login", element: <LoginPage />, errorElement: <ErrorPage /> },
    ];
    const privateRoutes: RouteObject[] = [
      { path: "/lists", element: <ListPage />, errorElement: <ErrorPage /> },
      {
        path: "/profile",
        element: <ProfilePage />,
        errorElement: <ErrorPage />,
      },
    ];

    const bothRoutes: RouteObject[] = [
      {
        path: "/",
        element: <LandingPage />,
        errorElement: <ErrorPage />,
      },
    ];

    return bothRoutes.concat(authState.isAuthed ? privateRoutes : publicRoutes);
  }, [authState]);

  const router = createBrowserRouter(availableRoutes);

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default Page;
