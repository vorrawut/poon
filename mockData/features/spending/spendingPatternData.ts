import type { SpendingTransaction, SpendingPattern } from "../../../src/features/spending/components/SpendingPatternAnalyzer";

// Generate realistic spending transactions over the past 3 months
const generateRealisticTransactions = (): SpendingTransaction[] => {
  const transactions: SpendingTransaction[] = [];
  const categories = [
    "Food & Dining",
    "Transportation", 
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Travel",
    "Education",
    "Groceries",
    "Gas & Fuel"
  ];

  const merchants = {
    "Food & Dining": ["McDonald's", "Starbucks", "Pizza Hut", "KFC", "Subway", "Local Restaurant"],
    "Transportation": ["BTS", "Grab", "Taxi", "Gas Station", "Parking"],
    "Shopping": ["Central", "Big C", "Lazada", "Shopee", "7-Eleven"],
    "Entertainment": ["Cinema", "Netflix", "Spotify", "Game Store", "Concert"],
    "Bills & Utilities": ["Electricity", "Water", "Internet", "Phone", "Insurance"],
    "Healthcare": ["Hospital", "Pharmacy", "Clinic", "Dental"],
    "Travel": ["Airbnb", "Hotel", "Flight", "Tour", "Car Rental"],
    "Education": ["University", "Course", "Books", "Online Learning"],
    "Groceries": ["Tesco Lotus", "Big C", "Villa Market", "Local Market"],
    "Gas & Fuel": ["PTT", "Shell", "Esso", "Bangchak"]
  };

  const locations = [
    "Bangkok", "Sukhumvit", "Silom", "Siam", "Chatuchak", 
    "Thonglor", "Ekkamai", "Phrom Phong", "Asok", "Ratchada"
  ];

  // Generate transactions for the past 90 days
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 90);

  for (let i = 0; i < 250; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const merchantList = merchants[category as keyof typeof merchants];
    const merchant = merchantList[Math.floor(Math.random() * merchantList.length)];
    
    // Generate realistic transaction date (more frequent on weekends for some categories)
    const randomDays = Math.floor(Math.random() * 90);
    const transactionDate = new Date(startDate);
    transactionDate.setDate(startDate.getDate() + randomDays);
    
    // Weekend spending boost for entertainment and dining
    const isWeekend = transactionDate.getDay() === 0 || transactionDate.getDay() === 6;
    let baseAmount = 0;
    
    // Category-specific realistic amounts (in Thai Baht)
    switch (category) {
      case "Food & Dining":
        baseAmount = isWeekend ? 300 + Math.random() * 800 : 150 + Math.random() * 400;
        break;
      case "Transportation":
        baseAmount = 50 + Math.random() * 200;
        break;
      case "Shopping":
        baseAmount = isWeekend ? 500 + Math.random() * 2000 : 200 + Math.random() * 800;
        break;
      case "Entertainment":
        baseAmount = isWeekend ? 400 + Math.random() * 1200 : 100 + Math.random() * 300;
        break;
      case "Bills & Utilities":
        baseAmount = 500 + Math.random() * 2000;
        break;
      case "Healthcare":
        baseAmount = 300 + Math.random() * 2000;
        break;
      case "Travel":
        baseAmount = 1000 + Math.random() * 5000;
        break;
      case "Education":
        baseAmount = 500 + Math.random() * 3000;
        break;
      case "Groceries":
        baseAmount = 200 + Math.random() * 800;
        break;
      case "Gas & Fuel":
        baseAmount = 800 + Math.random() * 1200;
        break;
      default:
        baseAmount = 100 + Math.random() * 500;
    }

    // Add some seasonal variations
    const month = transactionDate.getMonth();
    if (month === 11 || month === 0) { // December/January - holiday season
      baseAmount *= 1.3;
    } else if (month >= 3 && month <= 5) { // April-June - hot season, more AC/cooling
      if (category === "Bills & Utilities") baseAmount *= 1.4;
    }

    // Recurring transaction detection
    const isRecurring = 
      category === "Bills & Utilities" ||
      (category === "Entertainment" && merchant.includes("Netflix")) ||
      (category === "Entertainment" && merchant.includes("Spotify")) ||
      (category === "Transportation" && merchant === "BTS") ||
      Math.random() < 0.15; // 15% chance for other categories

    transactions.push({
      id: `txn-${i + 1}`,
      amount: Math.round(baseAmount),
      category,
      subcategory: merchant,
      description: `${merchant} - ${category}`,
      date: transactionDate,
      merchant,
      location: locations[Math.floor(Math.random() * locations.length)],
      tags: [
        category.toLowerCase().replace(/\s+/g, '-'),
        isWeekend ? 'weekend' : 'weekday',
        transactionDate.getHours() < 12 ? 'morning' : 
        transactionDate.getHours() < 18 ? 'afternoon' : 'evening'
      ],
      isRecurring,
      confidence: 0.8 + Math.random() * 0.2, // AI confidence between 0.8-1.0
    });
  }

  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Pre-generated realistic spending transactions
