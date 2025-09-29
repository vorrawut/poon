import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  TagIcon,
  RocketLaunchIcon,
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

interface GoalCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGoal: (
    goal: Omit<EnhancedGoal, "id" | "createdAt" | "isCompleted">,
  ) => void;
}

const categoryOptions = [
  {
    id: "emergency",
    name: "Emergency Fund",
    icon: "🛡️",
    color: "#EF4444",
    description: "Build your financial safety net",
  },
  {
    id: "travel",
    name: "Travel",
    icon: "✈️",
    color: "#3B82F6",
    description: "Explore the world",
  },
  {
    id: "house",
    name: "House",
    icon: "🏠",
    color: "#10B981",
    description: "Your dream home",
  },
  {
    id: "car",
    name: "Car",
    icon: "🚗",
    color: "#F59E0B",
    description: "Transportation goals",
  },
  {
    id: "investment",
    name: "Investment",
    icon: "📈",
    color: "#8B5CF6",
    description: "Build your wealth",
  },
  {
    id: "education",
    name: "Education",
    icon: "🎓",
    color: "#EC4899",
    description: "Invest in knowledge",
  },
  {
    id: "other",
    name: "Other",
    icon: "🎯",
    color: "#6B7280",
    description: "Custom goals",
  },
] as const;

const priorityOptions = [
  { id: "low", name: "Low", color: "#6B7280", description: "Nice to have" },
  {
    id: "medium",
    name: "Medium",
    color: "#F59E0B",
    description: "Important goal",
  },
  {
    id: "high",
    name: "High",
    color: "#EF4444",
    description: "Critical priority",
  },
  {
    id: "critical",
    name: "Critical",
    color: "#DC2626",
    description: "Urgent need",
  },
] as const;

const goalTemplates = [
  {
    name: "Emergency Fund",
    category: "emergency" as const,
    targetAmount: 180000,
    description: "3-6 months of living expenses for financial security",
    priority: "high" as const,
    tags: ["security", "emergency"],
  },
  {
    name: "Japan Trip",
    category: "travel" as const,
    targetAmount: 120000,
    description: "Dream vacation to Tokyo, Kyoto, and Mount Fuji",
    priority: "medium" as const,
    tags: ["travel", "vacation", "japan"],
  },
  {
    name: "House Down Payment",
    category: "house" as const,
    targetAmount: 600000,
    description: "20% down payment for first home purchase",
    priority: "high" as const,
    tags: ["property", "investment"],
  },
  {
    name: "New Car",
    category: "car" as const,
    targetAmount: 800000,
    description: "Reliable transportation for daily commute",
    priority: "medium" as const,
    tags: ["transportation", "vehicle"],
  },
];

