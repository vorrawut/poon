import type { SupportedLanguage, TranslationParams } from "../types";
import { appTranslations } from "../translations";

/**
 * Get nested value from object using dot notation path
 * @param obj - The object to search in
 * @param path - Dot notation path (e.g., 'common.actions.save')
 * @returns The value at the path or undefined
 */
function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Replace parameters in translation string
 * @param text - The translation text with placeholders
 * @param params - Parameters to replace in the text
 * @returns Formatted text with parameters replaced
 */
function formatTranslation(text: string, params?: TranslationParams): string {
  if (!params) return text;

  let formattedText = text;
  Object.entries(params).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    formattedText = formattedText.replace(
      new RegExp(placeholder, "g"),
      String(value),
    );
  });

  return formattedText;
}

/**
 * Get translation for a given path and language
 * @param path - Translation path (e.g., 'common.actions.save')
 * @param language - Target language
 * @param params - Optional parameters for string formatting
 * @returns Translated text
 */
export function getTranslation(
  path: string,
  language: SupportedLanguage,
  params?: TranslationParams,
): string {
  try {
    const translationObj = getNestedValue(appTranslations, path);

    if (!translationObj) {
      console.warn(`Translation not found for path: ${path}`);
      return path; // Return the path as fallback
    }

    if (typeof translationObj === "string") {
      console.warn(
        `Translation path ${path} should be an object with language keys, got string`,
      );
      return translationObj;
    }

    if (typeof translationObj === "object" && translationObj[language]) {
      const text = translationObj[language];
      return formatTranslation(text, params);
    }

    // Fallback to English if translation not found for current language
    if (language !== "en" && translationObj.en) {
      console.warn(
        `Translation not found for ${language}, falling back to English for path: ${path}`,
      );
      const text = translationObj.en;
      return formatTranslation(text, params);
    }

    console.warn(
      `No translation found for path: ${path} in language: ${language}`,
    );
    return path;
  } catch (error) {
    console.error(`Error getting translation for path: ${path}`, error);
    return path;
  }
}

/**
 * Check if a translation key exists
 * @param path - Translation path to check
 * @param language - Target language (optional, checks both if not provided)
 * @returns True if translation exists
 */
export function hasTranslation(
  path: string,
  language?: SupportedLanguage,
): boolean {
  try {
    const translationObj = getNestedValue(appTranslations, path);

    if (!translationObj || typeof translationObj !== "object") {
      return false;
    }

    if (language) {
      return !!translationObj[language];
    }

    // Check if at least one language is available
    return !!(translationObj.en || translationObj.th);
  } catch {
    return false;
  }
}

/**
 * Get all available languages for a translation path
 * @param path - Translation path
 * @returns Array of available languages
 */
export function getAvailableLanguages(path: string): SupportedLanguage[] {
  try {
    const translationObj = getNestedValue(appTranslations, path);

    if (!translationObj || typeof translationObj !== "object") {
      return [];
    }

    const languages: SupportedLanguage[] = [];
    if ("en" in translationObj && translationObj.en) languages.push("en");
    if ("th" in translationObj && translationObj.th) languages.push("th");

    return languages;
  } catch {
    return [];
  }
}

/**
 * Validate translation completeness
 * @returns Object with missing translations information
 */
export function validateTranslations() {
  const missingTranslations: {
    path: string;
    missingLanguages: SupportedLanguage[];
  }[] = [];

  function checkObject(obj: any, currentPath = "") {
    for (const [key, value] of Object.entries(obj)) {
      const fullPath = currentPath ? `${currentPath}.${key}` : key;

      if (value && typeof value === "object") {
        // Check if this is a translation object (has language keys)
        if ("en" in value || "th" in value) {
          const missing: SupportedLanguage[] = [];
          if (!("en" in value) || !(value as any).en) missing.push("en");
          if (!("th" in value) || !(value as any).th) missing.push("th");

          if (missing.length > 0) {
            missingTranslations.push({
              path: fullPath,
              missingLanguages: missing,
            });
          }
        } else {
          // Recursively check nested objects
          checkObject(value, fullPath);
        }
      }
    }
  }

  checkObject(appTranslations);

  return {
    isComplete: missingTranslations.length === 0,
    missingTranslations,
    totalChecked: missingTranslations.length,
  };
}
