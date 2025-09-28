// Spending Mock Data - Enhanced Spending Analysis
import {
  SpendingCategory,
  SpendingCategoryType,
  getCategoryById,
} from "../../../src/types/spending";

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
  const categories = [
    // Housing & Utilities (combined)
    { categoryId: "housing", amount: 16500, transactions: 4, avgAmount: 4125 },
    
    // Food & Dining
    { categoryId: "groceries", amount: 8000, transactions: 15, avgAmount: 533 },
    { categoryId: "food_drink", amount: 6300, transactions: 36, avgAmount: 175 },
    
    // Transportation (combined)
    { categoryId: "transportation", amount: 6900, transactions: 43, avgAmount: 160 },
    
    // Healthcare (combined)
    { categoryId: "health_fitness", amount: 6800, transactions: 9, avgAmount: 756 },
    
    // Entertainment & Lifestyle (combined)
    { categoryId: "entertainment", amount: 3500, transactions: 13, avgAmount: 269 },
    
    // Shopping (combined)
    { categoryId: "shopping", amount: 7500, transactions: 14, avgAmount: 536 },
    
    // Financial (combined)
    { categoryId: "savings_investments", amount: 13000, transactions: 3, avgAmount: 4333 },
    { categoryId: "miscellaneous", amount: 2200, transactions: 2, avgAmount: 1100 },
  ];

  // Convert to proper SpendingCategory format
  return categories.map((cat) => {
    const categoryConfig = getCategoryById(cat.categoryId as SpendingCategory);
    return {
      id: cat.categoryId,
      name: categoryConfig.name,
      amount: cat.amount,
      budget: Math.round(cat.amount * 1.2), // 20% buffer for budget
      color: categoryConfig.color,
      icon: categoryConfig.icon,
      trend: cat.amount > 5000 ? ("up" as const) : ("stable" as const),
      trendPercent: cat.amount > 5000 ? Math.round(Math.random() * 10) : 0,
      transactions: cat.transactions,
      frequency: cat.transactions,
      healthStatus: cat.amount <= cat.amount * 1.2 ? ("healthy" as const) : ("warning" as const),
    };
  });
};

