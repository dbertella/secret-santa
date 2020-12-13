import { Box, Button, TextBox } from "@revolut/ui-kit";
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
        <TextBox use="h3">Ciao {user.displayName}</TextBox>
        <TextBox pt={2}>
          Questa è una pagina di admin non dovresti essere qui 😘
        </TextBox>
      </>
    );
  }

  const writeNames = () => {
    const choices = mySecretSanta(participants);
    console.log(choices);
    participants.forEach((p) => {
      db.collection("secretsSantas")
        .doc(p.NO_ID_FIELD)
        .set({ secretSanta: choices[p.NO_ID_FIELD] });
    });
  };
  return (
    <>
      <TextBox use="h3">Ciao {user.displayName}</TextBox>
      <TextBox pt={2}>
        È ora di generare i nomi per Bertella's Secret Santa{" "}
        {TODAY.getFullYear()}
      </TextBox>
      <TextBox pt={2}>
        Schiaccia il bottone rosso per generare i vari Secret Santas
      </TextBox>
      <Box pt={2} />
      <Button bg="red" onClick={writeNames}>
        Push the button
      </Button>
    </>
  );
};
