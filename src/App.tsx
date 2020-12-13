import { Box, Button, Flex, TabBar } from "@revolut/ui-kit";
import { Suspense } from "react";
import { AuthCheck, useAuth } from "reactfire";
import "firebase/auth";
import { Unauthenticated } from "./page/Unauthenticated";
import { Layout } from "./page/Layout";
import { Redirect, Route, Switch } from "react-router-dom";
import { Home } from "./page/Home";
import { ProfileCard } from "./page/Profile";
import { Intro } from "./page/Intro";
import { Admin } from "./page/Admin";

function Menu() {
  const auth = useAuth();

  return (
    <Flex mb={2}>
      <TabBar variant="segmented" flex={1}>
        <TabBar.Item to="/">Home</TabBar.Item>
        <TabBar.Item to="/regole">Regole</TabBar.Item>
        <TabBar.Item to="/profile">Profilo</TabBar.Item>
      </TabBar>
      <Box pr={2} />
      <Button size="sm" onClick={() => auth.signOut()}>
        Log out
      </Button>
    </Flex>
  );
}

export function Routes() {
  return (
    <Layout>
      <Menu />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/regole">
          <Intro />
        </Route>
        <Route path="/profile">
          <ProfileCard />
        </Route>
        <Route path="/super-secret-admin-page">
          <Admin />
        </Route>
        <Redirect exact from="/login" to="/" />
      </Switch>
    </Layout>
  );
}

export function App() {
  return (
    <Suspense fallback="Loading...">
      <AuthCheck fallback={<Unauthenticated />}>
        <Routes />
      </AuthCheck>
    </Suspense>
  );
}

export default App;
