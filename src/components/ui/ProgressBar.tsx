interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "green" | "red" | "blue" | "orange" | "purple";
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  size = "md",
  color = "blue",
  className = "",
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const colorClasses = {
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm text-gray-500">
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface RatioBarProps {
  positive: number;
  negative: number;
  positiveLabel?: string;
  negativeLabel?: string;
  className?: string;
}

export function RatioBar({
  positive,
  negative,
  positiveLabel = "Assets",
  negativeLabel = "Liabilities",
  className = "",
}: RatioBarProps) {
  const total = positive + Math.abs(negative);
  const positivePercent = total > 0 ? (positive / total) * 100 : 0;
  const negativePercent = total > 0 ? (Math.abs(negative) / total) * 100 : 0;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
          <span className="text-sm font-medium text-gray-700">
            {positiveLabel}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700">
            {negativeLabel}
          </span>
          <div className="w-3 h-3 bg-red-500 rounded-full ml-2" />
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 flex overflow-hidden">
        {positivePercent > 0 && (
          <div
            className="bg-green-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${positivePercent}%` }}
          />
        )}
        {negativePercent > 0 && (
          <div
            className="bg-red-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${negativePercent}%` }}
          />
        )}
      </div>

      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">
          {positivePercent.toFixed(1)}%
        </span>
        <span className="text-xs text-gray-500">
          {negativePercent.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
