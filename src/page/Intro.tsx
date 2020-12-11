import { Box, TextBox } from "@revolut/ui-kit";
import { sample } from "lodash";
import { ReactNode } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { smilyAndPeople } from "../allEmojis";

export type User = {
  displayName: string;
  email: string;
  family: string;
};

export const Intro = ({ children }: { children?: ReactNode }) => {
  const db = useFirestore();
  const participantsRef = db.collection("participants");

  const participants =
    useFirestoreCollectionData<User>(participantsRef).data ?? [];
  return (
    <>
      <TextBox variant="h2" my={2}>
        Bertella's Secret Santa 🎅🏽
      </TextBox>
      <TextBox>
        Il Secret Santa, o "Babbo Natale Segreto", ha come scopo l'alleggerire i
        costi e diffondere lo spirito natalizio facendo un regalo a qualcuno che
        magari non sarebbe nella tua abituale lista. Il gioco coinvolge un
        gruppo di persone che, ad estrazione, si faranno uno scambio di regali
        senza che sapere chi farà il dono a chi.{" "}
        <a href="https://www.wikihow.it/Fare-un-Secret-Santa">Leggi tutto</a>
      </TextBox>
      {children}
      <TextBox variant="h3" my={2}>
        Lista dei Partecipanti
      </TextBox>
      {participants.map((user, i) => (
        <TextBox key={user.displayName}>
          {++i}) {user.displayName} {sample(smilyAndPeople)}
        </TextBox>
      ))}
      <Box pt={5} />
    </>
  );
};
