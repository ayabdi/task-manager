import { Provider } from "react-redux";
import { store } from "../store";
import type { AppProps } from "next/app";

import { appWithTranslation } from "next-i18next";
import React from "react";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <div dir={router.locale === "ar" ? "rtl" : "ltr"}>
        <AnimatePresence mode="wait">
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </div>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
