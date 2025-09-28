import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, SplitText } from "../components/ui";
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
} from "../components/widgets";

// Mock Data - Ultimate Money Flow Experience
const mockIncomeStreams = [
  {
    id: "salary",
    name: "Software Engineer",
    amount: 8500,
    color: "#3B82F6",
    icon: "💼",
    type: "recurring" as const,
    frequency: "Monthly",
  },
  {
    id: "freelance",
    name: "Side Projects",
    amount: 2200,
    color: "#8B5CF6",
    icon: "💻",
    type: "recurring" as const,
    frequency: "Weekly",
  },
  {
    id: "investment",
    name: "Dividends",
    amount: 450,
    color: "#10B981",
    icon: "📈",
    type: "recurring" as const,
    frequency: "Quarterly",
  },
  {
    id: "bonus",
    name: "Performance Bonus",
    amount: 1500,
    color: "#F59E0B",
    icon: "🎁",
    type: "one-time" as const,
    frequency: "One-time",
  },
];

const mockSpendingCategories = [
  {
    id: "necessities",
    name: "Necessities",
    amount: 4200,
    color: "#EF4444",
    icon: "🏠",
    type: "necessity" as const,
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    amount: 2800,
    color: "#F59E0B",
    icon: "🎬",
    type: "lifestyle" as const,
  },
  {
    id: "investment",
    name: "Investments",
    amount: 2000,
    color: "#10B981",
    icon: "💎",
    type: "investment" as const,
  },
  {
    id: "fun",
    name: "Fun & Entertainment",
    amount: 1200,
    color: "#8B5CF6",
    icon: "🎉",
    type: "lifestyle" as const,
  },
  {
    id: "transport",
    name: "Transportation",
    amount: 680,
    color: "#06B6D4",
    icon: "🚗",
    type: "necessity" as const,
  },
];

const mockIncomeDetails = [
  {
    id: "salary",
    name: "Software Engineer Salary",
    amount: 8500,
    type: "salary" as const,
    frequency: "monthly" as const,
    nextPayment: "2024-10-15",
    color: "#3B82F6",
    icon: "💼",
    growth: 12,
    isRecurring: true,
  },
  {
    id: "freelance",
    name: "Freelance Development",
    amount: 2200,
    type: "freelance" as const,
    frequency: "weekly" as const,
    nextPayment: "2024-10-07",
    color: "#8B5CF6",
    icon: "💻",
    growth: 25,
    isRecurring: true,
  },
  {
    id: "dividends",
    name: "Stock Dividends",
    amount: 450,
    type: "investment" as const,
    frequency: "monthly" as const,
    nextPayment: "2024-10-20",
    color: "#10B981",
    icon: "📈",
    growth: 8,
    isRecurring: true,
  },
  {
    id: "bonus",
    name: "Q3 Performance Bonus",
    amount: 1500,
    type: "other" as const,
    frequency: "one-time" as const,
    color: "#F59E0B",
    icon: "🎁",
    isRecurring: false,
  },
];

const mockMonthlyStats = {
  totalSpent: 10880,
  totalIncome: 12650,
  topCategory: {
    name: "Necessities",
    amount: 4200,
    percentage: 39,
    icon: "🏠",
  },
  cheapestDay: {
    date: "2024-09-15",
    amount: 12,
  },
  mostExpensiveDay: {
    date: "2024-09-22",
    amount: 450,
  },
  comparisonLastMonth: {
    spending: -8,
    income: 15,
    savings: 35,
  },
  achievements: ["Budget Master 🏆", "Savings Streak 💰", "Investment Hero 📈"],
  streaks: {
    budgetCompliance: 12,
    savingsGoal: 8,
    noSpendDays: 3,
  },
  predictions: {
    monthEndSpending: 11200,
    yearEndSavings: 21600,
    nextMilestone: {
      name: "Emergency Fund Goal",
      progress: 68,
      target: 25000,
    },
  },
};

