import { Color, Text } from "@revolut/ui-kit";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { User } from "./Layout";

export function SecretSection() {
  const { data: user } = useUser();
  const db = useFirestore();

  const secretRef = db.collection("secretsSantas21").doc(user.uid);
  const { secretSanta } =
    useFirestoreDocData<{ secretSanta: string }>(secretRef).data ?? {};

  const secretUserRef = db.collection("participants").doc(secretSanta);
  const userData = useFirestoreDocData<User>(secretUserRef);
  const { displayName, address } = userData.data ?? {};

  return (
    <>
      <Text use="h3" mt={3}>
        {displayName ? (
          <>
            Il tuo Secret Santa è:{" "}
            <Text
              bg={Color.TRANSPARENT_GREY_35}
              px={1}
              color={Color.WHITE}
              borderRadius="input"
            >
              {displayName}
            </Text>
          </>
        ) : (
          <Text>A breve l'estrazione, stay tuned!</Text>
        )}
      </Text>
      {address && (
        <>
          <Text my={2}>
            In caso volessi spedire il tuo regalo questo è l'indirizzo:
          </Text>
          <Text
            use="span"
            bg={Color.TRANSPARENT_GREY_50}
            p={1}
            color={Color.WHITE}
          >
            {address}
          </Text>
        </>
      )}
    </>
  );
}
