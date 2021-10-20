import React, { Suspense } from "react";
import { loadQuery, RelayEnvironmentProvider } from "react-relay/hooks";

import { App, RepositoryNameQuery } from "../components/app";
import { RelayEnvironment } from "../lib/relay-environment";

import type { NextPage } from "next";

const preloadedQuery = loadQuery(RelayEnvironment, RepositoryNameQuery, {
  /* query variables */
});

const Home: NextPage = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={"Loading..."}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

export default Home;
