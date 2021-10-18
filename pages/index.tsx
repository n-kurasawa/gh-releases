import { Box, Container } from "@chakra-ui/layout";
import { useEffect, useState } from "react";

import { fetchGraphQL } from "../lib/fetch-graphql";

import type { NextPage } from "next";

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
    <Container maxW="container.xl">
      <Box p={4}>{name != null ? `Repository: ${name}` : "Loading"}</Box>
    </Container>
  );
};

export default Home;
