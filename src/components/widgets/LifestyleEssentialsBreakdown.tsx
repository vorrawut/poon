import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Target,
  Lightbulb,
} from "lucide-react";

interface SpendingItem {
  id: string;
  name: string;
  amount: number;
  category: string;
  type: "essential" | "lifestyle";
  date: Date;
  merchant: string;
}

interface LifestyleEssentialsBreakdownProps {
  spendingData: SpendingItem[];
  monthlyIncome: number;
  className?: string;
}

export function LifestyleEssentialsBreakdown({
  spendingData,
  monthlyIncome,
  className = "",
}: LifestyleEssentialsBreakdownProps) {
  const [selectedType, setSelectedType] = useState<
    "essential" | "lifestyle" | "both"
  >("both");
  const [showRecommendations, setShowRecommendations] = useState(false);

  // Calculate totals
  const totals = useMemo(() => {
    const essential = spendingData
      .filter((item) => item.type === "essential")
      .reduce((sum, item) => sum + item.amount, 0);

    const lifestyle = spendingData
      .filter((item) => item.type === "lifestyle")
      .reduce((sum, item) => sum + item.amount, 0);

    const total = essential + lifestyle;

    return {
      essential,
      lifestyle,
      total,
      essentialPercent: (essential / monthlyIncome) * 100,
      lifestylePercent: (lifestyle / monthlyIncome) * 100,
      totalPercent: (total / monthlyIncome) * 100,
    };
  }, [spendingData, monthlyIncome]);

  // Categorize spending
  const categorizedSpending = useMemo(() => {
    const categories = spendingData.reduce(
      (acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = {
            name: item.category,
            essential: 0,
            lifestyle: 0,
            total: 0,
            items: [],
          };
        }

        acc[item.category][item.type] += item.amount;
        acc[item.category].total += item.amount;
        acc[item.category].items.push(item);

        return acc;
      },
      {} as Record<string, any>,
    );

    return Object.values(categories).sort(
      (a: any, b: any) => b.total - a.total,
    );
  }, [spendingData]);

  // Health assessment
  const getHealthStatus = () => {
    if (totals.essentialPercent > 70)
      return { status: "critical", message: "Essential spending is too high" };
    if (totals.lifestylePercent > 30)
      return {
        status: "warning",
        message: "Lifestyle spending exceeds recommended 30%",
      };
    if (totals.totalPercent > 90)
      return { status: "warning", message: "Total spending is very high" };
    return { status: "healthy", message: "Spending balance looks good" };
  };

  const healthStatus = getHealthStatus();

  // Recommendations
  const getRecommendations = () => {
    const recommendations = [];

    if (totals.lifestylePercent > 30) {
      const excess = ((totals.lifestylePercent - 30) * monthlyIncome) / 100;
      recommendations.push({
        type: "reduce",
        title: "Reduce Lifestyle Spending",
        message: `Cut lifestyle spending by ฿${excess.toLocaleString()} to reach the healthy 30% target`,
        impact: `Save ฿${(excess * 12).toLocaleString()} per year`,
        icon: "🎯",
        color: "#F59E0B",
      });
    }

    if (totals.essentialPercent > 60) {
      recommendations.push({
        type: "optimize",
        title: "Optimize Essential Costs",
        message:
          "Essential spending is high. Look for ways to reduce utilities, subscriptions, or negotiate better rates",
        impact: "Could save 10-15% on essentials",
        icon: "🏠",
        color: "#10B981",
      });
    }

    if (totals.totalPercent < 70) {
      const surplus = ((70 - totals.totalPercent) * monthlyIncome) / 100;
      recommendations.push({
        type: "invest",
        title: "Investment Opportunity",
        message: `You have ฿${surplus.toLocaleString()} monthly surplus. Consider investing for your future`,
        impact: "Build wealth for long-term goals",
        icon: "💰",
        color: "#8B5CF6",
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Lifestyle vs Essentials
          </h3>
          <p className="text-white/70">Balance your needs and wants</p>
        </div>

        <motion.button
          onClick={() => setShowRecommendations(!showRecommendations)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Lightbulb className="w-4 h-4" />
          {showRecommendations ? "Hide Tips" : "Get Tips"}
        </motion.button>
      </div>

      {/* Main Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Balance Visualization */}
        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-6 border border-white/10">
          <h4 className="text-lg font-bold text-white mb-4 text-center">
            Spending Balance
          </h4>

          {/* Dual Progress Bars */}
          <div className="space-y-6">
            {/* Essential Spending */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">Essentials</span>
                </div>
                <span className="text-white/80">
                  ฿{totals.essential.toLocaleString()} (
                  {totals.essentialPercent.toFixed(1)}%)
                </span>
              </div>

              <div className="relative h-8 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(totals.essentialPercent, 100)}%`,
                  }}
                  transition={{ duration: 1, delay: 0.2 }}
                />

                {/* Target Line for 50% */}
                <div className="absolute left-1/2 top-0 w-px h-full bg-white/40" />
                <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 text-white/60 text-xs">
                  Target: 50%
                </div>
              </div>
            </div>

            {/* Lifestyle Spending */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                  <span className="text-white font-medium">Lifestyle</span>
                </div>
                <span className="text-white/80">
                  ฿{totals.lifestyle.toLocaleString()} (
                  {totals.lifestylePercent.toFixed(1)}%)
                </span>
              </div>

              <div className="relative h-8 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(totals.lifestylePercent, 100)}%`,
                  }}
                  transition={{ duration: 1, delay: 0.4 }}
                />

                {/* Target Line for 30% */}
                <div className="absolute left-[30%] top-0 w-px h-full bg-white/40" />
                <div className="absolute left-[30%] -top-6 transform -translate-x-1/2 text-white/60 text-xs">
                  Target: 30%
                </div>
              </div>
            </div>

            {/* Total Spending */}
            <div className="pt-4 border-t border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold">Total Spending</span>
                <span className="text-white">
                  ฿{totals.total.toLocaleString()} (
                  {totals.totalPercent.toFixed(1)}%)
                </span>
              </div>

              <div className="relative h-6 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(totals.totalPercent, 100)}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
            </div>
          </div>

          {/* Health Status */}
          <motion.div
            className={`mt-6 p-4 rounded-xl border ${
              healthStatus.status === "healthy"
                ? "bg-green-500/10 border-green-500/30"
                : healthStatus.status === "warning"
                  ? "bg-yellow-500/10 border-yellow-500/30"
                  : "bg-red-500/10 border-red-500/30"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              {healthStatus.status === "healthy" && (
                <Target className="w-5 h-5 text-green-400" />
              )}
              {healthStatus.status === "warning" && (
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
              )}
              {healthStatus.status === "critical" && (
                <AlertTriangle className="w-5 h-5 text-red-400" />
              )}

              <span
                className={`font-medium ${
                  healthStatus.status === "healthy"
                    ? "text-green-400"
                    : healthStatus.status === "warning"
                      ? "text-yellow-400"
                      : "text-red-400"
                }`}
              >
                {healthStatus.status.toUpperCase()}
              </span>
            </div>
            <div className="text-white/80 text-sm mt-1">
              {healthStatus.message}
            </div>
          </motion.div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-white">Category Breakdown</h4>

            <div className="flex bg-white/10 rounded-lg p-1">
              {(["both", "essential", "lifestyle"] as const).map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectedType === type
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {categorizedSpending.map((category: any, index) => {
              const showCategory =
                selectedType === "both" ||
                (selectedType === "essential" && category.essential > 0) ||
                (selectedType === "lifestyle" && category.lifestyle > 0);

              if (!showCategory) return null;

              return (
                <motion.div
                  key={category.name}
                  className="bg-white/5 rounded-lg p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">
                      {category.name}
                    </span>
                    <span className="text-white/80">
                      ฿{category.total.toLocaleString()}
                    </span>
                  </div>

                  {/* Category Split */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {category.essential > 0 && (
                      <div className="text-center">
                        <div className="text-blue-400 text-sm font-medium">
                          ฿{category.essential.toLocaleString()}
                        </div>
                        <div className="text-white/60 text-xs">Essential</div>
                      </div>
                    )}
                    {category.lifestyle > 0 && (
                      <div className="text-center">
                        <div className="text-pink-400 text-sm font-medium">
                          ฿{category.lifestyle.toLocaleString()}
                        </div>
                        <div className="text-white/60 text-xs">Lifestyle</div>
                      </div>
                    )}
                  </div>

                  {/* Visual Split */}
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                    {category.essential > 0 && (
                      <div
                        className="bg-blue-500 h-full"
                        style={{
                          width: `${(category.essential / category.total) * 100}%`,
                        }}
                      />
                    )}
                    {category.lifestyle > 0 && (
                      <div
                        className="bg-pink-500 h-full"
                        style={{
                          width: `${(category.lifestyle / category.total) * 100}%`,
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <AnimatePresence>
        {showRecommendations && recommendations.length > 0 && (
          <motion.div
            className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              Smart Recommendations
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 rounded-xl p-4 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{rec.icon}</div>
                    <div className="text-white font-bold text-sm">
                      {rec.title}
                    </div>
                  </div>

                  <div className="text-white/80 text-sm mb-3">
                    {rec.message}
                  </div>

                  <div
                    className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: rec.color + "20",
                      color: rec.color,
                    }}
                  >
                    {rec.impact}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 50/30/20 Rule Explanation */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <h5 className="text-white font-bold mb-2">
                💡 The 50/30/20 Rule
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-blue-400 font-bold text-lg">50%</div>
                  <div className="text-white/80">Essentials</div>
                  <div className="text-white/60 text-xs">
                    Rent, utilities, groceries, insurance
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-pink-400 font-bold text-lg">30%</div>
                  <div className="text-white/80">Lifestyle</div>
                  <div className="text-white/60 text-xs">
                    Entertainment, dining, hobbies
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-bold text-lg">20%</div>
                  <div className="text-white/80">Savings & Investments</div>
                  <div className="text-white/60 text-xs">
                    Emergency fund, retirement, goals
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Monthly Income",
            value: `฿${monthlyIncome.toLocaleString()}`,
            icon: "💰",
            color: "#10B981",
          },
          {
            label: "Remaining",
            value: `฿${(monthlyIncome - totals.total).toLocaleString()}`,
            icon: "💎",
            color: "#8B5CF6",
          },
          {
            label: "Essential Ratio",
            value: `${totals.essentialPercent.toFixed(1)}%`,
            icon: "🏠",
            color: "#3B82F6",
          },
          {
            label: "Lifestyle Ratio",
            value: `${totals.lifestylePercent.toFixed(1)}%`,
            icon: "✨",
            color: "#EC4899",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-white font-bold text-lg">{stat.value}</div>
            <div className="text-white/60 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
