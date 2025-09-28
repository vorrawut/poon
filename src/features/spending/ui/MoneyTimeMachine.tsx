import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "../../../components/ui";
import {
  TimeMachineTimeline,
  MoneyGalaxy,
  MoneyFlowRiver,
  AIFinancialHistorian,
  TimeCapsule,
  UniverseBackground,
} from "../../../components/widgets";

import { useUIStore } from "../../../store/useUIStore";

export function MoneyTimeMachine() {
  const { viewMode, accessibilityMode } = useUIStore();
  const [activeSection, setActiveSection] = useState<
    "galaxy" | "river" | "historian" | "capsule"
  >("galaxy");
  const [timelinePosition, setTimelinePosition] = useState(50); // 0-100%
  const [selectedRange, setSelectedRange] = useState<
    "day" | "week" | "month" | "quarter" | "year"
  >("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  const handleRangeChange = (
    range: "day" | "week" | "month" | "quarter" | "year",
  ) => {
    setSelectedRange(range);
  };

  const handlePlanetClick = (planet: any) => {
    console.log("Planet clicked:", planet);
  };

  const handleStreamClick = (stream: any) => {
    console.log("Stream clicked:", stream);
  };

  const handleMilestoneClick = (milestone: any) => {
    console.log("Milestone clicked:", milestone);
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


      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pb-8 sm:pb-12 pt-20 sm:pt-24 lg:pt-32 relative z-10">
        {/* Ultimate Hero Section */}
        <FadeIn
          direction="down"
          delay={0.1}
          className="text-center py-4 sm:py-8"
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
                ⏰
              </motion.span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Money Time Machine
              </span>
            </div>
            <p
              className={`text-lg sm:text-xl md:text-2xl mb-8 max-w-4xl mx-auto px-4 ${
                viewMode === "play" ? "text-white/80" : "text-gray-600"
              }`}
            >
              {viewMode === "play"
                ? "Travel through your financial universe — witness your money's epic journey across time and space! 🚀✨"
                : "Comprehensive financial time analysis with interactive visualizations and AI-powered insights for informed decision making."}
            </p>
          </div>
        </FadeIn>

        {/* Time Machine Timeline */}
        <FadeIn direction="up" delay={0.2}>
          <TimeMachineTimeline
            currentDate={currentDate}
            onDateChange={handleDateChange}
            onRangeChange={handleRangeChange}
            selectedRange={selectedRange}
            timelinePosition={timelinePosition}
            onTimelinePositionChange={setTimelinePosition}
            className="mb-8"
          />
        </FadeIn>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6 sm:mb-8 lg:mb-12 px-2 sm:px-4">
          <div className="flex overflow-x-auto scrollbar-hide gap-1 sm:gap-2 p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 w-full max-w-4xl">
            {[
              {
                id: "galaxy",
                label: "🌌 Financial Galaxy",
                desc: "Planet view of categories",
              },
              {
                id: "river",
                label: "🌊 Money River",
                desc: "Flow visualization",
              },
              {
                id: "historian",
                label: "🧠 AI Historian",
                desc: "Story & insights",
              },
              {
                id: "capsule",
                label: "🎁 Time Capsule",
                desc: "Milestones & achievements",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-2 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                  activeSection === tab.id
                    ? viewMode === "play"
                      ? "bg-white/20 text-white border border-white/30"
                      : "bg-white text-gray-900 border border-gray-200 shadow-sm"
                    : viewMode === "play"
                      ? "hover:bg-white/10 text-white/70"
                      : "hover:bg-gray-50 text-gray-600"
                }`}
              >
                <div className="text-center">
                  <div className="text-xs sm:text-sm font-semibold leading-tight">
                    {tab.label}
                  </div>
                  <div className="text-xs opacity-70 hidden sm:block mt-1">
                    {tab.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Sections */}
        <AnimatePresence mode="wait">
          {activeSection === "galaxy" && (
            <motion.div
              key="galaxy"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <FadeIn direction="up" delay={0.3}>
                <MoneyGalaxy
                  timelinePosition={timelinePosition}
                  selectedRange={selectedRange}
                  onPlanetClick={handlePlanetClick}
                />
              </FadeIn>
            </motion.div>
          )}

          {activeSection === "river" && (
            <motion.div
              key="river"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <FadeIn direction="up" delay={0.3}>
                <MoneyFlowRiver
                  timelinePosition={timelinePosition}
                  selectedRange={selectedRange}
                  onStreamClick={handleStreamClick}
                />
              </FadeIn>
            </motion.div>
          )}

          {activeSection === "historian" && (
            <motion.div
              key="historian"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <FadeIn direction="up" delay={0.3}>
                <AIFinancialHistorian
                  timelinePosition={timelinePosition}
                  selectedRange={selectedRange}
                />
              </FadeIn>
            </motion.div>
          )}

          {activeSection === "capsule" && (
            <motion.div
              key="capsule"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <FadeIn direction="up" delay={0.3}>
                <TimeCapsule
                  timelinePosition={timelinePosition}
                  selectedRange={selectedRange}
                  onMilestoneClick={handleMilestoneClick}
                />
              </FadeIn>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Time Machine Footer */}
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
          <div className="text-3xl sm:text-4xl mb-4">🚀</div>
          <h3 className="text-xl sm:text-2xl font-bold mb-4">
            Your Financial Time Travel Adventure
          </h3>
          <p
            className={`text-base sm:text-lg mb-6 max-w-2xl mx-auto px-4 ${
              viewMode === "play" ? "text-white/80" : "text-gray-600"
            }`}
          >
            Every financial decision creates ripples through time. Use this time
            machine to understand your past, optimize your present, and shape
            your future. Your money story is epic — make it legendary!
          </p>
          <div
            className={`text-sm ${
              viewMode === "play" ? "text-white/60" : "text-gray-500"
            }`}
          >
            "The best time to plant a tree was 20 years ago. The second best
            time is now." 🌳
          </div>
        </motion.div>
      </div>
    </div>
  );
}
