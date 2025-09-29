import React, { useState, useEffect, useMemo } from "react";
import { I18nContext } from "../context/I18nContext";
import { getTranslation } from "../utils/translationUtils";
import type { SupportedLanguage, TranslationParams } from "../types";

interface I18nProviderProps {
  children: React.ReactNode;
  defaultLanguage?: SupportedLanguage;
}

// Language detection and persistence
const LANGUAGE_STORAGE_KEY = "app-language";

function detectBrowserLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";

  const browserLang = navigator.language.toLowerCase();

  // Check for Thai language
  if (browserLang.startsWith("th")) {
    return "th";
  }

  // Default to English
  return "en";
}

function getStoredLanguage(): SupportedLanguage | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && (stored === "en" || stored === "th")) {
      return stored as SupportedLanguage;
    }
  } catch (error) {
    console.warn("Failed to read language from localStorage:", error);
  }

  return null;
}

function storeLanguage(language: SupportedLanguage): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.warn("Failed to store language in localStorage:", error);
  }
}

export function I18nProvider({ children, defaultLanguage }: I18nProviderProps) {
  // Initialize language with priority: stored > default > browser > 'en'
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    return getStoredLanguage() || defaultLanguage || detectBrowserLanguage();
  });

  // Update document language attribute
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = language === "th" ? "ltr" : "ltr"; // Both languages are LTR
    }
  }, [language]);

  // Translation function with memoization
  const t = useMemo(() => {
    return (path: string, params?: TranslationParams): string => {
      return getTranslation(path, language, params);
    };
  }, [language]);

  // Language setter with persistence
  const setLanguage = useMemo(() => {
    return (newLanguage: SupportedLanguage) => {
      if (newLanguage !== language) {
        setLanguageState(newLanguage);
        storeLanguage(newLanguage);
      }
    };
  }, [language]);

  // Context value
  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      isRTL: false, // Both supported languages are LTR
    }),
    [language, setLanguage, t],
  );

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
}
