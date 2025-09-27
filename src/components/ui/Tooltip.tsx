import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = "top",
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children || (
          <InformationCircleIcon className="h-5 w-5 text-blue-500 hover:text-blue-600" />
        )}
      </div>

      {isVisible && (
        <div className={`absolute z-50 ${positionClasses[position]}`}>
          <div className="bg-gray-900 text-white text-sm rounded-lg px-4 py-3 max-w-xs shadow-lg">
            <div className="relative">
              {content}
              {/* Arrow pointing to trigger */}
              <div
                className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
                  position === "top"
                    ? "top-full left-1/2 -translate-x-1/2 -mt-1"
                    : position === "bottom"
                      ? "bottom-full left-1/2 -translate-x-1/2 -mb-1"
                      : position === "left"
                        ? "left-full top-1/2 -translate-y-1/2 -ml-1"
                        : "right-full top-1/2 -translate-y-1/2 -mr-1"
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface InfoTooltipProps {
  content: string;
  className?: string;
}

export function InfoTooltip({ content, className = "" }: InfoTooltipProps) {
  return (
    <Tooltip content={content} className={className}>
      <InformationCircleIcon className="h-5 w-5 text-blue-500 hover:text-blue-600 transition-colors" />
    </Tooltip>
  );
}
