import { Route, Switch } from "wouter";
import LandingPage from "./Landing";
import LoginPage from "./Login";
import ListPage from "./Lists";
import ProfilePage from "./Profile";

const Page = () => {
  return (
    <Switch>
      {/* PUBLIC */}
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />

      {/* PRIVATE */}
      <Route path="/lists" component={ListPage} />
      <Route path="/profile" component={ProfilePage} />
    </Switch>
  );
};

export default Page;
