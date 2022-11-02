import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextNProgress
        showOnShallow={true}
        color={"#f53d2d"}
        options={{
          showSpinner: false,
        }}
      />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
