import { motion } from "framer-motion";
import { MoonOfSpending } from "./MoonOfSpending";
import { GoalsAsStars } from "./GoalsAsStars";
import { InteractiveWealthPlanet } from "./InteractiveWealthPlanet";
import { UltimateCosmicBackground } from "./UltimateCosmicBackground";
import { EnhancedSpendingMoonPhases } from "./EnhancedSpendingMoonPhases";
import { EnhancedGoalStarConstellation } from "./EnhancedGoalStarConstellation";
import { useNetWorth } from "../../features/networth/hooks/useNetWorth";
import { useTranslation } from "../../libs/i18n";
import {
  mockFinancialUniverseGoals,
  mockSpendingData,
  mockGoals,
  mockSpendingMoonData,
  mockGoalStarData,
  mockCosmicBackgroundData,
  cosmicBackgroundUtils,
} from "../../../mockData/features/dashboard";
import { UniverseLoading } from "../ui/LoadingStates";
import {
  ThemeAwareButton,
  ThemeAwareHeading,
  ThemeAwareText,
  useTheme,
} from "../../core";
import { AIInsightsContainer } from "../../features/ai-insights/components/AIInsightCard";
import { mockAIInsights } from "../../../mockData/features/ai-insights";
import { useState, useEffect } from "react";

