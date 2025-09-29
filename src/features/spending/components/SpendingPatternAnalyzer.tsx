import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  EyeIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
  useTheme,
} from "../../../core";
import { cn } from "../../../libs/utils";

export interface SpendingTransaction {
  id: string;
  amount: number;
  category: string;
  subcategory?: string;
  description: string;
  date: Date;
  merchant?: string;
  location?: string;
  tags: string[];
  isRecurring: boolean;
  confidence: number; // AI confidence in categorization (0-1)
}

export interface SpendingPattern {
  id: string;
  type: "trend" | "seasonal" | "recurring" | "anomaly" | "behavioral";
  category: string;
  title: string;
  description: string;
  confidence: number;
  impact: "low" | "medium" | "high" | "critical";
  timeframe: string;
  data: {
    amount?: number;
    percentage?: number;
    frequency?: string;
    trend?: "increasing" | "decreasing" | "stable" | "volatile";
    prediction?: number;
    comparison?: string;
  };
  insights: string[];
  recommendations: string[];
  visualizationType: "line" | "bar" | "pie" | "heatmap" | "scatter";
}

interface SpendingPatternAnalyzerProps {
  transactions: SpendingTransaction[];
  timeRange: "week" | "month" | "quarter" | "year";
  onTimeRangeChange?: (range: "week" | "month" | "quarter" | "year") => void;
  className?: string;
}

const patternTypeConfig = {
  trend: {
    icon: ArrowTrendingUpIcon,
    color: "#3B82F6",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    name: "Trend Analysis",
  },
  seasonal: {
    icon: CalendarIcon,
    color: "#10B981",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    name: "Seasonal Pattern",
  },
  recurring: {
    icon: ArrowPathIcon,
    color: "#8B5CF6",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    name: "Recurring Expense",
  },
  anomaly: {
    icon: ExclamationTriangleIcon,
    color: "#EF4444",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    name: "Anomaly Detected",
  },
  behavioral: {
    icon: ClockIcon,
    color: "#F59E0B",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    name: "Behavioral Pattern",
  },
};

const impactConfig = {
  low: { color: "#6B7280", name: "Low Impact" },
  medium: { color: "#F59E0B", name: "Medium Impact" },
  high: { color: "#EF4444", name: "High Impact" },
  critical: { color: "#DC2626", name: "Critical Impact" },
};

