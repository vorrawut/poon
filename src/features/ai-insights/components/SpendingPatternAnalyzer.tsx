import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  CreditCardIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareHeading,
  ThemeAwareButton,
  useTheme,
} from "../../../core";
import { cn } from "../../../libs/utils";
// import { useTranslation } from "../../../libs/i18n";

export interface SpendingPattern {
  id: string;
  type: "trend" | "recurring" | "anomaly" | "seasonal" | "behavioral";
  title: string;
  description: string;
  confidence: number; // 0-100
  impact: "low" | "medium" | "high";
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  category: string;
  amount: number;
  change: number; // percentage change
  suggestions: string[];
  data: {
    timeline: Array<{ date: string; amount: number }>;
    categories: Array<{ name: string; percentage: number; amount: number }>;
    triggers?: string[];
    predictedNext?: { date: string; amount: number };
  };
}

interface SpendingPatternAnalyzerProps {
  patterns: SpendingPattern[];
  className?: string;
  onPatternSelect?: (pattern: SpendingPattern) => void;
}

export function SpendingPatternAnalyzer({
  patterns,
  className,
  onPatternSelect,
}: SpendingPatternAnalyzerProps) {
  const { isPlayMode } = useTheme();
  // const { t } = useTranslation();
  const [selectedPattern, setSelectedPattern] =
    useState<SpendingPattern | null>(null);
  const [analysisView, setAnalysisView] = useState<
    "overview" | "trends" | "anomalies" | "predictions"
  >("overview");

  const getPatternIcon = (type: SpendingPattern["type"]) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case "trend":
        return <ArrowTrendingUpIcon className={iconClass} />;
      case "recurring":
        return <ArrowPathIcon className={iconClass} />;
      case "anomaly":
        return <ExclamationTriangleIcon className={iconClass} />;
      case "seasonal":
        return <CalendarIcon className={iconClass} />;
      case "behavioral":
        return <CreditCardIcon className={iconClass} />;
      default:
        return <ChartBarIcon className={iconClass} />;
    }
  };

  const getPatternColor = (
    type: SpendingPattern["type"],
    impact: SpendingPattern["impact"],
  ) => {
    if (isPlayMode) {
      switch (type) {
        case "trend":
          return impact === "high"
            ? "text-purple-400 border-purple-500/50"
            : "text-blue-400 border-blue-500/50";
        case "anomaly":
          return "text-red-400 border-red-500/50";
        case "recurring":
          return "text-green-400 border-green-500/50";
        case "seasonal":
          return "text-yellow-400 border-yellow-500/50";
        case "behavioral":
          return "text-pink-400 border-pink-500/50";
        default:
          return "text-gray-400 border-gray-500/50";
      }
    } else {
      switch (impact) {
        case "high":
          return "text-red-600 border-red-200";
        case "medium":
          return "text-orange-600 border-orange-200";
        case "low":
          return "text-blue-600 border-blue-200";
        default:
          return "text-gray-600 border-gray-200";
      }
    }
  };

  const filteredPatterns = useMemo(() => {
    switch (analysisView) {
      case "trends":
        return patterns.filter((p) => p.type === "trend");
      case "anomalies":
        return patterns.filter((p) => p.type === "anomaly");
      case "predictions":
        return patterns.filter((p) => p.data.predictedNext);
      default:
        return patterns;
    }
  }, [patterns, analysisView]);

  const highImpactPatterns = patterns.filter((p) => p.impact === "high");
  const totalPotentialSavings = patterns.reduce((sum, p) => {
    return sum + (p.change < 0 ? Math.abs(p.amount * (p.change / 100)) : 0);
  }, 0);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with Analysis Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <ThemeAwareHeading level="h2" className="text-xl font-bold mb-2">
            {isPlayMode
              ? "🧠 AI Pattern Intelligence"
              : "Spending Pattern Analysis"}
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary" className="text-sm">
            {highImpactPatterns.length} high-impact patterns detected •
            Potential monthly savings: ฿{totalPotentialSavings.toLocaleString()}
          </ThemeAwareText>
        </div>

        <div className="flex gap-2">
          {(["overview", "trends", "anomalies", "predictions"] as const).map(
            (view) => (
              <ThemeAwareButton
                key={view}
                variant={analysisView === view ? "primary" : "ghost"}
                size="sm"
                onClick={() => setAnalysisView(view)}
                className="capitalize"
              >
                {view}
              </ThemeAwareButton>
            ),
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Patterns Found",
            value: patterns.length,
            icon: ChartBarIcon,
          },
          {
            label: "High Impact",
            value: highImpactPatterns.length,
            icon: ExclamationTriangleIcon,
          },
          {
            label: "Avg Confidence",
            value: `${Math.round(patterns.reduce((sum, p) => sum + p.confidence, 0) / patterns.length)}%`,
            icon: ArrowTrendingUpIcon,
          },
          {
            label: "Potential Savings",
            value: `฿${Math.round(totalPotentialSavings)}`,
            icon: ArrowTrendingDownIcon,
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ThemeAwareCard className="p-4 text-center">
              <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary-500" />
              <div className="text-lg font-bold">{stat.value}</div>
              <ThemeAwareText color="secondary" className="text-xs">
                {stat.label}
              </ThemeAwareText>
            </ThemeAwareCard>
          </motion.div>
        ))}
      </div>

      {/* Pattern Cards */}
      <div className="space-y-4">
        {filteredPatterns.map((pattern, index) => (
          <motion.div
            key={pattern.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ThemeAwareCard
              className={cn(
                "p-6 cursor-pointer transition-all duration-300 hover:shadow-lg",
                getPatternColor(pattern.type, pattern.impact),
                selectedPattern?.id === pattern.id && "ring-2 ring-primary-500",
              )}
              onClick={() => {
                setSelectedPattern(pattern);
                onPatternSelect?.(pattern);
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      isPlayMode
                        ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                        : "bg-gray-100",
                    )}
                  >
                    {getPatternIcon(pattern.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{pattern.title}</h3>
                    <div className="flex items-center gap-2 text-sm opacity-75">
                      <span className="capitalize">{pattern.type}</span>
                      <span>•</span>
                      <span>{pattern.frequency}</span>
                      <span>•</span>
                      <span>{pattern.confidence}% confidence</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold">
                    ฿{Math.abs(pattern.amount).toLocaleString()}
                  </div>
                  <div
                    className={cn(
                      "flex items-center text-sm",
                      pattern.change > 0 ? "text-red-500" : "text-green-500",
                    )}
                  >
                    {pattern.change > 0 ? (
                      <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(pattern.change)}%
                  </div>
                </div>
              </div>

              <ThemeAwareText className="mb-4">
                {pattern.description}
              </ThemeAwareText>

              {/* Impact Indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium opacity-75">
                    Impact:
                  </span>
                  <div
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      pattern.impact === "high"
                        ? "bg-red-100 text-red-800"
                        : pattern.impact === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800",
                    )}
                  >
                    {pattern.impact.toUpperCase()}
                  </div>
                </div>

                <div className="text-xs opacity-75">{pattern.category}</div>
              </div>

              {/* Suggestions Preview */}
              {pattern.suggestions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200/20">
                  <div className="text-xs font-medium opacity-75 mb-2">
                    AI Suggestions:
                  </div>
                  <ul className="text-sm space-y-1">
                    {pattern.suggestions.slice(0, 2).map((suggestion, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                    {pattern.suggestions.length > 2 && (
                      <li className="text-xs opacity-60">
                        +{pattern.suggestions.length - 2} more suggestions
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </ThemeAwareCard>
          </motion.div>
        ))}
      </div>

      {filteredPatterns.length === 0 && (
        <ThemeAwareCard className="p-8 text-center">
          <ChartBarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <ThemeAwareText className="text-lg mb-2">
            No patterns found for this view
          </ThemeAwareText>
          <ThemeAwareText color="secondary">
            Try switching to a different analysis view or check back later as
            more data becomes available.
          </ThemeAwareText>
        </ThemeAwareCard>
      )}
    </div>
  );
}

// Utility functions moved to ../utils/spendingPatternUtils.ts to fix React Fast Refresh warnings