// Generate comprehensive mock transaction data using the universal category system
export const generateMockTransactionData = () => {
  let transactionId = 1;

  // Essential spending
  const essentialTransactions = [
    {
      name: "Monthly Rent",
      category: SpendingCategory.HOUSING,
      amount: 15000,
      merchant: "Property Management",
    },
    {
      name: "Electricity Bill",
      category: SpendingCategory.HOUSING,
      amount: 2800,
      merchant: "MEA",
    },
    {
      name: "Internet Bill",
      category: SpendingCategory.HOUSING,
      amount: 990,
      merchant: "True Online",
    },
    {
      name: "Weekly Groceries",
      category: SpendingCategory.GROCERIES,
      amount: 3500,
      merchant: "Tesco Lotus",
    },
    {
      name: "Fresh Market",
      category: SpendingCategory.GROCERIES,
      amount: 800,
      merchant: "Local Market",
    },
    {
      name: "Fuel",
      category: SpendingCategory.TRANSPORTATION,
      amount: 2200,
      merchant: "PTT Station",
    },
    {
      name: "BTS Card Top-up",
      category: SpendingCategory.TRANSPORTATION,
      amount: 500,
      merchant: "BTS",
    },
    {
      name: "Health Insurance",
      category: SpendingCategory.BILLS_SERVICES,
      amount: 1800,
      merchant: "AIA Thailand",
    },
    {
      name: "Mobile Plan",
      category: SpendingCategory.BILLS_SERVICES,
      amount: 599,
      merchant: "AIS",
    },
  ];

  // Lifestyle spending
  const lifestyleTransactions = [
    {
      name: "Coffee Shop",
      category: SpendingCategory.FOOD_DRINK,
      amount: 180,
      merchant: "Starbucks",
    },
    {
      name: "Lunch",
      category: SpendingCategory.FOOD_DRINK,
      amount: 250,
      merchant: "Food Court",
    },
    {
      name: "Dinner Date",
      category: SpendingCategory.FOOD_DRINK,
      amount: 1200,
      merchant: "Fine Dining",
    },
    {
      name: "Food Delivery",
      category: SpendingCategory.FOOD_DRINK,
      amount: 320,
      merchant: "Foodpanda",
    },
    {
      name: "Clothing",
      category: SpendingCategory.SHOPPING,
      amount: 2500,
      merchant: "Uniqlo",
    },
    {
      name: "Electronics",
      category: SpendingCategory.SHOPPING,
      amount: 4500,
      merchant: "Power Buy",
    },
    {
      name: "Movie Tickets",
      category: SpendingCategory.ENTERTAINMENT,
      amount: 480,
      merchant: "SF Cinema",
    },
    {
      name: "Concert",
      category: SpendingCategory.ENTERTAINMENT,
      amount: 2800,
      merchant: "Live Nation",
    },
    {
      name: "Gym Membership",
      category: SpendingCategory.HEALTH_FITNESS,
      amount: 1200,
      merchant: "Fitness First",
    },
    {
      name: "Supplements",
      category: SpendingCategory.HEALTH_FITNESS,
      amount: 890,
      merchant: "GNC",
    },
    {
      name: "Weekend Trip",
      category: SpendingCategory.TRAVEL,
      amount: 3500,
      merchant: "Agoda",
    },
  ];

  // Obligations
  const obligationTransactions = [
    {
      name: "Online Course",
      category: SpendingCategory.EDUCATION,
      amount: 1200,
      merchant: "Udemy",
    },
    {
      name: "Credit Card Payment",
      category: SpendingCategory.DEBT_LOANS,
      amount: 5000,
      merchant: "Kasikorn Bank",
    },
    {
      name: "Pet Food",
      category: SpendingCategory.PETS,
      amount: 800,
      merchant: "Pet Lover",
    },
  ];

  // Extras
  const extraTransactions = [
    {
      name: "Birthday Gift",
      category: SpendingCategory.GIFTS_DONATIONS,
      amount: 1500,
      merchant: "Gift Shop",
    },
    {
      name: "Netflix",
      category: SpendingCategory.SUBSCRIPTIONS,
      amount: 419,
      merchant: "Netflix",
    },
    {
      name: "Spotify Premium",
      category: SpendingCategory.SUBSCRIPTIONS,
      amount: 149,
      merchant: "Spotify",
    },
    {
      name: "Wedding Gift",
      category: SpendingCategory.EVENTS_CELEBRATIONS,
      amount: 2000,
      merchant: "Cash",
    },
  ];

  // Financial Flow
  const financialTransactions = [
    {
      name: "Emergency Fund",
      category: SpendingCategory.SAVINGS_INVESTMENTS,
      amount: 5000,
      merchant: "Savings Account",
    },
    {
      name: "Stock Investment",
      category: SpendingCategory.SAVINGS_INVESTMENTS,
      amount: 3000,
      merchant: "SET Trade",
    },
  ];

  // Combine all transactions
  const allTransactions = [
    ...essentialTransactions,
    ...lifestyleTransactions,
    ...obligationTransactions,
    ...extraTransactions,
    ...financialTransactions,
  ];

  // Convert to the expected format
  return allTransactions.map((transaction) => {
    const categoryConfig = getCategoryById(transaction.category);
    const isEssential = categoryConfig.type === SpendingCategoryType.ESSENTIALS;

    return {
      id: (transactionId++).toString(),
      name: transaction.name,
      amount: transaction.amount,
      category: categoryConfig.name,
      type: isEssential ? ("essential" as const) : ("lifestyle" as const),
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
      merchant: transaction.merchant,
    };
  });
};
