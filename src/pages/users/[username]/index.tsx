import { ListItem, UnorderedList } from "@chakra-ui/layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";

import { Layout } from "@/components/layout";
import {
  UserRepositoryDocument,
  UserRepositoryQuery,
} from "@/generated/graphql";
import { client } from "@/lib/apollo-client";
import { now } from "@/utils/date";

type StaticProps = {
  userRepos: UserRepositoryQuery | null;
  err: { message: string } | null;
  generatedAt: string;
};

const Page: NextPage<StaticProps> = ({ userRepos, err, generatedAt }) => {
  const router = useRouter();
  if (err) {
    return (
      <Layout>
        <div>err: {err.message}</div>
      </Layout>
    );
  }
  if (
    router.isFallback ||
    !userRepos?.user ||
    !userRepos.user.repositories.nodes
  ) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }
  const repos = userRepos.user.repositories.nodes.map((node) => {
    return <ListItem key={node?.name}>{node?.name}</ListItem>;
  });
  return (
    <Layout>
      <div>user: {userRepos.user.name}</div>
      <div>
        repos: <UnorderedList>{repos}</UnorderedList>
      </div>
      <div>generatedAt: {generatedAt}</div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

const propsFactory = (injects?: Partial<StaticProps>) => ({
  props: {
    userRepos: null,
    err: null,
    generatedAt: now(),
    ...injects,
  },
  revalidate: 10,
});

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const username = context.params?.username;
  if (typeof username !== "string") {
    return propsFactory({
      err: { message: "Bad Request" },
    });
  }

  try {
    const { data } = await client.query({
      query: UserRepositoryDocument,
      variables: { login: username },
    });
    return propsFactory({
      userRepos: data,
    });
  } catch (e: unknown) {
    let err = {
      message: "Error",
    };
    if (e instanceof Error) {
      err = {
        message: e.message,
      };
    }
    return propsFactory({
      err,
    });
  }
};

export default Page;
