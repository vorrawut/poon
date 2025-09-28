import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpendingCategory {
  id: string;
  name: string;
  amount: number;
  budget: number;
  color: string;
  icon: string;
  percentage: number;
  trend: "up" | "down" | "stable";
  trendPercent: number;
}

interface SpendingWheelProps {
  categories: SpendingCategory[];
  totalSpent: number;
  totalBudget: number;
  viewMode?: "play" | "clarity";
  className?: string;
}

export function SpendingWheel({
  categories,
  totalSpent,
  totalBudget,
  viewMode = "play",
  className = "",
}: SpendingWheelProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const radius = 120;
  const centerX = 150;
  const centerY = 150;
  const strokeWidth = 40;

  // Calculate angles for each category
  let currentAngle = 0;
  const categoryArcs = categories.map((category) => {
    const angle = (category.percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    // Calculate arc path
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    // Calculate label position
    const labelAngle = (startAngle + endAngle) / 2;
    const labelAngleRad = (labelAngle * Math.PI) / 180;
    const labelRadius = radius * 0.7;
    const labelX = centerX + labelRadius * Math.cos(labelAngleRad);
    const labelY = centerY + labelRadius * Math.sin(labelAngleRad);

    return {
      ...category,
      startAngle,
      endAngle,
      angle,
      pathData,
      labelX,
      labelY,
    };
  });

  const spinWheel = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 2000);
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
              className="text-3xl cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 15 }}
              onClick={spinWheel}
            >
              🎡
            </motion.div>
            <div>
              <h3
                className={`text-xl font-bold ${
                  viewMode === "play" ? "text-white" : "text-gray-900"
                }`}
              >
                Spending Wheel
              </h3>
              <p
                className={`text-sm ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                Interactive category breakdown
              </p>
            </div>
          </div>

          <button
            onClick={spinWheel}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              viewMode === "play"
                ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            🎲 Spin Wheel
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Wheel Visualization */}
          <div className="relative">
            <motion.svg
              width="300"
              height="300"
              viewBox="0 0 300 300"
              className="drop-shadow-lg"
              animate={isSpinning ? { rotate: 360 } : {}}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              {/* Wheel segments */}
              {categoryArcs.map((category, index) => (
                <motion.g key={category.id}>
                  <motion.path
                    d={category.pathData}
                    fill={category.color}
                    stroke={viewMode === "play" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}
                    strokeWidth="2"
                    className="cursor-pointer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      scale: 1.05,
                      filter: "brightness(1.2)"
                    }}
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )}
                  />
                  
                  {/* Category icon */}
                  <text
                    x={category.labelX}
                    y={category.labelY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="20"
                    className="pointer-events-none"
                  >
                    {category.icon}
                  </text>
                </motion.g>
              ))}

              {/* Center circle */}
              <motion.circle
                cx={centerX}
                cy={centerY}
                r="50"
                fill={viewMode === "play" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}
                stroke={viewMode === "play" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"}
                strokeWidth="2"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Center text */}
              <text
                x={centerX}
                y={centerY - 10}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="16"
                fontWeight="bold"
                fill={viewMode === "play" ? "white" : "black"}
              >
                {formatCurrency(totalSpent)}
              </text>
              <text
                x={centerX}
                y={centerY + 10}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="12"
                fill={viewMode === "play" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"}
              >
                Total Spent
              </text>
            </motion.svg>

            {/* Spinning indicator */}
            {isSpinning && (
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
                animate={{ 
                  scale: [1, 1.5, 1],
                  rotate: [0, 360]
                }}
                transition={{ duration: 0.5, repeat: 4 }}
              >
                ✨
              </motion.div>
            )}
          </div>

          {/* Category Details */}
          <div className="flex-1 space-y-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedCategory === category.id
                    ? viewMode === "play"
                      ? "bg-white/15 border-white/30"
                      : "bg-blue-50 border-blue-200"
                    : viewMode === "play"
                      ? "bg-white/5 border-white/10 hover:bg-white/10"
                      : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="text-2xl">{category.icon}</div>
                    <div>
                      <div
                        className={`font-semibold ${
                          viewMode === "play" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {category.name}
                      </div>
                      <div
                        className={`text-sm ${
                          viewMode === "play" ? "text-white/70" : "text-gray-600"
                        }`}
                      >
                        {category.percentage}% of spending
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-lg font-bold ${
                        viewMode === "play" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {formatCurrency(category.amount)}
                    </div>
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-sm ${
                          category.trend === "up"
                            ? "text-red-400"
                            : category.trend === "down"
                              ? "text-green-400"
                              : "text-gray-400"
                        }`}
                      >
                        {category.trend === "up" ? "↗️" : category.trend === "down" ? "↘️" : "➡️"}
                        {category.trendPercent}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Budget Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span
                      className={`${
                        viewMode === "play" ? "text-white/60" : "text-gray-500"
                      }`}
                    >
                      Budget: {formatCurrency(category.budget)}
                    </span>
                    <span
                      className={`${
                        category.amount > category.budget
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {((category.amount / category.budget) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${
                    viewMode === "play" ? "bg-white/20" : "bg-gray-200"
                  }`}>
                    <motion.div
                      className={`h-full rounded-full ${
                        category.amount > category.budget
                          ? "bg-red-400"
                          : "bg-green-400"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((category.amount / category.budget) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {selectedCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span
                            className={`${
                              viewMode === "play" ? "text-white/70" : "text-gray-600"
                            }`}
                          >
                            Over/Under Budget:
                          </span>
                          <div
                            className={`font-semibold ${
                              category.amount > category.budget
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          >
                            {category.amount > category.budget ? "+" : ""}
                            {formatCurrency(category.amount - category.budget)}
                          </div>
                        </div>
                        <div>
                          <span
                            className={`${
                              viewMode === "play" ? "text-white/70" : "text-gray-600"
                            }`}
                          >
                            Monthly Trend:
                          </span>
                          <div
                            className={`font-semibold ${
                              category.trend === "up"
                                ? "text-red-400"
                                : category.trend === "down"
                                  ? "text-green-400"
                                  : "text-gray-400"
                            }`}
                          >
                            {category.trend === "up" ? "Increasing" : category.trend === "down" ? "Decreasing" : "Stable"}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

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
                {formatCurrency(totalSpent)}
              </div>
              <div
                className={`text-sm ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                Total Spent
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-1">🎯</div>
              <div
                className={`text-lg font-bold ${
                  viewMode === "play" ? "text-white" : "text-gray-900"
                }`}
              >
                {formatCurrency(totalBudget)}
              </div>
              <div
                className={`text-sm ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                Total Budget
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-1">
                {totalSpent <= totalBudget ? "✅" : "⚠️"}
              </div>
              <div
                className={`text-lg font-bold ${
                  totalSpent <= totalBudget ? "text-green-400" : "text-red-400"
                }`}
              >
                {totalSpent <= totalBudget ? "-" : "+"}{formatCurrency(Math.abs(totalBudget - totalSpent))}
              </div>
              <div
                className={`text-sm ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                {totalSpent <= totalBudget ? "Under Budget" : "Over Budget"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
