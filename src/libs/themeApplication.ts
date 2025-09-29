/**
 * 🌌 SYSTEMATIC THEME APPLICATION
 *
 * This utility ensures that all components across the app systematically
 * apply the ultimate theme system. It provides migration helpers and
 * validation tools to ensure consistent theming.
 */

import type {
  ViewMode,
  AccessibilityMode,
  ThemeMode,
} from "../styles/tokens/theme";

// 🎨 THEME CLASS GENERATORS

/**
 * Generate systematic theme classes for any component
 */
export function generateThemeClasses(
  viewMode: ViewMode,
  themeMode: ThemeMode,
  accessibilityMode: AccessibilityMode,
  componentType:
    | "card"
    | "button"
    | "text"
    | "input"
    | "nav"
    | "modal" = "card",
) {
  const baseClasses = [
    "transition-all",
    "duration-[var(--motion-duration-normal)]",
    "ease-[var(--motion-easing)]",
  ];

  const themeClasses = [
    `theme-${themeMode}`,
    `view-${viewMode}`,
    `accessibility-${accessibilityMode}`,
  ];

  const componentClasses = getComponentSpecificClasses(
    componentType,
    viewMode,
    accessibilityMode,
  );

  return [...baseClasses, ...themeClasses, ...componentClasses].join(" ");
}

/**
 * Get component-specific theme classes
 */
function getComponentSpecificClasses(
  componentType: string,
  viewMode: ViewMode,
  accessibilityMode: AccessibilityMode,
): string[] {
  const classes: string[] = [];

  // Base component styling
  switch (componentType) {
    case "card":
      classes.push(
        "bg-[var(--color-surface-primary)]",
        "border",
        "border-[var(--color-border-primary)]",
        "rounded-[var(--border-radius)]",
        "shadow-sm",
      );
      if (viewMode === "play") {
        classes.push("backdrop-blur-sm", "shadow-[var(--shadow-cosmic)]");
      }
      break;

    case "button":
      classes.push(
        "inline-flex",
        "items-center",
        "justify-center",
        "font-medium",
        "rounded-[var(--border-radius)]",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-[var(--color-primary-500)]",
        "focus:ring-offset-2",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
      );
      if (viewMode === "play") {
        classes.push("shadow-lg", "hover:shadow-[var(--shadow-glow)]");
      }
      break;

    case "text":
      classes.push(
        "text-[var(--color-text-primary)]",
        "font-[var(--font-family-primary)]",
      );
      if (viewMode === "play") {
        classes.push("font-[var(--font-family-secondary)]");
      }
      break;

    case "input":
      classes.push(
        "bg-[var(--color-surface-primary)]",
        "border",
        "border-[var(--color-border-primary)]",
        "rounded-[var(--border-radius)]",
        "px-3",
        "py-2",
        "text-[var(--color-text-primary)]",
        "placeholder:text-[var(--color-text-tertiary)]",
        "focus:border-[var(--color-border-accent)]",
        "focus:ring-1",
        "focus:ring-[var(--color-primary-500)]",
      );
      break;

    case "nav":
      classes.push(
        "bg-[var(--color-surface-primary)]",
        "border-b",
        "border-[var(--color-border-primary)]",
      );
      if (viewMode === "play") {
        classes.push("backdrop-blur-xl", "bg-[var(--color-surface-glass)]");
      }
      break;

    case "modal":
      classes.push(
        "bg-[var(--color-surface-primary)]",
        "border",
        "border-[var(--color-border-primary)]",
        "rounded-[var(--border-radius)]",
        "shadow-xl",
      );
      if (viewMode === "play") {
        classes.push("backdrop-blur-xl", "shadow-[var(--shadow-cosmic)]");
      }
      break;
  }

  // Accessibility-specific adjustments
  if (accessibilityMode === "elder") {
    classes.push("text-lg", "p-4", "min-h-[48px]");
  } else if (accessibilityMode === "youth") {
    classes.push("text-sm", "p-2", "min-h-[36px]");
  } else {
    classes.push("text-base", "p-3", "min-h-[44px]");
  }

  return classes;
}

