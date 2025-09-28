import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Calendar,
  DollarSign,
  Target,
  Zap,
  Star,
  Trophy,
  Edit3,
} from "lucide-react";
import type { Mission, Transaction } from "../../../mockData/features/future";

interface MissionDetailViewProps {
  mission: Mission;
  onBack: () => void;
  onUpdate: (mission: Mission) => void;
  className?: string;
}

export function MissionDetailView({
  mission,
  onBack,
  onUpdate,
  className = "",
}: MissionDetailViewProps) {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [fundDescription, setFundDescription] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [newNote, setNewNote] = useState("");

  const progress = Math.min(
    (mission.currentAmount / mission.targetAmount) * 100,
    100,
  );
  const remaining = mission.targetAmount - mission.currentAmount;
  const daysRemaining = Math.max(
    0,
    Math.ceil(
      (mission.deadline.getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  const dailyTarget =
    remaining > 0 && daysRemaining > 0 ? remaining / daysRemaining : 0;
  const monthlyTarget = dailyTarget * 30;

  const formatCurrency = (amount: number) => {
    return `฿${amount.toLocaleString()}`;
  };

  const getCurrentMilestone = () => {
    return (
      mission.milestones.find((m) => progress >= m.percentage && !m.achieved) ||
      mission.milestones.find((m) => !m.achieved)
    );
  };

  const handleAddFunds = () => {
    if (!fundAmount || parseFloat(fundAmount) <= 0) return;

    const amount = parseFloat(fundAmount);
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount,
      date: new Date(),
      type: "deposit",
      description: fundDescription || "Manual deposit",
    };

    const updatedMission = {
      ...mission,
      currentAmount: mission.currentAmount + amount,
      transactions: [...mission.transactions, newTransaction],
    };

    onUpdate(updatedMission);
    setFundAmount("");
    setFundDescription("");
    setShowAddFunds(false);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const updatedMission = {
      ...mission,
      notes: [...mission.notes, newNote.trim()],
    };

    onUpdate(updatedMission);
    setNewNote("");
    setShowNoteInput(false);
  };

  const getRocketPosition = () => {
    return Math.min(progress, 95); // Keep rocket visible even at 100%
  };

  const getSpeedIndicator = () => {
    const recentTransactions = mission.transactions
      .filter((t) => t.type === "deposit")
      .slice(-5);

    if (recentTransactions.length === 0) return "🐌";

    const avgAmount =
      recentTransactions.reduce((sum, t) => sum + t.amount, 0) /
      recentTransactions.length;

    if (avgAmount >= monthlyTarget) return "🚀";
    if (avgAmount >= monthlyTarget * 0.7) return "✈️";
    if (avgAmount >= monthlyTarget * 0.4) return "🚗";
    return "🐌";
  };

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <motion.button
          onClick={onBack}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{
              backgroundColor: mission.color + "20",
              border: `2px solid ${mission.color}40`,
            }}
          >
            {mission.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{mission.name}</h1>
            <p className="text-white/70">{mission.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Mission Journey Visualization */}
      <motion.div
        className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 backdrop-blur-md rounded-2xl p-8 mb-6 border border-white/10 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Journey Path */}
        <div className="relative h-32 mb-6">
          {/* Background Path */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-white/10 rounded-full transform -translate-y-1/2" />

          {/* Progress Path */}
          <motion.div
            className="absolute top-1/2 left-0 h-2 rounded-full transform -translate-y-1/2"
            style={{ backgroundColor: mission.color }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Milestone Markers */}
          {mission.milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${milestone.percentage}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  milestone.achieved
                    ? `bg-${mission.color} border-${mission.color}`
                    : progress >= milestone.percentage
                      ? `bg-yellow-400 border-yellow-400`
                      : "bg-white/20 border-white/40"
                }`}
                style={{
                  backgroundColor: milestone.achieved
                    ? mission.color
                    : progress >= milestone.percentage
                      ? "#F59E0B"
                      : "rgba(255,255,255,0.2)",
                  borderColor: milestone.achieved
                    ? mission.color
                    : progress >= milestone.percentage
                      ? "#F59E0B"
                      : "rgba(255,255,255,0.4)",
                }}
              />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-white text-xs font-medium whitespace-nowrap">
                  {milestone.label}
                </div>
                <div className="text-white/60 text-xs">
                  {milestone.percentage}%
                </div>
              </div>
            </motion.div>
          ))}

          {/* Animated Rocket */}
          <motion.div
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${getRocketPosition()}%` }}
            animate={{
              y: [0, -5, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              <div className="text-2xl">🚀</div>
              {/* Rocket Trail */}
              <motion.div
                className="absolute top-1/2 right-full w-8 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full transform -translate-y-1/2"
                animate={{
                  scaleX: [0.5, 1, 0.5],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Destination Star */}
          <motion.div
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            }}
          >
            <div className="text-3xl">⭐</div>
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{ backgroundColor: mission.color + "40" }}
            />
          </motion.div>
        </div>

        {/* Mission HUD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-white text-lg font-bold">
              {progress.toFixed(1)}%
            </div>
            <div className="text-white/60 text-sm">Progress</div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">⛽</div>
            <div className="text-white text-lg font-bold">
              {formatCurrency(mission.currentAmount)}
            </div>
            <div className="text-white/60 text-sm">Fuel Level</div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">⏰</div>
            <div className="text-white text-lg font-bold">{daysRemaining}</div>
            <div className="text-white/60 text-sm">Days Left</div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">{getSpeedIndicator()}</div>
            <div className="text-white text-lg font-bold">
              {formatCurrency(remaining)}
            </div>
            <div className="text-white/60 text-sm">Remaining</div>
          </div>
        </div>
      </motion.div>

      {/* Action Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Fuel Management */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">Fuel Management</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Daily Target</span>
              <span className="text-white font-bold">
                {formatCurrency(dailyTarget)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Monthly Target</span>
              <span className="text-white font-bold">
                {formatCurrency(monthlyTarget)}
              </span>
            </div>
          </div>

          <motion.button
            onClick={() => setShowAddFunds(true)}
            className="w-full mt-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            Add Fuel
          </motion.button>
        </motion.div>

        {/* Mission Intel */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Mission Intel</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white/60" />
              <span className="text-white/70 text-sm">
                Target Date: {mission.deadline.toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-white/60" />
              <span className="text-white/70 text-sm">
                Created: {mission.createdAt.toLocaleDateString()}
              </span>
            </div>

            {getCurrentMilestone() && (
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white/70 text-sm">
                  Next: {getCurrentMilestone()?.label} at{" "}
                  {getCurrentMilestone()?.percentage}%
                </span>
              </div>
            )}
          </div>

          <motion.button
            onClick={() => setShowNoteInput(true)}
            className="w-full mt-4 py-3 bg-white/10 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Edit3 className="w-5 h-5" />
            Add Note
          </motion.button>
        </motion.div>
      </div>

      {/* Captain's Log */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Captain's Log</h3>
        </div>

        {/* Notes */}
        {mission.notes.length > 0 && (
          <div className="mb-6">
            <h4 className="text-white font-medium mb-3">Mission Notes</h4>
            <div className="space-y-2">
              {mission.notes.map((note, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 rounded-lg p-3 text-white/80 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  📝 {note}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        {mission.transactions.length > 0 && (
          <div>
            <h4 className="text-white font-medium mb-3">
              Recent Fuel Deposits
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {mission.transactions
                .slice(-5)
                .reverse()
                .map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    className="flex justify-between items-center bg-white/5 rounded-lg p-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div>
                      <div className="text-white text-sm font-medium">
                        {transaction.description}
                      </div>
                      <div className="text-white/60 text-xs">
                        {transaction.date.toLocaleDateString()}
                      </div>
                    </div>
                    <div
                      className={`font-bold ${
                        transaction.type === "deposit"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.type === "deposit" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Add Funds Modal */}
      <AnimatePresence>
        {showAddFunds && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4 border border-white/20"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Add Fuel to Mission
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="Enter amount..."
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Description (optional)
                  </label>
                  <input
                    type="text"
                    value={fundDescription}
                    onChange={(e) => setFundDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="e.g., Monthly savings, Bonus..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddFunds(false)}
                  className="flex-1 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFunds}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-colors"
                >
                  Add Fuel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Note Modal */}
      <AnimatePresence>
        {showNoteInput && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4 border border-white/20"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Add Mission Note
              </h3>

              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 h-24 resize-none"
                placeholder="Add a note about your mission progress..."
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowNoteInput(false)}
                  className="flex-1 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-colors"
                >
                  Add Note
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
