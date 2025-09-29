import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  StarIcon,
  ClockIcon,
  TrophyIcon,
  DocumentTextIcon,
  ShareIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
  useTheme,
} from "../../../core";
import type { EnhancedGoal } from "../../goals";
import { cn } from "../../../libs/utils";

interface FutureGoalDetailProps {
  goal: EnhancedGoal;
  onClose: () => void;
  onUpdate?: (goalId: string, updates: Partial<EnhancedGoal>) => void;
  onDelete?: (goalId: string) => void;
  onContribute?: (goalId: string, amount: number) => void;
  className?: string;
}

interface Transaction {
  id: string;
  amount: number;
  date: Date;
  type: "deposit" | "withdrawal";
  description: string;
  method?: string;
}

interface Note {
  id: string;
  content: string;
  date: Date;
  type: "text" | "image" | "link";
  attachments?: string[];
}

export function FutureGoalDetail({
  goal,
  onClose,
  onUpdate,
  onDelete,
  onContribute,
  className,
}: FutureGoalDetailProps) {
  const { isPlayMode } = useTheme();
  const [activeTab, setActiveTab] = useState<
    "overview" | "progress" | "transactions" | "notes" | "settings"
  >("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState(goal);
  const [contributeAmount, setContributeAmount] = useState("");
  const [newNote, setNewNote] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  // Initialize mock data
  useEffect(() => {
    // Mock transactions for demonstration
    const mockTransactions: Transaction[] = [
      {
        id: "1",
        amount: 5000,
        date: new Date("2024-12-01"),
        type: "deposit",
        description: "Monthly savings contribution",
        method: "Bank Transfer",
      },
      {
        id: "2",
        amount: 3000,
        date: new Date("2024-11-15"),
        type: "deposit",
        description: "Bonus allocation",
        method: "Direct Deposit",
      },
      {
        id: "3",
        amount: 1000,
        date: new Date("2024-11-01"),
        type: "withdrawal",
        description: "Emergency expense",
        method: "ATM",
      },
    ];

    const mockNotes: Note[] = [
      {
        id: "1",
        content: "Found great flight deals for March 2025! Need to book soon.",
        date: new Date("2024-12-10"),
        type: "text",
      },
      {
        id: "2",
        content:
          "Researched hotels in Tokyo - Shibuya area looks perfect for our budget.",
        date: new Date("2024-12-05"),
        type: "text",
      },
      {
        id: "3",
        content:
          "Created itinerary: Tokyo (5 days) → Kyoto (3 days) → Osaka (2 days)",
        date: new Date("2024-11-28"),
        type: "text",
      },
    ];

    setTransactions(mockTransactions);
    setNotes(mockNotes);
  }, []);

  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;
  const daysRemaining = Math.ceil(
    (new Date(goal.deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const dailyTarget = daysRemaining > 0 ? remaining / daysRemaining : 0;
  const monthlyTarget = dailyTarget * 30;

  const categoryConfig = {
    emergency: { icon: "🛡️", color: "#EF4444", name: "Emergency Fund" },
    travel: { icon: "✈️", color: "#3B82F6", name: "Travel" },
    house: { icon: "🏠", color: "#10B981", name: "House" },
    car: { icon: "🚗", color: "#F59E0B", name: "Car" },
    investment: { icon: "📈", color: "#8B5CF6", name: "Investment" },
    education: { icon: "🎓", color: "#EC4899", name: "Education" },
    other: { icon: "🎯", color: "#6B7280", name: "Other" },
  };

  const config = categoryConfig[goal.category];

  const handleSave = () => {
    onUpdate?.(goal.id, editedGoal);
    setIsEditing(false);
  };

  const handleContribute = () => {
    const amount = parseFloat(contributeAmount);
    if (amount > 0) {
      onContribute?.(goal.id, amount);
      // Add transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        amount,
        date: new Date(),
        type: "deposit",
        description: "Manual contribution",
        method: "App",
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      setContributeAmount("");
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote,
        date: new Date(),
        type: "text",
      };
      setNotes((prev) => [note, ...prev]);
      setNewNote("");
    }
  };

  const getRocketStage = (progress: number) => {
    if (progress >= 100) return "🚀 Launched!";
    if (progress >= 75) return "🔥 Ignition";
    if (progress >= 50) return "⛽ Fueling";
    if (progress >= 25) return "🔧 Assembly";
    return "📋 Planning";
  };

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        isPlayMode ? "bg-black/70" : "bg-black/50",
        "backdrop-blur-sm",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={cn(
          "relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-2xl",
          "bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)]",
          "shadow-2xl",
          className,
        )}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cosmic Background Effect */}
        {isPlayMode && (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle at 80% 20%, ${config.color}40 0%, transparent 50%)`,
            }}
          />
        )}

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-[var(--color-border-secondary)]">
          <div className="flex items-center gap-4">
            <motion.div
              className="text-4xl"
              animate={isPlayMode ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {config.icon}
            </motion.div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedGoal.name}
                  onChange={(e) =>
                    setEditedGoal((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none"
                />
              ) : (
                <ThemeAwareHeading level="h1" className="text-2xl font-bold">
                  {goal.name}
                </ThemeAwareHeading>
              )}
              <div className="flex items-center gap-4 mt-2">
                <span
                  className="px-3 py-1 text-sm font-medium rounded-full"
                  style={{
                    backgroundColor: `${config.color}20`,
                    color: config.color,
                  }}
                >
                  {config.name}
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ color: config.color }}
                >
                  {progress.toFixed(1)}%
                </span>
                <span className="text-sm text-gray-500">
                  {getRocketStage(progress)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <ThemeAwareButton
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <PencilIcon className="w-4 h-4 mr-1" />
                  Edit
                </ThemeAwareButton>
                <ThemeAwareButton
                  variant="outline"
                  size="sm"
                  onClick={() => console.log("Share goal")}
                >
                  <ShareIcon className="w-4 h-4 mr-1" />
                  Share
                </ThemeAwareButton>
              </>
            ) : (
              <>
                <ThemeAwareButton
                  variant={isPlayMode ? "cosmic" : "primary"}
                  size="sm"
                  onClick={handleSave}
                  glow={isPlayMode}
                >
                  Save
                </ThemeAwareButton>
                <ThemeAwareButton
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditedGoal(goal);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </ThemeAwareButton>
              </>
            )}
            <ThemeAwareButton
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <XMarkIcon className="w-6 h-6" />
            </ThemeAwareButton>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative z-10 px-6 py-4 border-b border-[var(--color-border-secondary)]">
          <div className="flex items-center justify-between mb-2">
            <ThemeAwareText weight="bold">
              ฿{goal.currentAmount.toLocaleString()} / ฿
              {goal.targetAmount.toLocaleString()}
            </ThemeAwareText>
            <ThemeAwareText color="secondary">
              ฿{remaining.toLocaleString()} remaining
            </ThemeAwareText>
          </div>
          <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: config.color }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            {/* Rocket on track */}
            <motion.div
              className="absolute top-1/2 transform -translate-y-1/2 text-lg"
              style={{ left: `${Math.min(progress, 95)}%` }}
              animate={isPlayMode ? { x: [0, 2, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🚀
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="relative z-10 px-6 py-4 border-b border-[var(--color-border-secondary)]">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-48">
              <input
                type="number"
                placeholder="Amount to add"
                value={contributeAmount}
                onChange={(e) => setContributeAmount(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]"
              />
              <ThemeAwareButton
                variant={isPlayMode ? "cosmic" : "primary"}
                onClick={handleContribute}
                disabled={
                  !contributeAmount || parseFloat(contributeAmount) <= 0
                }
                glow={isPlayMode}
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Fuel
              </ThemeAwareButton>
            </div>
            <div className="flex gap-2">
              {[1000, 5000, 10000].map((amount) => (
                <ThemeAwareButton
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setContributeAmount(amount.toString())}
                >
                  ฿{amount.toLocaleString()}
                </ThemeAwareButton>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative z-10 flex border-b border-[var(--color-border-secondary)] overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: ChartBarIcon },
            { id: "progress", label: "Progress", icon: RocketLaunchIcon },
            {
              id: "transactions",
              label: "Transactions",
              icon: CurrencyDollarIcon,
            },
            { id: "notes", label: "Notes", icon: DocumentTextIcon },
            { id: "settings", label: "Settings", icon: ClockIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "text-[var(--color-text-primary)] border-b-2"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
              )}
              style={{
                borderBottomColor:
                  activeTab === tab.id ? config.color : "transparent",
              }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="relative z-10 p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Goal Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ThemeAwareCard className="p-4 text-center">
                    <div className="text-3xl mb-2">📅</div>
                    <div className="text-2xl font-bold text-blue-500">
                      {daysRemaining > 0 ? daysRemaining : 0}
                    </div>
                    <ThemeAwareText color="secondary" className="text-sm">
                      Days Remaining
                    </ThemeAwareText>
                  </ThemeAwareCard>

                  <ThemeAwareCard className="p-4 text-center">
                    <div className="text-3xl mb-2">💰</div>
                    <div className="text-2xl font-bold text-green-500">
                      ฿{dailyTarget.toLocaleString()}
                    </div>
                    <ThemeAwareText color="secondary" className="text-sm">
                      Daily Target
                    </ThemeAwareText>
                  </ThemeAwareCard>

                  <ThemeAwareCard className="p-4 text-center">
                    <div className="text-3xl mb-2">🚀</div>
                    <div className="text-2xl font-bold text-purple-500">
                      ฿{monthlyTarget.toLocaleString()}
                    </div>
                    <ThemeAwareText color="secondary" className="text-sm">
                      Monthly Target
                    </ThemeAwareText>
                  </ThemeAwareCard>
                </div>

                {/* Description */}
                {goal.description && (
                  <div>
                    <ThemeAwareHeading
                      level="h3"
                      className="text-lg font-semibold mb-3"
                    >
                      Description
                    </ThemeAwareHeading>
                    <ThemeAwareText className="text-base">
                      {goal.description}
                    </ThemeAwareText>
                  </div>
                )}

                {/* Milestones */}
                {goal.milestones.length > 0 && (
                  <div>
                    <ThemeAwareHeading
                      level="h3"
                      className="text-lg font-semibold mb-4"
                    >
                      Milestones
                    </ThemeAwareHeading>
                    <div className="space-y-3">
                      {goal.milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          className={cn(
                            "flex items-center justify-between p-4 rounded-lg",
                            milestone.isCompleted
                              ? "bg-green-500/10 border border-green-500/20"
                              : "bg-[var(--color-surface-secondary)]",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            {milestone.isCompleted ? (
                              <TrophyIcon className="w-6 h-6 text-green-500" />
                            ) : (
                              <StarIcon className="w-6 h-6 text-gray-400" />
                            )}
                            <div>
                              <div className="font-medium">
                                {milestone.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ฿{milestone.targetAmount.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          {milestone.isCompleted && milestone.completedAt && (
                            <div className="text-sm text-green-600 dark:text-green-400">
                              Completed{" "}
                              {milestone.completedAt.toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "progress" && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <ThemeAwareHeading level="h3" className="text-lg font-semibold">
                  Progress Tracking
                </ThemeAwareHeading>

                {/* Progress Chart Placeholder */}
                <ThemeAwareCard className="p-6">
                  <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-center">
                      <ChartBarIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <ThemeAwareText color="secondary">
                        Progress chart will be implemented here
                      </ThemeAwareText>
                    </div>
                  </div>
                </ThemeAwareCard>

                {/* Recent Activity */}
                <div>
                  <ThemeAwareHeading
                    level="h4"
                    className="text-md font-semibold mb-4"
                  >
                    Recent Activity
                  </ThemeAwareHeading>
                  <div className="space-y-2">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-surface-secondary)]"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full",
                              transaction.type === "deposit"
                                ? "bg-green-500"
                                : "bg-red-500",
                            )}
                          />
                          <div>
                            <div className="font-medium">
                              {transaction.description}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.date.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div
                          className={cn(
                            "font-bold",
                            transaction.type === "deposit"
                              ? "text-green-500"
                              : "text-red-500",
                          )}
                        >
                          {transaction.type === "deposit" ? "+" : "-"}฿
                          {transaction.amount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "transactions" && (
              <motion.div
                key="transactions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <ThemeAwareHeading
                    level="h3"
                    className="text-lg font-semibold"
                  >
                    Transaction History
                  </ThemeAwareHeading>
                  <ThemeAwareButton variant="outline" size="sm">
                    <PlusIcon className="w-4 h-4 mr-1" />
                    Add Transaction
                  </ThemeAwareButton>
                </div>

                <div className="space-y-2">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-surface-secondary)]"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            transaction.type === "deposit"
                              ? "bg-green-500/20"
                              : "bg-red-500/20",
                          )}
                        >
                          {transaction.type === "deposit" ? "↗️" : "↙️"}
                        </div>
                        <div>
                          <div className="font-medium">
                            {transaction.description}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <span>{transaction.date.toLocaleDateString()}</span>
                            {transaction.method && (
                              <>
                                <span>•</span>
                                <span>{transaction.method}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "text-lg font-bold",
                          transaction.type === "deposit"
                            ? "text-green-500"
                            : "text-red-500",
                        )}
                      >
                        {transaction.type === "deposit" ? "+" : "-"}฿
                        {transaction.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "notes" && (
              <motion.div
                key="notes"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <ThemeAwareHeading
                    level="h3"
                    className="text-lg font-semibold"
                  >
                    Notes & Ideas
                  </ThemeAwareHeading>
                </div>

                {/* Add Note */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a note about your goal..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]"
                    onKeyPress={(e) => e.key === "Enter" && handleAddNote()}
                  />
                  <ThemeAwareButton
                    variant={isPlayMode ? "cosmic" : "primary"}
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    glow={isPlayMode}
                  >
                    <PlusIcon className="w-4 h-4" />
                  </ThemeAwareButton>
                </div>

                {/* Notes List */}
                <div className="space-y-3">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-4 rounded-lg bg-[var(--color-surface-secondary)]"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <ThemeAwareText>{note.content}</ThemeAwareText>
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                            <DocumentTextIcon className="w-4 h-4" />
                            <span>{note.date.toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                            <PencilIcon className="w-4 h-4 text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                            <TrashIcon className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <ThemeAwareHeading level="h3" className="text-lg font-semibold">
                  Goal Settings
                </ThemeAwareHeading>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Notifications */}
                  <ThemeAwareCard className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <BellIcon className="w-5 h-5" />
                      <ThemeAwareHeading
                        level="h4"
                        className="text-md font-semibold"
                      >
                        Notifications
                      </ThemeAwareHeading>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                        <span>Progress reminders</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                        <span>Milestone achievements</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Weekly summary</span>
                      </label>
                    </div>
                  </ThemeAwareCard>

                  {/* Privacy */}
                  <ThemeAwareCard className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <ShareIcon className="w-5 h-5" />
                      <ThemeAwareHeading
                        level="h4"
                        className="text-md font-semibold"
                      >
                        Privacy
                      </ThemeAwareHeading>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Make goal public</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Allow friends to contribute</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                        <span>Show progress to family</span>
                      </label>
                    </div>
                  </ThemeAwareCard>
                </div>

                {/* Danger Zone */}
                <ThemeAwareCard className="p-4 border-red-500/20 bg-red-500/5">
                  <ThemeAwareHeading
                    level="h4"
                    className="text-md font-semibold text-red-500 mb-4"
                  >
                    Danger Zone
                  </ThemeAwareHeading>
                  <div className="flex items-center justify-between">
                    <div>
                      <ThemeAwareText weight="bold">Delete Goal</ThemeAwareText>
                      <ThemeAwareText color="secondary" className="text-sm">
                        This action cannot be undone.
                      </ThemeAwareText>
                    </div>
                    <ThemeAwareButton
                      variant="outline"
                      onClick={() => {
                        if (
                          confirm("Are you sure you want to delete this goal?")
                        ) {
                          onDelete?.(goal.id);
                          onClose();
                        }
                      }}
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <TrashIcon className="w-4 h-4 mr-1" />
                      Delete Goal
                    </ThemeAwareButton>
                  </div>
                </ThemeAwareCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
