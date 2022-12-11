import { Box, Button, Text } from "@revolut/ui-kit";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { mySecretSanta } from "../utils/secretSantaList";
import { User } from "./Layout";

const TODAY = new Date();

export const Admin = () => {
  const db = useFirestore();
  const participantsRef = db.collection("participants");
  const { data: user } = useUser();

  const participants =
    useFirestoreCollectionData<User>(participantsRef).data ?? [];

  if (user.displayName !== process.env.REACT_APP_ADMIN_NAME) {
    return (
      <>
        <Text use="h3">Ciao {user.displayName}</Text>
        <Text pt="s-2">
          Questa è una pagina di admin non dovresti essere qui 😘
        </Text>
      </>
    );
  }

  const writeNames = () => {
    const choices = mySecretSanta(participants);
    console.log(choices);
    participants.forEach((p) => {
      db.collection("secretsSantas21")
        .doc(p.NO_ID_FIELD)
        .set({ secretSanta: choices[p.NO_ID_FIELD] });
    });
  };
  return (
    <>
      <Text use="h3">Ciao {user.displayName}</Text>
      <Text pt="s-2">
        È ora di generare i nomi per Bertella's Secret Santa{" "}
        {TODAY.getFullYear()}
      </Text>
      <Text pt="s-2">
        Schiaccia il bottone rosso per generare i vari Secret Santas
      </Text>
      <Box pt="s-2" />
      <Button bg="red" onClick={writeNames}>
        Push the button
      </Button>
    </>
  );
};
