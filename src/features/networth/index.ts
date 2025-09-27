// Components
export { NetWorthWidget } from "./components/NetWorthWidget";
export { EnhancedNetWorthWidget } from "./components/EnhancedNetWorthWidget";

// Hooks
export { useNetWorth, useNetWorthTrend } from "./hooks/useNetWorth";

// Types
export type {
  NetWorthData,
  SparklineDataPoint,
  TimeRange,
  NetWorthTrend,
} from "./types";

// Services
export { netWorthService } from "./services/netWorthService";
export {
  TIME_RANGES,
  generateSparklineData,
  calculateNetWorthGrowth,
} from "./services/dataGenerators";
