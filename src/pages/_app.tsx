import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { RelayEnvironmentProvider } from "react-relay";

import initEnvironment from "lib/relay-environment";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { environment } = initEnvironment();
  return (
    <ChakraProvider>
      <Head>
        <title>github releases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RelayEnvironmentProvider environment={environment}>
        <Component {...pageProps} />
      </RelayEnvironmentProvider>
    </ChakraProvider>
  );
}
export default MyApp;
