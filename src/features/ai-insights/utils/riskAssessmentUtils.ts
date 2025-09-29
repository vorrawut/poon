// Risk Assessment Utilities - Utility functions for financial risk calculations
// @TODO: See TODO.md - AI INTELLIGENCE & COACHING section for enhanced risk calculations

export interface FinancialHealthScore {
  overall: number;
  emergency: number;
  debt: number;
  savings: number;
  category: "excellent" | "good" | "fair" | "poor";
}

export interface RiskFactor {
  id: string;
  name: string;
  severity: "low" | "medium" | "high";
  impact: number;
  likelihood: number;
  description: string;
  recommendation: string;
}

// Utility functions for risk assessment
export const calculateFinancialHealthScore = (
  monthlyIncome: number,
  monthlyExpenses: number,
  emergencyFund: number,
  totalDebt: number,
): FinancialHealthScore => {
  const emergencyScore = Math.min(
    100,
    (emergencyFund / (monthlyExpenses * 6)) * 100,
  );
  const debtScore = Math.max(0, 100 - (totalDebt / (monthlyIncome * 12)) * 100);
  const savingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100;

  const overall = (emergencyScore + debtScore + savingsRate) / 3;

  let category: "excellent" | "good" | "fair" | "poor";
  if (overall >= 80) category = "excellent";
  else if (overall >= 60) category = "good";
  else if (overall >= 40) category = "fair";
  else category = "poor";

  return {
    overall,
    emergency: emergencyScore,
    debt: debtScore,
    savings: savingsRate,
    category,
  };
};

export const identifyRiskFactors = (financialData: {
  monthlyIncome: number;
  monthlyExpenses: number;
  emergencyFund: number;
  totalDebt: number;
  age: number;
  dependents: number;
}): RiskFactor[] => {
  const risks: RiskFactor[] = [];

  // Emergency fund risk
  const monthsOfEmergency =
    financialData.emergencyFund / financialData.monthlyExpenses;
  if (monthsOfEmergency < 3) {
    risks.push({
      id: "emergency-fund",
      name: "Insufficient Emergency Fund",
      severity: monthsOfEmergency < 1 ? "high" : "medium",
      impact: 8,
      likelihood: 7,
      description: `You have only ${monthsOfEmergency.toFixed(1)} months of expenses saved for emergencies.`,
      recommendation:
        "Build an emergency fund covering 3-6 months of expenses.",
    });
  }

  // High debt-to-income ratio
  const debtToIncome =
    (financialData.totalDebt / (financialData.monthlyIncome * 12)) * 100;
  if (debtToIncome > 30) {
    risks.push({
      id: "high-debt",
      name: "High Debt-to-Income Ratio",
      severity: debtToIncome > 50 ? "high" : "medium",
      impact: 7,
      likelihood: 6,
      description: `Your debt-to-income ratio is ${debtToIncome.toFixed(1)}%, which is above the recommended 30%.`,
      recommendation:
        "Focus on paying down high-interest debt and avoid taking on new debt.",
    });
  }

  // Low savings rate
  const savingsRate =
    ((financialData.monthlyIncome - financialData.monthlyExpenses) /
      financialData.monthlyIncome) *
    100;
  if (savingsRate < 10) {
    risks.push({
      id: "low-savings",
      name: "Low Savings Rate",
      severity: savingsRate < 0 ? "high" : "medium",
      impact: 6,
      likelihood: 8,
      description: `Your savings rate is ${savingsRate.toFixed(1)}%, which is below the recommended 20%.`,
      recommendation:
        "Review your budget and identify areas to reduce expenses or increase income.",
    });
  }

  return risks;
};
