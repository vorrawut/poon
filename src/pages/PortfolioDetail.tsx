import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { FadeIn, SplitText } from "../components/ui";
import { 
  DualLensToggle, 
  UniverseBackground,
  SmartHighlights,
  PerformanceChart,
  RiskGauge 
} from "../components/widgets";

// Mock Asset Data - This would come from API/store in real app
const mockAssetData = {
  tesla: {
    id: "tesla",
    name: "Tesla Inc.",
    symbol: "TSLA",
    icon: "🚗",
    type: "stock",
    currentValue: 1245000,
    performance: 12.5,
    allocation: 18.2,
    holdingPeriod: "2 years 3 months",
    riskLevel: "High",
    units: 500,
    avgBuyPrice: 180.50,
    currentPrice: 249.00,
    unrealizedGain: 342500,
    totalInvested: 902500,
    dividendReceived: 12500,
    projectedValue: 2000000,
    projectedTimeframe: "5 years",
    volatility: 0.68,
    diversificationImpact: "High concentration risk",
    goalAllocation: {
      retirement: 40,
      travel: 20,
      emergency: 0,
      house: 40
    },
    transactions: [
      { date: "2024-08-15", type: "buy", amount: 100, price: 245.00, total: 24500, icon: "💸" },
      { date: "2024-06-20", type: "dividend", amount: 0, price: 0, total: 2500, icon: "💰" },
      { date: "2024-03-10", type: "buy", amount: 200, price: 190.00, total: 38000, icon: "💸" },
      { date: "2023-12-05", type: "dividend", amount: 0, price: 0, total: 5000, icon: "💰" },
      { date: "2023-08-22", type: "buy", amount: 200, price: 175.00, total: 35000, icon: "💸" }
    ],
    performanceData: [
      { date: "2023-08", value: 35000 },
      { date: "2023-12", value: 40000 },
      { date: "2024-03", value: 73000 },
      { date: "2024-06", value: 75500 },
      { date: "2024-08", value: 100000 },
      { date: "2024-09", value: 124500 }
    ]
  }
};

const aiInsights = [
  {
    id: "1",
    title: "Performance Champion",
    message: "This stock grew faster than 80% of your holdings this quarter! Your Tesla investment is crushing it with stellar performance.",
    icon: "🚀",
    type: "success" as const
  },
  {
    id: "2",
    title: "Concentration Alert",
    message: "This asset represents 18% of your portfolio. Consider diversifying to reduce concentration risk while maintaining growth potential.",
    icon: "⚠️",
    type: "warning" as const
  },
  {
    id: "3",
    title: "Dividend Incoming",
    message: "Based on Tesla's pattern, expect potential dividend announcement next quarter. Your projected payout: $3,200.",
    icon: "💵",
    type: "info" as const
  },
  {
    id: "4",
    title: "Goal Progress",
    message: "This investment has contributed 25% toward your house down payment goal! You're making excellent progress.",
    icon: "🏠",
    type: "celebration" as const
  }
];