const mockBadges = [
  {
    id: "first-save",
    name: "First Save",
    description: "Made your first savings deposit",
    icon: "🏦",
    rarity: "common" as const,
    earned: true,
    earnedDate: "2024-01-15",
    requirement: "Save any amount",
  },
  {
    id: "budget-master",
    name: "Budget Master",
    description: "Stayed within budget for 30 days",
    icon: "🎯",
    rarity: "rare" as const,
    earned: true,
    earnedDate: "2024-08-20",
    requirement: "30 days under budget",
  },
  {
    id: "investment-hero",
    name: "Investment Hero",
    description: "Invested in 5 different assets",
    icon: "📈",
    rarity: "epic" as const,
    earned: true,
    earnedDate: "2024-09-10",
    requirement: "Diversify into 5 assets",
  },
  {
    id: "millionaire",
    name: "Millionaire",
    description: "Reached $1M net worth",
    icon: "💎",
    rarity: "legendary" as const,
    earned: false,
    progress: 68,
    requirement: "Accumulate $1,000,000",
  },
  {
    id: "coffee-saver",
    name: "Coffee Saver",
    description: "Avoided coffee purchases for 7 days",
    icon: "☕",
    rarity: "common" as const,
    earned: false,
    progress: 85,
    requirement: "7 days without coffee purchases",
  },
];

const mockStreaks = [
  {
    id: "budget-streak",
    name: "Budget Compliance",
    description: "Days staying within budget",
    icon: "🎯",
    currentCount: 12,
    bestCount: 45,
    isActive: true,
    lastUpdated: "2024-09-28",
  },
  {
    id: "savings-streak",
    name: "Daily Savings",
    description: "Days with positive savings",
    icon: "💰",
    currentCount: 8,
    bestCount: 23,
    isActive: true,
    lastUpdated: "2024-09-28",
  },
  {
    id: "no-spend-streak",
    name: "No-Spend Days",
    description: "Days without any spending",
    icon: "🧘",
    currentCount: 0,
    bestCount: 7,
    isActive: false,
    lastUpdated: "2024-09-27",
  },
];

const mockChallenges = [
  {
    id: "save-1000",
    name: "Save $1,000",
    description: "Reach $1,000 in savings this month",
    icon: "💰",
    progress: 750,
    target: 1000,
    reward: "Investment Hero Badge",
    difficulty: "medium" as const,
    timeLeft: "3 days",
    isCompleted: false,
  },
  {
    id: "no-dining-out",
    name: "Home Chef Challenge",
    description: "Cook at home for 14 days straight",
    icon: "👨‍🍳",
    progress: 9,
    target: 14,
    reward: "50 bonus points",
    difficulty: "hard" as const,
    timeLeft: "5 days",
    isCompleted: false,
  },
  {
    id: "track-expenses",
    name: "Expense Tracker",
    description: "Log all expenses for 30 days",
    icon: "📝",
    progress: 30,
    target: 30,
    reward: "Budget Master Badge",
    difficulty: "easy" as const,
    timeLeft: "Completed",
    isCompleted: true,
  },
];

const mockInsights = [
  {
    id: "1",
    title: "Fantastic Month!",
    message:
      "You saved $1,770 this month! That's 14% of your income. You're building wealth faster than 85% of people your age.",
    icon: "🚀",
    type: "success" as const,
  },
  {
    id: "2",
    title: "Income Growth Alert",
    message:
      "Your freelance income grew 25% this quarter! Consider increasing your investment allocation to capitalize on this growth.",
    icon: "📈",
    type: "info" as const,
  },
  {
    id: "3",
    title: "Smart Spending Pattern",
    message:
      "You reduced lifestyle spending by 8% compared to last month while maintaining your quality of life. Great balance!",
    icon: "🎯",
    type: "insight" as const,
  },
  {
    id: "4",
    title: "Investment Opportunity",
    message:
      "With your current savings rate, you could increase your investment contributions by $300/month and still maintain your lifestyle.",
    icon: "💡",
    type: "warning" as const,
  },
  {
    id: "5",
    title: "Milestone Achievement",
    message:
      "Congratulations! You're 68% toward your emergency fund goal. At this pace, you'll reach it in just 4 months!",
    icon: "🎉",
    type: "celebration" as const,
  },
];

