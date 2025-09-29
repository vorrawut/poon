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
  mockFriends,
  mockSuggestions,
  type Friend,
} from "../../../../mockData/features/social";

export interface FriendConnectionProps {
  friends?: Friend[];
  suggestions?: Friend[];
  onConnect?: (friendId: string) => void;
  onRemove?: (friendId: string) => void;
  className?: string;
}

// Re-export the type for other components
export type { Friend } from "../../../../mockData/features/social";

export function FriendConnection({
  friends = mockFriends,
  suggestions = mockSuggestions,
  onConnect: _onConnect,
  onRemove: _onRemove,
  className,
}: FriendConnectionProps) {
  const [activeTab, setActiveTab] = useState<"friends" | "suggestions">(
    "friends",
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH");
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header with Tabs */}
      <div>
        <ThemeAwareHeading level="h3" className="mb-4">
          Friends & Connections
        </ThemeAwareHeading>

        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("friends")}
            className={cn(
              "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors",
              activeTab === "friends"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
            )}
          >
            Friends ({friends.length})
          </button>
          <button
            onClick={() => setActiveTab("suggestions")}
            className={cn(
              "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors",
              activeTab === "suggestions"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
            )}
          >
            Suggestions ({suggestions.length})
          </button>
        </div>
      </div>

      {/* Friends List */}
      {activeTab === "friends" && (
        <div className="space-y-3">
          {friends.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ThemeAwareCard variant="outlined" padding="md" hover>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="text-2xl">{friend.avatar}</div>
                    <div
                      className={cn(
                        "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800",
                        getStatusColor(friend.status),
                      )}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <ThemeAwareText className="font-medium truncate">
                      {friend.username}
                    </ThemeAwareText>
                    <div className="flex items-center space-x-2">
                      <ThemeAwareText variant="caption" color="secondary">
                        {friend.mutualGoals} mutual goals
                      </ThemeAwareText>
                      <span className="text-gray-300">•</span>
                      <ThemeAwareText variant="caption" color="secondary">
                        Joined {formatDate(friend.joinedDate)}
                      </ThemeAwareText>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <ThemeAwareButton variant="ghost" size="sm">
                      💬
                    </ThemeAwareButton>
                    <ThemeAwareButton variant="ghost" size="sm">
                      👁️
                    </ThemeAwareButton>
                  </div>
                </div>
              </ThemeAwareCard>
            </motion.div>
          ))}

          {friends.length === 0 && (
            <ThemeAwareCard variant="outlined" padding="lg">
              <div className="text-center">
                <div className="text-4xl mb-2">👥</div>
                <ThemeAwareText color="secondary">
                  No friends yet. Connect with others to share your financial
                  journey!
                </ThemeAwareText>
              </div>
            </ThemeAwareCard>
          )}
        </div>
      )}

      {/* Suggestions List */}
      {activeTab === "suggestions" && (
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ThemeAwareCard variant="outlined" padding="md" hover>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{suggestion.avatar}</div>

                  <div className="flex-1 min-w-0">
                    <ThemeAwareText className="font-medium truncate">
                      {suggestion.username}
                    </ThemeAwareText>
                    <ThemeAwareText variant="caption" color="secondary">
                      Similar financial goals • Joined{" "}
                      {formatDate(suggestion.joinedDate)}
                    </ThemeAwareText>
                  </div>

                  <div className="flex items-center space-x-2">
                    <ThemeAwareButton
                      variant="outline"
                      size="sm"
                      onClick={() => _onConnect?.(suggestion.id)}
                    >
                      Connect
                    </ThemeAwareButton>
                    <ThemeAwareButton variant="ghost" size="sm">
                      ✕
                    </ThemeAwareButton>
                  </div>
                </div>
              </ThemeAwareCard>
            </motion.div>
          ))}

          {suggestions.length === 0 && (
            <ThemeAwareCard variant="outlined" padding="lg">
              <div className="text-center">
                <div className="text-4xl mb-2">🔍</div>
                <ThemeAwareText color="secondary">
                  No suggestions available right now. Check back later!
                </ThemeAwareText>
              </div>
            </ThemeAwareCard>
          )}
        </div>
      )}
    </div>
  );
}
