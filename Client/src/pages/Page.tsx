import { Route, Switch } from "wouter";
import LandingPage from "./Landing";
import LoginPage from "./Login";
import ListPage from "./Lists";
import ProfilePage from "./Profile";
import ProtectedPage from "./Protected";

const Page = () => {
  return (
    <Switch>
      {/* PUBLIC */}
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />

      {/* PRIVATE */}
      <ProtectedPage>
        <Route path="/lists" component={ListPage} />
        <Route path="/profile" component={ProfilePage} />
      </ProtectedPage>
    </Switch>
  );
};

export default Page;
