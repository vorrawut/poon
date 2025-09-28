import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, TrendingUp, Filter } from "lucide-react";

interface SpendingData {
  date: string;
  amount: number;
  category: string;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  hour: number; // 0-23
}

interface SpendingTimelineHeatmapProps {
  spendingData: SpendingData[];
  className?: string;
}

export function SpendingTimelineHeatmap({
  spendingData: _spendingData,
  className = "",
}: SpendingTimelineHeatmapProps) {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "3months">(
    "month",
  );
  const [viewMode, setViewMode] = useState<"daily" | "hourly">("daily");
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    amount: number;
  } | null>(null);

  // Generate mock data for demonstration
  const mockData = useMemo(() => {
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

    return data.reverse();
  }, [timeRange]);

  // Calculate intensity for heatmap colors
  const maxAmount = Math.max(...mockData.map((d) => d.amount));
  const getIntensity = (amount: number) => amount / maxAmount;

  // Get color based on intensity
  const getHeatmapColor = (intensity: number) => {
    if (intensity === 0) return "rgba(255, 255, 255, 0.1)";
    if (intensity < 0.2) return "rgba(34, 197, 94, 0.3)"; // Light green
    if (intensity < 0.4) return "rgba(34, 197, 94, 0.5)"; // Green
    if (intensity < 0.6) return "rgba(245, 158, 11, 0.5)"; // Yellow
    if (intensity < 0.8) return "rgba(245, 158, 11, 0.7)"; // Orange
    return "rgba(239, 68, 68, 0.8)"; // Red
  };

  // Group data by week for calendar view
  const weeklyData = useMemo(() => {
    const weeks: SpendingData[][] = [];
    let currentWeek: SpendingData[] = [];

    mockData.forEach((data, index) => {
      const date = new Date(data.date);
      const dayOfWeek = date.getDay();

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentWeek.push(data);

      if (index === mockData.length - 1) {
        weeks.push(currentWeek);
      }
    });

    return weeks;
  }, [mockData]);

  // Hourly spending pattern
  const hourlyPattern = useMemo(() => {
    const hourlySpending = Array(24).fill(0);
    const hourlyCounts = Array(24).fill(0);

    mockData.forEach((data) => {
      hourlySpending[data.hour] += data.amount;
      hourlyCounts[data.hour]++;
    });

    return hourlySpending.map((total, hour) => ({
      hour,
      average: hourlyCounts[hour] > 0 ? total / hourlyCounts[hour] : 0,
      total,
      count: hourlyCounts[hour],
    }));
  }, [mockData]);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={`${className}`}>
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Spending Timeline
          </h3>
          <p className="text-white/70">
            Discover when you spend the most money
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Time Range Selector */}
          <div className="flex bg-white/10 rounded-lg p-1">
            {(["week", "month", "3months"] as const).map((range) => (
              <motion.button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  timeRange === range
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {range === "3months"
                  ? "3 Months"
                  : range.charAt(0).toUpperCase() + range.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* View Mode Selector */}
          <div className="flex bg-white/10 rounded-lg p-1">
            {(["daily", "hourly"] as const).map((mode) => (
              <motion.button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-1">
                  {mode === "daily" ? (
                    <Calendar className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap Container */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <AnimatePresence mode="wait">
          {viewMode === "daily" ? (
            <motion.div
              key="daily"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {/* Day Labels */}
              <div className="grid grid-cols-8 gap-1 mb-2">
                <div></div> {/* Empty cell for week number */}
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center text-white/60 text-xs font-medium py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Heatmap */}
              <div className="space-y-1">
                {weeklyData.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-8 gap-1">
                    {/* Week number */}
                    <div className="flex items-center justify-center text-white/40 text-xs">
                      W{weekIndex + 1}
                    </div>

                    {/* Fill empty cells at the start of the week */}
                    {week.length > 0 &&
                      Array.from({ length: week[0].dayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} className="w-8 h-8" />
                      ))}

                    {/* Week days */}
                    {week.map((data) => {
                      const intensity = getIntensity(data.amount);
                      const color = getHeatmapColor(intensity);

                      return (
                        <motion.div
                          key={data.date}
                          className="w-8 h-8 rounded cursor-pointer border border-white/20"
                          style={{ backgroundColor: color }}
                          whileHover={{ scale: 1.2, zIndex: 10 }}
                          onHoverStart={() =>
                            setHoveredCell({
                              date: data.date,
                              amount: data.amount,
                            })
                          }
                          onHoverEnd={() => setHoveredCell(null)}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: weekIndex * 0.1 }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hourly"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Hourly Pattern */}
              <div className="grid grid-cols-12 gap-2">
                {hourlyPattern.map((data, hour) => {
                  const maxHourly = Math.max(
                    ...hourlyPattern.map((h) => h.average),
                  );
                  const intensity = data.average / maxHourly;
                  const height = Math.max(20, intensity * 100);

                  return (
                    <motion.div
                      key={hour}
                      className="flex flex-col items-center"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      transition={{ delay: hour * 0.05 }}
                    >
                      <motion.div
                        className="w-full rounded-t cursor-pointer"
                        style={{
                          height: `${height}px`,
                          backgroundColor: getHeatmapColor(intensity),
                        }}
                        whileHover={{ scale: 1.1 }}
                        onHoverStart={() =>
                          setHoveredCell({
                            date: `${hour}:00`,
                            amount: Math.round(data.average),
                          })
                        }
                        onHoverEnd={() => setHoveredCell(null)}
                      />
                      <div className="text-white/60 text-xs mt-1">
                        {hour.toString().padStart(2, "0")}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Hourly Insights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                {[
                  {
                    label: "Peak Hour",
                    value: `${hourlyPattern
                      .reduce(
                        (max, curr, index) =>
                          curr.average > hourlyPattern[max].average
                            ? index
                            : max,
                        0,
                      )
                      .toString()
                      .padStart(2, "0")}:00`,
                    icon: "🔥",
                    color: "#EF4444",
                  },
                  {
                    label: "Quiet Hour",
                    value: `${hourlyPattern
                      .reduce(
                        (min, curr, index) =>
                          curr.average < hourlyPattern[min].average
                            ? index
                            : min,
                        0,
                      )
                      .toString()
                      .padStart(2, "0")}:00`,
                    icon: "😴",
                    color: "#10B981",
                  },
                  {
                    label: "Most Active",
                    value: `${hourlyPattern
                      .reduce(
                        (max, curr, index) =>
                          curr.count > hourlyPattern[max].count ? index : max,
                        0,
                      )
                      .toString()
                      .padStart(2, "0")}:00`,
                    icon: "⚡",
                    color: "#F59E0B",
                  },
                ].map((insight, index) => (
                  <motion.div
                    key={insight.label}
                    className="bg-white/5 rounded-lg p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-2xl mb-2">{insight.icon}</div>
                    <div className="text-white font-bold text-lg">
                      {insight.value}
                    </div>
                    <div className="text-white/60 text-sm">{insight.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover Tooltip */}
        <AnimatePresence>
          {hoveredCell && (
            <motion.div
              className="fixed bg-gray-900/95 backdrop-blur-md rounded-lg p-3 border border-white/20 z-50 pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="text-white font-medium">
                {viewMode === "daily"
                  ? new Date(hoveredCell.date).toLocaleDateString()
                  : hoveredCell.date}
              </div>
              <div className="text-white/80">
                ฿{hoveredCell.amount.toLocaleString()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <span>Less</span>
            <div className="flex gap-1">
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((intensity, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: getHeatmapColor(intensity) }}
                />
              ))}
            </div>
            <span>More</span>
          </div>

          <div className="text-white/60 text-sm">
            {viewMode === "daily"
              ? "Daily spending intensity"
              : "Hourly spending pattern"}
          </div>
        </div>
      </div>

      {/* Insights Panel */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <h4 className="text-lg font-bold text-white">Spending Patterns</h4>
          </div>
          <div className="space-y-3 text-sm">
            <div className="text-white/80">
              • <strong>Weekend Effect:</strong> You spend 40% more on weekends
            </div>
            <div className="text-white/80">
              • <strong>Friday Peak:</strong> Highest spending day of the week
            </div>
            <div className="text-white/80">
              • <strong>Evening Rush:</strong> Most transactions between 6-9 PM
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-6 h-6 text-blue-400" />
            <h4 className="text-lg font-bold text-white">
              Smart Recommendations
            </h4>
          </div>
          <div className="space-y-3 text-sm">
            <div className="text-white/80">
              • Set spending alerts for Friday evenings
            </div>
            <div className="text-white/80">
              • Plan weekend budgets in advance
            </div>
            <div className="text-white/80">
              • Consider meal prep to reduce evening food orders
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
