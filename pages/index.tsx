import { Box, Container } from "@chakra-ui/layout";
import graphql from "babel-plugin-relay/macro";
import React, { FC, Suspense, useEffect, useState } from "react";
import {
  loadQuery,
  PreloadedQuery,
  RelayEnvironmentProvider,
  usePreloadedQuery,
} from "react-relay/hooks";
import { OperationType } from "relay-runtime";

import { fetchGraphQL } from "../lib/fetch-graphql";
import { RelayEnvironment } from "../lib/relay-environment";

import type { NextPage } from "next";

const RepositoryNameQuery = graphql`
  query AppRepositoryNameQuery {
    repository(owner: "facebook", name: "relay") {
      name
    }
  }
`;

const preloadedQuery = loadQuery(RelayEnvironment, RepositoryNameQuery, {
  /* query variables */
});

const App: FC<{ preloadedQuery: PreloadedQuery<OperationType> }> = ({
  preloadedQuery,
}) => {
  const data = usePreloadedQuery(RepositoryNameQuery, preloadedQuery);
  return (
    <Container maxW="container.xl">
      <Box p={4}>{data.repository.name}</Box>
    </Container>
  );
};

const Home: NextPage = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(`
      query RepositoryNameQuery {
        # feel free to change owner/name here
        repository(owner: "facebook" name: "relay") {
          name
        }
      }
    `)
      .then((response) => {
        // Avoid updating state if the component unmounted before the fetch completes
        if (!isMounted) {
          return;
        }
        const data = response.data;
        setName(data.repository.name);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={"Loading..."}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

export default Home;
