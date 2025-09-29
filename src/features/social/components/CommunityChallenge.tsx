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
  mockChallenges,
  type CommunityChallenge,
} from "../../../../mockData/features/social";

export interface CommunityChallengeProps {
  challenges?: CommunityChallenge[];
  onJoin?: (challengeId: string) => void;
  onLeave?: (challengeId: string) => void;
  className?: string;
}

// Re-export the type for other components
export type { CommunityChallenge } from "../../../../mockData/features/social";

export function CommunityChallengeWidget({
  challenges = mockChallenges,
  onJoin: _onJoin,
  onLeave: _onLeave,
  className,
}: CommunityChallengeProps) {
  const [selectedChallenge, setSelectedChallenge] =
    useState<CommunityChallenge | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
      case "hard":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "savings":
        return "💰";
      case "spending":
        return "💳";
      case "goals":
        return "🎯";
      case "habits":
        return "🔄";
      default:
        return "🏆";
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading level="h3" className="mb-2">
          Community Challenges
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary">
          Join others in achieving financial goals together
        </ThemeAwareText>
      </div>

      {/* Active Challenges */}
      <div className="space-y-4">
        {challenges
          .filter((c) => c.isActive)
          .map((challenge, index) => {
            const daysRemaining = getDaysRemaining(challenge.endDate);
            const participationRate =
              (challenge.participants / challenge.maxParticipants) * 100;

            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ThemeAwareCard
                  variant="elevated"
                  padding="lg"
                  hover
                  className="cursor-pointer"
                  onClick={() => setSelectedChallenge(challenge)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">
                      {getTypeIcon(challenge.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <ThemeAwareHeading level="h4" className="truncate">
                          {challenge.title.en}
                        </ThemeAwareHeading>
                        <span
                          className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full",
                            getDifficultyColor(challenge.difficulty),
                          )}
                        >
                          {challenge.difficulty}
                        </span>
                      </div>

                      <ThemeAwareText color="secondary" className="mb-3">
                        {challenge.description.en}
                      </ThemeAwareText>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <ThemeAwareText variant="caption" color="secondary">
                            Participants
                          </ThemeAwareText>
                          <ThemeAwareText className="font-semibold">
                            {challenge.participants}/{challenge.maxParticipants}
                          </ThemeAwareText>
                        </div>
                        <div>
                          <ThemeAwareText variant="caption" color="secondary">
                            Days Remaining
                          </ThemeAwareText>
                          <ThemeAwareText className="font-semibold">
                            {daysRemaining} days
                          </ThemeAwareText>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <ThemeAwareText variant="caption" color="secondary">
                            Participation
                          </ThemeAwareText>
                          <ThemeAwareText variant="caption" color="secondary">
                            {Math.round(participationRate)}%
                          </ThemeAwareText>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${participationRate}%` }}
                          />
                        </div>
                      </div>

                      {/* User Progress (if participating) */}
                      {challenge.userParticipating &&
                        challenge.progress !== undefined && (
                          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                              <ThemeAwareText
                                variant="caption"
                                className="font-medium"
                              >
                                Your Progress
                              </ThemeAwareText>
                              <ThemeAwareText
                                variant="caption"
                                className="font-medium"
                              >
                                {challenge.progress}%
                              </ThemeAwareText>
                            </div>
                            <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${challenge.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                      {/* Reward */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            {challenge.reward.value}
                          </span>
                          <ThemeAwareText variant="caption" color="secondary">
                            {challenge.reward.description.en}
                          </ThemeAwareText>
                        </div>

                        <ThemeAwareButton
                          variant={
                            challenge.userParticipating ? "outline" : "primary"
                          }
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (challenge.userParticipating) {
                              _onLeave?.(challenge.id);
                            } else {
                              _onJoin?.(challenge.id);
                            }
                          }}
                        >
                          {challenge.userParticipating ? "Leave" : "Join"}
                        </ThemeAwareButton>
                      </div>
                    </div>
                  </div>
                </ThemeAwareCard>
              </motion.div>
            );
          })}
      </div>

      {/* Challenge Detail Modal */}
      {selectedChallenge && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedChallenge(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl">
                    {getTypeIcon(selectedChallenge.type)}
                  </span>
                  <div>
                    <ThemeAwareHeading level="h2">
                      {selectedChallenge.title.en}
                    </ThemeAwareHeading>
                    <ThemeAwareText color="secondary">
                      {selectedChallenge.title.th}
                    </ThemeAwareText>
                  </div>
                </div>
                <ThemeAwareButton
                  variant="ghost"
                  onClick={() => setSelectedChallenge(null)}
                >
                  ✕
                </ThemeAwareButton>
              </div>

              <div className="space-y-4">
                <div>
                  <ThemeAwareText className="font-medium mb-2">
                    Challenge Description
                  </ThemeAwareText>
                  <ThemeAwareText>
                    {selectedChallenge.description.en}
                  </ThemeAwareText>
                  <ThemeAwareText className="mt-2 text-sm italic">
                    {selectedChallenge.description.th}
                  </ThemeAwareText>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <ThemeAwareText className="font-medium mb-1">
                      Duration
                    </ThemeAwareText>
                    <ThemeAwareText>
                      {selectedChallenge.duration} days
                    </ThemeAwareText>
                  </div>
                  <div>
                    <ThemeAwareText className="font-medium mb-1">
                      Difficulty
                    </ThemeAwareText>
                    <span
                      className={cn(
                        "text-sm font-medium px-2 py-1 rounded-full",
                        getDifficultyColor(selectedChallenge.difficulty),
                      )}
                    >
                      {selectedChallenge.difficulty}
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <ThemeAwareText className="font-medium mb-2">
                    Reward
                  </ThemeAwareText>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">
                      {selectedChallenge.reward.value}
                    </span>
                    <div>
                      <ThemeAwareText>
                        {selectedChallenge.reward.description.en}
                      </ThemeAwareText>
                      <ThemeAwareText variant="caption" color="secondary">
                        {selectedChallenge.reward.description.th}
                      </ThemeAwareText>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ThemeAwareButton
                    variant={
                      selectedChallenge.userParticipating
                        ? "outline"
                        : "primary"
                    }
                    onClick={() => {
                      if (selectedChallenge.userParticipating) {
                        _onLeave?.(selectedChallenge.id);
                      } else {
                        _onJoin?.(selectedChallenge.id);
                      }
                      setSelectedChallenge(null);
                    }}
                  >
                    {selectedChallenge.userParticipating
                      ? "Leave Challenge"
                      : "Join Challenge"}
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
