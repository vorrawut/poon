import { useState, useEffect } from "react";
import { socialService } from "../services/socialService";
import type {
  UserSocialProfile,
  UserAchievement,
} from "../components/UserProfile";
import type { CommunityChallenge } from "../components/CommunityChallenge";
import type { Friend } from "../components/FriendConnection";
import type { LeaderboardEntry } from "../components/LeaderboardWidget";

export interface SocialData {
  profile: UserSocialProfile | null;
  achievements: UserAchievement[];
  friends: Friend[];
  friendSuggestions: Friend[];
  challenges: CommunityChallenge[];
  leaderboard: LeaderboardEntry[];
  socialStats: {
    totalFriends: number;
    totalAchievements: number;
    totalShares: number;
    socialRank: number;
    engagementScore: number;
  };
}

export interface UseSocialOptions {
  userId?: string;
  autoLoad?: boolean;
  leaderboardCategory?: string;
  leaderboardPeriod?: string;
}

export function useSocial(options: UseSocialOptions = {}) {
  const {
    userId = "current_user",
    autoLoad = true,
    leaderboardCategory = "overall",
    leaderboardPeriod = "monthly",
  } = options;

  const [data, setData] = useState<SocialData>({
    profile: null,
    achievements: [],
    friends: [],
    friendSuggestions: [],
    challenges: [],
    leaderboard: [],
    socialStats: {
      totalFriends: 0,
      totalAchievements: 0,
      totalShares: 0,
      socialRank: 0,
      engagementScore: 0,
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load social data
  const loadSocialData = async () => {
    if (!autoLoad) return;

    setLoading(true);
    setError(null);

    try {
      // Load all social data in parallel
      const [
        profile,
        achievements,
        friends,
        friendSuggestions,
        challenges,
        leaderboard,
        socialStats,
      ] = await Promise.all([
        socialService.getUserProfile(userId),
        socialService.getUserAchievements(userId),
        socialService.getFriends(userId),
        socialService.getFriendSuggestions(userId),
        socialService.getCommunitychallenges(),
        socialService.getLeaderboard(leaderboardCategory, leaderboardPeriod),
        socialService.getSocialStats(userId),
      ]);

      setData({
        profile,
        achievements,
        friends,
        friendSuggestions,
        challenges,
        leaderboard,
        socialStats,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load social data",
      );
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updates: Partial<UserSocialProfile>) => {
    try {
      const updatedProfile = await socialService.updateUserProfile(
        userId,
        updates,
      );
      if (updatedProfile) {
        setData((prev) => ({
          ...prev,
          profile: updatedProfile,
        }));
      }
      return updatedProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
      return null;
    }
  };

  // Share achievement
  const shareAchievement = async (
    achievementId: string,
    platform: string,
    template: string,
    customMessage?: string,
  ) => {
    try {
      const success = await socialService.shareAchievement(
        achievementId,
        platform,
        template,
        customMessage,
      );

      if (success) {
        // Update achievement share count locally
        setData((prev) => ({
          ...prev,
          achievements: prev.achievements.map((achievement) =>
            achievement.id === achievementId
              ? { ...achievement, shareCount: achievement.shareCount + 1 }
              : achievement,
          ),
        }));
      }

      return success;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to share achievement",
      );
      return false;
    }
  };

  // Friend management
  const addFriend = async (friendId: string) => {
    try {
      const success = await socialService.addFriend(userId, friendId);
      if (success) {
        // Refresh friends and suggestions
        const [friends, friendSuggestions] = await Promise.all([
          socialService.getFriends(userId),
          socialService.getFriendSuggestions(userId),
        ]);

        setData((prev) => ({
          ...prev,
          friends,
          friendSuggestions,
        }));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add friend");
      return false;
    }
  };

  const removeFriend = async (friendId: string) => {
    try {
      const success = await socialService.removeFriend(userId, friendId);
      if (success) {
        // Remove from friends list locally
        setData((prev) => ({
          ...prev,
          friends: prev.friends.filter((friend) => friend.id !== friendId),
        }));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove friend");
      return false;
    }
  };

  // Challenge management
  const joinChallenge = async (challengeId: string) => {
    try {
      const success = await socialService.joinChallenge(userId, challengeId);
      if (success) {
        // Update challenge locally
        setData((prev) => ({
          ...prev,
          challenges: prev.challenges.map((challenge) =>
            challenge.id === challengeId
              ? { ...challenge, isJoined: true }
              : challenge,
          ),
        }));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join challenge");
      return false;
    }
  };

  const leaveChallenge = async (challengeId: string) => {
    try {
      const success = await socialService.leaveChallenge(userId, challengeId);
      if (success) {
        // Update challenge locally
        setData((prev) => ({
          ...prev,
          challenges: prev.challenges.map((challenge) =>
            challenge.id === challengeId
              ? { ...challenge, isJoined: false }
              : challenge,
          ),
        }));
      }
      return success;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to leave challenge",
      );
      return false;
    }
  };

  const updateChallengeProgress = async (
    challengeId: string,
    progress: number,
  ) => {
    try {
      const success = await socialService.updateChallengeProgress(
        userId,
        challengeId,
        progress,
      );
      if (success) {
        // Update progress locally
        setData((prev) => ({
          ...prev,
          challenges: prev.challenges.map((challenge) =>
            challenge.id === challengeId
              ? {
                  ...challenge,
                  participants: challenge.participants.map((participant) =>
                    participant.isCurrentUser
                      ? { ...participant, progress }
                      : participant,
                  ),
                }
              : challenge,
          ),
        }));
      }
      return success;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update challenge progress",
      );
      return false;
    }
  };

  // Leaderboard management
  const refreshLeaderboard = async (category: string, period: string) => {
    try {
      const leaderboard = await socialService.getLeaderboard(category, period);
      setData((prev) => ({
        ...prev,
        leaderboard,
      }));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to refresh leaderboard",
      );
    }
  };

  // Get user's current challenges
  const getActiveChallenges = () => {
    return data.challenges.filter(
      (challenge) => challenge.isJoined && challenge.status === "active",
    );
  };

  // Get user's recent achievements
  const getRecentAchievements = (days: number = 30) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return data.achievements.filter(
      (achievement) =>
        achievement.isUnlocked && new Date(achievement.earnedAt) > cutoffDate,
    );
  };

  // Get friend activity (mock for now)
  const getFriendActivity = () => {
    // In a real app, this would return recent friend activities
    return [];
  };

  // Calculate social engagement score
  const calculateEngagementScore = () => {
    const weights = {
      friends: 0.2,
      achievements: 0.3,
      shares: 0.2,
      challenges: 0.3,
    };

    const friendsScore = Math.min(data.friends.length * 5, 100);
    const achievementsScore = Math.min(data.achievements.length * 10, 100);
    const sharesScore = Math.min(
      data.achievements.reduce((sum, a) => sum + a.shareCount, 0) * 2,
      100,
    );
    const challengesScore = Math.min(getActiveChallenges().length * 25, 100);

    return Math.round(
      friendsScore * weights.friends +
        achievementsScore * weights.achievements +
        sharesScore * weights.shares +
        challengesScore * weights.challenges,
    );
  };

  // Load data on mount or when dependencies change
  useEffect(() => {
    loadSocialData();
  }, [loadSocialData, userId, leaderboardCategory, leaderboardPeriod]);

  return {
    // Data
    ...data,

    // Loading states
    loading,
    error,

    // Actions
    loadSocialData,
    updateProfile,
    shareAchievement,
    addFriend,
    removeFriend,
    joinChallenge,
    leaveChallenge,
    updateChallengeProgress,
    refreshLeaderboard,

    // Computed values
    getActiveChallenges,
    getRecentAchievements,
    getFriendActivity,
    calculateEngagementScore,

    // Refresh function
    refresh: loadSocialData,
  };
}
