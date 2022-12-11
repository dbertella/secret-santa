import { Button, HStack, Input, TabBar, Text, VStack } from "@revolut/ui-kit";
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
  btnText: string;
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
    <VStack space="s-8">
      {emailAndPwd ? (
        <VStack use="form" onSubmit={onSubmit} space="s-4">
          <Input name="email" placeholder="email" />
          <Input name="password" placeholder="password" />
          <Button type="submit">{btnText}</Button>
        </VStack>
      ) : (
        <Button onClick={() => setEmailAndPwd(true)}>
          {btnText} con email e password
        </Button>
      )}
      <Button onClick={singInWithGoogle} variant="secondary">
        <HStack space="s-8" align="center">
          <img src={singInWithGoogleBtn} alt="Sign in with google" />
          <Text ml="s-2">Accedi con Google</Text>
        </HStack>
      </Button>
    </VStack>
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
      <VStack space="s-16">
        <Intro>
          <Menu />
          <Switch>
            <Route path="/login">
              <LogInForm />
            </Route>
            <Route path="/register">
              <SignUpForm />
            </Route>
            <Redirect exact from="/" to="/login" />
          </Switch>
        </Intro>
      </VStack>
    </Layout>
  );
}
