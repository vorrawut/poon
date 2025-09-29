// Widgets Mock Data Exports
export * from './widgetsData';
export { 
  mockSpendingAchievements as gamificationAchievements,
  mockSpendingChallenges as gamificationChallenges,
  type Achievement as GamificationAchievement,
  type Challenge as GamificationChallenge
} from './gamificationData';
export { 
  mockSpendingInsights,
  type SpendingInsight
} from './insightsData';
export { 
  mockCategoryTransactions,
  type Transaction as CategoryTransaction
} from './categoryData';
export { 
  mockFinancialStories,
  type FinancialStory
} from './historianData';
export { 
  generateMockTimelineData,
  type SpendingData as TimelineSpendingData
} from './timelineData';
export { 
  mockAchievements as spendingGamificationAchievements,
  mockChallenges as spendingGamificationChallenges,
  mockStreakData as spendingGamificationStreakData,
  getRarityColor,
  getDifficultyColor,
  getProgressPercentage,
  type Achievement as SpendingGamificationAchievement,
  type Challenge as SpendingGamificationChallenge,
  type StreakData as SpendingGamificationStreakData
} from './spendingGamificationData';
export { 
  mockMilestones,
  mockTimelineStats,
  type Milestone
} from './timeCapsuleData';
