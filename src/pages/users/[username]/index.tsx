import { GetStaticPaths, GetStaticProps } from "next";

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
