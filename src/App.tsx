import {
  Box,
  Button,
  Flex,
  Input,
  InputSelect,
  TextBox,
  Color,
  TabBar,
} from "@revolut/ui-kit";
import { Suspense } from "react";
import {
  AuthCheck,
  useFirestoreDocData,
  useUser,
  useAuth,
  useFirestore,
} from "reactfire";
import "firebase/auth";
import { Unauthenticated } from "./page/Unauthenticated";
import { Intro, User } from "./page/Intro";
import { Layout } from "./page/Layout";
import { Redirect, Route, Switch } from "react-router-dom";
import { smilyAndPeople } from "./allEmojis";
import { Controller, useForm } from "react-hook-form";

const Family = {
  BertCan: "Bertella / Cantù",
  BertCaz: "Bertella / Cazzaniga",
  BertDat: "Bertella / Dati",
  BertMar: "Bertella / Martoccia",
  BertMer: "Bertella / Mercier",
  BertSal: "Bertella / Sala",
} as const;

function Menu() {
  const auth = useAuth();

  return (
    <Flex>
      <TabBar variant="segmented" flex={1}>
        <TabBar.Item to="/home">Home</TabBar.Item>
        <TabBar.Item to="/profile">Profilo</TabBar.Item>
      </TabBar>
      <Box pr={2} />
      <Button size="sm" onClick={() => auth.signOut()}>
        Log out
      </Button>
    </Flex>
  );
}

function Home() {
  // get the current user.
  // this is safe because we've wrapped this component in an `AuthCheck` component.
  const { data: user } = useUser();
  const db = useFirestore();
  // read the user details from Firestore based on the current user's ID
  const userDetailsRef = db.collection("participants").doc(user.uid);
  const { displayName } = useFirestoreDocData<User>(userDetailsRef).data ?? {};

  if (!displayName) {
    return <Redirect to="profile" />;
  }

  return (
    <Box>
      <TextBox variant="h4">
        Ciao{" "}
        <TextBox
          use="span"
          bg={Color.TRANSPARENT_GREY_35}
          px={1}
          color={Color.WHITE}
          borderRadius="input"
        >
          {displayName}!
        </TextBox>{" "}
        A breve verrà estratto il nome a cui dovrai fare un regalo 🎁
      </TextBox>
    </Box>
  );
}

function ProfileCard() {
  const { register, handleSubmit, control } = useForm<User>();

  const { data: user } = useUser();
  const db = useFirestore();
  // read the user details from Firestore based on the current user's ID
  const userDetailsRef = db.collection("participants").doc(user.uid);
  const { displayName, family, emoji } =
    useFirestoreDocData<User>(userDetailsRef).data ?? {};
  const writeUser = (data: User) => {
    console.log(data);
    db.collection("participants").doc(user.uid).set(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(writeUser)}>
        <Input
          key={displayName}
          name="displayName"
          placeholder="Nome"
          ref={register({ required: true })}
          defaultValue={displayName ?? user?.displayName ?? undefined}
          required
        />
        <Box pt={1} />
        <Input
          name="email"
          placeholder="Email"
          ref={register({ required: true })}
          defaultValue={user?.email ?? undefined}
          required
        />
        <Box pt={1} />
        <Controller
          key={family}
          as={InputSelect}
          control={control}
          rules={{ required: true }}
          placeholder="Famiglia"
          options={Object.values(Family).map((fam) => ({
            label: fam,
            value: fam,
          }))}
          name="family"
          defaultValue={family ?? ""}
          dropdown={{
            flip: true,
          }}
        />
        <Box pt={1} />
        <Controller
          key={emoji}
          as={InputSelect}
          control={control}
          placeholder="Emoji"
          options={Object.values(smilyAndPeople).map((em) => ({
            label: em,
            value: em,
          }))}
          name="emoji"
          defaultValue={emoji ?? ""}
          dropdown={{
            flip: true,
          }}
        />
        <Box pt={1} />
        <Button type="submit">
          {displayName ? "Aggiorna" : "Partecipa al gioco!"}
        </Button>
      </form>
    </Box>
  );
}

export function Routes() {
  return (
    <Layout>
      <Menu />
      <Intro />
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/profile">
          <ProfileCard />
        </Route>
        <Redirect to="home" />
      </Switch>
    </Layout>
  );
}

export function ProfilePage() {
  return (
    <Suspense fallback="Loading...">
      <AuthCheck fallback={<Unauthenticated />}>
        <Routes />
      </AuthCheck>
    </Suspense>
  );
}

export default ProfilePage;
