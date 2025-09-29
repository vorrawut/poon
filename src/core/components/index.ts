/**
 * 🌌 ULTIMATE CORE DESIGN SYSTEM COMPONENTS
 *
 * These components provide the ultimate theme-aware UI elements that automatically
 * adapt to:
 * - Play/Clarity view modes
 * - Dark/Light theme variants
 * - Accessibility modes (Standard/Elder/Youth)
 * - Adaptive mood based on financial health
 *
 * All widgets and features should use these core components instead of
 * hardcoded styles to ensure consistent theming and accessibility.
 */

// 🎨 Theme-Aware Text Components
export {
  ThemeAwareText,
  ThemeAwareHeading,
  ThemeAwareLabel,
  ThemeAwareDescription,
  ThemeAwareError,
  ThemeAwareSuccess,
  // Legacy exports for backward compatibility
  AccessibleText,
  AccessibleHeading,
  AccessibleLabel,
  AccessibleDescription,
  AccessibleError,
  AccessibleSuccess,
} from "./ThemeAwareText";

// 🚀 Theme-Aware Button Components
export {
  ThemeAwareButton,
  ThemeAwareIconButton,
  ThemeAwareQuickAction,
  ThemeAwareFloatingActionButton,
  // Legacy exports for backward compatibility
  AccessibleButton,
  AccessibleIconButton,
  AccessibleQuickAction,
} from "./ThemeAwareButton";

// 🏗️ Theme-Aware Layout Components
export {
  ThemeAwareCard,
  ThemeAwareSection,
  ThemeAwareGrid,
  ThemeAwareFlex,
  ThemeAwareStatsCard,
  // Legacy exports for backward compatibility
  AccessibleCard,
  AccessibleSection,
  AccessibleGrid,
  AccessibleFlex,
  AccessibleStatsCard,
} from "./ThemeAwareLayout";

// 🎭 Theme and Accessibility Hooks
export {
  useAccessibility,
  useAccessibilityText,
  useAccessibilityMotion,
} from "../../hooks/useAccessibility";

export { useTheme } from "../../app/providers/ThemeProvider";
export { useThemeStyles } from "../../hooks/useThemeStyles";
export { useThemeMotion } from "../../hooks/useThemeMotion";

// 🎨 Theme Utilities
export * from "../../styles/tokens/theme";
