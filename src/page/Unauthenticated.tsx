import { Box, Button, Input, TabBar } from "@revolut/ui-kit";
import { FormEvent } from "react";
import { useAuth } from "reactfire";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Switch, Route, useHistory } from "react-router-dom";
import { Intro } from "./Intro";
import { Layout } from "./Layout";
import singInWithGoogleBtn from "./signinWithGoogle.svg";

const MySignInForm = ({
  onSubmit,
}: {
  onSubmit: ((event: FormEvent<HTMLFormElement>) => void) | undefined;
}) => {
  const auth = useAuth();
  const history = useHistory();
  const singInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    auth.signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token.
      const token = result?.credential;
      // The signed-in user info.
      const user = result.user;

      console.log(user, token);
      history.push("/");
    });
  };
  return (
    <Box>
      <Box use="form" onSubmit={onSubmit}>
        <Box pt={2} />
        <Input name="email" placeholder="email" />
        <Box pt={2} />
        <Input name="password" placeholder="password" />
        <Box pt={2} />
        <Button type="submit">Invia</Button>
      </Box>
      <hr />
      <Button onClick={singInWithGoogle} variant="outline">
        <img src={singInWithGoogleBtn} alt="Sign in with google" /> Login con Google
      </Button>
    </Box>
  );
};

function Menu() {
  return (
    <TabBar variant="segmented">
      <TabBar.Item to="/login">Login</TabBar.Item>
      <TabBar.Item to="/register">Register</TabBar.Item>
    </TabBar>
  );
}

function LogInForm() {
  const auth = useAuth();

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const [email, password] = e.target;
    auth.signInWithEmailAndPassword(email.value, password.value);
  };

  return <MySignInForm onSubmit={signIn} />;
}

function SignUpForm() {
  const auth = useAuth();

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const [email, password] = e.target;
    auth.createUserWithEmailAndPassword(email.value, password.value);
  };

  return <MySignInForm onSubmit={signIn} />;
}

export function Unauthenticated() {
  return (
    <Layout>
      <Intro>
        <Box pt={2} />
        <Menu />
        <Switch>
          <Route path="/">
            <LogInForm />
          </Route>
          <Route path="/register">
            <SignUpForm />
          </Route>
        </Switch>
      </Intro>
    </Layout>
  );
}
