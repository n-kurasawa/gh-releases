import { Container, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { usePreloadedQuery, useQueryLoader } from "react-relay";
import { graphql } from "relay-runtime";

import type { NextPage } from "next";

const RepositoryNameQuery = graphql`
  query pagesRepositoryNameQuery {
    repository(owner: "facebook", name: "relay") {
      name
    }
  }
`;

const Home: NextPage = () => {
  const [queryReference, loadQuery] = useQueryLoader(RepositoryNameQuery);
  useEffect(() => {
    if (!queryReference) {
      loadQuery({});
    }
  }, [queryReference, loadQuery]);

  return (
    <Container maxW="container.xl">
      {queryReference ? <App queryRef={queryReference} /> : null}
    </Container>
  );
};

const App = ({ queryRef }) => {
  console.log(queryRef);
  const data = usePreloadedQuery(RepositoryNameQuery, queryRef);
  console.log(data);
  return <Box p={4}>Hello, world</Box>;
};

export default Home;
