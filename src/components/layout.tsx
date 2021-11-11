import { Container, Box } from "@chakra-ui/layout";
import { ReactNode } from "react";

export const Layout: React.VFC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Container maxW="container.xl">
      <Box p={4}>{children}</Box>
    </Container>
  );
};