// Mock data for Spending Wheel
const mockSpendingWheel = [
  {
    id: "food",
    name: "Food & Dining",
    amount: 1240,
    budget: 1500,
    color: "#FF6B6B",
    icon: "🍽️",
    percentage: 32,
    trend: "up" as const,
    trendPercent: 8,
  },
  {
    id: "transport",
    name: "Transportation",
    amount: 680,
    budget: 800,
    color: "#4ECDC4",
    icon: "🚗",
    percentage: 18,
    trend: "down" as const,
    trendPercent: 12,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    amount: 420,
    budget: 600,
    color: "#45B7D1",
    icon: "🎬",
    percentage: 11,
    trend: "stable" as const,
    trendPercent: 2,
  },
  {
    id: "shopping",
    name: "Shopping",
    amount: 890,
    budget: 700,
    color: "#F9CA24",
    icon: "🛍️",
    percentage: 23,
    trend: "up" as const,
    trendPercent: 27,
  },
  {
    id: "utilities",
    name: "Utilities",
    amount: 340,
    budget: 400,
    color: "#6C5CE7",
    icon: "⚡",
    percentage: 9,
    trend: "stable" as const,
    trendPercent: 1,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    amount: 280,
    budget: 300,
    color: "#A29BFE",
    icon: "🏥",
    percentage: 7,
    trend: "down" as const,
    trendPercent: 15,
  },
];

// Mock data for Money Jars
const mockMoneyJars = [
  {
    id: "emergency",
    name: "Emergency Fund",
    currentAmount: 15000,
    targetAmount: 25000,
    color: "#10B981",
    icon: "🛡️",
    priority: "high" as const,
    category: "savings" as const,
    monthlyContribution: 1000,
    estimatedCompletion: "10 months",
  },
  {
    id: "vacation",
    name: "Dream Vacation",
    currentAmount: 3200,
    targetAmount: 8000,
    color: "#3B82F6",
    icon: "🏖️",
    priority: "medium" as const,
    category: "fun" as const,
    monthlyContribution: 400,
    estimatedCompletion: "12 months",
  },
  {
    id: "house",
    name: "House Down Payment",
    currentAmount: 45000,
    targetAmount: 100000,
    color: "#8B5CF6",
    icon: "🏠",
    priority: "high" as const,
    category: "necessity" as const,
    monthlyContribution: 2000,
    estimatedCompletion: "28 months",
  },
  {
    id: "car",
    name: "New Car",
    currentAmount: 8500,
    targetAmount: 35000,
    color: "#F59E0B",
    icon: "🚗",
    priority: "medium" as const,
    category: "necessity" as const,
    monthlyContribution: 800,
    estimatedCompletion: "33 months",
  },
  {
    id: "investment",
    name: "Investment Fund",
    currentAmount: 12000,
    targetAmount: 50000,
    color: "#EF4444",
    icon: "📈",
    priority: "low" as const,
    category: "investment" as const,
    monthlyContribution: 1200,
    estimatedCompletion: "32 months",
  },
  {
    id: "education",
    name: "Education Fund",
    currentAmount: 5500,
    targetAmount: 20000,
    color: "#06B6D4",
    icon: "🎓",
    priority: "medium" as const,
    category: "investment" as const,
    monthlyContribution: 500,
    estimatedCompletion: "29 months",
  },
];

// Mock AI Coaching Data
const mockCoachingInsights = [
  {
    id: "1",
    type: "prediction" as const,
    title: "Savings Milestone Alert",
    message:
      "At your current pace, you'll reach $50K in savings by March 2025. Consider increasing your emergency fund contribution by $200/month to hit this goal 2 months earlier.",
    impact: "high" as const,
    category: "saving" as const,
    actionable: true,
    data: {
      currentValue: 35000,
      targetValue: 50000,
      percentage: 70,
      timeframe: "March 2025",
    },
    actions: [
      {
        label: "Increase Savings",
        type: "primary" as const,
        action: () => console.log("Increase savings"),
      },
      {
        label: "View Timeline",
        type: "secondary" as const,
        action: () => console.log("View timeline"),
      },
    ],
  },
  {
    id: "2",
    type: "recommendation" as const,
    title: "Investment Opportunity",
    message:
      "Your cash reserves are growing! With $15K+ in savings, consider investing $5K in a diversified index fund to boost long-term growth.",
    impact: "medium" as const,
    category: "investing" as const,
    actionable: true,
    actions: [
      {
        label: "Explore Investments",
        type: "primary" as const,
        action: () => console.log("Explore investments"),
      },
      {
        label: "Learn More",
        type: "secondary" as const,
        action: () => console.log("Learn more"),
      },
    ],
  },
  {
    id: "3",
    type: "celebration" as const,
    title: "Budget Champion!",
    message:
      "Congratulations! You've stayed under budget for 3 months straight. Your disciplined approach is paying off with $1,770 in monthly savings.",
    impact: "high" as const,
    category: "budgeting" as const,
    actionable: false,
  },
  {
    id: "4",
    type: "tip" as const,
    title: "Smart Spending Insight",
    message:
      "Your food spending peaks on weekends. Meal prepping on Sundays could save you $120/month while maintaining your lifestyle.",
    impact: "medium" as const,
    category: "spending" as const,
    actionable: true,
    actions: [
      {
        label: "Create Meal Plan",
        type: "primary" as const,
        action: () => console.log("Create meal plan"),
      },
    ],
  },
];

