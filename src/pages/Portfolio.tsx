import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, SplitText } from "../components/ui";

// Mock Portfolio Data - Wealth Universe Assets 🌍
const mockPortfolioAssets = [
  { 
    id: "cash", 
    name: "Cash & Savings", 
    value: 125000, 
    performance: 2.5, 
    allocation: 25,
    color: "#10B981", 
    icon: "💰",
    orbit: 140,
    size: 55,
    description: "Emergency funds and high-yield savings"
  },
  { 
    id: "stocks", 
    name: "Stock Portfolio", 
    value: 280000, 
    performance: 15.2, 
    allocation: 45,
    color: "#3B82F6", 
    icon: "📈",
    orbit: 200,
    size: 85,
    description: "Individual stocks and ETFs"
  },
  { 
    id: "funds", 
    name: "Mutual Funds", 
    value: 150000, 
    performance: 8.7, 
    allocation: 20,
    color: "#8B5CF6", 
    icon: "🏦",
    orbit: 260,
    size: 65,
    description: "Diversified mutual fund portfolio"
  },
  { 
    id: "crypto", 
    name: "Cryptocurrency", 
    value: 45000, 
    performance: -12.3, 
    allocation: 5,
    color: "#F59E0B", 
    icon: "₿",
    orbit: 320,
    size: 40,
    description: "Bitcoin, Ethereum, and altcoins"
  },
  { 
    id: "property", 
    name: "Real Estate", 
    value: 85000, 
    performance: 6.8, 
    allocation: 5,
    color: "#EF4444", 
    icon: "🏠",
    orbit: 380,
    size: 45,
    description: "REITs and property investments"
  }
];

const mockTimelineEvents = [
  { year: 2018, event: "Started investing", icon: "🎓", amount: 5000 },
  { year: 2020, event: "First $50K milestone", icon: "🎯", amount: 50000 },
  { year: 2021, event: "Tech stocks exploded", icon: "🚀", amount: 150000 },
  { year: 2023, event: "Diversified portfolio", icon: "🌈", amount: 400000 },
  { year: 2024, event: "Real estate investment", icon: "🏠", amount: 685000 },
  { year: 2026, event: "Projected: $1M milestone", icon: "💎", amount: 1000000, projected: true }
];