export const mockSpendingTransactions: SpendingTransaction[] = generateRealisticTransactions();

// Sample analyzed patterns (would normally be generated by AI)
export const mockAnalyzedPatterns: SpendingPattern[] = [
  {
    id: "trend-food-dining",
    type: "trend",
    category: "Food & Dining",
    title: "Food & Dining Spending Increasing",
    description: "Your food and dining expenses have increased by 23.5% over the past month, with weekend spending showing the most significant growth.",
    confidence: 0.89,
    impact: "medium",
    timeframe: "month",
    data: {
      amount: 18450,
      percentage: 23.5,
      trend: "increasing",
      prediction: 22000,
      comparison: "23% above your average monthly dining budget",
    },
    insights: [
      "Average food & dining spending: ฿615 per transaction",
      "Weekend spending is 85% higher than weekdays",
      "Most expensive meals occur on Friday and Saturday evenings",
      "Delivery apps account for 40% of total food spending",
    ],
    recommendations: [
      "Set a weekly dining budget of ฿4,000 to control spending",
      "Try cooking at home 2-3 times per week",
      "Look for restaurant promotions and happy hour deals",
      "Consider meal prep on Sundays to reduce weekday takeout",
    ],
    visualizationType: "line",
  },
  {
    id: "recurring-subscriptions",
    type: "recurring",
    category: "Entertainment",
    title: "Multiple Entertainment Subscriptions",
    description: "You have 5 active entertainment subscriptions totaling ฿1,280 per month. Some services may be underutilized.",
    confidence: 0.95,
    impact: "medium",
    timeframe: "month",
    data: {
      amount: 1280,
      frequency: "monthly",
      percentage: 12.8,
    },
    insights: [
      "Netflix Premium: ฿419/month",
      "Spotify Premium: ฿149/month", 
      "Disney+ Hotstar: ฿149/month",
      "YouTube Premium: ฿129/month",
      "Apple Music: ฿150/month",
      "Total monthly cost: ฿996",
    ],
    recommendations: [
      "Review which services you actively use each month",
      "Cancel subscriptions you haven't used in 30+ days",
      "Consider sharing family plans with household members",
      "Look for annual payment discounts (save 15-20%)",
    ],
    visualizationType: "bar",
  },
  {
    id: "anomaly-shopping-spike",
    type: "anomaly",
    category: "Shopping",
    title: "Unusual Shopping Expense Detected",
    description: "Found an unusually large shopping transaction of ฿8,750 at Central on March 15th, which is 340% above your average shopping expense.",
    confidence: 0.82,
    impact: "high",
    timeframe: "month",
    data: {
      amount: 8750,
      percentage: 340,
      comparison: "340% above average shopping transaction",
    },
    insights: [
      "Average shopping expense: ฿650 per transaction",
      "This transaction: ฿8,750 at Central Department Store",
      "Purchase date: March 15th (Saturday afternoon)",
      "Category: Fashion & Accessories",
    ],
    recommendations: [
      "Verify this was a planned major purchase",
      "Consider if similar large purchases are necessary",
      "Set spending alerts for transactions over ฿3,000",
      "Plan major purchases in advance to spread costs",
    ],
    visualizationType: "scatter",
  },
  {
    id: "behavioral-weekend-dining",
    type: "behavioral",
    category: "Food & Dining",
    title: "Weekend Dining Spending Pattern",
    description: "You spend 75% more on food and dining during weekends, with Saturday being your peak spending day at ฿1,200 average.",
    confidence: 0.78,
    impact: "medium",
    timeframe: "month",
    data: {
      amount: 4800,
      percentage: 75,
      frequency: "weekly",
    },
    insights: [
      "Saturday average: ฿1,200 (peak day)",
      "Sunday average: ฿950",
      "Weekday average: ฿420",
      "Most common time: 7-9 PM on weekends",
    ],
    recommendations: [
      "Set a weekend dining budget of ฿2,000",
      "Look for weekend lunch deals instead of dinner",
      "Consider home cooking for one weekend meal",
      "Plan weekend dining in advance to avoid impulse spending",
    ],
    visualizationType: "heatmap",
  },
  {
    id: "trend-transportation-decreasing",
    type: "trend",
    category: "Transportation",
    title: "Transportation Costs Decreasing",
    description: "Great news! Your transportation expenses have decreased by 18% over the past quarter, likely due to increased work-from-home days.",
    confidence: 0.85,
    impact: "low",
    timeframe: "quarter",
    data: {
      amount: 3200,
      percentage: -18,
      trend: "decreasing",
      prediction: 2800,
    },
    insights: [
      "Monthly transportation average: ฿1,067 (down from ฿1,300)",
      "BTS usage decreased by 25%",
      "Grab rides decreased by 30%",
      "Gas expenses stable (weekend trips maintained)",
    ],
    recommendations: [
      "Excellent progress! Keep up the reduced commuting",
      "Consider reallocating saved money to emergency fund",
      "Maintain this trend by continuing hybrid work",
      "Use saved transportation budget for health/fitness activities",
    ],
    visualizationType: "line",
  },
  {
    id: "seasonal-utility-spike",
    type: "seasonal",
    category: "Bills & Utilities",
    title: "Seasonal Electricity Usage Pattern",
    description: "Your electricity bills show a predictable 45% increase during hot season months (March-May) due to air conditioning usage.",
    confidence: 0.92,
    impact: "high",
    timeframe: "year",
    data: {
      amount: 2800,
      percentage: 45,
      frequency: "seasonal",
    },
    insights: [
      "Cool season average: ฿1,200/month",
      "Hot season average: ฿1,740/month", 
      "Peak usage: April (฿1,950)",
      "AC accounts for 60% of hot season bill increase",
    ],
    recommendations: [
      "Budget extra ฿600/month for hot season electricity",
      "Set AC to 25°C instead of 22°C (save 15%)",
      "Use fans to circulate cool air more efficiently",
      "Consider energy-efficient appliances for long-term savings",
    ],
    visualizationType: "line",
  },
];

// Export combined data for easy import
export const spendingAnalysisData = {
  transactions: mockSpendingTransactions,
  patterns: mockAnalyzedPatterns,
};

// Utility functions for generating realistic data
export const generateRandomSpendingData = (
  days: number = 30,
  categoriesFilter?: string[]
): SpendingTransaction[] => {
  return mockSpendingTransactions
    .filter(t => {
      const daysDiff = (new Date().getTime() - t.date.getTime()) / (1000 * 60 * 60 * 24);
      const withinTimeframe = daysDiff <= days;
      const matchesCategory = !categoriesFilter || categoriesFilter.includes(t.category);
      return withinTimeframe && matchesCategory;
    })
    .slice(0, Math.min(50, Math.floor(days * 1.5))); // Reasonable number of transactions
};

export const getSpendingByCategory = (transactions: SpendingTransaction[]) => {
  return transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);
};

export const getSpendingTrend = (transactions: SpendingTransaction[], days: number = 30) => {
  const dailySpending = transactions.reduce((acc, transaction) => {
    const dateKey = transaction.date.toISOString().split('T')[0];
    acc[dateKey] = (acc[dateKey] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(dailySpending)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-days)
    .map(([date, amount]) => ({ date, amount }));
};
