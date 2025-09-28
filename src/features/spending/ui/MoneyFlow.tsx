import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, SplitText } from "../../../components/ui";
import {
  MoneyFlowVisualizer,
  IncomeBreakdownCard,
  MonthlyReportCard,
  GamificationLayer,
  SmartHighlights,
  DualLensToggle,
  UniverseBackground,
  SpendingWheel,
  MoneyJars,
  AccessibilityModeToggle,
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
  mockSpendingWheel,
  mockMoneyJars,
  mockCoachingInsights,
  mockMonthlyStats,
  mockUserProfile,
} from "../../../../mockData/features/spending";

export function MoneyFlow() {
  const [viewMode, setViewMode] = useState<"play" | "clarity">("play");
  const [accessibilityMode, setAccessibilityMode] = useState<
    "elder" | "youth" | "standard"
  >("standard");
  const [activeSection, setActiveSection] = useState<
    "flow" | "income" | "spending" | "goals" | "story" | "game" | "coach"
  >("flow");

  const totalIncome = mockIncomeStreams.reduce(
    (sum, stream) => sum + stream.amount,
    0,
  );
  const totalSpending = mockSpendingCategories.reduce(
    (sum, cat) => sum + cat.amount,
    0,
  );
  const netFlow = totalIncome - totalSpending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      <UniverseBackground />

      {/* Accessibility Mode Toggle */}
      <AccessibilityModeToggle
        mode={accessibilityMode}
        onModeChange={setAccessibilityMode}
        className="fixed top-4 left-4 z-50"
      />

      {/* Dual Lens Toggle */}
      <DualLensToggle
        mode={viewMode}
        onModeChange={setViewMode}
        className="fixed top-4 right-4 z-50"
        style={{
          transform: accessibilityMode !== "standard" ? "translateY(60px)" : "",
        }}
      />

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
                income={totalIncome}
                spending={totalSpending}
                netFlow={netFlow}
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
                incomeDetails={mockIncomeDetails}
                totalIncome={totalIncome}
                monthlyStats={mockMonthlyStats}
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
                <SpendingWheel data={mockSpendingWheel} />
                <MoneyJars jars={mockMoneyJars} />
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
              <MoneyJars jars={mockMoneyJars} />
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
              <MonthlyReportCard
                monthlyStats={mockMonthlyStats}
                insights={mockInsights}
              />
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
                badges={mockBadges}
                streaks={mockStreaks}
                challenges={mockChallenges}
                level={12}
                xp={2847}
                nextLevelXp={3000}
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
                insights={mockCoachingInsights}
                userProfile={mockUserProfile}
                monthlyStats={mockMonthlyStats}
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
            type: insight.type,
          }))}
          title="Smart Money Insights"
          subtitle="Your personal financial newsfeed — AI-powered insights with actionable recommendations."
        />
      </div>
    </div>
  );
}
