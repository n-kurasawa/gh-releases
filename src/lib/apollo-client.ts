import { ApolloClient, InMemoryCache } from "@apollo/client";

const token = process.env.NEXT_PUBLIC_REACT_APP_GITHUB_AUTH_TOKEN;

export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: { authorization: `Bearer ${token}` },
});
