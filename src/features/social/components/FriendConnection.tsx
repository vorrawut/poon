import { useState } from "react";
import { motion } from "framer-motion";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
} from "../../../core";
// import { useTranslation } from "../../../libs/i18n";
import { cn } from "../../../libs/utils";

// Friend Connection Types
export interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  level: number;
  status: "online" | "offline" | "away";
  lastSeen: string;
  mutualFriends: number;
  isConnected: boolean;
}

export interface FriendConnectionProps {
  friends?: Friend[];
  suggestions?: Friend[];
  onAddFriend?: (friendId: string) => void;
  onRemoveFriend?: (friendId: string) => void;
  className?: string;
}

// Mock Friends Data
const mockFriends: Friend[] = [
  {
    id: "friend1",
    username: "savings_master",
    displayName: "Master นักออม",
    avatar: "🧙‍♂️",
    level: 15,
    status: "online",
    lastSeen: "now",
    mutualFriends: 5,
    isConnected: true,
  },
  {
    id: "friend2",
    username: "goal_achiever",
    displayName: "Goal นักสู้",
    avatar: "🎯",
    level: 12,
    status: "offline",
    lastSeen: "2 hours ago",
    mutualFriends: 3,
    isConnected: true,
  },
];

const mockSuggestions: Friend[] = [
  {
    id: "suggestion1",
    username: "thai_investor",
    displayName: "Thai นักลงทุน",
    avatar: "📈",
    level: 18,
    status: "online",
    lastSeen: "5 minutes ago",
    mutualFriends: 8,
    isConnected: false,
  },
];

export function FriendConnection({
  friends = mockFriends,
  suggestions = mockSuggestions,
  onAddFriend,
  onRemoveFriend,
  className = "",
}: FriendConnectionProps) {
  // const { language } = useTranslation();
  const [activeTab, setActiveTab] = useState<"friends" | "suggestions">(
    "friends",
  );

  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center">
        <ThemeAwareHeading level="h2" className="text-2xl font-bold mb-2">
          👥 Friends & Connections
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary" className="text-sm">
          Connect with fellow financial achievers
        </ThemeAwareText>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 justify-center">
        {(["friends", "suggestions"] as const).map((tab) => (
          <ThemeAwareButton
            key={tab}
            variant={activeTab === tab ? "primary" : "ghost"}
            onClick={() => setActiveTab(tab)}
            className="capitalize"
          >
            {tab === "friends"
              ? `👥 Friends (${friends.length})`
              : `💡 Suggestions (${suggestions.length})`}
          </ThemeAwareButton>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === "friends" &&
          friends.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ThemeAwareCard className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="text-3xl">{friend.avatar}</div>
                      <div
                        className={cn(
                          "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800",
                          friend.status === "online"
                            ? "bg-green-400"
                            : friend.status === "away"
                              ? "bg-yellow-400"
                              : "bg-gray-400",
                        )}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{friend.displayName}</h3>
                      <p className="text-sm text-gray-400">
                        @{friend.username}
                      </p>
                      <p className="text-xs text-gray-500">
                        Level {friend.level} • {friend.lastSeen}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <ThemeAwareButton variant="ghost" size="sm">
                      💬 Message
                    </ThemeAwareButton>
                    <ThemeAwareButton
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveFriend?.(friend.id)}
                    >
                      Remove
                    </ThemeAwareButton>
                  </div>
                </div>
              </ThemeAwareCard>
            </motion.div>
          ))}

        {activeTab === "suggestions" &&
          suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ThemeAwareCard className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{suggestion.avatar}</div>
                    <div>
                      <h3 className="font-semibold">
                        {suggestion.displayName}
                      </h3>
                      <p className="text-sm text-gray-400">
                        @{suggestion.username}
                      </p>
                      <p className="text-xs text-gray-500">
                        Level {suggestion.level} • {suggestion.mutualFriends}{" "}
                        mutual friends
                      </p>
                    </div>
                  </div>

                  <ThemeAwareButton
                    variant="primary"
                    size="sm"
                    onClick={() => onAddFriend?.(suggestion.id)}
                  >
                    ➕ Add Friend
                  </ThemeAwareButton>
                </div>
              </ThemeAwareCard>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
