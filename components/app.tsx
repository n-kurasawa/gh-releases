import { Box, Container } from "@chakra-ui/layout";
import graphql from "babel-plugin-relay/macro";
import React, { FC } from "react";
import { PreloadedQuery, usePreloadedQuery } from "react-relay/hooks";
import { OperationType } from "relay-runtime";

export const RepositoryNameQuery = graphql`
  query appRepositoryNameQuery {
    repository(owner: "facebook", name: "relay") {
      name
    }
  }
`;

export const App: FC<{ preloadedQuery: PreloadedQuery<OperationType> }> = ({
  preloadedQuery,
}) => {
  const data = usePreloadedQuery(RepositoryNameQuery, preloadedQuery);
  return (
    <Container maxW="container.xl">
      <Box p={4}>{data.repository.name}</Box>
    </Container>
  );
};
