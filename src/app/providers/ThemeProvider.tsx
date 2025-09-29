/**
 * 🌌 ULTIMATE THEME PROVIDER
 *
 * This provider manages the entire theme system including:
 * - Play/Clarity mode switching
 * - Dark/Light theme variants
 * - Accessibility mode integration
 * - Adaptive mood based on financial health
 * - System theme detection
 * - Smooth transitions between modes
 */

import React, { useEffect, useMemo } from "react";
import { useUIStore } from "../../store/useUIStore";
import {
  getThemeColors,
  getAdaptiveMoodColor,
  getAccessibilitySpacing,
  getMotionSettings,
  spacing,
  typography,
  effects,
  zIndex,
} from "../../styles/tokens/theme";

import type {
  ThemeConfig,
  AccessibilityMode,
  AdaptiveMood,
} from "../../styles/tokens/theme";

import {
  ThemeContext,
  type ThemeContextValue,
} from "../../contexts/ThemeContext";

interface ThemeProviderProps {
  children: React.ReactNode;
  // Optional prop to override adaptive mood (for testing/demos)
  adaptiveMood?: AdaptiveMood;
}

export function ThemeProvider({
  children,
  adaptiveMood = "neutral",
}: ThemeProviderProps) {
  const {
    theme,
    viewMode,
    accessibilityMode,
    setTheme,
    toggleViewMode: toggleViewModeStore,
    setAccessibilityMode: setAccessibilityModeStore,
  } = useUIStore();

  // Detect system theme preference
  const [systemTheme, setSystemTheme] = React.useState<"light" | "dark">(
    "light",
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Determine effective theme mode - ensure it's always "light" or "dark"
  const effectiveThemeMode = React.useMemo(() => {
    if (theme === "system") {
      return systemTheme;
    }
    return theme;
  }, [theme, systemTheme]);

  // Create theme configuration
  const themeConfig = useMemo((): ThemeConfig => {
    const colors = getThemeColors(viewMode, effectiveThemeMode);
    const accessibilitySpacing = getAccessibilitySpacing(accessibilityMode);
    const motionSettings = getMotionSettings(viewMode, accessibilityMode);

    // Debug logging to identify the issue
    if (!colors || !colors.primary) {
      console.error('ThemeProvider: Colors not properly loaded', {
        viewMode,
        effectiveThemeMode,
        colors,
        colorKeys: colors ? Object.keys(colors) : 'no colors'
      });
    }

    return {
      viewMode,
      themeMode: effectiveThemeMode,
      accessibilityMode,
      adaptiveMood,
      colors: colors as any, // Type assertion to handle readonly conflicts
      spacing: accessibilitySpacing as any, // Type assertion to handle readonly conflicts
      typography,
      motion: motionSettings,
      effects,
      zIndex,
    };
  }, [viewMode, effectiveThemeMode, accessibilityMode, adaptiveMood]);

  // Generate CSS custom properties for dynamic theming
  const cssVariables = useMemo(() => {
    const colors = themeConfig.colors;
    const moodColors = getAdaptiveMoodColor(adaptiveMood);

    // Safety check to prevent runtime errors
    if (!colors || !colors.primary) {
      console.error('ThemeProvider: Cannot generate CSS variables, colors.primary is undefined');
      return {} as Record<string, string>;
    }

    return {
      // Color variables
      "--color-primary-50": colors.primary[50],
      "--color-primary-100": colors.primary[100],
      "--color-primary-200": colors.primary[200],
      "--color-primary-300": colors.primary[300],
      "--color-primary-400": colors.primary[400],
      "--color-primary-500": colors.primary[500],
      "--color-primary-600": colors.primary[600],
      "--color-primary-700": colors.primary[700],
      "--color-primary-800": colors.primary[800],
      "--color-primary-900": colors.primary[900],

      "--color-secondary-50": colors.secondary[50],
      "--color-secondary-100": colors.secondary[100],
      "--color-secondary-200": colors.secondary[200],
      "--color-secondary-300": colors.secondary[300],
      "--color-secondary-400": colors.secondary[400],
      "--color-secondary-500": colors.secondary[500],
      "--color-secondary-600": colors.secondary[600],
      "--color-secondary-700": colors.secondary[700],
      "--color-secondary-800": colors.secondary[800],
      "--color-secondary-900": colors.secondary[900],

      "--color-accent-50": colors.accent[50],
      "--color-accent-100": colors.accent[100],
      "--color-accent-200": colors.accent[200],
      "--color-accent-300": colors.accent[300],
      "--color-accent-400": colors.accent[400],
      "--color-accent-500": colors.accent[500],
      "--color-accent-600": colors.accent[600],
      "--color-accent-700": colors.accent[700],
      "--color-accent-800": colors.accent[800],
      "--color-accent-900": colors.accent[900],

      // Background variables
      "--color-bg-primary": colors.background.primary,
      "--color-bg-secondary": colors.background.secondary,
      "--color-bg-tertiary": colors.background.tertiary,
      "--color-bg-overlay": colors.background.overlay,

      // Surface variables
      "--color-surface-primary": colors.surface.primary,
      "--color-surface-secondary": colors.surface.secondary,
      "--color-surface-tertiary": colors.surface.tertiary,
      "--color-surface-elevated": colors.surface.elevated,
      "--color-surface-glass": colors.surface.glass,

      // Text variables
      "--color-text-primary": colors.text.primary,
      "--color-text-secondary": colors.text.secondary,
      "--color-text-tertiary": colors.text.tertiary,
      "--color-text-inverse": colors.text.inverse,
      "--color-text-accent": colors.text.accent,

      // Border variables
      "--color-border-primary": colors.border.primary,
      "--color-border-secondary": colors.border.secondary,
      "--color-border-accent": colors.border.accent,
      "--color-border-glow": colors.border.glow,

      // Adaptive mood variables
      "--color-mood-primary": moodColors.primary,
      "--color-mood-secondary": moodColors.secondary,
      "--color-mood-glow": moodColors.glow,
      "--color-mood-background": moodColors.background,

      // Spacing variables
      "--spacing-xs": themeConfig.spacing.xs,
      "--spacing-sm": themeConfig.spacing.sm,
      "--spacing-md": themeConfig.spacing.md,
      "--spacing-lg": themeConfig.spacing.lg,
      "--spacing-xl": themeConfig.spacing.xl,

      // Typography variables
      "--font-size-body":
        themeConfig.typography.fontSize.accessibility[accessibilityMode].body,
      "--font-size-heading":
        themeConfig.typography.fontSize.accessibility[accessibilityMode]
          .heading,
      "--font-size-button":
        themeConfig.typography.fontSize.accessibility[accessibilityMode].button,
      "--font-size-caption":
        themeConfig.typography.fontSize.accessibility[accessibilityMode]
          .caption,

      // Motion variables
      "--motion-duration-fast": `${themeConfig.motion.duration.fast}s`,
      "--motion-duration-normal": `${themeConfig.motion.duration.normal}s`,
      "--motion-duration-slow": `${themeConfig.motion.duration.slow}s`,
      "--motion-easing": `cubic-bezier(${themeConfig.motion.easing.join(", ")})`,

      // Effect variables
      "--border-radius":
        viewMode === "play"
          ? effects.borderRadius.cosmic
          : effects.borderRadius.clarity,
      "--shadow-cosmic": effects.shadow.cosmic,
      "--shadow-glow": effects.shadow.glow,

      // Z-index variables
      "--z-content": zIndex.content.toString(),
      "--z-sticky": zIndex.sticky.toString(),
      "--z-dropdown": zIndex.dropdown.toString(),
      "--z-overlay": zIndex.overlay.toString(),
      "--z-modal": zIndex.modal.toString(),
    };
  }, [themeConfig, adaptiveMood, accessibilityMode, viewMode]);

  // Apply CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Apply theme class to body for global styling
    document.body.className = [
      `theme-${effectiveThemeMode}`,
      `view-${viewMode}`,
      `accessibility-${accessibilityMode}`,
      `mood-${adaptiveMood}`,
    ].join(" ");

    return () => {
      // Cleanup on unmount
      Object.keys(cssVariables).forEach((property) => {
        root.style.removeProperty(property);
      });
    };
  }, [
    cssVariables,
    effectiveThemeMode,
    viewMode,
    accessibilityMode,
    adaptiveMood,
  ]);

  // Utility functions
  const getColor = (path: string): string => {
    const keys = path.split(".");
    let value: any = themeConfig.colors;

    for (const key of keys) {
      value = value?.[key];
    }

    return typeof value === "string" ? value : "";
  };

  const getSpacing = (
    size: keyof typeof spacing.accessibility.standard,
  ): string => {
    return themeConfig.spacing[size];
  };

  const getFontSize = (
    type: keyof typeof typography.fontSize.accessibility.standard,
  ): string => {
    return themeConfig.typography.fontSize.accessibility[accessibilityMode][
      type
    ];
  };

  // Theme switching functions
  const toggleTheme = () => {
    const nextTheme = effectiveThemeMode === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  const toggleViewMode = () => {
    toggleViewModeStore();
  };

  const setAccessibilityMode = (mode: AccessibilityMode) => {
    setAccessibilityModeStore(mode);
  };

  const setAdaptiveMood = (mood: AdaptiveMood) => {
    // This would typically be connected to financial health calculations
    // For now, it's a placeholder for the adaptive mood system
    console.log("Setting adaptive mood:", mood);
  };

  const contextValue: ThemeContextValue = {
    ...themeConfig,

    // Theme switching functions
    toggleTheme,
    toggleViewMode,
    setAccessibilityMode,
    setAdaptiveMood,

    // Utility functions
    getColor,
    getSpacing,
    getFontSize,

    // CSS variables
    cssVariables,

    // Theme state
    isPlayMode: viewMode === "play",
    isClarityMode: viewMode === "clarity",
    isDarkMode: effectiveThemeMode === "dark",
    isLightMode: effectiveThemeMode === "light",
    isSystemTheme: theme === "system",
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
