import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LightBulbIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  SparklesIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  useTheme,
} from "../../../core";
import { cn } from "../../../libs/utils";

export type EnhancedInsightType =
  | "tip"
  | "opportunity"
  | "warning"
  | "achievement"
  | "prediction"
  | "optimization"
  | "cultural"
  | "pattern"
  | "goal_suggestion"
  | "risk_alert";

export interface EnhancedAIInsight {
  id: string;
  type: EnhancedInsightType;
  title: string;
  message: string;
  impact: "low" | "medium" | "high" | "critical";
  confidence: "low" | "medium" | "high";
  category:
    | "spending"
    | "saving"
    | "investing"
    | "budgeting"
    | "goals"
    | "general"
    | "optimization";
  actionLabel?: string;
  onAction?: () => void;
  data?: {
    amount?: number;
    percentage?: number;
    timeline?: string;
    comparison?: string;
    trend?: "up" | "down" | "stable";
  };
  priority: number; // 1-10, higher is more important
  createdAt: Date;
  expiresAt?: Date;
  isPersonalized: boolean;
  tags: string[];
}

const enhancedInsightConfig = {
  tip: {
    icon: LightBulbIcon,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    emoji: "💡",
    cosmicColor: "#FCD34D",
  },
  opportunity: {
    icon: ArrowTrendingUpIcon,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    emoji: "🚀",
    cosmicColor: "#10B981",
  },
  warning: {
    icon: ExclamationTriangleIcon,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    emoji: "⚠️",
    cosmicColor: "#EF4444",
  },
  achievement: {
    icon: CheckCircleIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    emoji: "🏆",
    cosmicColor: "#3B82F6",
  },
  prediction: {
    icon: InformationCircleIcon,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    emoji: "🔮",
    cosmicColor: "#6366F1",
  },
  optimization: {
    icon: SparklesIcon,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    emoji: "✨",
    cosmicColor: "#8B5CF6",
  },
  cultural: {
    icon: SparklesIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    emoji: "🇹🇭",
    cosmicColor: "#EC4899",
  },
  pattern: {
    icon: ChartBarIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    emoji: "📊",
    cosmicColor: "#F97316",
  },
  goal_suggestion: {
    icon: CurrencyDollarIcon,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    emoji: "🎯",
    cosmicColor: "#059669",
  },
  risk_alert: {
    icon: ClockIcon,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    emoji: "🚨",
    cosmicColor: "#F43F5E",
  },
};

interface EnhancedAIInsightCardProps {
  insight: EnhancedAIInsight;
  className?: string;
  onDismiss?: (id: string) => void;
  animated?: boolean;
  showDetails?: boolean;
}

