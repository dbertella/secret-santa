import { Color, TextBox } from "@revolut/ui-kit";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { User } from "./Layout";

export function SecretSection() {
  const { data: user } = useUser();
  const db = useFirestore();

  const secretRef = db.collection("secretsSantas").doc(user.uid);
  const { secretSanta } =
    useFirestoreDocData<{ secretSanta: string }>(secretRef).data ?? {};

  const secretUserRef = db.collection("participants").doc(secretSanta);
  const userData = useFirestoreDocData<User>(secretUserRef);
  const { displayName, address } = userData.data ?? {};

  return (
    <>
      <TextBox use="h3" mt={3}>
        Il tuo Secret Santa è:{" "}
        <TextBox
          use="span"
          bg={Color.TRANSPARENT_GREY_35}
          px={1}
          color={Color.WHITE}
          borderRadius="input"
        >
          {displayName}
        </TextBox>
      </TextBox>
      {address && (
        <>
          <TextBox my={2}>
            In caso volessi spedire il tuo regalo questo è l'indirizzo:
          </TextBox>
          <TextBox
            use="span"
            bg={Color.TRANSPARENT_GREY_50}
            p={1}
            color={Color.WHITE}
          >
            {address}
          </TextBox>
        </>
      )}
    </>
  );
}
