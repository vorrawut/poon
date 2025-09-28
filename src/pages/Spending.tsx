import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "../components/ui";
import {
  SpendingGalaxy,
  SpendingTimelineHeatmap,
  PaymentMethodRadar,
  LifestyleEssentialsBreakdown,
  DualLensToggle,
  UniverseBackground,
  AccessibilityModeToggle,
} from "../components/widgets";
import { Radar, Calendar, CreditCard, BarChart3, Sparkles, TrendingUp } from "lucide-react";

// Enhanced Mock Data for Ultimate Spending Experience
const mockSpendingCategories = [
  {
    id: "food",
    name: "Food & Dining",
    amount: 12400,
    budget: 15000,
    color: "#FF6B6B",
    icon: "🍽️",
    trend: "up" as const,
    trendPercent: 8,
    transactions: 45,
    frequency: 8,
    healthStatus: "warning" as const,
  },
  {
    id: "transport",
    name: "Transportation",
    amount: 6800,
    budget: 8000,
    color: "#4ECDC4",
    icon: "🚗",
    trend: "down" as const,
    trendPercent: 12,
    transactions: 28,
    frequency: 6,
    healthStatus: "healthy" as const,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    amount: 4200,
    budget: 6000,
    color: "#45B7D1",
    icon: "🎬",
    trend: "stable" as const,
    trendPercent: 2,
    transactions: 18,
    frequency: 3,
    healthStatus: "healthy" as const,
  },
  {
    id: "shopping",
    name: "Shopping",
    amount: 8900,
    budget: 7000,
    color: "#F9CA24",
    icon: "🛍️",
    trend: "up" as const,
    trendPercent: 27,
    transactions: 22,
    frequency: 4,
    healthStatus: "critical" as const,
  },
  {
    id: "utilities",
    name: "Utilities",
    amount: 3400,
    budget: 4000,
    color: "#6C5CE7",
    icon: "⚡",
    trend: "stable" as const,
    trendPercent: 1,
    transactions: 8,
    frequency: 2,
    healthStatus: "healthy" as const,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    amount: 1800,
    budget: 3000,
    color: "#A29BFE",
    icon: "🏥",
    trend: "down" as const,
    trendPercent: 15,
    transactions: 5,
    frequency: 1,
    healthStatus: "healthy" as const,
  },
];

const mockPaymentMethods = [
  {
    id: "credit-main",
    name: "Main Credit Card",
    type: "credit" as const,
    amount: 18500,
    transactions: 67,
    avgTransaction: 276,
    color: "#3B82F6",
    icon: "💳",
    trend: "up" as const,
    trendPercent: 15,
    lastUsed: new Date(),
  },
  {
    id: "debit-checking",
    name: "Checking Account",
    type: "debit" as const,
    amount: 12300,
    transactions: 45,
    avgTransaction: 273,
    color: "#10B981",
    icon: "🏦",
    trend: "stable" as const,
    trendPercent: 3,
    lastUsed: new Date(),
  },
  {
    id: "ewallet-main",
    name: "Digital Wallet",
    type: "ewallet" as const,
    amount: 5600,
    transactions: 89,
    avgTransaction: 63,
    color: "#8B5CF6",
    icon: "📱",
    trend: "up" as const,
    trendPercent: 22,
    lastUsed: new Date(),
  },
  {
    id: "cash",
    name: "Cash",
    type: "cash" as const,
    amount: 1100,
    transactions: 12,
    avgTransaction: 92,
    color: "#F59E0B",
    icon: "💵",
    trend: "down" as const,
    trendPercent: 35,
    lastUsed: new Date(),
  },
];

