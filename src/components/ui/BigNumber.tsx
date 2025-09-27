import { AnimatedNumber } from "./AnimatedNumber";
import { InfoTooltip } from "./Tooltip";

interface BigNumberProps {
  value: number;
  label: string;
  explanation?: string;
  previousValue?: number;
  format?: "currency" | "number" | "percentage";
  size?: "sm" | "md" | "lg" | "xl";
  showChange?: boolean;
  showTooltip?: boolean;
  className?: string;
}

export function BigNumber({
  value,
  label,
  explanation,
  previousValue,
  format = "currency",
  size = "lg",
  showChange = true,
  showTooltip = true,
  className = "",
}: BigNumberProps) {
  const formatValue = (num: number) => {
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(num);
      case "percentage":
        return `${num.toFixed(1)}%`;
      case "number":
      default:
        return num.toLocaleString();
    }
  };

  const getChangeInfo = () => {
    if (!previousValue || !showChange) return null;

    const change = value - previousValue;
    const changePercent =
      previousValue !== 0 ? (change / Math.abs(previousValue)) * 100 : 0;

    return {
      change,
      changePercent,
      isPositive: change >= 0,
      formattedChange: formatValue(Math.abs(change)),
      formattedPercent: `${Math.abs(changePercent).toFixed(1)}%`,
    };
  };

  const changeInfo = getChangeInfo();

  const sizeClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl lg:text-7xl",
  };

  const getPlainEnglishExplanation = () => {
    if (explanation) return explanation;

    if (label.toLowerCase().includes("net worth")) {
      return "This is how much money you'd have if you sold everything and paid off all your debts.";
    }
    if (label.toLowerCase().includes("assets")) {
      return "This is the total value of everything you own (cash, investments, property).";
    }
    if (label.toLowerCase().includes("liabilities")) {
      return "This is the total amount you owe (credit cards, loans, mortgages).";
    }

    return `Your total ${label.toLowerCase()}.`;
  };

  return (
    <div className={`text-center ${className}`}>
      {/* Label with optional tooltip */}
      <div className="flex items-center justify-center mb-2">
        <h3 className="text-lg font-semibold text-gray-700 mr-2">{label}</h3>
        {showTooltip && <InfoTooltip content={getPlainEnglishExplanation()} />}
      </div>

      {/* Big number */}
      <div className={`font-bold text-gray-900 ${sizeClasses[size]} mb-2`}>
        <AnimatedNumber
          value={value}
          format={(num) => formatValue(num)}
          duration={1500}
          className="animate-count"
        />
      </div>

      {/* Plain English explanation */}
      <p className="text-base text-gray-600 mb-4 max-w-md mx-auto">
        {format === "currency" && value > 0 ? (
          <>
            You have <strong>{formatValue(value)}</strong> {label.toLowerCase()}
          </>
        ) : format === "currency" && value < 0 ? (
          <>
            You owe <strong>{formatValue(Math.abs(value))}</strong>{" "}
            {label.toLowerCase()}
          </>
        ) : (
          <>
            Your {label.toLowerCase()} is <strong>{formatValue(value)}</strong>
          </>
        )}
      </p>

      {/* Change indicator */}
      {changeInfo && (
        <div
          className={`flex items-center justify-center space-x-2 ${
            changeInfo.isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          <div
            className={`flex items-center text-lg font-semibold ${
              changeInfo.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            <span className="mr-1">{changeInfo.isPositive ? "↗️" : "↘️"}</span>
            <span>
              {changeInfo.isPositive ? "+" : "-"}
              {changeInfo.formattedChange}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({changeInfo.formattedPercent} this month)
          </span>
        </div>
      )}

      {/* Emotional feedback */}
      {changeInfo && (
        <p className="text-sm text-gray-600 mt-2 italic">
          {changeInfo.isPositive ? (
            <span className="text-green-700">
              👏 Great job! You're building wealth this month.
            </span>
          ) : (
            <span className="text-orange-600">
              ⚠️ Spending more than usual. Check your transactions.
            </span>
          )}
        </p>
      )}
    </div>
  );
}

interface CompactNumberProps {
  value: number;
  label: string;
  format?: "currency" | "number" | "percentage";
  change?: number;
  className?: string;
}

export function CompactNumber({
  value,
  label,
  format = "currency",
  change,
  className = "",
}: CompactNumberProps) {
  const formatValue = (num: number) => {
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(num);
      case "percentage":
        return `${num.toFixed(1)}%`;
      case "number":
      default:
        return num.toLocaleString();
    }
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 border border-gray-200 ${className}`}
    >
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900 mb-1">
        {formatValue(value)}
      </div>
      {change !== undefined && (
        <div
          className={`flex items-center text-sm ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          <span className="mr-1">{change >= 0 ? "📈" : "📉"}</span>
          <span>
            {change >= 0 ? "+" : ""}
            {formatValue(change)}
          </span>
        </div>
      )}
    </div>
  );
}
