import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LightBulbIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  useTheme,
} from "../../../core";
import { cn } from "../../../libs/utils";

export type InsightType =
  | "tip"
  | "opportunity"
  | "warning"
  | "achievement"
  | "prediction"
  | "optimization";

export interface AIInsight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  impact: "low" | "medium" | "high";
  confidence: number; // 0-100
  actionable: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  data?: {
    amount?: number;
    percentage?: number;
    timeline?: string;
    category?: string;
  };
}

interface AIInsightCardProps {
  insight: AIInsight;
  className?: string;
  onDismiss?: (id: string) => void;
  animated?: boolean;
}

const insightConfig = {
  tip: {
    icon: LightBulbIcon,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    emoji: "💡",
  },
  opportunity: {
    icon: ArrowTrendingUpIcon,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    emoji: "🚀",
  },
  warning: {
    icon: ExclamationTriangleIcon,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    emoji: "⚠️",
  },
  achievement: {
    icon: CheckCircleIcon,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    emoji: "🏆",
  },
  prediction: {
    icon: InformationCircleIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    emoji: "🔮",
  },
  optimization: {
    icon: SparklesIcon,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    emoji: "✨",
  },
};

export function AIInsightCard({
  insight,
  className,
  onDismiss,
  animated = true,
}: AIInsightCardProps) {
  const { isPlayMode } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  const config = insightConfig[insight.type];
  const Icon = config.icon;

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss?.(insight.id), 300);
  };

  const impactIntensity = {
    low: "opacity-70",
    medium: "opacity-85",
    high: "opacity-100",
  };

  const confidenceColor =
    insight.confidence >= 80
      ? "text-green-400"
      : insight.confidence >= 60
        ? "text-yellow-400"
        : "text-orange-400";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={animated ? { opacity: 0, y: 20, scale: 0.95 } : {}}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={className}
        >
          <ThemeAwareCard
            className={cn(
              "relative overflow-hidden transition-all duration-300",
              config.bgColor,
              config.borderColor,
              "border",
              isPlayMode && "hover:shadow-lg hover:shadow-purple-500/10",
              impactIntensity[insight.impact],
            )}
            hover={isPlayMode}
          >
            {/* Cosmic Background Effect for Play Mode */}
            {isPlayMode && (
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-400 to-transparent rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400 to-transparent rounded-full blur-xl" />
              </div>
            )}

            <div className="relative z-10 p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {/* Icon/Emoji */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full",
                      config.bgColor,
                      "border",
                      config.borderColor,
                    )}
                  >
                    {isPlayMode ? (
                      <span className="text-lg">{config.emoji}</span>
                    ) : (
                      <Icon className={cn("w-5 h-5", config.color)} />
                    )}
                  </div>

                  {/* Title and Type */}
                  <div>
                    <ThemeAwareText
                      className="text-sm font-medium capitalize"
                      color="secondary"
                    >
                      {insight.type}
                    </ThemeAwareText>
                    <ThemeAwareText className="font-semibold" color="primary">
                      {insight.title}
                    </ThemeAwareText>
                  </div>
                </div>

                {/* Confidence Score */}
                <div className="flex items-center space-x-2">
                  <div className={cn("text-xs font-medium", confidenceColor)}>
                    {insight.confidence}%
                  </div>
                  {onDismiss && (
                    <button
                      onClick={handleDismiss}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Description */}
              <ThemeAwareText
                className="text-sm mb-4 leading-relaxed"
                color="secondary"
              >
                {insight.description}
              </ThemeAwareText>

              {/* Data Visualization */}
              {insight.data && (
                <div className="mb-4 p-3 rounded-lg bg-black/5 dark:bg-white/5">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {insight.data.amount && (
                      <div>
                        <ThemeAwareText className="text-xs" color="tertiary">
                          Amount
                        </ThemeAwareText>
                        <ThemeAwareText
                          className="font-semibold"
                          color="primary"
                        >
                          ฿{insight.data.amount.toLocaleString()}
                        </ThemeAwareText>
                      </div>
                    )}
                    {insight.data.percentage && (
                      <div>
                        <ThemeAwareText className="text-xs" color="tertiary">
                          Impact
                        </ThemeAwareText>
                        <ThemeAwareText
                          className={cn(
                            "font-semibold",
                            insight.data.percentage > 0
                              ? "text-green-500"
                              : "text-red-500",
                          )}
                        >
                          {insight.data.percentage > 0 ? "+" : ""}
                          {insight.data.percentage}%
                        </ThemeAwareText>
                      </div>
                    )}
                    {insight.data.timeline && (
                      <div className="col-span-2">
                        <ThemeAwareText className="text-xs" color="tertiary">
                          Timeline
                        </ThemeAwareText>
                        <ThemeAwareText
                          className="font-semibold"
                          color="primary"
                        >
                          {insight.data.timeline}
                        </ThemeAwareText>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Button */}
              {insight.actionable && insight.action && (
                <ThemeAwareButton
                  variant={isPlayMode ? "cosmic" : "primary"}
                  size="sm"
                  onClick={insight.action.onClick}
                  className="w-full"
                  glow={isPlayMode && insight.impact === "high"}
                >
                  {insight.action.label}
                </ThemeAwareButton>
              )}

              {/* Impact Indicator */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200/20">
                <div className="flex items-center space-x-2">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      insight.impact === "high"
                        ? "bg-red-400"
                        : insight.impact === "medium"
                          ? "bg-yellow-400"
                          : "bg-green-400",
                    )}
                  />
                  <ThemeAwareText
                    className="text-xs capitalize"
                    color="tertiary"
                  >
                    {insight.impact} impact
                  </ThemeAwareText>
                </div>

                {/* AI Badge */}
                <div className="flex items-center space-x-1">
                  <SparklesIcon className="w-3 h-3 text-purple-400" />
                  <ThemeAwareText
                    className="text-xs font-medium"
                    color="tertiary"
                  >
                    AI Insight
                  </ThemeAwareText>
                </div>
              </div>
            </div>

            {/* Animated Border for High Impact */}
            {insight.impact === "high" && isPlayMode && (
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-purple-500/50"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}
          </ThemeAwareCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// AI Insights Container Component
interface AIInsightsContainerProps {
  insights: AIInsight[];
  maxVisible?: number;
  className?: string;
  onInsightDismiss?: (id: string) => void;
}

export function AIInsightsContainer({
  insights,
  maxVisible = 3,
  className,
  onInsightDismiss,
}: AIInsightsContainerProps) {
  const [visibleInsights, setVisibleInsights] = useState<AIInsight[]>([]);
  const { isPlayMode } = useTheme();

  useEffect(() => {
    // Sort by impact and confidence, then take the top insights
    const sortedInsights = [...insights]
      .sort((a, b) => {
        const impactWeight = { high: 3, medium: 2, low: 1 };
        const aScore = impactWeight[a.impact] * (a.confidence / 100);
        const bScore = impactWeight[b.impact] * (b.confidence / 100);
        return bScore - aScore;
      })
      .slice(0, maxVisible);

    setVisibleInsights(sortedInsights);
  }, [insights, maxVisible]);

  const handleInsightDismiss = (id: string) => {
    setVisibleInsights((prev) => prev.filter((insight) => insight.id !== id));
    onInsightDismiss?.(id);
  };

  if (visibleInsights.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="w-5 h-5 text-purple-500" />
          <ThemeAwareText className="font-semibold" color="primary">
            AI Financial Insights
          </ThemeAwareText>
        </div>
        <ThemeAwareText className="text-sm" color="tertiary">
          {visibleInsights.length} active
        </ThemeAwareText>
      </div>

      {/* Insights Grid */}
      <div
        className={cn(
          "grid gap-4",
          visibleInsights.length === 1
            ? "grid-cols-1"
            : visibleInsights.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {visibleInsights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AIInsightCard
              insight={insight}
              onDismiss={handleInsightDismiss}
              animated={isPlayMode}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
