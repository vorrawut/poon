/**
 * 🌌 ENHANCED ACCESSIBILITY UTILITIES
 *
 * Accessibility utilities that integrate with the ultimate theme system.
 * These utilities now work seamlessly with Play/Clarity modes and dark/light themes.
 */

// Theme integration available through useAccessibility hook

export type AccessibilityMode = "standard" | "elder" | "youth";
export type ViewMode = "play" | "clarity";

/**
 * Get font size classes based on accessibility mode
 */
export function getAccessibilityFontSize(mode: AccessibilityMode): string {
  switch (mode) {
    case "elder":
      return "text-lg sm:text-xl md:text-2xl"; // Larger fonts for elder mode
    case "youth":
      return "text-sm sm:text-base md:text-lg"; // Slightly smaller, modern fonts
    case "standard":
    default:
      return "text-base sm:text-lg md:text-xl"; // Standard sizing
  }
}

/**
 * Get heading font size classes based on accessibility mode
 */
export function getAccessibilityHeadingSize(
  mode: AccessibilityMode,
  level: "h1" | "h2" | "h3" | "h4" = "h1",
): string {
  const sizes = {
    elder: {
      h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
      h2: "text-3xl sm:text-4xl md:text-5xl",
      h3: "text-2xl sm:text-3xl md:text-4xl",
      h4: "text-xl sm:text-2xl md:text-3xl",
    },
    youth: {
      h1: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
      h2: "text-xl sm:text-2xl md:text-3xl",
      h3: "text-lg sm:text-xl md:text-2xl",
      h4: "text-base sm:text-lg md:text-xl",
    },
    standard: {
      h1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
      h2: "text-2xl sm:text-3xl md:text-4xl",
      h3: "text-xl sm:text-2xl md:text-3xl",
      h4: "text-lg sm:text-xl md:text-2xl",
    },
  };

  return sizes[mode][level];
}

/**
 * Get spacing classes based on accessibility mode
 */
export function getAccessibilitySpacing(mode: AccessibilityMode): string {
  switch (mode) {
    case "elder":
      return "p-6 sm:p-8 md:p-10"; // More padding for easier interaction
    case "youth":
      return "p-3 sm:p-4 md:p-5"; // Compact spacing
    case "standard":
    default:
      return "p-4 sm:p-6 md:p-8"; // Standard spacing
  }
}

/**
 * Get button size classes based on accessibility mode
 */
export function getAccessibilityButtonSize(mode: AccessibilityMode): string {
  switch (mode) {
    case "elder":
      return "px-6 py-4 text-lg min-h-[48px]"; // Larger touch targets
    case "youth":
      return "px-4 py-2 text-sm min-h-[36px]"; // Compact buttons
    case "standard":
    default:
      return "px-5 py-3 text-base min-h-[44px]"; // Standard touch targets
  }
}

/**
 * Get theme-aware color scheme based on accessibility mode and view mode
 * Now integrates with the ultimate theme system for consistent theming
 */
export function getAccessibilityColors(
  mode: AccessibilityMode,
  viewMode: ViewMode,
  themeMode: "light" | "dark" = "light",
): {
  text: string;
  textSecondary: string;
  textTertiary: string;
  background: string;
  border: string;
  accent: string;
} {
  // Use CSS custom properties for dynamic theming
  const baseColors = {
    text: "text-[var(--color-text-primary)]",
    textSecondary: "text-[var(--color-text-secondary)]",
    textTertiary: "text-[var(--color-text-tertiary)]",
    background: "bg-[var(--color-bg-primary)]",
    border: "border-[var(--color-border-primary)]",
    accent: "text-[var(--color-text-accent)]",
  };

  // Accessibility mode specific adjustments
  if (mode === "elder") {
    // High contrast colors for elder mode
    return {
      ...baseColors,
      // Enhanced contrast for better readability
      text: themeMode === "dark" ? "text-white" : "text-gray-900",
      textSecondary: themeMode === "dark" ? "text-gray-100" : "text-gray-800",
      border: themeMode === "dark" ? "border-gray-300" : "border-gray-900",
      accent:
        viewMode === "play"
          ? themeMode === "dark"
            ? "text-yellow-300"
            : "text-blue-700"
          : themeMode === "dark"
            ? "text-blue-300"
            : "text-blue-700",
    };
  }

  if (mode === "youth") {
    // Vibrant colors for youth mode
    return {
      ...baseColors,
      // More vibrant accent colors
      accent:
        viewMode === "play"
          ? themeMode === "dark"
            ? "text-pink-300"
            : "text-purple-600"
          : themeMode === "dark"
            ? "text-blue-400"
            : "text-purple-600",
    };
  }

  // Standard colors use the theme system
  return baseColors;
}

/**
 * Get comprehensive accessibility classes for a component
 * Enhanced to work with the ultimate theme system
 */
export function getAccessibilityClasses(
  mode: AccessibilityMode,
  viewMode: ViewMode,
  options: {
    fontSize?: "text" | "heading" | "button";
    headingLevel?: "h1" | "h2" | "h3" | "h4";
    includeSpacing?: boolean;
    includeColors?: boolean;
    themeMode?: "light" | "dark";
  } = {},
): string {
  const {
    fontSize = "text",
    headingLevel = "h1",
    includeSpacing = false,
    includeColors = false,
    themeMode = "light",
  } = options;

  let classes = "";

  // Font size - use CSS custom properties for dynamic sizing
  if (fontSize === "heading") {
    classes += `text-[var(--font-size-heading)] ${getAccessibilityHeadingSize(mode, headingLevel)}`;
  } else if (fontSize === "button") {
    classes += `text-[var(--font-size-button)] ${getAccessibilityButtonSize(mode)}`;
  } else {
    classes += `text-[var(--font-size-body)] ${getAccessibilityFontSize(mode)}`;
  }

  // Spacing - use CSS custom properties
  if (includeSpacing) {
    classes += " p-[var(--spacing-md)]";
  }

  // Colors - use theme-aware colors
  if (includeColors) {
    const colors = getAccessibilityColors(mode, viewMode, themeMode);
    classes += ` ${colors.text} ${colors.background}`;
  }

  return classes.trim();
}

/**
 * Get accessibility-friendly animation settings
 */
export function getAccessibilityAnimations(mode: AccessibilityMode): {
  duration: number;
  easing: [number, number, number, number];
  reduceMotion: boolean;
} {
  switch (mode) {
    case "elder":
      return {
        duration: 0.8, // Slower animations
        easing: [0.25, 0.46, 0.45, 0.94], // ease-out cubic-bezier
        reduceMotion: true, // Reduced motion for elder users
      };
    case "youth":
      return {
        duration: 0.3, // Faster, snappy animations
        easing: [0.42, 0, 0.58, 1], // ease-in-out cubic-bezier
        reduceMotion: false,
      };
    case "standard":
    default:
      return {
        duration: 0.5, // Standard timing
        easing: [0.42, 0, 0.58, 1], // ease-in-out cubic-bezier
        reduceMotion: false,
      };
  }
}
