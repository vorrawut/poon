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
import {
  initialMissions,
  type Mission,
} from "../../../../mockData/features/future";

export function Future() {
  const [viewMode, setViewMode] = useState<"play" | "clarity">("play");
  const [accessibilityMode, setAccessibilityMode] = useState<
    "elder" | "youth" | "standard"
  >("standard");
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);

  // Initialize missions
  useEffect(() => {
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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <UniverseBackground />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <FadeIn direction="down" className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-4">
            <motion.div
              className="text-4xl md:text-6xl"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🚀
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Future
            </h1>
            <motion.div
              className="text-4xl md:text-6xl"
              animate={{
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              ⭐
            </motion.div>
          </div>

          <p
            className={`text-lg md:text-xl lg:text-2xl mb-6 max-w-4xl mx-auto px-4 ${
              viewMode === "play" ? "text-white/80" : "text-gray-600"
            }`}
          >
            {accessibilityMode === "elder"
              ? "Track your financial goals with clear, simple progress indicators and helpful guidance."
              : accessibilityMode === "youth"
                ? "Level up your money game! 🎮 Set epic financial quests and unlock achievements as you build your future empire! 💰✨"
                : "Your financial dreams as space missions. Track progress, celebrate milestones, and build the future you want."}
          </p>
        </FadeIn>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 mb-8 px-4">
          <DualLensToggle
            viewMode={viewMode}
            onToggle={setViewMode}
            className="order-2 sm:order-1"
          />

          <AccessibilityModeToggle
            mode={accessibilityMode}
            onModeChange={setAccessibilityMode}
            className="order-1 sm:order-2"
          />
        </div>

        {/* Mission Board or Detail View */}
        <AnimatePresence mode="wait">
          {selectedMission ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <MissionDetailView
                mission={selectedMission}
                onBack={handleBackToBoard}
                onUpdate={handleMissionUpdate}
              />
            </motion.div>
          ) : (
            <motion.div
              key="board"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <FutureMissionBoard 
                missions={missions}
                onMissionClick={handleMissionClick}
                viewMode={viewMode}
                accessibilityMode={accessibilityMode}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Co-Pilot */}
        <AICoPilot
          missions={missions}
          className="fixed bottom-6 right-6 z-50"
        />
      </div>
    </div>
  );
}
