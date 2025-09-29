// Main i18n exports
export { I18nProvider } from "./providers/I18nProvider";
export { useI18n, useTranslation, useLanguage } from "./hooks/useI18n";
export { I18nContext } from "./context/I18nContext";

// Translation utilities
export {
  getTranslation,
  hasTranslation,
  getAvailableLanguages,
  validateTranslations,
} from "./utils/translationUtils";

// Translation data
export { appTranslations } from "./translations";

// Types
export type {
  SupportedLanguage,
  TranslationKey,
  TranslationPath,
  TranslationParams,
  AppTranslations,
  CommonTranslations,
  FeatureTranslations,
} from "./types";
export type { I18nContextValue } from "./context/I18nContext";
