import {
  Box,
  Button,
  Input,
  InputSelect,
  TextArea,
  TextBox,
} from "@revolut/ui-kit";
import { useFirestoreDocData, useUser, useFirestore } from "reactfire";
import "firebase/auth";

import { User } from "./Layout";

import { smilyAndPeople } from "../allEmojis";
import { Controller, useForm } from "react-hook-form";

const Family = {
  BertCan: "Bertella / Cantù",
  BertCaz: "Bertella / Cazzaniga",
  BertDat: "Bertella / Dati",
  BertMar: "Bertella / Martoccia",
  BertMer: "Bertella / Mercier",
  BertSal: "Bertella / Sala",
} as const;

export function ProfileCard() {
  const { register, handleSubmit, control } = useForm<User>();

  const { data: user } = useUser();
  const db = useFirestore();
  // read the user details from Firestore based on the current user's ID
  const userDetailsRef = db.collection("participants").doc(user.uid);
  const userData = useFirestoreDocData<User>(userDetailsRef);
  const { displayName, family, emoji, address } = userData.data ?? {};
  const writeUser = (data: User) => {
    db.collection("participants").doc(user.uid).set(data);
  };
  if (userData.status === "loading") {
    return <Box>Loading ...</Box>;
  }
  return (
    <Box>
      <TextBox>
        Puoi cambiare il tuo nome o scegliere la tua emoji personale
      </TextBox>
      <Box pt={2} />
      <form onSubmit={handleSubmit(writeUser)}>
        <Input
          name="displayName"
          placeholder="Nome"
          ref={register({ required: true })}
          defaultValue={displayName ?? user?.displayName ?? undefined}
        />
        <Box pt={1} />
        <Input
          name="email"
          placeholder="Email"
          ref={register({ required: true })}
          defaultValue={user?.email ?? undefined}
        />
        <Box pt={1} />
        <Controller
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
          message="Scegli una emoji da associare al tuo nome"
        />
        <Box pt={1} />
        <TextArea
          name="address"
          placeholder="Indirizzo"
          ref={register}
          defaultValue={address ?? ""}
          message="Aggiungi l'indirzzo se vuoi che il regalo ti venga spedito a casa"
        />
        <Box pt={1} />
        <Button type="submit">
          {displayName ? "Aggiorna i tuoi dati" : "Partecipa al gioco!"}
        </Button>
      </form>
    </Box>
  );
}
