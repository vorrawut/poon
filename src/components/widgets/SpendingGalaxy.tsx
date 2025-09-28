import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Zap, TrendingUp, TrendingDown, Minus } from "lucide-react";

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
  frequency: number; // transactions per week
  healthStatus: "healthy" | "warning" | "critical";
}

interface SpendingGalaxyProps {
  categories: SpendingCategory[];
  onCategoryClick: (category: SpendingCategory) => void;
  className?: string;
}

export function SpendingGalaxy({
  categories,
  onCategoryClick,
  className = "",
}: SpendingGalaxyProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation cycle for galaxy rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const totalSpent = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const maxAmount = Math.max(...categories.map((cat) => cat.amount));

  const getPlanetSize = (amount: number) => {
    const minSize = 60;
    const maxSize = 120;
    return minSize + (amount / maxAmount) * (maxSize - minSize);
  };

  const getOrbitRadius = (index: number) => {
    const baseRadius = 150;
    const radiusIncrement = 80;
    return baseRadius + (index % 3) * radiusIncrement;
  };

  const getHealthColor = (category: SpendingCategory) => {
    const spentRatio = category.amount / category.budget;
    if (spentRatio <= 0.7) return "#10B981"; // Green - healthy
    if (spentRatio <= 0.9) return "#F59E0B"; // Yellow - warning
    return "#EF4444"; // Red - critical
  };

  const getPlanetPosition = (index: number, radius: number) => {
    const angle = index * (360 / categories.length) + animationPhase * 0.5;
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    };
  };

  const getOrbitSpeed = (frequency: number) => {
    // Higher frequency = faster orbit
    return 0.5 + (frequency / 10) * 2;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Galaxy Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[600px] bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-3xl overflow-hidden border border-white/10"
      >
        {/* Central Sun (Total Spending) */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity },
          }}
        >
          <div className="relative">
            {/* Sun Core */}
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-2xl">💰</span>
            </div>

            {/* Sun Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/40 to-orange-500/40 rounded-full animate-ping" />
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full animate-pulse" />

            {/* Total Amount */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <div className="text-white font-bold text-lg">
                ฿{totalSpent.toLocaleString()}
              </div>
              <div className="text-white/60 text-xs">Total Spent</div>
            </div>
          </div>
        </motion.div>

        {/* Orbit Rings */}
        {[0, 1, 2].map((ringIndex) => (
          <motion.div
            key={ringIndex}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full"
            style={{
              width: (150 + ringIndex * 80) * 2,
              height: (150 + ringIndex * 80) * 2,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 60 + ringIndex * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Category Planets */}
        {categories.map((category, index) => {
          const radius = getOrbitRadius(index);
          const position = getPlanetPosition(index, radius);
          const planetSize = getPlanetSize(category.amount);
          const healthColor = getHealthColor(category);
          const isHovered = hoveredCategory === category.id;

          return (
            <motion.div
              key={category.id}
              className="absolute top-1/2 left-1/2 cursor-pointer z-20"
              style={{
                transform: `translate(${position.x - planetSize / 2}px, ${position.y - planetSize / 2}px)`,
              }}
              animate={{
                rotate: 360,
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{
                rotate: {
                  duration: 30 / getOrbitSpeed(category.frequency),
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: { duration: 0.2 },
              }}
              onHoverStart={() => setHoveredCategory(category.id)}
              onHoverEnd={() => setHoveredCategory(null)}
              onClick={() => onCategoryClick(category)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Planet */}
              <div
                className="relative rounded-full flex items-center justify-center shadow-2xl border-2"
                style={{
                  width: planetSize,
                  height: planetSize,
                  backgroundColor: category.color,
                  borderColor: healthColor,
                  boxShadow: `0 0 30px ${category.color}60, 0 0 60px ${healthColor}40`,
                }}
              >
                {/* Planet Surface */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />

                {/* Category Icon */}
                <span className="text-2xl relative z-10">{category.icon}</span>

                {/* Health Status Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: healthColor }}
                  animate={{
                    boxShadow: [
                      `0 0 0 0 ${healthColor}40`,
                      `0 0 0 10px ${healthColor}00`,
                      `0 0 0 0 ${healthColor}40`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Trend Indicator */}
                <div className="absolute -top-2 -right-2">
                  {category.trend === "up" && (
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {category.trend === "down" && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <TrendingDown className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {category.trend === "stable" && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Minus className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Planet Info Popup */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-md rounded-xl p-4 border border-white/20 min-w-48 z-30"
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  >
                    <div className="text-center">
                      <div className="text-white font-bold text-lg mb-1">
                        {category.name}
                      </div>
                      <div className="text-white/80 text-sm mb-2">
                        ฿{category.amount.toLocaleString()} / ฿
                        {category.budget.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <span
                          className="px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: healthColor + "20",
                            color: healthColor,
                          }}
                        >
                          {category.healthStatus.toUpperCase()}
                        </span>
                        <span className="text-white/60">
                          {category.transactions} transactions
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3 w-full bg-white/20 rounded-full h-2">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: healthColor }}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min((category.amount / category.budget) * 100, 100)}%`,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Satellite Transactions (for high-frequency categories) */}
              {category.frequency > 5 && (
                <motion.div
                  className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full"
                  animate={{
                    rotate: 360,
                    x: [0, 20, 0, -20, 0],
                    y: [0, -20, 0, 20, 0],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    x: { duration: 4, repeat: Infinity },
                    y: { duration: 4, repeat: Infinity, delay: 1 },
                  }}
                />
              )}
            </motion.div>
          );
        })}

        {/* Background Stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Galaxy Legend */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
          <div className="text-white text-sm font-bold mb-2">
            Spending Galaxy
          </div>
          <div className="space-y-1 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>Healthy Spending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span>Warning Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span>Over Budget</span>
            </div>
          </div>
        </div>

        {/* Galaxy Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm border border-white/20 text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-4 h-4" />
          </motion.button>
          <motion.button
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm border border-white/20 text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Zap className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Galaxy Stats */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Largest Planet",
            value:
              categories.reduce(
                (max, cat) => (cat.amount > max.amount ? cat : max),
                categories[0],
              )?.name || "N/A",
            icon: "🪐",
          },
          {
            label: "Most Active",
            value:
              categories.reduce(
                (max, cat) => (cat.frequency > max.frequency ? cat : max),
                categories[0],
              )?.name || "N/A",
            icon: "⚡",
          },
          {
            label: "Healthiest",
            value: categories.filter((cat) => cat.healthStatus === "healthy")
              .length,
            icon: "💚",
          },
          {
            label: "Need Attention",
            value: categories.filter((cat) => cat.healthStatus === "critical")
              .length,
            icon: "⚠️",
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
