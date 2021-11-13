import { Container, Box } from "@chakra-ui/layout";
import React, { ReactNode } from "react";

import { WithSubnavigation } from "./header";

export const Layout: React.VFC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <WithSubnavigation />
      <Container maxW="container.xl">
        <Box p={4}>{children}</Box>
      </Container>
    </>
  );
};
