import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, LanguageIcon } from "@heroicons/react/24/outline";
import { useI18n } from "../../libs/i18n";
import { ThemeAwareButton, useTheme } from "../../core";
import { cn } from "../../libs/utils";
import type { SupportedLanguage } from "../../libs/i18n";

interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

const languageOptions: LanguageOption[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
  {
    code: "th",
    name: "Thai",
    nativeName: "ไทย",
    flag: "🇹🇭",
  },
];

interface LanguageSwitcherProps {
  variant?: "button" | "dropdown" | "compact";
  showFlag?: boolean;
  showNativeName?: boolean;
  className?: string;
}

export function LanguageSwitcher({
  variant = "dropdown",
  showFlag = true,
  showNativeName = true,
  className,
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useI18n();
  const { isPlayMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    languageOptions.find((lang) => lang.code === language) ||
    languageOptions[0];

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  // Button variant - simple toggle between languages
  if (variant === "button") {
    const otherLanguage =
      languageOptions.find((lang) => lang.code !== language) ||
      languageOptions[1];

    return (
      <ThemeAwareButton
        variant="outline"
        size="sm"
        onClick={() => handleLanguageChange(otherLanguage.code)}
        className={cn("flex items-center gap-2", className)}
      >
        {showFlag && <span className="text-lg">{otherLanguage.flag}</span>}
        <span>
          {showNativeName ? otherLanguage.nativeName : otherLanguage.name}
        </span>
      </ThemeAwareButton>
    );
  }

  // Compact variant - just flag or language code
  if (variant === "compact") {
    return (
      <div className={cn("relative", className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200",
            isPlayMode
              ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300",
          )}
        >
          {showFlag ? (
            <span className="text-sm">{currentLanguage.flag}</span>
          ) : (
            <span className="text-xs font-medium uppercase">
              {currentLanguage.code}
            </span>
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />

              {/* Dropdown */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  "absolute top-full right-0 mt-2 py-2 rounded-lg shadow-lg border z-50 min-w-[120px]",
                  isPlayMode
                    ? "bg-gray-900/95 backdrop-blur-sm border-white/20"
                    : "bg-white border-gray-200",
                )}
              >
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => handleLanguageChange(option.code)}
                    className={cn(
                      "w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors",
                      option.code === language
                        ? isPlayMode
                          ? "bg-purple-500/20 text-purple-300"
                          : "bg-blue-50 text-blue-700"
                        : isPlayMode
                          ? "text-white hover:bg-white/10"
                          : "text-gray-700 hover:bg-gray-50",
                    )}
                  >
                    <span className="text-base">{option.flag}</span>
                    <span>{option.nativeName}</span>
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Dropdown variant (default)
  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm",
          isPlayMode
            ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300",
        )}
      >
        {showFlag && <span className="text-base">{currentLanguage.flag}</span>}
        <span className="font-medium">
          {showNativeName ? currentLanguage.nativeName : currentLanguage.name}
        </span>
        <ChevronDownIcon
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute top-full right-0 mt-2 py-2 rounded-lg shadow-lg border z-50 min-w-[160px]",
                isPlayMode
                  ? "bg-gray-900/95 backdrop-blur-sm border-white/20"
                  : "bg-white border-gray-200",
              )}
            >
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  onClick={() => handleLanguageChange(option.code)}
                  className={cn(
                    "w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-colors",
                    option.code === language
                      ? isPlayMode
                        ? "bg-purple-500/20 text-purple-300"
                        : "bg-blue-50 text-blue-700"
                      : isPlayMode
                        ? "text-white hover:bg-white/10"
                        : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  <span className="text-lg">{option.flag}</span>
                  <div className="flex flex-col">
                    <span className="font-medium">{option.nativeName}</span>
                    <span
                      className={cn(
                        "text-xs",
                        option.code === language
                          ? isPlayMode
                            ? "text-purple-400"
                            : "text-blue-600"
                          : isPlayMode
                            ? "text-gray-400"
                            : "text-gray-500",
                      )}
                    >
                      {option.name}
                    </span>
                  </div>
                  {option.code === language && (
                    <div className="ml-auto">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          isPlayMode ? "bg-purple-400" : "bg-blue-500",
                        )}
                      />
                    </div>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Language indicator component for showing current language
export function LanguageIndicator({ className }: { className?: string }) {
  const { language } = useI18n();
  const { isPlayMode } = useTheme();
  const currentLanguage =
    languageOptions.find((lang) => lang.code === language) ||
    languageOptions[0];

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-2 py-1 rounded-md text-xs",
        isPlayMode ? "bg-white/10 text-white/80" : "bg-gray-100 text-gray-600",
        className,
      )}
    >
      <LanguageIcon className="w-3 h-3" />
      <span>{currentLanguage.flag}</span>
      <span className="font-medium">{currentLanguage.nativeName}</span>
    </div>
  );
}
