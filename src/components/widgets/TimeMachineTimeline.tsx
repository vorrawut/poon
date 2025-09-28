import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  TrendingUp,
  Zap,
  Rewind,
  FastForward,
} from "lucide-react";

interface TimeRange {
  id: string;
  label: string;
  value: "day" | "week" | "month" | "quarter" | "year";
  icon: string;
}

interface TimeMachineTimelineProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onRangeChange: (range: "day" | "week" | "month" | "quarter" | "year") => void;
  selectedRange: "day" | "week" | "month" | "quarter" | "year";
  timelinePosition: number;
  onTimelinePositionChange: (position: number) => void;
  className?: string;
}

export function TimeMachineTimeline({
  currentDate,
  onDateChange,
  onRangeChange,
  selectedRange,
  timelinePosition,
  onTimelinePositionChange,
  className = "",
}: TimeMachineTimelineProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const timeRanges: TimeRange[] = [
    { id: "day", label: "Days", value: "day", icon: "📅" },
    { id: "week", label: "Weeks", value: "week", icon: "📊" },
    { id: "month", label: "Months", value: "month", icon: "🗓️" },
    { id: "quarter", label: "Quarters", value: "quarter", icon: "📈" },
    { id: "year", label: "Years", value: "year", icon: "🎯" },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const newPos = timelinePosition + 1;
      if (newPos >= 100) {
        setIsPlaying(false);
        onTimelinePositionChange(100);
      } else {
        onTimelinePositionChange(newPos);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isPlaying, timelinePosition, onTimelinePositionChange]);

  const handleTimelineClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    onTimelinePositionChange(Math.max(0, Math.min(100, percentage)));
  };

  const formatDateForRange = (date: Date, range: string) => {
    switch (range) {
      case "day":
        return date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
      case "week":
        return `Week of ${date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}`;
      case "month":
        return date.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });
      case "quarter":
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        return `Q${quarter} ${date.getFullYear()}`;
      case "year":
        return date.getFullYear().toString();
      default:
        return date.toLocaleDateString();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Time Machine Header */}
      <motion.div
        className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-md rounded-2xl p-6 mb-4 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="text-3xl"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
            >
              ⏰
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Money Time Machine
              </h2>
              <p className="text-white/70 text-sm">
                Travel through your financial history
              </p>
            </div>
          </div>

          {/* Time Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() =>
                onTimelinePositionChange(Math.max(0, timelinePosition - 10))
              }
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Rewind size={16} />
            </motion.button>

            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-3 rounded-full transition-colors ${
                isPlaying
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? "⏸️" : "▶️"}
            </motion.button>

            <motion.button
              onClick={() =>
                onTimelinePositionChange(Math.min(100, timelinePosition + 10))
              }
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FastForward size={16} />
            </motion.button>
          </div>
        </div>

        {/* Current Time Display */}
        <div className="text-center mb-4">
          <motion.div
            className="text-4xl font-bold text-white mb-2"
            key={formatDateForRange(currentDate, selectedRange)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {formatDateForRange(currentDate, selectedRange)}
          </motion.div>
          <div className="text-white/60 text-sm">
            Position: {timelinePosition.toFixed(0)}% through timeline
          </div>
        </div>

        {/* Range Selector */}
        <div className="flex justify-center gap-2 mb-6">
          {timeRanges.map((range) => (
            <motion.button
              key={range.id}
              onClick={() => onRangeChange(range.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedRange === range.value
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-1">{range.icon}</span>
              {range.label}
            </motion.button>
          ))}
        </div>

        {/* Interactive Timeline */}
        <div className="relative">
          <div
            className="h-3 bg-white/10 rounded-full cursor-pointer relative overflow-hidden"
            onClick={handleTimelineClick}
          >
            {/* Timeline Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-yellow-500/30 via-green-500/30 to-blue-500/30 rounded-full" />

            {/* Timeline Progress */}
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
              style={{ width: `${timelinePosition}%` }}
              animate={{ width: `${timelinePosition}%` }}
              transition={{ duration: 0.2 }}
            />

            {/* Timeline Handle */}
            <motion.div
              className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-purple-400 cursor-grab active:cursor-grabbing"
              style={{ left: `${timelinePosition}%`, marginLeft: "-12px" }}
              animate={{
                left: `${timelinePosition}%`,
                scale: isDragging ? 1.2 : 1,
              }}
              whileHover={{ scale: 1.1 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse" />
            </motion.div>
          </div>

          {/* Timeline Labels */}
          <div className="flex justify-between mt-2 text-xs text-white/50">
            <span>Past</span>
            <span>Present</span>
            <span>Future</span>
          </div>
        </div>

        {/* Quick Jump Buttons */}
        <div className="flex justify-center gap-2 mt-4">
          {[
            "1Y ago",
            "6M ago",
            "3M ago",
            "Today",
            "Next 3M",
            "Next 6M",
            "Next 1Y",
          ].map((period, index) => (
            <motion.button
              key={period}
              onClick={() => onTimelinePositionChange((index / 6) * 100)}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {period}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Timeline Stats */}
      <motion.div
        className="grid grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          {
            label: "Time Traveled",
            value: `${timelinePosition.toFixed(0)}%`,
            icon: "🚀",
          },
          { label: "Data Points", value: "1,247", icon: "📊" },
          { label: "Insights Found", value: "23", icon: "💡" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-white/60">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
