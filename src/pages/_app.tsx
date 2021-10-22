import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { getInitialPreloadedQuery, getRelayProps } from "relay-nextjs/app";

import { getClientEnvironment } from "../lib/client-environment";

import type { AppProps } from "next/app";

const clientEnv = getClientEnvironment();
const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getClientEnvironment()!,
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const relayProps = getRelayProps(pageProps, initialPreloadedQuery);
  const env = relayProps.preloadedQuery?.environment ?? clientEnv!;

  return (
    <ChakraProvider>
      <Head>
        <title>github releases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RelayEnvironmentProvider environment={env}>
        <Component {...pageProps} {...relayProps} />
      </RelayEnvironmentProvider>
    </ChakraProvider>
  );
}
export default MyApp;
