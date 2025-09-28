import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { FadeIn, SplitText } from "../../../components/ui";
import {
  UniverseBackground,
  SmartHighlights,
  PerformanceChart,
  WealthWheel,
  AchievementBadges,
  CategoryDetailView,
} from "../../../components/widgets";
import {
  mockAssetData,
  portfolioAssets,
  mockPortfolioAchievements,
} from "../../../../mockData/features/portfolio";
import { useUIStore } from "../../../store/useUIStore";

const aiInsights = [
  {
    id: "1",
    title: "Performance Champion",
    message:
      "Your portfolio is outperforming 80% of similar investors this quarter! Your diversified approach is paying off beautifully.",
    icon: "🚀",
    type: "success" as const,
  },
  {
    id: "2",
    title: "Rebalancing Opportunity",
    message:
      "Your stocks are now 45% of portfolio (target: 40%). Consider taking some profits and diversifying into bonds or real estate.",
    icon: "⚖️",
    type: "warning" as const,
  },
  {
    id: "3",
    title: "Millionaire Progress",
    message:
      "You're 68% toward millionaire status! At current growth rate, you'll reach $1M in approximately 2.3 years.",
    icon: "💎",
    type: "info" as const,
  },
  {
    id: "4",
    title: "Achievement Unlocked",
    message:
      "Congratulations! You've earned the 'Diamond Hands' badge for holding through market volatility. Your patience is paying off!",
    icon: "🏆",
    type: "celebration" as const,
  },
];

export function PortfolioDetail() {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const { viewMode } = useUIStore();
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M" | "1Y" | "Max">(
    "1Y",
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);

  // Get asset data (in real app, this would fetch from API)
  const asset =
    mockAssetData[assetId as keyof typeof mockAssetData] || mockAssetData.tesla;
  const totalValue = portfolioAssets.reduce(
    (sum, asset) => sum + asset.value,
    0,
  );
  const todayChange = 8420; // Mock today's change

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        viewMode === "play"
          ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
          : "bg-gradient-to-br from-indigo-50 to-purple-50"
      }`}
    >
      {viewMode === "play" && <UniverseBackground starCount={30} />}

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
        {/* Ultimate Hero Section - Wealth Universe Explorer */}
        <FadeIn direction="down" delay={0.1} className="py-12">
          <div className="text-center mb-12">
            <motion.div
              className={`mb-8 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <SplitText>Your Financial Universe</SplitText>
              </h1>
              <motion.div
                className="text-2xl mb-2"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                🌌
              </motion.div>
              <p
                className={`text-xl ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
              >
                Explore your wealth like never before — every asset, every goal,
                every achievement
              </p>
            </motion.div>

            {/* AI Quick Insight Box */}
            <motion.div
              className={`max-w-2xl mx-auto p-6 rounded-2xl border mb-12 ${
                viewMode === "play"
                  ? "bg-white/10 backdrop-blur-sm border-white/20"
                  : "bg-white border-gray-200"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  className="text-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🤖
                </motion.div>
                <h3
                  className={`text-lg font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                >
                  AI Financial Coach
                </h3>
              </div>
              <p
                className={`${viewMode === "play" ? "text-white/80" : "text-gray-700"}`}
              >
                Your stock portfolio is carrying your growth (+15.2%), while
                crypto is volatile (-12%). You're 68% toward millionaire status
                — consider diversifying for stability! 🎯
              </p>
            </motion.div>
          </div>
        </FadeIn>

        {/* Wealth Wheel Hero Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <WealthWheel
            assets={portfolioAssets}
            totalValue={totalValue}
            todayChange={todayChange}
            onSliceClick={(assetId) => setSelectedCategory(assetId)}
            viewMode={viewMode}
          />
        </motion.div>

        {/* Navigation Breadcrumb */}
        {selectedCategory && (
          <motion.div
            className={`flex items-center gap-2 mb-8 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className="hover:underline"
            >
              Portfolio
            </button>
            <span>→</span>
            <span className="font-semibold capitalize">{selectedCategory}</span>
          </motion.div>
        )}

        {/* Category Detail View or Overview */}
        <AnimatePresence mode="wait">
          {selectedCategory ? (
            <motion.div
              key="category-detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <CategoryDetailView
                category={selectedCategory as any}
                data={
                  mockAssetData[selectedCategory as keyof typeof mockAssetData]
                    ?.categoryData || {}
                }
                viewMode={viewMode}
              />
            </motion.div>
          ) : (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Achievement System */}
              <div className="flex justify-between items-center mb-8">
                <h2
                  className={`text-3xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                >
                  🎮 Your Financial Journey
                </h2>
                <button
                  onClick={() => setShowAchievements(!showAchievements)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    viewMode === "play"
                      ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {showAchievements ? "Hide" : "Show"} Achievements 🏆
                </button>
              </div>

              <AnimatePresence>
                {showAchievements && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AchievementBadges
                      achievements={mockPortfolioAchievements}
                      viewMode={viewMode}
                      className="mb-12"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Performance Overview */}
              <motion.div
                className={`rounded-2xl p-8 border ${
                  viewMode === "play"
                    ? "bg-white/10 backdrop-blur-sm border-white/20"
                    : "bg-white border-gray-200"
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2
                    className={`text-2xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                  >
                    📊 Portfolio Performance Timeline
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

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    icon: "💰",
                    title: "Total Value",
                    value: formatCurrency(totalValue),
                    subtitle: "Portfolio Worth",
                  },
                  {
                    icon: "📈",
                    title: "Today's Change",
                    value: `+${formatCurrency(todayChange)}`,
                    subtitle: "+1.2% Growth",
                    color: "text-green-400",
                  },
                  {
                    icon: "🎯",
                    title: "Goal Progress",
                    value: "68%",
                    subtitle: "To Millionaire",
                    color: "text-blue-400",
                  },
                  {
                    icon: "🏆",
                    title: "Achievements",
                    value: `${mockPortfolioAchievements.filter((a) => a.earned).length}/${mockPortfolioAchievements.length}`,
                    subtitle: "Unlocked",
                    color: "text-yellow-400",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    className={`p-6 rounded-xl border ${
                      viewMode === "play"
                        ? "bg-white/10 backdrop-blur-sm border-white/20"
                        : "bg-white border-gray-200"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-3xl mb-3">{stat.icon}</div>
                    <div
                      className={`text-2xl font-bold mb-1 ${stat.color || (viewMode === "play" ? "text-white" : "text-gray-900")}`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                    >
                      {stat.subtitle}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AI Insights */}
              <SmartHighlights
                highlights={aiInsights}
                title="AI Portfolio Insights"
                subtitle="Your personal financial coach with actionable recommendations"
                className="mb-8"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
