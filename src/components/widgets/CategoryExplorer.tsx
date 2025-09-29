import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Tag,
  Search,
  PieChart,
  Lightbulb,
} from "lucide-react";
import { mockCategoryTransactions } from "../../../mockData/features/spending";

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: Date;
  merchant: string;
  subcategory: string;
  paymentMethod: string;
  location?: string;
  tags?: string[];
  notes?: string;
}

interface CategoryExplorerProps {
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
    amount: number;
    budget: number;
    transactions: Transaction[];
  } | null;
  onBack: () => void;
  className?: string;
}

export function CategoryExplorer({
  category,
  onBack,
  className = "",
}: CategoryExplorerProps) {
  const [viewMode, setViewMode] = useState<
    "overview" | "transactions" | "insights"
  >("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null,
  );

  // Using centralized mock data
  const mockTransactions: Transaction[] = useMemo(
    () => mockCategoryTransactions,
    [],
  );

  // Analytics calculations
  const analytics = useMemo(() => {
    const transactions = mockTransactions;
    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
    const avgTransaction = totalSpent / transactions.length;

    // Subcategory breakdown
    const subcategories = transactions.reduce(
      (acc, t) => {
        if (!acc[t.subcategory]) {
          acc[t.subcategory] = { amount: 0, count: 0 };
        }
        acc[t.subcategory].amount += t.amount;
        acc[t.subcategory].count += 1;
        return acc;
      },
      {} as Record<string, { amount: number; count: number }>,
    );

    // Merchant breakdown
    const merchants = transactions.reduce(
      (acc, t) => {
        if (!acc[t.merchant]) {
          acc[t.merchant] = { amount: 0, count: 0 };
        }
        acc[t.merchant].amount += t.amount;
        acc[t.merchant].count += 1;
        return acc;
      },
      {} as Record<string, { amount: number; count: number }>,
    );

    // Time patterns
    const timePatterns = transactions.reduce(
      (acc, t) => {
        const hour = t.date.getHours();
        const dayOfWeek = t.date.getDay();

        if (!acc.hourly[hour]) acc.hourly[hour] = 0;
        if (!acc.daily[dayOfWeek]) acc.daily[dayOfWeek] = 0;

        acc.hourly[hour] += t.amount;
        acc.daily[dayOfWeek] += t.amount;

        return acc;
      },
      {
        hourly: {} as Record<number, number>,
        daily: {} as Record<number, number>,
      },
    );

    return {
      totalSpent,
      avgTransaction,
      transactionCount: transactions.length,
      subcategories,
      merchants,
      timePatterns,
      budgetUsed: category ? (totalSpent / category.budget) * 100 : 0,
    };
  }, [mockTransactions, category]);

  if (!category) return null;

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubcategory =
      !selectedSubcategory || transaction.subcategory === selectedSubcategory;
    return matchesSearch && matchesSubcategory;
  });

  const getInsights = () => [
    {
      title: "Peak Spending Time",
      message: `You spend most on ${category.name.toLowerCase()} between 12-2 PM (lunch hours)`,
      icon: "⏰",
      color: "#F59E0B",
    },
    {
      title: "Favorite Merchant",
      message: `Starbucks accounts for 35% of your ${category.name.toLowerCase()} spending`,
      icon: "🏪",
      color: "#8B5CF6",
    },
    {
      title: "Weekend vs Weekday",
      message: "Weekend spending is 40% higher than weekdays in this category",
      icon: "📅",
      color: "#10B981",
    },
    {
      title: "Comparison Insight",
      message: `Your ${category.name.toLowerCase()} spending is 15% above Bangkok average`,
      icon: "📊",
      color: "#EF4444",
    },
  ];

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <motion.button
          onClick={onBack}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: category.color + "20" }}
          >
            {category.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {category.name} Explorer
            </h2>
            <p className="text-white/70">
              Deep dive into your spending patterns
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Spent",
            value: `฿${analytics.totalSpent.toLocaleString()}`,
            icon: "💰",
            color: category.color,
          },
          {
            label: "Transactions",
            value: analytics.transactionCount,
            icon: "📝",
            color: "#10B981",
          },
          {
            label: "Avg Amount",
            value: `฿${Math.round(analytics.avgTransaction).toLocaleString()}`,
            icon: "📊",
            color: "#8B5CF6",
          },
          {
            label: "Budget Used",
            value: `${analytics.budgetUsed.toFixed(1)}%`,
            icon: "🎯",
            color: analytics.budgetUsed > 100 ? "#EF4444" : "#F59E0B",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white/5 rounded-xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-white font-bold text-lg">{stat.value}</div>
            <div className="text-white/60 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-white/10 rounded-xl p-1 mb-6 max-w-md">
        {(["overview", "transactions", "insights"] as const).map((mode) => (
          <motion.button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
              viewMode === mode
                ? "bg-white/20 text-white"
                : "text-white/70 hover:text-white"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {viewMode === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Subcategory Breakdown */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Subcategory Breakdown
              </h3>
              <div className="space-y-3">
                {Object.entries(analytics.subcategories)
                  .sort(([, a], [, b]) => b.amount - a.amount)
                  .map(([subcategory, data], index) => {
                    const percentage =
                      (data.amount / analytics.totalSpent) * 100;
                    return (
                      <motion.div
                        key={subcategory}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedSubcategory(subcategory)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <div>
                            <div className="text-white font-medium">
                              {subcategory}
                            </div>
                            <div className="text-white/60 text-sm">
                              {data.count} transactions
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">
                            ฿{data.amount.toLocaleString()}
                          </div>
                          <div className="text-white/60 text-sm">
                            {percentage.toFixed(1)}%
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>

            {/* Top Merchants */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Top Merchants
              </h3>
              <div className="space-y-3">
                {Object.entries(analytics.merchants)
                  .sort(([, a], [, b]) => b.amount - a.amount)
                  .slice(0, 5)
                  .map(([merchant, data], index) => {
                    const percentage =
                      (data.amount / analytics.totalSpent) * 100;
                    return (
                      <motion.div
                        key={merchant}
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {merchant}
                            </div>
                            <div className="text-white/60 text-sm">
                              {data.count} visits
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">
                            ฿{data.amount.toLocaleString()}
                          </div>
                          <div className="text-white/60 text-sm">
                            {percentage.toFixed(1)}%
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === "transactions" && (
          <motion.div
            key="transactions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <select
                value={selectedSubcategory || ""}
                onChange={(e) => setSelectedSubcategory(e.target.value || null)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              >
                <option value="">All Subcategories</option>
                {Object.keys(analytics.subcategories).map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>

            {/* Transaction List */}
            <div className="space-y-3">
              {filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  className="bg-white/5 rounded-xl p-4 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                        style={{ backgroundColor: category.color + "20" }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {transaction.name}
                        </div>
                        <div className="text-white/60 text-sm">
                          {transaction.merchant}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-lg">
                        ฿{transaction.amount.toLocaleString()}
                      </div>
                      <div className="text-white/60 text-sm">
                        {transaction.date.toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-white/70">
                    <div className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {transaction.subcategory}
                    </div>
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-3 h-3" />
                      {transaction.paymentMethod}
                    </div>
                    {transaction.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {transaction.location}
                      </div>
                    )}
                  </div>

                  {transaction.tags && transaction.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {transaction.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {viewMode === "insights" && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* AI Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getInsights().map((insight, index) => (
                <motion.div
                  key={insight.title}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                      style={{ backgroundColor: insight.color + "20" }}
                    >
                      {insight.icon}
                    </div>
                    <h4 className="text-white font-bold">{insight.title}</h4>
                  </div>
                  <p className="text-white/80">{insight.message}</p>
                </motion.div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-6 border border-green-500/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-green-400" />
                Smart Recommendations
              </h3>
              <div className="space-y-3">
                <div className="text-white/80">
                  • Try cooking at home 2 days a week to save ฿960/month
                </div>
                <div className="text-white/80">
                  • Set a daily spending limit of ฿200 for this category
                </div>
                <div className="text-white/80">
                  • Consider bulk buying for frequently purchased items
                </div>
                <div className="text-white/80">
                  • Use loyalty programs at your favorite merchants
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
