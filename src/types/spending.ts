// Universal Spending Categories System
// Based on spending_categories.md - covers all human spending without over-complication

export const SpendingCategoryType = {
  ESSENTIALS: "essentials",
  LIFESTYLE: "lifestyle",
  OBLIGATIONS: "obligations",
  EXTRAS: "extras",
  FINANCIAL_FLOW: "financial_flow",
} as const;

export type SpendingCategoryType =
  (typeof SpendingCategoryType)[keyof typeof SpendingCategoryType];

export const SpendingCategory = {
  // 🏠 ESSENTIALS
  HOUSING: "housing",
  GROCERIES: "groceries",
  TRANSPORTATION: "transportation",
  BILLS_SERVICES: "bills_services",

  // 🍜 LIFESTYLE
  FOOD_DRINK: "food_drink",
  SHOPPING: "shopping",
  ENTERTAINMENT: "entertainment",
  TRAVEL: "travel",
  HEALTH_FITNESS: "health_fitness",

  // 💼 OBLIGATIONS
  EDUCATION: "education",
  FAMILY_CHILDREN: "family_children",
  PETS: "pets",
  DEBT_LOANS: "debt_loans",

  // 🎉 EXTRAS
  GIFTS_DONATIONS: "gifts_donations",
  EVENTS_CELEBRATIONS: "events_celebrations",
  SUBSCRIPTIONS: "subscriptions",

  // 💳 FINANCIAL FLOW
  SAVINGS_INVESTMENTS: "savings_investments",
  MISCELLANEOUS: "miscellaneous",
} as const;

export type SpendingCategory =
  (typeof SpendingCategory)[keyof typeof SpendingCategory];

export interface SpendingCategoryConfig {
  id: SpendingCategory;
  name: string;
  type: SpendingCategoryType;
  icon: string;
  color: string;
  description: string;
  subcategories: string[];
  keywords: string[]; // For auto-categorization
}

export const SPENDING_CATEGORIES: Record<
  SpendingCategory,
  SpendingCategoryConfig
