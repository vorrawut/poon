import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChartBarIcon,
  EyeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
  useTheme,
} from "../../../core";
import { SpendingPatternAnalyzer, PatternDetailView } from "../index";
import { 
  mockAnalyzedPatterns,
  generateRandomSpendingData,
  getSpendingByCategory,
} from "../../../../mockData/features/spending";
import type { SpendingPattern } from "../components/SpendingPatternAnalyzer";
import { cn } from "../../../libs/utils";

interface SpendingAnalysisProps {
  className?: string;
}

export function SpendingAnalysis({ className }: SpendingAnalysisProps) {
  const { isPlayMode } = useTheme();
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter" | "year">("month");
  const [selectedPattern, setSelectedPattern] = useState<SpendingPattern | null>(null);
  const [analysisView, setAnalysisView] = useState<"overview" | "patterns" | "trends">("patterns");

  // Filter transactions based on time range
  const filteredTransactions = useMemo(() => {
    const days = {
      week: 7,
      month: 30,
      quarter: 90,
      year: 365,
    }[timeRange];

    return generateRandomSpendingData(days);
  }, [timeRange]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalSpent = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    const avgTransaction = totalSpent / filteredTransactions.length || 0;
    const categorySpending = getSpendingByCategory(filteredTransactions);
    const topCategory = Object.entries(categorySpending).reduce(
      (max, [category, amount]) => amount > max.amount ? { category, amount } : max,
      { category: "", amount: 0 }
    );

    // Calculate trend (compare first half vs second half)
    const midpoint = Math.floor(filteredTransactions.length / 2);
    const firstHalf = filteredTransactions.slice(0, midpoint);
    const secondHalf = filteredTransactions.slice(midpoint);
    
    const firstHalfTotal = firstHalf.reduce((sum, t) => sum + t.amount, 0);
    const secondHalfTotal = secondHalf.reduce((sum, t) => sum + t.amount, 0);
    
    const trendPercentage = firstHalfTotal > 0 
      ? ((secondHalfTotal - firstHalfTotal) / firstHalfTotal) * 100 
      : 0;

    return {
      totalSpent,
      avgTransaction,
      transactionCount: filteredTransactions.length,
      topCategory,
      categoryCount: Object.keys(categorySpending).length,
      trendPercentage,
      isIncreasing: trendPercentage > 5,
      isDecreasing: trendPercentage < -5,
    };
  }, [filteredTransactions]);

  const handlePatternAction = (actionType: string, data?: any) => {
    console.log(`Taking action: ${actionType}`, data);
    // Here you would implement actual actions like:
    // - create_budget: Navigate to budget creation
    // - set_alert: Set up spending alerts
    // - export_data: Export analysis data
    // - schedule_review: Set up recurring pattern reviews
  };

  if (selectedPattern) {
    return (
      <AnimatePresence>
        <PatternDetailView
          pattern={selectedPattern}
          onClose={() => setSelectedPattern(null)}
          onTakeAction={handlePatternAction}
        />
      </AnimatePresence>
    );
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <ThemeAwareHeading 
            level="h1" 
            className="text-3xl sm:text-4xl font-bold mb-2"
            gradient={isPlayMode}
          >
            <ChartBarIcon className="inline-block w-10 h-10 mr-3" />
            Spending Analysis
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary" className="text-lg">
            AI-powered insights into your spending patterns and financial behavior
          </ThemeAwareText>
        </div>
      </div>

      {/* Summary Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ThemeAwareCard className="p-6 text-center">
          <motion.div
            className="text-4xl mb-2"
            animate={isPlayMode ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💰
          </motion.div>
          <div className="text-2xl font-bold text-blue-500">
            ฿{summaryStats.totalSpent.toLocaleString()}
          </div>
          <ThemeAwareText color="secondary" className="text-sm">
            Total Spent ({timeRange})
          </ThemeAwareText>
        </ThemeAwareCard>

        <ThemeAwareCard className="p-6 text-center">
          <motion.div
            className="text-4xl mb-2"
            animate={isPlayMode ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            📊
          </motion.div>
          <div className="text-2xl font-bold text-green-500">
            {summaryStats.transactionCount}
          </div>
          <ThemeAwareText color="secondary" className="text-sm">
            Transactions
          </ThemeAwareText>
        </ThemeAwareCard>

        <ThemeAwareCard className="p-6 text-center">
          <motion.div
            className="text-4xl mb-2"
            animate={isPlayMode ? { y: [-2, 2, -2] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📈
          </motion.div>
          <div className={cn(
            "text-2xl font-bold flex items-center justify-center gap-1",
            summaryStats.isIncreasing ? "text-red-500" : 
            summaryStats.isDecreasing ? "text-green-500" : "text-gray-500"
          )}>
            {summaryStats.isIncreasing ? <ArrowTrendingUpIcon className="w-6 h-6" /> :
             summaryStats.isDecreasing ? <ArrowTrendingDownIcon className="w-6 h-6" /> :
             <span className="w-6 h-6">—</span>}
            {Math.abs(summaryStats.trendPercentage).toFixed(1)}%
          </div>
          <ThemeAwareText color="secondary" className="text-sm">
            Spending Trend
          </ThemeAwareText>
        </ThemeAwareCard>

        <ThemeAwareCard className="p-6 text-center">
          <motion.div
            className="text-4xl mb-2"
            animate={isPlayMode ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            🎯
          </motion.div>
          <div className="text-2xl font-bold text-purple-500">
            ฿{summaryStats.avgTransaction.toLocaleString()}
          </div>
          <ThemeAwareText color="secondary" className="text-sm">
            Avg Transaction
          </ThemeAwareText>
        </ThemeAwareCard>
      </div>

      {/* Top Category Highlight */}
      {summaryStats.topCategory.category && (
        <ThemeAwareCard className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🏆</div>
              <div>
                <ThemeAwareHeading level="h3" className="text-xl font-bold">
                  Top Spending Category
                </ThemeAwareHeading>
                <ThemeAwareText color="secondary">
                  Your highest expense category this {timeRange}
                </ThemeAwareText>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-500">
                {summaryStats.topCategory.category}
              </div>
              <div className="text-lg text-gray-600">
                ฿{summaryStats.topCategory.amount.toLocaleString()}
              </div>
              <ThemeAwareText color="secondary" className="text-sm">
                {((summaryStats.topCategory.amount / summaryStats.totalSpent) * 100).toFixed(1)}% of total
              </ThemeAwareText>
            </div>
          </div>
        </ThemeAwareCard>
      )}

      {/* Analysis View Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "patterns", label: "AI Patterns", icon: "🤖" },
          { id: "trends", label: "Trends", icon: "📈" },
          { id: "overview", label: "Overview", icon: "👁️" },
        ].map((tab) => (
          <ThemeAwareButton
            key={tab.id}
            variant={analysisView === tab.id ? (isPlayMode ? "cosmic" : "primary") : "outline"}
            onClick={() => setAnalysisView(tab.id as any)}
            glow={isPlayMode && analysisView === tab.id}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </ThemeAwareButton>
        ))}
      </div>

      {/* Main Analysis Content */}
      <AnimatePresence mode="wait">
        {analysisView === "patterns" && (
          <motion.div
            key="patterns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SpendingPatternAnalyzer
              transactions={filteredTransactions}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
            />
          </motion.div>
        )}

        {analysisView === "trends" && (
          <motion.div
            key="trends"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ThemeAwareCard className="p-6">
              <ThemeAwareHeading level="h2" className="text-2xl font-bold mb-6">
                📈 Spending Trends Analysis
              </ThemeAwareHeading>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <ThemeAwareHeading level="h3" className="text-lg font-semibold mb-4">
                    Category Breakdown
                  </ThemeAwareHeading>
                  <div className="space-y-3">
                    {Object.entries(getSpendingByCategory(filteredTransactions))
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 5)
                      .map(([category, amount]) => (
                        <div key={category} className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-secondary)]">
                          <span className="font-medium">{category}</span>
                          <div className="text-right">
                            <div className="font-bold">฿{amount.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">
                              {((amount / summaryStats.totalSpent) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <ThemeAwareHeading level="h3" className="text-lg font-semibold mb-4">
                    Spending Insights
                  </ThemeAwareHeading>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowTrendingUpIcon className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold">Spending Velocity</span>
                      </div>
                      <ThemeAwareText color="secondary">
                        You're spending ฿{(summaryStats.totalSpent / (timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : timeRange === 'quarter' ? 90 : 365)).toLocaleString()} per day on average
                      </ThemeAwareText>
                    </div>

                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CurrencyDollarIcon className="w-5 h-5 text-green-500" />
                        <span className="font-semibold">Transaction Frequency</span>
                      </div>
                      <ThemeAwareText color="secondary">
                        {summaryStats.transactionCount} transactions this {timeRange} (avg ฿{summaryStats.avgTransaction.toLocaleString()} each)
                      </ThemeAwareText>
                    </div>

                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <ChartBarIcon className="w-5 h-5 text-purple-500" />
                        <span className="font-semibold">Category Diversity</span>
                      </div>
                      <ThemeAwareText color="secondary">
                        Spending across {summaryStats.categoryCount} different categories shows good financial diversity
                      </ThemeAwareText>
                    </div>
                  </div>
                </div>
              </div>
            </ThemeAwareCard>
          </motion.div>
        )}

        {analysisView === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Patterns Preview */}
              <ThemeAwareCard className="p-6">
                <ThemeAwareHeading level="h3" className="text-xl font-bold mb-4">
                  🔍 Quick Pattern Insights
                </ThemeAwareHeading>
                <div className="space-y-3">
                  {mockAnalyzedPatterns.slice(0, 3).map((pattern) => (
                    <div
                      key={pattern.id}
                      className="p-3 rounded-lg bg-[var(--color-surface-secondary)] cursor-pointer hover:bg-[var(--color-surface-tertiary)] transition-colors"
                      onClick={() => setSelectedPattern(pattern)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {pattern.type === "trend" && <ArrowTrendingUpIcon className="w-4 h-4 text-blue-500" />}
                          {pattern.type === "anomaly" && <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />}
                          {pattern.type === "recurring" && <CalendarIcon className="w-4 h-4 text-purple-500" />}
                          <span className="font-medium text-sm">{pattern.title}</span>
                        </div>
                        <EyeIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      <ThemeAwareText color="secondary" className="text-xs mt-1">
                        {pattern.description.slice(0, 80)}...
                      </ThemeAwareText>
                    </div>
                  ))}
                </div>
                <ThemeAwareButton
                  variant="outline"
                  onClick={() => setAnalysisView("patterns")}
                  className="w-full mt-4"
                >
                  View All Patterns
                </ThemeAwareButton>
              </ThemeAwareCard>

              {/* Action Items */}
              <ThemeAwareCard className="p-6">
                <ThemeAwareHeading level="h3" className="text-xl font-bold mb-4">
                  💡 Recommended Actions
                </ThemeAwareHeading>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold">High Priority</span>
                    </div>
                    <ThemeAwareText className="mb-3">
                      Review your subscription services - you might be paying for unused services.
                    </ThemeAwareText>
                    <ThemeAwareButton variant="outline" size="sm">
                      Review Subscriptions
                    </ThemeAwareButton>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <ChartBarIcon className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold">Optimization</span>
                    </div>
                    <ThemeAwareText className="mb-3">
                      Set up spending alerts for categories where you frequently overspend.
                    </ThemeAwareText>
                    <ThemeAwareButton variant="outline" size="sm">
                      Set Alerts
                    </ThemeAwareButton>
                  </div>

                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <CurrencyDollarIcon className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">Savings Opportunity</span>
                    </div>
                    <ThemeAwareText className="mb-3">
                      Your reduced transportation costs could be redirected to emergency fund.
                    </ThemeAwareText>
                    <ThemeAwareButton variant="outline" size="sm">
                      Automate Savings
                    </ThemeAwareButton>
                  </div>
                </div>
              </ThemeAwareCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
