import { useUIStore } from "../store/useUIStore";
import { useTheme } from "../app/providers/ThemeProvider";
import {
  getAccessibilityClasses,
  getAccessibilityColors,
  getAccessibilityFontSize,
  getAccessibilityHeadingSize,
  getAccessibilitySpacing,
  getAccessibilityButtonSize,
  getAccessibilityAnimations,
} from "../libs/accessibility";

/**
 * 🌌 ENHANCED ACCESSIBILITY HOOK
 *
 * Hook for accessing accessibility utilities integrated with the ultimate theme system.
 * Now provides theme-aware accessibility features.
 */
export function useAccessibility() {
  const { accessibilityMode, viewMode } = useUIStore();
  const theme = useTheme();

  return {
    // Current modes
    accessibilityMode,
    viewMode,
    themeMode: theme.themeMode,

    // Theme integration
    theme,

    // Utility functions (enhanced with theme awareness)
    getClasses: (options?: Parameters<typeof getAccessibilityClasses>[2]) =>
      getAccessibilityClasses(accessibilityMode, viewMode, {
        ...options,
        themeMode: theme.themeMode,
      }),

    getColors: () =>
      getAccessibilityColors(accessibilityMode, viewMode, theme.themeMode),

    getFontSize: () => getAccessibilityFontSize(accessibilityMode),

    getHeadingSize: (level?: "h1" | "h2" | "h3" | "h4") =>
      getAccessibilityHeadingSize(accessibilityMode, level),

    getSpacing: () => getAccessibilitySpacing(accessibilityMode),

    getButtonSize: () => getAccessibilityButtonSize(accessibilityMode),

    getAnimations: () => getAccessibilityAnimations(accessibilityMode),

    // Theme-aware convenience getters
    get colors() {
      return getAccessibilityColors(
        accessibilityMode,
        viewMode,
        theme.themeMode,
      );
    },

    get fontSize() {
      return getAccessibilityFontSize(accessibilityMode);
    },

    get spacing() {
      return getAccessibilitySpacing(accessibilityMode);
    },

    get buttonSize() {
      return getAccessibilityButtonSize(accessibilityMode);
    },

    get animations() {
      return getAccessibilityAnimations(accessibilityMode);
    },

    // Enhanced mode checks
    isElderMode: accessibilityMode === "elder",
    isYouthMode: accessibilityMode === "youth",
    isStandardMode: accessibilityMode === "standard",
    isPlayMode: viewMode === "play",
    isClarityMode: viewMode === "clarity",
    isDarkMode: theme.themeMode === "dark",
    isLightMode: theme.themeMode === "light",

    // Theme utilities
    getThemeColor: theme.getColor,
    getThemeSpacing: theme.getSpacing,
    getThemeFontSize: theme.getFontSize,

    // CSS custom properties access
    cssVariables: theme.cssVariables,
  };
}

/**
 * Hook for getting accessibility-aware text classes
 */
export function useAccessibilityText(
  type: "body" | "heading" | "button" | "caption" = "body",
  headingLevel: "h1" | "h2" | "h3" | "h4" = "h1",
) {
  const { getClasses, colors } = useAccessibility();

  const getTextClasses = () => {
    switch (type) {
      case "heading":
        return `${getClasses({
          fontSize: "heading",
          headingLevel,
          includeColors: true,
        })} font-bold`;
      case "button":
        return `${getClasses({
          fontSize: "button",
          includeColors: false,
        })} font-medium`;
      case "caption":
        return `${colors.textSecondary} text-sm`;
      case "body":
      default:
        return `${getClasses({
          fontSize: "text",
          includeColors: true,
        })}`;
    }
  };

  return getTextClasses();
}

/**
 * Hook for getting accessibility-aware spacing classes
 */
export function useAccessibilitySpacing(includeSpacing = true) {
  const { getClasses } = useAccessibility();

  return getClasses({ includeSpacing });
}

/**
 * Hook for getting accessibility-aware animation settings for Framer Motion
 */
export function useAccessibilityMotion() {
  const { animations } = useAccessibility();

  return {
    transition: {
      duration: animations.duration,
      ease: animations.easing, // Proper cubic-bezier values for Framer Motion
    },
    // Disable animations for elder mode if reduce motion is preferred
    animate: animations.reduceMotion ? false : undefined,
    initial: animations.reduceMotion ? false : undefined,
  };
}
