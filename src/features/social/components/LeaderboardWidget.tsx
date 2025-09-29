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
  mockLeaderboard,
  type LeaderboardEntry,
} from "../../../../mockData/features/social";

export interface LeaderboardWidgetProps {
  leaderboard?: LeaderboardEntry[];
  category?: string;
  period?: string;
  onCategoryChange?: (category: string) => void;
  onPeriodChange?: (period: string) => void;
  className?: string;
}

// Re-export the type for other components
export type { LeaderboardEntry } from "../../../../mockData/features/social";

export function LeaderboardWidget({
  leaderboard = mockLeaderboard,
  period = "monthly",
  onCategoryChange: _onCategoryChange,
  onPeriodChange: _onPeriodChange,
  className,
}: LeaderboardWidgetProps) {
  const [selectedPeriod, setSelectedPeriod] = useState(period);

  const formatScore = (score: number) => {
    return new Intl.NumberFormat("th-TH").format(score);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🏆";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <ThemeAwareHeading level="h3">Leaderboard</ThemeAwareHeading>

        <select
          value={selectedPeriod}
          onChange={(e) => {
            setSelectedPeriod(e.target.value);
            _onPeriodChange?.(e.target.value);
          }}
          className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
        >
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
          <option value="yearly">This Year</option>
        </select>
      </div>

      {/* Leaderboard List */}
      <ThemeAwareCard variant="elevated" padding="md">
        <div className="space-y-3">
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-lg",
                entry.isCurrentUser
                  ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800",
              )}
            >
              <div className="flex items-center justify-center w-8 h-8">
                <span className="text-lg font-bold">
                  {getRankIcon(entry.rank)}
                </span>
              </div>

              <div className="text-2xl">{entry.avatar}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <ThemeAwareText className="font-medium truncate">
                    {entry.username}
                  </ThemeAwareText>
                  {entry.badge && (
                    <span className="text-sm">{entry.badge}</span>
                  )}
                  {entry.isCurrentUser && (
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">
                      You
                    </span>
                  )}
                </div>
                <ThemeAwareText variant="caption" color="secondary">
                  {formatScore(entry.score)} points • {entry.achievements}{" "}
                  achievements
                </ThemeAwareText>
              </div>

              <div className="text-right">
                <ThemeAwareText className="font-semibold">
                  {entry.goalCompletionRate}%
                </ThemeAwareText>
                <ThemeAwareText variant="caption" color="secondary">
                  completion
                </ThemeAwareText>
              </div>
            </motion.div>
          ))}
        </div>
      </ThemeAwareCard>

      {/* View All Button */}
      <div className="text-center">
        <ThemeAwareButton variant="outline">
          View Full Leaderboard
        </ThemeAwareButton>
      </div>
    </div>
  );
}
