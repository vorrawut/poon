// Dashboard Mock Data - Financial Universe Goals

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  isCompleted: boolean;
}

export const mockFinancialUniverseGoals: Goal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    targetAmount: 10000,
    currentAmount: 7500,
    category: "safety",
    isCompleted: false,
  },
  {
    id: "2",
    name: "Vacation to Japan",
    targetAmount: 5000,
    currentAmount: 5000,
    category: "travel",
    isCompleted: true,
  },
  {
    id: "3",
    name: "New Car Down Payment",
    targetAmount: 8000,
    currentAmount: 2400,
    category: "transportation",
    isCompleted: false,
  },
  {
    id: "4",
    name: "Investment Portfolio",
    targetAmount: 50000,
    currentAmount: 12800,
    category: "investment",
    isCompleted: false,
  },
  {
    id: "5",
    name: "Home Down Payment",
    targetAmount: 80000,
    currentAmount: 15200,
    category: "home",
    isCompleted: false,
  },
];

export const mockSpendingData = {
  monthlySpending: 3450,
  previousMonthSpending: 3200,
  spendingChange: 7.8,
  topCategories: [
    { name: "Food", amount: 890, color: "#F59E0B" },
    { name: "Transport", amount: 450, color: "#3B82F6" },
    { name: "Entertainment", amount: 320, color: "#8B5CF6" },
    { name: "Shopping", amount: 280, color: "#EF4444" },
  ],
};
