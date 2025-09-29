import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ThemeAwareCard, 
  ThemeAwareText, 
  ThemeAwareButton,
  ThemeAwareHeading
} from "../../../core";
import { useTranslation } from "../../../libs/i18n";
import { cn } from "../../../libs/utils";

// Leaderboard Types
export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  displayName: string;
  avatar: string;
  score: number;
  change: number; // rank change from last period
  badge?: string;
  isCurrentUser?: boolean;
}

export interface LeaderboardWidgetProps {
  leaderboard?: LeaderboardEntry[];
  category?: "savings" | "goals" | "cultural" | "overall";
  period?: "weekly" | "monthly" | "yearly" | "all-time";
  onCategoryChange?: (category: string) => void;
  onPeriodChange?: (period: string) => void;
  className?: string;
}

// Mock Leaderboard Data
const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: "leader1",
    rank: 1,
    username: "savings_legend",
    displayName: "Legend นักออม",
    avatar: "👑",
    score: 125000,
    change: 0,
    badge: "🏆"
  },
  {
    id: "leader2", 
    rank: 2,
    username: "goal_master",
    displayName: "Master เป้าหมาย",
    avatar: "🎯",
    score: 98500,
    change: 1,
    badge: "🥈"
  },
  {
    id: "current_user",
    rank: 3,
    username: "financial_ninja_th",
    displayName: "Alex นักออม",
    avatar: "🚀",
    score: 85000,
    change: -1,
    isCurrentUser: true,
    badge: "🥉"
  },
  {
    id: "leader4",
    rank: 4,
    username: "thai_saver",
    displayName: "Thai นักออม",
    avatar: "🇹🇭",
    score: 72000,
    change: 2
  },
  {
    id: "leader5",
    rank: 5,
    username: "merit_maker",
    displayName: "นักทำบุญ",
    avatar: "🙏",
    score: 68500,
    change: -1
  }
];

export function LeaderboardWidget({
  leaderboard = mockLeaderboard,
  category = "overall",
  period = "monthly",
  onCategoryChange,
  onPeriodChange,
  className = "",
}: LeaderboardWidgetProps) {
  const { language: _language } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const displayedEntries = showAll ? leaderboard : leaderboard.slice(0, 5);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'savings': return '💰';
      case 'goals': return '🎯';
      case 'cultural': return '🙏';
      default: return '🏆';
    }
  };

  const getPeriodText = (per: string) => {
    switch (per) {
      case 'weekly': return 'This Week';
      case 'monthly': return 'This Month';
      case 'yearly': return 'This Year';
      case 'all-time': return 'All Time';
      default: return 'This Month';
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <ThemeAwareCard className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <ThemeAwareHeading level="h3" className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
            {getCategoryIcon(category)} Leaderboard
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary" className="text-sm">
            {getPeriodText(period)} • {category.charAt(0).toUpperCase() + category.slice(1)}
          </ThemeAwareText>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 justify-center flex-wrap">
          {(['overall', 'savings', 'goals', 'cultural'] as const).map((cat) => (
            <ThemeAwareButton
              key={cat}
              variant={category === cat ? "primary" : "ghost"}
              size="sm"
              onClick={() => onCategoryChange?.(cat)}
              className="capitalize"
            >
              {getCategoryIcon(cat)} {cat}
            </ThemeAwareButton>
          ))}
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-6 justify-center flex-wrap">
          {(['weekly', 'monthly', 'yearly', 'all-time'] as const).map((per) => (
            <ThemeAwareButton
              key={per}
              variant={period === per ? "primary" : "ghost"}
              size="sm"
              onClick={() => onPeriodChange?.(per)}
              className="text-xs"
            >
              {getPeriodText(per)}
            </ThemeAwareButton>
          ))}
        </div>

        {/* Leaderboard Entries */}
        <div className="space-y-3">
          {displayedEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={cn(
                "flex items-center justify-between p-3 rounded-lg transition-all duration-300",
                entry.isCurrentUser 
                  ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30" 
                  : "bg-gray-800/50 hover:bg-gray-800/70",
                entry.rank <= 3 && "border border-yellow-500/30"
              )}>
                <div className="flex items-center gap-3">
                  {/* Rank */}
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                    entry.rank === 1 ? "bg-yellow-500 text-black" :
                    entry.rank === 2 ? "bg-gray-400 text-black" :
                    entry.rank === 3 ? "bg-amber-600 text-black" :
                    "bg-gray-700 text-white"
                  )}>
                    {entry.rank}
                  </div>
                  
                  {/* Avatar and Info */}
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{entry.avatar}</div>
                    <div>
                      <div className="font-semibold flex items-center gap-2">
                        {entry.displayName}
                        {entry.badge && <span>{entry.badge}</span>}
                        {entry.isCurrentUser && (
                          <span className="text-xs bg-purple-500 px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">
                        @{entry.username}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score and Change */}
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {category === 'savings' ? `฿${(entry.score / 1000).toFixed(0)}K` : 
                     entry.score.toLocaleString()}
                  </div>
                  {entry.change !== 0 && (
                    <div className={cn(
                      "text-xs flex items-center gap-1",
                      entry.change > 0 ? "text-green-400" : "text-red-400"
                    )}>
                      {entry.change > 0 ? "↗️" : "↘️"}
                      {Math.abs(entry.change)}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {leaderboard.length > 5 && (
          <div className="text-center mt-4">
            <ThemeAwareButton
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : `Show All (${leaderboard.length})`}
            </ThemeAwareButton>
          </div>
        )}

        {/* Current User Position (if not in top list) */}
        {!leaderboard.slice(0, 5).some(entry => entry.isCurrentUser) && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="text-center text-sm text-gray-400 mb-2">Your Position</div>
            {leaderboard.filter(entry => entry.isCurrentUser).map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold text-sm text-white">
                    {entry.rank}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{entry.avatar}</div>
                    <div>
                      <div className="font-semibold">{entry.displayName}</div>
                      <div className="text-sm text-gray-400">@{entry.username}</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {category === 'savings' ? `฿${(entry.score / 1000).toFixed(0)}K` : 
                     entry.score.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ThemeAwareCard>
    </div>
  );
}
