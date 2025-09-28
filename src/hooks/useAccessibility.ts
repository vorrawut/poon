import { useUIStore } from "../store/useUIStore";
import {
  getAccessibilityClasses,
  getAccessibilityColors,
  getAccessibilityFontSize,
  getAccessibilityHeadingSize,
  getAccessibilitySpacing,
  getAccessibilityButtonSize,
  getAccessibilityAnimations,
  type AccessibilityMode,
} from "../libs/accessibility";

/**
 * Hook for accessing accessibility utilities and current mode
 */
export function useAccessibility() {
  const { accessibilityMode, viewMode } = useUIStore();

  return {
    // Current modes
    accessibilityMode,
    viewMode,

    // Utility functions
    getClasses: (options?: Parameters<typeof getAccessibilityClasses>[2]) =>
      getAccessibilityClasses(accessibilityMode, viewMode, options),

    getColors: () => getAccessibilityColors(accessibilityMode, viewMode),

    getFontSize: () => getAccessibilityFontSize(accessibilityMode),

    getHeadingSize: (level?: "h1" | "h2" | "h3" | "h4") =>
      getAccessibilityHeadingSize(accessibilityMode, level),

    getSpacing: () => getAccessibilitySpacing(accessibilityMode),

    getButtonSize: () => getAccessibilityButtonSize(accessibilityMode),

    getAnimations: () => getAccessibilityAnimations(accessibilityMode),

    // Convenience getters
    get colors() {
      return getAccessibilityColors(accessibilityMode, viewMode);
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

    // Mode checks
    isElderMode: accessibilityMode === "elder",
    isYouthMode: accessibilityMode === "youth",
    isStandardMode: accessibilityMode === "standard",
    isPlayMode: viewMode === "play",
    isClarityMode: viewMode === "clarity",
  };
}

/**
 * Hook for getting accessibility-aware text classes
 */
export function useAccessibilityText(
  type: "body" | "heading" | "button" | "caption" = "body",
  headingLevel: "h1" | "h2" | "h3" | "h4" = "h1"
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
      ease: animations.easing,
    },
    // Disable animations for elder mode if reduce motion is preferred
    animate: animations.reduceMotion ? false : undefined,
    initial: animations.reduceMotion ? false : undefined,
  };
}
