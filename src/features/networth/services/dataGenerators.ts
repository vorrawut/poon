import { subDays, format, eachDayOfInterval } from 'date-fns';
import { type SparklineDataPoint, type TimeRange } from '../types';

export const TIME_RANGES: TimeRange[] = [
  { value: '7d', label: '7 days', days: 7 },
  { value: '30d', label: '30 days', days: 30 },
  { value: '90d', label: '90 days', days: 90 },
  { value: '1y', label: '1 year', days: 365 },
];

export function generateSparklineData(
  currentNetWorth: number,
  timeRange: TimeRange['value'] = '30d'
): SparklineDataPoint[] {
  const range = TIME_RANGES.find(r => r.value === timeRange) || TIME_RANGES[1];
  const startDate = subDays(new Date(), range.days);
  const dateRange = eachDayOfInterval({ start: startDate, end: new Date() });
  
  return dateRange.map((date, index) => {
    // Generate realistic trend with some volatility
    const progress = index / (dateRange.length - 1);
    const trendGrowth = progress * 0.05; // 5% growth over period
    const volatility = (Math.random() - 0.5) * 0.02; // ±2% daily volatility
    const seasonal = Math.sin((index / dateRange.length) * Math.PI * 2) * 0.01; // 1% seasonal variation
    
    const multiplier = 1 + trendGrowth + volatility + seasonal;
    const value = currentNetWorth * multiplier;
    
    return {
      date: format(date, 'yyyy-MM-dd'),
      value: Math.round(value * 100) / 100,
      formattedDate: format(date, range.days <= 30 ? 'MMM dd' : 'MMM yyyy'),
    };
  });
}

export function calculateNetWorthGrowth(
  data: SparklineDataPoint[]
): { growth: number; growthPercent: number } {
  if (data.length < 2) {
    return { growth: 0, growthPercent: 0 };
  }
  
  const firstValue = data[0].value;
  const lastValue = data[data.length - 1].value;
  const growth = lastValue - firstValue;
  const growthPercent = (growth / firstValue) * 100;
  
  return {
    growth: Math.round(growth * 100) / 100,
    growthPercent: Math.round(growthPercent * 100) / 100,
  };
}
