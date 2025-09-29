// Spending Pattern Analysis Utilities - Utility functions for spending pattern analysis
// @TODO: See TODO.md - AI INTELLIGENCE & COACHING section for enhanced pattern analysis

export interface SpendingPattern {
  id: string;
  type: 'recurring' | 'seasonal' | 'anomaly' | 'trend' | 'behavioral';
  name: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  frequency: string;
  amount: number;
  category: string;
  insights: string[];
  recommendations: string[];
  startDate: string;
  endDate?: string;
}

// Export pattern analysis utilities
export const analyzeSpendingPatterns = (): SpendingPattern[] => {
  // This would be replaced with actual AI/ML analysis
  // For now, return mock patterns based on transaction data
  return [];
};

export const getPatternInsights = (pattern: SpendingPattern): string[] => {
  const insights = [];

  if (pattern.confidence > 85) {
    insights.push('This pattern has been consistently detected in your spending behavior.');
  }

  if (pattern.impact === 'high') {
    insights.push('This pattern significantly impacts your overall financial health.');
  }

  if (pattern.type === 'recurring') {
    insights.push('Consider setting up automatic savings to account for this recurring expense.');
  }

  if (pattern.type === 'seasonal') {
    insights.push('Plan ahead for this seasonal spending pattern to avoid budget surprises.');
  }

  if (pattern.type === 'anomaly') {
    insights.push('This unusual spending pattern may indicate a need to review your budget.');
  }

  return insights;
};
