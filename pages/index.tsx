import { Box, Container } from "@chakra-ui/layout";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container maxW="container.xl">
      <Box p={4}>Hello, World</Box>
    </Container>
  );
};

export default Home;
