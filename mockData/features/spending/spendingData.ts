// Spending Mock Data - Enhanced Spending Analysis

export const mockPaymentMethods = [
  {
    id: "credit-main",
    name: "Main Credit Card",
    type: "credit" as const,
    amount: 18500,
    transactions: 67,
    avgTransaction: 276,
    color: "#3B82F6",
    icon: "💳",
    trend: "up" as const,
    trendPercent: 15,
    lastUsed: new Date(),
  },
  {
    id: "debit-checking",
    name: "Checking Account",
    type: "debit" as const,
    amount: 12300,
    transactions: 45,
    avgTransaction: 273,
    color: "#10B981",
    icon: "🏦",
    trend: "stable" as const,
    trendPercent: 3,
    lastUsed: new Date(),
  },
  {
    id: "ewallet-main",
    name: "Digital Wallet",
    type: "ewallet" as const,
    amount: 5600,
    transactions: 89,
    avgTransaction: 63,
    color: "#8B5CF6",
    icon: "📱",
    trend: "up" as const,
    trendPercent: 22,
    lastUsed: new Date(),
  },
  {
    id: "cash",
    name: "Cash",
    type: "cash" as const,
    amount: 1100,
    transactions: 12,
    avgTransaction: 92,
    color: "#F59E0B",
    icon: "💵",
    trend: "down" as const,
    trendPercent: -8,
    lastUsed: new Date(),
  },
];

// Generate mock spending data using Universal Category System
export const generateMockSpendingData = () => {
  const monthlyIncome = 50000;
  
  return [
    // Housing & Utilities
    { categoryId: "HOUSING_RENT", amount: 12000, transactions: 1, avgAmount: 12000 },
    { categoryId: "UTILITIES_ELECTRICITY", amount: 2500, transactions: 1, avgAmount: 2500 },
    { categoryId: "UTILITIES_WATER", amount: 800, transactions: 1, avgAmount: 800 },
    { categoryId: "UTILITIES_INTERNET", amount: 1200, transactions: 1, avgAmount: 1200 },
    
    // Food & Dining
    { categoryId: "FOOD_GROCERIES", amount: 8000, transactions: 15, avgAmount: 533 },
    { categoryId: "FOOD_DINING_OUT", amount: 4500, transactions: 12, avgAmount: 375 },
    { categoryId: "FOOD_COFFEE_SHOPS", amount: 1800, transactions: 24, avgAmount: 75 },
    
    // Transportation
    { categoryId: "TRANSPORT_FUEL", amount: 3200, transactions: 8, avgAmount: 400 },
    { categoryId: "TRANSPORT_PUBLIC", amount: 1500, transactions: 20, avgAmount: 75 },
    { categoryId: "TRANSPORT_RIDE_SHARING", amount: 2200, transactions: 15, avgAmount: 147 },
    
    // Healthcare
    { categoryId: "HEALTHCARE_MEDICAL", amount: 2500, transactions: 3, avgAmount: 833 },
    { categoryId: "HEALTHCARE_PHARMACY", amount: 800, transactions: 5, avgAmount: 160 },
    { categoryId: "HEALTHCARE_INSURANCE", amount: 3500, transactions: 1, avgAmount: 3500 },
    
    // Entertainment & Lifestyle
    { categoryId: "ENTERTAINMENT_STREAMING", amount: 1200, transactions: 4, avgAmount: 300 },
    { categoryId: "ENTERTAINMENT_MOVIES", amount: 800, transactions: 6, avgAmount: 133 },
    { categoryId: "ENTERTAINMENT_GAMING", amount: 1500, transactions: 3, avgAmount: 500 },
    
    // Shopping
    { categoryId: "SHOPPING_CLOTHING", amount: 3500, transactions: 8, avgAmount: 438 },
    { categoryId: "SHOPPING_ELECTRONICS", amount: 2800, transactions: 2, avgAmount: 1400 },
    { categoryId: "SHOPPING_HOME_GARDEN", amount: 1200, transactions: 4, avgAmount: 300 },
    
    // Financial
    { categoryId: "FINANCIAL_INVESTMENTS", amount: 8000, transactions: 2, avgAmount: 4000 },
    { categoryId: "FINANCIAL_SAVINGS", amount: 5000, transactions: 1, avgAmount: 5000 },
    { categoryId: "FINANCIAL_INSURANCE", amount: 2200, transactions: 2, avgAmount: 1100 },
  ];
};