// 🎭 COMPONENT THEME VALIDATORS

/**
 * Validate that a component is using the theme system correctly
 */
export function validateThemeUsage(element: HTMLElement): {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Check for hardcoded colors
  const classList = Array.from(element.classList);

  // Check for hardcoded Tailwind color classes
  const hardcodedColorClasses = classList.filter((cls) =>
    /^(bg|text|border)-(red|blue|green|yellow|purple|pink|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose)-\d+$/.test(
      cls,
    ),
  );

  if (hardcodedColorClasses.length > 0) {
    issues.push(
      `Hardcoded color classes found: ${hardcodedColorClasses.join(", ")}`,
    );
    suggestions.push(
      "Use CSS custom properties like text-[var(--color-text-primary)] instead",
    );
  }

  // Check for missing theme classes
  const hasThemeClass = classList.some((cls) => cls.startsWith("theme-"));
  const hasViewClass = classList.some((cls) => cls.startsWith("view-"));
  const hasAccessibilityClass = classList.some((cls) =>
    cls.startsWith("accessibility-"),
  );

  if (!hasThemeClass && !hasViewClass && !hasAccessibilityClass) {
    issues.push("No theme system classes detected");
    suggestions.push(
      "Add theme classes using generateThemeClasses() or core components",
    );
  }

  // Check for missing transitions
  if (
    !classList.includes("transition-all") &&
    !classList.includes("transition")
  ) {
    issues.push("No transition classes found");
    suggestions.push(
      "Add transition-all duration-[var(--motion-duration-normal)] for smooth theme switching",
    );
  }

  return {
    isValid: issues.length === 0,
    issues,
    suggestions,
  };
}

// 🔧 MIGRATION HELPERS

/**
 * Convert legacy Tailwind classes to theme-aware classes
 */
export function migrateLegacyClasses(classString: string): string {
  let migratedClasses = classString;

  // Color migrations
  const colorMigrations: Record<string, string> = {
    // Text colors
    "text-gray-900": "text-[var(--color-text-primary)]",
    "text-gray-700": "text-[var(--color-text-secondary)]",
    "text-gray-600": "text-[var(--color-text-secondary)]",
    "text-gray-500": "text-[var(--color-text-tertiary)]",
    "text-white": "text-[var(--color-text-inverse)]",
    "text-blue-600": "text-[var(--color-text-accent)]",

    // Background colors
    "bg-white": "bg-[var(--color-surface-primary)]",
    "bg-gray-50": "bg-[var(--color-bg-primary)]",
    "bg-gray-100": "bg-[var(--color-surface-secondary)]",
    "bg-blue-600": "bg-[var(--color-primary-500)]",

    // Border colors
    "border-gray-200": "border-[var(--color-border-primary)]",
    "border-gray-300": "border-[var(--color-border-secondary)]",
    "border-blue-600": "border-[var(--color-border-accent)]",
  };

  // Apply migrations
  Object.entries(colorMigrations).forEach(([legacy, modern]) => {
    migratedClasses = migratedClasses.replace(
      new RegExp(`\\b${legacy}\\b`, "g"),
      modern,
    );
  });

  // Add theme system classes if missing
  if (!migratedClasses.includes("transition-")) {
    migratedClasses +=
      " transition-all duration-[var(--motion-duration-normal)]";
  }

  return migratedClasses.trim();
}

/**
 * Generate a complete theme migration report for the entire app
 */