export function GoalCreationModal({
  isOpen,
  onClose,
  onCreateGoal,
}: GoalCreationModalProps) {
  const { isPlayMode } = useTheme();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    targetAmount: 0,
    category: "other" as
      | "emergency"
      | "travel"
      | "house"
      | "car"
      | "investment"
      | "education"
      | "other",
    priority: "medium" as "low" | "medium" | "high" | "critical",
    deadline: "",
    tags: [] as string[],
    milestones: [] as Array<{
      id: string;
      name: string;
      targetAmount: number;
      isCompleted: boolean;
      completedAt?: Date;
    }>,
  });

  const [newTag, setNewTag] = useState("");

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      targetAmount: 0,
      category: "other",
      priority: "medium",
      deadline: "",
      tags: [],
      milestones: [],
    });
    setStep(1);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleTemplateSelect = (template: (typeof goalTemplates)[0]) => {
    setFormData({
      ...formData,
      name: template.name,
      description: template.description,
      targetAmount: template.targetAmount,
      category: template.category,
      priority: template.priority,
      tags: [...template.tags],
    });
    setStep(2);
  };

  const handleCustomGoal = () => {
    setStep(2);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.targetAmount || !formData.deadline) {
      alert("Please fill in all required fields");
      return;
    }

    const newGoal: Omit<EnhancedGoal, "id" | "createdAt" | "isCompleted"> = {
      name: formData.name,
      description: formData.description,
      targetAmount: formData.targetAmount,
      currentAmount: 0,
      deadline: formData.deadline,
      category: formData.category,
      priority: formData.priority,
      tags: formData.tags,
      milestones: formData.milestones,
      lastContribution: undefined,
      monthlyTarget: undefined,
      icon: categoryOptions.find((cat) => cat.id === formData.category)?.icon,
      color: categoryOptions.find((cat) => cat.id === formData.category)?.color,
    };

    onCreateGoal(newGoal);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-4",
          isPlayMode ? "bg-black/70" : "bg-black/50",
          "backdrop-blur-sm",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className={cn(
            "relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl",
            "bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)]",
            "shadow-2xl",
          )}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--color-border-secondary)]">
            <div className="flex items-center gap-3">
              <motion.div
                className="text-3xl"
                animate={isPlayMode ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀
              </motion.div>
              <div>
                <ThemeAwareHeading level="h2" className="text-2xl font-bold">
                  Create New Mission
                </ThemeAwareHeading>
                <ThemeAwareText color="secondary">
                  Step {step} of 3 -{" "}
                  {step === 1
                    ? "Choose Template"
                    : step === 2
                      ? "Goal Details"
                      : "Review & Launch"}
                </ThemeAwareText>
              </div>
            </div>

            <ThemeAwareButton
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="p-2"
            >
              <XMarkIcon className="w-6 h-6" />
            </ThemeAwareButton>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-2">
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center flex-1">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      step >= stepNum
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500",
                    )}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div
                      className={cn(
                        "flex-1 h-1 mx-2 rounded",
                        step > stepNum
                          ? "bg-blue-500"
                          : "bg-gray-200 dark:bg-gray-700",
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <ThemeAwareHeading
                      level="h3"
                      className="text-xl font-bold mb-2"
                    >
                      Choose Your Mission Type
                    </ThemeAwareHeading>
                    <ThemeAwareText color="secondary">
                      Start with a template or create a custom goal
                    </ThemeAwareText>
                  </div>

                  {/* Templates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {goalTemplates.map((template) => {
                      const categoryConfig = categoryOptions.find(
                        (cat) => cat.id === template.category,
                      );
                      return (
                        <motion.div
                          key={template.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ThemeAwareCard
                            className="p-4 cursor-pointer hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-500/50"
                            onClick={() => handleTemplateSelect(template)}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="text-2xl">
                                {categoryConfig?.icon}
                              </div>
                              <div>
                                <div className="font-bold">{template.name}</div>
                                <div className="text-sm text-gray-500">
                                  {categoryConfig?.name}
                                </div>
                              </div>
                            </div>
                            <ThemeAwareText
                              color="secondary"
                              className="text-sm mb-3"
                            >
                              {template.description}
                            </ThemeAwareText>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-green-500">
                                ฿{template.targetAmount.toLocaleString()}
                              </span>
                              <span
                                className={cn(
                                  "px-2 py-1 text-xs rounded-full",
                                  template.priority === "high"
                                    ? "bg-orange-500/20 text-orange-500"
                                    : template.priority === "medium"
                                      ? "bg-yellow-500/20 text-yellow-500"
                                      : "bg-gray-500/20 text-gray-500",
                                )}
                              >
                                {template.priority}
                              </span>
                            </div>
                          </ThemeAwareCard>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Custom Goal Option */}
                  <div className="text-center">
                    <ThemeAwareButton
                      variant="outline"
                      onClick={handleCustomGoal}
                      className="px-8"
                    >
                      <RocketLaunchIcon className="w-5 h-5 mr-2" />
                      Create Custom Goal
                    </ThemeAwareButton>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <ThemeAwareHeading level="h3" className="text-xl font-bold">
                    Goal Details
                  </ThemeAwareHeading>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Goal Name */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        Goal Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]"
                        placeholder="What's your goal?"
                      />
                    </div>

                    {/* Target Amount */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Target Amount *
                      </label>
                      <div className="relative">
                        <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={formData.targetAmount || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              targetAmount: parseFloat(e.target.value) || 0,
                            }))
                          }
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Deadline */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Deadline *
                      </label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          value={formData.deadline}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              deadline: e.target.value,
                            }))
                          }
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value as any,
                          }))
                        }
                        className="w-full px-4 py-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]"
                      >
                        {categoryOptions.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.icon} {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            priority: e.target.value as any,
                          }))
                        }
                        className="w-full px-4 py-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]"
                      >
                        {priorityOptions.map((priority) => (
                          <option key={priority.id} value={priority.id}>
                            {priority.name} - {priority.description}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]"
                        rows={3}
                        placeholder="Describe your goal..."
                      />
                    </div>

                    {/* Tags */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        Tags
                      </label>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="relative flex-1">
                          <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]"
                            placeholder="Add a tag..."
                            onKeyPress={(e) => e.key === "Enter" && addTag()}
                          />
                        </div>
                        <ThemeAwareButton variant="outline" onClick={addTag}>
                          Add
                        </ThemeAwareButton>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-sm flex items-center gap-1"
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(tag)}
                              className="hover:bg-blue-500/30 rounded-full p-0.5"
                            >
                              <XMarkIcon className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <ThemeAwareHeading
                      level="h3"
                      className="text-xl font-bold mb-2"
                    >
                      Ready to Launch? 🚀
                    </ThemeAwareHeading>
                    <ThemeAwareText color="secondary">
                      Review your mission details before launch
                    </ThemeAwareText>
                  </div>

                  <ThemeAwareCard className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-4xl">
                        {
                          categoryOptions.find(
                            (cat) => cat.id === formData.category,
                          )?.icon
                        }
                      </div>
                      <div>
                        <div className="text-2xl font-bold">
                          {formData.name}
                        </div>
                        <div className="text-gray-500">
                          {
                            categoryOptions.find(
                              (cat) => cat.id === formData.category,
                            )?.name
                          }
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-500">
                          Target Amount
                        </div>
                        <div className="text-xl font-bold text-green-500">
                          ฿{formData.targetAmount.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Deadline</div>
                        <div className="text-xl font-bold">
                          {new Date(formData.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {formData.description && (
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">
                          Description
                        </div>
                        <div>{formData.description}</div>
                      </div>
                    )}

                    {formData.tags.length > 0 && (
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Tags</div>
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-500/20 text-blue-500 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </ThemeAwareCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-[var(--color-border-secondary)]">
            <div>
              {step > 1 && (
                <ThemeAwareButton
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </ThemeAwareButton>
              )}
            </div>
            <div className="flex gap-2">
              <ThemeAwareButton variant="outline" onClick={handleClose}>
                Cancel
              </ThemeAwareButton>
              {step < 3 ? (
                <ThemeAwareButton
                  variant={isPlayMode ? "cosmic" : "primary"}
                  onClick={() => setStep(step + 1)}
                  glow={isPlayMode}
                >
                  Next
                </ThemeAwareButton>
              ) : (
                <ThemeAwareButton
                  variant={isPlayMode ? "cosmic" : "primary"}
                  onClick={handleSubmit}
                  glow={isPlayMode}
                >
                  <RocketLaunchIcon className="w-5 h-5 mr-2" />
                  Launch Mission!
                </ThemeAwareButton>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
