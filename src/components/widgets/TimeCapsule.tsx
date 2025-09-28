import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  Calendar,
  Gift,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  date: Date;
  amount?: number;
  category: "income" | "savings" | "investment" | "achievement" | "goal";
  icon: string;
  color: string;
  isLocked: boolean;
  unlockDate?: Date;
  rarity: "common" | "rare" | "epic" | "legendary";
  memories: string[];
  futureValue?: number;
}

interface TimeCapsuleProps {
  timelinePosition: number;
  selectedRange: "day" | "week" | "month" | "quarter" | "year";
  onMilestoneClick: (milestone: Milestone) => void;
  className?: string;
}

export function TimeCapsule({
  timelinePosition,
  selectedRange: _selectedRange,
  onMilestoneClick,
  className = "",
}: TimeCapsuleProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"timeline" | "gallery" | "retro">(
    "timeline",
  );
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Mock milestones data
  const milestones: Milestone[] = [
    {
      id: "first-paycheck",
      title: "First Paycheck 💼",
      description:
        "Received your very first salary payment - the beginning of your financial journey!",
      date: new Date("2024-01-15"),
      amount: 85000,
      category: "income",
      icon: "💼",
      color: "#3B82F6",
      isLocked: false,
      rarity: "legendary",
      memories: [
        "Felt incredible to see that first deposit",
        "Celebrated with a nice dinner",
        "Started planning your financial future",
      ],
    },
    {
      id: "emergency-fund",
      title: "Emergency Fund Complete 🛡️",
      description:
        "Built a solid 6-month emergency fund - financial security achieved!",
      date: new Date("2024-03-20"),
      amount: 300000,
      category: "savings",
      icon: "🛡️",
      color: "#10B981",
      isLocked: false,
      rarity: "epic",
      memories: [
        "Slept better knowing you're protected",
        "Felt proud of your discipline",
        "Ready for any unexpected expenses",
      ],
    },
    {
      id: "first-investment",
      title: "Investment Journey Begins 📈",
      description: "Made your first investment - money working for money!",
      date: new Date("2024-04-10"),
      amount: 50000,
      category: "investment",
      icon: "📈",
      color: "#8B5CF6",
      isLocked: false,
      rarity: "rare",
      memories: [
        "Nervous but excited about investing",
        "Researched for weeks before deciding",
        "First step toward financial independence",
      ],
      futureValue: 125000,
    },
    {
      id: "debt-free",
      title: "Debt-Free Achievement 🎉",
      description:
        "Paid off all high-interest debt - financial freedom unlocked!",
      date: new Date("2024-06-15"),
      amount: 150000,
      category: "achievement",
      icon: "🎉",
      color: "#F59E0B",
      isLocked: false,
      rarity: "epic",
      memories: [
        "Huge weight lifted off your shoulders",
        "Celebrated with friends and family",
        "Ready to focus on building wealth",
      ],
    },
    {
      id: "100k-savings",
      title: "100K Savings Milestone 💰",
      description: "Reached ฿100,000 in total savings - six figures achieved!",
      date: new Date("2024-08-30"),
      amount: 100000,
      category: "savings",
      icon: "💰",
      color: "#06B6D4",
      isLocked: false,
      rarity: "legendary",
      memories: [
        "Screenshot of the account balance",
        "Called parents to share the news",
        "Treated yourself to something special",
      ],
    },
    {
      id: "million-net-worth",
      title: "Millionaire Status 👑",
      description:
        "Net worth crosses ฿1,000,000 - welcome to the millionaire club!",
      date: new Date("2025-03-15"),
      amount: 1000000,
      category: "achievement",
      icon: "👑",
      color: "#EF4444",
      isLocked: true,
      unlockDate: new Date("2025-03-15"),
      rarity: "legendary",
      memories: [
        "This milestone awaits your arrival...",
        "The journey continues...",
        "Dreams becoming reality...",
      ],
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "#6B7280";
      case "rare":
        return "#3B82F6";
      case "epic":
        return "#8B5CF6";
      case "legendary":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "shadow-gray-500/20";
      case "rare":
        return "shadow-blue-500/30";
      case "epic":
        return "shadow-purple-500/40";
      case "legendary":
        return "shadow-yellow-500/50";
      default:
        return "shadow-gray-500/20";
    }
  };

  const formatCurrency = (amount: number) => {
    return `฿${amount.toLocaleString()}`;
  };

  const isUnlocked = (milestone: Milestone) => {
    if (!milestone.isLocked) return true;
    if (!milestone.unlockDate) return false;

    // Simulate unlocking based on timeline position
    const now = new Date();
    const unlockTime = milestone.unlockDate.getTime();
    const currentTime =
      now.getTime() + (timelinePosition / 100) * (365 * 24 * 60 * 60 * 1000);

    return currentTime >= unlockTime;
  };

  const filteredMilestones = milestones.filter(
    (milestone) =>
      filterCategory === "all" || milestone.category === filterCategory,
  );

  return (
    <div className={`relative ${className}`}>
      {/* Time Capsule Header */}
      <motion.div
        className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Gift className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Time Capsule
              </h2>
              <p className="text-white/70 text-sm">
                Your financial milestones & memories
              </p>
            </div>
          </div>

          {/* View Mode Selector */}
          <div className="flex gap-2">
            {[
              { id: "timeline", label: "Timeline", icon: "📅" },
              { id: "gallery", label: "Gallery", icon: "🖼️" },
              { id: "retro", label: "Retro", icon: "🎮" },
            ].map((mode) => (
              <motion.button
                key={mode.id}
                onClick={() => setViewMode(mode.id as any)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === mode.id
                    ? "bg-white/20 text-white border border-white/30"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-1">{mode.icon}</span>
                {mode.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-4">
          {[
            "all",
            "income",
            "savings",
            "investment",
            "achievement",
            "goal",
          ].map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filterCategory === category
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {category === "all"
                ? "All"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Milestones", value: milestones.length, icon: "🏆" },
            {
              label: "Unlocked",
              value: milestones.filter((m) => isUnlocked(m)).length,
              icon: "🔓",
            },
            {
              label: "Legendary",
              value: milestones.filter((m) => m.rarity === "legendary").length,
              icon: "👑",
            },
            {
              label: "Future Goals",
              value: milestones.filter((m) => m.isLocked).length,
              icon: "🎯",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/5 rounded-lg p-3 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-lg font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Milestones Display */}
      <AnimatePresence mode="wait">
        {viewMode === "timeline" && (
          <motion.div
            key="timeline"
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {filteredMilestones.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No Milestones Found
                </h3>
                <p className="text-white/70">
                  {filterCategory === "all"
                    ? "Start your financial journey to unlock achievements!"
                    : `No ${filterCategory} milestones yet. Try a different category.`}
                </p>
              </motion.div>
            ) : (
              filteredMilestones.map((milestone, index) => {
                const unlocked = isUnlocked(milestone);

                return (
                  <motion.div
                    key={milestone.id}
                    className={`relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border cursor-pointer ${
                      unlocked
                        ? "border-white/20 hover:border-white/40"
                        : "border-white/10"
                    } ${selectedMilestone === milestone.id ? "ring-2 ring-amber-400/50" : ""}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: unlocked ? 1.02 : 1,
                      y: unlocked ? -2 : 0,
                    }}
                    onClick={() => {
                      if (unlocked) {
                        setSelectedMilestone(
                          selectedMilestone === milestone.id
                            ? null
                            : milestone.id,
                        );
                        onMilestoneClick(milestone);
                      }
                    }}
                    style={{
                      filter: unlocked ? "none" : "grayscale(70%) opacity(60%)",
                    }}
                  >
                    {/* Lock/Unlock Indicator */}
                    <div className="absolute top-4 right-4">
                      {unlocked ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-green-400"
                        >
                          <Unlock size={20} />
                        </motion.div>
                      ) : (
                        <div className="text-gray-400">
                          <Lock size={20} />
                        </div>
                      )}
                    </div>

                    <div className="flex items-start gap-4">
                      {/* Milestone Icon */}
                      <motion.div
                        className={`relative w-16 h-16 rounded-full flex items-center justify-center text-2xl ${getRarityGlow(milestone.rarity)}`}
                        style={{
                          backgroundColor: milestone.color + "20",
                          border: `2px solid ${milestone.color}40`,
                        }}
                        animate={
                          unlocked
                            ? {
                                boxShadow: [
                                  `0 0 20px ${getRarityColor(milestone.rarity)}40`,
                                  `0 0 30px ${getRarityColor(milestone.rarity)}60`,
                                  `0 0 20px ${getRarityColor(milestone.rarity)}40`,
                                ],
                              }
                            : {}
                        }
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span>{milestone.icon}</span>

                        {/* Rarity Indicator */}
                        <div
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs"
                          style={{
                            backgroundColor: getRarityColor(milestone.rarity),
                          }}
                        >
                          {milestone.rarity === "legendary" && "👑"}
                          {milestone.rarity === "epic" && "💎"}
                          {milestone.rarity === "rare" && "⭐"}
                          {milestone.rarity === "common" && "🔹"}
                        </div>
                      </motion.div>

                      {/* Milestone Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-white">
                            {milestone.title}
                          </h3>
                          <span
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor:
                                getRarityColor(milestone.rarity) + "20",
                              color: getRarityColor(milestone.rarity),
                            }}
                          >
                            {milestone.rarity}
                          </span>
                        </div>

                        <p className="text-white/70 text-sm mb-3">
                          {milestone.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-white/60">
                            <Calendar size={14} />
                            <span>{milestone.date.toLocaleDateString()}</span>
                          </div>

                          {milestone.amount && (
                            <div
                              className="flex items-center gap-1 font-bold"
                              style={{ color: milestone.color }}
                            >
                              <span>{formatCurrency(milestone.amount)}</span>
                            </div>
                          )}

                          {milestone.futureValue && unlocked && (
                            <div className="flex items-center gap-1 text-green-400">
                              <TrendingUp size={14} />
                              <span>
                                Now worth{" "}
                                {formatCurrency(milestone.futureValue)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Memories */}
                    <AnimatePresence>
                      {selectedMilestone === milestone.id && unlocked && (
                        <motion.div
                          className="mt-6 pt-6 border-t border-white/10"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <Sparkles size={16} />
                            Memories from this milestone
                          </h4>
                          <div className="space-y-2">
                            {milestone.memories.map((memory, memIndex) => (
                              <motion.div
                                key={memIndex}
                                className="flex items-start gap-2 text-sm text-white/70"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: memIndex * 0.1 }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                                <span>{memory}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        )}

        {viewMode === "gallery" && (
          <motion.div
            key="gallery"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {filteredMilestones.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-4xl mb-4">🖼️</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Gallery Empty
                </h3>
                <p className="text-white/70">
                  No milestones to display in gallery view.
                </p>
              </div>
            ) : (
              filteredMilestones.map((milestone, index) => {
                const unlocked = isUnlocked(milestone);

                return (
                  <motion.div
                    key={milestone.id}
                    className={`relative aspect-square bg-white/5 backdrop-blur-sm rounded-xl p-4 border cursor-pointer ${
                      unlocked
                        ? "border-white/20 hover:border-white/40"
                        : "border-white/10"
                    }`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: unlocked ? 1.05 : 1 }}
                    onClick={() => unlocked && onMilestoneClick(milestone)}
                    style={{
                      filter: unlocked ? "none" : "grayscale(70%) opacity(60%)",
                    }}
                  >
                    <div className="absolute top-2 right-2">
                      {unlocked ? (
                        <Unlock size={16} className="text-green-400" />
                      ) : (
                        <Lock size={16} className="text-gray-400" />
                      )}
                    </div>

                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="text-3xl mb-2">{milestone.icon}</div>
                      <div className="text-sm font-bold text-white mb-1">
                        {milestone.title.split(" ")[0]}
                      </div>
                      {milestone.amount && (
                        <div
                          className="text-xs"
                          style={{ color: milestone.color }}
                        >
                          {formatCurrency(milestone.amount)}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        )}

        {viewMode === "retro" && (
          <motion.div
            key="retro"
            className="bg-black/80 rounded-xl p-6 border-2 border-green-400/50 font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)",
              filter: "contrast(1.2) brightness(1.1)",
            }}
          >
            <div className="text-green-400 text-center mb-6">
              <div className="text-2xl mb-2">🎮 RETRO FINANCIAL ARCADE 🎮</div>
              <div className="text-sm">--- ACHIEVEMENT UNLOCKED ---</div>
            </div>

            <div className="space-y-3">
              {filteredMilestones.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-green-400 text-2xl mb-2">
                    🎮 NO DATA FOUND 🎮
                  </div>
                  <div className="text-green-400">
                    --- ACHIEVEMENT DATABASE EMPTY ---
                  </div>
                </div>
              ) : (
                filteredMilestones.map((milestone, index) => {
                  const unlocked = isUnlocked(milestone);

                  return (
                    <motion.div
                      key={milestone.id}
                      className={`flex items-center gap-4 p-3 rounded ${
                        unlocked
                          ? "bg-green-400/10 text-green-400"
                          : "bg-gray-400/10 text-gray-400"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="text-xl">{unlocked ? "✅" : "❌"}</div>
                      <div className="flex-1">
                        <div className="font-bold">
                          {milestone.title.toUpperCase()}
                        </div>
                        <div className="text-sm opacity-70">
                          {milestone.date.toLocaleDateString()}
                        </div>
                      </div>
                      {milestone.amount && (
                        <div className="font-bold">
                          {formatCurrency(milestone.amount)}
                        </div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>

            <div className="text-center mt-6 text-green-400">
              <div className="text-sm">PRESS [SPACE] TO CONTINUE</div>
              <div className="animate-pulse">▼</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
