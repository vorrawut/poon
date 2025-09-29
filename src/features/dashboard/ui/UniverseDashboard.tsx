import { useState } from "react";
import { motion } from "framer-motion";
import { FinancialUniverse } from "../../../components/financial-universe";
import { DailyMoodStoryCard } from "../../../components/financial-universe/DailyMoodStoryCard";
import { useNetWorth } from "../../networth/hooks/useNetWorth";

export function UniverseDashboard() {
  const [showDetailedView, setShowDetailedView] = useState(false);
  const { netWorthData } = useNetWorth();

  const handleQuickAction = (action: string, data?: unknown) => {
    console.log("Universe quick action:", action, data);

    switch (action) {
      case "detailed_view":
        setShowDetailedView(true);
        break;
      case "quick_actions":
        // Open quick actions panel
        break;
      case "analytics":
        // Navigate to analytics
        break;
      case "settings":
        // Navigate to settings
        break;
      default:
        console.log("Unhandled universe action:", action);
    }
  };

  if (showDetailedView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back to Universe Button */}
          <motion.button
            onClick={() => setShowDetailedView(false)}
            className="mb-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">🌌</span>
            Back to Universe
          </motion.button>

          {/* Detailed Views Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Daily Mood Story */}
            {netWorthData && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <DailyMoodStoryCard
                  netWorth={netWorthData.totalNetWorth}
                  netWorthChange={netWorthData.netWorthChange}
                  monthlySpending={3450}
                  spendingChange={7.8}
                  savingsRate={22.5}
                  topSpendingCategory="food"
                />
              </motion.div>
            )}

            {/* Additional Detail Widgets */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Placeholder for additional widgets */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">
                  📊 Financial Insights
                </h3>
                <p className="text-gray-600">
                  Detailed analytics and insights coming soon...
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4">🎯 Goal Tracker</h3>
                <p className="text-gray-600">
                  Advanced goal tracking and progress visualization...
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <FinancialUniverse onQuickAction={handleQuickAction} className="h-full" />

      {/* Floating Navigation */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          onClick={() => setShowDetailedView(true)}
          className="bg-white/90 backdrop-blur-sm border border-white/20 text-gray-800 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-2">🔭</span>
          Detailed View
        </motion.button>
      </motion.div>

      {/* Optional: Universe Controls */}
      <motion.div
        className="fixed top-24 right-8 z-40 space-y-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          className="bg-black/20 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full hover:bg-black/30 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Toggle Fullscreen"
        >
          ⛶
        </motion.button>

        <motion.button
          className="bg-black/20 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full hover:bg-black/30 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Universe Settings"
        >
          ⚙️
        </motion.button>
      </motion.div>
    </div>
  );
}

export default UniverseDashboard;
