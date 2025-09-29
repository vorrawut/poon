// Goal Optimizer Utilities - Utility functions for goal optimization calculations
// @TODO: See TODO.md - AI INTELLIGENCE & COACHING section for enhanced calculations

// Utility functions for goal optimization
export const calculateOptimalContribution = (
  targetAmount: number,
  currentSavings: number,
  timelineMonths: number,
  interestRate: number = 0.04,
): number => {
  const remainingAmount = targetAmount - currentSavings;
  const monthlyRate = interestRate / 12;

  if (monthlyRate === 0) {
    return remainingAmount / timelineMonths;
  }

  // Calculate monthly payment using present value of annuity formula
  const monthlyPayment =
    (remainingAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -timelineMonths));
  return monthlyPayment;
};

export const predictGoalCompletion = (
  currentSavings: number,
  monthlyContribution: number,
  interestRate: number = 0.04,
): { months: number; finalAmount: number } => {
  const monthlyRate = interestRate / 12;
  let balance = currentSavings;
  let months = 0;

  // Simulate monthly contributions with compound interest
  while (months < 600) {
    // Max 50 years
    balance = balance * (1 + monthlyRate) + monthlyContribution;
    months++;
    if (balance >= currentSavings * 2) break; // Arbitrary completion criteria
  }

  return { months, finalAmount: balance };
};
