// Category Explorer Mock Data

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: Date;
  merchant: string;
  subcategory: string;
  paymentMethod: string;
  location: string;
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
    location: "Terminal 21",
    tags: ["quick", "travel"],
  },
  {
    id: "6",
    name: "Grocery Shopping",
    amount: 1200,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    merchant: "Tesco Lotus",
    subcategory: "Groceries",
    paymentMethod: "Debit Card",
    location: "Rama IV",
    tags: ["weekly", "essentials"],
  },
  {
    id: "7",
    name: "Street Food",
    amount: 80,
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    merchant: "Local Vendor",
    subcategory: "Street Food",
    paymentMethod: "Cash",
    location: "Chatuchak Market",
    tags: ["local", "authentic"],
  },
  {
    id: "8",
    name: "Bubble Tea",
    amount: 95,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    merchant: "Gong Cha",
    subcategory: "Beverages",
    paymentMethod: "Digital Wallet",
    location: "MBK Center",
    tags: ["afternoon", "treat"],
  },
  {
    id: "9",
    name: "Restaurant Dinner",
    amount: 680,
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    merchant: "Siam Paragon Restaurant",
    subcategory: "Casual Dining",
    paymentMethod: "Credit Card",
    location: "Siam Paragon",
    tags: ["family", "weekend"],
  },
  {
    id: "10",
    name: "Coffee & Pastry",
    amount: 220,
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    merchant: "Dean & DeLuca",
    subcategory: "Coffee Shops",
    paymentMethod: "Credit Card",
    location: "Central Embassy",
    tags: ["work", "meeting"],
  },
];

// Export types for use in components
export type { Transaction };
