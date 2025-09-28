// Spending Timeline Heatmap Mock Data

interface SpendingData {
  date: string;
  amount: number;
  category: string;
  dayOfWeek: number;
  hour: number;
}

export const generateMockTimelineData = (timeRange: "week" | "month" | "quarter"): SpendingData[] => {
  const data: SpendingData[] = [];
  const now = new Date();
  const daysBack = timeRange === "week" ? 7 : timeRange === "month" ? 30 : 90;

  for (let i = 0; i < daysBack; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Generate realistic spending patterns
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isFriday = dayOfWeek === 5;

    // Weekend and Friday spending tends to be higher
    const baseAmount = isWeekend ? 800 : isFriday ? 1200 : 400;
    const randomVariation = Math.random() * 600;
    const amount = baseAmount + randomVariation;

    data.push({
      date: date.toISOString().split("T")[0],
      amount: Math.round(amount),
      category: "mixed",
      dayOfWeek,
      hour: Math.floor(Math.random() * 24),
    });
  }

  return data.reverse(); // Reverse to get chronological order
};

export type { SpendingData };
