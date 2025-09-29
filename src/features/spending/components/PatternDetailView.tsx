import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ChartBarIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
  useTheme,
} from "../../../core";
import { cn } from "../../../libs/utils";
import type { SpendingPattern } from "./SpendingPatternAnalyzer";

interface PatternDetailViewProps {
  pattern: SpendingPattern;
  onClose: () => void;
  onTakeAction?: (actionType: string, data?: any) => void;
  className?: string;
}

// Simple visualization components
function LineChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <div className="relative h-32 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <svg className="w-full h-full" viewBox="0 0 300 100">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={data
            .map((value, index) => {
              const x = (index / (data.length - 1)) * 280 + 10;
              const y = 90 - ((value - min) / range) * 80;
              return `${x},${y}`;
            })
            .join(" ")}
        />
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 280 + 10;
          const y = 90 - ((value - min) / range) * 80;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill={color}
              className="hover:r-4 transition-all"
            />
          );
        })}
      </svg>
      <div className="absolute bottom-1 left-4 text-xs text-gray-500">
        Min: ฿{min.toLocaleString()}
      </div>
      <div className="absolute bottom-1 right-4 text-xs text-gray-500">
        Max: ฿{max.toLocaleString()}
      </div>
    </div>
  );
}

function BarChart({
  data,
  labels,
  color,
}: {
  data: number[];
  labels: string[];
  color: string;
}) {
  const max = Math.max(...data);

  return (
    <div className="relative h-32 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <div className="flex items-end justify-between h-full gap-1">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full rounded-t transition-all duration-500 hover:opacity-80"
              style={{
                height: `${(value / max) * 100}%`,
                backgroundColor: color,
                minHeight: "4px",
              }}
            />
            <div className="text-xs text-gray-500 mt-1 truncate w-full text-center">
              {labels[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeatmapChart({ data, color }: { data: number[][]; color: string }) {
  const max = Math.max(...data.flat());
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <div className="grid grid-cols-8 gap-1">
        <div></div>
        {days.map((day) => (
          <div key={day} className="text-xs text-gray-500 text-center p-1">
            {day}
          </div>
        ))}
        {data.map((week, weekIndex) => (
          <>
            <div
              key={`week-${weekIndex}`}
              className="text-xs text-gray-500 p-1"
            >
              {weeks[weekIndex]}
            </div>
            {week.map((value, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className="aspect-square rounded transition-all hover:scale-110"
                style={{
                  backgroundColor: `${color}${Math.floor((value / max) * 255)
                    .toString(16)
                    .padStart(2, "0")}`,
                }}
                title={`${days[dayIndex]}: ฿${value.toLocaleString()}`}
              />
            ))}
          </>
        ))}
      </div>
    </div>
  );
}

export function PatternDetailView({
  pattern,
  onClose,
  onTakeAction,
  className,
}: PatternDetailViewProps) {
  const { isPlayMode } = useTheme();
  const [activeTab, setActiveTab] = useState<
    "overview" | "insights" | "recommendations" | "actions"
  >("overview");

  const patternTypeConfig = {
    trend: {
      icon: ArrowTrendingUpIcon,
      color: "#3B82F6",
      name: "Trend Analysis",
    },
    seasonal: {
      icon: CalendarIcon,
      color: "#10B981",
      name: "Seasonal Pattern",
    },
    recurring: { icon: ClockIcon, color: "#8B5CF6", name: "Recurring Expense" },
    anomaly: {
      icon: ExclamationTriangleIcon,
      color: "#EF4444",
      name: "Anomaly Detected",
    },
    behavioral: {
      icon: ClockIcon,
      color: "#F59E0B",
      name: "Behavioral Pattern",
    },
  };

  const config = patternTypeConfig[pattern.type];
  const Icon = config.icon;

  // Generate sample data for visualizations
  const generateSampleData = () => {
    switch (pattern.visualizationType) {
      case "line":
        return Array.from(
          { length: 12 },
          (_, i) =>
            Math.random() * 10000 +
            5000 +
            (pattern.data.trend === "increasing" ? i * 500 : -i * 300),
        );
      case "bar":
        return Array.from({ length: 7 }, () => Math.random() * 5000 + 1000);
      case "heatmap":
        return Array.from({ length: 4 }, () =>
          Array.from({ length: 7 }, () => Math.random() * 3000 + 500),
        );
      default:
        return [];
    }
  };

  const sampleData = generateSampleData();

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        isPlayMode ? "bg-black/70" : "bg-black/50",
        "backdrop-blur-sm",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={cn(
          "relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl",
          "bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)]",
          "shadow-2xl",
          className,
        )}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border-secondary)]">
          <div className="flex items-center gap-4">
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: `${config.color}20` }}
            >
              <Icon className="w-6 h-6" style={{ color: config.color }} />
            </div>
            <div>
              <ThemeAwareHeading level="h2" className="text-xl font-bold">
                {pattern.title}
              </ThemeAwareHeading>
              <ThemeAwareText color="secondary">
                {config.name} • {(pattern.confidence * 100).toFixed(0)}%
                Confidence
              </ThemeAwareText>
            </div>
          </div>

          <ThemeAwareButton
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <XMarkIcon className="w-6 h-6" />
          </ThemeAwareButton>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--color-border-secondary)]">
          {[
            { id: "overview", label: "Overview", icon: ChartBarIcon },
            { id: "insights", label: "Insights", icon: LightBulbIcon },
            {
              id: "recommendations",
              label: "Recommendations",
              icon: CheckCircleIcon,
            },
            { id: "actions", label: "Actions", icon: ExclamationTriangleIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "text-[var(--color-text-primary)] border-b-2"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
              )}
              style={{
                borderBottomColor:
                  activeTab === tab.id ? config.color : "transparent",
              }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Pattern Description */}
                <div>
                  <ThemeAwareHeading
                    level="h3"
                    className="text-lg font-semibold mb-3"
                  >
                    Pattern Description
                  </ThemeAwareHeading>
                  <ThemeAwareText className="text-base leading-relaxed">
                    {pattern.description}
                  </ThemeAwareText>
                </div>

                {/* Key Metrics */}
                <div>
                  <ThemeAwareHeading
                    level="h3"
                    className="text-lg font-semibold mb-3"
                  >
                    Key Metrics
                  </ThemeAwareHeading>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {pattern.data.amount && (
                      <div className="p-4 rounded-lg bg-[var(--color-surface-secondary)]">
                        <div className="flex items-center gap-2 mb-2">
                          <CurrencyDollarIcon className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-gray-500">Amount</span>
                        </div>
                        <div className="text-xl font-bold">
                          ฿{pattern.data.amount.toLocaleString()}
                        </div>
                      </div>
                    )}
                    {pattern.data.percentage && (
                      <div className="p-4 rounded-lg bg-[var(--color-surface-secondary)]">
                        <div className="flex items-center gap-2 mb-2">
                          {pattern.data.trend === "increasing" ? (
                            <ArrowTrendingUpIcon className="w-5 h-5 text-red-500" />
                          ) : (
                            <ArrowTrendingDownIcon className="w-5 h-5 text-green-500" />
                          )}
                          <span className="text-sm text-gray-500">Change</span>
                        </div>
                        <div
                          className={cn(
                            "text-xl font-bold",
                            pattern.data.trend === "increasing"
                              ? "text-red-500"
                              : "text-green-500",
                          )}
                        >
                          {pattern.data.percentage > 0 ? "+" : ""}
                          {pattern.data.percentage.toFixed(1)}%
                        </div>
                      </div>
                    )}
                    <div className="p-4 rounded-lg bg-[var(--color-surface-secondary)]">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-gray-500">
                          Confidence
                        </span>
                      </div>
                      <div className="text-xl font-bold text-blue-500">
                        {(pattern.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-[var(--color-surface-secondary)]">
                      <div className="flex items-center gap-2 mb-2">
                        <CalendarIcon className="w-5 h-5 text-purple-500" />
                        <span className="text-sm text-gray-500">Timeframe</span>
                      </div>
                      <div className="text-xl font-bold text-purple-500 capitalize">
                        {pattern.timeframe}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visualization */}
                <div>
                  <ThemeAwareHeading
                    level="h3"
                    className="text-lg font-semibold mb-3"
                  >
                    Pattern Visualization
                  </ThemeAwareHeading>
                  {pattern.visualizationType === "line" &&
                    Array.isArray(sampleData) && (
                      <LineChart
                        data={sampleData as number[]}
                        color={config.color}
                      />
                    )}
                  {pattern.visualizationType === "bar" &&
                    Array.isArray(sampleData) && (
                      <BarChart
                        data={sampleData as number[]}
                        labels={[
                          "Mon",
                          "Tue",
                          "Wed",
                          "Thu",
                          "Fri",
                          "Sat",
                          "Sun",
                        ]}
                        color={config.color}
                      />
                    )}
                  {pattern.visualizationType === "heatmap" &&
                    Array.isArray(sampleData) && (
                      <HeatmapChart
                        data={sampleData as number[][]}
                        color={config.color}
                      />
                    )}
                </div>
              </motion.div>
            )}

            {activeTab === "insights" && (
              <motion.div
                key="insights"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <ThemeAwareHeading
                  level="h3"
                  className="text-lg font-semibold mb-4"
                >
                  Detailed Insights
                </ThemeAwareHeading>
                {pattern.insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-[var(--color-surface-secondary)]"
                  >
                    <div
                      className="p-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: `${config.color}20` }}
                    >
                      <LightBulbIcon
                        className="w-4 h-4"
                        style={{ color: config.color }}
                      />
                    </div>
                    <ThemeAwareText className="flex-1">
                      {insight}
                    </ThemeAwareText>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "recommendations" && (
              <motion.div
                key="recommendations"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <ThemeAwareHeading
                  level="h3"
                  className="text-lg font-semibold mb-4"
                >
                  Recommended Actions
                </ThemeAwareHeading>
                {pattern.recommendations.map((recommendation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-[var(--color-surface-secondary)]"
                  >
                    <div className="p-2 rounded-full bg-green-500/20 flex-shrink-0">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <ThemeAwareText>{recommendation}</ThemeAwareText>
                    </div>
                    <ThemeAwareButton
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onTakeAction?.("implement", { recommendation, index })
                      }
                    >
                      Apply
                    </ThemeAwareButton>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "actions" && (
              <motion.div
                key="actions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <ThemeAwareHeading
                  level="h3"
                  className="text-lg font-semibold mb-4"
                >
                  Available Actions
                </ThemeAwareHeading>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ThemeAwareButton
                    variant={isPlayMode ? "cosmic" : "primary"}
                    onClick={() => onTakeAction?.("create_budget", pattern)}
                    className="p-4 h-auto flex-col items-start"
                    glow={isPlayMode}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CurrencyDollarIcon className="w-5 h-5" />
                      <span className="font-semibold">Create Budget</span>
                    </div>
                    <span className="text-sm opacity-80">
                      Set spending limits for this category
                    </span>
                  </ThemeAwareButton>

                  <ThemeAwareButton
                    variant="outline"
                    onClick={() => onTakeAction?.("set_alert", pattern)}
                    className="p-4 h-auto flex-col items-start"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ExclamationTriangleIcon className="w-5 h-5" />
                      <span className="font-semibold">Set Alert</span>
                    </div>
                    <span className="text-sm opacity-80">
                      Get notified of unusual spending
                    </span>
                  </ThemeAwareButton>

                  <ThemeAwareButton
                    variant="outline"
                    onClick={() => onTakeAction?.("export_data", pattern)}
                    className="p-4 h-auto flex-col items-start"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ChartBarIcon className="w-5 h-5" />
                      <span className="font-semibold">Export Data</span>
                    </div>
                    <span className="text-sm opacity-80">
                      Download detailed analysis
                    </span>
                  </ThemeAwareButton>

                  <ThemeAwareButton
                    variant="outline"
                    onClick={() => onTakeAction?.("schedule_review", pattern)}
                    className="p-4 h-auto flex-col items-start"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarIcon className="w-5 h-5" />
                      <span className="font-semibold">Schedule Review</span>
                    </div>
                    <span className="text-sm opacity-80">
                      Set up regular pattern monitoring
                    </span>
                  </ThemeAwareButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
