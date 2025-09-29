/**
 * Core Design System
 *
 * This module contains the core design system components and utilities
 * that provide consistent accessibility and theming across the entire application.
 *
 * Usage:
 * ```tsx
 * import { AccessibleHeading, AccessibleButton, AccessibleCard } from "../../core";
 *
 * function MyComponent() {
 *   return (
 *     <AccessibleCard>
 *       <AccessibleHeading level="h1">My Title</AccessibleHeading>
 *       <AccessibleButton variant="primary">Click Me</AccessibleButton>
 *     </AccessibleCard>
 *   );
 * }
 * ```
 */

// Export all core components
export * from "./components";

// Export theme hooks
export { useTheme } from "../app/providers/ThemeProvider";
export { useThemeStyles } from "../hooks/useThemeStyles";
export { useThemeMotion } from "../hooks/useThemeMotion";

// Export theme utilities (types only to avoid conflicts)
export type {
  ThemeConfig,
  ViewMode,
  ThemeMode,
  AccessibilityMode,
  AdaptiveMood,
} from "../styles/tokens/theme";
