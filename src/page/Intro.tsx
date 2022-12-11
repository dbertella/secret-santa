import { Box } from "@revolut/ui-kit";
import { ReactNode } from "react";

export const Intro = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Box>
        È giunto il tempo di Secret Santa versione Natale 2022
        <br />
        <br />
        Che cos'è Secret Santa? Il gioco consiste nel decidere un budget e fare
        un regalo a una persona che ti verrà assegnata random da questo sito, se
        tutto va bene e non ci sono 🐛 (bugs) dovrebbe essere una persona di
        un'altra famiglia, in caso contrario conttattami che vedo di fare
        qualcosa a riguardo.
        <br />
        <br />
        Quest'anno potremo finalmente vederci tutti insieme per Natale quindi i
        regali ce li scambiamo di persona! 🎉
        <br />
        <br />
        Se ci aspettate e ci vediamo li possiamo scambiare il 26 sera o il 27 a
        pranzo non so bene quando e se ci vedremo in quei giorni
        <br />
        <br />
        Che ne dici? Vuoi giocare?
        <br />
        <br />
        Non ti resta che fare login con google o registrarti con email and
        password e aspettare l'estrazione del nome!
      </Box>
      {children}
    </>
  );
};