const mockUserProfile = {
  name: "Alex",
  age: 28,
  riskTolerance: "moderate" as const,
  primaryGoals: ["Emergency Fund", "House Down Payment", "Retirement"],
  monthlyIncome: 12650,
  monthlyExpenses: 10880,
};

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
  const netBalance = totalIncome - totalSpending;

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        viewMode === "play"
          ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
          : "bg-gradient-to-br from-indigo-50 to-purple-50"
      }`}
    >
      {viewMode === "play" && <UniverseBackground starCount={40} />}
      <DualLensToggle viewMode={viewMode} onToggle={setViewMode} />

      {/* Accessibility Mode Toggle */}
      <div className="fixed top-25 right-2 sm:top-25 sm:right-2 lg:top-25 lg:right-2 z-50">
        <AccessibilityModeToggle
          mode={accessibilityMode}
          onModeChange={setAccessibilityMode}
        />
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pb-8 sm:pb-12 pt-20 sm:pt-24 lg:pt-32 relative z-10">
        {/* Ultimate Hero Section */}
        <FadeIn
          direction="down"
          delay={0.1}
          className="text-center py-4 sm:py-8"
        >
          <div className="mb-8">
            <div
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 ${
                viewMode === "play" ? "text-white" : "text-gray-900"
              }`}
            >
              <motion.span
                className="inline-block mr-4"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                💫
              </motion.span>
              <SplitText className="inline">Your Money Universe</SplitText>
            </div>
            <p
              className={`text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto px-4 ${
                viewMode === "play" ? "text-white/80" : "text-gray-600"
              }`}
            >
              {viewMode === "play"
                ? "Welcome to your living, breathing financial ecosystem — where every dollar has a story and every choice shapes your future!"
                : "Comprehensive income and spending analysis with personalized insights and actionable recommendations for your financial journey."}
            </p>

            {/* Quick Stats Hero Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 px-4">
              <motion.div
                className={`rounded-2xl p-6 border ${
                  viewMode === "play"
                    ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-3xl sm:text-4xl mb-3">💰</div>
                <div className="text-2xl sm:text-3xl font-bold text-green-400">
                  {formatCurrency(totalIncome)}
                </div>
                <div
                  className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                >
                  Total Income This Month
                </div>
              </motion.div>

              <motion.div
                className={`rounded-2xl p-6 border ${
                  viewMode === "play"
                    ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-3xl sm:text-4xl mb-3">💸</div>
                <div className="text-2xl sm:text-3xl font-bold text-red-400">
                  {formatCurrency(totalSpending)}
                </div>
                <div
                  className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                >
                  Total Spending This Month
                </div>
              </motion.div>

              <motion.div
                className={`rounded-2xl p-6 border ${
                  viewMode === "play"
                    ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-3xl sm:text-4xl mb-3">
                  {netBalance >= 0 ? "💎" : "⚠️"}
                </div>
                <div
                  className={`text-2xl sm:text-3xl font-bold ${
                    netBalance >= 0 ? "text-blue-400" : "text-orange-400"
                  }`}
                >
                  {netBalance >= 0 ? "+" : ""}
                  {formatCurrency(netBalance)}
                </div>
                <div
                  className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                >
                  {netBalance >= 0 ? "Money Saved" : "Over Budget"}
                </div>
              </motion.div>
            </div>
          </div>
        </FadeIn>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6 sm:mb-8 lg:mb-12 px-2 sm:px-4">
          <div className="flex overflow-x-auto scrollbar-hide gap-1 sm:gap-2 p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 w-full max-w-4xl">
            {[
              {
                id: "flow",
                label: "💫 Money Flow",
                desc: "Live visualization",
              },
              {
                id: "income",
                label: "💰 Income Hub",
                desc: "Earnings breakdown",
              },
              {
                id: "spending",
                label: "🎡 Spending Wheel",
                desc: "Interactive categories",
              },
              { id: "goals", label: "🏺 Money Jars", desc: "Savings goals" },
              { id: "coach", label: "🤖 AI Coach", desc: "Personal mentor" },
              { id: "story", label: "📖 Your Story", desc: "Monthly wrapped" },
              { id: "game", label: "🎮 Achievements", desc: "Gamification" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                  activeSection === tab.id
                    ? viewMode === "play"
                      ? "bg-white/20 text-white border border-white/30"
                      : "bg-white text-gray-900 border border-gray-200 shadow-sm"
                    : viewMode === "play"
                      ? "hover:bg-white/10 text-white/70"
                      : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <div className="text-center">
                  <div className="text-xs sm:text-sm font-semibold leading-tight">
                    {tab.label}
                  </div>
                  <div className="text-xs opacity-70 hidden sm:block mt-1">
                    {tab.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Sections */}
        <AnimatePresence mode="wait">
          {activeSection === "flow" && (
            <motion.div
              key="flow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Money Flow Visualizer */}
              <MoneyFlowVisualizer
                incomeStreams={mockIncomeStreams}
                spendingCategories={mockSpendingCategories}
                viewMode={viewMode}
                className="mb-12"
              />

              {/* AI Insights */}
              <SmartHighlights
                highlights={mockInsights}
                title="💡 Smart Money Insights"
                subtitle="Your personal financial coach with real-time analysis and predictions"
                className="mb-12"
              />
            </motion.div>
          )}

          {activeSection === "income" && (
            <motion.div
              key="income"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <IncomeBreakdownCard
                incomes={mockIncomeDetails}
                viewMode={viewMode}
                className="mb-12"
              />
            </motion.div>
          )}

          {activeSection === "spending" && (
            <motion.div
              key="spending"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SpendingWheel
                categories={mockSpendingWheel}
                totalSpent={mockSpendingWheel.reduce(
                  (sum, cat) => sum + cat.amount,
                  0,
                )}
                totalBudget={mockSpendingWheel.reduce(
                  (sum, cat) => sum + cat.budget,
                  0,
                )}
                viewMode={viewMode}
                className="mb-12"
              />
            </motion.div>
          )}

          {activeSection === "goals" && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MoneyJars
                jars={mockMoneyJars}
                viewMode={viewMode}
                className="mb-12"
              />
            </motion.div>
          )}

          {activeSection === "coach" && (
            <motion.div
              key="coach"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AIFinancialCoach
                insights={mockCoachingInsights}
                userProfile={mockUserProfile}
                viewMode={viewMode}
                accessibilityMode={accessibilityMode}
                className="mb-12"
              />
            </motion.div>
          )}

          {activeSection === "story" && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MonthlyReportCard
                stats={mockMonthlyStats}
                viewMode={viewMode}
                className="mb-12"
              />
            </motion.div>
          )}

          {activeSection === "game" && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <GamificationLayer
                badges={mockBadges}
                streaks={mockStreaks}
                challenges={mockChallenges}
                totalPoints={8420}
                level={12}
                nextLevelPoints={1000}
                viewMode={viewMode}
                className="mb-12"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Inspiration */}
        <FadeIn direction="up" delay={1.0}>
          <div
            className={`text-center rounded-2xl p-8 border ${
              viewMode === "play"
                ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-gray-900"
            }`}
          >
            <div className="text-3xl sm:text-4xl mb-4">✨</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              Your Financial Journey Continues
            </h3>
            <p
              className={`text-base sm:text-lg mb-6 max-w-2xl mx-auto px-4 ${
                viewMode === "play" ? "text-white/80" : "text-gray-600"
              }`}
            >
              Every dollar you earn, save, and invest is a step toward your
              dreams. Keep building, keep growing, keep believing in your
              financial future!
            </p>
            <div
              className={`text-sm ${
                viewMode === "play" ? "text-white/60" : "text-gray-500"
              }`}
            >
              🌟 Dream big • 💪 Stay consistent • 🎯 Track progress • 🚀 Achieve
              greatness
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
