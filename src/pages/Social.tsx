import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
  useTheme,
} from "../core";
// import { useTranslation } from "../libs/i18n";
// import { cn } from "../libs/utils";
import {
  UserProfile,
  AchievementShare,
  CommunityChallengeWidget,
  FriendConnection,
  LeaderboardWidget,
  useSocial,
} from "../features/social";
import type { UserAchievement } from "../features/social";

export function Social() {
  // const { language } = useTranslation();
  const { isPlayMode } = useTheme();
  const [activeTab, setActiveTab] = useState<
    "profile" | "challenges" | "friends" | "leaderboard"
  >("profile");
  const [showAchievementShare, setShowAchievementShare] =
    useState<UserAchievement | null>(null);

  // Use social hook for data management
  const {
    /* profile, */
    /* achievements, */
    friends,
    friendSuggestions,
    challenges,
    leaderboard,
    socialStats,
    loading,
    error,
    addFriend,
    removeFriend,
    joinChallenge,
    leaveChallenge,
    shareAchievement,
  } = useSocial();

  const handleAchievementShare = (achievement: UserAchievement) => {
    setShowAchievementShare(achievement);
  };

  const handleShareComplete = (
    platform: string,
    template: string,
    customMessage?: string,
  ) => {
    if (showAchievementShare) {
      shareAchievement(showAchievementShare.id, platform, template);
      setShowAchievementShare(null);
      // In a real app, this would integrate with actual social platforms
      console.log("Sharing to:", platform, template, customMessage);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">👥</div>
          <ThemeAwareText>Loading social features...</ThemeAwareText>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <ThemeAwareText color="secondary">Error: {error}</ThemeAwareText>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[var(--color-bg-primary)]">
      {/* Achievement Share Modal */}
      {showAchievementShare && (
        <AchievementShare
          achievement={showAchievementShare}
          userDisplayName="Alex นักออม"
          onShare={handleShareComplete}
          onClose={() => setShowAchievementShare(null)}
          isVisible={true}
        />
      )}

      {/* Main Social Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
        {/* Hero Header */}
        <div className="text-center py-8 sm:py-12">
          <ThemeAwareHeading
            level="h1"
            className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            gradient={isPlayMode}
          >
            <motion.span
              className="inline-block mr-4"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              👥
            </motion.span>
            Social Hub
          </ThemeAwareHeading>
          <ThemeAwareText
            color="secondary"
            className="mb-8 max-w-2xl mx-auto text-base sm:text-lg"
          >
            {isPlayMode
              ? "Connect, compete, and celebrate your financial journey with friends! 🚀"
              : "Build your financial network and achieve goals together through community support."}
          </ThemeAwareText>
        </div>

        {/* Social Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ThemeAwareCard className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {socialStats.totalFriends}
            </div>
            <div className="text-sm text-gray-400">Friends</div>
          </ThemeAwareCard>

          <ThemeAwareCard className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {socialStats.totalAchievements}
            </div>
            <div className="text-sm text-gray-400">Achievements</div>
          </ThemeAwareCard>

          <ThemeAwareCard className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              #{socialStats.socialRank}
            </div>
            <div className="text-sm text-gray-400">Rank</div>
          </ThemeAwareCard>

          <ThemeAwareCard className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {socialStats.engagementScore}
            </div>
            <div className="text-sm text-gray-400">Engagement</div>
          </ThemeAwareCard>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {(
            [
              { id: "profile", label: "👤 Profile", icon: "👤" },
              { id: "challenges", label: "🏆 Challenges", icon: "🏆" },
              { id: "friends", label: "👥 Friends", icon: "👥" },
              { id: "leaderboard", label: "📊 Leaderboard", icon: "📊" },
            ] as const
          ).map((tab) => (
            <ThemeAwareButton
              key={tab.id}
              variant={activeTab === tab.id ? "primary" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </ThemeAwareButton>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[600px]"
          >
            {activeTab === "profile" && (
              <UserProfile
                isOwnProfile={true}
                onEditProfile={() => {
                  // Navigate to settings or open edit modal
                  console.log("Edit profile");
                }}
                onShareAchievement={handleAchievementShare}
                className="max-w-4xl mx-auto"
              />
            )}

            {activeTab === "challenges" && (
              <CommunityChallengeWidget
                challenges={challenges}
                onJoin={joinChallenge}
                onLeave={leaveChallenge}
                className="max-w-4xl mx-auto"
              />
            )}

            {activeTab === "friends" && (
              <FriendConnection
                friends={friends}
                suggestions={friendSuggestions}
                onConnect={addFriend}
                onRemove={removeFriend}
                className="max-w-4xl mx-auto"
              />
            )}

            {activeTab === "leaderboard" && (
              <LeaderboardWidget
                leaderboard={leaderboard}
                category="overall"
                period="monthly"
                onCategoryChange={(category: any) => {
                  console.log("Category changed:", category);
                }}
                onPeriodChange={(period: any) => {
                  console.log("Period changed:", period);
                }}
                className="max-w-4xl mx-auto"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <ThemeAwareCard className="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="font-semibold mb-2">Share Achievement</h3>
              <p className="text-sm text-gray-400">
                Celebrate your financial wins with friends
              </p>
            </ThemeAwareCard>

            <ThemeAwareCard className="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-semibold mb-2">Join Challenge</h3>
              <p className="text-sm text-gray-400">
                Compete in community financial challenges
              </p>
            </ThemeAwareCard>

            <ThemeAwareCard className="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="font-semibold mb-2">Connect Friends</h3>
              <p className="text-sm text-gray-400">
                Build your financial support network
              </p>
            </ThemeAwareCard>
          </div>
        </div>

        {/* Community Stats */}
        <div className="mt-12">
          <ThemeAwareCard className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="text-center">
              <h3 className="font-semibold text-purple-300 mb-4">
                🌟 Community Impact
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-blue-400">1,247</div>
                  <div className="text-gray-400">Active Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">฿2.5M</div>
                  <div className="text-gray-400">Total Saved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">856</div>
                  <div className="text-gray-400">Goals Achieved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">45</div>
                  <div className="text-gray-400">Active Challenges</div>
                </div>
              </div>
            </div>
          </ThemeAwareCard>
        </div>
      </div>
    </div>
  );
}
