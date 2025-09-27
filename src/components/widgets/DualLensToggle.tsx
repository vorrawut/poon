import { motion } from "framer-motion";

interface DualLensToggleProps {
  viewMode: "play" | "clarity";
  onToggle: (mode: "play" | "clarity") => void;
  className?: string;
}

export function DualLensToggle({
  viewMode,
  onToggle,
  className = "",
}: DualLensToggleProps) {
  return (
    <motion.div
      className={`fixed top-24 left-72 z-50 ${className}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-black/30 backdrop-blur-sm rounded-full p-1 border border-white/20">
        <button
          onClick={() => onToggle("play")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewMode === "play"
              ? "bg-white text-black"
              : "text-white/70 hover:text-white"
          }`}
        >
          🎮 Play Mode
        </button>
        <button
          onClick={() => onToggle("clarity")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewMode === "clarity"
              ? "bg-white text-black"
              : "text-white/70 hover:text-white"
          }`}
        >
          📊 Clarity Mode
        </button>
      </div>
    </motion.div>
  );
}
