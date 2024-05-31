import { RouterProvider } from "react-router-dom";
import { Router } from "../Router";

const Page = () => {
  return <RouterProvider router={Router} />;
};

export default Page;

// const renderedPage = match(route)
//   .with({ name: "Landing" }, () => <LandingPage />)
//   .with({ name: "Login" }, () => <LoginPage />)
//   .with({ name: "Profile" }, () => <ProfilePage />)
//   .with({ name: "Lists" }, () => <ListPage />)
//   .otherwise(() => <ErrorPage />);