export function SpendingPatternAnalyzer({
  transactions,
  timeRange,
  onTimeRangeChange,
  className,
}: SpendingPatternAnalyzerProps) {
  const { isPlayMode } = useTheme();
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"impact" | "confidence" | "date">(
    "impact",
  );

  // Analyze spending patterns using AI-like algorithms
  const analyzedPatterns = useMemo(() => {
    const patterns: SpendingPattern[] = [];

    // Group transactions by category
    const categoryGroups = transactions.reduce(
      (groups, transaction) => {
        const key = transaction.category;
        if (!groups[key]) groups[key] = [];
        groups[key].push(transaction);
        return groups;
      },
      {} as Record<string, SpendingTransaction[]>,
    );

    // Analyze each category
    Object.entries(categoryGroups).forEach(
      ([category, categoryTransactions]) => {
        const totalAmount = categoryTransactions.reduce(
          (sum, t) => sum + t.amount,
          0,
        );
        const avgAmount = totalAmount / categoryTransactions.length;

        // Trend Analysis
        const sortedTransactions = [...categoryTransactions].sort(
          (a, b) => a.date.getTime() - b.date.getTime(),
        );

        if (sortedTransactions.length >= 3) {
          const firstHalf = sortedTransactions.slice(
            0,
            Math.floor(sortedTransactions.length / 2),
          );
          const secondHalf = sortedTransactions.slice(
            Math.floor(sortedTransactions.length / 2),
          );

          const firstHalfAvg =
            firstHalf.reduce((sum, t) => sum + t.amount, 0) / firstHalf.length;
          const secondHalfAvg =
            secondHalf.reduce((sum, t) => sum + t.amount, 0) /
            secondHalf.length;

          const trendPercentage =
            ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;

          if (Math.abs(trendPercentage) > 15) {
            patterns.push({
              id: `trend-${category}`,
              type: "trend",
              category,
              title: `${category} Spending ${trendPercentage > 0 ? "Increasing" : "Decreasing"}`,
              description: `Your ${category.toLowerCase()} expenses have ${trendPercentage > 0 ? "increased" : "decreased"} by ${Math.abs(trendPercentage).toFixed(1)}% over the selected period.`,
              confidence: 0.85,
              impact: Math.abs(trendPercentage) > 30 ? "high" : "medium",
              timeframe: timeRange,
              data: {
                amount: totalAmount,
                percentage: trendPercentage,
                trend: trendPercentage > 0 ? "increasing" : "decreasing",
                prediction: secondHalfAvg * 1.1, // Simple prediction
              },
              insights: [
                `Average ${category.toLowerCase()} spending: ฿${avgAmount.toLocaleString()}`,
                `Total transactions: ${categoryTransactions.length}`,
                `Trend direction: ${trendPercentage > 0 ? "Upward" : "Downward"}`,
              ],
              recommendations:
                trendPercentage > 0
                  ? [
                      `Consider setting a monthly budget for ${category.toLowerCase()}`,
                      "Review recent purchases to identify unnecessary expenses",
                      "Look for alternative options or discounts",
                    ]
                  : [
                      "Great job reducing expenses in this category!",
                      "Consider reallocating saved money to savings or investments",
                      "Maintain this positive trend",
                    ],
              visualizationType: "line",
            });
          }
        }

        // Recurring Pattern Detection
        const recurringTransactions = categoryTransactions.filter(
          (t) => t.isRecurring,
        );
        if (recurringTransactions.length > 0) {
          const recurringAmount = recurringTransactions.reduce(
            (sum, t) => sum + t.amount,
            0,
          );
          patterns.push({
            id: `recurring-${category}`,
            type: "recurring",
            category,
            title: `Regular ${category} Expenses`,
            description: `You have ${recurringTransactions.length} recurring ${category.toLowerCase()} expenses totaling ฿${recurringAmount.toLocaleString()} per ${timeRange}.`,
            confidence: 0.95,
            impact: recurringAmount > avgAmount * 2 ? "high" : "medium",
            timeframe: timeRange,
            data: {
              amount: recurringAmount,
              frequency: "monthly",
              percentage: (recurringAmount / totalAmount) * 100,
            },
            insights: [
              `Recurring expenses: ${recurringTransactions.length} transactions`,
              `Average recurring amount: ฿${(recurringAmount / recurringTransactions.length).toLocaleString()}`,
              `Percentage of total ${category.toLowerCase()} spending: ${((recurringAmount / totalAmount) * 100).toFixed(1)}%`,
            ],
            recommendations: [
              "Review all recurring subscriptions and memberships",
              "Cancel unused or underutilized services",
              "Negotiate better rates for essential services",
              "Consider annual payments for discounts",
            ],
            visualizationType: "bar",
          });
        }

        // Anomaly Detection
        const amounts = categoryTransactions.map((t) => t.amount);
        const mean =
          amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length;
        const variance =
          amounts.reduce((sum, amount) => sum + Math.pow(amount - mean, 2), 0) /
          amounts.length;
        const stdDev = Math.sqrt(variance);

        const anomalies = categoryTransactions.filter(
          (t) => Math.abs(t.amount - mean) > stdDev * 2,
        );

        if (anomalies.length > 0) {
          const largestAnomaly = anomalies.reduce((max, t) =>
            t.amount > max.amount ? t : max,
          );
          patterns.push({
            id: `anomaly-${category}`,
            type: "anomaly",
            category,
            title: `Unusual ${category} Expense Detected`,
            description: `Found ${anomalies.length} unusual ${category.toLowerCase()} transaction(s). The largest was ฿${largestAnomaly.amount.toLocaleString()} on ${largestAnomaly.date.toLocaleDateString()}.`,
            confidence: 0.75,
            impact: largestAnomaly.amount > mean * 3 ? "critical" : "high",
            timeframe: timeRange,
            data: {
              amount: largestAnomaly.amount,
              percentage: ((largestAnomaly.amount - mean) / mean) * 100,
              comparison: `${(largestAnomaly.amount / mean - 1) * 100}% above average`,
            },
            insights: [
              `Average ${category.toLowerCase()} expense: ฿${mean.toLocaleString()}`,
              `Unusual transaction: ฿${largestAnomaly.amount.toLocaleString()}`,
              `Merchant: ${largestAnomaly.merchant || "Unknown"}`,
              `Description: ${largestAnomaly.description}`,
            ],
            recommendations: [
              "Verify this transaction is legitimate",
              "Check if this was a one-time purchase or error",
              "Consider if this expense was necessary",
              "Set up alerts for large transactions",
            ],
            visualizationType: "scatter",
          });
        }

        // Behavioral Pattern (Day of week, time patterns)
        const dayOfWeekSpending = categoryTransactions.reduce(
          (days, t) => {
            const day = t.date.getDay();
            days[day] = (days[day] || 0) + t.amount;
            return days;
          },
          {} as Record<number, number>,
        );

        const maxDay = Object.entries(dayOfWeekSpending).reduce(
          (max, [day, amount]) =>
            amount > max.amount ? { day: parseInt(day), amount } : max,
          { day: 0, amount: 0 },
        );

        const dayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        if (maxDay.amount > totalAmount * 0.3) {
          patterns.push({
            id: `behavioral-${category}`,
            type: "behavioral",
            category,
            title: `${category} Spending Peak on ${dayNames[maxDay.day]}`,
            description: `You tend to spend most on ${category.toLowerCase()} on ${dayNames[maxDay.day]}s, accounting for ${((maxDay.amount / totalAmount) * 100).toFixed(1)}% of your total ${category.toLowerCase()} expenses.`,
            confidence: 0.7,
            impact: "medium",
            timeframe: timeRange,
            data: {
              amount: maxDay.amount,
              percentage: (maxDay.amount / totalAmount) * 100,
              frequency: "weekly",
            },
            insights: [
              `Peak spending day: ${dayNames[maxDay.day]}`,
              `Amount on peak day: ฿${maxDay.amount.toLocaleString()}`,
              `Percentage of total: ${((maxDay.amount / totalAmount) * 100).toFixed(1)}%`,
            ],
            recommendations: [
              `Be mindful of ${category.toLowerCase()} spending on ${dayNames[maxDay.day]}s`,
              "Set a daily spending limit for this category",
              "Plan purchases in advance to avoid impulse buying",
              "Consider shopping on different days for better deals",
            ],
            visualizationType: "heatmap",
          });
        }
      },
    );

    return patterns;
  }, [transactions, timeRange]);

  // Filter and sort patterns
  const filteredPatterns = analyzedPatterns
    .filter((pattern) => filterType === "all" || pattern.type === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case "impact":
          const impactOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return impactOrder[b.impact] - impactOrder[a.impact];
        case "confidence":
          return b.confidence - a.confidence;
        case "date":
          return b.id.localeCompare(a.id); // Simple date-like sorting
        default:
          return 0;
      }
    });

  // Calculate summary statistics
  const summaryStats = {
    totalPatterns: analyzedPatterns.length,
    criticalPatterns: analyzedPatterns.filter((p) => p.impact === "critical")
      .length,
    highConfidencePatterns: analyzedPatterns.filter((p) => p.confidence > 0.8)
      .length,
    trendingUp: analyzedPatterns.filter((p) => p.data.trend === "increasing")
      .length,
    trendingDown: analyzedPatterns.filter((p) => p.data.trend === "decreasing")
      .length,
  };

  if (analyzedPatterns.length === 0) {
    return (
      <ThemeAwareCard className={cn("text-center p-8", className)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="text-6xl">📊</div>
          <ThemeAwareHeading level="h3" className="text-2xl">
            Analyzing Your Spending Patterns
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary">
            We need more transaction data to identify meaningful patterns. Keep
            using the app to unlock powerful insights!
          </ThemeAwareText>
        </motion.div>
      </ThemeAwareCard>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <ThemeAwareHeading
            level="h2"
            className="text-2xl sm:text-3xl font-bold mb-2"
            gradient={isPlayMode}
          >
            <ChartBarIcon className="inline-block w-8 h-8 mr-2" />
            Spending Pattern Analysis
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary">
            AI-powered insights into your spending behavior and trends
          </ThemeAwareText>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2">
          <ThemeAwareText color="secondary" className="text-sm">
            Time Range:
          </ThemeAwareText>
          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange?.(e.target.value as any)}
            className="px-3 py-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="text-center p-4 rounded-lg bg-[var(--color-surface-secondary)]">
          <div className="text-2xl font-bold text-blue-500">
            {summaryStats.totalPatterns}
          </div>
          <div className="text-xs text-gray-500">Total Patterns</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-[var(--color-surface-secondary)]">
          <div className="text-2xl font-bold text-red-500">
            {summaryStats.criticalPatterns}
          </div>
          <div className="text-xs text-gray-500">Critical Issues</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-[var(--color-surface-secondary)]">
          <div className="text-2xl font-bold text-green-500">
            {summaryStats.highConfidencePatterns}
          </div>
          <div className="text-xs text-gray-500">High Confidence</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-[var(--color-surface-secondary)]">
          <div className="text-2xl font-bold text-orange-500">
            {summaryStats.trendingUp}
          </div>
          <div className="text-xs text-gray-500">Trending Up</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-[var(--color-surface-secondary)]">
          <div className="text-2xl font-bold text-purple-500">
            {summaryStats.trendingDown}
          </div>
          <div className="text-xs text-gray-500">Trending Down</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {/* Pattern Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] text-sm"
          >
            <option value="all">
              All Patterns ({analyzedPatterns.length})
            </option>
            <option value="trend">
              Trends (
              {analyzedPatterns.filter((p) => p.type === "trend").length})
            </option>
            <option value="anomaly">
              Anomalies (
              {analyzedPatterns.filter((p) => p.type === "anomaly").length})
            </option>
            <option value="recurring">
              Recurring (
              {analyzedPatterns.filter((p) => p.type === "recurring").length})
            </option>
            <option value="behavioral">
              Behavioral (
              {analyzedPatterns.filter((p) => p.type === "behavioral").length})
            </option>
            <option value="seasonal">
              Seasonal (
              {analyzedPatterns.filter((p) => p.type === "seasonal").length})
            </option>
          </select>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] text-sm"
          >
            <option value="impact">Sort by Impact</option>
            <option value="confidence">Sort by Confidence</option>
            <option value="date">Sort by Category</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <FunnelIcon className="w-4 h-4 text-gray-500" />
          <ThemeAwareText color="secondary" className="text-sm">
            {filteredPatterns.length} of {analyzedPatterns.length} patterns
          </ThemeAwareText>
        </div>
      </div>

      {/* Pattern Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPatterns.map((pattern, index) => {
            const config = patternTypeConfig[pattern.type];
            const impactInfo = impactConfig[pattern.impact];
            const Icon = config.icon;

            return (
              <motion.div
                key={pattern.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ThemeAwareCard
                  className={cn(
                    "relative overflow-hidden p-6",
                    config.bgColor,
                    config.borderColor,
                    "border-2",
                    isPlayMode && "shadow-lg backdrop-blur-sm",
                    pattern.impact === "critical" && "ring-2 ring-red-500/50",
                  )}
                  animated={isPlayMode}
                >
                  {/* Cosmic Background Effect */}
                  {isPlayMode && (
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        background: `radial-gradient(circle at 80% 20%, ${config.color}40 0%, transparent 50%)`,
                      }}
                    />
                  )}

                  <div className="relative z-10">
                    {/* Pattern Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="p-2 rounded-full"
                          style={{ backgroundColor: `${config.color}20` }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Icon
                            className="w-6 h-6"
                            style={{ color: config.color }}
                          />
                        </motion.div>
                        <div>
                          <ThemeAwareHeading
                            level="h3"
                            className="text-lg font-bold"
                          >
                            {pattern.title}
                          </ThemeAwareHeading>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500">
                              {config.name}
                            </span>
                            <span
                              className="px-2 py-1 text-xs font-medium rounded-full"
                              style={{
                                backgroundColor: `${impactInfo.color}20`,
                                color: impactInfo.color,
                              }}
                            >
                              {impactInfo.name}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Confidence Score */}
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-500">
                          Confidence
                        </div>
                        <div
                          className="text-xl font-bold"
                          style={{ color: config.color }}
                        >
                          {(pattern.confidence * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>

                    {/* Pattern Description */}
                    <ThemeAwareText color="secondary" className="mb-4">
                      {pattern.description}
                    </ThemeAwareText>

                    {/* Pattern Data */}
                    {pattern.data && (
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        {pattern.data.amount && (
                          <div>
                            <div className="flex items-center gap-1 text-gray-500 mb-1">
                              <CurrencyDollarIcon className="w-4 h-4" />
                              Amount
                            </div>
                            <div className="font-medium">
                              ฿{pattern.data.amount.toLocaleString()}
                            </div>
                          </div>
                        )}
                        {pattern.data.percentage && (
                          <div>
                            <div className="flex items-center gap-1 text-gray-500 mb-1">
                              {pattern.data.trend === "increasing" ? (
                                <ArrowTrendingUpIcon className="w-4 h-4" />
                              ) : (
                                <span className="w-4 h-4">↓</span>
                              )}
                              Change
                            </div>
                            <div
                              className={cn(
                                "font-medium",
                                pattern.data.trend === "increasing"
                                  ? "text-red-500"
                                  : "text-green-500",
                              )}
                            >
                              {pattern.data.percentage &&
                              pattern.data.percentage > 0
                                ? "+"
                                : ""}
                              {pattern.data.percentage?.toFixed(1)}%
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quick Insights */}
                    <div className="mb-4">
                      <ThemeAwareText weight="bold" className="text-sm mb-2">
                        Key Insights:
                      </ThemeAwareText>
                      <ul className="text-sm space-y-1">
                        {pattern.insights.slice(0, 2).map((insight, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-gray-400 mt-1">•</span>
                            <span className="text-gray-600 dark:text-gray-300">
                              {insight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <ThemeAwareButton
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          console.log("View pattern details:", pattern.id)
                        }
                        className="flex-1"
                      >
                        <EyeIcon className="w-4 h-4 mr-1" />
                        View Details
                      </ThemeAwareButton>
                      <ThemeAwareButton
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          console.log("Export pattern:", pattern.id)
                        }
                      >
                        📊
                      </ThemeAwareButton>
                    </div>
                  </div>
                </ThemeAwareCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State for Filtered Results */}
      {filteredPatterns.length === 0 && analyzedPatterns.length > 0 && (
        <ThemeAwareCard className="text-center p-8">
          <div className="text-4xl mb-4">🔍</div>
          <ThemeAwareHeading level="h3" className="text-xl mb-2">
            No Patterns Match Your Filters
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary">
            Try adjusting your filter criteria to see more patterns.
          </ThemeAwareText>
          <ThemeAwareButton
            variant="outline"
            onClick={() => {
              setFilterType("all");
              setSortBy("impact");
            }}
            className="mt-4"
          >
            Clear Filters
          </ThemeAwareButton>
        </ThemeAwareCard>
      )}
    </div>
  );
}