> = {
  // 🏠 ESSENTIALS
  [SpendingCategory.HOUSING]: {
    id: SpendingCategory.HOUSING,
    name: "Housing",
    type: SpendingCategoryType.ESSENTIALS,
    icon: "🏠",
    color: "#3B82F6",
    description: "Rent, mortgage, utilities, internet, phone",
    subcategories: [
      "Rent",
      "Mortgage",
      "Electricity",
      "Water",
      "Internet",
      "Phone Bill",
      "Home Insurance",
      "Property Tax",
      "Maintenance",
      "Security",
    ],
    keywords: [
      "rent",
      "mortgage",
      "utilities",
      "electric",
      "water",
      "internet",
      "phone",
      "wifi",
      "cable",
    ],
  },

  [SpendingCategory.GROCERIES]: {
    id: SpendingCategory.GROCERIES,
    name: "Groceries",
    type: SpendingCategoryType.ESSENTIALS,
    icon: "🛒",
    color: "#10B981",
    description: "Supermarket, fresh market, daily essentials",
    subcategories: [
      "Supermarket",
      "Fresh Market",
      "Convenience Store",
      "Organic Food",
      "Household Items",
      "Personal Care",
      "Cleaning Supplies",
    ],
    keywords: [
      "grocery",
      "supermarket",
      "7-eleven",
      "tesco",
      "big c",
      "market",
      "food",
      "household",
    ],
  },

  [SpendingCategory.TRANSPORTATION]: {
    id: SpendingCategory.TRANSPORTATION,
    name: "Transportation",
    type: SpendingCategoryType.ESSENTIALS,
    icon: "🚗",
    color: "#F59E0B",
    description: "Fuel, public transit, taxi/ride-sharing, car maintenance",
    subcategories: [
      "Fuel/Gas",
      "Public Transit",
      "Taxi/Grab/Uber",
      "Car Maintenance",
      "Car Insurance",
      "Parking",
      "Tolls",
      "Car Payment",
      "Registration",
    ],
    keywords: [
      "fuel",
      "gas",
      "bts",
      "mrt",
      "taxi",
      "grab",
      "uber",
      "bolt",
      "car",
      "maintenance",
      "parking",
    ],
  },

  [SpendingCategory.BILLS_SERVICES]: {
    id: SpendingCategory.BILLS_SERVICES,
    name: "Bills & Services",
    type: SpendingCategoryType.ESSENTIALS,
    icon: "📄",
    color: "#6366F1",
    description: "Insurance, mobile plan, recurring household bills",
    subcategories: [
      "Health Insurance",
      "Life Insurance",
      "Mobile Plan",
      "Bank Fees",
      "Government Services",
      "Legal Services",
      "Accounting",
      "Professional Services",
    ],
    keywords: [
      "insurance",
      "mobile",
      "plan",
      "bank",
      "fee",
      "government",
      "legal",
      "accounting",
      "service",
    ],
  },

  // 🍜 LIFESTYLE
  [SpendingCategory.FOOD_DRINK]: {
    id: SpendingCategory.FOOD_DRINK,
    name: "Food & Drink",
    type: SpendingCategoryType.LIFESTYLE,
    icon: "🍽️",
    color: "#EF4444",
    description: "Restaurants, cafes, delivery, dining out",
    subcategories: [
      "Restaurants",
      "Coffee Shops",
      "Food Delivery",
      "Fast Food",
      "Fine Dining",
      "Bars/Pubs",
      "Street Food",
      "Bakery",
      "Ice Cream",
      "Snacks",
    ],
    keywords: [
      "restaurant",
      "cafe",
      "coffee",
      "starbucks",
      "delivery",
      "foodpanda",
      "grab food",
      "mcdonald",
      "kfc",
      "bar",
    ],
  },

  [SpendingCategory.SHOPPING]: {
    id: SpendingCategory.SHOPPING,
    name: "Shopping",
    type: SpendingCategoryType.LIFESTYLE,
    icon: "🛍️",
    color: "#EC4899",
    description: "Clothing, gadgets, beauty, home decor",
    subcategories: [
      "Clothing",
      "Electronics",
      "Beauty/Cosmetics",
      "Home Decor",
      "Books",
      "Jewelry",
      "Accessories",
      "Shoes",
      "Bags",
      "Furniture",
    ],
    keywords: [
      "clothing",
      "fashion",
      "electronics",
      "gadget",
      "beauty",
      "cosmetic",
      "makeup",
      "home",
      "decor",
      "book",
    ],
  },

  [SpendingCategory.ENTERTAINMENT]: {
    id: SpendingCategory.ENTERTAINMENT,
    name: "Entertainment & Leisure",
    type: SpendingCategoryType.LIFESTYLE,
    icon: "🎬",
    color: "#8B5CF6",
    description: "Movies, games, streaming, concerts, hobbies",
    subcategories: [
      "Movies/Cinema",
      "Gaming",
      "Streaming Services",
      "Concerts/Shows",
      "Sports Events",
      "Hobbies",
      "Art/Crafts",
      "Music",
      "Photography",
      "Recreation",
    ],
    keywords: [
      "movie",
      "cinema",
      "game",
      "netflix",
      "spotify",
      "concert",
      "show",
      "sport",
      "hobby",
      "art",
      "music",
    ],
  },

  [SpendingCategory.TRAVEL]: {
    id: SpendingCategory.TRAVEL,
    name: "Travel",
    type: SpendingCategoryType.LIFESTYLE,
    icon: "✈️",
    color: "#06B6D4",
    description: "Flights, hotels, tours, visas, vacation expenses",
    subcategories: [
      "Flights",
      "Hotels/Accommodation",
      "Tours/Activities",
      "Visas/Documents",
      "Travel Insurance",
      "Local Transport",
      "Souvenirs",
      "Travel Gear",
      "Vacation Food",
      "Emergency Travel",
    ],
    keywords: [
      "flight",
      "hotel",
      "travel",
      "tour",
      "visa",
      "vacation",
      "trip",
      "airline",
      "booking",
      "airbnb",
    ],
  },

  [SpendingCategory.HEALTH_FITNESS]: {
    id: SpendingCategory.HEALTH_FITNESS,
    name: "Health & Fitness",
    type: SpendingCategoryType.LIFESTYLE,
    icon: "💪",
    color: "#84CC16",
    description: "Gym, sports, supplements, wellness, medical",
    subcategories: [
      "Gym/Fitness",
      "Sports Equipment",
      "Supplements",
      "Medical/Doctor",
      "Pharmacy/Medicine",
      "Wellness/Spa",
      "Dental",
      "Vision/Glasses",
      "Mental Health",
      "Alternative Medicine",
    ],
    keywords: [
      "gym",
      "fitness",
      "sport",
      "supplement",
      "doctor",
      "medical",
      "pharmacy",
      "medicine",
      "wellness",
      "spa",
    ],
  },

  // 💼 OBLIGATIONS
  [SpendingCategory.EDUCATION]: {
    id: SpendingCategory.EDUCATION,
    name: "Education",
    type: SpendingCategoryType.OBLIGATIONS,
    icon: "🎓",
    color: "#F97316",
    description: "Tuition, books, courses, educational subscriptions",
    subcategories: [
      "Tuition/School Fees",
      "Books/Materials",
      "Online Courses",
      "Certification",
      "Educational Apps",
      "Tutoring",
      "Workshops/Seminars",
      "School Supplies",
      "Uniforms",
      "Field Trips",
    ],
    keywords: [
      "tuition",
      "school",
      "education",
      "course",
      "book",
      "udemy",
      "coursera",
      "skillshare",
      "certification",
    ],
  },

  [SpendingCategory.FAMILY_CHILDREN]: {
    id: SpendingCategory.FAMILY_CHILDREN,
    name: "Family & Children",
    type: SpendingCategoryType.OBLIGATIONS,
    icon: "👨‍👩‍👧‍👦",
    color: "#BE185D",
    description: "Kids' expenses, daycare, school, family support",
    subcategories: [
      "Childcare/Daycare",
      "Kids' Clothing",
      "Baby Supplies",
      "Toys/Games",
      "Kids' Activities",
      "Family Support",
      "Elderly Care",
      "Kids' Medical",
      "School Activities",
      "Family Events",
    ],
    keywords: [
      "child",
      "baby",
      "kids",
      "daycare",
      "family",
      "support",
      "elderly",
      "parent",
      "toy",
      "diaper",
    ],
  },

  [SpendingCategory.PETS]: {
    id: SpendingCategory.PETS,
    name: "Pets",
    type: SpendingCategoryType.OBLIGATIONS,
    icon: "🐕",
    color: "#059669",
    description: "Pet food, veterinary, accessories, pet care",
    subcategories: [
      "Pet Food",
      "Veterinary",
      "Pet Accessories",
      "Pet Grooming",
      "Pet Insurance",
      "Pet Toys",
      "Pet Training",
      "Pet Boarding",
      "Pet Medicine",
      "Pet Supplies",
    ],
    keywords: [
      "pet",
      "dog",
      "cat",
      "vet",
      "veterinary",
      "pet food",
      "grooming",
      "animal",
      "pet care",
    ],
  },

  [SpendingCategory.DEBT_LOANS]: {
    id: SpendingCategory.DEBT_LOANS,
    name: "Debt & Loans",
    type: SpendingCategoryType.OBLIGATIONS,
    icon: "💳",
    color: "#DC2626",
    description: "Credit card payments, student loans, personal loans",
    subcategories: [
      "Credit Card Payment",
      "Student Loans",
      "Personal Loans",
      "Car Loan",
      "Home Loan",
      "Business Loan",
      "Interest Charges",
      "Late Fees",
      "Debt Consolidation",
      "Loan Insurance",
    ],
    keywords: [
      "credit card",
      "loan",
      "debt",
      "payment",
      "student loan",
      "mortgage",
      "interest",
      "installment",
    ],
  },

  // 🎉 EXTRAS
  [SpendingCategory.GIFTS_DONATIONS]: {
    id: SpendingCategory.GIFTS_DONATIONS,
    name: "Gifts & Donations",
    type: SpendingCategoryType.EXTRAS,
    icon: "🎁",
    color: "#7C3AED",
    description: "Presents, charity, religious giving, donations",
    subcategories: [
      "Birthday Gifts",
      "Holiday Gifts",
      "Charity Donations",
      "Religious Giving",
      "Fundraising",
      "Tips/Gratuity",
      "Gift Cards",
      "Wedding Gifts",
      "Thank You Gifts",
      "Corporate Gifts",
    ],
    keywords: [
      "gift",
      "present",
      "donation",
      "charity",
      "religious",
      "tip",
      "gratuity",
      "giving",
      "fundraising",
    ],
  },

  [SpendingCategory.EVENTS_CELEBRATIONS]: {
    id: SpendingCategory.EVENTS_CELEBRATIONS,
    name: "Events & Celebrations",
    type: SpendingCategoryType.EXTRAS,
    icon: "🎉",
    color: "#DB2777",
    description: "Weddings, birthdays, festivals, special occasions",
    subcategories: [
      "Weddings",
      "Birthday Parties",
      "Festivals",
      "Anniversaries",
      "Graduations",
      "Baby Showers",
      "Holiday Celebrations",
      "Corporate Events",
      "Social Gatherings",
      "Cultural Events",
    ],
    keywords: [
      "wedding",
      "birthday",
      "party",
      "festival",
      "celebration",
      "anniversary",
      "graduation",
      "holiday",
    ],
  },

  [SpendingCategory.SUBSCRIPTIONS]: {
    id: SpendingCategory.SUBSCRIPTIONS,
    name: "Subscriptions & Memberships",
    type: SpendingCategoryType.EXTRAS,
    icon: "📱",
    color: "#0891B2",
    description: "Netflix, Spotify, apps, clubs, recurring services",
    subcategories: [
      "Streaming Services",
      "Music Services",
      "App Subscriptions",
      "Cloud Storage",
      "News/Magazines",
      "Club Memberships",
      "Professional Memberships",
      "Software Licenses",
      "Gaming Subscriptions",
      "Delivery Services",
    ],
    keywords: [
      "netflix",
      "spotify",
      "subscription",
      "membership",
      "app",
      "cloud",
      "magazine",
      "club",
      "software",
    ],
  },

  // 💳 FINANCIAL FLOW
  [SpendingCategory.SAVINGS_INVESTMENTS]: {
    id: SpendingCategory.SAVINGS_INVESTMENTS,
    name: "Savings & Investments",
    type: SpendingCategoryType.FINANCIAL_FLOW,
    icon: "💰",
    color: "#16A34A",
    description: "Deposits, stocks, crypto, retirement fund, investments",
    subcategories: [
      "Savings Account",
      "Fixed Deposits",
      "Stocks/Equities",
      "Mutual Funds",
      "Cryptocurrency",
      "Retirement Fund",
      "Emergency Fund",
      "Investment Apps",
      "Gold/Precious Metals",
      "Real Estate Investment",
    ],
    keywords: [
      "savings",
      "investment",
      "stock",
      "crypto",
      "bitcoin",
      "fund",
      "deposit",
      "retirement",
      "emergency",
    ],
  },

  [SpendingCategory.MISCELLANEOUS]: {
    id: SpendingCategory.MISCELLANEOUS,
    name: "Miscellaneous/Other",
    type: SpendingCategoryType.FINANCIAL_FLOW,
    icon: "❓",
    color: "#6B7280",
    description: "Anything uncategorized - temporary bucket",
    subcategories: [
      "Uncategorized",
      "Cash Withdrawal",
      "ATM Fees",
      "Currency Exchange",
      "Refunds",
      "Adjustments",
      "Unknown Charges",
      "Temporary",
      "Other Expenses",
      "Unidentified",
    ],
    keywords: [
      "other",
      "miscellaneous",
      "unknown",
      "cash",
      "atm",
      "fee",
      "refund",
      "adjustment",
      "unidentified",
    ],
  },
};

