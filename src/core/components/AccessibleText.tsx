import React from "react";
import {
  useAccessibility,
  useAccessibilityText,
} from "../../hooks/useAccessibility";

interface AccessibleTextProps {
  children: React.ReactNode;
  variant?: "body" | "caption" | "small";
  color?: "primary" | "secondary" | "accent" | "inherit";
  className?: string;
  as?: "p" | "span" | "div";
}

interface AccessibleHeadingProps {
  children: React.ReactNode;
  level: "h1" | "h2" | "h3" | "h4";
  color?: "primary" | "secondary" | "accent" | "inherit";
  className?: string;
  gradient?: boolean;
}

interface AccessibleButtonTextProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Accessibility-aware text component that automatically adjusts font size,
 * color, and spacing based on the current accessibility mode
 */
export function AccessibleText({
  children,
  variant = "body",
  color = "primary",
  className = "",
  as: Component = "p",
}: AccessibleTextProps) {
  const { colors, getClasses } = useAccessibility();

  const getColorClass = () => {
    switch (color) {
      case "primary":
        return colors.text;
      case "secondary":
        return colors.textSecondary;
      case "accent":
        return colors.accent;
      case "inherit":
        return "";
      default:
        return colors.text;
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case "caption":
        return "text-sm opacity-75";
      case "small":
        return "text-xs opacity-60";
      case "body":
      default:
        return getClasses({ fontSize: "text" });
    }
  };

  const combinedClassName =
    `${getVariantClass()} ${getColorClass()} ${className}`.trim();

  return <Component className={combinedClassName}>{children}</Component>;
}

/**
 * Accessibility-aware heading component with proper sizing for each accessibility mode
 */
export function AccessibleHeading({
  children,
  level,
  color = "primary",
  className = "",
  gradient = false,
}: AccessibleHeadingProps) {
  const { colors, viewMode } = useAccessibility();
  const headingClasses = useAccessibilityText("heading", level);

  const getColorClass = () => {
    if (gradient && viewMode === "play") {
      return "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent";
    }

    switch (color) {
      case "primary":
        return colors.text;
      case "secondary":
        return colors.textSecondary;
      case "accent":
        return colors.accent;
      case "inherit":
        return "";
      default:
        return colors.text;
    }
  };

  const combinedClassName =
    `${headingClasses} font-bold ${getColorClass()} ${className}`.trim();
  const Component = level;

  return <Component className={combinedClassName}>{children}</Component>;
}

/**
 * Accessibility-aware button text with proper sizing
 */
export function AccessibleButtonText({
  children,
  className = "",
}: AccessibleButtonTextProps) {
  const buttonClasses = useAccessibilityText("button");

  return (
    <span className={`${buttonClasses} font-medium ${className}`.trim()}>
      {children}
    </span>
  );
}

/**
 * Accessibility-aware label component
 */
export function AccessibleLabel({
  children,
  className = "",
  required = false,
}: {
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}) {
  const { colors, getClasses } = useAccessibility();

  return (
    <label
      className={`${getClasses({ fontSize: "text" })} font-medium ${colors.text} ${className}`.trim()}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

/**
 * Accessibility-aware description text
 */
export function AccessibleDescription({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { colors, getClasses } = useAccessibility();

  return (
    <div
      className={`${getClasses({ fontSize: "text" })} ${colors.textSecondary} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

/**
 * Accessibility-aware error text
 */
export function AccessibleError({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { getClasses } = useAccessibility();

  return (
    <div
      className={`${getClasses({ fontSize: "text" })} text-red-500 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

/**
 * Accessibility-aware success text
 */
export function AccessibleSuccess({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { getClasses } = useAccessibility();

  return (
    <div
      className={`${getClasses({ fontSize: "text" })} text-green-500 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
