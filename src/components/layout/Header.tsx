import { useLocation } from "react-router-dom";
import { useUIStore } from "../../store/useUIStore";
import {
  ThemeAwareHeading,
  ThemeAwareText,
  ThemeAwareButton,
  useTheme,
} from "../../core";
import { ThemeToggle } from "../ui/ThemeToggle";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { useTranslation } from "../../libs/i18n";
import { Bars3Icon, PlusIcon, BellIcon } from "@heroicons/react/24/outline";
import { cn } from "../../libs/utils";

// Use translation keys instead of hardcoded titles
const getPageTitle = (path: string, t: (key: string) => string): string => {
  const titleMap: Record<string, string> = {
    "/": t("common.navigation.universe"),
    "/universe": t("common.navigation.universe"),
    "/dashboard": t("common.navigation.dashboard"),
    "/accounts": t("common.navigation.accounts"),
    "/portfolio": t("common.navigation.portfolio"),
    "/money-flow": t("common.navigation.moneyFlow"),
    "/spending": t("common.navigation.spending"),
    "/imports": t("common.navigation.import"),
    "/time-machine": t("common.navigation.timeMachine"),
    "/future": t("common.navigation.future"),
    "/thai-culture": t("common.navigation.thaiCulture"),
    "/settings": t("common.navigation.settings"),
  };
  return titleMap[path] || path;
};

export function Header() {
  const location = useLocation();
  const { t } = useTranslation();
  const {
    isMobile,
    toggleSidebar,
    openModal,
    sidebarCollapsed,
    setSidebarCollapsed,
  } = useUIStore();
  const { isPlayMode, themeMode } = useTheme();

  const title = getPageTitle(location.pathname, t);

  const handleQuickAction = () => {
    openModal("addTransaction");
  };

  return (
    <header
      className={cn(
        "border-b px-4 sm:px-6 py-4 transition-all duration-300 backdrop-blur-sm",
        // Theme-aware background and borders
        "bg-[var(--color-surface-primary)]/95 border-[var(--color-border-primary)]",
        // Play mode cosmic effects
        isPlayMode && "shadow-[0_0_20px_var(--color-mood-glow)]/10",
        isPlayMode &&
          themeMode === "dark" &&
          "bg-slate-900/95 border-purple-500/20",
        isPlayMode && themeMode === "light" && "bg-white/95 border-blue-200/50",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Mobile menu button */}
          {isMobile && (
            <ThemeAwareButton
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="p-2"
            >
              <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </ThemeAwareButton>
          )}

          {/* Desktop expand sidebar button when collapsed */}
          {!isMobile && sidebarCollapsed && (
            <ThemeAwareButton
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(false)}
              className={cn(
                "p-2 transition-all duration-200 group",
                // Play mode cosmic effects
                isPlayMode &&
                  "hover:shadow-[0_0_15px_var(--color-mood-glow)]/40",
              )}
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <svg
                className="h-6 w-6 transition-all duration-200 group-hover:scale-110 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7" // Double arrow right
                />
              </svg>
            </ThemeAwareButton>
          )}

          {/* Page title */}
          <div className="min-w-0 flex-1">
            <ThemeAwareHeading
              level="h1"
              className="text-lg sm:text-xl md:text-2xl font-bold truncate"
              gradient={isPlayMode}
            >
              {title}
            </ThemeAwareHeading>
            <ThemeAwareText
              className="text-xs sm:text-sm mt-0.5 hidden sm:block"
              color="secondary"
            >
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </ThemeAwareText>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick add button */}
          <ThemeAwareButton
            variant={isPlayMode ? "cosmic" : "primary"}
            size="sm"
            onClick={handleQuickAction}
            className="flex items-center space-x-1 sm:space-x-2"
            glow={isPlayMode}
          >
            <PlusIcon className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Add Transaction</span>
          </ThemeAwareButton>

          {/* Notifications */}
          <ThemeAwareButton variant="ghost" size="sm" className="relative p-2">
            <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          </ThemeAwareButton>

          {/* Language switcher */}
          <LanguageSwitcher variant="compact" />

          {/* Theme toggle */}
          <ThemeToggle className="h-10 w-10 sm:h-12 sm:w-12" />
        </div>
      </div>
    </header>
  );
}
