import { Box, Color, TextBox } from "@revolut/ui-kit";
import { sample } from "lodash";
import { Redirect } from "react-router-dom";
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
  useUser,
} from "reactfire";
import { User } from "./Layout";
import { SecretSection } from "./SecretSection";
import { smilyAndPeople } from "../allEmojis";

export function Home() {
  // get the current user.
  // this is safe because we've wrapped this component in an `AuthCheck` component.
  const { data: user } = useUser();
  const db = useFirestore();
  const participantsRef = db.collection("participants");
  const participants =
    useFirestoreCollectionData<User>(participantsRef).data ?? [];
  // read the user details from Firestore based on the current user's ID
  const userDetailsRef = db.collection("participants").doc(user.uid);
  const userData = useFirestoreDocData<User>(userDetailsRef);
  const { displayName } = userData.data ?? {};
  if (userData.status === "success" && !displayName) {
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
        Tempo di pensare al regalo 🎁
      </TextBox>
      <SecretSection />
      <TextBox variant="h3" my={2}>
        Lista dei Partecipanti
      </TextBox>
      {participants.map((user, i) => (
        <TextBox key={user.displayName}>
          {++i}) {user.displayName} {user.emoji ?? sample(smilyAndPeople)}
        </TextBox>
      ))}
    </Box>
  );
}
