import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  requirement: string;
}

interface Streak {
  id: string;
  name: string;
  description: string;
  icon: string;
  currentCount: number;
  bestCount: number;
  isActive: boolean;
  lastUpdated: string;
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  reward: string;
  difficulty: "easy" | "medium" | "hard";
  timeLeft: string;
  isCompleted: boolean;
}

interface GamificationLayerProps {
  badges: Badge[];
  streaks: Streak[];
  challenges: Challenge[];
  totalPoints: number;
  level: number;
  nextLevelPoints: number;
  viewMode?: "play" | "clarity";
  className?: string;
}

export function GamificationLayer({
  badges,
  streaks,
  challenges,
  totalPoints,
  level,
  nextLevelPoints,
  viewMode = "play",
  className = "",
}: GamificationLayerProps) {
  const [activeTab, setActiveTab] = useState<"badges" | "streaks" | "challenges">("badges");
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "from-gray-400 to-gray-600";
      case "rare": return "from-blue-400 to-blue-600";
      case "epic": return "from-purple-400 to-purple-600";
      case "legendary": return "from-yellow-400 to-orange-500";
      default: return "from-gray-400 to-gray-600";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "hard": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const earnedBadges = badges.filter(badge => badge.earned);
  const unearnedBadges = badges.filter(badge => !badge.earned);
  const activeStreaks = streaks.filter(streak => streak.isActive);
  const activeChallenges = challenges.filter(challenge => !challenge.isCompleted);

  const levelProgress = (totalPoints % 1000) / 10; // Assuming 1000 points per level

  return (
    <div className={`${className}`}>
      <div
        className={`rounded-2xl p-6 border ${
          viewMode === "play"
            ? "bg-white/10 backdrop-blur-sm border-white/20"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Header with Level & Points */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              className={`relative w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-4 ${
                viewMode === "play"
                  ? "bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-300"
                  : "bg-gradient-to-br from-blue-400 to-purple-500 border-blue-300"
              }`}
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(255, 215, 0, 0.3)",
                  "0 0 30px rgba(255, 215, 0, 0.6)",
                  "0 0 20px rgba(255, 215, 0, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {level}
              
              {/* Level Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - levelProgress / 100)}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - levelProgress / 100) }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
            </motion.div>

            <div>
              <h3
                className={`text-2xl font-bold ${
                  viewMode === "play" ? "text-white" : "text-gray-900"
                }`}
              >
                Level {level} Financial Hero
              </h3>
              <p
                className={`text-sm ${
                  viewMode === "play" ? "text-white/70" : "text-gray-600"
                }`}
              >
                {totalPoints.toLocaleString()} points • {(nextLevelPoints - (totalPoints % 1000)).toLocaleString()} to next level
              </p>
              
              {/* Progress Bar */}
              <div className={`w-48 h-2 rounded-full mt-2 ${
                viewMode === "play" ? "bg-white/20" : "bg-gray-200"
              }`}>
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="text-right">
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {earnedBadges.length}
                </div>
                <div
                  className={`text-xs ${
                    viewMode === "play" ? "text-white/70" : "text-gray-600"
                  }`}
                >
                  Badges
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {activeStreaks.length}
                </div>
                <div
                  className={`text-xs ${
                    viewMode === "play" ? "text-white/70" : "text-gray-600"
                  }`}
                >
                  Streaks
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {activeChallenges.length}
                </div>
                <div
                  className={`text-xs ${
                    viewMode === "play" ? "text-white/70" : "text-gray-600"
                  }`}
                >
                  Challenges
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "badges", label: "🏆 Badges", count: earnedBadges.length },
            { id: "streaks", label: "🔥 Streaks", count: activeStreaks.length },
            { id: "challenges", label: "🎯 Challenges", count: activeChallenges.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? viewMode === "play"
                    ? "bg-white/20 text-white border border-white/30"
                    : "bg-blue-50 text-blue-600 border border-blue-200"
                  : viewMode === "play"
                    ? "hover:bg-white/10 text-white/70"
                    : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              {tab.label}
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "badges" && (
            <motion.div
              key="badges"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Earned Badges */}
              <div>
                <h4
                  className={`text-lg font-bold mb-4 ${
                    viewMode === "play" ? "text-white" : "text-gray-900"
                  }`}
                >
                  🎉 Earned Badges ({earnedBadges.length})
                </h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {earnedBadges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      className={`relative p-4 rounded-xl cursor-pointer border ${
                        selectedBadge === badge.id
                          ? "ring-2 ring-yellow-400"
                          : ""
                      }`}
                      style={{
                        background: viewMode === "play" 
                          ? `linear-gradient(135deg, ${getRarityColor(badge.rarity).split(' ')[1]}, ${getRarityColor(badge.rarity).split(' ')[3]})`
                          : "white"
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      onClick={() => setSelectedBadge(selectedBadge === badge.id ? null : badge.id)}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <div className="text-sm font-bold text-white mb-1">
                          {badge.name}
                        </div>
                        <div className="text-xs text-white/80">
                          {badge.earnedDate}
                        </div>
                      </div>

                      {/* Rarity Indicator */}
                      <div className="absolute top-1 right-1">
                        <div className={`w-2 h-2 rounded-full ${
                          badge.rarity === "legendary" ? "bg-yellow-400" :
                          badge.rarity === "epic" ? "bg-purple-400" :
                          badge.rarity === "rare" ? "bg-blue-400" : "bg-gray-400"
                        }`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Progress Badges */}
              <div>
                <h4
                  className={`text-lg font-bold mb-4 ${
                    viewMode === "play" ? "text-white" : "text-gray-900"
                  }`}
                >
                  🎯 In Progress ({unearnedBadges.length})
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {unearnedBadges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      className={`p-4 rounded-xl border ${
                        viewMode === "play"
                          ? "bg-white/5 border-white/10"
                          : "bg-gray-50 border-gray-100"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl opacity-50">{badge.icon}</div>
                        <div className="flex-1">
                          <div
                            className={`font-semibold ${
                              viewMode === "play" ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {badge.name}
                          </div>
                          <div
                            className={`text-sm ${
                              viewMode === "play" ? "text-white/70" : "text-gray-600"
                            }`}
                          >
                            {badge.description}
                          </div>
                          
                          {badge.progress !== undefined && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span
                                  className={`${
                                    viewMode === "play" ? "text-white/60" : "text-gray-500"
                                  }`}
                                >
                                  Progress
                                </span>
                                <span
                                  className={`${
                                    viewMode === "play" ? "text-white/60" : "text-gray-500"
                                  }`}
                                >
                                  {badge.progress}%
                                </span>
                              </div>
                              <div className={`w-full h-2 rounded-full ${
                                viewMode === "play" ? "bg-white/20" : "bg-gray-200"
                              }`}>
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                                  style={{ width: `${badge.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "streaks" && (
            <motion.div
              key="streaks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {streaks.map((streak, index) => (
                <motion.div
                  key={streak.id}
                  className={`p-4 rounded-xl border ${
                    streak.isActive
                      ? viewMode === "play"
                        ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-400/30"
                        : "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200"
                      : viewMode === "play"
                        ? "bg-white/5 border-white/10"
                        : "bg-gray-50 border-gray-100"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="text-2xl">{streak.icon}</div>
                        {streak.isActive && (
                          <motion.div
                            className="absolute -top-1 -right-1 text-xs"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            🔥
                          </motion.div>
                        )}
                      </div>
                      <div>
                        <div
                          className={`font-semibold ${
                            viewMode === "play" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {streak.name}
                        </div>
                        <div
                          className={`text-sm ${
                            viewMode === "play" ? "text-white/70" : "text-gray-600"
                          }`}
                        >
                          {streak.description}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-400">
                        {streak.currentCount}
                      </div>
                      <div
                        className={`text-xs ${
                          viewMode === "play" ? "text-white/60" : "text-gray-500"
                        }`}
                      >
                        Best: {streak.bestCount}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "challenges" && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  className={`p-4 rounded-xl border ${
                    challenge.isCompleted
                      ? viewMode === "play"
                        ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30"
                        : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                      : viewMode === "play"
                        ? "bg-white/5 border-white/10"
                        : "bg-gray-50 border-gray-100"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{challenge.icon}</div>
                      <div>
                        <div
                          className={`font-semibold ${
                            viewMode === "play" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {challenge.name}
                        </div>
                        <div
                          className={`text-sm ${
                            viewMode === "play" ? "text-white/70" : "text-gray-600"
                          }`}
                        >
                          {challenge.description}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty.toUpperCase()}
                      </div>
                      <div
                        className={`text-xs ${
                          viewMode === "play" ? "text-white/60" : "text-gray-500"
                        }`}
                      >
                        {challenge.timeLeft}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span
                        className={`${
                          viewMode === "play" ? "text-white/80" : "text-gray-700"
                        }`}
                      >
                        Progress: {challenge.progress}/{challenge.target}
                      </span>
                      <span
                        className={`${
                          viewMode === "play" ? "text-white/80" : "text-gray-700"
                        }`}
                      >
                        {Math.round((challenge.progress / challenge.target) * 100)}%
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${
                      viewMode === "play" ? "bg-white/20" : "bg-gray-200"
                    }`}>
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Reward */}
                  <div className="flex items-center gap-2">
                    <Gift size={16} className="text-yellow-400" />
                    <span
                      className={`text-sm ${
                        viewMode === "play" ? "text-white/80" : "text-gray-700"
                      }`}
                    >
                      Reward: {challenge.reward}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge Detail Modal */}
        <AnimatePresence>
          {selectedBadge && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBadge(null)}
            >
              <motion.div
                className={`max-w-md w-full rounded-2xl p-6 border ${
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
                  const badge = badges.find(b => b.id === selectedBadge);
                  if (!badge) return null;
                  
                  return (
                    <>
                      <div className="text-center mb-6">
                        <div className="text-6xl mb-4">{badge.icon}</div>
                        <h3
                          className={`text-2xl font-bold mb-2 ${
                            viewMode === "play" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {badge.name}
                        </h3>
                        <p
                          className={`text-sm ${
                            viewMode === "play" ? "text-white/70" : "text-gray-600"
                          }`}
                        >
                          {badge.description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span
                            className={`${
                              viewMode === "play" ? "text-white/80" : "text-gray-700"
                            }`}
                          >
                            Rarity:
                          </span>
                          <span className={`font-semibold capitalize ${
                            badge.rarity === "legendary" ? "text-yellow-400" :
                            badge.rarity === "epic" ? "text-purple-400" :
                            badge.rarity === "rare" ? "text-blue-400" : "text-gray-400"
                          }`}>
                            {badge.rarity}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span
                            className={`${
                              viewMode === "play" ? "text-white/80" : "text-gray-700"
                            }`}
                          >
                            Status:
                          </span>
                          <span className={`font-semibold ${
                            badge.earned ? "text-green-400" : "text-yellow-400"
                          }`}>
                            {badge.earned ? "Earned" : "In Progress"}
                          </span>
                        </div>

                        {badge.earned && badge.earnedDate && (
                          <div className="flex justify-between">
                            <span
                              className={`${
                                viewMode === "play" ? "text-white/80" : "text-gray-700"
                              }`}
                            >
                              Earned:
                            </span>
                            <span
                              className={`${
                                viewMode === "play" ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {badge.earnedDate}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span
                            className={`${
                              viewMode === "play" ? "text-white/80" : "text-gray-700"
                            }`}
                          >
                            Requirement:
                          </span>
                          <span
                            className={`text-sm ${
                              viewMode === "play" ? "text-white/70" : "text-gray-600"
                            }`}
                          >
                            {badge.requirement}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedBadge(null)}
                        className="w-full mt-6 py-3 rounded-xl font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                      >
                        Close
                      </button>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
