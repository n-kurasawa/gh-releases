import { Container, Box } from "@chakra-ui/react";

import { useIndexQuery } from "generated/graphql";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data, loading, error } = useIndexQuery();
  if (loading) {
    return (
      <Container maxW="container.xl">
        <Box p={4}>
          <div>loading...</div>
        </Box>
      </Container>
    );
  }

  if (error) {
    console.error(error);
    return (
      <Container maxW="container.xl">
        <Box p={4}>
          <div>error</div>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl">
      <Box p={4}>{data?.viewer.login}</Box>
    </Container>
  );
};

export default Home;
