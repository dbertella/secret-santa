import { Box, BoxProps, Text } from "@revolut/ui-kit";
import { Footer } from "../Footer";

export type User = {
  NO_ID_FIELD: string;
  displayName: string;
  email: string;
  family: string;
  emoji?: string;
  address?: string;
};

export const Layout = ({ children, ...rest }: BoxProps) => {
  return (
    <Box mx="auto" maxWidth={500} p="s-6" {...rest}>
      <Text variant="h2" my="s-2">
        Bertella's Secret Santa 🎅🏽
      </Text>
      {children}
      <Box pt="s-6" />
      <Footer />
    </Box>
  );
};
