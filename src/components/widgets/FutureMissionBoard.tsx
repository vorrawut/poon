import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Rocket, Star, Target, Calendar, DollarSign, Zap, Trophy, Map } from "lucide-react";

interface Mission {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: "travel" | "emergency" | "debt" | "investment" | "purchase" | "custom";
  theme: "rocket" | "planet" | "station" | "constellation";
  icon: string;
  color: string;
  priority: "low" | "medium" | "high" | "critical";
  isCompleted: boolean;
  createdAt: Date;
  transactions: Transaction[];
  notes: string[];
  milestones: Milestone[];
}

interface Transaction {
  id: string;
  amount: number;
  date: Date;
  type: "deposit" | "withdrawal";
  description: string;
}

interface Milestone {
  percentage: number;
  label: string;
  achieved: boolean;
  achievedDate?: Date;
}

interface FutureMissionBoardProps {
  onMissionClick: (mission: Mission) => void;
  className?: string;
}

export function FutureMissionBoard({
  onMissionClick,
  className = "",
}: FutureMissionBoardProps) {
  const [viewMode, setViewMode] = useState<"board" | "starmap">("board");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [missions, setMissions] = useState<Mission[]>([]);

  // Mock missions data
  useEffect(() => {
    const mockMissions: Mission[] = [
      {
        id: "japan-trip",
        name: "Travel to Japan 🗾",
        description: "Dream vacation to explore Tokyo, Kyoto, and Mount Fuji",
        targetAmount: 150000,
        currentAmount: 87500,
        deadline: new Date("2025-03-15"),
        category: "travel",
        theme: "rocket",
        icon: "🗾",
        color: "#FF6B6B",
        priority: "high",
        isCompleted: false,
        createdAt: new Date("2024-01-15"),
        transactions: [],
        notes: ["Save ฿10,000 per month", "Book flights by December"],
        milestones: [
          { percentage: 25, label: "Launch", achieved: true, achievedDate: new Date("2024-03-01") },
          { percentage: 50, label: "In Orbit", achieved: true, achievedDate: new Date("2024-06-15") },
          { percentage: 75, label: "Deep Space", achieved: false },
          { percentage: 100, label: "Arrival", achieved: false }
        ]
      },
      {
        id: "emergency-fund",
        name: "Emergency Fund 🛡️",
        description: "6 months of expenses for financial security",
        targetAmount: 300000,
        currentAmount: 195000,
        deadline: new Date("2025-06-01"),
        category: "emergency",
        theme: "station",
        icon: "🛡️",
        color: "#4ECDC4",
        priority: "critical",
        isCompleted: false,
        createdAt: new Date("2024-02-01"),
        transactions: [],
        notes: ["Critical for financial stability", "Target: 6 months expenses"],
        milestones: [
          { percentage: 25, label: "Foundation", achieved: true },
          { percentage: 50, label: "Secure Base", achieved: true },
          { percentage: 75, label: "Strong Defense", achieved: false },
          { percentage: 100, label: "Fortress Complete", achieved: false }
        ]
      },
      {
        id: "debt-free",
        name: "Debt-Free Orbit 🚀",
        description: "Clear all credit card debt and achieve financial freedom",
        targetAmount: 85000,
        currentAmount: 62000,
        deadline: new Date("2025-01-31"),
        category: "debt",
        theme: "rocket",
        icon: "🚀",
        color: "#45B7D1",
        priority: "high",
        isCompleted: false,
        createdAt: new Date("2024-03-01"),
        transactions: [],
        notes: ["Pay off credit cards first", "Focus on high-interest debt"],
        milestones: [
          { percentage: 25, label: "Escape Velocity", achieved: true },
          { percentage: 50, label: "Breaking Free", achieved: true },
          { percentage: 75, label: "Almost There", achieved: true },
          { percentage: 100, label: "Freedom Achieved", achieved: false }
        ]
      },
      {
        id: "new-laptop",
        name: "MacBook Pro 💻",
        description: "Upgrade to latest MacBook Pro for work and creativity",
        targetAmount: 75000,
        currentAmount: 45000,
        deadline: new Date("2024-12-25"),
        category: "purchase",
        theme: "constellation",
        icon: "💻",
        color: "#96CEB4",
        priority: "medium",
        isCompleted: false,
        createdAt: new Date("2024-04-01"),
        transactions: [],
        notes: ["Wait for Black Friday deals", "Consider trade-in value"],
        milestones: [
          { percentage: 25, label: "First Star", achieved: true },
          { percentage: 50, label: "Constellation Forming", achieved: false },
          { percentage: 75, label: "Nearly Complete", achieved: false },
          { percentage: 100, label: "Constellation Unlocked", achieved: false }
        ]
      }
    ];
    setMissions(mockMissions);
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

  const formatCurrency = (amount: number) => {
    return `฿${amount.toLocaleString()}`;
  };

  const getUrgencyColor = (daysRemaining: number) => {
    if (daysRemaining <= 30) return "#FF6B6B";
    if (daysRemaining <= 90) return "#FFD93D";
    return "#6BCF7F";
  };

  const getPriorityGlow = (priority: string) => {
    switch (priority) {
      case "critical": return "shadow-red-500/50";
      case "high": return "shadow-orange-500/40";
      case "medium": return "shadow-blue-500/30";
      case "low": return "shadow-gray-500/20";
      default: return "shadow-gray-500/20";
    }
  };

  const filteredMissions = missions.filter(mission => 
    selectedCategory === "all" || mission.category === selectedCategory
  );

  const completedMissions = missions.filter(m => m.isCompleted).length;
  const totalProgress = missions.reduce((sum, m) => sum + getProgressPercentage(m), 0) / missions.length;

  return (
    <div className={`relative ${className}`}>
      {/* Mission Board Header */}
      <motion.div
        className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity }
              }}
            >
              <Rocket className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Future Mission Board</h1>
              <p className="text-white/70">Your financial dreams as space missions</p>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <motion.button
              onClick={() => setViewMode("board")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "board"
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Target className="w-4 h-4 inline mr-2" />
              Mission Board
            </motion.button>
            <motion.button
              onClick={() => setViewMode("starmap")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "starmap"
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Map className="w-4 h-4 inline mr-2" />
              Star Map
            </motion.button>
          </div>
        </div>

        {/* Mission Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Active Missions", value: missions.filter(m => !m.isCompleted).length, icon: "🚀", color: "#4ECDC4" },
            { label: "Completed", value: completedMissions, icon: "🏆", color: "#FFD93D" },
            { label: "Total Progress", value: `${totalProgress.toFixed(0)}%`, icon: "📊", color: "#FF6B6B" },
            { label: "This Month", value: "฿25K", icon: "💰", color: "#96CEB4" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["all", "travel", "emergency", "debt", "investment", "purchase", "custom"].map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {category === "all" ? "All Missions" : category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Add New Mission Button */}
        <motion.button
          onClick={() => setShowCreateModal(true)}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:from-purple-600 hover:to-indigo-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          Launch New Mission
        </motion.button>
      </motion.div>

      {/* Mission Display */}
      <AnimatePresence mode="wait">
        {viewMode === "board" && (
          <motion.div
            key="board"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {filteredMissions.map((mission, index) => {
              const progress = getProgressPercentage(mission);
              const daysRemaining = getDaysRemaining(mission.deadline);
              const urgencyColor = getUrgencyColor(daysRemaining);
              
              return (
                <motion.div
                  key={mission.id}
                  className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 cursor-pointer overflow-hidden ${getPriorityGlow(mission.priority)}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    backgroundColor: "rgba(255,255,255,0.1)"
                  }}
                  onClick={() => onMissionClick(mission)}
                  style={{
                    boxShadow: `0 0 30px ${mission.color}20`
                  }}
                >
                  {/* Mission Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                        style={{ backgroundColor: mission.color + "20", border: `2px solid ${mission.color}40` }}
                      >
                        {mission.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{mission.name}</h3>
                        <p className="text-white/60 text-sm">{mission.description}</p>
                      </div>
                    </div>
                    
                    {/* Priority Badge */}
                    <div 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: mission.color + "20",
                        color: mission.color
                      }}
                    >
                      {mission.priority.toUpperCase()}
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/70 text-sm">Mission Progress</span>
                      <span className="text-white font-bold">{progress.toFixed(1)}%</span>
                    </div>
                    
                    {/* Animated Progress Bar */}
                    <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{ backgroundColor: mission.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                      
                      {/* Rocket Animation */}
                      <motion.div
                        className="absolute top-1/2 transform -translate-y-1/2 text-white text-xs"
                        style={{ left: `${Math.max(progress - 2, 0)}%` }}
                        animate={{ 
                          x: [0, 2, 0],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        🚀
                      </motion.div>
                    </div>
                  </div>

                  {/* Amount Section */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-white/60 text-xs">Saved</div>
                      <div className="text-white font-bold">{formatCurrency(mission.currentAmount)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/60 text-xs">Target</div>
                      <div className="text-white font-bold">{formatCurrency(mission.targetAmount)}</div>
                    </div>
                  </div>

                  {/* Countdown */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-white/60" />
                      <span className="text-white/70 text-sm">
                        {mission.deadline.toLocaleDateString()}
                      </span>
                    </div>
                    <div 
                      className="px-3 py-1 rounded-full text-sm font-bold"
                      style={{ 
                        backgroundColor: urgencyColor + "20",
                        color: urgencyColor
                      }}
                    >
                      {daysRemaining === 0 ? "Today!" : `${daysRemaining} days`}
                    </div>
                  </div>

                  {/* Current Milestone */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    {mission.milestones.map((milestone, idx) => {
                      if (progress >= milestone.percentage && !milestone.achieved) {
                        return (
                          <motion.div
                            key={idx}
                            className="flex items-center gap-2 text-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                          >
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-white/80">
                              Next: <strong>{milestone.label}</strong> at {milestone.percentage}%
                            </span>
                          </motion.div>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Glow Effect Based on Progress */}
                  <div 
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${mission.color}${Math.floor(progress * 0.3).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {viewMode === "starmap" && (
          <motion.div
            key="starmap"
            className="relative h-96 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl overflow-hidden border border-white/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {/* Stars Background */}
            <div className="absolute inset-0">
              {Array.from({ length: 100 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Mission Stars */}
            {filteredMissions.map((mission, index) => {
              const progress = getProgressPercentage(mission);
              const x = 20 + (index % 4) * 20;
              const y = 20 + Math.floor(index / 4) * 25;
              
              return (
                <motion.div
                  key={mission.id}
                  className="absolute cursor-pointer"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => onMissionClick(mission)}
                >
                  <motion.div
                    className="relative w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: mission.color,
                      boxShadow: `0 0 20px ${mission.color}80`
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${mission.color}80`,
                        `0 0 40px ${mission.color}`,
                        `0 0 20px ${mission.color}80`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white text-sm">{mission.icon}</span>
                  </motion.div>
                  
                  {/* Mission Name */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-white text-xs font-medium whitespace-nowrap">
                      {mission.name.split(' ')[0]}
                    </div>
                    <div className="text-white/60 text-xs">
                      {progress.toFixed(0)}%
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Star Map Legend */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
              <div className="text-white text-sm font-bold mb-2">Galaxy Progress</div>
              <div className="text-white/70 text-xs">
                Each star represents a mission. Brighter stars = more progress!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
