import { Box, VStack, Text } from "@revolut/ui-kit";
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
      <Text variant="h4">
        Ciao <Text use="strong">{displayName}!</Text> Tempo di pensare al regalo
        🎁
      </Text>
      <SecretSection />
      <Text variant="h3" my={2}>
        Lista dei Partecipanti
      </Text>
      <VStack space="s-4">
        {participants.map((user, i) => (
          <Text key={user.displayName}>
            {++i}) {user.displayName} {user.emoji ?? sample(smilyAndPeople)}
          </Text>
        ))}
      </VStack>
    </Box>
  );
}
