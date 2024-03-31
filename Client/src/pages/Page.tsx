import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Home";
import LoginPage from "./Login";
import ErrorPage from "./Error";

const Page = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    { path: "/login", element: <LoginPage />, errorElement: <ErrorPage /> },
  ]);

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default Page;
