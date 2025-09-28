import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Eye, Gamepad2, Users } from "lucide-react";

interface AccessibilityModeToggleProps {
  mode: "elder" | "youth" | "standard";
  onModeChange: (mode: "elder" | "youth" | "standard") => void;
  className?: string;
}

export function AccessibilityModeToggle({
  mode,
  onModeChange,
  className = "",
}: AccessibilityModeToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const modes = [
    {
      id: "standard",
      name: "Standard",
      description: "Balanced experience for everyone",
      icon: <Eye size={20} />,
      color: "bg-blue-500",
      features: ["Balanced visuals", "Standard fonts", "All features"],
    },
    {
      id: "elder",
      name: "Elder Mode",
      description: "Simplified, clear, and accessible",
      icon: <Users size={20} />,
      color: "bg-green-500",
      features: [
        "Large fonts",
        "High contrast",
        "Simplified layout",
        "Essential features only",
      ],
    },
    {
      id: "youth",
      name: "Youth Mode",
      description: "Vibrant, gamified, and engaging",
      icon: <Gamepad2 size={20} />,
      color: "bg-purple-500",
      features: [
        "Vibrant colors",
        "Animations",
        "Gamification",
        "Interactive elements",
      ],
    },
  ];

  const currentMode = modes.find((m) => m.id === mode) || modes[0];

  return (
    <div className={`relative ${className}`}>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-4 py-0.5 sm:py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Settings size={14} className="sm:w-4 sm:h-4" />
        <span className="text-xs sm:text-sm font-medium">
          <span className="hidden sm:inline">{currentMode.name}</span>
          <span className="sm:hidden">
            {currentMode.name === "Standard"
              ? "Std"
              : currentMode.name === "Elder Mode"
                ? "Elder"
                : "Youth"}
          </span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              className="absolute top-full right-0 mt-2 w-64 sm:w-72 lg:w-80 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl z-50 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-3">
                  Accessibility Modes
                </h3>
                <p className="text-sm text-white/70 mb-4">
                  Choose the experience that works best for you
                </p>

                <div className="space-y-3">
                  {modes.map((modeOption) => (
                    <motion.button
                      key={modeOption.id}
                      onClick={() => {
                        onModeChange(modeOption.id as any);
                        setIsOpen(false);
                      }}
                      className={`w-full p-4 rounded-xl border transition-all text-left ${
                        mode === modeOption.id
                          ? "bg-white/20 border-white/40"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${modeOption.color} text-white`}
                        >
                          {modeOption.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-white">
                              {modeOption.name}
                            </h4>
                            {mode === modeOption.id && (
                              <div className="w-2 h-2 bg-green-400 rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-white/70 mb-2">
                            {modeOption.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {modeOption.features.map((feature, index) => (
                              <span
                                key={index}
                                className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-lg">💡</div>
                    <span className="text-sm font-medium text-white">
                      Pro Tip
                    </span>
                  </div>
                  <p className="text-xs text-white/70">
                    You can switch modes anytime. Your preferences are saved
                    automatically.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
