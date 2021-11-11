import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";

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
    return <div>err: {err.message}</div>;
  }
  if (
    router.isFallback ||
    !userRepos?.user ||
    !userRepos.user.repositories.nodes
  ) {
    return <div>loading...</div>;
  }
  const repos = userRepos.user.repositories.nodes.map((node) => {
    return <li key={node?.name}>{node?.name}</li>;
  });
  return (
    <>
      <div>user: {userRepos.user.name}</div>
      <div>
        repos: <ul>{repos}</ul>
      </div>
      <div>generatedAt: {generatedAt}</div>
    </>
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
  // revalidate: 10,
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