// Helper functions for category management
export const getCategoryByType = (
  type: SpendingCategoryType,
): SpendingCategoryConfig[] => {
  return Object.values(SPENDING_CATEGORIES).filter(
    (category) => category.type === type,
  );
};

export const getCategoryById = (
  id: SpendingCategory,
): SpendingCategoryConfig => {
  return SPENDING_CATEGORIES[id];
};

export const getAllCategories = (): SpendingCategoryConfig[] => {
  return Object.values(SPENDING_CATEGORIES);
};

export const getEssentialCategories = (): SpendingCategoryConfig[] => {
  return getCategoryByType(SpendingCategoryType.ESSENTIALS);
};

export const getLifestyleCategories = (): SpendingCategoryConfig[] => {
  return getCategoryByType(SpendingCategoryType.LIFESTYLE);
};

// Auto-categorization helper
export const suggestCategoryFromDescription = (
  description: string,
): SpendingCategory => {
  const lowerDesc = description.toLowerCase();

  for (const category of Object.values(SPENDING_CATEGORIES)) {
    for (const keyword of category.keywords) {
      if (lowerDesc.includes(keyword.toLowerCase())) {
        return category.id;
      }
    }
  }

  return SpendingCategory.MISCELLANEOUS;
};

// Category type helpers
export const isEssential = (categoryId: SpendingCategory): boolean => {
  return (
    SPENDING_CATEGORIES[categoryId].type === SpendingCategoryType.ESSENTIALS
  );
};

