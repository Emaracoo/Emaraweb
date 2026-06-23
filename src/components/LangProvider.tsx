"use client";

import { createContext, useContext } from "react";

export type Locale = "en" | "ar";

const LangCtx = createContext<Locale>("en");

export function LangProvider({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  return <LangCtx.Provider value={lang}>{children}</LangCtx.Provider>;
}

export function useLang(): Locale {
  return useContext(LangCtx);
}
