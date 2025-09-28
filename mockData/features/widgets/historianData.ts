// AI Financial Historian Mock Data

interface FinancialStory {
  id: string;
  title: string;
  period: string;
  summary: string;
  insights: string[];
  predictions: string[];
  achievements: string[];
  warnings: string[];
  mood: "positive" | "negative" | "neutral" | "celebration";
  confidence: number;
}

export const mockFinancialStories: FinancialStory[] = [
  {
    id: "early-career",
    title: "The Foundation Phase",
    period: "Jan 2024 - Mar 2024",
    summary:
      "You started building your financial foundation with consistent income and controlled spending. Your salary of ฿85,000 provided stability while you explored freelance opportunities.",
    insights: [
      "Your spending was 23% below average for your income bracket",
      "Food expenses decreased by 15% as you developed better habits",
      "Investment allocation increased from 5% to 12% of income",
    ],
    predictions: [
      "If current trends continue, you'll save ฿180,000 by year-end",
      "Your investment portfolio could grow to ฿250,000 in 12 months",
      "Freelance income has potential to reach ฿35,000/month",
    ],
    achievements: [
      "First month with positive cash flow",
      "Established emergency fund",
      "Reduced dining out by 40%",
    ],
    warnings: [
      "Entertainment spending spiked 25% in March",
      "No retirement contributions detected",
    ],
    mood: "positive",
    confidence: 87,
  },
  {
    id: "growth-phase",
    title: "The Acceleration Period",
    period: "Apr 2024 - Jun 2024",
    summary:
      "A remarkable quarter of financial growth! Your freelance income doubled while maintaining disciplined spending. This period marked your transition from saver to investor.",
    insights: [
      "Freelance income grew 120% quarter-over-quarter",
      "Investment returns contributed ฿8,500 to total income",
      "Rent-to-income ratio improved to an optimal 28%",
    ],
    predictions: [
      "You're on track to achieve financial independence 3 years earlier",
      "Investment portfolio diversification will reduce risk by 15%",
      "Potential to increase savings rate to 35% by Q4",
    ],
    achievements: [
      "Highest monthly savings ever: ฿45,000",
      "First investment dividend received",
      "Debt-to-income ratio below 10%",
    ],
    warnings: [
      "Transportation costs increased 18%",
      "No health insurance coverage detected",
    ],
    mood: "celebration",
    confidence: 92,
  },
  {
    id: "optimization-phase",
    title: "The Refinement Era",
    period: "Jul 2024 - Sep 2024",
    summary:
      "You've entered a sophisticated phase of financial management. Every baht is optimized, and your money works harder for you than ever before.",
    insights: [
      "Achieved perfect 50/30/20 budget allocation",
      "Investment returns now cover 15% of monthly expenses",
      "Spending efficiency improved by 22% through smart choices",
    ],
    predictions: [
      "Net worth will cross ฿1M milestone in 8 months",
      "Passive income could replace 25% of salary by 2025",
      "Current trajectory leads to early retirement at 45",
    ],
    achievements: [
      "Six consecutive months of 30%+ savings rate",
      "Investment portfolio outperformed market by 12%",
      "Zero high-interest debt remaining",
    ],
    warnings: [
      "Lifestyle inflation creeping in entertainment category",
      "Emergency fund below 6-month target",
    ],
    mood: "positive",
    confidence: 95,
  },
];

export type { FinancialStory };