export function EnhancedAIInsightCard({
  insight,
  className,
  onDismiss,
  animated = true,
  showDetails = false,
}: EnhancedAIInsightCardProps) {
  const { isPlayMode } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(showDetails);
  const [isProcessing, setIsProcessing] = useState(false);

  const config = enhancedInsightConfig[insight.type];
  const Icon = config.icon;

  // Calculate urgency based on impact, confidence, and priority
  const getUrgencyLevel = () => {
    const impactScore = { low: 1, medium: 2, high: 3, critical: 4 }[
      insight.impact
    ];
    const confidenceScore = { low: 1, medium: 2, high: 3 }[insight.confidence];
    const urgency = (impactScore * confidenceScore * insight.priority) / 10;

    if (urgency >= 8) return "critical";
    if (urgency >= 6) return "high";
    if (urgency >= 4) return "medium";
    return "low";
  };

  const urgencyLevel = getUrgencyLevel();

  // Check if insight is expiring soon
  const isExpiringSoon =
    insight.expiresAt &&
    insight.expiresAt.getTime() - new Date().getTime() < 24 * 60 * 60 * 1000; // 24 hours

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      setTimeout(() => onDismiss(insight.id), 300);
    }
  };

  const handleAction = async () => {
    if (insight.onAction) {
      setIsProcessing(true);
      try {
        await insight.onAction();
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const cardContent = (
    <ThemeAwareCard
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        config.bgColor,
        config.borderColor,
        "border rounded-xl",
        isPlayMode && "shadow-lg backdrop-blur-sm",
        isPlayMode && `shadow-[${config.cosmicColor}]/20`,
        urgencyLevel === "critical" && "ring-2 ring-red-500/50",
        urgencyLevel === "high" && "ring-1 ring-orange-500/50",
        isExpanded ? "p-6" : "p-4",
        className,
      )}
      animated={animated && isPlayMode}
    >
      {/* Cosmic Background Effect for Play Mode */}
      {isPlayMode && (
        <>
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background: `radial-gradient(circle at 20% 80%, ${config.cosmicColor}40 0%, transparent 50%)`,
            }}
          />
          <div
            className="absolute top-0 right-0 w-20 h-20 opacity-10"
            style={{
              background: `radial-gradient(circle, ${config.cosmicColor}60 0%, transparent 70%)`,
              filter: "blur(10px)",
            }}
          />
        </>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="flex items-start space-x-3 flex-1">
          {/* Icon with Glow Effect */}
          <motion.div
            className={cn(
              "flex-shrink-0 p-2 rounded-full relative",
              config.bgColor,
              isPlayMode && "shadow-lg",
            )}
            animate={
              isPlayMode
                ? {
                    boxShadow: [
                      `0 0 10px ${config.cosmicColor}40`,
                      `0 0 20px ${config.cosmicColor}60`,
                      `0 0 10px ${config.cosmicColor}40`,
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon className={cn("h-6 w-6", config.color)} aria-hidden="true" />
            {isPlayMode && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: config.cosmicColor }}
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <ThemeAwareText
                weight="bold"
                className={cn(config.color, "text-lg")}
                gradient={isPlayMode}
              >
                {config.emoji} {insight.title}
              </ThemeAwareText>

              {/* Priority Badge */}
              {insight.priority >= 8 && (
                <motion.span
                  className="px-2 py-1 text-xs font-bold rounded-full bg-red-500 text-white"
                  animate={isPlayMode ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  HIGH
                </motion.span>
              )}

              {/* Personalized Badge */}
              {insight.isPersonalized && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400">
                  Personal
                </span>
              )}
            </div>

            <ThemeAwareText color="secondary" className="mb-2 text-sm">
              {insight.message}
            </ThemeAwareText>

            {/* Data Visualization */}
            {insight.data && (
              <div className="flex flex-wrap gap-3 mb-3 text-xs">
                {insight.data.amount && (
                  <div className="flex items-center gap-1">
                    <CurrencyDollarIcon className="h-3 w-3" />
                    <span>฿{insight.data.amount.toLocaleString()}</span>
                  </div>
                )}
                {insight.data.percentage && (
                  <div className="flex items-center gap-1">
                    <ChartBarIcon className="h-3 w-3" />
                    <span>{insight.data.percentage}%</span>
                  </div>
                )}
                {insight.data.timeline && (
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-3 w-3" />
                    <span>{insight.data.timeline}</span>
                  </div>
                )}
              </div>
            )}

            {/* Tags */}
            {insight.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {insight.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-2">
          {/* Expand/Collapse Button */}
          <ThemeAwareButton
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </ThemeAwareButton>

          {/* Dismiss Button */}
          {onDismiss && (
            <ThemeAwareButton
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="p-1"
              aria-label="Dismiss insight"
            >
              <XMarkIcon className="w-4 h-4" />
            </ThemeAwareButton>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <div className="border-t border-[var(--color-border-secondary)] pt-4 space-y-3">
              {/* Confidence and Impact Indicators */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <ThemeAwareText color="secondary" className="mb-1 text-sm">
                    Confidence Level
                  </ThemeAwareText>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          insight.confidence === "high"
                            ? "bg-green-500"
                            : insight.confidence === "medium"
                              ? "bg-yellow-500"
                              : "bg-red-500",
                        )}
                        style={{
                          width:
                            insight.confidence === "high"
                              ? "100%"
                              : insight.confidence === "medium"
                                ? "66%"
                                : "33%",
                        }}
                      />
                    </div>
                    <span className="text-xs capitalize">
                      {insight.confidence}
                    </span>
                  </div>
                </div>

                <div>
                  <ThemeAwareText color="secondary" className="mb-1 text-sm">
                    Impact Level
                  </ThemeAwareText>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          insight.impact === "critical"
                            ? "bg-red-500"
                            : insight.impact === "high"
                              ? "bg-orange-500"
                              : insight.impact === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500",
                        )}
                        style={{
                          width:
                            insight.impact === "critical"
                              ? "100%"
                              : insight.impact === "high"
                                ? "75%"
                                : insight.impact === "medium"
                                  ? "50%"
                                  : "25%",
                        }}
                      />
                    </div>
                    <span className="text-xs capitalize">{insight.impact}</span>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <ThemeAwareText color="secondary" className="text-sm">
                    Category:
                  </ThemeAwareText>
                  <ThemeAwareText className="capitalize text-sm">
                    {insight.category}
                  </ThemeAwareText>
                </div>
                <div className="flex justify-between">
                  <ThemeAwareText color="secondary" className="text-sm">
                    Created:
                  </ThemeAwareText>
                  <ThemeAwareText className="text-sm">
                    {insight.createdAt.toLocaleDateString()}
                  </ThemeAwareText>
                </div>
                {insight.expiresAt && (
                  <div className="flex justify-between">
                    <ThemeAwareText color="secondary" className="text-sm">
                      Expires:
                    </ThemeAwareText>
                    <ThemeAwareText
                      className={cn(
                        "text-sm",
                        isExpiringSoon ? "text-red-500" : "",
                      )}
                    >
                      {insight.expiresAt.toLocaleDateString()}
                      {isExpiringSoon && " (Soon!)"}
                    </ThemeAwareText>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Button */}
      {insight.actionLabel && insight.onAction && (
        <div className="relative z-10 pt-4 border-t border-[var(--color-border-secondary)]">
          <ThemeAwareButton
            variant={isPlayMode ? "cosmic" : "primary"}
            size="sm"
            onClick={handleAction}
            disabled={isProcessing}
            className="w-full"
            glow={isPlayMode}
          >
            {isProcessing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              insight.actionLabel
            )}
          </ThemeAwareButton>
        </div>
      )}

      {/* Expiring Soon Warning */}
      {isExpiringSoon && (
        <motion.div
          className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </ThemeAwareCard>
  );

  if (!animated) {
    return isVisible ? cardContent : null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            scale: 0.9,
            transition: { duration: 0.2 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          layout
        >
          {cardContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
