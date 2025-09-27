import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpendingCategory {
  id: string;
  name: string;
  amount: number;
  budget: number;
  color: string;
  icon: string;
  trend: "up" | "down" | "stable";
  trendPercent: number;
  transactions: number;
}

interface SpendingAnalyzerProps {
  categories: SpendingCategory[];
  totalSpent: number;
  totalBudget: number;
  className?: string;
}

export function SpendingAnalyzer({
  categories,
  totalSpent,
  totalBudget,
  className = "",
}: SpendingAnalyzerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"bubbles" | "bars">("bubbles");

  const formatCurrency = (amount: number) => {
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const getUsagePercentage = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "📈";
      case "down":
        return "📉";
      default:
        return "➡️";
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            <span className="mr-3">💸</span>
            Spending Universe
          </h2>
          <p className="text-white/70">
            Each bubble represents a spending category — bigger bubbles = more
            spending!
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("bubbles")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === "bubbles"
                ? "bg-white text-black"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            🫧 Bubbles
          </button>
          <button
            onClick={() => setViewMode("bars")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === "bars"
                ? "bg-white text-black"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            📊 Bars
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "bubbles" ? (
          <motion.div
            key="bubbles"
            className="relative h-[600px] bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {categories.map((category, index) => {
              const size = Math.max(
                60,
                (category.amount /
                  Math.max(...categories.map((c) => c.amount))) *
                  200,
              );
              const x = 20 + (index % 4) * 25;
              const y = 20 + Math.floor(index / 4) * 35;

              return (
                <motion.div
                  key={category.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.id ? null : category.id,
                    )
                  }
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="rounded-full flex flex-col items-center justify-center text-white font-bold shadow-2xl border-4 border-white/30"
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: category.color,
                      boxShadow: `0 0 30px ${category.color}60`,
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 30px ${category.color}60`,
                        `0 0 50px ${category.color}80`,
                        `0 0 30px ${category.color}60`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="text-xs text-center px-2">
                      <div className="font-bold">
                        {formatCurrency(category.amount)}
                      </div>
                      <div className="opacity-80 text-xs">{category.name}</div>
                    </div>
                  </motion.div>

                  {/* Category Detail Panel */}
                  <AnimatePresence>
                    {selectedCategory === category.id && (
                      <motion.div
                        className="absolute top-full mt-4 bg-black/90 backdrop-blur-sm rounded-xl p-4 border border-white/20 min-w-64 z-30"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-2xl">{category.icon}</div>
                          <div>
                            <h3 className="text-white font-bold">
                              {category.name}
                            </h3>
                            <p className="text-white/70 text-sm">
                              {category.transactions} transactions
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Spent:</span>
                            <span className="text-white font-bold">
                              {formatCurrency(category.amount)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Budget:</span>
                            <span className="text-blue-400 font-bold">
                              {formatCurrency(category.budget)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Usage:</span>
                            <span
                              className={`font-bold ${
                                getUsagePercentage(
                                  category.amount,
                                  category.budget,
                                ) > 90
                                  ? "text-red-400"
                                  : getUsagePercentage(
                                        category.amount,
                                        category.budget,
                                      ) > 70
                                    ? "text-yellow-400"
                                    : "text-green-400"
                              }`}
                            >
                              {getUsagePercentage(
                                category.amount,
                                category.budget,
                              ).toFixed(0)}
                              %
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Trend:</span>
                            <span
                              className={`font-bold flex items-center gap-1 ${
                                category.trend === "up"
                                  ? "text-red-400"
                                  : category.trend === "down"
                                    ? "text-green-400"
                                    : "text-gray-400"
                              }`}
                            >
                              {getTrendIcon(category.trend)}{" "}
                              {category.trendPercent}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="bars"
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {categories.map((category, index) => {
              const usagePercent = getUsagePercentage(
                category.amount,
                category.budget,
              );

              return (
                <motion.div
                  key={category.id}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{category.icon}</div>
                      <div>
                        <h3 className="text-white font-bold">
                          {category.name}
                        </h3>
                        <p className="text-white/70 text-sm">
                          {category.transactions} transactions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">
                        {formatCurrency(category.amount)}
                      </div>
                      <div className="text-white/70 text-sm">
                        of {formatCurrency(category.budget)}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <motion.div
                        className={`h-3 rounded-full ${
                          usagePercent > 90
                            ? "bg-red-500"
                            : usagePercent > 70
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${usagePercent}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-white/70">
                      <span>{usagePercent.toFixed(0)}% used</span>
                      <span
                        className={`flex items-center gap-1 ${
                          category.trend === "up"
                            ? "text-red-400"
                            : category.trend === "down"
                              ? "text-green-400"
                              : "text-gray-400"
                        }`}
                      >
                        {getTrendIcon(category.trend)} {category.trendPercent}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
