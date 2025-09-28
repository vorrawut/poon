import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Rocket, Target, Map } from "lucide-react";
import type { Mission } from "../../../mockData/features/future";

interface FutureMissionBoardProps {
  missions?: Mission[];
  onMissionClick?: (mission: Mission) => void;
  viewMode?: "play" | "clarity";
  accessibilityMode?: "elder" | "youth" | "standard";
  className?: string;
}

export function FutureMissionBoard({
  missions = [],
  onMissionClick,
  viewMode: _viewMode = "play",
  accessibilityMode: _accessibilityMode = "standard",
  className = "",
}: FutureMissionBoardProps) {
  const [boardViewMode, setBoardViewMode] = useState<"board" | "starmap">(
    "board",
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getMilestoneStatus = (progress: number) => {
    if (progress >= 100)
      return {
        label: "🎯 Arrival",
        color: "#10B981",
        glow: "shadow-green-500/50",
      };
    if (progress >= 50)
      return {
        label: "🛰 In Orbit",
        color: "#8B5CF6",
        glow: "shadow-purple-500/50",
      };
    if (progress >= 25)
      return {
        label: "🚀 Launch",
        color: "#F59E0B",
        glow: "shadow-yellow-500/50",
      };
    return {
      label: "⚡ Preparing",
      color: "#6B7280",
      glow: "shadow-gray-500/50",
    };
  };

  const getProgressPercentage = (mission: Mission) => {
    return Math.min((mission.currentAmount / mission.targetAmount) * 100, 100);
  };

  const getDaysRemaining = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const filteredMissions = missions.filter(
    (mission) =>
      selectedCategory === "all" || mission.category === selectedCategory,
  );

  const categories = ["all", ...new Set(missions.map((m) => m.category))];

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
        <div>
          <h2
            className={`text-3xl md:text-4xl font-bold mb-2 ${
              _viewMode === "play"
                ? "bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent"
                : "text-gray-900"
            }`}
          >
            Future Mission Board 🚀
          </h2>
          <p
            className={`text-lg ${
              _viewMode === "play" ? "text-white/70" : "text-gray-600"
            }`}
          >
            Track your financial goals like space missions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* View Mode Toggle */}
          <div
            className={`flex rounded-lg p-1 ${
              _viewMode === "play"
                ? "bg-white/10 backdrop-blur-sm border border-white/20"
                : "bg-gray-100 border border-gray-200"
            }`}
          >
            <button
              onClick={() => setBoardViewMode("board")}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                boardViewMode === "board"
                  ? _viewMode === "play"
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-purple-600 text-white shadow-lg"
                  : _viewMode === "play"
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Board</span>
            </button>
            <button
              onClick={() => setBoardViewMode("starmap")}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                boardViewMode === "starmap"
                  ? _viewMode === "play"
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-purple-600 text-white shadow-lg"
                  : _viewMode === "play"
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Galaxy</span>
            </button>
          </div>

          {/* Add Mission Button */}
          <button
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
              _viewMode === "play"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            <Plus className="w-5 h-5" />
            <span>New Mission</span>
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all font-medium ${
              selectedCategory === category
                ? _viewMode === "play"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : _viewMode === "play"
                  ? "bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm border border-white/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            {category === "all"
              ? "All Missions"
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Missions Display */}
      {boardViewMode === "starmap" ? (
        // Star Map View
        <div
          className={`relative h-[600px] rounded-3xl overflow-hidden border ${
            _viewMode === "play"
              ? "bg-gradient-to-b from-indigo-900/20 to-purple-900/20 border-purple-500/20"
              : "bg-gradient-to-b from-indigo-50/50 to-purple-50/50 border-purple-200"
          }`}
        >
          <div className="absolute inset-0 opacity-30">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
                               radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px),
                               radial-gradient(circle at 40% 60%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "60px 60px, 80px 80px, 100px 100px",
              }}
            />
          </div>

          <div className="relative h-full p-8">
            <h3
              className={`text-2xl font-bold mb-6 text-center ${
                _viewMode === "play" ? "text-white" : "text-gray-900"
              }`}
            >
              🌌 Your Financial Galaxy
            </h3>

            <div className="relative h-full">
              {filteredMissions.map((mission, index) => {
                const progress = getProgressPercentage(mission);
                const milestone = getMilestoneStatus(progress);
                const angle =
                  index * (360 / filteredMissions.length) * (Math.PI / 180);
                const radius = 200 + (index % 2) * 50;
                const x = 50 + Math.cos(angle) * (radius / 8);
                const y = 50 + Math.sin(angle) * (radius / 8);

                return (
                  <motion.div
                    key={mission.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => onMissionClick?.(mission)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Star Glow */}
                    <motion.div
                      className={`absolute inset-0 rounded-full ${milestone.glow}`}
                      animate={{
                        boxShadow: [
                          `0 0 0px ${milestone.color}00`,
                          `0 0 30px ${milestone.color}60`,
                          `0 0 0px ${milestone.color}00`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Mission Star */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 backdrop-blur-sm"
                      style={{
                        backgroundColor: mission.color + "40",
                        borderColor: milestone.color,
                      }}
                    >
                      {progress >= 100 ? "⭐" : mission.icon}
                    </div>

                    {/* Mission Info Tooltip */}
                    <motion.div
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/80 backdrop-blur-sm rounded-lg p-3 min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      <h4 className="font-semibold text-white text-sm">
                        {mission.name}
                      </h4>
                      <p className="text-xs text-gray-300 mb-2">
                        {milestone.label}
                      </p>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Progress:</span>
                        <span className="text-white font-medium">
                          {progress.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Target:</span>
                        <span className="text-white">
                          ฿{mission.targetAmount.toLocaleString()}
                        </span>
                      </div>
                    </motion.div>

                    {/* Connection Lines to other missions */}
                    {index < filteredMissions.length - 1 && (
                      <svg
                        className="absolute top-1/2 left-1/2 pointer-events-none"
                        style={{
                          width: `${radius / 4}px`,
                          height: "2px",
                          transform: `rotate(${360 / filteredMissions.length}deg)`,
                        }}
                      >
                        <motion.line
                          x1="0"
                          y1="1"
                          x2={radius / 4}
                          y2="1"
                          stroke={milestone.color}
                          strokeWidth="1"
                          opacity="0.3"
                          strokeDasharray="4 4"
                          animate={{ strokeDashoffset: [0, -8] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </svg>
                    )}
                  </motion.div>
                );
              })}

              {/* Central Galaxy Core */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
                  🌌
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-purple-500/30"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        // Board View (existing grid)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence>
            {filteredMissions.map((mission) => {
              const progress = getProgressPercentage(mission);
              const milestone = getMilestoneStatus(progress);

              return (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onClick={() => onMissionClick?.(mission)}
                  className={`rounded-2xl p-6 border transition-all group cursor-pointer relative overflow-hidden ${
                    _viewMode === "play"
                      ? `bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 ${milestone.glow}`
                      : "bg-white border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-xl"
                  }`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Milestone Badge */}
                  <motion.div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                    style={{
                      backgroundColor: milestone.color + "20",
                      color: milestone.color,
                      border: `1px solid ${milestone.color}40`,
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 0 ${milestone.color}00`,
                        `0 0 10px ${milestone.color}40`,
                        `0 0 0 ${milestone.color}00`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {milestone.label}
                  </motion.div>

                  {/* Animated Background Glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${mission.color}10 0%, transparent 70%)`,
                    }}
                  />
                  {/* Mission Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl relative"
                        style={{ backgroundColor: mission.color + "20" }}
                        animate={
                          progress >= 25
                            ? {
                                y: [0, -2, 0],
                                rotate:
                                  progress >= 50
                                    ? [0, 5, -5, 0]
                                    : [0, 2, -2, 0],
                              }
                            : {}
                        }
                        transition={{
                          duration: progress >= 50 ? 1.5 : 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {progress >= 100
                          ? "⭐"
                          : progress >= 25
                            ? "🚀"
                            : mission.icon}

                        {/* Rocket Trail Effect */}
                        {progress >= 25 && progress < 100 && (
                          <motion.div
                            className="absolute -right-1 top-1/2 w-4 h-0.5 bg-gradient-to-r from-orange-400 to-transparent rounded-full transform -translate-y-1/2"
                            animate={{
                              scaleX: [0.5, 1, 0.5],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        )}
                      </motion.div>
                      <div>
                        <h3
                          className={`font-semibold transition-colors ${
                            _viewMode === "play"
                              ? "text-white group-hover:text-purple-400"
                              : "text-gray-900 group-hover:text-purple-600"
                          }`}
                        >
                          {mission.name}
                        </h3>
                        <p
                          className={`text-sm capitalize ${
                            _viewMode === "play"
                              ? "text-slate-400"
                              : "text-gray-600"
                          }`}
                        >
                          {mission.category} • {mission.priority} priority
                        </p>
                      </div>
                    </div>
                    <Rocket className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
                  </div>

                  {/* Progress */}
                  <div className="mb-4 relative">
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className={`text-sm ${
                          _viewMode === "play"
                            ? "text-slate-400"
                            : "text-gray-600"
                        }`}
                      >
                        Mission Progress
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${
                            _viewMode === "play"
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          {progress.toFixed(1)}%
                        </span>
                        {progress >= 100 && (
                          <motion.span
                            className="text-yellow-400"
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            ⭐
                          </motion.span>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full relative overflow-hidden"
                          style={{
                            background: `linear-gradient(90deg, ${milestone.color}, ${mission.color})`,
                            boxShadow:
                              progress > 0
                                ? `0 0 10px ${milestone.color}40`
                                : "none",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        >
                          {/* Animated Progress Shine */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3,
                              ease: "easeInOut",
                            }}
                          />
                        </motion.div>
                      </div>

                      {/* Progress Milestones Markers */}
                      <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center pointer-events-none">
                        {[25, 50, 75, 100].map((milestone_percent) => (
                          <div
                            key={milestone_percent}
                            className={`w-1 h-4 rounded-full transition-all duration-500 ${
                              progress >= milestone_percent
                                ? "bg-white shadow-lg"
                                : "bg-slate-600"
                            }`}
                            style={{
                              marginLeft: `${milestone_percent}%`,
                              transform: "translateX(-50%)",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Amount Display */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p
                          className={`text-sm ${
                            _viewMode === "play"
                              ? "text-slate-400"
                              : "text-gray-600"
                          }`}
                        >
                          Saved
                        </p>
                        <motion.p
                          className={`text-lg font-bold ${
                            _viewMode === "play"
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                          key={mission.currentAmount}
                          initial={{ scale: 1.2, color: milestone.color }}
                          animate={{
                            scale: 1,
                            color: _viewMode === "play" ? "#ffffff" : "#111827",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          ฿{mission.currentAmount.toLocaleString()}
                        </motion.p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm ${
                            _viewMode === "play"
                              ? "text-slate-400"
                              : "text-gray-600"
                          }`}
                        >
                          Target
                        </p>
                        <p
                          className={`text-lg font-bold ${
                            _viewMode === "play"
                              ? "text-slate-300"
                              : "text-gray-700"
                          }`}
                        >
                          ฿{mission.targetAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Days Remaining with Enhanced Styling */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        ⏰
                      </motion.div>
                      <span
                        className={`text-sm ${
                          _viewMode === "play"
                            ? "text-slate-400"
                            : "text-gray-600"
                        }`}
                      >
                        {getDaysRemaining(mission.deadline)} days left
                      </span>
                    </div>

                    <motion.div
                      className={`transition-colors ${
                        _viewMode === "play"
                          ? "text-slate-400 group-hover:text-purple-400"
                          : "text-gray-500 group-hover:text-purple-600"
                      }`}
                      whileHover={{ scale: 1.1, rotate: 15 }}
                    >
                      <Rocket className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
