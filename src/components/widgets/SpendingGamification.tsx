import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Target, Star, Award, Crown, Sparkles } from "lucide-react";
import {
  spendingGamificationAchievements,
  spendingGamificationChallenges,
  spendingGamificationStreakData,
  getRarityColor,
  getDifficultyColor,
  getProgressPercentage,
  type SpendingGamificationAchievement,
  type SpendingGamificationChallenge,
  type SpendingGamificationStreakData,
} from "../../../mockData/features/widgets";
import { ThemeAwareHeading, ThemeAwareText, useTheme } from "../../core";

// Using imported types from centralized mock data
type Achievement = SpendingGamificationAchievement;
type Challenge = SpendingGamificationChallenge;
type StreakData = SpendingGamificationStreakData;

interface SpendingGamificationProps {
  className?: string;
}

export function SpendingGamification({
  className = "",
}: SpendingGamificationProps) {
  const [activeTab, setActiveTab] = useState<
    "achievements" | "challenges" | "streaks"
  >("achievements");
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(
    null,
  );
  const { isPlayMode } = useTheme();

  // Using centralized mock data
  const mockAchievements: Achievement[] = spendingGamificationAchievements;
  const mockChallenges: Challenge[] = spendingGamificationChallenges;
  const streakData: StreakData = spendingGamificationStreakData;

  // Utility functions are now imported from centralized mock data

  const unlockedAchievements = mockAchievements.filter((a) => a.unlocked);
  const lockedAchievements = mockAchievements.filter((a) => !a.unlocked);

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <ThemeAwareHeading level="h3" className="text-2xl font-bold mb-2" gradient={isPlayMode}>
            Spending Achievements
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary">Level up your financial game</ThemeAwareText>
        </div>

        <div className="flex items-center gap-4">
          {/* Level Badge */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full px-4 py-2 flex items-center gap-2">
            <Crown className="w-5 h-5 text-white" />
            <span className="text-white font-bold">
              Level {streakData.level}
            </span>
          </div>

          {/* XP Progress */}
          <div className="bg-white/10 rounded-full px-4 py-2">
            <span className="text-white/80 text-sm">
              {streakData.current}/{streakData.nextLevelAt} XP
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-white/10 rounded-xl p-1 mb-6 max-w-md">
        {(["achievements", "challenges", "streaks"] as const).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
              activeTab === tab
                ? "bg-white/20 text-white"
                : "text-white/70 hover:text-white"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {activeTab === "achievements" && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Achievement Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: "Unlocked",
                  value: unlockedAchievements.length,
                  total: mockAchievements.length,
                  icon: "🏆",
                  color: "#F59E0B",
                },
                {
                  label: "Legendary",
                  value: unlockedAchievements.filter(
                    (a) => a.rarity === "legendary",
                  ).length,
                  total: mockAchievements.filter(
                    (a) => a.rarity === "legendary",
                  ).length,
                  icon: "👑",
                  color: "#F59E0B",
                },
                {
                  label: "This Month",
                  value: 2,
                  total: null,
                  icon: "⭐",
                  color: "#8B5CF6",
                },
                {
                  label: "Completion",
                  value: Math.round(
                    (unlockedAchievements.length / mockAchievements.length) *
                      100,
                  ),
                  total: null,
                  icon: "📊",
                  color: "#10B981",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/5 rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-white font-bold text-lg">
                    {stat.value}
                    {stat.total && `/${stat.total}`}
                    {stat.label === "Completion" && "%"}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Unlocked Achievements */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Unlocked Achievements ({unlockedAchievements.length})
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {unlockedAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 border border-white/20 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={() =>
                      setSelectedAchievement(
                        selectedAchievement === achievement.id
                          ? null
                          : achievement.id,
                      )
                    }
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2"
                        style={{
                          backgroundColor: achievement.color + "20",
                          borderColor: getRarityColor(achievement.rarity),
                        }}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-bold text-sm">
                          {achievement.title}
                        </div>
                        <div
                          className="text-xs px-2 py-1 rounded-full mt-1 inline-block"
                          style={{
                            backgroundColor:
                              getRarityColor(achievement.rarity) + "20",
                            color: getRarityColor(achievement.rarity),
                          }}
                        >
                          {achievement.rarity.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="text-white/80 text-sm mb-3">
                      {achievement.description}
                    </div>

                    {achievement.unlockedDate && (
                      <div className="text-white/60 text-xs">
                        Unlocked {achievement.unlockedDate.toLocaleDateString()}
                      </div>
                    )}

                    {/* Sparkle Effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{
                        background: [
                          "radial-gradient(circle at 20% 80%, rgba(255,215,0,0.1) 0%, transparent 50%)",
                          "radial-gradient(circle at 80% 20%, rgba(255,215,0,0.1) 0%, transparent 50%)",
                          "radial-gradient(circle at 40% 40%, rgba(255,215,0,0.1) 0%, transparent 50%)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Locked Achievements */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-gray-400" />
                In Progress ({lockedAchievements.length})
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lockedAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 border-dashed"
                        style={{
                          backgroundColor: achievement.color + "10",
                          borderColor: achievement.color + "40",
                        }}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-bold text-sm">
                          {achievement.title}
                        </div>
                        <div
                          className="text-xs px-2 py-1 rounded-full mt-1 inline-block"
                          style={{
                            backgroundColor:
                              getRarityColor(achievement.rarity) + "20",
                            color: getRarityColor(achievement.rarity),
                          }}
                        >
                          {achievement.rarity.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="text-white/80 text-sm mb-3">
                      {achievement.description}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span>Progress</span>
                        <span>
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: achievement.color }}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${getProgressPercentage(
                              achievement.progress,
                              achievement.maxProgress,
                            )}%`,
                          }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "challenges" && (
          <motion.div
            key="challenges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockChallenges.map((challenge, index) => {
                const progress = getProgressPercentage(
                  challenge.current,
                  challenge.target,
                );
                const daysLeft = Math.ceil(
                  (challenge.deadline.getTime() - Date.now()) /
                    (1000 * 60 * 60 * 24),
                );

                return (
                  <motion.div
                    key={challenge.id}
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                        style={{ backgroundColor: challenge.color + "20" }}
                      >
                        {challenge.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-bold">
                          {challenge.title}
                        </div>
                        <div
                          className="text-xs px-2 py-1 rounded-full mt-1 inline-block"
                          style={{
                            backgroundColor:
                              getDifficultyColor(challenge.difficulty) + "20",
                            color: getDifficultyColor(challenge.difficulty),
                          }}
                        >
                          {challenge.difficulty.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="text-white/80 text-sm mb-3">
                      {challenge.description}
                    </div>

                    {/* Progress */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-white/60 mb-1">
                        <span>Progress</span>
                        <span>
                          {challenge.current}/{challenge.target}
                        </span>
                      </div>
                      <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: challenge.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>

                    {/* Reward & Deadline */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/80">
                          {challenge.reward}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-400" />
                        <span className="text-white/80">
                          {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === "streaks" && (
          <motion.div
            key="streaks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Current Streak */}
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30">
              <div className="text-center">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🔥
                </motion.div>
                <div className="text-4xl font-bold text-white mb-2">
                  {streakData.current} Days
                </div>
                <div className="text-orange-300 text-lg mb-4">
                  Current Streak
                </div>
                <div className="text-white/80">
                  Keep logging your expenses to maintain your streak!
                </div>
              </div>
            </div>

            {/* Streak Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: "Current",
                  value: streakData.current,
                  icon: "🔥",
                  color: "#FF6B35",
                },
                {
                  label: "Longest",
                  value: streakData.longest,
                  icon: "🏆",
                  color: "#F59E0B",
                },
                {
                  label: "This Month",
                  value: streakData.thisMonth,
                  icon: "📅",
                  color: "#8B5CF6",
                },
                {
                  label: "Level",
                  value: streakData.level,
                  icon: "⭐",
                  color: "#10B981",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/5 rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-white font-bold text-xl">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Level Progress */}
            <div className="bg-white/5 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Level Progress
              </h4>
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>Level {streakData.level}</span>
                <span>Level {streakData.level + 1}</span>
              </div>
              <div className="h-4 bg-white/20 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(streakData.current / streakData.nextLevelAt) * 100}%`,
                  }}
                  transition={{ duration: 1.5 }}
                />
              </div>
              <div className="text-center text-white/80">
                {streakData.nextLevelAt - streakData.current} more days to level
                up!
              </div>
            </div>

            {/* Streak Milestones */}
            <div className="bg-white/5 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">
                Streak Milestones
              </h4>
              <div className="space-y-3">
                {[
                  { days: 7, reward: "Week Warrior Badge", unlocked: true },
                  { days: 15, reward: "Consistency Champion", unlocked: true },
                  { days: 30, reward: "Month Master + ฿500", unlocked: false },
                  {
                    days: 60,
                    reward: "Streak Legend + ฿1000",
                    unlocked: false,
                  },
                  {
                    days: 100,
                    reward: "Century Club + Premium Features",
                    unlocked: false,
                  },
                ].map((milestone, index) => (
                  <motion.div
                    key={milestone.days}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      milestone.unlocked
                        ? "bg-green-500/20 border border-green-500/30"
                        : streakData.current >= milestone.days
                          ? "bg-yellow-500/20 border border-yellow-500/30"
                          : "bg-white/5 border border-white/10"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          milestone.unlocked
                            ? "bg-green-500 text-white"
                            : streakData.current >= milestone.days
                              ? "bg-yellow-500 text-white"
                              : "bg-white/20 text-white/60"
                        }`}
                      >
                        {milestone.unlocked ? (
                          <Star className="w-4 h-4" />
                        ) : (
                          milestone.days
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {milestone.days} Day Streak
                        </div>
                        <div className="text-white/60 text-sm">
                          {milestone.reward}
                        </div>
                      </div>
                    </div>
                    {milestone.unlocked && (
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
