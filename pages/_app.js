import React, { useEffect } from "react";
import Head from "next/head";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib/queryClient";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
