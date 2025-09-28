/**
 * Core Design System Components
 * 
 * These components provide accessibility-aware UI elements that automatically
 * adapt to the user's accessibility mode (standard, elder, youth).
 * 
 * All widgets and features should use these core components instead of
 * hardcoded styles to ensure consistent accessibility across the application.
 */

// Text Components
export {
  AccessibleText,
  AccessibleHeading,
  AccessibleButtonText,
  AccessibleLabel,
  AccessibleDescription,
  AccessibleError,
  AccessibleSuccess,
} from "./AccessibleText";

// Button Components
export {
  AccessibleButton,
  AccessibleIconButton,
  AccessibleQuickAction,
} from "./AccessibleButton";

// Layout & Card Components
export {
  AccessibleCard,
  AccessibleSection,
  AccessibleStatsCard,
  AccessibleGrid,
  AccessibleFlex,
} from "./AccessibleCard";

// Re-export accessibility hooks for convenience
export { useAccessibility, useAccessibilityText, useAccessibilityMotion } from "../../hooks/useAccessibility";
