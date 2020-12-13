import { Box, BoxProps, TextBox } from "@revolut/ui-kit";
import { Footer } from "../Footer";

export type User = {
  displayName: string;
  email: string;
  family: string;
  emoji?: string;
  address?: string;
};

export const Layout = ({ children, ...rest }: BoxProps) => {
  return (
    <Box mx="auto" maxWidth={500} p={3} {...rest}>
      <TextBox variant="h2" my={2}>
        Bertella's Secret Santa 🎅🏽
      </TextBox>
      {children}
      <Box pt={3} />
      <Footer />
    </Box>
  );
};