const mockSpendingData = [
  // Essential items
  { id: "1", name: "Rent", amount: 15000, category: "Housing", type: "essential" as const, date: new Date(), merchant: "Property Management" },
  { id: "2", name: "Groceries", amount: 4500, category: "Food", type: "essential" as const, date: new Date(), merchant: "Supermarket" },
  { id: "3", name: "Utilities", amount: 2800, category: "Utilities", type: "essential" as const, date: new Date(), merchant: "Electric Company" },
  { id: "4", name: "Insurance", amount: 1200, category: "Insurance", type: "essential" as const, date: new Date(), merchant: "Insurance Co" },
  
  // Lifestyle items
  { id: "5", name: "Dining Out", amount: 3200, category: "Food", type: "lifestyle" as const, date: new Date(), merchant: "Restaurants" },
  { id: "6", name: "Entertainment", amount: 1800, category: "Entertainment", type: "lifestyle" as const, date: new Date(), merchant: "Cinema" },
  { id: "7", name: "Shopping", amount: 2500, category: "Shopping", type: "lifestyle" as const, date: new Date(), merchant: "Mall" },
  { id: "8", name: "Travel", amount: 4000, category: "Travel", type: "lifestyle" as const, date: new Date(), merchant: "Airlines" },
];

export function Spending() {
  const [viewMode, setViewMode] = useState<"play" | "clarity">("play");
  const [accessibilityMode, setAccessibilityMode] = useState<"elder" | "youth" | "standard">("standard");
  const [activeSection, setActiveSection] = useState<"galaxy" | "timeline" | "radar" | "balance">("galaxy");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  // Calculate totals
  const totals = useMemo(() => {
    const totalSpent = mockSpendingCategories.reduce((sum, cat) => sum + cat.amount, 0);
    const totalBudget = mockSpendingCategories.reduce((sum, cat) => sum + cat.budget, 0);
    const totalPayments = mockPaymentMethods.reduce((sum, method) => sum + method.amount, 0);
    const monthlyIncome = 50000; // Mock monthly income
    
    return {
      totalSpent,
      totalBudget,
      totalPayments,
      monthlyIncome,
      budgetUsed: (totalSpent / totalBudget) * 100,
      incomeUsed: (totalSpent / monthlyIncome) * 100,
    };
  }, []);

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        viewMode === "play"
          ? "bg-gradient-to-br from-purple-900 via-pink-900 to-red-900"
          : "bg-gradient-to-br from-purple-50 to-pink-50"
      }`}
    >
      {viewMode === "play" && <UniverseBackground starCount={60} />}
      <DualLensToggle viewMode={viewMode} onToggle={setViewMode} />
      
      {/* Accessibility Mode Toggle */}
      <div className="fixed top-6 right-2 sm:top-6 sm:right-4 lg:top-6 lg:right-8 z-50">
        <AccessibilityModeToggle
          mode={accessibilityMode}
          onModeChange={setAccessibilityMode}
        />
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pb-8 sm:pb-12 pt-20 sm:pt-24 lg:pt-32 relative z-10">
        {/* Hero Section */}
        <FadeIn direction="down" delay={0.1} className="text-center py-4 sm:py-8 mb-8">
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
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
              >
                🌌
              </motion.span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {viewMode === "play" ? "Spending Galaxy" : "Spending Radar"}
              </span>
            </div>
            <p
              className={`text-lg sm:text-xl md:text-2xl mb-8 max-w-4xl mx-auto px-4 ${
                viewMode === "play" ? "text-white/80" : "text-gray-600"
              }`}
            >
              {viewMode === "play"
                ? "Navigate your financial universe! Every category is a planet, every transaction tells a story in your personal spending galaxy. 🚀✨"
                : "Professional spending analysis with advanced radar technology, timeline patterns, and intelligent insights for optimal financial management."}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { label: "Total Spent", value: `฿${totals.totalSpent.toLocaleString()}`, icon: "💰", color: "#FF6B6B" },
                { label: "Budget Used", value: `${totals.budgetUsed.toFixed(1)}%`, icon: "🎯", color: "#4ECDC4" },
                { label: "Income Used", value: `${totals.incomeUsed.toFixed(1)}%`, icon: "📊", color: "#45B7D1" },
                { label: "Categories", value: mockSpendingCategories.length, icon: "🌟", color: "#F9CA24" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`p-4 rounded-xl border ${
                    viewMode === "play"
                      ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Navigation Tabs */}
        <FadeIn direction="up" delay={0.3} className="mb-8">
          <div className="flex justify-center">
            <div className="flex overflow-x-auto scrollbar-hide gap-1 sm:gap-2 p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 w-full max-w-4xl">
              {[
                { id: "galaxy", label: "Spending Galaxy", icon: <Radar className="w-4 h-4" />, desc: "Planet View" },
                { id: "timeline", label: "Timeline Radar", icon: <Calendar className="w-4 h-4" />, desc: "When You Spend" },
                { id: "radar", label: "Payment Radar", icon: <CreditCard className="w-4 h-4" />, desc: "Method Analysis" },
                { id: "balance", label: "Life Balance", icon: <BarChart3 className="w-4 h-4" />, desc: "Needs vs Wants" }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                    activeSection === tab.id
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    {tab.icon}
                    <div>
                      <div className="text-xs sm:text-sm font-semibold leading-tight">{tab.label}</div>
                      <div className="text-xs opacity-70 hidden sm:block mt-1">{tab.desc}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Main Content Sections */}
        <AnimatePresence mode="wait">
          {activeSection === "galaxy" && (
            <motion.div
              key="galaxy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <FadeIn direction="up" delay={0.4}>
                <SpendingGalaxy
                  categories={mockSpendingCategories}
                  onCategoryClick={handleCategoryClick}
                  className="mb-8"
                />
              </FadeIn>
            </motion.div>
          )}

          {activeSection === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <FadeIn direction="up" delay={0.4}>
                <SpendingTimelineHeatmap
                  spendingData={[]}
                  className="mb-8"
                />
              </FadeIn>
            </motion.div>
          )}

          {activeSection === "radar" && (
            <motion.div
              key="radar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <FadeIn direction="up" delay={0.4}>
                <PaymentMethodRadar
                  paymentMethods={mockPaymentMethods}
                  className="mb-8"
                />
              </FadeIn>
            </motion.div>
          )}

          {activeSection === "balance" && (
            <motion.div
              key="balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <FadeIn direction="up" delay={0.4}>
                <LifestyleEssentialsBreakdown
                  spendingData={mockSpendingData}
                  monthlyIncome={totals.monthlyIncome}
                  className="mb-8"
                />
              </FadeIn>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inspirational Footer */}
        <motion.div
          className={`mt-12 text-center p-8 rounded-2xl border ${
            viewMode === "play"
              ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
              : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-gray-900"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-3xl sm:text-4xl mb-4">
            {viewMode === "play" ? "🌟" : "💡"}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-4">
            {viewMode === "play" ? "Master Your Financial Galaxy" : "Smart Spending Insights"}
          </h3>
          <p
            className={`text-base sm:text-lg mb-6 max-w-2xl mx-auto px-4 ${
              viewMode === "play" ? "text-white/80" : "text-gray-600"
            }`}
          >
            {viewMode === "play"
              ? "Every transaction is a step in your financial journey. Navigate wisely, spend mindfully, and watch your financial universe flourish! 🚀"
              : "Track patterns, optimize spending, and make data-driven financial decisions. Your future self will thank you for the insights gained today."}
          </p>
          <div
            className={`text-sm ${
              viewMode === "play" ? "text-white/60" : "text-gray-500"
            }`}
          >
            {viewMode === "play" 
              ? "🌌 Explore • 📊 Analyze • 🎯 Optimize • 🚀 Achieve"
              : "📈 Monitor trends • ⚡ Set alerts • 🎯 Meet budgets • 💰 Save more"
            }
          </div>
        </motion.div>
      </div>
    </div>
  );
}
