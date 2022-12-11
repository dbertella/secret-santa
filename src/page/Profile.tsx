import {
  Box,
  Button,
  Input,
  RadioSelect,
  TextArea,
  Text,
  VStack,
} from "@revolut/ui-kit";
import { useFirestoreDocData, useUser, useFirestore } from "reactfire";
import "firebase/auth";

import { User } from "./Layout";

import { smilyAndPeople } from "../allEmojis";
import { Controller, useForm } from "react-hook-form";
import { forwardRef, useRef, useState } from "react";
import { ChevronDown } from "@revolut/icons";

const Family = {
  BertCan: "Bertella / Cantù",
  BertCaz: "Bertella / Cazzaniga",
  BertDat: "Bertella / Dati",
  BertMar: "Bertella / Martoccia",
  BertMer: "Bertella / Mercier",
  BertSal: "Bertella / Sala",
} as const;

type SelectProps = {
  options: { label: string; value: string; key: string }[];
  value: string;
  message?: string;
  onChange: (x: string | null) => void;
  label: string;
};
const InputSelect = forwardRef<HTMLInputElement, SelectProps>(
  ({ options, value, onChange, label, message }, ref) => {
    const anchorRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    return (
      <>
        <Input
          ref={ref}
          type="button"
          label={label}
          containerRef={anchorRef}
          useIcon={ChevronDown}
          onClick={() => setOpen(!open)}
          value={value ? value : ""}
          aria-haspopup="listbox"
          aria-expanded={open}
          message={message}
        />
        <RadioSelect
          open={open}
          anchorRef={anchorRef}
          onClose={() => setOpen(false)}
          options={options}
          value={value}
          onChange={onChange}
          labelList="People"
          fitInAnchor
          searchable
        />
      </>
    );
  }
);

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
      <Text>Puoi cambiare il tuo nome o scegliere la tua emoji personale</Text>
      <Box pt="s-2" />
      <form onSubmit={handleSubmit(writeUser)}>
        <VStack space="s-16">
          <Input
            name="displayName"
            placeholder="Nome"
            ref={register({ required: true })}
            defaultValue={displayName ?? user?.displayName ?? undefined}
          />
          <Input
            name="email"
            placeholder="Email"
            ref={register({ required: true })}
            defaultValue={user?.email ?? undefined}
          />
          <Controller
            render={(field) => (
              <InputSelect
                {...field}
                label="Famiglia"
                options={Object.values(Family).map((fam) => ({
                  label: fam,
                  value: fam,
                  key: fam,
                }))}
              />
            )}
            control={control}
            rules={{ required: true }}
            name="family"
            defaultValue={family ?? ""}
          />
          <Controller
            render={(field) => (
              <InputSelect
                {...field}
                label="Emoji"
                options={Object.values(smilyAndPeople).map((em) => ({
                  label: em,
                  value: em,
                  key: em,
                }))}
                message="Scegli una emoji da associare al tuo nome"
              />
            )}
            control={control}
            name="emoji"
            defaultValue={emoji ?? ""}
          />
          <TextArea
            name="address"
            placeholder="Indirizzo"
            ref={register}
            defaultValue={address ?? ""}
            message="Aggiungi l'indirzzo se vuoi che il regalo ti venga spedito a casa"
          />
          <Button type="submit">
            {displayName ? "Aggiorna i tuoi dati" : "Partecipa al gioco!"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
