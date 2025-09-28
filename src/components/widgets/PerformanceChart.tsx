import { motion } from "framer-motion";

interface PerformanceDataPoint {
  date: string;
  value: number;
}

interface PerformanceChartProps {
  data: PerformanceDataPoint[];
  timeRange: string;
  performance: number;
  className?: string;
  viewMode?: "play" | "clarity";
}

export function PerformanceChart({
  data,
  timeRange,
  performance,
  className = "",
  viewMode = "play",
}: PerformanceChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue;

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  // Generate SVG path for the performance line
  const generatePath = () => {
    const width = 600;
    const height = 200;
    const padding = 40;

    const points = data.map((point, index) => {
      const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
      const y =
        height -
        padding -
        ((point.value - minValue) / range) * (height - 2 * padding);
      return `${x},${y}`;
    });

    return `M ${points.join(" L ")}`;
  };

  // Generate area path for gradient fill
  const generateAreaPath = () => {
    const width = 600;
    const height = 200;
    const padding = 40;

    const points = data.map((point, index) => {
      const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
      const y =
        height -
        padding -
        ((point.value - minValue) / range) * (height - 2 * padding);
      return `${x},${y}`;
    });

    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    const [lastX] = lastPoint.split(",");
    const [firstX] = firstPoint.split(",");

    return `M ${firstX},${height - padding} L ${points.join(" L ")} L ${lastX},${height - padding} Z`;
  };

  return (
    <div className={`${className}`}>
      <div className="relative">
        {/* Chart Container */}
        <div
          className={`relative rounded-lg border-2 overflow-hidden ${
            viewMode === "play"
              ? "bg-black/20 border-white/10"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <svg
            width="100%"
            height="240"
            viewBox="0 0 600 240"
            className="block"
          >
            {/* Grid Lines */}
            <defs>
              <linearGradient
                id="areaGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={performance >= 0 ? "#10B981" : "#EF4444"}
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor={performance >= 0 ? "#10B981" : "#EF4444"}
                  stopOpacity="0.05"
                />
              </linearGradient>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor={performance >= 0 ? "#10B981" : "#EF4444"}
                />
                <stop
                  offset="50%"
                  stopColor={performance >= 0 ? "#059669" : "#DC2626"}
                />
                <stop
                  offset="100%"
                  stopColor={performance >= 0 ? "#10B981" : "#EF4444"}
                />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="40"
                y1={40 + i * 40}
                x2="560"
                y2={40 + i * 40}
                stroke={
                  viewMode === "play"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)"
                }
                strokeWidth="1"
              />
            ))}

            {/* Vertical Grid Lines */}
            {data.map((_, i) => (
              <line
                key={i}
                x1={40 + (i / (data.length - 1)) * 520}
                y1="40"
                x2={40 + (i / (data.length - 1)) * 520}
                y2="200"
                stroke={
                  viewMode === "play"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.05)"
                }
                strokeWidth="1"
              />
            ))}

            {/* Area Fill */}
            <motion.path
              d={generateAreaPath()}
              fill="url(#areaGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Performance Line */}
            <motion.path
              d={generatePath()}
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Data Points */}
            {data.map((point, index) => {
              const x = 40 + (index / (data.length - 1)) * 520;
              const y = 200 - 40 - ((point.value - minValue) / range) * 120;

              return (
                <motion.g key={index}>
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill={performance >= 0 ? "#10B981" : "#EF4444"}
                    stroke="white"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="cursor-pointer"
                  />

                  {/* Hover tooltip placeholder */}
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="transparent"
                    className="cursor-pointer hover:fill-white/10"
                    whileHover={{ scale: 1.5 }}
                  />
                </motion.g>
              );
            })}

            {/* Y-axis Labels */}
            {[minValue, (minValue + maxValue) / 2, maxValue].map((value, i) => (
              <text
                key={i}
                x="35"
                y={200 - 40 - i * 80 + 5}
                textAnchor="end"
                fontSize="12"
                fill={
                  viewMode === "play"
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(0,0,0,0.7)"
                }
              >
                {formatCurrency(value)}
              </text>
            ))}

            {/* X-axis Labels */}
            {data.map(
              (point, index) =>
                index % Math.ceil(data.length / 4) === 0 && (
                  <text
                    key={index}
                    x={40 + (index / (data.length - 1)) * 520}
                    y="225"
                    textAnchor="middle"
                    fontSize="12"
                    fill={
                      viewMode === "play"
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(0,0,0,0.7)"
                    }
                  >
                    {point.date}
                  </text>
                ),
            )}
          </svg>

          {/* Performance Indicator */}
          <div className="absolute top-4 right-4">
            <motion.div
              className={`px-3 py-1 rounded-full text-sm font-bold ${
                performance >= 0
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {performance >= 0 ? "+" : ""}
              {performance}%
            </motion.div>
          </div>

          {/* Key Events Annotations */}
          <div className="absolute bottom-4 left-4">
            <div
              className={`text-xs ${viewMode === "play" ? "text-white/60" : "text-gray-500"}`}
            >
              📊 {timeRange} Performance • {data.length} data points
            </div>
          </div>
        </div>

        {/* Chart Legend */}
        <div className="flex justify-center mt-4 space-x-6">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${performance >= 0 ? "bg-green-400" : "bg-red-400"}`}
            ></div>
            <span
              className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
            >
              Portfolio Value
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
            <span
              className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
            >
              Trend Line
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
