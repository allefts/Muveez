import LandingPage from "./Landing";
import LoginPage from "./Login";
import ListPage from "./Lists";
import ProfilePage from "./Profile";
import ErrorPage from "./Error";
import { Router } from "../Router";
import { match } from "ts-pattern";

const Page = () => {
  const route = Router.useRoute(["Landing", "Login", "Profile", "Lists"]);

  const renderedPage = match(route)
    .with({ name: "Landing" }, () => <LandingPage />)
    .with({ name: "Login" }, () => <LoginPage />)
    .with({ name: "Profile" }, () => <ProfilePage />)
    .with({ name: "Lists" }, () => <ListPage />)
    .otherwise(() => <ErrorPage />);

  return renderedPage;
};

export default Page;
