import { useTranslation } from "next-i18next";

import Link from "next/link";
import React from 'react'
import { useRouter } from "next/navigation";

const Header = () => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const switchLanguage = (locale: string) => {
   // router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <header>
      <nav>
        <button onClick={() => switchLanguage("en")}>EN</button>
        <button onClick={() => switchLanguage("ar")}>AR</button>
      </nav>

      <h1>{t("welcome")}</h1>
    </header>
  );
};

export default Header;
