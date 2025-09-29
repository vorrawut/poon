import { createContext } from "react";
import type { SupportedLanguage } from "../types";

export interface I18nContextValue {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
  isRTL: boolean;
}

export const I18nContext = createContext<I18nContextValue | undefined>(
  undefined,
);
