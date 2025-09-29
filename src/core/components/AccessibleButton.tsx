import React from "react";
import { motion } from "framer-motion";
import {
  useAccessibility,
  useAccessibilityMotion,
} from "../../hooks/useAccessibility";

interface AccessibleButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  title?: string;
}

interface AccessibleIconButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  "aria-label": string;
}

interface AccessibleQuickActionProps {
  icon: string;
  title: string;
  description: string;
  color: "green" | "blue" | "purple" | "orange" | "red";
  onClick?: () => void;
  className?: string;
}

/**
 * Accessibility-aware button with proper sizing and touch targets
 */
export function AccessibleButton({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  type = "button",
  fullWidth = false,
  title,
}: AccessibleButtonProps) {
  const { getClasses, isElderMode } = useAccessibility();
  const motionProps = useAccessibilityMotion();

  const getVariantClasses = () => {
    const baseClasses =
      "font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

    switch (variant) {
      case "primary":
        return `${baseClasses} bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-300`;
      case "secondary":
        return `${baseClasses} bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100`;
      case "ghost":
        return `${baseClasses} bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500`;
      case "outline":
        return `${baseClasses} border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500`;
      case "danger":
        return `${baseClasses} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300`;
      default:
        return baseClasses;
    }
  };

  const getSizeClasses = () => {
    const buttonSize = getClasses({ fontSize: "button" });

    switch (size) {
      case "sm":
        return `${buttonSize} px-3 py-2 min-h-[36px]`;
      case "lg":
        return `${buttonSize} px-8 py-4 min-h-[52px]`;
      case "md":
      default:
        return buttonSize;
    }
  };

  const combinedClassName = `
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  const buttonContent = (
    <>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </>
  );

  // Use motion only if not elder mode or if reduced motion is disabled
  if (isElderMode) {
    return (
      <button
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={combinedClassName}
        title={title}
      >
        {buttonContent}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={combinedClassName}
      title={title}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  );
}

/**
 * Accessibility-aware icon button with proper touch targets
 */
export function AccessibleIconButton({
  children,
  variant = "ghost",
  size = "md",
  disabled = false,
  className = "",
  onClick,
  "aria-label": ariaLabel,
}: AccessibleIconButtonProps) {
  const { isElderMode } = useAccessibility();
  const motionProps = useAccessibilityMotion();

  const getVariantClasses = () => {
    const baseClasses =
      "rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

    switch (variant) {
      case "primary":
        return `${baseClasses} bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500`;
      case "secondary":
        return `${baseClasses} bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500`;
      case "ghost":
      default:
        return `${baseClasses} text-gray-700 hover:bg-gray-100 focus:ring-gray-500`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "p-2 min-h-[36px] min-w-[36px]";
      case "lg":
        return "p-4 min-h-[52px] min-w-[52px]";
      case "md":
      default:
        return "p-3 min-h-[44px] min-w-[44px]";
    }
  };

  const combinedClassName = `
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
    flex items-center justify-center
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  if (isElderMode) {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={combinedClassName}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      disabled={disabled}
      onClick={onClick}
      className={combinedClassName}
      aria-label={ariaLabel}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}

/**
 * Accessibility-aware quick action button with icon, title, and description
 */
export function AccessibleQuickAction({
  icon,
  title,
  description,
  color,
  onClick,
  className = "",
}: AccessibleQuickActionProps) {
  const { getClasses, isElderMode } = useAccessibility();
  const motionProps = useAccessibilityMotion();

  const getColorClasses = () => {
    switch (color) {
      case "green":
        return "bg-green-50 hover:bg-green-100 border-2 border-green-200 text-green-800";
      case "blue":
        return "bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 text-blue-800";
      case "purple":
        return "bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 text-purple-800";
      case "orange":
        return "bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 text-orange-800";
      case "red":
        return "bg-red-50 hover:bg-red-100 border-2 border-red-200 text-red-800";
      default:
        return "bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 text-gray-800";
    }
  };

  const getDescriptionColor = () => {
    switch (color) {
      case "green":
        return "text-green-600";
      case "blue":
        return "text-blue-600";
      case "purple":
        return "text-purple-600";
      case "orange":
        return "text-orange-600";
      case "red":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const combinedClassName = `
    ${getColorClasses()}
    rounded-xl text-center transition-all cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500
    ${getClasses({ includeSpacing: true })}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  const buttonContent = (
    <>
      <div className="text-4xl mb-3">{icon}</div>
      <div className={`font-semibold mb-1 ${getClasses({ fontSize: "text" })}`}>
        {title}
      </div>
      <div
        className={`text-sm ${getDescriptionColor()} ${getClasses({ fontSize: "text" })}`}
      >
        {description}
      </div>
    </>
  );

  if (isElderMode) {
    return (
      <button onClick={onClick} className={combinedClassName}>
        {buttonContent}
      </button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={combinedClassName}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  );
}