// Using centralized mock data
const mockInvestments = [
  {
    id: "inv1",
    name: "Thai Stock Index",
    value: 150000,
    type: "stocks" as const,
    performance: 12.5,
  },
  {
    id: "inv2",
    name: "Government Bonds",
    value: 80000,
    type: "bonds" as const,
    performance: 4.2,
  },
  {
    id: "inv3",
    name: "Bitcoin Portfolio",
    value: 45000,
    type: "crypto" as const,
    performance: -8.3,
  },
  {
    id: "inv4",
    name: "Bangkok Condo",
    value: 2500000,
    type: "real-estate" as const,
    performance: 6.8,
  },
];

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
  const { isPlayMode } = useTheme();
  const { t } = useTranslation();

  // Calculate dynamic financial activity for cosmic background
  const financialActivity = cosmicBackgroundUtils.calculateFinancialActivity({
    netWorthChange: netWorthData?.netWorthChangePercent || 0,
    goalProgress:
      (mockGoalStarData.reduce(
        (sum, goal) => sum + goal.current / goal.target,
        0,
      ) /
        mockGoalStarData.length) *
      100,
    spendingVariance: mockSpendingMoonData.spendingChange,
    transactionCount: 15, // Mock transaction count
  });

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
        message={t("features.financialUniverse.loading.message")}
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
              {t("features.financialUniverse.error.title")}
            </ThemeAwareHeading>
            <ThemeAwareText className="text-white/70 mb-4">
              {t("features.financialUniverse.error.message")}
            </ThemeAwareText>
            <ThemeAwareButton
              variant="primary"
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              {t("features.financialUniverse.error.reload")}
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
      {/* Ultimate Cosmic Background */}
      <UltimateCosmicBackground
        intensity={mockCosmicBackgroundData.settings.intensity}
        showNebula={mockCosmicBackgroundData.settings.showNebula}
        showShootingStars={mockCosmicBackgroundData.settings.showShootingStars}
        showParticles={mockCosmicBackgroundData.settings.showParticles}
        show3DStars={mockCosmicBackgroundData.settings.show3DStars}
        financialActivity={financialActivity}
        interactive={mockCosmicBackgroundData.settings.interactive}
      />

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
            {t("features.financialUniverse.header.title")}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t("features.financialUniverse.header.subtitle")}
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

        {/* Enhanced Universe Components - Only show in dedicated sections */}
        {isPlayMode && (
          <div className="mb-12">
            {/* Quick Access to Enhanced Components */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <ThemeAwareButton
                variant="cosmic"
                size="sm"
                onClick={() => onQuickAction?.("view_moon_phases")}
                className="flex items-center gap-2"
              >
                🌙 {t("features.financialUniverse.quickAccess.moonPhases")}
              </ThemeAwareButton>
              <ThemeAwareButton
                variant="cosmic"
                size="sm"
                onClick={() => onQuickAction?.("view_star_constellation")}
                className="flex items-center gap-2"
              >
                ⭐{" "}
                {t("features.financialUniverse.quickAccess.starConstellation")}
              </ThemeAwareButton>
            </div>
          </div>
        )}

        {/* Main Universe Layout - Simplified and Clean */}
        <div className="space-y-16 mb-16">
          {/* Enhanced Components Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Enhanced Spending Moon Phases */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="w-full max-w-md">
                <EnhancedSpendingMoonPhases
                  monthlySpending={mockSpendingMoonData.monthlySpending}
                  previousMonthSpending={
                    mockSpendingMoonData.previousMonthSpending
                  }
                  spendingChange={mockSpendingMoonData.spendingChange}
                  spendingPattern={mockSpendingMoonData.spendingPattern}
                  spendingHistory={mockSpendingMoonData.spendingHistory}
                  categories={mockSpendingMoonData.categories}
                />
              </div>
            </motion.div>

            {/* Enhanced Goal Star Constellation */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="w-full max-w-md">
                <EnhancedGoalStarConstellation
                  goals={mockGoalStarData}
                  onGoalClick={(goal) => onQuickAction?.("view_goal", goal)}
                  interactive={true}
                  showConnections={true}
                  animateIgnition={true}
                />
              </div>
            </motion.div>
          </div>

          {/* Traditional Universe Components */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Interactive Wealth Planet */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <InteractiveWealthPlanet
                netWorth={netWorthData.totalNetWorth}
                previousNetWorth={netWorthData.previousNetWorth}
                growth={netWorthData.netWorthChange}
                investments={mockInvestments}
              />
            </motion.div>

            {/* Goals Constellation */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <GoalsAsStars goals={mockFinancialUniverseGoals} />
            </motion.div>

            {/* Moon of Spending */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.7 }}
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
        </div>

        {/* Universe Navigation */}
        <motion.div
          className="grid grid-cols-2 md:flex md:justify-center md:space-x-6 gap-4 md:gap-0 mb-12 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.0 }}
        >
          {[
            {
              emoji: "🚀",
              label: t("features.financialUniverse.navigation.quickActions"),
              action: "quick_actions",
            },
            {
              emoji: "🔭",
              label: t("features.financialUniverse.navigation.detailedView"),
              action: "detailed_view",
            },
            {
              emoji: "📊",
              label: t("features.financialUniverse.navigation.analytics"),
              action: "analytics",
            },
            {
              emoji: "⚙️",
              label: t("features.financialUniverse.navigation.settings"),
              action: "settings",
            },
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
            {t("features.financialUniverse.stats.title")}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-green-300">
                ${(netWorthData.totalNetWorth / 1000).toFixed(0)}K
              </div>
              <div className="text-white/70 text-xs md:text-sm">
                {t("features.financialUniverse.stats.totalWorth")}
              </div>
              <div className="text-green-300 text-xs mt-1">
                {t("features.financialUniverse.stats.planetMass")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-amber-300">
                ${(mockSpendingData.monthlySpending / 1000).toFixed(1)}K
              </div>
              <div className="text-white/70 text-xs md:text-sm">
                {t("features.financialUniverse.stats.monthlyFlow")}
              </div>
              <div className="text-amber-300 text-xs mt-1">
                {t("features.financialUniverse.stats.moonCycle")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-blue-300">
                {mockGoals.filter((g) => !g.isCompleted).length}
              </div>
              <div className="text-white/70 text-xs md:text-sm">
                {t("features.financialUniverse.stats.activeGoals")}
              </div>
              <div className="text-blue-300 text-xs mt-1">
                {t("features.financialUniverse.stats.burningStars")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-purple-300">
                {mockGoals.filter((g) => g.isCompleted).length}
              </div>
              <div className="text-white/70 text-xs md:text-sm">
                {t("features.financialUniverse.stats.goalsAchieved")}
              </div>
              <div className="text-purple-300 text-xs mt-1">
                {t("features.financialUniverse.stats.ignitedStars")}
              </div>
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
            {t("features.financialUniverse.inspirational.title")}
          </h3>
          <p className="text-white/70 max-w-xl md:max-w-2xl mx-auto text-sm md:text-lg">
            {t("features.financialUniverse.inspirational.message")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
