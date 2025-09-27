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
    console.log("🔍 useNetWorth effect triggered");

    const fetchNetWorth = async () => {
      try {
        console.log("🔍 useNetWorth: Starting fetch, setting loading=true");
        setLoading(true);
        setError(null);

        const data = await netWorthService.fetchNetWorth();
        console.log("🔍 useNetWorth: Data received:", data);

        setNetWorthData(data);
        console.log("🔍 useNetWorth: Data set in state");
      } catch (err) {
        console.error("🔍 useNetWorth: Error occurred:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch net worth",
        );
      } finally {
        console.log("🔍 useNetWorth: Setting loading=false");
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
