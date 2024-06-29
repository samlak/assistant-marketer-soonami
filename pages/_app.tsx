import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "@/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}
