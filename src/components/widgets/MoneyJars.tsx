import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MoneyJar {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  color: string;
  icon: string;
  priority: "high" | "medium" | "low";
  category: "necessity" | "savings" | "fun" | "investment";
  monthlyContribution: number;
  estimatedCompletion?: string;
}

interface MoneyJarsProps {
  jars: MoneyJar[];
  viewMode?: "play" | "clarity";
  className?: string;
}

export function MoneyJars({
  jars,
  viewMode = "play",
  className = "",
}: MoneyJarsProps) {
  const [selectedJar, setSelectedJar] = useState<string | null>(null);
  const [showAddMoney, setShowAddMoney] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const getJarHeight = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-400";
      case "medium":
        return "border-yellow-400";
      case "low":
        return "border-green-400";
      default:
        return "border-gray-400";
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "necessity":
        return "🏠";
      case "savings":
        return "💰";
      case "fun":
        return "🎉";
      case "investment":
        return "📈";
      default:
        return "💰";
    }
  };

  const addMoneyToJar = (jarId: string, amount: number) => {
    // In a real app, this would update the jar amount
    console.log(`Adding $${amount} to jar ${jarId}`);
    setShowAddMoney(null);
  };

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
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🏺
            </motion.div>
            <div>
              <h3
                className={`text-xl font-bold ${
                  viewMode === "play" ? "text-white" : "text-gray-900"
                }`}
              >
                Money Jars
              </h3>
              <p
                className={`text-sm ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                Visual savings goals tracker
              </p>
            </div>
          </div>

          <div className="text-right">
            <div
              className={`text-lg font-bold ${
                viewMode === "play" ? "text-white" : "text-gray-900"
              }`}
            >
              {jars.length} Jars
            </div>
            <div
              className={`text-sm ${
                viewMode === "play" ? "text-white/70" : "text-gray-600"
              }`}
            >
              ${jars.reduce((sum, jar) => sum + jar.monthlyContribution, 0)}
              /month
            </div>
          </div>
        </div>

        {/* Jars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mb-6 px-2">
          {jars.map((jar, index) => {
            const fillPercentage = getJarHeight(
              jar.currentAmount,
              jar.targetAmount,
            );
            const isComplete = jar.currentAmount >= jar.targetAmount;

            return (
              <motion.div
                key={jar.id}
                className="relative cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() =>
                  setSelectedJar(selectedJar === jar.id ? null : jar.id)
                }
              >
                {/* Jar Container */}
                <div className="relative">
                  {/* Jar Shape */}
                  <div
                    className={`relative w-24 h-32 mx-auto rounded-b-2xl border-4 ${getPriorityColor(jar.priority)} overflow-hidden ${
                      viewMode === "play"
                        ? "bg-white/10 backdrop-blur-sm"
                        : "bg-gray-50"
                    }`}
                  >
                    {/* Jar Neck */}
                    <div
                      className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-4 rounded-t-lg border-4 ${getPriorityColor(jar.priority)} ${
                        viewMode === "play"
                          ? "bg-white/10 backdrop-blur-sm"
                          : "bg-gray-50"
                      }`}
                    />

                    {/* Money Fill */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 rounded-b-xl"
                      style={{
                        backgroundColor: jar.color,
                        opacity: 0.8,
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${fillPercentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    >
                      {/* Animated coins */}
                      {fillPercentage > 20 && (
                        <motion.div
                          className="absolute top-2 left-1/2 transform -translate-x-1/2 text-yellow-300"
                          animate={{
                            y: [0, -5, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🪙
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Completion Sparkles */}
                    {isComplete && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 360],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="text-2xl">✨</span>
                      </motion.div>
                    )}

                    {/* Progress Percentage */}
                    <div className="absolute top-1 right-1 text-xs font-bold text-white bg-black/50 rounded px-1">
                      {Math.round(fillPercentage)}%
                    </div>
                  </div>

                  {/* Jar Label */}
                  <div className="text-center mt-3">
                    <div className="text-lg mb-1">{jar.icon}</div>
                    <div
                      className={`text-sm font-semibold ${
                        viewMode === "play" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {jar.name}
                    </div>
                    <div
                      className={`text-xs ${
                        viewMode === "play" ? "text-white/70" : "text-gray-600"
                      }`}
                    >
                      {formatCurrency(jar.currentAmount)} /{" "}
                      {formatCurrency(jar.targetAmount)}
                    </div>
                  </div>

                  {/* Add Money Button */}
                  <motion.button
                    className={`absolute -top-2 -right-2 w-8 h-8 rounded-full text-sm font-bold transition-colors ${
                      viewMode === "play"
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-green-100 text-green-600 hover:bg-green-200"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAddMoney(jar.id);
                    }}
                  >
                    +
                  </motion.button>

                  {/* Priority Indicator */}
                  <div
                    className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full ${
                      jar.priority === "high"
                        ? "bg-red-400"
                        : jar.priority === "medium"
                          ? "bg-yellow-400"
                          : "bg-green-400"
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Jar Details */}
        <AnimatePresence>
          {selectedJar && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10 pt-6"
            >
              {(() => {
                const jar = jars.find((j) => j.id === selectedJar);
                if (!jar) return null;

                return (
                  <div
                    className={`p-4 rounded-xl border ${
                      viewMode === "play"
                        ? "bg-white/5 border-white/10"
                        : "bg-gray-50 border-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{jar.icon}</div>
                      <div>
                        <h4
                          className={`text-lg font-bold ${
                            viewMode === "play" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {jar.name}
                        </h4>
                        <p
                          className={`text-sm ${
                            viewMode === "play"
                              ? "text-white/70"
                              : "text-gray-600"
                          }`}
                        >
                          {getCategoryEmoji(jar.category)}{" "}
                          {jar.category.charAt(0).toUpperCase() +
                            jar.category.slice(1)}{" "}
                          Goal
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div
                          className={`text-sm ${
                            viewMode === "play"
                              ? "text-white/70"
                              : "text-gray-600"
                          }`}
                        >
                          Current Amount
                        </div>
                        <div
                          className={`text-lg font-bold ${
                            viewMode === "play" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {formatCurrency(jar.currentAmount)}
                        </div>
                      </div>

                      <div>
                        <div
                          className={`text-sm ${
                            viewMode === "play"
                              ? "text-white/70"
                              : "text-gray-600"
                          }`}
                        >
                          Target Amount
                        </div>
                        <div
                          className={`text-lg font-bold ${
                            viewMode === "play" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {formatCurrency(jar.targetAmount)}
                        </div>
                      </div>

                      <div>
                        <div
                          className={`text-sm ${
                            viewMode === "play"
                              ? "text-white/70"
                              : "text-gray-600"
                          }`}
                        >
                          Monthly Contribution
                        </div>
                        <div className={`text-lg font-bold text-blue-400`}>
                          {formatCurrency(jar.monthlyContribution)}
                        </div>
                      </div>

                      <div>
                        <div
                          className={`text-sm ${
                            viewMode === "play"
                              ? "text-white/70"
                              : "text-gray-600"
                          }`}
                        >
                          Completion
                        </div>
                        <div
                          className={`text-lg font-bold ${
                            jar.estimatedCompletion
                              ? "text-green-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {jar.estimatedCompletion || "Ongoing"}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span
                          className={`${
                            viewMode === "play"
                              ? "text-white/80"
                              : "text-gray-700"
                          }`}
                        >
                          Progress:{" "}
                          {Math.round(
                            getJarHeight(jar.currentAmount, jar.targetAmount),
                          )}
                          %
                        </span>
                        <span
                          className={`${
                            viewMode === "play"
                              ? "text-white/80"
                              : "text-gray-700"
                          }`}
                        >
                          Remaining:{" "}
                          {formatCurrency(jar.targetAmount - jar.currentAmount)}
                        </span>
                      </div>
                      <div
                        className={`w-full h-3 rounded-full ${
                          viewMode === "play" ? "bg-white/20" : "bg-gray-200"
                        }`}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: jar.color }}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${getJarHeight(jar.currentAmount, jar.targetAmount)}%`,
                          }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Money Modal */}
        <AnimatePresence>
          {showAddMoney && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddMoney(null)}
            >
              <motion.div
                className={`max-w-sm w-full rounded-2xl p-6 border ${
                  viewMode === "play"
                    ? "bg-white/10 backdrop-blur-md border-white/20"
                    : "bg-white border-gray-200"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const jar = jars.find((j) => j.id === showAddMoney);
                  if (!jar) return null;

                  return (
                    <>
                      <div className="text-center mb-6">
                        <div className="text-4xl mb-2">{jar.icon}</div>
                        <h3
                          className={`text-xl font-bold mb-2 ${
                            viewMode === "play" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Add Money to {jar.name}
                        </h3>
                        <p
                          className={`text-sm ${
                            viewMode === "play"
                              ? "text-white/70"
                              : "text-gray-600"
                          }`}
                        >
                          Current: {formatCurrency(jar.currentAmount)} /{" "}
                          {formatCurrency(jar.targetAmount)}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {[25, 50, 100, 200].map((amount) => (
                          <button
                            key={amount}
                            onClick={() => addMoneyToJar(jar.id, amount)}
                            className={`w-full py-3 rounded-xl font-medium transition-colors ${
                              viewMode === "play"
                                ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                                : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200"
                            }`}
                          >
                            Add ${amount}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setShowAddMoney(null)}
                        className="w-full mt-4 py-3 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-1">💰</div>
              <div
                className={`text-lg font-bold ${
                  viewMode === "play" ? "text-white" : "text-gray-900"
                }`}
              >
                {formatCurrency(
                  jars.reduce((sum, jar) => sum + jar.currentAmount, 0),
                )}
              </div>
              <div
                className={`text-sm ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                Total Saved
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl mb-1">🎯</div>
              <div
                className={`text-lg font-bold ${
                  viewMode === "play" ? "text-white" : "text-gray-900"
                }`}
              >
                {formatCurrency(
                  jars.reduce((sum, jar) => sum + jar.targetAmount, 0),
                )}
              </div>
              <div
                className={`text-sm ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                Total Goals
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl mb-1">📈</div>
              <div className={`text-lg font-bold text-blue-400`}>
                {Math.round(
                  (jars.reduce((sum, jar) => sum + jar.currentAmount, 0) /
                    jars.reduce((sum, jar) => sum + jar.targetAmount, 0)) *
                    100,
                )}
                %
              </div>
              <div
                className={`text-sm ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                Overall Progress
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
