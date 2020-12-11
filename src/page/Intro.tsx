import { Box, TextBox } from "@revolut/ui-kit";
import { uniqBy, sample } from "lodash";
import { useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import { smilyAndPeople } from "../allEmojis";

export type User = {
  displayName: string;
  email: string;
};

export const Intro = () => {
  const db = useFirestore();
  const [participants, setParticipants] = useState<User[]>([]);

  useEffect(() => {
    db.collection("participants")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setParticipants((state) =>
            uniqBy([...state, doc.data() as User], "displayName")
          );
        });
      });
  }, [db]);
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
        senza che sapere chi farà il dono a chi. Prendi in considerazione l'idea
        di giocare a Secret Santa durante le vacanze natalizie, oppure leggi le
        istruzioni per capire come giocare, qualora fossi già stato invitato a
        farlo.{" "}
        <a href="https://www.wikihow.it/Fare-un-Secret-Santa">Leggi tutto</a>
      </TextBox>
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
