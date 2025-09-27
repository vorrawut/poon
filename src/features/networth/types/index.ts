export interface NetWorthData {
  totalNetWorth: number;
  netWorthChange: number;
  netWorthChangePercent: number;
  previousNetWorth: number;
  lastUpdated: Date;
  breakdown: {
    cash: number;
    investments: number;
    realEstate: number;
    other: number;
  };
}

export interface SparklineDataPoint {
  date: string;
  value: number;
  formattedDate: string;
}

export interface TimeRange {
  value: "7d" | "30d" | "90d" | "1y";
  label: string;
  days: number;
}

export interface NetWorthTrend {
  timeRange: TimeRange["value"];
  data: SparklineDataPoint[];
  growth: number;
  growthPercent: number;
}
