/**
 * 🎨 THEME STYLES HOOK
 *
 * Provides quick access to common theme-aware styles
 */

import { useTheme } from "./useTheme";

export function useThemeStyles() {
  const theme = useTheme();

  return {
    // Quick access to common styles
    cardStyle: {
      backgroundColor: theme.getColor("surface.primary"),
      borderColor: theme.getColor("border.primary"),
      borderRadius: theme.isPlayMode ? "1rem" : "0.375rem",
      boxShadow: theme.isPlayMode
        ? theme.effects.shadow.cosmic
        : theme.effects.shadow.base,
    },

    textStyle: {
      color: theme.getColor("text.primary"),
      fontSize: theme.getFontSize("body"),
    },

    headingStyle: {
      color: theme.getColor("text.primary"),
      fontSize: theme.getFontSize("heading"),
      fontWeight: theme.typography.fontWeight.bold,
    },

    buttonStyle: {
      backgroundColor: theme.getColor("primary.500"),
      color: theme.getColor("text.inverse"),
      fontSize: theme.getFontSize("button"),
      borderRadius: theme.isPlayMode ? "0.75rem" : "0.375rem",
    },

    // Adaptive mood styles
    moodStyle: {
      backgroundColor: theme.cssVariables["--color-mood-background"],
      color: theme.cssVariables["--color-mood-primary"],
      borderColor: theme.cssVariables["--color-mood-secondary"],
    },
  };
}
