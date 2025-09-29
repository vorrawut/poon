import { useState, useEffect, useCallback } from "react";
import { aiCoachingService } from "../services/aiCoachingService";
import type {
  AICoachPersonality,
  AICoachMessage,
} from "../components/AICoachAvatar";
import type { PersonalizedTip } from "../components/PersonalizedTips";
import type {
  Achievement,
  ProgressUpdate,
} from "../components/ProgressCelebration";
import type { CoachingAnalytics } from "../services/aiCoachingService";

export interface AICoachingData {
  currentPersonality: AICoachPersonality | null;
  messages: AICoachMessage[];
  personalizedTips: PersonalizedTip[];
  achievements: Achievement[];
  progressUpdates: ProgressUpdate[];
  analytics: CoachingAnalytics | null;
  coachingStats: {
    totalTips: number;
    implementedTips: number;
    totalAchievements: number;
    averageRating: number;
    totalXP: number;
    coachingStreak: number;
  };
}

export interface UseAICoachingOptions {
  userId?: string;
  autoLoad?: boolean;
  personalityId?: string;
  enableRealTimeUpdates?: boolean;
}

export function useAICoaching(options: UseAICoachingOptions = {}) {
  const {
    userId = "current_user",
    autoLoad = true,
    personalityId: _personalityId,
    enableRealTimeUpdates = true,
  } = options;

  const [data, setData] = useState<AICoachingData>({
    currentPersonality: null,
    messages: [],
    personalizedTips: [],
    achievements: [],
    progressUpdates: [],
    analytics: null,
    coachingStats: {
      totalTips: 0,
      implementedTips: 0,
      totalAchievements: 0,
      averageRating: 0,
      totalXP: 0,
      coachingStreak: 0,
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Load AI coaching data
  const loadCoachingData = useCallback(async () => {
    if (!autoLoad) return;

    setLoading(true);
    setError(null);

    try {
      // Load all coaching data in parallel
      const [
        personality,
        coachingSession,
        analytics,
        progressUpdates,
        coachingStats,
      ] = await Promise.all([
        aiCoachingService.getCoachPersonality(userId),
        aiCoachingService.generateCoachingSession(userId),
        aiCoachingService.analyzeFinancialData(userId, "month"),
        aiCoachingService.getProgressUpdates(userId, "month"),
        aiCoachingService.getCoachingStats(userId),
      ]);

      setData({
        currentPersonality: personality,
        messages: coachingSession.messages,
        personalizedTips: coachingSession.tips,
        achievements: coachingSession.achievements,
        progressUpdates,
        analytics,
        coachingStats,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load coaching data",
      );
    } finally {
      setLoading(false);
    }
  }, [userId, autoLoad]);

  // Change AI coach personality
  const changePersonality = async (personality: AICoachPersonality) => {
    try {
      const success = await aiCoachingService.updateCoachPersonality(
        userId,
        personality.id,
      );
      if (success) {
        setData((prev) => ({
          ...prev,
          currentPersonality: personality,
          messages: [], // Clear messages when changing personality
        }));

        // Generate welcome message from new personality
        const welcomeMessage = await aiCoachingService.startConversation(
          userId,
          personality.id,
        );
        if (welcomeMessage) {
          setData((prev) => ({
            ...prev,
            messages: [welcomeMessage],
          }));
        }
      }
      return success;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to change personality",
      );
      return false;
    }
  };

  // Start coaching conversation
  const startConversation = async (topic?: string) => {
    if (!data.currentPersonality) return;

    setIsTyping(true);
    try {
      const message = await aiCoachingService.startConversation(
        userId,
        data.currentPersonality.id,
        topic,
      );

      if (message) {
        setData((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to start conversation",
      );
    } finally {
      setIsTyping(false);
    }
  };

  // Process user action/message
  const processUserAction = async (action: string, context?: any) => {
    setIsTyping(true);
    try {
      const response = await aiCoachingService.processUserAction(
        userId,
        action,
        context,
      );

      if (response) {
        setData((prev) => ({
          ...prev,
          messages: [...prev.messages, response],
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process action");
    } finally {
      setIsTyping(false);
    }
  };

  // Implement a personalized tip
  const implementTip = async (tipId: string) => {
    try {
      const success = await aiCoachingService.implementTip(userId, tipId);

      if (success) {
        setData((prev) => ({
          ...prev,
          personalizedTips: prev.personalizedTips.map((tip) =>
            tip.id === tipId
              ? {
                  ...tip,
                  isImplemented: true,
                  implementedAt: new Date().toISOString(),
                }
              : tip,
          ),
          coachingStats: {
            ...prev.coachingStats,
            implementedTips: prev.coachingStats.implementedTips + 1,
          },
        }));

        // Generate celebration message
        await processUserAction("tip_implemented", { tipId });
      }

      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to implement tip");
      return false;
    }
  };

  // Dismiss a tip
  const dismissTip = async (tipId: string) => {
    try {
      setData((prev) => ({
        ...prev,
        personalizedTips: prev.personalizedTips.filter(
          (tip) => tip.id !== tipId,
        ),
      }));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to dismiss tip");
      return false;
    }
  };

  // Rate a tip
  const rateTip = async (tipId: string, rating: number, feedback?: string) => {
    try {
      const success = await aiCoachingService.rateTip(
        userId,
        tipId,
        rating,
        feedback,
      );

      if (success) {
        setData((prev) => ({
          ...prev,
          personalizedTips: prev.personalizedTips.map((tip) =>
            tip.id === tipId
              ? { ...tip, effectiveness: rating * 20 } // Convert 1-5 rating to 0-100 percentage
              : tip,
          ),
        }));
      }

      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to rate tip");
      return false;
    }
  };

  // Celebrate achievement
  const celebrateAchievement = async (achievement: Achievement) => {
    try {
      const success = await aiCoachingService.celebrateAchievement(
        userId,
        achievement.id,
      );

      if (success) {
        // Generate celebration message
        await processUserAction("celebrate_achievement", { achievement });
      }

      return success;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to celebrate achievement",
      );
      return false;
    }
  };

  // Share achievement
  const shareAchievement = async (achievement: Achievement) => {
    try {
      // In a real app, this would integrate with social sharing APIs
      console.log("Sharing achievement:", achievement);

      // Generate sharing confirmation message
      await processUserAction("share_achievement", { achievement });

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to share achievement",
      );
      return false;
    }
  };

  // Set next goal from achievement
  const setNextGoal = async (achievement: Achievement) => {
    try {
      if (achievement.nextMilestone) {
        // In a real app, this would create a new goal
        console.log("Setting next goal:", achievement.nextMilestone);

        // Generate goal setting confirmation message
        await processUserAction("set_next_goal", { achievement });

        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set next goal");
      return false;
    }
  };

  // Refresh coaching data
  const refreshData = async () => {
    await loadCoachingData();
  };

  // Get filtered tips
  const getFilteredTips = useCallback(
    (category?: string, priority?: string, implemented?: boolean) => {
      return data.personalizedTips.filter((tip) => {
        const categoryMatch =
          !category || category === "all" || tip.category === category;
        const priorityMatch =
          !priority || priority === "all" || tip.priority === priority;
        const implementedMatch =
          implemented === undefined || tip.isImplemented === implemented;

        return categoryMatch && priorityMatch && implementedMatch;
      });
    },
    [data.personalizedTips],
  );

  // Get recent achievements
  const getRecentAchievements = useCallback(
    (days: number = 30) => {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);

      return data.achievements.filter(
        (achievement) => new Date(achievement.achievedAt) > cutoffDate,
      );
    },
    [data.achievements],
  );

  // Get coaching insights
  const getCoachingInsights = useCallback(() => {
    if (!data.analytics) return [];

    const insights: Array<{
      type: string;
      message: string;
      priority: string;
    }> = [];

    // Add spending pattern insights
    data.analytics.spendingPatterns.forEach((pattern) => {
      if (pattern.significance > 0.7) {
        insights.push({
          type: "spending",
          message: pattern.recommendation,
          priority: pattern.trend === "increasing" ? "high" : "medium",
        });
      }
    });

    // Add savings potential insights
    data.analytics.savingsPotential.forEach((potential) => {
      if (potential.potentialSavings > 1000) {
        insights.push({
          type: "savings",
          message: `You could save ฿${potential.potentialSavings} in ${potential.category}`,
          priority: potential.difficulty === "easy" ? "high" : "medium",
        });
      }
    });

    return insights;
  }, [data.analytics]);

  // Calculate coaching score
  const getCoachingScore = useCallback(() => {
    const { coachingStats } = data;

    // Calculate overall coaching effectiveness score
    const implementationRate =
      coachingStats.totalTips > 0
        ? (coachingStats.implementedTips / coachingStats.totalTips) * 100
        : 0;

    const engagementScore = Math.min(coachingStats.coachingStreak * 5, 50);
    const achievementScore = Math.min(coachingStats.totalAchievements * 10, 30);
    const ratingScore = coachingStats.averageRating * 4; // Convert 0-5 to 0-20

    return Math.round(
      implementationRate * 0.4 +
        engagementScore * 0.3 +
        achievementScore * 0.2 +
        ratingScore * 0.1,
    );
  }, [data.coachingStats]);

  // Load data on mount or when dependencies change
  useEffect(() => {
    loadCoachingData();
  }, [loadCoachingData]);

  // Set up real-time updates
  useEffect(() => {
    if (!enableRealTimeUpdates) return;

    // In a real app, this would set up WebSocket or polling for real-time updates
    const interval = setInterval(() => {
      // Check for new achievements, tips, etc.
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [enableRealTimeUpdates, userId]);

  return {
    // Data
    ...data,

    // Loading states
    loading,
    error,
    isTyping,

    // Actions
    changePersonality,
    startConversation,
    processUserAction,
    implementTip,
    dismissTip,
    rateTip,
    celebrateAchievement,
    shareAchievement,
    setNextGoal,
    refreshData,

    // Computed values
    getFilteredTips,
    getRecentAchievements,
    getCoachingInsights,
    getCoachingScore,

    // Utilities
    clearMessages: () => setData((prev) => ({ ...prev, messages: [] })),
    clearError: () => setError(null),

    // Refresh function
    refresh: loadCoachingData,
  };
}
