import React, { forwardRef } from "react";
import { clsx } from "clsx";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, helperText, children, ...props }, ref) => {
    return (
      <div className="w-full">
        <select
          ref={ref}
          className={clsx(
            "flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-white",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-primary-500",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        {helperText && (
          <p
            className={clsx(
              "mt-1 text-xs",
              error ? "text-red-600" : "text-gray-500",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