export function Portfolio() {
  const [viewMode, setViewMode] = useState<"play" | "clarity">("play");
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);

  const totalValue = mockPortfolioAssets.reduce((sum, asset) => sum + asset.value, 0);
  const totalGrowth = mockPortfolioAssets.reduce((sum, asset) => sum + (asset.value * asset.performance / 100), 0);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Dual-Lens View Toggle */}
      <motion.div
        className="fixed top-24 left-8 z-50"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-black/30 backdrop-blur-sm rounded-full p-1 border border-white/20">
          <button
            onClick={() => setViewMode("play")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === "play"
                ? "bg-white text-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            🎮 Play Mode
          </button>
          <button
            onClick={() => setViewMode("clarity")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === "clarity"
                ? "bg-white text-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            📊 Clarity Mode
          </button>
        </div>
      </motion.div>

      {/* Navigation Controls */}
      <motion.div
        className="fixed top-24 right-8 z-50 flex gap-3"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <button
          onClick={() => setShowTimeline(!showTimeline)}
          className="bg-black/30 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm hover:bg-white/10 transition-all"
        >
          🕰 Timeline
        </button>
        <button
          onClick={() => setShowSimulation(!showSimulation)}
          className="bg-black/30 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm hover:bg-white/10 transition-all"
        >
          🔮 Simulate
        </button>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Universe Header */}
      <FadeIn direction="down">
          <div className="text-center mb-16">
            <div className="text-4xl md:text-6xl font-bold text-white mb-4">
              <motion.span
                className="inline-block mr-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                ☀️
              </motion.span>
              <SplitText className="inline">
                Your Wealth Universe
        </SplitText>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              {viewMode === "play" 
                ? "Navigate your financial solar system — each planet represents your asset categories orbiting around your portfolio sun!"
                : "Clear overview of your portfolio performance with exact numbers and plain summaries."
              }
            </p>
            
            {/* Portfolio Summary */}
            <motion.div
              className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-white">
                  {formatCurrency(totalValue)}
                </div>
                <div className="text-white/70 text-sm">Total Portfolio</div>
              </div>
              <div className="w-px h-16 bg-white/20"></div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${totalGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalGrowth >= 0 ? '+' : ''}{formatCurrency(totalGrowth)}
                </div>
                <div className="text-white/70 text-sm">Total Growth</div>
              </div>
              <div className="w-px h-16 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {mockPortfolioAssets.length}
                </div>
                <div className="text-white/70 text-sm">Asset Classes</div>
              </div>
            </motion.div>
          </div>
      </FadeIn>

        {/* Main Portfolio Universe */}
        <AnimatePresence mode="wait">
          {viewMode === "play" ? (
            <motion.div
              key="play-mode"
              className="relative w-full h-[900px] flex items-center justify-center overflow-visible mb-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              {/* Central Sun (Portfolio Value) */}
              <motion.div
                className="absolute z-20 flex flex-col items-center justify-center"
                animate={{ 
                  boxShadow: [
                    "0 0 80px rgba(255, 215, 0, 0.4)",
                    "0 0 120px rgba(255, 215, 0, 0.6)",
                    "0 0 80px rgba(255, 215, 0, 0.4)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="w-40 h-40 bg-gradient-to-br from-yellow-300 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-5xl shadow-2xl">
                  ☀️
                </div>
                <div className="mt-6 text-center">
                  <div className="text-3xl font-bold text-white">{formatCurrency(totalValue)}</div>
                  <div className="text-white/70 text-sm">Portfolio Sun</div>
                </div>
              </motion.div>

              {/* Orbiting Asset Planets */}
              {mockPortfolioAssets.map((asset, index) => {
                const angle = (index / mockPortfolioAssets.length) * 2 * Math.PI;
                const x = Math.cos(angle) * asset.orbit;
                const y = Math.sin(angle) * asset.orbit;
                
                return (
                  <motion.div
                    key={asset.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 25 + index * 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    whileHover={{ scale: 1.3 }}
                    onClick={() => setSelectedAsset(selectedAsset === asset.id ? null : asset.id)}
                  >
                    <motion.div
                      className="relative flex flex-col items-center"
                      style={{ transform: `translate(-50%, -50%)` }}
                    >
                      {/* Planet with Performance Glow */}
                      <motion.div
                        className={`rounded-full flex items-center justify-center text-3xl shadow-xl border-4 ${
                          asset.performance >= 0 ? 'border-green-400/60' : 'border-red-400/60'
                        }`}
                        style={{
                          width: asset.size,
                          height: asset.size,
                          backgroundColor: asset.color,
                          boxShadow: `0 0 30px ${asset.color}60`,
                        }}
                        animate={asset.performance >= 0 ? {
                          boxShadow: [
                            `0 0 30px ${asset.color}60`,
                            `0 0 50px ${asset.color}80`,
                            `0 0 30px ${asset.color}60`
                          ]
                        } : {}}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {asset.icon}
                      </motion.div>
                      
                      {/* Planet Info */}
                      <div className="mt-3 text-center">
                        <div className="text-lg font-bold text-white">{formatCurrency(asset.value)}</div>
                        <div className="text-xs text-white/70 max-w-20 truncate">{asset.name}</div>
                        <div className={`text-sm font-bold ${asset.performance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {asset.performance >= 0 ? '+' : ''}{asset.performance}%
                        </div>
                        <div className="text-xs text-white/60">{asset.allocation}% allocation</div>
                      </div>

                      {/* Orbit Trail */}
                      <div
                        className="absolute border border-dashed border-white/15 rounded-full pointer-events-none"
                        style={{
                          width: asset.orbit * 2,
                          height: asset.orbit * 2,
                          left: `calc(-50% - ${asset.orbit - asset.size/2}px)`,
                          top: `calc(-50% - ${asset.orbit - asset.size/2}px)`,
                        }}
                      />

                      {/* Asset Detail Panel */}
                      <AnimatePresence>
                        {selectedAsset === asset.id && (
                          <motion.div
                            className="absolute top-full mt-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 min-w-64 z-30"
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="text-2xl">{asset.icon}</div>
                              <div>
                                <h3 className="text-white font-bold">{asset.name}</h3>
                                <p className="text-white/70 text-sm">{asset.description}</p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-white/70">Current Value:</span>
                                <span className="text-white font-bold">{formatCurrency(asset.value)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Performance:</span>
                                <span className={`font-bold ${asset.performance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {asset.performance >= 0 ? '+' : ''}{asset.performance}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Allocation:</span>
                                <span className="text-blue-400 font-bold">{asset.allocation}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Growth:</span>
                                <span className={`font-bold ${asset.performance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {formatCurrency(asset.value * asset.performance / 100)}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="clarity-mode"
              className="mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Clean Table View */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/20">
                  <h3 className="text-xl font-bold text-white">Portfolio Assets</h3>
                  <p className="text-white/70 text-sm">Clear breakdown of your investments</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left px-6 py-4 text-white/70 font-medium">Asset</th>
                        <th className="text-right px-6 py-4 text-white/70 font-medium">Value</th>
                        <th className="text-right px-6 py-4 text-white/70 font-medium">Performance</th>
                        <th className="text-right px-6 py-4 text-white/70 font-medium">Allocation</th>
                        <th className="text-right px-6 py-4 text-white/70 font-medium">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPortfolioAssets.map((asset) => (
                        <tr key={asset.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{asset.icon}</div>
                              <div>
                                <div className="text-white font-medium">{asset.name}</div>
                                <div className="text-white/60 text-sm">{asset.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right text-white font-bold">
                            {formatCurrency(asset.value)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={`font-bold ${asset.performance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {asset.performance >= 0 ? '+' : ''}{asset.performance}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-blue-400 font-medium">
                            {asset.allocation}%
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={`font-bold ${asset.performance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {formatCurrency(asset.value * asset.performance / 100)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Living Timeline - Your Financial Story */}
        <AnimatePresence>
          {showTimeline && (
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  <span className="mr-3">🕰</span>
                  Your Wealth Journey
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Scrollable animated timeline of your portfolio growth — like flipping through a storybook of your wealth journey.
                </p>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                
                <div className="space-y-16">
                  {mockTimelineEvents.map((event, index) => (
                    <motion.div
                      key={event.year}
                      className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <motion.div
                          className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 ${event.projected ? 'border-yellow-400/40 bg-yellow-400/5' : ''}`}
                          whileHover={{ scale: 1.02, y: -5 }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="text-3xl">{event.icon}</div>
                            <div>
                              <h3 className={`text-xl font-bold ${event.projected ? 'text-yellow-300' : 'text-white'}`}>
                                {event.year} {event.projected && '(Projected)'}
                              </h3>
                              <p className="text-white/70">{event.event}</p>
                            </div>
                          </div>
                          <div className={`text-2xl font-bold ${event.projected ? 'text-yellow-400' : 'text-green-400'}`}>
                            {formatCurrency(event.amount)}
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Timeline Node */}
                      <div className="relative z-10">
                        <motion.div
                          className={`w-6 h-6 rounded-full border-4 ${
                            event.projected 
                              ? 'bg-yellow-400 border-yellow-300' 
                              : 'bg-white border-blue-400'
                          }`}
                          animate={event.projected ? {
                            scale: [1, 1.2, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(255, 215, 0, 0.4)",
                              "0 0 0 20px rgba(255, 215, 0, 0)",
                              "0 0 0 0 rgba(255, 215, 0, 0)"
                            ]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      
                      <div className="flex-1"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Future Simulation Playground */}
        <AnimatePresence>
          {showSimulation && (
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    <span className="mr-3">🔮</span>
                    Future Simulation Playground
                  </h2>
                  <p className="text-white/70 max-w-2xl mx-auto">
                    Drag sliders & see real-time projection — turns boring finance math into an interactive game!
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Monthly Investment</label>
                      <input
                        type="range"
                        min="1000"
                        max="10000"
                        step="500"
                        defaultValue="5000"
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-white/60 text-sm mt-1">
                        <span>$1K</span>
                        <span>$10K</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-2">Expected Return (%)</label>
                      <input
                        type="range"
                        min="3"
                        max="15"
                        step="0.5"
                        defaultValue="8"
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-white/60 text-sm mt-1">
                        <span>3%</span>
                        <span>15%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-2">Time Horizon (Years)</label>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        defaultValue="10"
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-white/60 text-sm mt-1">
                        <span>1 Year</span>
                        <span>30 Years</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">Projected Results</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-white/70">Future Portfolio Value:</span>
                        <span className="text-green-400 font-bold text-xl">$1.2M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Total Contributions:</span>
                        <span className="text-blue-400 font-bold">$600K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Investment Growth:</span>
                        <span className="text-purple-400 font-bold">$600K</span>
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-yellow-400">🎯</div>
                          <p className="text-white/70 text-sm mt-2">
                            At this pace, you'll reach financial independence 5 years earlier!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Smart Highlights Digest - AI Narrator */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="mr-3">🧠</span>
              Smart Portfolio Insights
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Your personal portfolio newsfeed — like Spotify Wrapped, but every week! AI-powered insights with a friendly guide tone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-xl p-6 border border-green-400/30"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">🚀</div>
                <h3 className="text-white font-bold">Portfolio Superstar</h3>
              </div>
              <p className="text-white/80 text-sm">
                Your stock portfolio is crushing it with +15.2% growth! You're outperforming 78% of similar investors this quarter.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">🎯</div>
                <h3 className="text-white font-bold">Diversification Win</h3>
              </div>
              <p className="text-white/80 text-sm">
                Your portfolio balance is looking healthy! 45% stocks, 25% cash, 20% funds. Perfect risk distribution for your age group.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">⚠️</div>
                <h3 className="text-white font-bold">Crypto Reality Check</h3>
              </div>
              <p className="text-white/80 text-sm">
                Crypto took a -12.3% hit this month, but it's only 5% of your portfolio. Your diversification strategy is protecting you!
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">💡</div>
                <h3 className="text-white font-bold">Smart Rebalancing</h3>
              </div>
              <p className="text-white/80 text-sm">
                Consider moving some gains from stocks to real estate. Your property allocation is only 5% — there's room to grow!
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-teal-500/20 to-cyan-600/20 backdrop-blur-sm rounded-xl p-6 border border-teal-400/30"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">📈</div>
                <h3 className="text-white font-bold">Milestone Alert</h3>
              </div>
              <p className="text-white/80 text-sm">
                You're $15K away from the $700K milestone! At current growth rate, you'll hit it in just 3 months. Keep it up!
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-rose-500/20 to-red-600/20 backdrop-blur-sm rounded-xl p-6 border border-rose-400/30"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">🎉</div>
                <h3 className="text-white font-bold">Anniversary Special</h3>
              </div>
              <p className="text-white/80 text-sm">
                6 years of investing! Your portfolio has grown 1,370% since you started. From $5K to $685K — absolutely incredible journey!
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
