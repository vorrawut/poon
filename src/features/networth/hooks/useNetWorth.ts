import { useState, useEffect, useMemo } from "react";
import {
  type NetWorthData,
  type SparklineDataPoint,
  type TimeRange,
} from "../types";
import { netWorthService } from "../services/netWorthService";
import { generateSparklineData } from "../services/dataGenerators";

export function useNetWorth() {
  const [netWorthData, setNetWorthData] = useState<NetWorthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNetWorth = async () => {
      try {
        setLoading(true);
        const data = await netWorthService.fetchNetWorth();
        setNetWorthData(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch net worth",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNetWorth();

    // Set up real-time updates (every 5 minutes in production)
    const interval = setInterval(fetchNetWorth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const refreshNetWorth = async () => {
    if (!loading) {
      const data = await netWorthService.fetchNetWorth();
      setNetWorthData(data);
    }
  };

  return {
    netWorthData,
    loading,
    error,
    refreshNetWorth,
  };
}

export function useNetWorthTrend(timeRange: TimeRange["value"] = "30d") {
  const [trendData, setTrendData] = useState<SparklineDataPoint[]>([]);

  const { netWorthData } = useNetWorth();

  const sparklineData = useMemo(() => {
    if (!netWorthData) return [];
    return generateSparklineData(netWorthData.totalNetWorth, timeRange);
  }, [netWorthData, timeRange]);

  useEffect(() => {
    setTrendData(sparklineData);
  }, [sparklineData]);

  const growthData = useMemo(() => {
    if (trendData.length < 2) return { growth: 0, growthPercent: 0 };

    const firstValue = trendData[0].value;
    const lastValue = trendData[trendData.length - 1].value;
    const growth = lastValue - firstValue;
    const growthPercent = (growth / firstValue) * 100;

    return { growth, growthPercent };
  }, [trendData]);

  return {
    trendData,
    ...growthData,
    timeRange,
  };
}
