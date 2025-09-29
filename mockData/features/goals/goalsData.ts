// Enhanced Goals Data
export interface EnhancedGoal {
  id: string;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: "emergency" | "travel" | "house" | "car" | "investment" | "education" | "other";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  lastContribution?: Date;
  isCompleted: boolean;
  tags: string[];
  milestones: Array<{
    id: string;
    name: string;
    targetAmount: number;
    isCompleted: boolean;
    completedAt?: Date;
  }>;
  notes?: string;
  autoContribute?: {
    enabled: boolean;
    amount: number;
    frequency: "weekly" | "monthly";
  };
}

export const mockEnhancedGoals: EnhancedGoal[] = [
  {
    id: "goal-1",
    name: "Emergency Fund",
    description: "Build a 6-month emergency fund for financial security",
    targetAmount: 300000,
    currentAmount: 125000,
    category: "emergency",
    priority: "high",
    deadline: "2025-12-31",
    createdAt: new Date("2024-01-15"),
    lastContribution: new Date("2024-12-01"),
    isCompleted: false,
    tags: ["emergency", "security", "essential"],
    milestones: [
      {
        id: "milestone-1",
        name: "First ฿50,000",
        targetAmount: 50000,
        isCompleted: true,
        completedAt: new Date("2024-06-15"),
      },
      {
        id: "milestone-2", 
        name: "Halfway Point",
        targetAmount: 150000,
        isCompleted: false,
      },
    ],
    autoContribute: {
      enabled: true,
      amount: 15000,
      frequency: "monthly",
    },
  },
  {
    id: "goal-2",
    name: "Dream Japan Trip",
    description: "2-week cultural exploration of Japan including Tokyo, Kyoto, and Osaka",
    targetAmount: 150000,
    currentAmount: 85000,
    category: "travel",
    priority: "medium",
    deadline: "2025-10-01",
    createdAt: new Date("2024-03-01"),
    lastContribution: new Date("2024-11-15"),
    isCompleted: false,
    tags: ["travel", "culture", "vacation"],
    milestones: [
      {
        id: "milestone-travel-1",
        name: "Flight Booking",
        targetAmount: 50000,
        isCompleted: true,
        completedAt: new Date("2024-10-01"),
      },
      {
        id: "milestone-travel-2",
        name: "Accommodation Fund",
        targetAmount: 100000,
        isCompleted: false,
      },
    ],
    notes: "Planning to visit during autumn for cherry blossoms and perfect weather",
    autoContribute: {
      enabled: true,
      amount: 8000,
      frequency: "monthly",
    },
  },
  {
    id: "goal-3",
    name: "First Home Down Payment",
    description: "20% down payment for a 2-bedroom condo in Bangkok",
    targetAmount: 800000,
    currentAmount: 200000,
    category: "house",
    priority: "high",
    deadline: "2026-06-01",
    createdAt: new Date("2024-02-01"),
    lastContribution: new Date("2024-12-10"),
    isCompleted: false,
    tags: ["property", "investment", "home"],
    milestones: [
      {
        id: "milestone-3",
        name: "Quarter Mark",
        targetAmount: 200000,
        isCompleted: true,
        completedAt: new Date("2024-12-10"),
      },
      {
        id: "milestone-4",
        name: "Halfway Point",
        targetAmount: 400000,
        isCompleted: false,
      },
    ],
    notes: "Looking at areas near BTS lines for better accessibility",
    autoContribute: {
      enabled: true,
      amount: 25000,
      frequency: "monthly",
    },
  },
  {
    id: "goal-4",
    name: "Investment Portfolio",
    description: "Build diversified investment portfolio for long-term wealth",
    targetAmount: 500000,
    currentAmount: 75000,
    category: "investment",
    priority: "medium",
    deadline: "2025-08-01",
    createdAt: new Date("2024-04-01"),
    lastContribution: new Date("2024-11-30"),
    isCompleted: false,
    tags: ["investment", "wealth", "portfolio"],
    milestones: [
      {
        id: "milestone-invest-1",
        name: "Initial Investment",
        targetAmount: 100000,
        isCompleted: false,
      },
      {
        id: "milestone-invest-2",
        name: "Portfolio Diversification",
        targetAmount: 300000,
        isCompleted: false,
      },
    ],
    notes: "Focus on index funds and blue-chip stocks",
    autoContribute: {
      enabled: true,
      amount: 12000,
      frequency: "monthly",
    },
  },
  {
    id: "goal-5",
    name: "New Honda City",
    description: "Reliable car for daily commuting and weekend trips",
    targetAmount: 200000,
    currentAmount: 45000,
    category: "car",
    priority: "low",
    deadline: "2025-12-01",
    createdAt: new Date("2024-05-01"),
    lastContribution: new Date("2024-11-20"),
    isCompleted: false,
    tags: ["transportation", "car", "honda"],
    milestones: [
      {
        id: "milestone-car-1",
        name: "Down Payment",
        targetAmount: 100000,
        isCompleted: false,
      },
      {
        id: "milestone-car-2",
        name: "Full Amount",
        targetAmount: 200000,
        isCompleted: false,
      },
    ],
    notes: "Considering both new and certified pre-owned options",
    autoContribute: {
      enabled: false,
      amount: 0,
      frequency: "monthly",
    },
  },
  {
    id: "goal-6",
    name: "Master's Degree",
    description: "MBA program to advance career opportunities",
    targetAmount: 400000,
    currentAmount: 60000,
    category: "education",
    priority: "medium",
    deadline: "2026-01-01",
    createdAt: new Date("2024-06-01"),
    isCompleted: false,
    tags: ["education", "mba", "career"],
    milestones: [
      {
        id: "milestone-edu-1",
        name: "Application Fee",
        targetAmount: 50000,
        isCompleted: true,
        completedAt: new Date("2024-09-01"),
      },
      {
        id: "milestone-edu-2",
        name: "First Semester",
        targetAmount: 200000,
        isCompleted: false,
      },
    ],
    notes: "Researching programs at Chulalongkorn and Thammasat universities",
    autoContribute: {
      enabled: true,
      amount: 10000,
      frequency: "monthly",
    },
  },
];
