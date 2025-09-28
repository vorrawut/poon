import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockFutureMissions } from "../../../mockData/features/widgets";
import { Plus, Rocket, Star, Target, Calendar, Map } from "lucide-react";

interface Mission {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
  theme: string;
  icon: string;
  color: string;
  priority: string;
  isCompleted: boolean;
  createdAt: Date;
  transactions: any[];
  notes: string[];
  milestones: {
    percentage: number;
    label: string;
    achieved: boolean;
    achievedDate?: Date;
  }[];
}

interface FutureMissionBoardProps {
  className?: string;
}

export function FutureMissionBoard({
  className = "",
}: FutureMissionBoardProps) {
  const [viewMode, setViewMode] = useState<"board" | "starmap">("board");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [missions, setMissions] = useState<Mission[]>([]);

  // Load missions data from centralized mock data
  useEffect(() => {
    setMissions(mockFutureMissions);
  }, []);

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Future Mission Board 🚀
          </h2>
          <p className="text-slate-400 mt-2">
            Track your financial goals like space missions
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex bg-slate-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode("board")}
              className={`px-4 py-2 rounded-md transition-all ${
                viewMode === "board"
                  ? "bg-purple-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Target className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("starmap")}
              className={`px-4 py-2 rounded-md transition-all ${
                viewMode === "starmap"
                  ? "bg-purple-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Map className="w-4 h-4" />
            </button>
          </div>

          {/* Add Mission Button */}
          <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
            <Plus className="w-4 h-4" />
            <span>New Mission</span>
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === category
                ? "bg-purple-500 text-white"
                : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            {category === "all"
              ? "All Missions"
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredMissions.map((mission) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all group"
            >
              {/* Mission Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: mission.color + "20" }}
                  >
                    {mission.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                      {mission.name}
                    </h3>
                    <p className="text-sm text-slate-400 capitalize">
                      {mission.category} • {mission.priority} priority
                    </p>
                  </div>
                </div>
                <Rocket className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Progress</span>
                  <span className="text-sm font-medium text-white">
                    {getProgressPercentage(mission).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage(mission)}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-white">
                    ฿{mission.currentAmount.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-400">
                    of ฿{mission.targetAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Deadline */}
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>{getDaysRemaining(mission.deadline)} days remaining</span>
              </div>

              {/* Milestones */}
              <div className="mt-4 flex space-x-1">
                {mission.milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      milestone.achieved ? "bg-green-500" : "bg-slate-600"
                    }`}
                    title={`${milestone.label} (${milestone.percentage}%)`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
