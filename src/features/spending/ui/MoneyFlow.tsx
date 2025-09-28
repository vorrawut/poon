import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, SplitText } from "../../../components/ui";
import {
  MoneyFlowVisualizer,
  IncomeBreakdownCard,
  MonthlyReportCard,
  GamificationLayer,
  SmartHighlights,
  UniverseBackground,
  SpendingWheel,
  MoneyJars,
  AIFinancialCoach,
} from "../../../components/widgets";
import {
  mockIncomeStreams,
  mockSpendingCategories,
  mockIncomeDetails,
  mockBadges,
  mockStreaks,
  mockChallenges,
  mockInsights,
  mockMoneyJars,
  mockCoachingInsights,
  mockMonthlyStats,
  mockUserProfile,
} from "../../../../mockData/features/spending";

import { useUIStore } from "../../../store/useUIStore";

export function MoneyFlow() {
  const { viewMode, accessibilityMode } = useUIStore();
  const [activeSection, setActiveSection] = useState<
    "flow" | "income" | "spending" | "goals" | "story" | "game" | "coach"
  >("flow");

  const totalSpending = mockSpendingCategories.reduce(
    (sum, cat) => sum + cat.amount,
    0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      <UniverseBackground />


      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 pt-20 pb-8 text-center"
      >
        <SplitText
          text="Money Flow Universe"
          className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
          delay={0.1}
        />
        <FadeIn delay={0.5}>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto px-4">
            Your financial story told like never before — Spotify Wrapped meets
            Apple Health for your money! 🚀
          </p>
        </FadeIn>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative z-10 flex justify-center mb-12"
      >
        <div className="flex space-x-2 bg-black/20 backdrop-blur-lg rounded-2xl p-2 border border-white/10">
          {[
            { id: "flow", label: "Flow", icon: "🌊" },
            { id: "income", label: "Income", icon: "💰" },
            { id: "spending", label: "Spending", icon: "💸" },
            { id: "goals", label: "Goals", icon: "🎯" },
            { id: "story", label: "Story", icon: "📖" },
            { id: "game", label: "Game", icon: "🎮" },
            { id: "coach", label: "Coach", icon: "🤖" },
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="relative z-10 px-4 pb-20">
        <AnimatePresence mode="wait">
          {activeSection === "flow" && (
            <motion.div
              key="flow"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-12"
            >
              <MoneyFlowVisualizer
                incomeStreams={mockIncomeStreams}
                spendingCategories={mockSpendingCategories}
                viewMode={viewMode}
              />
            </motion.div>
          )}

          {activeSection === "income" && (
            <motion.div
              key="income"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-12"
            >
              <IncomeBreakdownCard
                incomes={mockIncomeDetails.map((income) => ({
                  ...income,
                  type:
                    income.type === "bonus"
                      ? "other"
                      : (income.type as
                          | "other"
                          | "investment"
                          | "salary"
                          | "freelance"
                          | "business"),
                  frequency:
                    income.frequency === "quarterly"
                      ? "monthly"
                      : (income.frequency as
                          | "one-time"
                          | "monthly"
                          | "weekly"
                          | "bi-weekly"
                          | "yearly"),
                }))}
                viewMode={viewMode}
              />
            </motion.div>
          )}

          {activeSection === "spending" && (
            <motion.div
              key="spending"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SpendingWheel
                  categories={mockSpendingCategories.map((cat) => ({
                    ...cat,
                    budget: (cat as any).budget || cat.amount * 1.2,
                    percentage: (cat.amount / totalSpending) * 100,
                    trend: (cat as any).trend || ("stable" as const),
                    trendPercent: (cat as any).trendPercent || 0,
                  }))}
                  totalSpent={totalSpending}
                  totalBudget={totalSpending * 1.2}
                  viewMode={viewMode}
                />
                <MoneyJars
                  jars={mockMoneyJars.map((jar) => ({
                    ...jar,
                    currentAmount: jar.current,
                    targetAmount: jar.target,
                    category: "savings" as const,
                    monthlyContribution: Math.round(jar.target / 12),
                  }))}
                />
              </div>
            </motion.div>
          )}

          {activeSection === "goals" && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-12"
            >
              <MoneyJars
                jars={mockMoneyJars.map((jar) => ({
                  ...jar,
                  currentAmount: jar.current,
                  targetAmount: jar.target,
                  category: "savings" as const,
                  monthlyContribution: Math.round(jar.target / 12),
                }))}
              />
            </motion.div>
          )}

          {activeSection === "story" && (
            <motion.div
              key="story"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-12"
            >
              <MonthlyReportCard stats={mockMonthlyStats} viewMode={viewMode} />
            </motion.div>
          )}

          {activeSection === "game" && (
            <motion.div
              key="game"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-12"
            >
              <GamificationLayer
                badges={mockBadges.map((badge) => ({
                  ...badge,
                  requirement: badge.description,
                }))}
                streaks={mockStreaks.map((streak) => ({
                  ...streak,
                  currentCount: streak.count,
                  bestCount: streak.count + 5,
                  isActive: true,
                  lastUpdated: new Date().toISOString(),
                }))}
                challenges={mockChallenges.map((challenge) => ({
                  ...challenge,
                  icon: "🎯",
                  isCompleted: challenge.progress >= challenge.target,
                }))}
                totalPoints={2847}
                level={12}
                nextLevelPoints={3000}
                viewMode={viewMode}
              />
            </motion.div>
          )}

          {activeSection === "coach" && (
            <motion.div
              key="coach"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-12"
            >
              <AIFinancialCoach
                insights={mockCoachingInsights.map((insight) => ({
                  ...insight,
                  type:
                    insight.type === "optimization"
                      ? "recommendation"
                      : (insight.type as
                          | "prediction"
                          | "recommendation"
                          | "warning"
                          | "celebration"
                          | "tip"),
                  impact: "medium" as const,
                  category: "spending" as const,
                  actionable: true,
                }))}
                userProfile={{
                  ...mockUserProfile,
                  age: 30,
                  primaryGoals: mockUserProfile.financialGoals,
                }}
                viewMode={viewMode}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Smart Highlights */}
      <div className="relative z-10 px-4 pb-20">
        <SmartHighlights
          highlights={mockInsights.map((insight) => ({
            id: insight.id,
            title: insight.title,
            message: insight.message,
            icon: insight.icon,
            type: insight.type === "opportunity" ? "insight" : insight.type,
          }))}
          title="Smart Money Insights"
          subtitle="Your personal financial newsfeed — AI-powered insights with actionable recommendations."
        />
      </div>
    </div>
  );
}
