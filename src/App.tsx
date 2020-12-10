import {
  Box,
  Button,
  Flex,
  Input,
  InputSelect,
  TextBox,
  Color,
} from "@revolut/ui-kit";
import { FormEvent, Suspense } from "react";
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

const Family = {
  BertCan: "Bertella / Cantù",
  BertCaz: "Bertella / Cazzaniga",
  BertDat: "Bertella / Dati",
  BertMar: "Bertella / Martoccia",
  BertMer: "Bertella / Mercier",
  BertSal: "Bertella / Sala",
} as const;

function ProfileCard() {
  // get the current user.
  // this is safe because we've wrapped this component in an `AuthCheck` component.
  const { data: user } = useUser();
  const db = useFirestore();
  // read the user details from Firestore based on the current user's ID
  const userDetailsRef = db.collection("participants").doc(user.uid);
  const { displayName } = useFirestoreDocData<User>(userDetailsRef).data ?? {};

  const auth = useAuth();

  const writeUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const [displayName, email, family] = e.target;
    console.log(displayName.value, email.value, family.value);
    db.collection("participants").doc(user.uid).set({
      displayName: displayName.value,
      email: email.value,
      family: family.value,
    });
  };

  return (
    <Box mx="auto" maxWidth={500} py={3}>
      <Flex justifyContent="flex-end">
        <Button size="sm" onClick={() => auth.signOut()}>
          Log out
        </Button>
      </Flex>
      <Intro />
      {displayName ? (
        <TextBox variant="h4">
          Ciao{" "}
          <TextBox
            use="span"
            bg={Color.TRANSPARENT_GREY_35}
            px={1}
            color={Color.WHITE}
            borderRadius="input"
          >
            {displayName}
          </TextBox>
          ! A breve verrà estratto il nome a cui dovrai fare un regalo 🎁
        </TextBox>
      ) : (
        <form onSubmit={writeUser}>
          <Input
            name="displayName"
            placeholder="Nome"
            defaultValue={user?.displayName ?? undefined}
            required
          />
          <Box pt={1} />
          <Input
            name="email"
            placeholder="Email"
            defaultValue={user?.email ?? undefined}
            required
          />
          <Box pt={1} />
          <InputSelect
            placeholder="Famiglia"
            options={Object.values(Family).map((fam) => ({
              label: fam,
              value: fam,
            }))}
            input={{
              name: "family",
              required: true,
            }}
          />
          <Box pt={1} />
          <Button type="submit">Partecipa al gioco!</Button>
        </form>
      )}
    </Box>
  );
}

export function ProfilePage() {
  return (
    <Suspense fallback="Loading...">
      <AuthCheck fallback={<Unauthenticated />}>
        <ProfileCard />
      </AuthCheck>
    </Suspense>
  );
}

export default ProfilePage;
