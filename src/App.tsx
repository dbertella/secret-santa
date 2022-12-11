import { Button, HStack, TabBar, VStack } from "@revolut/ui-kit";
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
    <HStack mb="s-2" space="s-16" align="center">
      <TabBar variant="segmented fit">
        <TabBar.Item to="/">Home</TabBar.Item>
        <TabBar.Item to="/regole">Regole</TabBar.Item>
        <TabBar.Item to="/profile">Profilo</TabBar.Item>
      </TabBar>
      <Button size="sm" onClick={() => auth.signOut()}>
        Log out
      </Button>
    </HStack>
  );
}

export function Routes() {
  return (
    <Layout>
      <VStack space="s-8">
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
      </VStack>
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
