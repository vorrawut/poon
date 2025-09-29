import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, SplitText } from "../../../components/ui";
import {
  AccessibleHeading,
  AccessibleText,
  AccessibleButton,
} from "../../../core";
import {
  WealthSolarSystem,
  SmartHighlights,
  WealthTimeline,
  UniverseBackground,
  CategoryOverlay,
} from "../../../components/widgets";
import {
  mockPortfolioAssets,
  mockTimelineEvents,
  mockPortfolioHighlights,
  mockPortfolioCategoryData,
} from "../../../../mockData/features/portfolio";

import { useUIStore } from "../../../store/useUIStore";

export function Portfolio() {
  const { viewMode } = useUIStore();
  const [showTimeline, setShowTimeline] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);
  const [showCategoryOverlay, setShowCategoryOverlay] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const totalValue = mockPortfolioAssets.reduce(
    (sum, asset) => sum + asset.value,
    0,
  );
  const totalGrowth = mockPortfolioAssets.reduce(
    (sum, asset) => sum + (asset.value * asset.performance) / 100,
    0,
  );

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <UniverseBackground starCount={50} />

      {/* Navigation Controls */}
      <motion.div
        className="fixed top-24 right-8 z-50 flex gap-3"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <AccessibleButton
          variant="ghost"
          size="sm"
          onClick={() => setShowTimeline(!showTimeline)}
        >
          🕰 Timeline
        </AccessibleButton>
        <AccessibleButton
          variant="ghost"
          size="sm"
          onClick={() => setShowSimulation(!showSimulation)}
        >
          🔮 Simulate
        </AccessibleButton>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Universe Header */}
        <FadeIn direction="down">
          <div className="text-center mb-16">
            <AccessibleHeading level="h1" className="mb-4" gradient>
              <motion.span
                className="inline-block mr-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                ☀️
              </motion.span>
              <SplitText className="inline">Your Wealth Universe</SplitText>
            </AccessibleHeading>
            <AccessibleText
              color="secondary"
              className="max-w-2xl mx-auto mb-8"
            >
              {viewMode === "play"
                ? "Navigate your financial solar system — each planet represents your asset categories orbiting around your portfolio sun!"
                : "Clear overview of your portfolio performance with exact numbers and plain summaries."}
            </AccessibleText>

            {/* Portfolio Summary */}
            <motion.div
              className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center">
                <AccessibleHeading level="h2" className="text-white">
                  {formatCurrency(totalValue)}
                </AccessibleHeading>
                <div className="text-white/70 text-sm">Total Portfolio</div>
              </div>
              <div className="w-px h-16 bg-white/20"></div>
              <div className="text-center">
                <div
                  className={`text-2xl font-bold ${totalGrowth >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {totalGrowth >= 0 ? "+" : ""}
                  {formatCurrency(totalGrowth)}
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
              className="mb-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              <WealthSolarSystem
                assets={mockPortfolioAssets}
                totalValue={totalValue}
                onAssetClick={(assetId) => {
                  setSelectedCategory(assetId);
                  setShowCategoryOverlay(true);
                }}
              />
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
                  <AccessibleHeading level="h3" className="text-white">
                    Portfolio Assets
                  </AccessibleHeading>
                  <p className="text-white/70 text-sm">
                    Clear breakdown of your investments
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left px-6 py-4 text-white/70 font-medium">
                          Asset
                        </th>
                        <th className="text-right px-6 py-4 text-white/70 font-medium">
                          Value
                        </th>
                        <th className="text-right px-6 py-4 text-white/70 font-medium">
                          Performance
                        </th>
                        <th className="text-right px-6 py-4 text-white/70 font-medium">
                          Allocation
                        </th>
                        <th className="text-right px-6 py-4 text-white/70 font-medium">
                          Growth
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPortfolioAssets.map((asset) => (
                        <tr
                          key={asset.id}
                          className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                          onClick={() => {
                            setSelectedCategory(asset.id);
                            setShowCategoryOverlay(true);
                          }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{asset.icon}</div>
                              <div>
                                <div className="text-white font-medium">
                                  {asset.name}
                                </div>
                                <div className="text-white/60 text-sm">
                                  {asset.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right text-white font-bold">
                            {formatCurrency(asset.value)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span
                              className={`font-bold ${asset.performance >= 0 ? "text-green-400" : "text-red-400"}`}
                            >
                              {asset.performance >= 0 ? "+" : ""}
                              {asset.performance}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-blue-400 font-medium">
                            {asset.allocation}%
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span
                              className={`font-bold ${asset.performance >= 0 ? "text-green-400" : "text-red-400"}`}
                            >
                              {formatCurrency(
                                (asset.value * asset.performance) / 100,
                              )}
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
            <WealthTimeline events={mockTimelineEvents} className="mb-20" />
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
                    Drag sliders & see real-time projection — turns boring
                    finance math into an interactive game!
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Monthly Investment
                      </label>
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
                      <label className="block text-white/70 text-sm mb-2">
                        Expected Return (%)
                      </label>
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
                      <label className="block text-white/70 text-sm mb-2">
                        Time Horizon (Years)
                      </label>
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
                    <h3 className="text-xl font-bold text-white mb-4">
                      Projected Results
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-white/70">
                          Future Portfolio Value:
                        </span>
                        <span className="text-green-400 font-bold text-xl">
                          $1.2M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">
                          Total Contributions:
                        </span>
                        <span className="text-blue-400 font-bold">$600K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">
                          Investment Growth:
                        </span>
                        <span className="text-purple-400 font-bold">$600K</span>
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-yellow-400">
                            🎯
                          </div>
                          <p className="text-white/70 text-sm mt-2">
                            At this pace, you'll reach financial independence 5
                            years earlier!
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

        <SmartHighlights
          highlights={mockPortfolioHighlights}
          title="Smart Portfolio Insights"
          subtitle="Your personal portfolio newsfeed — like Spotify Wrapped, but every week! AI-powered insights with a friendly guide tone."
          className="mb-20"
        />
      </div>

      {/* Category Detail Overlay */}
      <CategoryOverlay
        isOpen={showCategoryOverlay}
        onClose={() => setShowCategoryOverlay(false)}
        initialCategory={selectedCategory || undefined}
        categories={mockPortfolioAssets}
        categoryData={mockPortfolioCategoryData}
        viewMode={viewMode}
      />
    </div>
  );
}
