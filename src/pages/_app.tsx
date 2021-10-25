import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { RelayEnvironmentProvider } from "react-relay";

import { relayEnvironment } from "lib/relay-environment";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider>
      <Head>
        <title>github releases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RelayEnvironmentProvider environment={relayEnvironment}>
        <Component {...pageProps} />
      </RelayEnvironmentProvider>
    </ChakraProvider>
  );
}
export default MyApp;
