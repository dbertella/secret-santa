import { Box, Button } from "@revolut/ui-kit";
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

type User = {
  displayName: string;
  email: string;
};

function ProfileCard() {
  // get the current user.
  // this is safe because we've wrapped this component in an `AuthCheck` component.
  const { data: user } = useUser();
  const db = useFirestore();

  // read the user details from Firestore based on the current user's ID
  const userDetailsRef = db.collection("users").doc(user.uid);

  const { displayName, email } =
    useFirestoreDocData<User>(userDetailsRef).data ?? {};
  console.log(user, userDetailsRef);

  // // defend against null field(s)
  // profileImagePath = profileImagePath || DEFAULT_IMAGE_PATH;

  // if (!commonName || !favoriteAnimal) {
  //   throw new Error("Missing Profile Info Error");
  // }
  const auth = useAuth();

  const writeUser = () =>
    db.collection("users").doc(user.uid).set({
      displayName: user?.displayName,
      email: user?.email,
    });

  return (
    <Box>
      <Button onClick={() => auth.signOut()}>Log out</Button>
      <Button onClick={writeUser}>Write user</Button>
      <h1>{displayName}</h1>
      <p>{email}</p>
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
