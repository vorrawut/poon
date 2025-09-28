import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "../../../components/ui";
import {
  FutureMissionBoard,
  MissionDetailView,
  AICoPilot,
  DualLensToggle,
  UniverseBackground,
  AccessibilityModeToggle,
} from "../../../components/widgets";

interface Mission {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category:
    | "travel"
    | "emergency"
    | "debt"
    | "investment"
    | "purchase"
    | "custom";
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

export function Future() {
  const [viewMode, setViewMode] = useState<"play" | "clarity">("play");
  const [accessibilityMode, setAccessibilityMode] = useState<
    "elder" | "youth" | "standard"
  >("standard");
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);

  // Initialize missions
  useEffect(() => {
    const initialMissions: Mission[] = [
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
        transactions: [
          {
            id: "t1",
            amount: 15000,
            date: new Date("2024-01-15"),
            type: "deposit",
            description: "Initial savings",
          },
          {
            id: "t2",
            amount: 12500,
            date: new Date("2024-02-01"),
            type: "deposit",
            description: "Monthly savings",
          },
          {
            id: "t3",
            amount: 10000,
            date: new Date("2024-03-01"),
            type: "deposit",
            description: "Bonus allocation",
          },
        ],
        notes: [
          "Save ฿10,000 per month",
          "Book flights by December",
          "Research best travel season",
        ],
        milestones: [
          {
            percentage: 25,
            label: "Launch",
            achieved: true,
            achievedDate: new Date("2024-03-01"),
          },
          {
            percentage: 50,
            label: "In Orbit",
            achieved: true,
            achievedDate: new Date("2024-06-15"),
          },
          { percentage: 75, label: "Deep Space", achieved: false },
          { percentage: 100, label: "Arrival", achieved: false },
        ],
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
        transactions: [
          {
            id: "e1",
            amount: 50000,
            date: new Date("2024-02-01"),
            type: "deposit",
            description: "Emergency fund start",
          },
          {
            id: "e2",
            amount: 25000,
            date: new Date("2024-03-01"),
            type: "deposit",
            description: "Monthly contribution",
          },
        ],
        notes: [
          "Critical for financial stability",
          "Target: 6 months expenses",
          "Keep in high-yield savings",
        ],
        milestones: [
          { percentage: 25, label: "Foundation", achieved: true },
          { percentage: 50, label: "Secure Base", achieved: true },
          { percentage: 75, label: "Strong Defense", achieved: false },
          { percentage: 100, label: "Fortress Complete", achieved: false },
        ],
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
        transactions: [
          {
            id: "d1",
            amount: 20000,
            date: new Date("2024-03-01"),
            type: "deposit",
            description: "Initial debt payment",
          },
          {
            id: "d2",
            amount: 15000,
            date: new Date("2024-04-01"),
            type: "deposit",
            description: "Credit card payment",
          },
        ],
        notes: [
          "Pay off credit cards first",
          "Focus on high-interest debt",
          "Snowball method",
        ],
        milestones: [
          { percentage: 25, label: "Escape Velocity", achieved: true },
          { percentage: 50, label: "Breaking Free", achieved: true },
          { percentage: 75, label: "Almost There", achieved: true },
          { percentage: 100, label: "Freedom Achieved", achieved: false },
        ],
      },
    ];

    setMissions(initialMissions);
  }, []);

  const handleMissionClick = (mission: Mission) => {
    setSelectedMission(mission);
  };

  const handleMissionUpdate = (updatedMission: Mission) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === updatedMission.id ? updatedMission : m)),
    );
    setSelectedMission(updatedMission);
  };

  const handleBackToBoard = () => {
    setSelectedMission(null);
  };

  const activeMissions = missions.filter((m) => !m.isCompleted);
  const totalProgress =
    missions.reduce(
      (sum, m) => sum + (m.currentAmount / m.targetAmount) * 100,
      0,
    ) / missions.length;

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        viewMode === "play"
          ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
          : "bg-gradient-to-br from-indigo-50 to-purple-50"
      }`}
    >
      {viewMode === "play" && <UniverseBackground starCount={80} />}
      <DualLensToggle viewMode={viewMode} onToggle={setViewMode} />

      {/* Accessibility Mode Toggle */}
      <div className="fixed top-6 right-2 sm:top-6 sm:right-4 lg:top-6 lg:right-8 z-50">
        <AccessibilityModeToggle
          mode={accessibilityMode}
          onModeChange={setAccessibilityMode}
        />
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pb-8 sm:pb-12 pt-20 sm:pt-24 lg:pt-32 relative z-10">
        {/* Hero Section */}
        {!selectedMission && (
          <FadeIn
            direction="down"
            delay={0.1}
            className="text-center py-4 sm:py-8 mb-8"
          >
            <div className="mb-8">
              <div
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 ${
                  viewMode === "play" ? "text-white" : "text-gray-900"
                }`}
              >
                <motion.span
                  className="inline-block mr-4"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity },
                  }}
                >
                  🚀
                </motion.span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Future Mission Control
                </span>
              </div>
              <p
                className={`text-lg sm:text-xl md:text-2xl mb-8 max-w-4xl mx-auto px-4 ${
                  viewMode === "play" ? "text-white/80" : "text-gray-600"
                }`}
              >
                {viewMode === "play"
                  ? "Transform your dreams into space missions! Every goal is a destination in your personal galaxy. 🌌✨"
                  : "Professional goal tracking with progress visualization, milestone management, and intelligent insights for achieving your financial objectives."}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                  {
                    label: "Active Missions",
                    value: activeMissions.length,
                    icon: "🚀",
                  },
                  {
                    label: "Total Progress",
                    value: `${totalProgress.toFixed(0)}%`,
                    icon: "📊",
                  },
                  { label: "This Month", value: "฿45K", icon: "💰" },
                  { label: "Next Deadline", value: "28 days", icon: "⏰" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className={`p-4 rounded-xl border ${
                      viewMode === "play"
                        ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                        : "bg-white border-gray-200 text-gray-900"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div
                      className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* AI Co-Pilot */}
        {!selectedMission && (
          <FadeIn direction="up" delay={0.3} className="mb-8">
            <AICoPilot missions={activeMissions} />
          </FadeIn>
        )}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {selectedMission ? (
            <motion.div
              key="mission-detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <MissionDetailView
                mission={selectedMission}
                onBack={handleBackToBoard}
                onUpdate={handleMissionUpdate}
              />
            </motion.div>
          ) : (
            <motion.div
              key="mission-board"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <FadeIn direction="up" delay={0.4}>
                <FutureMissionBoard onMissionClick={handleMissionClick} />
              </FadeIn>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inspirational Footer */}
        {!selectedMission && (
          <motion.div
            className={`mt-12 text-center p-8 rounded-2xl border ${
              viewMode === "play"
                ? "bg-white/10 backdrop-blur-sm border-white/20 text-white"
                : "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-gray-900"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-3xl sm:text-4xl mb-4">🌟</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              Your Dreams Await
            </h3>
            <p
              className={`text-base sm:text-lg mb-6 max-w-2xl mx-auto px-4 ${
                viewMode === "play" ? "text-white/80" : "text-gray-600"
              }`}
            >
              Every mission you complete brings you closer to the life you've
              always imagined. Your future self is counting on the decisions you
              make today. Launch your next mission and reach for the stars!
            </p>
            <div
              className={`text-sm ${
                viewMode === "play" ? "text-white/60" : "text-gray-500"
              }`}
            >
              "A goal is a dream with a deadline and a rocket ship." 🚀
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
