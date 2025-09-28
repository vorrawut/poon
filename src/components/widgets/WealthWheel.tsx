import { motion } from "framer-motion";

interface WealthWheelProps {
  assets: Array<{
    id: string;
    name: string;
    value: number;
    allocation: number;
    color: string;
    icon: string;
    performance: number;
  }>;
  totalValue: number;
  todayChange: number;
  onSliceClick?: (assetId: string) => void;
  className?: string;
  viewMode?: "play" | "clarity";
}

export function WealthWheel({
  assets,
  totalValue,
  todayChange,
  onSliceClick,
  className = "",
  viewMode = "play",
}: WealthWheelProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  // Calculate angles for each slice
  let cumulativeAngle = 0;
  const slices = assets.map((asset) => {
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + (asset.allocation / 100) * 360;
    cumulativeAngle = endAngle;

    return {
      ...asset,
      startAngle,
      endAngle,
      midAngle: (startAngle + endAngle) / 2,
    };
  });

  // Create SVG path for each slice
  const createSlicePath = (
    startAngle: number,
    endAngle: number,
    innerRadius: number,
    outerRadius: number,
  ) => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = 150 + innerRadius * Math.cos(startAngleRad);
    const y1 = 150 + innerRadius * Math.sin(startAngleRad);
    const x2 = 150 + outerRadius * Math.cos(startAngleRad);
    const y2 = 150 + outerRadius * Math.sin(startAngleRad);

    const x3 = 150 + outerRadius * Math.cos(endAngleRad);
    const y3 = 150 + outerRadius * Math.sin(endAngleRad);
    const x4 = 150 + innerRadius * Math.cos(endAngleRad);
    const y4 = 150 + innerRadius * Math.sin(endAngleRad);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      x1,
      y1,
      "L",
      x2,
      y2,
      "A",
      outerRadius,
      outerRadius,
      0,
      largeArcFlag,
      1,
      x3,
      y3,
      "L",
      x4,
      y4,
      "A",
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      0,
      x1,
      y1,
      "Z",
    ].join(" ");
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Wealth Wheel SVG */}
      <div className="relative">
        <svg width="300" height="300" className="transform -rotate-90">
          {/* Outer glow ring */}
          <circle
            cx="150"
            cy="150"
            r="140"
            fill="none"
            stroke="url(#wheelGlow)"
            strokeWidth="2"
            opacity="0.3"
          />

          {/* Asset slices */}
          {slices.map((slice, index) => (
            <motion.g key={slice.id}>
              <motion.path
                d={createSlicePath(slice.startAngle, slice.endAngle, 60, 120)}
                fill={slice.color}
                stroke={
                  viewMode === "play"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)"
                }
                strokeWidth="2"
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  filter: "brightness(1.2)",
                }}
                onClick={() => onSliceClick?.(slice.id)}
                style={{
                  filter: `drop-shadow(0 0 8px ${slice.color}40)`,
                }}
              />

              {/* Asset icon on slice */}
              <motion.text
                x={150 + 90 * Math.cos((slice.midAngle * Math.PI) / 180)}
                y={150 + 90 * Math.sin((slice.midAngle * Math.PI) / 180)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="20"
                className="pointer-events-none transform rotate-90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {slice.icon}
              </motion.text>
            </motion.g>
          ))}

          {/* Center circle */}
          <motion.circle
            cx="150"
            cy="150"
            r="55"
            fill={
              viewMode === "play" ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.95)"
            }
            stroke={
              viewMode === "play" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"
            }
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.3))",
            }}
          />

          {/* Gradient definitions */}
          <defs>
            <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </radialGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className={`text-2xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {formatCurrency(totalValue)}
          </motion.div>
          <motion.div
            className={`text-sm font-medium ${
              todayChange >= 0 ? "text-green-400" : "text-red-400"
            }`}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {todayChange >= 0 ? "+" : ""}
            {formatCurrency(todayChange)} today
          </motion.div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-md">
        {slices.map((slice, index) => (
          <motion.div
            key={slice.id}
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
              viewMode === "play"
                ? "hover:bg-white/10 text-white"
                : "hover:bg-gray-100 text-gray-900"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.8 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => onSliceClick?.(slice.id)}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: slice.color }}
            />
            <div className="text-xs">
              <div className="font-medium">{slice.name}</div>
              <div
                className={`${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
              >
                {slice.allocation}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