export function PortfolioDetail() {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"play" | "clarity">("play");
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M" | "1Y" | "Max">("1Y");
  const [showSimulation, setShowSimulation] = useState(false);

  // Get asset data (in real app, this would fetch from API)
  const asset = mockAssetData[assetId as keyof typeof mockAssetData] || mockAssetData.tesla;

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };


  return (
    <div className={`min-h-screen relative overflow-hidden ${
      viewMode === "play" 
        ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" 
        : "bg-gradient-to-br from-indigo-50 to-purple-50"
    }`}>
      {viewMode === "play" && <UniverseBackground starCount={30} />}
      <DualLensToggle viewMode={viewMode} onToggle={setViewMode} />
      
      {/* Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        className="fixed top-24 right-8 z-50 bg-black/30 backdrop-blur-sm rounded-full p-3 border border-white/20 text-white hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xl">←</span>
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
        {/* Hero Header - Big Picture Snapshot */}
        <FadeIn direction="down" delay={0.1} className="py-12">
          <div className="text-center mb-8">
            <div className={`flex items-center justify-center gap-4 mb-6 ${
              viewMode === "play" ? "text-white" : "text-gray-900"
            }`}>
              <div className="text-6xl">{asset.icon}</div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold">
                  <SplitText>{asset.name}</SplitText>
                </h1>
                <p className={`text-xl ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
                  {asset.symbol} • {asset.type.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Current Value - Big Bold Number */}
            <motion.div
              className={`text-6xl md:text-7xl font-bold mb-4 ${
                viewMode === "play" ? "text-white" : "text-gray-900"
              }`}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {formatCurrency(asset.currentValue)}
            </motion.div>

            {/* Performance Badge */}
            <motion.div
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xl font-bold mb-8 ${
                asset.performance >= 0 
                  ? "bg-green-500/20 text-green-400 border border-green-400/30" 
                  : "bg-red-500/20 text-red-400 border border-red-400/30"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <span>{asset.performance >= 0 ? "📈" : "📉"}</span>
              {asset.performance >= 0 ? "+" : ""}{asset.performance}% YoY
            </motion.div>

            {/* Quick Stat Chips */}
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                className={`px-4 py-2 rounded-full border ${
                  viewMode === "play" 
                    ? "bg-white/10 border-white/20 text-white" 
                    : "bg-white border-gray-200 text-gray-900"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-semibold">{asset.allocation}%</span> of Portfolio
              </motion.div>
              <motion.div
                className={`px-4 py-2 rounded-full border ${
                  viewMode === "play" 
                    ? "bg-white/10 border-white/20 text-white" 
                    : "bg-white border-gray-200 text-gray-900"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                📅 {asset.holdingPeriod}
              </motion.div>
              <motion.div
                className={`px-4 py-2 rounded-full border ${
                  viewMode === "play" 
                    ? "bg-white/10 border-white/20" 
                    : "bg-white border-gray-200"
                } ${
                  asset.riskLevel === "High" ? "text-red-400" :
                  asset.riskLevel === "Medium" ? "text-yellow-400" : "text-green-400"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {asset.riskLevel === "High" ? "🔴" :
                 asset.riskLevel === "Medium" ? "🟡" : "🟢"} {asset.riskLevel} Risk
              </motion.div>
            </div>
          </div>
        </FadeIn>

        {/* Performance Graph Section */}
        <motion.div
          className={`rounded-2xl p-8 mb-8 border ${
            viewMode === "play" 
              ? "bg-white/10 backdrop-blur-sm border-white/20" 
              : "bg-white border-gray-200"
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
              📊 Performance Timeline
            </h2>
            <div className="flex gap-2">
              {["1D", "1W", "1M", "1Y", "Max"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as any)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range
                      ? "bg-blue-500 text-white"
                      : viewMode === "play"
                        ? "bg-white/10 text-white hover:bg-white/20"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          <PerformanceChart 
            data={asset.performanceData}
            timeRange={timeRange}
            performance={asset.performance}
            viewMode={viewMode}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Holding Breakdown */}
          <motion.div
            className={`rounded-2xl p-8 border ${
              viewMode === "play" 
                ? "bg-white/10 backdrop-blur-sm border-white/20" 
                : "bg-white border-gray-200"
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className={`text-2xl font-bold mb-6 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
              💼 Holding Details
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className={viewMode === "play" ? "text-white/70" : "text-gray-600"}>Units Held:</span>
                <span className={`font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                  {asset.units.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={viewMode === "play" ? "text-white/70" : "text-gray-600"}>Avg. Buy Price:</span>
                <span className={`font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                  ${asset.avgBuyPrice}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={viewMode === "play" ? "text-white/70" : "text-gray-600"}>Current Price:</span>
                <span className={`font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                  ${asset.currentPrice}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={viewMode === "play" ? "text-white/70" : "text-gray-600"}>Unrealized Gain:</span>
                <span className="font-bold text-green-400">
                  +{formatCurrency(asset.unrealizedGain)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={viewMode === "play" ? "text-white/70" : "text-gray-600"}>Total Invested:</span>
                <span className={`font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                  {formatCurrency(asset.totalInvested)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Risk & Health Meter */}
          <motion.div
            className={`rounded-2xl p-8 border ${
              viewMode === "play" 
                ? "bg-white/10 backdrop-blur-sm border-white/20" 
                : "bg-white border-gray-200"
            }`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className={`text-2xl font-bold mb-6 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
              ⚡ Risk & Health
            </h2>
            
            <RiskGauge 
              riskLevel={asset.riskLevel as "Low" | "Medium" | "High"}
              volatility={asset.volatility}
              diversificationImpact={asset.diversificationImpact}
              viewMode={viewMode}
            />
          </motion.div>
        </div>

        {/* Income & Return Summary */}
        <motion.div
          className={`rounded-2xl p-8 mb-8 border ${
            viewMode === "play" 
              ? "bg-white/10 backdrop-blur-sm border-white/20" 
              : "bg-white border-gray-200"
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className={`text-2xl font-bold mb-6 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
            💰 Income & Returns
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                +{formatCurrency(asset.unrealizedGain)}
              </div>
              <div className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
                Total Gain
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {formatCurrency(asset.dividendReceived)}
              </div>
              <div className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
                Dividends Received
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {formatCurrency(asset.projectedValue)}
              </div>
              <div className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
                Projected ({asset.projectedTimeframe})
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-lg ${
            viewMode === "play" ? "bg-white/5" : "bg-gray-50"
          }`}>
            <h3 className={`font-bold mb-2 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
              Plain English Summary:
            </h3>
            <p className={`${viewMode === "play" ? "text-white/80" : "text-gray-700"}`}>
              You invested {formatCurrency(asset.totalInvested)}. Now worth {formatCurrency(asset.currentValue)} → 
              total gain {formatCurrency(asset.unrealizedGain)} (+{((asset.unrealizedGain / asset.totalInvested) * 100).toFixed(0)}%).
            </p>
            <p className={`mt-2 ${viewMode === "play" ? "text-white/80" : "text-gray-700"}`}>
              Projected to reach {formatCurrency(asset.projectedValue)} in {asset.projectedTimeframe} if trend continues 📈.
            </p>
          </div>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          className={`rounded-2xl p-8 mb-8 border ${
            viewMode === "play" 
              ? "bg-white/10 backdrop-blur-sm border-white/20" 
              : "bg-white border-gray-200"
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className={`text-2xl font-bold mb-6 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
            📜 Transaction History
          </h2>
          
          <div className="space-y-4">
            {asset.transactions.map((transaction, index) => (
              <motion.div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  viewMode === "play" ? "bg-white/5" : "bg-gray-50"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{transaction.icon}</div>
                  <div>
                    <div className={`font-semibold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                      {transaction.type === "buy" ? "Bought" : "Dividend"} 
                      {transaction.amount > 0 && ` ${transaction.amount} shares`}
                      {transaction.price > 0 && ` @ $${transaction.price}`}
                    </div>
                    <div className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
                      {transaction.date}
                    </div>
                  </div>
                </div>
                <div className={`font-bold ${
                  transaction.type === "buy" ? "text-red-400" : "text-green-400"
                }`}>
                  {transaction.type === "buy" ? "-" : "+"}{formatCurrency(transaction.total)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Goal Linkage */}
        <motion.div
          className={`rounded-2xl p-8 mb-8 border ${
            viewMode === "play" 
              ? "bg-white/10 backdrop-blur-sm border-white/20" 
              : "bg-white border-gray-200"
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className={`text-2xl font-bold mb-6 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
            🎯 Goal Contributions
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(asset.goalAllocation).map(([goal, percentage]) => (
              percentage > 0 && (
                <motion.div
                  key={goal}
                  className={`text-center p-4 rounded-lg ${
                    viewMode === "play" ? "bg-white/5" : "bg-gray-50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl mb-2">
                    {goal === "retirement" ? "🏖️" : 
                     goal === "travel" ? "✈️" : 
                     goal === "house" ? "🏠" : "🚨"}
                  </div>
                  <div className={`font-bold text-lg ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                    {percentage}%
                  </div>
                  <div className={`text-sm capitalize ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
                    {goal}
                  </div>
                </motion.div>
              )
            ))}
          </div>
          
          <div className={`mt-6 p-4 rounded-lg ${
            viewMode === "play" ? "bg-white/5" : "bg-gray-50"
          }`}>
            <p className={`text-center ${viewMode === "play" ? "text-white/80" : "text-gray-700"}`}>
              💡 This investment is helping fund your house down payment (40%) and retirement dreams (40%)!
            </p>
          </div>
        </motion.div>

        {/* AI Guide Card */}
        <SmartHighlights 
          highlights={aiInsights} 
          title="AI Portfolio Coach"
          subtitle="Personalized insights about your Tesla investment — your smart financial companion!"
          className="mb-8"
        />

        {/* Simulation Sandbox */}
        <motion.div
          className={`rounded-2xl p-8 border ${
            viewMode === "play" 
              ? "bg-white/10 backdrop-blur-sm border-white/20" 
              : "bg-white border-gray-200"
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
              🎮 What If Simulator
            </h2>
            <button
              onClick={() => setShowSimulation(!showSimulation)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              {showSimulation ? "Hide" : "Show"} Simulator
            </button>
          </div>

          <AnimatePresence>
            {showSimulation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block mb-2 font-semibold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                      What if I sell 50%?
                    </label>
                    <div className={`p-4 rounded-lg ${viewMode === "play" ? "bg-white/5" : "bg-gray-50"}`}>
                      <div className="text-lg font-bold text-green-400">
                        +{formatCurrency(asset.currentValue * 0.5)}
                      </div>
                      <div className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
                        Cash received • Portfolio allocation: {(asset.allocation / 2).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block mb-2 font-semibold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}>
                      What if I add $10K/month?
                    </label>
                    <div className={`p-4 rounded-lg ${viewMode === "play" ? "bg-white/5" : "bg-gray-50"}`}>
                      <div className="text-lg font-bold text-purple-400">
                        {formatCurrency(asset.projectedValue * 1.6)}
                      </div>
                      <div className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}>
                        Projected in 5 years • 60% faster goal achievement
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
