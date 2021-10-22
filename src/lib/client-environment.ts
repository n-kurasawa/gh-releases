import { getRelaySerializedState } from "relay-nextjs";
import { withHydrateDatetime } from "relay-nextjs/date";
import {
  Environment,
  Network,
  Store,
  RecordSource,
  INetwork,
} from "relay-runtime";

const REACT_APP_GITHUB_AUTH_TOKEN =
  process.env.NEXT_PUBLIC_REACT_APP_GITHUB_AUTH_TOKEN;

export function createClientNetwork(): INetwork {
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

    const json = await response.text();
    return JSON.parse(json, withHydrateDatetime);
  });
}

let clientEnv: Environment | undefined;
export function getClientEnvironment(): Environment | null {
  if (typeof window === "undefined") return null;

  if (clientEnv == null) {
    clientEnv = new Environment({
      network: createClientNetwork(),
      store: new Store(new RecordSource(getRelaySerializedState()?.records)),
      isServer: false,
    });
  }

  return clientEnv;
}
