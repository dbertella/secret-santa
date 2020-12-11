import { Box, Button, Input, TabBar, Text } from "@revolut/ui-kit";
import { FormEvent, useState } from "react";
import { useAuth } from "reactfire";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { Intro } from "./Intro";
import { Layout } from "./Layout";
import singInWithGoogleBtn from "./signinWithGoogle.svg";

const MySignInForm = ({
  btnText,
  onSubmit,
}: {
  btnText: string,
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
  const [emailAndPwd, setEmailAndPwd] = useState(false);
  return (
    <Box>
      <Box pt={2} />
      {emailAndPwd ? (
        <Box use="form" onSubmit={onSubmit}>
          <Input name="email" placeholder="email" />
          <Box pt={2} />
          <Input name="password" placeholder="password" />
          <Box pt={2} />
          <Button type="submit">{btnText}</Button>
        </Box>
      ) : (
        <Button onClick={() => setEmailAndPwd(true)}>
          {btnText} con email e password
        </Button>
      )}

      <hr />
      <Button onClick={singInWithGoogle} variant="outline">
        <img src={singInWithGoogleBtn} alt="Sign in with google" />
        <Text ml={2}>Accedi con Google</Text>
      </Button>
    </Box>
  );
};

function Menu() {
  return (
    <TabBar variant="segmented">
      <TabBar.Item to="/login">Log in</TabBar.Item>
      <TabBar.Item to="/register">Registrati</TabBar.Item>
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

  return <MySignInForm btnText="Log in" onSubmit={signIn} />;
}

function SignUpForm() {
  const auth = useAuth();

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const [email, password] = e.target;
    auth.createUserWithEmailAndPassword(email.value, password.value);
  };

  return <MySignInForm btnText="Registrati" onSubmit={signIn} />;
}

export function Unauthenticated() {
  return (
    <Layout>
      <Intro>
        <Box pt={2} />
        <Menu />
        <Switch>
          <Route path="/login">
            <LogInForm />
          </Route>
          <Route path="/register">
            <SignUpForm />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </Intro>
    </Layout>
  );
}
