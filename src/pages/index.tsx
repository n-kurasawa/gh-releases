import { useQuery } from "@apollo/client";
import {
  Container,
  Box,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import {
  IndexDocument,
  RepositoryDocument,
  RepositoryQuery,
} from "@/generated/graphql";
import { client } from "@/lib/apollo-client";

import type { GetStaticProps, NextPage } from "next";

const Home: NextPage<RepositoryQuery> = (props) => {
  const { data, loading, error } = useQuery(IndexDocument);
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

  const repos = props.repositoryOwner?.repositories.edges?.map((repo) => {
    return <ListItem key={repo?.node?.name}>{repo?.node?.name}</ListItem>;
  });

  return (
    <Container maxW="container.xl">
      <Box p={4}>
        <Heading mb={4}>{data?.viewer.login}</Heading>
        <UnorderedList>{repos}</UnorderedList>
      </Box>
    </Container>
  );
};

export const getStaticProps: GetStaticProps<RepositoryQuery> = async () => {
  const { data } = await client.query({
    query: RepositoryDocument,
    variables: { login: "n-kurasawa" },
  });
  return {
    props: data,
  };
};

export default Home;
