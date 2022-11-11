import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "../redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

import "../components/index.scss";
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextNProgress
        showOnShallow={true}
        // color={"#f53d2d"}
        options={{
          showSpinner: false,
        }}
      />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
