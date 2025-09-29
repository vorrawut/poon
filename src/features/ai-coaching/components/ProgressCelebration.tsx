import { useState } from "react";
import { motion } from "framer-motion";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
} from "../../../core";
import { cn } from "../../../libs/utils";
import {
  mockAchievements,
  mockProgressUpdates,
  type Achievement,
  type ProgressUpdate,
} from "../../../../mockData/features/social";

export interface ProgressCelebrationProps {
  achievements?: Achievement[];
  progressUpdates?: ProgressUpdate[];
  onShare?: (achievementId: string) => void;
  className?: string;
}

// Re-export the types for other components
export type {
  Achievement,
  ProgressUpdate,
} from "../../../../mockData/features/social";

export function ProgressCelebration({
  achievements = mockAchievements,
  progressUpdates = mockProgressUpdates,
  onShare: _onShare,
  className,
}: ProgressCelebrationProps) {
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700";
      case "rare":
        return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700";
      case "uncommon":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700";
      case "common":
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700";
    }
  };

  const getCelebrationLevel = (level: string) => {
    switch (level) {
      case "large":
        return "🎉🎊✨";
      case "medium":
        return "🎉✨";
      case "small":
        return "✨";
      default:
        return "🎯";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading level="h3" className="mb-2">
          🏆 Achievements & Progress
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary">
          Celebrate your financial milestones
        </ThemeAwareText>
      </div>

      {/* Recent Progress Updates */}
      {progressUpdates.length > 0 && (
        <div className="space-y-4">
          <ThemeAwareHeading level="h4">Recent Progress</ThemeAwareHeading>

          {progressUpdates.slice(0, 3).map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ThemeAwareCard variant="outlined" padding="md">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">
                    {getCelebrationLevel(update.celebrationLevel)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <ThemeAwareHeading level="h5" className="mb-1">
                      {update.title.en}
                    </ThemeAwareHeading>
                    <ThemeAwareText color="secondary" className="mb-2">
                      {update.description.en}
                    </ThemeAwareText>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ThemeAwareText className="font-semibold">
                          {formatCurrency(update.value)}
                        </ThemeAwareText>
                        <ThemeAwareText variant="caption" color="secondary">
                          {update.unit}
                        </ThemeAwareText>
                      </div>

                      <ThemeAwareText variant="caption" color="secondary">
                        {new Date(update.timestamp).toLocaleDateString("th-TH")}
                      </ThemeAwareText>
                    </div>
                  </div>
                </div>
              </ThemeAwareCard>
            </motion.div>
          ))}
        </div>
      )}

      {/* Achievements */}
      <div className="space-y-4">
        <ThemeAwareHeading level="h4">Achievements</ThemeAwareHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ThemeAwareCard
                variant="outlined"
                padding="md"
                hover
                className={cn(
                  "cursor-pointer border-2",
                  getRarityColor(achievement.rarity),
                  !achievement.isUnlocked && "opacity-60",
                )}
                onClick={() => setSelectedAchievement(achievement)}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-3xl opacity-80">
                    {achievement.isUnlocked ? achievement.icon : "🔒"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <ThemeAwareText className="font-medium">
                        {achievement.title.en}
                      </ThemeAwareText>
                      <span
                        className={cn(
                          "text-xs font-medium px-2 py-1 rounded-full",
                          getRarityColor(achievement.rarity),
                        )}
                      >
                        {achievement.rarity}
                      </span>
                    </div>

                    <ThemeAwareText
                      variant="caption"
                      color="secondary"
                      className="mb-2"
                    >
                      {achievement.description.en}
                    </ThemeAwareText>

                    {achievement.isUnlocked ? (
                      <div className="flex items-center justify-between">
                        <ThemeAwareText
                          variant="caption"
                          className="text-green-600"
                        >
                          ✅ Unlocked
                        </ThemeAwareText>
                        <ThemeAwareText variant="caption" color="secondary">
                          {new Date(achievement.unlockedAt).toLocaleDateString(
                            "th-TH",
                          )}
                        </ThemeAwareText>
                      </div>
                    ) : (
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </ThemeAwareCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedAchievement(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">
                  {selectedAchievement.isUnlocked
                    ? selectedAchievement.icon
                    : "🔒"}
                </div>
                <ThemeAwareHeading level="h3">
                  {selectedAchievement.title.en}
                </ThemeAwareHeading>
                <ThemeAwareText color="secondary">
                  {selectedAchievement.title.th}
                </ThemeAwareText>
              </div>

              <div className="space-y-4">
                <div>
                  <ThemeAwareText className="font-medium mb-2">
                    Description
                  </ThemeAwareText>
                  <ThemeAwareText>
                    {selectedAchievement.description.en}
                  </ThemeAwareText>
                  <ThemeAwareText className="mt-2 text-sm italic">
                    {selectedAchievement.description.th}
                  </ThemeAwareText>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <ThemeAwareText className="font-medium mb-1">
                      Category
                    </ThemeAwareText>
                    <ThemeAwareText>
                      {selectedAchievement.category}
                    </ThemeAwareText>
                  </div>
                  <div>
                    <ThemeAwareText className="font-medium mb-1">
                      Rarity
                    </ThemeAwareText>
                    <span
                      className={cn(
                        "text-sm font-medium px-2 py-1 rounded-full",
                        getRarityColor(selectedAchievement.rarity),
                      )}
                    >
                      {selectedAchievement.rarity}
                    </span>
                  </div>
                </div>

                {!selectedAchievement.isUnlocked && (
                  <div>
                    <ThemeAwareText className="font-medium mb-2">
                      Progress
                    </ThemeAwareText>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${(selectedAchievement.progress / selectedAchievement.maxProgress) * 100}%`,
                        }}
                      />
                    </div>
                    <ThemeAwareText variant="caption" color="secondary">
                      {selectedAchievement.progress} /{" "}
                      {selectedAchievement.maxProgress}
                    </ThemeAwareText>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  {selectedAchievement.isUnlocked && (
                    <ThemeAwareButton
                      variant="primary"
                      onClick={() => {
                        _onShare?.(selectedAchievement.id);
                        setSelectedAchievement(null);
                      }}
                    >
                      Share Achievement
                    </ThemeAwareButton>
                  )}
                  <ThemeAwareButton
                    variant="outline"
                    onClick={() => setSelectedAchievement(null)}
                  >
                    Close
                  </ThemeAwareButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