export function generateMigrationReport(): {
  totalElements: number;
  elementsNeedingMigration: number;
  commonIssues: Record<string, number>;
  migrationPlan: string[];
} {
  const allElements = document.querySelectorAll("*");
  const elementsNeedingMigration: HTMLElement[] = [];
  const commonIssues: Record<string, number> = {};

  allElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      const validation = validateThemeUsage(element);
      if (!validation.isValid) {
        elementsNeedingMigration.push(element);
        validation.issues.forEach((issue) => {
          commonIssues[issue] = (commonIssues[issue] || 0) + 1;
        });
      }
    }
  });

  const migrationPlan = [
    "1. Replace hardcoded color classes with CSS custom properties",
    "2. Add theme system classes to all interactive elements",
    "3. Implement proper transitions for theme switching",
    "4. Update all components to use core design system components",
    "5. Test all accessibility modes (standard, elder, youth)",
    "6. Verify Play/Clarity mode switching works correctly",
    "7. Validate dark/light theme transitions",
  ];

  return {
    totalElements: allElements.length,
    elementsNeedingMigration: elementsNeedingMigration.length,
    commonIssues,
    migrationPlan,
  };
}

// 🎨 THEME PRESETS

/**
 * Predefined theme configurations for different app sections
 */
export const themePresets = {
  dashboard: {
    card: "bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-[var(--border-radius)] shadow-sm hover:shadow-md transition-all duration-[var(--motion-duration-normal)]",
    widget:
      "bg-[var(--color-surface-elevated)] border border-[var(--color-border-primary)] rounded-[var(--border-radius)] p-6 shadow-lg hover:shadow-xl transition-all duration-[var(--motion-duration-normal)]",
    button:
      "bg-[var(--color-primary-500)] text-[var(--color-text-inverse)] px-4 py-2 rounded-[var(--border-radius)] font-medium hover:bg-[var(--color-primary-600)] transition-all duration-[var(--motion-duration-normal)]",
  },

  navigation: {
    container:
      "bg-[var(--color-surface-primary)] border-b border-[var(--color-border-primary)] backdrop-blur-xl",
    link: "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] px-3 py-2 rounded-[var(--border-radius)] transition-all duration-[var(--motion-duration-normal)]",
    activeLink:
      "text-[var(--color-text-accent)] bg-[var(--color-surface-secondary)] px-3 py-2 rounded-[var(--border-radius)]",
  },

  forms: {
    input:
      "bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-[var(--border-radius)] px-3 py-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-border-accent)] focus:ring-1 focus:ring-[var(--color-primary-500)] transition-all duration-[var(--motion-duration-normal)]",
    label: "text-[var(--color-text-secondary)] font-medium mb-2 block",
    error: "text-red-500 dark:text-red-400 text-sm mt-1",
  },

  modals: {
    overlay: "fixed inset-0 bg-black/50 backdrop-blur-sm z-[var(--z-overlay)]",
    content:
      "bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-[var(--border-radius)] shadow-xl max-w-md mx-auto mt-20 p-6",
  },
};

// 🚀 COSMIC MODE ENHANCEMENTS

/**
 * Add cosmic effects to elements in Play mode
 */
export function applyCosmicEffects(
  element: HTMLElement,
  effectType: "glow" | "float" | "pulse" | "particle",
) {
  const effects = {
    glow: "shadow-[0_0_20px_var(--color-mood-glow)] animate-pulse",
    float: "animate-[cosmic-float_4s_ease-in-out_infinite]",
    pulse: "animate-[cosmic-pulse_2s_ease-in-out_infinite]",
    particle:
      'relative before:absolute before:inset-0 before:bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] before:animate-pulse',
  };

  element.className += ` ${effects[effectType]}`;
}

// 🎯 ACCESSIBILITY ENHANCEMENTS

/**
 * Apply accessibility-specific enhancements
 */
export function applyAccessibilityEnhancements(
  element: HTMLElement,
  accessibilityMode: AccessibilityMode,
) {
  const enhancements = {
    elder:
      "text-lg font-semibold leading-relaxed tracking-wide p-4 min-h-[48px]",
    youth: "text-sm font-medium leading-tight p-2 min-h-[36px]",
    standard: "text-base font-normal leading-normal p-3 min-h-[44px]",
  };

  element.className += ` ${enhancements[accessibilityMode]}`;
}

export default {
  generateThemeClasses,
  validateThemeUsage,
  migrateLegacyClasses,
  generateMigrationReport,
  themePresets,
  applyCosmicEffects,
  applyAccessibilityEnhancements,
};
