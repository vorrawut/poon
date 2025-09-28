import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Zap, AlertTriangle, Target, Star, Rocket, X } from "lucide-react";

interface Mission {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  priority: "low" | "medium" | "high" | "critical";
}

interface CoPilotMessage {
  id: string;
  type: "motivation" | "warning" | "achievement" | "tip" | "milestone";
  title: string;
  message: string;
  action?: string;
  icon: string;
  color: string;
  priority: number;
  timestamp: Date;
}

interface AICoPilotProps {
  missions: Mission[];
  className?: string;
}

export function AICoPilot({ missions, className = "" }: AICoPilotProps) {
  const [messages, setMessages] = useState<CoPilotMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Generate AI messages based on mission data
  useEffect(() => {
    const generateMessages = () => {
      const newMessages: CoPilotMessage[] = [];

      missions.forEach((mission) => {
        const progress = (mission.currentAmount / mission.targetAmount) * 100;
        const daysRemaining = Math.max(
          0,
          Math.ceil(
            (mission.deadline.getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        );
        const dailyTarget =
          daysRemaining > 0
            ? (mission.targetAmount - mission.currentAmount) / daysRemaining
            : 0;

        // Progress-based messages
        if (progress >= 90) {
          newMessages.push({
            id: `${mission.id}-almost-there`,
            type: "achievement",
            title: "🎯 Almost There!",
            message: `You're ${progress.toFixed(1)}% complete with ${mission.name}! Just ฿${(mission.targetAmount - mission.currentAmount).toLocaleString()} to go!`,
            action: "Add final push",
            icon: "🎯",
            color: "#10B981",
            priority: 10,
            timestamp: new Date(),
          });
        } else if (progress >= 75) {
          newMessages.push({
            id: `${mission.id}-deep-space`,
            type: "motivation",
            title: "🚀 Deep Space Navigation",
            message: `Excellent progress on ${mission.name}! You're in deep space at ${progress.toFixed(1)}%. The destination star is getting brighter!`,
            action: "Keep the momentum",
            icon: "🚀",
            color: "#3B82F6",
            priority: 8,
            timestamp: new Date(),
          });
        } else if (progress >= 50) {
          newMessages.push({
            id: `${mission.id}-orbit`,
            type: "motivation",
            title: "🛰️ In Stable Orbit",
            message: `Great job! ${mission.name} is ${progress.toFixed(1)}% funded. You've achieved stable orbit and are cruising toward your goal!`,
            action: "Maintain course",
            icon: "🛰️",
            color: "#8B5CF6",
            priority: 6,
            timestamp: new Date(),
          });
        } else if (progress >= 25) {
          newMessages.push({
            id: `${mission.id}-launch`,
            type: "motivation",
            title: "🚀 Successful Launch",
            message: `${mission.name} has launched! You're ${progress.toFixed(1)}% of the way there. The hardest part is behind you!`,
            action: "Build momentum",
            icon: "🚀",
            color: "#F59E0B",
            priority: 4,
            timestamp: new Date(),
          });
        }

        // Urgency-based messages
        if (daysRemaining <= 30 && progress < 80) {
          newMessages.push({
            id: `${mission.id}-urgent`,
            type: "warning",
            title: "⚠️ Mission Critical",
            message: `${mission.name} needs attention! Only ${daysRemaining} days left. Consider increasing daily savings to ฿${dailyTarget.toLocaleString()}.`,
            action: "Boost savings",
            icon: "⚠️",
            color: "#EF4444",
            priority: 15,
            timestamp: new Date(),
          });
        } else if (daysRemaining <= 60 && progress < 60) {
          newMessages.push({
            id: `${mission.id}-warning`,
            type: "warning",
            title: "🔔 Course Correction Needed",
            message: `${mission.name} might need a course correction. You have ${daysRemaining} days to save ฿${(mission.targetAmount - mission.currentAmount).toLocaleString()}.`,
            action: "Adjust trajectory",
            icon: "🔔",
            color: "#F59E0B",
            priority: 12,
            timestamp: new Date(),
          });
        }

        // Achievement messages
        if (progress === 100) {
          newMessages.push({
            id: `${mission.id}-complete`,
            type: "achievement",
            title: "🏆 Mission Accomplished!",
            message: `Congratulations! You've successfully completed ${mission.name}! Your rocket has reached its destination star!`,
            action: "Celebrate",
            icon: "🏆",
            color: "#10B981",
            priority: 20,
            timestamp: new Date(),
          });
        }

        // Optimization tips
        if (progress > 0 && progress < 100) {
          const monthsRemaining = Math.ceil(daysRemaining / 30);
          const monthlyNeeded =
            monthsRemaining > 0
              ? (mission.targetAmount - mission.currentAmount) / monthsRemaining
              : 0;

          if (monthlyNeeded > 0) {
            newMessages.push({
              id: `${mission.id}-tip`,
              type: "tip",
              title: "💡 Navigation Tip",
              message: `To reach ${mission.name} on time, save ฿${monthlyNeeded.toLocaleString()} per month. Small daily deposits of ฿${(monthlyNeeded / 30).toLocaleString()} add up fast!`,
              action: "Set auto-save",
              icon: "💡",
              color: "#06B6D4",
              priority: 5,
              timestamp: new Date(),
            });
          }
        }
      });

      // General motivational messages
      const totalProgress =
        missions.reduce(
          (sum, m) => sum + (m.currentAmount / m.targetAmount) * 100,
          0,
        ) / missions.length;

      if (totalProgress > 50) {
        newMessages.push({
          id: "general-progress",
          type: "motivation",
          title: "🌟 Fleet Commander",
          message: `Outstanding work! Your mission fleet is ${totalProgress.toFixed(1)}% complete on average. You're becoming a master navigator of your financial galaxy!`,
          action: "View fleet status",
          icon: "🌟",
          color: "#8B5CF6",
          priority: 7,
          timestamp: new Date(),
        });
      }

      // Sort by priority (highest first)
      newMessages.sort((a, b) => b.priority - a.priority);

      setMessages(newMessages.slice(0, 10)); // Keep top 10 messages
    };

    generateMessages();

    // Regenerate messages every 5 minutes
    const interval = setInterval(generateMessages, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [missions]);

  // Auto-cycle through messages
  useEffect(() => {
    if (messages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 8000); // Change message every 8 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isExpanded]);

  const currentMessage = messages[currentMessageIndex];

  // Filter messages based on active filter
  const filteredMessages =
    activeFilter === "all"
      ? messages
      : messages.filter((message) => message.type === activeFilter);

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "motivation":
        return <Rocket className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "achievement":
        return <Star className="w-5 h-5" />;
      case "tip":
        return <Zap className="w-5 h-5" />;
      case "milestone":
        return <Target className="w-5 h-5" />;
      default:
        return <Bot className="w-5 h-5" />;
    }
  };

  if (!currentMessage) {
    return (
      <motion.div
        className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="p-2 rounded-full bg-blue-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Bot className="w-5 h-5 text-blue-400" />
          </motion.div>
          <div>
            <div className="text-white font-medium">AI Co-Pilot Ready</div>
            <div className="text-white/60 text-sm">
              Monitoring your missions...
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Co-Pilot Display */}
      <motion.div
        className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* AI Avatar */}
            <motion.div
              className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 30px rgba(139, 92, 246, 0.7)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bot className="w-6 h-6 text-white" />
            </motion.div>

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <motion.div
                  style={{ color: currentMessage.color }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={currentMessage.id}
                >
                  {getMessageIcon(currentMessage.type)}
                </motion.div>
                <div className="text-white font-medium text-sm">
                  AI Co-Pilot
                </div>
                <div
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: currentMessage.color + "20",
                    color: currentMessage.color,
                  }}
                >
                  {currentMessage.type.toUpperCase()}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-white font-bold mb-1">
                    {currentMessage.title}
                  </div>
                  <div className="text-white/80 text-sm leading-relaxed">
                    {currentMessage.message}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Button */}
              {currentMessage.action && (
                <motion.button
                  className="mt-3 px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: currentMessage.color + "20",
                    color: currentMessage.color,
                    border: `1px solid ${currentMessage.color}40`,
                  }}
                  whileHover={{
                    backgroundColor: currentMessage.color + "30",
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentMessage.action}
                </motion.button>
              )}
            </div>

            {/* Message Indicator */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="text-white/40 text-xs">
                {currentMessageIndex + 1}/{messages.length}
              </div>
              <div className="flex gap-1">
                {messages.slice(0, 3).map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      index === currentMessageIndex % 3
                        ? "bg-white"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 8, repeat: Infinity }}
          key={currentMessage.id}
        />
      </motion.div>

      {/* Expanded Message History */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />

            {/* Enhanced Modal */}
            <motion.div
              className="fixed inset-x-2 sm:inset-x-4 lg:inset-x-8 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-gray-900/98 via-blue-900/95 to-purple-900/98 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl z-[60] max-h-[85vh] overflow-hidden max-w-4xl mx-auto"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="relative p-6 border-b border-white/20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(59, 130, 246, 0.5)",
                          "0 0 30px rgba(139, 92, 246, 0.7)",
                          "0 0 20px rgba(59, 130, 246, 0.5)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Bot className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        AI Co-Pilot Command Center
                      </h2>
                      <p className="text-white/70 text-sm">
                        Mission intelligence and guidance system
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsExpanded(false)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Stats Bar */}
                <div className="relative mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      label: "Active Alerts",
                      value: messages.filter((m) => m.type === "warning")
                        .length,
                      icon: "⚠️",
                      color: "#F59E0B",
                    },
                    {
                      label: "Achievements",
                      value: messages.filter((m) => m.type === "achievement")
                        .length,
                      icon: "🏆",
                      color: "#10B981",
                    },
                    {
                      label: "Tips Shared",
                      value: messages.filter((m) => m.type === "tip").length,
                      icon: "💡",
                      color: "#06B6D4",
                    },
                    {
                      label: "Total Messages",
                      value: messages.length,
                      icon: "📊",
                      color: "#8B5CF6",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="text-lg mb-1">{stat.icon}</div>
                      <div className="text-white font-bold text-lg">
                        {stat.value}
                      </div>
                      <div className="text-white/60 text-xs">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "all",
                    "motivation",
                    "warning",
                    "achievement",
                    "tip",
                    "milestone",
                  ].map((filter) => (
                    <motion.button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        filter === activeFilter
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {filter === "all"
                        ? "All Messages"
                        : filter.charAt(0).toUpperCase() + filter.slice(1)}
                      <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                        {filter === "all"
                          ? messages.length
                          : messages.filter((m) => m.type === filter).length}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Messages Grid */}
                <div className="max-h-96 overflow-y-auto space-y-4 scrollbar-hide">
                  {filteredMessages.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">🤖</div>
                      <div className="text-white/60 text-lg mb-2">
                        No messages in this category
                      </div>
                      <div className="text-white/40 text-sm">
                        Try a different filter or check back later
                      </div>
                    </div>
                  ) : (
                    filteredMessages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        className={`group relative p-4 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                          index === currentMessageIndex
                            ? "bg-white/15 border-white/40 shadow-lg"
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setCurrentMessageIndex(index)}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        {/* Background Glow */}
                        <div
                          className="absolute inset-0 opacity-10 rounded-xl"
                          style={{ backgroundColor: message.color }}
                        />

                        <div className="relative flex items-start gap-4">
                          {/* Message Icon */}
                          <motion.div
                            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg"
                            style={{
                              backgroundColor: message.color + "20",
                              border: `2px solid ${message.color}40`,
                            }}
                            animate={{
                              boxShadow:
                                index === currentMessageIndex
                                  ? [
                                      `0 0 0 ${message.color}00`,
                                      `0 0 20px ${message.color}60`,
                                      `0 0 0 ${message.color}00`,
                                    ]
                                  : "0 0 0 transparent",
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {message.icon}
                          </motion.div>

                          {/* Message Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="text-white font-bold text-base">
                                {message.title}
                              </div>
                              <div
                                className="px-2 py-1 rounded-full text-xs font-medium"
                                style={{
                                  backgroundColor: message.color + "20",
                                  color: message.color,
                                }}
                              >
                                {message.type.toUpperCase()}
                              </div>
                              {index === currentMessageIndex && (
                                <motion.div
                                  className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                >
                                  ACTIVE
                                </motion.div>
                              )}
                            </div>

                            <div className="text-white/80 text-sm leading-relaxed mb-3">
                              {message.message}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-white/50 text-xs">
                                {message.timestamp.toLocaleString()}
                              </div>

                              {message.action && (
                                <motion.button
                                  className="px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                                  style={{
                                    backgroundColor: message.color + "20",
                                    color: message.color,
                                    border: `1px solid ${message.color}40`,
                                  }}
                                  whileHover={{
                                    backgroundColor: message.color + "30",
                                    scale: 1.05,
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {message.action}
                                </motion.button>
                              )}
                            </div>
                          </div>

                          {/* Priority Indicator */}
                          <div className="flex-shrink-0">
                            <div
                              className="w-2 h-16 rounded-full"
                              style={{
                                backgroundColor: message.color,
                                opacity: message.priority / 20,
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Footer Actions */}
                <div className="mt-6 pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-white/60 text-sm text-center sm:text-left">
                    {filteredMessages.length} of {messages.length} messages •
                    Last update: {new Date().toLocaleTimeString()}
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveFilter("all")}
                    >
                      Clear Filter
                    </motion.button>
                    <motion.button
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg text-sm font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Generate New Insights
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
