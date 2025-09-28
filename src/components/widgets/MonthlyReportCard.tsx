import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Award,
  Target,
  Zap,
} from "lucide-react";

interface MonthlyStats {
  totalSpent: number;
  totalIncome: number;
  topCategory: {
    name: string;
    amount: number;
    percentage: number;
    icon: string;
  };
  cheapestDay: {
    date: string;
    amount: number;
  };
  mostExpensiveDay: {
    date: string;
    amount: number;
  };
  comparisonLastMonth: {
    spending: number;
    income: number;
    savings: number;
  };
  achievements: string[];
  streaks: {
    budgetCompliance: number;
    savingsGoal: number;
    noSpendDays: number;
  };
  predictions: {
    monthEndSpending: number;
    yearEndSavings: number;
    nextMilestone: {
      name: string;
      progress: number;
      target: number;
    };
  };
}

interface MonthlyReportCardProps {
  stats: MonthlyStats;
  viewMode?: "play" | "clarity";
  className?: string;
}

export function MonthlyReportCard({
  stats,
  viewMode = "play",
  className = "",
}: MonthlyReportCardProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [showFullReport, setShowFullReport] = useState(false);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const getComparisonColor = (value: number) => {
    if (value > 0) return "text-green-400";
    if (value < 0) return "text-red-400";
    return "text-gray-400";
  };

  const getComparisonIcon = (value: number) => {
    if (value > 0) return <TrendingUp size={16} />;
    if (value < 0) return <TrendingDown size={16} />;
    return <span>→</span>;
  };

  const reportCards = [
    {
      id: "spending-hero",
      title: "Spending Champion",
      icon: "🏆",
      content: `This month you spent most on ${stats.topCategory.icon} ${stats.topCategory.name} (${stats.topCategory.percentage}%)`,
      highlight: formatCurrency(stats.topCategory.amount),
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "cheapest-day",
      title: "Zen Master Day",
      icon: "🧘",
      content: `Your cheapest day was ${formatDate(stats.cheapestDay.date)}`,
      highlight: formatCurrency(stats.cheapestDay.amount),
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "expensive-day",
      title: "Big Spender Alert",
      icon: "💸",
      content: `Your biggest spending day was ${formatDate(stats.mostExpensiveDay.date)}`,
      highlight: formatCurrency(stats.mostExpensiveDay.amount),
      color: "from-red-500 to-orange-500",
    },
    {
      id: "comparison",
      title: "Month-over-Month",
      icon: "📊",
      content: `Compared to last month, you ${stats.comparisonLastMonth.spending > 0 ? "increased" : "reduced"} spending by ${Math.abs(stats.comparisonLastMonth.spending)}%`,
      highlight: `${stats.comparisonLastMonth.spending > 0 ? "+" : ""}${stats.comparisonLastMonth.spending}%`,
      color:
        stats.comparisonLastMonth.spending > 0
          ? "from-red-500 to-pink-500"
          : "from-green-500 to-blue-500",
    },
  ];

  return (
    <div className={`${className}`}>
      <div
        className={`rounded-2xl p-6 border ${
          viewMode === "play"
            ? "bg-white/10 backdrop-blur-sm border-white/20"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="text-3xl"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🎉
            </motion.div>
            <div>
              <h3
                className={`text-2xl font-bold ${
                  viewMode === "play" ? "text-white" : "text-gray-900"
                }`}
              >
                Your Money Story
              </h3>
              <p
                className={`text-sm ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                Like Spotify Wrapped, but for your finances!
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowFullReport(!showFullReport)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
              viewMode === "play"
                ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            <Calendar size={16} />
            {showFullReport ? "Hide Details" : "Full Report"}
          </button>
        </div>

        {/* Main Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {reportCards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`relative p-6 rounded-xl cursor-pointer overflow-hidden ${
                activeCard === card.id ? "ring-2 ring-white/50" : ""
              }`}
              style={{
                background:
                  viewMode === "play"
                    ? `linear-gradient(135deg, ${card.color.split(" ")[1]} 0%, ${card.color.split(" ")[3]} 100%)`
                    : "white",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() =>
                setActiveCard(activeCard === card.id ? null : card.id)
              }
            >
              {/* Background Pattern */}
              {viewMode === "play" && (
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 text-6xl transform rotate-12 translate-x-4 -translate-y-2">
                    {card.icon}
                  </div>
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{card.icon}</div>
                  <h4 className="text-lg font-bold text-white">{card.title}</h4>
                </div>

                <p className="text-white/90 mb-3 text-sm leading-relaxed">
                  {card.content}
                </p>

                <div className="text-2xl font-bold text-white">
                  {card.highlight}
                </div>
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-white/10 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Achievements & Streaks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Achievements */}
          <motion.div
            className={`p-4 rounded-xl border ${
              viewMode === "play"
                ? "bg-white/5 border-white/10"
                : "bg-gray-50 border-gray-100"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Award size={20} className="text-yellow-400" />
              <h4
                className={`font-bold ${
                  viewMode === "play" ? "text-white" : "text-gray-900"
                }`}
              >
                New Achievements
              </h4>
            </div>

            <div className="space-y-2">
              {stats.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="text-lg">🏆</div>
                  <span
                    className={`text-sm ${
                      viewMode === "play" ? "text-white/80" : "text-gray-700"
                    }`}
                  >
                    {achievement}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Streaks */}
          <motion.div
            className={`p-4 rounded-xl border ${
              viewMode === "play"
                ? "bg-white/5 border-white/10"
                : "bg-gray-50 border-gray-100"
            }`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap size={20} className="text-orange-400" />
              <h4
                className={`font-bold ${
                  viewMode === "play" ? "text-white" : "text-gray-900"
                }`}
              >
                Current Streaks
              </h4>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm ${
                    viewMode === "play" ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  🎯 Budget Compliance
                </span>
                <span className="font-bold text-green-400">
                  {stats.streaks.budgetCompliance} days
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`text-sm ${
                    viewMode === "play" ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  💰 Savings Goal
                </span>
                <span className="font-bold text-blue-400">
                  {stats.streaks.savingsGoal} days
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`text-sm ${
                    viewMode === "play" ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  🧘 No-Spend Days
                </span>
                <span className="font-bold text-purple-400">
                  {stats.streaks.noSpendDays} days
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Predictions */}
        <motion.div
          className={`p-4 rounded-xl border ${
            viewMode === "play"
              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30"
              : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Target size={20} className="text-blue-400" />
            <h4
              className={`font-bold ${
                viewMode === "play" ? "text-white" : "text-gray-900"
              }`}
            >
              Crystal Ball Predictions
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-1">🔮</div>
              <div className="text-lg font-bold text-blue-400">
                {formatCurrency(stats.predictions.monthEndSpending)}
              </div>
              <div
                className={`text-xs ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                Predicted month-end spending
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl mb-1">💎</div>
              <div className="text-lg font-bold text-green-400">
                {formatCurrency(stats.predictions.yearEndSavings)}
              </div>
              <div
                className={`text-xs ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                Year-end savings projection
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-lg font-bold text-purple-400">
                {stats.predictions.nextMilestone.progress}%
              </div>
              <div
                className={`text-xs ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                Progress to {stats.predictions.nextMilestone.name}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Full Report Details */}
        <AnimatePresence>
          {showFullReport && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-white/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Detailed Comparisons */}
                <div>
                  <h5
                    className={`font-bold mb-3 ${
                      viewMode === "play" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    📈 Month-over-Month Analysis
                  </h5>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-sm ${
                          viewMode === "play"
                            ? "text-white/80"
                            : "text-gray-700"
                        }`}
                      >
                        Spending Change
                      </span>
                      <div className="flex items-center gap-1">
                        {getComparisonIcon(stats.comparisonLastMonth.spending)}
                        <span
                          className={getComparisonColor(
                            stats.comparisonLastMonth.spending,
                          )}
                        >
                          {stats.comparisonLastMonth.spending > 0 ? "+" : ""}
                          {stats.comparisonLastMonth.spending}%
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span
                        className={`text-sm ${
                          viewMode === "play"
                            ? "text-white/80"
                            : "text-gray-700"
                        }`}
                      >
                        Income Change
                      </span>
                      <div className="flex items-center gap-1">
                        {getComparisonIcon(stats.comparisonLastMonth.income)}
                        <span
                          className={getComparisonColor(
                            stats.comparisonLastMonth.income,
                          )}
                        >
                          {stats.comparisonLastMonth.income > 0 ? "+" : ""}
                          {stats.comparisonLastMonth.income}%
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span
                        className={`text-sm ${
                          viewMode === "play"
                            ? "text-white/80"
                            : "text-gray-700"
                        }`}
                      >
                        Savings Change
                      </span>
                      <div className="flex items-center gap-1">
                        {getComparisonIcon(stats.comparisonLastMonth.savings)}
                        <span
                          className={getComparisonColor(
                            stats.comparisonLastMonth.savings,
                          )}
                        >
                          {stats.comparisonLastMonth.savings > 0 ? "+" : ""}
                          {stats.comparisonLastMonth.savings}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fun Facts */}
                <div>
                  <h5
                    className={`font-bold mb-3 ${
                      viewMode === "play" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    🎉 Fun Money Facts
                  </h5>

                  <div className="space-y-2">
                    <div
                      className={`text-sm ${
                        viewMode === "play" ? "text-white/80" : "text-gray-700"
                      }`}
                    >
                      💡 You saved{" "}
                      {formatCurrency(stats.totalIncome - stats.totalSpent)}{" "}
                      this month
                    </div>
                    <div
                      className={`text-sm ${
                        viewMode === "play" ? "text-white/80" : "text-gray-700"
                      }`}
                    >
                      🎯 That's{" "}
                      {(
                        ((stats.totalIncome - stats.totalSpent) /
                          stats.totalIncome) *
                        100
                      ).toFixed(1)}
                      % of your income
                    </div>
                    <div
                      className={`text-sm ${
                        viewMode === "play" ? "text-white/80" : "text-gray-700"
                      }`}
                    >
                      🚀 At this rate, you'll save{" "}
                      {formatCurrency(
                        (stats.totalIncome - stats.totalSpent) * 12,
                      )}{" "}
                      this year
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
