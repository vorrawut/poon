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
    <div
      className={`min-h-screen transition-all duration-1000 ${
        viewMode === "play"
          ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
          : "bg-gradient-to-br from-indigo-50 to-purple-50"
      }`}
    >
      {viewMode === "play" && <UniverseBackground starCount={60} />}

      {/* Dual Lens Toggle */}
      <DualLensToggle
        viewMode={viewMode}
        onToggle={setViewMode}
        className="fixed top-4 right-4 z-50"
      />

      {/* Accessibility Mode Toggle */}
      <AccessibilityModeToggle
        mode={accessibilityMode}
        onModeChange={setAccessibilityMode}
        className={`fixed top-4 left-4 z-50 ${
          viewMode === "play" ? "" : "translate-y-0"
        }`}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pb-20 sm:pb-24 pt-20 sm:pt-24 lg:pt-32 relative z-10">
        {/* Ultimate Hero Section */}
        <FadeIn direction="down" delay={0.1} className="text-center mb-12">
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-6">
              <motion.div
                className="text-5xl md:text-7xl"
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
              <h1
                className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-4 ${
                  viewMode === "play"
                    ? "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                    : "text-gray-900"
                }`}
              >
                Future
              </h1>
              <motion.div
                className="text-5xl md:text-7xl"
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
              className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto px-4 ${
                viewMode === "play" ? "text-white/80" : "text-gray-600"
              }`}
            >
              {accessibilityMode === "elder"
                ? "Track your financial goals with clear, simple progress indicators and helpful guidance."
                : accessibilityMode === "youth"
                  ? "Level up your money game! 🎮 Set epic financial quests and unlock achievements as you build your future empire! 💰✨"
                  : viewMode === "play"
                    ? "Navigate your financial universe — where every goal becomes a space mission in your personal galaxy! 🌌"
                    : "Your financial goals made simple. Track progress, set targets, and achieve your dreams with clear, actionable steps."}
            </p>
          </div>
        </FadeIn>

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

        {/* AI Co-Pilot - Responsive positioning */}
        <AICoPilot
          missions={missions}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        />
      </div>
    </div>
  );
}
