import { useContext } from "react";
import { I18nContext } from "../context/I18nContext";
import type { I18nContextValue } from "../context/I18nContext";

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);

  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}

// Convenience hook for translation function
export function useTranslation() {
  const { t, language } = useI18n();
  return { t, language };
}

// Hook for checking current language
export function useLanguage() {
  const { language, setLanguage } = useI18n();
  return { language, setLanguage };
}
