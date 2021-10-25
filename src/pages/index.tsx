import { Container, Box } from "@chakra-ui/react";
import { graphql } from "relay-runtime";

import type { NextPage } from "next";

const RepositoryNameQuery = graphql`
  query AppRepositoryNameQuery {
    repository(owner: "facebook", name: "relay") {
      name
    }
  }
`;

const Home: NextPage = () => {
  return (
    <Container maxW="container.xl">
      <Box p={4}>Hello, World</Box>
    </Container>
  );
};

export default Home;
