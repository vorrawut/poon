import { motion } from "framer-motion";

interface DualLensToggleProps {
  viewMode: "play" | "clarity";
  onToggle: (mode: "play" | "clarity") => void;
  className?: string;
  sidebar?: boolean;
}

export function DualLensToggle({
  viewMode,
  onToggle,
  className = "",
  sidebar = false,
}: DualLensToggleProps) {
  if (sidebar) {
    return (
      <div className={`flex rounded-lg bg-gray-100 p-1 ${className}`}>
        <button
          onClick={() => onToggle("play")}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            viewMode === "play"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          🎮 Play
        </button>
        <button
          onClick={() => onToggle("clarity")}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            viewMode === "clarity"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          📊 Clarity
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className={`fixed top-25 ${typeof onToggle === "boolean" && onToggle ? "left-65" : "left-22"} sm:top-25 sm:${typeof onToggle === "boolean" && onToggle ? "left-65" : "left-2"} lg:top-25 lg:left-65 z-40 ${className}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-black/30 backdrop-blur-sm rounded-full p-0.5 sm:p-1 border border-white/20">
        <button
          onClick={() => onToggle("play")}
          className={`px-1.5 sm:px-4 py-0.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
            viewMode === "play"
              ? "bg-white text-black"
              : "text-white/70 hover:text-white"
          }`}
        >
          <span className="hidden sm:inline">🎮 Play Mode</span>
          <span className="sm:hidden">🎮 Play</span>
        </button>
        <button
          onClick={() => onToggle("clarity")}
          className={`px-1.5 sm:px-4 py-0.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
            viewMode === "clarity"
              ? "bg-white text-black"
              : "text-white/70 hover:text-white"
          }`}
        >
          <span className="hidden sm:inline">📊 Clarity Mode</span>
          <span className="sm:hidden">📊 Clarity</span>
        </button>
      </div>
    </motion.div>
  );
}
