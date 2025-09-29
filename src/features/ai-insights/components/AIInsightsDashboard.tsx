import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  SparklesIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareHeading,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareCard,
  useTheme,
} from "../../../core";
import {
  EnhancedAIInsightCard,
  type EnhancedAIInsight,
  type EnhancedInsightType,
} from "./EnhancedAIInsightCard";
import { cn } from "../../../libs/utils";

interface AIInsightsDashboardProps {
  insights: EnhancedAIInsight[];
  maxVisible?: number;
  className?: string;
  onInsightDismiss?: (id: string) => void;
  onInsightAction?: (insight: EnhancedAIInsight) => void;
  showFilters?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
}

type SortOption = "priority" | "date" | "impact" | "confidence" | "category";
type FilterOption = "all" | EnhancedInsightType | "expiring" | "personalized";

export function AIInsightsDashboard({
  insights,
  maxVisible = 6,
  className,
  onInsightDismiss,
  onInsightAction: _onInsightAction,
  showFilters = true,
  autoRefresh = false,
  refreshInterval = 30000, // 30 seconds
}: AIInsightsDashboardProps) {
  const { isPlayMode } = useTheme();
  const [visibleInsights, setVisibleInsights] = useState<EnhancedAIInsight[]>(
    [],
  );
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("priority");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setLastRefresh(new Date());
      // In a real app, this would trigger a refetch of insights
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  // Filter and sort insights
  const processedInsights = useMemo(() => {
    let filtered = [...insights];

    // Apply filters
    if (filterBy !== "all") {
      if (filterBy === "expiring") {
        const now = new Date();
        const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        filtered = filtered.filter(
          (insight) => insight.expiresAt && insight.expiresAt <= oneDayFromNow,
        );
      } else if (filterBy === "personalized") {
        filtered = filtered.filter((insight) => insight.isPersonalized);
      } else {
        filtered = filtered.filter((insight) => insight.type === filterBy);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          return b.priority - a.priority;
        case "date":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "impact":
          const impactOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return impactOrder[b.impact] - impactOrder[a.impact];
        case "confidence":
          const confidenceOrder = { high: 3, medium: 2, low: 1 };
          return confidenceOrder[b.confidence] - confidenceOrder[a.confidence];
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [insights, filterBy, sortBy]);

  // Update visible insights
  useEffect(() => {
    setVisibleInsights(processedInsights);
  }, [processedInsights]);

  const insightsToDisplay = showAll
    ? visibleInsights
    : visibleInsights.slice(0, maxVisible);
  const hasMore = visibleInsights.length > maxVisible;

  // Get filter counts
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: insights.length,
      expiring: insights.filter(
        (i) =>
          i.expiresAt &&
          i.expiresAt <= new Date(Date.now() + 24 * 60 * 60 * 1000),
      ).length,
      personalized: insights.filter((i) => i.isPersonalized).length,
    };

    // Count by type
    insights.forEach((insight) => {
      counts[insight.type] = (counts[insight.type] || 0) + 1;
    });

    return counts;
  }, [insights]);

  // Get priority distribution
  const priorityStats = useMemo(() => {
    const critical = insights.filter((i) => i.priority >= 8).length;
    const high = insights.filter(
      (i) => i.priority >= 6 && i.priority < 8,
    ).length;
    const medium = insights.filter(
      (i) => i.priority >= 4 && i.priority < 6,
    ).length;
    const low = insights.filter((i) => i.priority < 4).length;

    return { critical, high, medium, low };
  }, [insights]);

  if (insights.length === 0) {
    return (
      <ThemeAwareCard className={cn("text-center p-8", className)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="text-6xl">🤖</div>
          <ThemeAwareHeading level="h3" className="text-xl">
            No AI Insights Available
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary">
            Your AI assistant is analyzing your financial data. Check back soon
            for personalized insights!
          </ThemeAwareText>
        </motion.div>
      </ThemeAwareCard>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <ThemeAwareHeading
            level="h2"
            className="text-2xl sm:text-3xl font-bold mb-2"
            gradient={isPlayMode}
          >
            <SparklesIcon className="inline-block w-8 h-8 mr-2" />
            AI Financial Insights
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary" className="text-sm sm:text-base">
            Personalized recommendations powered by advanced AI analysis
          </ThemeAwareText>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {autoRefresh && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ClockIcon className="w-4 h-4" />
              <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
            </div>
          )}

          {showFilters && (
            <ThemeAwareButton
              variant="outline"
              size="sm"
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className="flex items-center gap-2"
            >
              <FunnelIcon className="w-4 h-4" />
              Filters
              <motion.div
                animate={{ rotate: showFiltersPanel ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-4 h-4" />
              </motion.div>
            </ThemeAwareButton>
          )}
        </div>
      </div>

      {/* Priority Stats */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-500">
            {priorityStats.critical}
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">Critical</div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-orange-500">
            {priorityStats.high}
          </div>
          <div className="text-xs text-orange-600 dark:text-orange-400">
            High
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-yellow-500">
            {priorityStats.medium}
          </div>
          <div className="text-xs text-yellow-600 dark:text-yellow-400">
            Medium
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-500">
            {priorityStats.low}
          </div>
          <div className="text-xs text-green-600 dark:text-green-400">Low</div>
        </div>
      </motion.div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFiltersPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ThemeAwareCard className="p-4 space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                <ThemeAwareText weight="bold">
                  Filter & Sort Options
                </ThemeAwareText>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sort Options */}
                <div>
                  <ThemeAwareText color="secondary" className="mb-2 text-sm">
                    Sort by:
                  </ThemeAwareText>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full p-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)]"
                  >
                    <option value="priority">Priority</option>
                    <option value="date">Date Created</option>
                    <option value="impact">Impact Level</option>
                    <option value="confidence">Confidence</option>
                    <option value="category">Category</option>
                  </select>
                </div>

                {/* Filter Options */}
                <div>
                  <ThemeAwareText color="secondary" className="mb-2 text-sm">
                    Filter by:
                  </ThemeAwareText>
                  <select
                    value={filterBy}
                    onChange={(e) =>
                      setFilterBy(e.target.value as FilterOption)
                    }
                    className="w-full p-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)]"
                  >
                    <option value="all">
                      All Insights ({filterCounts.all})
                    </option>
                    <option value="expiring">
                      Expiring Soon ({filterCounts.expiring})
                    </option>
                    <option value="personalized">
                      Personalized ({filterCounts.personalized})
                    </option>
                    <option value="tip">Tips ({filterCounts.tip || 0})</option>
                    <option value="opportunity">
                      Opportunities ({filterCounts.opportunity || 0})
                    </option>
                    <option value="warning">
                      Warnings ({filterCounts.warning || 0})
                    </option>
                    <option value="achievement">
                      Achievements ({filterCounts.achievement || 0})
                    </option>
                    <option value="prediction">
                      Predictions ({filterCounts.prediction || 0})
                    </option>
                  </select>
                </div>
              </div>
            </ThemeAwareCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {insightsToDisplay.map((insight, index) => (
            <motion.div
              key={insight.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <EnhancedAIInsightCard
                insight={insight}
                onDismiss={onInsightDismiss}
                animated={isPlayMode}
                showDetails={false}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More/Less Button */}
      {hasMore && (
        <div className="text-center">
          <ThemeAwareButton
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2"
          >
            {showAll
              ? `Show Less`
              : `Show ${visibleInsights.length - maxVisible} More Insights`}
          </ThemeAwareButton>
        </div>
      )}

      {/* Empty State for Filtered Results */}
      {processedInsights.length === 0 && insights.length > 0 && (
        <ThemeAwareCard className="text-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="text-4xl">🔍</div>
            <ThemeAwareHeading level="h3" className="text-xl">
              No Insights Match Your Filters
            </ThemeAwareHeading>
            <ThemeAwareText color="secondary">
              Try adjusting your filter criteria to see more insights.
            </ThemeAwareText>
            <ThemeAwareButton
              variant="outline"
              onClick={() => {
                setFilterBy("all");
                setSortBy("priority");
              }}
            >
              Clear Filters
            </ThemeAwareButton>
          </motion.div>
        </ThemeAwareCard>
      )}

      {/* Urgent Insights Alert */}
      {priorityStats.critical > 0 && (
        <motion.div
          className="fixed bottom-4 right-4 z-50 max-w-sm"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <ThemeAwareCard className="p-4 bg-red-500/10 border-red-500/20 border">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
              </motion.div>
              <div>
                <ThemeAwareText
                  weight="bold"
                  className="text-red-600 dark:text-red-400"
                >
                  {priorityStats.critical} Critical Insight
                  {priorityStats.critical > 1 ? "s" : ""}
                </ThemeAwareText>
                <ThemeAwareText color="secondary" className="text-sm">
                  Requires immediate attention
                </ThemeAwareText>
              </div>
            </div>
          </ThemeAwareCard>
        </motion.div>
      )}
    </div>
  );
}
