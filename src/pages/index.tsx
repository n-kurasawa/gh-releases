import { useQuery } from "@apollo/client";
import { Heading, UnorderedList, ListItem } from "@chakra-ui/react";

import { Layout } from "@/components/layout";
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
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    console.error(error);
    return (
      <Layout>
        <div>error</div>
      </Layout>
    );
  }

  const repos = props.repositoryOwner?.repositories.edges?.map((repo) => {
    return <ListItem key={repo?.node?.name}>{repo?.node?.name}</ListItem>;
  });

  return (
    <Layout>
      <Heading mb={4}>{data?.viewer.login}</Heading>
      <UnorderedList>{repos}</UnorderedList>
    </Layout>
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
