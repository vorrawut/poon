import { motion } from "framer-motion";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number; // 0-100 for progress towards earning
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface AchievementBadgesProps {
  achievements: Achievement[];
  className?: string;
  viewMode?: "play" | "clarity";
}

export function AchievementBadges({
  achievements,
  className = "",
  viewMode = "play",
}: AchievementBadgesProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "from-gray-400 to-gray-600";
      case "rare":
        return "from-blue-400 to-blue-600";
      case "epic":
        return "from-purple-400 to-purple-600";
      case "legendary":
        return "from-yellow-400 to-yellow-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "rgba(156, 163, 175, 0.3)";
      case "rare":
        return "rgba(59, 130, 246, 0.4)";
      case "epic":
        return "rgba(139, 92, 246, 0.4)";
      case "legendary":
        return "rgba(245, 158, 11, 0.5)";
      default:
        return "rgba(156, 163, 175, 0.3)";
    }
  };

  const earnedAchievements = achievements.filter((a) => a.earned);
  const inProgressAchievements = achievements.filter(
    (a) => !a.earned && a.progress && a.progress > 0,
  );
  const lockedAchievements = achievements.filter(
    (a) => !a.earned && (!a.progress || a.progress === 0),
  );

  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2
          className={`text-3xl font-bold mb-2 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
        >
          🏆 Your Achievements
        </h2>
        <p
          className={`${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
        >
          {earnedAchievements.length} of {achievements.length} unlocked • Keep
          building your financial legacy!
        </p>
      </div>

      {/* Progress Overview */}
      <div className="mb-8">
        <div
          className={`flex justify-between items-center mb-2 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
        >
          <span className="text-sm font-medium">Achievement Progress</span>
          <span className="text-sm">
            {Math.round(
              (earnedAchievements.length / achievements.length) * 100,
            )}
            %
          </span>
        </div>
        <div
          className={`w-full h-3 rounded-full ${viewMode === "play" ? "bg-white/10" : "bg-gray-200"}`}
        >
          <motion.div
            className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
            initial={{ width: 0 }}
            animate={{
              width: `${(earnedAchievements.length / achievements.length) * 100}%`,
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))",
            }}
          />
        </div>
      </div>

      {/* Earned Achievements */}
      {earnedAchievements.length > 0 && (
        <div className="mb-8">
          <h3
            className={`text-xl font-bold mb-4 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
          >
            ✨ Earned Badges
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {earnedAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`relative p-4 rounded-xl border-2 ${
                  viewMode === "play"
                    ? "bg-white/10 backdrop-blur-sm border-white/20"
                    : "bg-white border-gray-200"
                } cursor-pointer group`}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{
                  boxShadow: `0 0 20px ${getRarityGlow(achievement.rarity)}`,
                }}
              >
                {/* Rarity border glow */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${getRarityColor(achievement.rarity)} opacity-20 group-hover:opacity-30 transition-opacity`}
                />

                {/* Achievement content */}
                <div className="relative z-10 text-center">
                  <motion.div
                    className="text-4xl mb-2"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <h4
                    className={`font-bold text-sm mb-1 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                  >
                    {achievement.title}
                  </h4>
                  <p
                    className={`text-xs ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                  >
                    {achievement.description}
                  </p>

                  {/* Rarity indicator */}
                  <div
                    className={`mt-2 px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}
                  >
                    {achievement.rarity.toUpperCase()}
                  </div>
                </div>

                {/* Sparkle effect for legendary */}
                {achievement.rarity === "legendary" && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      background: [
                        "radial-gradient(circle at 20% 20%, rgba(255,215,0,0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 80%, rgba(255,215,0,0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 20% 80%, rgba(255,215,0,0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 20%, rgba(255,215,0,0.3) 0%, transparent 50%)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Achievements */}
      {inProgressAchievements.length > 0 && (
        <div className="mb-8">
          <h3
            className={`text-xl font-bold mb-4 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
          >
            🎯 Almost There!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgressAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`p-4 rounded-xl border ${
                  viewMode === "play"
                    ? "bg-white/5 backdrop-blur-sm border-white/10"
                    : "bg-gray-50 border-gray-200"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl opacity-60">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4
                      className={`font-bold mb-1 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                    >
                      {achievement.title}
                    </h4>
                    <p
                      className={`text-sm mb-2 ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                    >
                      {achievement.description}
                    </p>

                    {/* Progress bar */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex-1 h-2 rounded-full ${viewMode === "play" ? "bg-white/10" : "bg-gray-200"}`}
                      >
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${achievement.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                      >
                        {achievement.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements (preview) */}
      {lockedAchievements.length > 0 && (
        <div>
          <h3
            className={`text-xl font-bold mb-4 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
          >
            🔒 Locked Achievements
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {lockedAchievements.slice(0, 6).map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`aspect-square p-3 rounded-lg border ${
                  viewMode === "play"
                    ? "bg-white/5 border-white/10"
                    : "bg-gray-100 border-gray-200"
                } text-center opacity-50 cursor-pointer group`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ opacity: 0.8, scale: 1.05 }}
              >
                <div className="text-2xl mb-1 grayscale">
                  {achievement.icon}
                </div>
                <div
                  className={`text-xs font-medium ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                >
                  ???
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
