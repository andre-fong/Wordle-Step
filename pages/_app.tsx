import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import AnswerProvider from "@/components/AnswerContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AnswerProvider>
        <Header />
        <Component {...pageProps} />
        <ToastContainer />
      </AnswerProvider>
    </>
  );
}