export const isLifestyle = (categoryId: SpendingCategory): boolean => {
  return (
    SPENDING_CATEGORIES[categoryId].type === SpendingCategoryType.LIFESTYLE
  );
};

// Budget recommendations based on category type
export const getRecommendedBudgetPercentage = (
  categoryId: SpendingCategory,
): number => {
  const category = SPENDING_CATEGORIES[categoryId];

  switch (category.type) {
    case SpendingCategoryType.ESSENTIALS:
      return 50; // 50% of income for essentials
    case SpendingCategoryType.LIFESTYLE:
      return 30; // 30% of income for lifestyle
    case SpendingCategoryType.OBLIGATIONS:
      return 10; // 10% of income for obligations
    case SpendingCategoryType.EXTRAS:
      return 5; // 5% of income for extras
    case SpendingCategoryType.FINANCIAL_FLOW:
      return 20; // 20% of income for savings/investments
    default:
      return 5;
  }
};

// Export types for use in components
export interface SpendingTransaction {
  id: string;
  amount: number;
  category: SpendingCategory;
  subcategory?: string;
  description: string;
  date: Date;
  merchant?: string;
  paymentMethod?: string;
  tags?: string[];
  notes?: string;
}

export interface SpendingBudget {
  categoryId: SpendingCategory;
  budgetAmount: number;
  spentAmount: number;
  period: "weekly" | "monthly" | "yearly";
}

export interface SpendingInsight {
  categoryId: SpendingCategory;
  insight: string;
  recommendation?: string;
  severity: "info" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  percentage: number;
}
