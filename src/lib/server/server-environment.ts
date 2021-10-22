import { withHydrateDatetime } from "relay-nextjs/date";
import {
  Environment,
  GraphQLResponse,
  INetwork,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";

const REACT_APP_GITHUB_AUTH_TOKEN =
  process.env.NEXT_PUBLIC_REACT_APP_GITHUB_AUTH_TOKEN;

export function createServerNetwork(): INetwork {
  return Network.create(async (params, variables) => {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });

    const data = JSON.parse(
      JSON.stringify(response),
      withHydrateDatetime
    ) as GraphQLResponse;

    return data;
  });
}

// Optional: this function can take a token used for authentication and pass it into `createServerNetwork`.
export function createServerEnvironment(): Environment {
  return new Environment({
    network: createServerNetwork(),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}
