import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, SplitText } from "../components/ui";
import {
  SpendingAnalyzer,
  SmartHighlights,
  DualLensToggle,
  UniverseBackground,
} from "../components/widgets";

// Mock Spending Data
const mockSpendingCategories = [
  {
    id: "food",
    name: "Food & Dining",
    amount: 1240,
    budget: 1500,
    color: "#FF6B6B",
    icon: "🍽️",
    trend: "up" as const,
    trendPercent: 8,
    transactions: 45,
  },
  {
    id: "transport",
    name: "Transportation",
    amount: 680,
    budget: 800,
    color: "#4ECDC4",
    icon: "🚗",
    trend: "down" as const,
    trendPercent: 12,
    transactions: 28,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    amount: 420,
    budget: 600,
    color: "#45B7D1",
    icon: "🎬",
    trend: "stable" as const,
    trendPercent: 2,
    transactions: 18,
  },
  {
    id: "shopping",
    name: "Shopping",
    amount: 890,
    budget: 700,
    color: "#F9CA24",
    icon: "🛍️",
    trend: "up" as const,
    trendPercent: 27,
    transactions: 22,
  },
  {
    id: "utilities",
    name: "Utilities",
    amount: 340,
    budget: 400,
    color: "#6C5CE7",
    icon: "⚡",
    trend: "stable" as const,
    trendPercent: 1,
    transactions: 8,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    amount: 180,
    budget: 300,
    color: "#A29BFE",
    icon: "🏥",
    trend: "down" as const,
    trendPercent: 15,
    transactions: 5,
  },
];

const spendingHighlights = [
  {
    id: "1",
    title: "Budget Alert",
    message:
      "You're 27% over budget on shopping this month! Consider reviewing recent purchases or adjusting your budget.",
    icon: "⚠️",
    type: "warning" as const,
  },
  {
    id: "2",
    title: "Great Savings",
    message:
      "You saved $120 on transportation this month! Your carpooling and public transit usage is paying off.",
    icon: "🎯",
    type: "success" as const,
  },
  {
    id: "3",
    title: "Spending Pattern",
    message:
      "Your food spending peaks on weekends. Consider meal prepping to reduce dining out costs.",
    icon: "📊",
    type: "insight" as const,
  },
  {
    id: "4",
    title: "Monthly Summary",
    message:
      "Total spending: $3,750 this month. You're staying within your overall budget of $4,300. Well done!",
    icon: "💰",
    type: "info" as const,
  },
];

export function Spending() {
  const [viewMode, setViewMode] = useState<"play" | "clarity">("play");

  const totalSpent = mockSpendingCategories.reduce(
    (sum, cat) => sum + cat.amount,
    0,
  );
  const totalBudget = mockSpendingCategories.reduce(
    (sum, cat) => sum + cat.budget,
    0,
  );

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        viewMode === "play"
          ? "bg-gradient-to-br from-purple-900 via-pink-900 to-red-900"
          : "bg-gradient-to-br from-purple-50 to-pink-50"
      }`}
    >
      {viewMode === "play" && <UniverseBackground starCount={35} />}
      <DualLensToggle viewMode={viewMode} onToggle={setViewMode} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
        {/* Hero Header */}
        <FadeIn direction="down" delay={0.1} className="text-center py-12">
          <div className="mb-6">
            <div
              className={`text-5xl md:text-6xl font-bold mb-4 ${
                viewMode === "play" ? "text-white" : "text-gray-900"
              }`}
            >
              <motion.span
                className="inline-block mr-4"
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                💸
              </motion.span>
              <SplitText className="inline">Spending Analysis</SplitText>
            </div>
            <p
              className={`text-xl mb-8 max-w-2xl mx-auto ${
                viewMode === "play" ? "text-white/80" : "text-gray-600"
              }`}
            >
              {viewMode === "play"
                ? "Explore your spending universe — where every dollar tells a story in your financial galaxy!"
                : "Analyze your spending patterns and categories with clear insights and actionable recommendations."}
            </p>
          </div>

          {/* Spending Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              className={`rounded-2xl p-6 border ${
                viewMode === "play"
                  ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                  : "bg-white border-gray-200 text-gray-900"
              }`}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-3xl mb-2">💰</div>
              <div className="text-2xl font-bold">
                ${totalSpent.toLocaleString()}
              </div>
              <div
                className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
              >
                Total Spent This Month
              </div>
            </motion.div>

            <motion.div
              className={`rounded-2xl p-6 border ${
                viewMode === "play"
                  ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                  : "bg-white border-gray-200 text-gray-900"
              }`}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold">
                ${totalBudget.toLocaleString()}
              </div>
              <div
                className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
              >
                Total Budget
              </div>
            </motion.div>

            <motion.div
              className={`rounded-2xl p-6 border ${
                viewMode === "play"
                  ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                  : "bg-white border-gray-200 text-gray-900"
              }`}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-3xl mb-2">
                {totalSpent <= totalBudget ? "✅" : "⚠️"}
              </div>
              <div
                className={`text-2xl font-bold ${
                  totalSpent <= totalBudget ? "text-green-400" : "text-red-400"
                }`}
              >
                ${(totalBudget - totalSpent).toLocaleString()}
              </div>
              <div
                className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
              >
                {totalSpent <= totalBudget ? "Under Budget" : "Over Budget"}
              </div>
            </motion.div>
          </div>
        </FadeIn>

        {/* Main Spending Analyzer */}
        <div className="mb-20">
          <SpendingAnalyzer
            categories={mockSpendingCategories}
            totalSpent={totalSpent}
            totalBudget={totalBudget}
          />
        </div>

        {/* Smart Spending Insights */}
        <SmartHighlights
          highlights={spendingHighlights}
          title="Spending Intelligence"
          subtitle="Smart insights about your spending habits — your personal finance coach!"
          className="mb-12"
        />

        {/* Spending Tips Footer */}
        <FadeIn direction="up" delay={1.0}>
          <div
            className={`text-center rounded-2xl p-8 border ${
              viewMode === "play"
                ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-gray-900"
            }`}
          >
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-2xl font-bold mb-4">Smart Spending Tips</h3>
            <p
              className={`text-lg mb-6 max-w-2xl mx-auto ${
                viewMode === "play" ? "text-white/80" : "text-gray-600"
              }`}
            >
              Track your spending regularly, set realistic budgets, and
              celebrate small wins. Every dollar you save is a step closer to
              your financial goals!
            </p>
            <div
              className={`text-sm ${
                viewMode === "play" ? "text-white/60" : "text-gray-500"
              }`}
            >
              💳 Use the 50/30/20 rule • 📱 Set up spending alerts • 🎯 Review
              weekly
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
