import { NavLink } from "react-router-dom";
import { useUIStore } from "../../store/useUIStore";
import { DualLensToggle } from "../widgets";
import { useTheme, ThemeAwareText } from "../../core";
import { cn } from "../../libs/utils";
import {
  HomeIcon,
  BanknotesIcon,
  ChartPieIcon,
  CreditCardIcon,
  DocumentArrowUpIcon,
  Cog6ToothIcon,
  XMarkIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  ClockIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Universe", href: "/", icon: GlobeAltIcon },
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Accounts", href: "/accounts", icon: BanknotesIcon },
  { name: "Portfolio", href: "/portfolio", icon: ChartPieIcon },
  { name: "Money Flow", href: "/money-flow", icon: CurrencyDollarIcon },
  { name: "Time Machine", href: "/time-machine", icon: ClockIcon },
  { name: "Future", href: "/future", icon: RocketLaunchIcon },
  { name: "Spending", href: "/spending", icon: CreditCardIcon },
  { name: "Import", href: "/imports", icon: DocumentArrowUpIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

export function Sidebar() {
  const {
    sidebarOpen,
    sidebarCollapsed,
    isMobile,
    setSidebarOpen,
    setSidebarCollapsed,
    viewMode,
    toggleViewMode,
  } = useUIStore();
  const { isPlayMode, themeMode } = useTheme();

  const isVisible = isMobile ? sidebarOpen : true;
  const isCollapsed = !isMobile && sidebarCollapsed;

  return (
    <div
      className={cn(
        "flex flex-col border-r transition-all duration-300 backdrop-blur-sm",
        // Theme-aware background and borders
        "bg-[var(--color-surface-primary)]/95 border-[var(--color-border-primary)]",
        // Play mode cosmic effects
        isPlayMode && "shadow-[0_0_30px_var(--color-mood-glow)]/20",
        isPlayMode &&
          themeMode === "dark" &&
          "bg-slate-900/95 border-purple-500/30",
        isPlayMode && themeMode === "light" && "bg-white/95 border-blue-200/50",
        // Visibility and sizing
        isVisible ? "translate-x-0" : "-translate-x-full",
        isMobile
          ? "fixed inset-y-0 left-0 z-50 w-64"
          : isCollapsed
            ? "w-16"
            : "w-64",
      )}
    >
      {/* Logo & Brand */}
      <div
        className={cn(
          "flex items-center h-16 px-4 sm:px-6 border-b transition-colors",
          "border-[var(--color-border-primary)]",
        )}
      >
        <div className="flex items-center space-x-3">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
              isPlayMode
                ? "bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] shadow-[0_0_15px_var(--color-mood-glow)]/50"
                : "bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)]",
            )}
          >
            <span className="text-white font-bold text-lg">P</span>
          </div>
          {!isCollapsed ? (
            <div>
              <ThemeAwareText
                as="h1"
                className="text-xl font-bold"
                gradient={isPlayMode}
              >
                Poon
              </ThemeAwareText>
              <ThemeAwareText className="text-xs" color="secondary">
                Personal Finance
              </ThemeAwareText>
            </div>
          ) : (
            // Large expand button when collapsed - replaces the logo area
            <button
              onClick={() => setSidebarCollapsed(false)}
              className={cn(
                "ml-2 p-2 transition-all duration-200 rounded-lg group",
                "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]",
                "hover:scale-110",
                // Play mode cosmic effects
                isPlayMode && "hover:shadow-[0_0_15px_var(--color-mood-glow)]/40",
                // Accessibility improvements
                "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2",
              )}
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <svg
                className="h-7 w-7 transition-all duration-200 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7" // Double arrow right
                />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile close button */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "ml-auto p-1 rounded-md transition-colors",
              "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]",
            )}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}

        {/* Desktop collapse button */}
        {!isMobile && !isCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={cn(
              "ml-auto p-2 transition-all duration-200 rounded-lg group",
              "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]",
              // Play mode cosmic effects
              isPlayMode && "hover:shadow-[0_0_12px_var(--color-mood-glow)]/30",
              // Accessibility improvements
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:ring-offset-2",
            )}
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <svg
              className="h-5 w-5 transition-all duration-200 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7M19 19l-7-7 7-7" // Double arrow left when expanded
              />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className={cn(
        "flex-1 py-6 space-y-1",
        isCollapsed ? "px-2" : "px-4" // Less padding when collapsed for better touch targets
      )}>
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center font-medium rounded-[var(--border-radius)] transition-all duration-200 group relative",
                // Better sizing for collapsed state
                isCollapsed 
                  ? "px-3 py-3 justify-center text-xs" // Larger touch target when collapsed
                  : "px-3 py-2.5 text-sm",
                isActive
                  ? cn(
                      // Active state with theme awareness
                      "bg-[var(--color-primary-50)] text-[var(--color-primary-700)]",
                      !isCollapsed && "border-r-2 border-[var(--color-primary-600)]",
                      isCollapsed && "bg-[var(--color-primary-500)] text-white shadow-lg",
                      isPlayMode &&
                        "bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-accent-500)]/10 shadow-[0_0_10px_var(--color-mood-glow)]/20",
                    )
                  : cn(
                      // Inactive state with theme awareness
                      "text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]",
                      isPlayMode &&
                        "hover:shadow-[0_0_8px_var(--color-mood-glow)]/10",
                      // Better hover state for collapsed
                      isCollapsed && "hover:bg-[var(--color-primary-100)] hover:scale-105",
                    ),
              )
            }
            title={isCollapsed ? item.name : undefined}
          >
            <item.icon
              className={cn(
                "flex-shrink-0 transition-all duration-200",
                isCollapsed ? "h-6 w-6" : "h-5 w-5", // Larger icons when collapsed
                isPlayMode && "group-hover:scale-110",
              )}
            />
            {!isCollapsed && (
              <span className="ml-3 transition-all duration-200">
                {item.name}
              </span>
            )}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-md text-sm font-medium text-[var(--color-text-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                {item.name}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* View Mode Toggle */}
      {!isCollapsed && (
        <div
          className={cn(
            "px-4 py-3 border-t transition-colors",
            "border-[var(--color-border-primary)]",
          )}
        >
          <div className="mb-2">
            <ThemeAwareText
              className="text-xs font-medium uppercase tracking-wide"
              color="secondary"
            >
              View Mode
            </ThemeAwareText>
          </div>
          <DualLensToggle
            viewMode={viewMode}
            onToggle={toggleViewMode}
            className="w-full"
            sidebar={true}
          />
        </div>
      )}

      {/* Collapsed View Mode Toggle */}
      {isCollapsed && (
        <div
          className={cn(
            "px-2 py-3 border-t flex justify-center transition-colors",
            "border-[var(--color-border-primary)]",
          )}
        >
          <button
            onClick={toggleViewMode}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              "text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]",
              isPlayMode && "hover:shadow-[0_0_8px_var(--color-mood-glow)]/20",
            )}
            title={`Switch to ${viewMode === "play" ? "Clarity" : "Play"} Mode`}
          >
            {viewMode === "play" ? "🎮" : "📊"}
          </button>
        </div>
      )}

      {/* User section */}
      <div
        className={cn(
          "p-4 border-t transition-colors",
          "border-[var(--color-border-primary)]",
        )}
      >
        <div
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : "space-x-3",
          )}
        >
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
              "bg-[var(--color-surface-tertiary)]",
              isPlayMode && "shadow-[0_0_10px_var(--color-mood-glow)]/30",
            )}
          >
            <ThemeAwareText className="text-sm font-medium">DU</ThemeAwareText>
          </div>
          {!isCollapsed && (
            <div>
              <ThemeAwareText className="text-sm font-medium">
                Demo User
              </ThemeAwareText>
              <ThemeAwareText className="text-xs" color="secondary">
                demo@example.com
              </ThemeAwareText>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
