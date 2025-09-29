/**
 * 🌌 THEME CONTEXT
 *
 * React context for the theme system
 */

import { createContext } from "react";
import type {
  ThemeConfig,
  AccessibilityMode,
  AdaptiveMood,
} from "../styles/tokens/theme";
import { spacing, typography } from "../styles/tokens/theme";

export interface ThemeContextValue extends ThemeConfig {
  // Theme switching functions
  toggleTheme: () => void;
  toggleViewMode: () => void;
  setAccessibilityMode: (mode: AccessibilityMode) => void;
  setAdaptiveMood: (mood: AdaptiveMood) => void;

  // Utility functions
  getColor: (path: string) => string;
  getSpacing: (size: keyof typeof spacing.accessibility.standard) => string;
  getFontSize: (
    type: keyof typeof typography.fontSize.accessibility.standard,
  ) => string;

  // CSS custom properties for dynamic theming
  cssVariables: Record<string, string>;

  // Theme state
  isPlayMode: boolean;
  isClarityMode: boolean;
  isDarkMode: boolean;
  isLightMode: boolean;
  isSystemTheme: boolean;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);
