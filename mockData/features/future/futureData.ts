// Future Mock Data

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  type: "deposit" | "withdrawal";
  description: string;
}

interface Milestone {
  percentage: number;
  label: string;
  achieved: boolean;
  achievedDate?: Date;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
  theme: string;
  icon: string;
  color: string;
  priority: string;
  isCompleted: boolean;
  createdAt: Date;
  transactions: Transaction[];
  notes: string[];
  milestones: Milestone[];
}

export const initialMissions: Mission[] = [
  {
    id: "japan-trip",
    name: "Travel to Japan 🗾",
    description: "Dream vacation to explore Tokyo, Kyoto, and Mount Fuji",
    targetAmount: 150000,
    currentAmount: 87500,
    deadline: new Date("2025-03-15"),
    category: "travel",
    theme: "rocket",
    icon: "🗾",
    color: "#FF6B6B",
    priority: "high",
    isCompleted: false,
    createdAt: new Date("2024-01-15"),
    transactions: [
      {
        id: "t1",
        amount: 15000,
        date: new Date("2024-01-15"),
        type: "deposit",
        description: "Initial savings",
      },
      {
        id: "t2",
        amount: 12500,
        date: new Date("2024-02-01"),
        type: "deposit",
        description: "Monthly savings",
      },
      {
        id: "t3",
        amount: 10000,
        date: new Date("2024-03-01"),
        type: "deposit",
        description: "Bonus allocation",
      },
    ],
    notes: [
      "Save ฿10,000 per month",
      "Book flights by December",
      "Research best travel season",
    ],
    milestones: [
      {
        percentage: 25,
        label: "Launch",
        achieved: true,
        achievedDate: new Date("2024-03-01"),
      },
      {
        percentage: 50,
        label: "In Orbit",
        achieved: true,
        achievedDate: new Date("2024-06-15"),
      },
      { percentage: 75, label: "Deep Space", achieved: false },
      { percentage: 100, label: "Arrival", achieved: false },
    ],
  },
  {
    id: "emergency-fund",
    name: "Emergency Fund 🛡️",
    description: "6 months of expenses for financial security",
    targetAmount: 300000,
    currentAmount: 195000,
    deadline: new Date("2025-06-01"),
    category: "emergency",
    theme: "station",
    icon: "🛡️",
    color: "#4ECDC4",
    priority: "critical",
    isCompleted: false,
    createdAt: new Date("2024-02-01"),
    transactions: [
      {
        id: "t4",
        amount: 50000,
        date: new Date("2024-02-01"),
        type: "deposit",
        description: "Initial emergency fund",
      },
      {
        id: "t5",
        amount: 25000,
        date: new Date("2024-03-01"),
        type: "deposit",
        description: "Monthly contribution",
      },
    ],
    notes: [
      "Critical for financial stability",
      "Target: 6 months expenses",
    ],
    milestones: [
      { percentage: 25, label: "Foundation", achieved: true },
      { percentage: 50, label: "Secure Base", achieved: true },
      { percentage: 75, label: "Strong Defense", achieved: false },
      { percentage: 100, label: "Fortress Complete", achieved: false },
    ],
  },
  {
    id: "debt-free",
    name: "Debt-Free Orbit 🚀",
    description: "Clear all credit card debt and achieve financial freedom",
    targetAmount: 85000,
    currentAmount: 62000,
    deadline: new Date("2025-01-31"),
    category: "debt",
    theme: "rocket",
    icon: "🚀",
    color: "#45B7D1",
    priority: "high",
    isCompleted: false,
    createdAt: new Date("2024-03-01"),
    transactions: [
      {
        id: "t6",
        amount: 15000,
        date: new Date("2024-03-01"),
        type: "deposit",
        description: "Initial debt payment",
      },
      {
        id: "t7",
        amount: 8000,
        date: new Date("2024-04-01"),
        type: "deposit",
        description: "Monthly payment",
      },
    ],
    notes: ["Pay off credit cards first", "Focus on high-interest debt"],
    milestones: [
      { percentage: 25, label: "Escape Velocity", achieved: true },
      { percentage: 50, label: "Breaking Free", achieved: true },
      { percentage: 75, label: "Almost There", achieved: true },
      { percentage: 100, label: "Freedom Achieved", achieved: false },
    ],
  },
  {
    id: "new-laptop",
    name: "MacBook Pro 💻",
    description: "Upgrade to latest MacBook Pro for work and creativity",
    targetAmount: 75000,
    currentAmount: 45000,
    deadline: new Date("2024-12-25"),
    category: "purchase",
    theme: "constellation",
    icon: "💻",
    color: "#96CEB4",
    priority: "medium",
    isCompleted: false,
    createdAt: new Date("2024-04-01"),
    transactions: [
      {
        id: "t8",
        amount: 20000,
        date: new Date("2024-04-01"),
        type: "deposit",
        description: "Initial tech fund",
      },
      {
        id: "t9",
        amount: 12500,
        date: new Date("2024-05-01"),
        type: "deposit",
        description: "Monthly tech savings",
      },
    ],
    notes: ["Wait for Black Friday deals", "Consider trade-in value"],
    milestones: [
      { percentage: 25, label: "First Star", achieved: true },
      { percentage: 50, label: "Constellation Forming", achieved: false },
      { percentage: 75, label: "Nearly Complete", achieved: false },
      { percentage: 100, label: "Constellation Unlocked", achieved: false },
    ],
  },
];

// Types are already exported above as interfaces
