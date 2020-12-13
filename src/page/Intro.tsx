import { TextBox } from "@revolut/ui-kit";
import { ReactNode } from "react";

export const Intro = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <TextBox>
        Quest'anno visto che noi non ci vedremo 😭 e non so se voi riuscirete a
        vedervi volevamo proporvi questo gioco.
        <br />
        <br />
        Si chiama Secret Santa, e consiste nel decidere un budget (pensavamo{" "}
        <strong>20 euro</strong>) e fare un regalo a una persona che vi verrà
        assegnata random da questo sito (una volta che avrò implementato questa
        feature).
        <br />
        <br />
        I regali si possono spedire a casa dell'interessato o magari pensavo li
        portiamo a casa del babbo e poi li recupererete tutti per natale.
        <br />
        <br />
        Il mittente del regalo sarà segreto nessuno tranne voi saprete chi ha
        regalato cosa a chi, poi vediamo cosa ne salta fuori. Che ne dite?
        Volete giocare?
        <br />
        <br />
        Non ti resta che fare login con google o registrarti con email and
        password e aspettare l'estrazione del nome!
        <br />
        <br />
        P.S. Se non sei convinto scopri di più su{" "}
        <a href="https://www.wikihow.it/Fare-un-Secret-Santa">Secret Santa</a>
      </TextBox>
      {children}
    </>
  );
};
