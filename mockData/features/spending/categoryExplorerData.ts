// Category Explorer Mock Data
export interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: Date;
  merchant: string;
  subcategory: string;
  paymentMethod: string;
  location?: string;
  tags?: string[];
}

export const mockCategoryTransactions: Transaction[] = [
  {
    id: "1",
    name: "Starbucks Coffee",
    amount: 180,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    merchant: "Starbucks",
    subcategory: "Coffee Shops",
    paymentMethod: "Credit Card",
    location: "Siam Paragon",
    tags: ["morning", "routine"],
  },
  {
    id: "2",
    name: "Lunch at Food Court",
    amount: 120,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    merchant: "Food Court",
    subcategory: "Restaurants",
    paymentMethod: "Cash",
    location: "Central World",
  },
  {
    id: "3",
    name: "Dinner with Friends",
    amount: 850,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    merchant: "After You Dessert Cafe",
    subcategory: "Fine Dining",
    paymentMethod: "Credit Card",
    location: "EmQuartier",
    tags: ["social", "weekend"],
  },
  {
    id: "4",
    name: "Food Delivery",
    amount: 320,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    merchant: "Foodpanda",
    subcategory: "Food Delivery",
    paymentMethod: "Digital Wallet",
    location: "Home",
    tags: ["convenience", "late night"],
  },
  {
    id: "5",
    name: "McDonald's",
    amount: 150,
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    merchant: "McDonald's",
    subcategory: "Fast Food",
    paymentMethod: "Credit Card",
    location: "MBK Center",
    tags: ["quick meal"],
  },
  {
    id: "6",
    name: "Grocery Shopping",
    amount: 1250,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    merchant: "Big C",
    subcategory: "Groceries",
    paymentMethod: "Debit Card",
    location: "Big C Ratchadamri",
    tags: ["weekly shopping", "essentials"],
  },
  {
    id: "7",
    name: "Coffee with Colleagues",
    amount: 240,
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    merchant: "True Coffee",
    subcategory: "Coffee Shops",
    paymentMethod: "Credit Card",
    location: "Silom Complex",
    tags: ["work", "social"],
  },
  {
    id: "8",
    name: "Weekend Brunch",
    amount: 680,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    merchant: "Roast Coffee & Eatery",
    subcategory: "Restaurants",
    paymentMethod: "Credit Card",
    location: "Thonglor",
    tags: ["weekend", "brunch", "social"],
  },
  {
    id: "9",
    name: "Street Food",
    amount: 80,
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    merchant: "Street Vendor",
    subcategory: "Street Food",
    paymentMethod: "Cash",
    location: "Chatuchak Market",
    tags: ["authentic", "cheap eats"],
  },
  {
    id: "10",
    name: "Bubble Tea",
    amount: 120,
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    merchant: "Gong Cha",
    subcategory: "Beverages",
    paymentMethod: "Digital Wallet",
    location: "CentralWorld",
    tags: ["afternoon treat"],
  },
];

export const mockCategoryInsights = {
  "Food & Drink": {
    totalSpent: 4040,
    transactionCount: 10,
    averagePerTransaction: 404,
    topSubcategories: [
      { name: "Restaurants", amount: 1650, percentage: 40.8 },
      { name: "Coffee Shops", amount: 660, percentage: 16.3 },
      { name: "Groceries", amount: 1250, percentage: 30.9 },
      { name: "Food Delivery", amount: 320, percentage: 7.9 },
      { name: "Fast Food", amount: 150, percentage: 3.7 },
    ],
    trends: {
      monthOverMonth: 8.5, // percentage change
      weekOverWeek: -2.3,
      peakDays: ["Friday", "Saturday", "Sunday"],
      peakHours: ["12:00-14:00", "18:00-20:00"],
    },
    recommendations: [
      "Consider meal planning to reduce restaurant visits",
      "Set a weekly coffee budget to control coffee shop spending",
      "Try cooking more meals at home to save on food delivery",
    ],
  },
};

export const mockSubcategoryBreakdown = {
  "Coffee Shops": {
    merchants: [
      { name: "Starbucks", amount: 540, visits: 3 },
      { name: "True Coffee", amount: 240, visits: 1 },
      { name: "Amazon Coffee", amount: 180, visits: 1 },
    ],
    averagePerVisit: 132,
    peakTimes: ["08:00-10:00", "14:00-16:00"],
    locations: ["Siam Paragon", "Silom Complex", "CentralWorld"],
  },
  "Restaurants": {
    merchants: [
      { name: "After You Dessert Cafe", amount: 850, visits: 1 },
      { name: "Roast Coffee & Eatery", amount: 680, visits: 1 },
      { name: "Food Court", amount: 120, visits: 1 },
    ],
    averagePerVisit: 550,
    peakTimes: ["12:00-14:00", "18:00-21:00"],
    locations: ["EmQuartier", "Thonglor", "Central World"],
  },
};

export default {
  mockCategoryTransactions,
  mockCategoryInsights,
  mockSubcategoryBreakdown,
};
