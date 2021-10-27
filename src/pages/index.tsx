import { Container, Box } from "@chakra-ui/react";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container maxW="container.xl">
      <Box p={4}>Hello, world</Box>
    </Container>
  );
};

export default Home;
