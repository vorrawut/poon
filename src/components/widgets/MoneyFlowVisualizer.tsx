import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IncomeStream {
  id: string;
  name: string;
  amount: number;
  color: string;
  icon: string;
  type: "recurring" | "one-time";
  frequency?: string;
}

interface SpendingCategory {
  id: string;
  name: string;
  amount: number;
  color: string;
  icon: string;
  type: "necessity" | "lifestyle" | "investment";
}

interface MoneyFlowVisualizerProps {
  incomeStreams: IncomeStream[];
  spendingCategories: SpendingCategory[];
  viewMode?: "play" | "clarity";
  className?: string;
}

export function MoneyFlowVisualizer({
  incomeStreams,
  spendingCategories,
  viewMode = "play",
  className = "",
}: MoneyFlowVisualizerProps) {
  const [flowAnimation, setFlowAnimation] = useState(true);
  const [selectedStream, setSelectedStream] = useState<string | null>(null);

  const totalIncome = incomeStreams.reduce((sum, stream) => sum + stream.amount, 0);
  const totalSpending = spendingCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const netBalance = totalIncome - totalSpending;

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  // Animated flow particles
  const FlowParticle = ({ delay, color, direction }: { delay: number; color: string; direction: "down" | "up" }) => (
    <motion.div
      className={`absolute w-2 h-2 rounded-full opacity-70`}
      style={{ backgroundColor: color }}
      initial={{ 
        y: direction === "down" ? -20 : 20, 
        x: Math.random() * 200 - 100,
        opacity: 0 
      }}
      animate={{ 
        y: direction === "down" ? 300 : -300, 
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  return (
    <div className={`relative w-full h-[600px] sm:h-[700px] lg:h-[800px] overflow-hidden ${className}`}>
      {/* Background Flow Animation */}
      {flowAnimation && viewMode === "play" && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <FlowParticle
              key={`income-${i}`}
              delay={i * 0.3}
              color={incomeStreams[i % incomeStreams.length]?.color || "#10B981"}
              direction="down"
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <FlowParticle
              key={`spending-${i}`}
              delay={i * 0.4 + 1}
              color={spendingCategories[i % spendingCategories.length]?.color || "#EF4444"}
              direction="down"
            />
          ))}
        </div>
      )}

      {/* Income Streams (Top) */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="flex justify-center mb-4">
          <motion.h3
            className={`text-xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            💰 Income Streams
          </motion.h3>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-2 sm:px-4 mb-6">
          {incomeStreams.map((stream, index) => (
            <motion.div
              key={stream.id}
              className={`relative cursor-pointer ${
                viewMode === "play"
                  ? "bg-white/10 backdrop-blur-sm border-white/20"
                  : "bg-white border-gray-200"
              } rounded-xl p-3 sm:p-4 border min-w-[120px] sm:min-w-[140px]`}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => setSelectedStream(selectedStream === stream.id ? null : stream.id)}
            >
              <div className="text-center">
                <div className="text-xl sm:text-2xl mb-2">{stream.icon}</div>
                <div className={`text-sm font-medium mb-1 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                  {stream.name}
                </div>
                <div className="text-base sm:text-lg font-bold text-green-400">
                  {formatCurrency(stream.amount)}
                </div>
                <div className={`text-xs ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
                  {stream.type === "recurring" ? stream.frequency : "One-time"}
                </div>
              </div>

              {/* Flow Animation from Income */}
              {viewMode === "play" && (
                <motion.div
                  className="absolute -bottom-2 left-1/2 w-1 h-8 rounded-full"
                  style={{ backgroundColor: stream.color }}
                  animate={{ 
                    height: [8, 32, 8],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Central Balance Bubble */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          className={`relative rounded-full p-6 sm:p-8 border-4 ${
            netBalance >= 0 
              ? "border-green-400 bg-green-400/20" 
              : "border-red-400 bg-red-400/20"
          } ${viewMode === "play" ? "backdrop-blur-sm" : "bg-white"}`}
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 20px rgba(16, 185, 129, 0.3)",
              "0 0 40px rgba(16, 185, 129, 0.5)",
              "0 0 20px rgba(16, 185, 129, 0.3)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-center min-w-[200px]">
            <motion.div
              className="text-4xl mb-2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {netBalance >= 0 ? "💎" : "⚠️"}
            </motion.div>
            <div className={`text-sm font-medium mb-2 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
              Net Balance
            </div>
            <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
              netBalance >= 0 ? "text-green-400" : "text-red-400"
            }`}>
              {netBalance >= 0 ? "+" : ""}{formatCurrency(netBalance)}
            </div>
            <div className={`text-xs ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
              This month you {netBalance >= 0 ? "saved" : "overspent"}
            </div>
          </div>

          {/* Pulsing rings */}
          {viewMode === "play" && (
            <>
              <motion.div
                className={`absolute inset-0 rounded-full border-2 ${
                  netBalance >= 0 ? "border-green-400" : "border-red-400"
                }`}
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className={`absolute inset-0 rounded-full border-2 ${
                  netBalance >= 0 ? "border-green-400" : "border-red-400"
                }`}
                animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
        </motion.div>
      </div>

      {/* Spending Categories (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-2 sm:px-4 mb-4">
          {spendingCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className={`relative cursor-pointer ${
                viewMode === "play"
                  ? "bg-white/10 backdrop-blur-sm border-white/20"
                  : "bg-white border-gray-200"
              } rounded-xl p-3 sm:p-4 border min-w-[120px] sm:min-w-[140px]`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              whileHover={{ scale: 1.05, y: 5 }}
            >
              <div className="text-center">
                <div className="text-xl sm:text-2xl mb-2">{category.icon}</div>
                <div className={`text-sm font-medium mb-1 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                  {category.name}
                </div>
                <div className="text-base sm:text-lg font-bold text-red-400">
                  -{formatCurrency(category.amount)}
                </div>
                <div className={`text-xs ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
                  {category.type}
                </div>
              </div>

              {/* Flow Animation to Spending */}
              {viewMode === "play" && (
                <motion.div
                  className="absolute -top-2 left-1/2 w-1 h-8 rounded-full"
                  style={{ backgroundColor: category.color }}
                  animate={{ 
                    height: [8, 32, 8],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.3 + 1
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.h3
            className={`text-xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            💸 Money Outflow
          </motion.h3>
        </div>
      </div>

      {/* Flow Control */}
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={() => setFlowAnimation(!flowAnimation)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            viewMode === "play"
              ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200"
          }`}
        >
          {flowAnimation ? "⏸️ Pause Flow" : "▶️ Start Flow"}
        </button>
      </div>

      {/* Income Stream Detail Popup */}
      <AnimatePresence>
        {selectedStream && (
          <motion.div
            className="absolute top-20 left-1/2 transform -translate-x-1/2 z-40"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
          >
            {(() => {
              const stream = incomeStreams.find(s => s.id === selectedStream);
              if (!stream) return null;
              
              return (
                <div className={`rounded-xl p-6 border shadow-xl ${
                  viewMode === "play"
                    ? "bg-white/10 backdrop-blur-md border-white/20"
                    : "bg-white border-gray-200"
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{stream.icon}</div>
                    <div>
                      <h4 className={`text-lg font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                        {stream.name}
                      </h4>
                      <p className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
                        {stream.type === "recurring" ? `${stream.frequency} income` : "One-time payment"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`${viewMode === "play" ? "text-white/80" : "text-gray-700"}`}>Amount:</span>
                      <span className="font-bold text-green-400">{formatCurrency(stream.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${viewMode === "play" ? "text-white/80" : "text-gray-700"}`}>% of Total Income:</span>
                      <span className={`font-medium ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                        {((stream.amount / totalIncome) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedStream(null)}
                    className="mt-4 w-full py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
