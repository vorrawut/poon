/**
 * Accessibility utilities for consistent styling across the application
 */

export type AccessibilityMode = "standard" | "elder" | "youth";

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
 * Get color scheme based on accessibility mode and view mode
 */
export function getAccessibilityColors(
  mode: AccessibilityMode,
  viewMode: "play" | "clarity",
): {
  text: string;
  textSecondary: string;
  background: string;
  border: string;
  accent: string;
} {
  if (mode === "elder") {
    // High contrast colors for elder mode
    return viewMode === "play"
      ? {
          text: "text-white",
          textSecondary: "text-gray-100",
          background: "bg-gray-900",
          border: "border-gray-300",
          accent: "text-yellow-300",
        }
      : {
          text: "text-gray-900",
          textSecondary: "text-gray-700",
          background: "bg-white",
          border: "border-gray-900",
          accent: "text-blue-700",
        };
  }

  if (mode === "youth") {
    // Vibrant colors for youth mode
    return viewMode === "play"
      ? {
          text: "text-white",
          textSecondary: "text-purple-200",
          background: "bg-gradient-to-br from-purple-900 to-pink-900",
          border: "border-purple-400",
          accent: "text-pink-300",
        }
      : {
          text: "text-gray-900",
          textSecondary: "text-purple-700",
          background: "bg-gradient-to-br from-purple-50 to-pink-50",
          border: "border-purple-300",
          accent: "text-purple-600",
        };
  }

  // Standard colors
  return viewMode === "play"
    ? {
        text: "text-white",
        textSecondary: "text-white/80",
        background: "bg-slate-900",
        border: "border-white/20",
        accent: "text-blue-300",
      }
    : {
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        background: "bg-white",
        border: "border-gray-200",
        accent: "text-blue-600",
      };
}

/**
 * Get comprehensive accessibility classes for a component
 */
export function getAccessibilityClasses(
  mode: AccessibilityMode,
  viewMode: "play" | "clarity",
  options: {
    fontSize?: "text" | "heading" | "button";
    headingLevel?: "h1" | "h2" | "h3" | "h4";
    includeSpacing?: boolean;
    includeColors?: boolean;
  } = {},
): string {
  const {
    fontSize = "text",
    headingLevel = "h1",
    includeSpacing = false,
    includeColors = false,
  } = options;

  let classes = "";

  // Font size
  if (fontSize === "heading") {
    classes += getAccessibilityHeadingSize(mode, headingLevel);
  } else if (fontSize === "button") {
    classes += getAccessibilityButtonSize(mode);
  } else {
    classes += getAccessibilityFontSize(mode);
  }

  // Spacing
  if (includeSpacing) {
    classes += " " + getAccessibilitySpacing(mode);
  }

  // Colors
  if (includeColors) {
    const colors = getAccessibilityColors(mode, viewMode);
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
