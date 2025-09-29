import { motion } from "framer-motion";
import { MoonOfSpending } from "./MoonOfSpending";
import { GoalsAsStars } from "./GoalsAsStars";
import { InteractiveWealthPlanet } from "./InteractiveWealthPlanet";
import { useNetWorth } from "../../features/networth/hooks/useNetWorth";
import {
  mockFinancialUniverseGoals,
  mockSpendingData,
  mockGoals,
} from "../../../mockData/features/dashboard";
import { UniverseLoading } from "../ui/LoadingStates";
import {
  ThemeAwareButton,
  ThemeAwareHeading,
  ThemeAwareText,
} from "../../core";
import { AIInsightsContainer } from "../../features/ai-insights/components/AIInsightCard";
import { mockAIInsights } from "../../../mockData/features/ai-insights";
import { useState, useEffect } from "react";

// Using centralized mock data

interface FinancialUniverseProps {
  className?: string;
  onQuickAction?: (action: string, data?: unknown) => void;
}

export function FinancialUniverse({
  className = "",
  onQuickAction,
}: FinancialUniverseProps) {
  const { netWorthData, loading, error } = useNetWorth();
  const [aiInsights, setAiInsights] = useState<any[]>([]);

  // Use centralized mock AI insights
  useEffect(() => {
    if (netWorthData) {
      // Use pre-generated mock insights for consistent UI
      setAiInsights(mockAIInsights);
    }
  }, [netWorthData]);

  if (loading) {
    return (
      <UniverseLoading
        className={className}
        message="🌌 Loading your financial universe..."
      />
    );
  }

  if (error || !netWorthData) {
    return (
      <div
        className={`relative h-full bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900 overflow-hidden ${className}`}
      >
        <div className="flex items-center justify-center h-full text-center">
          <div className="text-white">
            <div className="text-6xl mb-4">🌌</div>
            <ThemeAwareHeading level="h2" className="text-2xl font-bold mb-2">
              Universe Loading Error
            </ThemeAwareHeading>
            <ThemeAwareText className="text-white/70 mb-4">
              Unable to load your financial data
            </ThemeAwareText>
            <ThemeAwareButton
              variant="primary"
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Reload Universe
            </ThemeAwareButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative h-full bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900 overflow-y-auto ${className}`}
    >
      {/* Background Stars Field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 0.5,
              height: Math.random() * 2 + 0.5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Nebula Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Universe Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              🌍
            </motion.span>
            Your Financial Universe
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Welcome to your personal galaxy of wealth! Every planet, moon, and
            star tells the story of your financial journey.
          </p>
        </motion.div>

        {/* AI Insights Section */}
        {aiInsights.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <AIInsightsContainer
              insights={aiInsights}
              maxVisible={3}
              onInsightDismiss={(id) => {
                setAiInsights((prev) =>
                  prev.filter((insight) => insight.id !== id),
                );
              }}
            />
          </motion.div>
        )}

        {/* Main Universe Layout */}
        <div className="space-y-12 lg:space-y-0">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-16 items-center justify-items-center mb-12 min-h-[700px] overflow-visible">
            {/* Interactive Wealth Planet - Left */}
            <motion.div
              className="w-full max-w-lg flex justify-center items-center h-full overflow-visible"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <InteractiveWealthPlanet
                netWorth={netWorthData.totalNetWorth}
                previousNetWorth={netWorthData.previousNetWorth}
                growth={netWorthData.netWorthChange}
              />
            </motion.div>

            {/* Goals Constellation - Center */}
            <motion.div
              className="w-full max-w-2xl flex justify-center items-center h-full overflow-visible"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <GoalsAsStars goals={mockFinancialUniverseGoals} />
            </motion.div>

            {/* Moon of Spending - Right */}
            <motion.div
              className="w-full max-w-lg flex justify-center items-center h-full overflow-visible"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <MoonOfSpending
                monthlySpending={mockSpendingData.monthlySpending}
                previousMonthSpending={mockSpendingData.previousMonthSpending}
                spendingChange={mockSpendingData.spendingChange}
                topCategories={mockSpendingData.topCategories.map((cat) => ({
                  ...cat,
                  name: cat.category,
                }))}
              />
            </motion.div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-8 mb-12">
            {/* Goals Constellation - Top on mobile */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <GoalsAsStars goals={mockFinancialUniverseGoals} />
            </motion.div>

            {/* Planet and Moon - Side by side on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <InteractiveWealthPlanet
                  netWorth={netWorthData.totalNetWorth}
                  previousNetWorth={netWorthData.previousNetWorth}
                  growth={netWorthData.netWorthChange}
                />
              </motion.div>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <MoonOfSpending
                  monthlySpending={mockSpendingData.monthlySpending}
                  previousMonthSpending={mockSpendingData.previousMonthSpending}
                  spendingChange={mockSpendingData.spendingChange}
                  topCategories={mockSpendingData.topCategories.map((data) => ({
                    ...data,
                    name: data.category,
                  }))}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Universe Navigation */}
        <motion.div
          className="grid grid-cols-2 md:flex md:justify-center md:space-x-6 gap-4 md:gap-0 mb-12 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {[
            { emoji: "🚀", label: "Quick Actions", action: "quick_actions" },
            { emoji: "🔭", label: "Detailed View", action: "detailed_view" },
            { emoji: "📊", label: "Analytics", action: "analytics" },
            { emoji: "⚙️", label: "Settings", action: "settings" },
          ].map((item) => (
            <motion.button
              key={item.action}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl px-3 md:px-6 py-3 md:py-4 text-center transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onQuickAction?.(item.action)}
            >
              <div className="text-2xl md:text-3xl mb-1 md:mb-2">
                {item.emoji}
              </div>
              <div className="text-white text-xs md:text-sm font-medium">
                {item.label}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Universe Stats */}
        <motion.div
          className="bg-black/20 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 border border-white/10 mx-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">
            🌌 Universe Status
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-green-300">
                ${(netWorthData.totalNetWorth / 1000).toFixed(0)}K
              </div>
              <div className="text-white/70 text-xs md:text-sm">
                Total Worth
              </div>
              <div className="text-green-300 text-xs mt-1">Planet Mass</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-amber-300">
                ${(mockSpendingData.monthlySpending / 1000).toFixed(1)}K
              </div>
              <div className="text-white/70 text-xs md:text-sm">
                Monthly Flow
              </div>
              <div className="text-amber-300 text-xs mt-1">Moon Cycle</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-blue-300">
                {mockGoals.filter((g) => !g.isCompleted).length}
              </div>
              <div className="text-white/70 text-xs md:text-sm">
                Active Goals
              </div>
              <div className="text-blue-300 text-xs mt-1">Burning Stars</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-purple-300">
                {mockGoals.filter((g) => g.isCompleted).length}
              </div>
              <div className="text-white/70 text-xs md:text-sm">
                Goals Achieved
              </div>
              <div className="text-purple-300 text-xs mt-1">Ignited Stars</div>
            </div>
          </div>
        </motion.div>

        {/* Inspirational Message */}
        <motion.div
          className="text-center mt-8 md:mt-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <div className="text-4xl md:text-6xl mb-3 md:mb-4">✨</div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
            Your Financial Galaxy is Growing!
          </h3>
          <p className="text-white/70 max-w-xl md:max-w-2xl mx-auto text-sm md:text-lg">
            Like the universe itself, your wealth is expanding. Every
            transaction shapes your galaxy, every goal becomes a shining star,
            and every achievement ignites new possibilities.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
