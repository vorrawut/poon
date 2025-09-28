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

// Export accessibility utilities
export * from "../libs/accessibility";

// Export accessibility hooks
export * from "../hooks/useAccessibility";
