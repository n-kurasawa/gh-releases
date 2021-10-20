import { RequestParameters, Variables } from "relay-runtime";

export async function fetchGraphQL(
  text: RequestParameters["text"],
  variables?: Variables
): Promise<any> {
  const REACT_APP_GITHUB_AUTH_TOKEN =
    process.env.NEXT_PUBLIC_REACT_APP_GITHUB_AUTH_TOKEN;

  // Fetch data from GitHub's GraphQL API:
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}