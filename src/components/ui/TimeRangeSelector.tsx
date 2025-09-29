import { CalendarDaysIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import {
  AccessibleHeading,
  AccessibleText,
  AccessibleButton,
} from "../../core";

type TimeRange = "7d" | "30d" | "90d";

interface TimeRangeOption {
  value: TimeRange;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const timeRangeOptions: TimeRangeOption[] = [
  {
    value: "7d",
    label: "7 Days",
    shortLabel: "Week",
    icon: CalendarDaysIcon,
    description: "See your finances from the past week",
  },
  {
    value: "30d",
    label: "30 Days",
    shortLabel: "Month",
    icon: ChartBarIcon,
    description: "View your monthly financial summary",
  },
  {
    value: "90d",
    label: "90 Days",
    shortLabel: "Quarter",
    icon: ChartBarIcon,
    description: "Long-term view of your financial trends",
  },
];

export function TimeRangeSelector({
  value,
  onChange,
  size = "lg",
  className = "",
}: TimeRangeSelectorProps) {
  const sizeClasses = {
    sm: {
      container: "p-1",
      button: "px-3 py-2 text-sm",
      icon: "h-4 w-4",
      text: "text-sm",
    },
    md: {
      container: "p-2",
      button: "px-4 py-3 text-base",
      icon: "h-5 w-5",
      text: "text-base",
    },
    lg: {
      container: "p-2",
      button: "px-6 py-4 text-lg",
      icon: "h-6 w-6",
      text: "text-lg",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`inline-block ${className}`}>
      <div className="mb-3">
        <AccessibleHeading level="h4" className="mb-1">
          View Period
        </AccessibleHeading>
        <AccessibleText variant="caption" color="tertiary">
          Choose how far back to look
        </AccessibleText>
      </div>

      <div
        className={`bg-gray-100 rounded-xl ${classes.container} flex space-x-1`}
      >
        {timeRangeOptions.map((option) => {
          const IconComponent = option.icon;
          const isSelected = value === option.value;

          return (
            <AccessibleButton
              key={option.value}
              variant={isSelected ? "primary" : "ghost"}
              size="sm"
              onClick={() => onChange(option.value)}
              className="flex-1 flex flex-col items-center space-y-1"
              title={option.description}
            >
              <IconComponent className={classes.icon} />
              <AccessibleText variant="caption" className="font-semibold">
                {option.shortLabel}
              </AccessibleText>
              <AccessibleText variant="caption" color="tertiary">
                {option.label}
              </AccessibleText>
            </AccessibleButton>
          );
        })}
      </div>

      {/* Simple toggle for less tech-savvy users */}
      <div className="mt-4 flex justify-center">
        <div className="bg-white border border-gray-200 rounded-lg p-1 flex">
          <button
            onClick={() => onChange(value === "7d" ? "30d" : "7d")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              ["7d", "30d"].includes(value)
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            📅 Short Term
          </button>
          <button
            onClick={() => onChange("90d")}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              value === "90d"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            📈 Long Term
          </button>
        </div>
      </div>
    </div>
  );
}
