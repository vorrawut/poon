import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CurrencyDollarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareHeading,
  ThemeAwareButton,
  useTheme,
} from "../../../core";
import { cn } from "../../../libs/utils";
import { formatThaiCurrency } from "../services/thaiLocalization";
import type { FamilyObligation } from "../types";

interface FamilyObligationEntry {
  id: string;
  obligationType: FamilyObligation["type"];
  recipientName: string;
  amount: number;
  frequency: FamilyObligation["frequency"];
  lastPayment?: Date;
  nextDue?: Date;
  isActive: boolean;
  notes?: string;
}

interface FamilyObligationTrackerProps {
  language?: "en" | "th";
  onObligationUpdate?: (obligation: FamilyObligationEntry) => void;
  className?: string;
}

// Mock family obligations data
const FAMILY_OBLIGATION_TYPES: FamilyObligation[] = [
  {
    id: "parents_support",
    name: {
      en: "Parents Support",
      th: "ค่าเลี้ยงดูพ่อแม่",
    },
    type: "parents_support",
    priority: "essential",
    frequency: "monthly",
    culturalImportance: {
      en: "Filial piety - caring for aging parents is a fundamental Thai value",
      th: "กตัญญูกตเวทิตา - การดูแลพ่อแม่ที่แก่ชราเป็นคุณค่าพื้นฐานของคนไทย",
    },
    icon: "👴👵",
  },
  {
    id: "siblings_support",
    name: {
      en: "Siblings Support",
      th: "ช่วยเหลือพี่น้อง",
    },
    type: "siblings_support",
    priority: "important",
    frequency: "as_needed",
    culturalImportance: {
      en: "Supporting younger siblings or helping family members in need",
      th: "การช่วยเหลือน้องๆ หรือสมาชิกครอบครัวที่ต้องการความช่วยเหลือ",
    },
    icon: "👫",
  },
  {
    id: "extended_family",
    name: {
      en: "Extended Family",
      th: "ญาติพี่น้อง",
    },
    type: "extended_family",
    priority: "optional",
    frequency: "quarterly",
    culturalImportance: {
      en: "Maintaining relationships with extended family through financial support",
      th: "การรักษาความสัมพันธ์กับญาติพี่น้องผ่านการช่วยเหลือทางการเงิน",
    },
    icon: "👨‍👩‍👧‍👦",
  },
  {
    id: "education_support",
    name: {
      en: "Education Support",
      th: "ค่าเล่าเรียน",
    },
    type: "education_support",
    priority: "essential",
    frequency: "monthly",
    culturalImportance: {
      en: "Supporting family members' education - investing in family's future",
      th: "การสนับสนุนการศึกษาของสมาชิกครอบครัว - การลงทุนในอนาคตของครอบครัว",
    },
    icon: "🎓",
  },
];

export function FamilyObligationTracker({
  language = "en",
  onObligationUpdate,
  className,
}: FamilyObligationTrackerProps) {
  const { isPlayMode } = useTheme();
  const [obligations, setObligations] = useState<FamilyObligationEntry[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingObligation, setEditingObligation] =
    useState<FamilyObligationEntry | null>(null);
  const [newObligation, setNewObligation] = useState<
    Partial<FamilyObligationEntry>
  >({});

  // Initialize with some sample data
  useEffect(() => {
    const sampleObligations: FamilyObligationEntry[] = [
      {
        id: "1",
        obligationType: "parents_support",
        recipientName: language === "th" ? "คุณแม่" : "Mother",
        amount: 8000,
        frequency: "monthly",
        lastPayment: new Date(2024, 11, 1),
        nextDue: new Date(2025, 0, 1),
        isActive: true,
        notes:
          language === "th"
            ? "ค่าใช้จ่ายประจำเดือน"
            : "Monthly living expenses",
      },
      {
        id: "2",
        obligationType: "education_support",
        recipientName: language === "th" ? "น้องสาว" : "Younger Sister",
        amount: 12000,
        frequency: "monthly",
        lastPayment: new Date(2024, 11, 15),
        nextDue: new Date(2025, 0, 15),
        isActive: true,
        notes:
          language === "th" ? "ค่าเล่าเรียนมหาวิทยาลัย" : "University tuition",
      },
    ];
    setObligations(sampleObligations);
  }, [language]);

  const getObligationType = (type: FamilyObligation["type"]) => {
    return FAMILY_OBLIGATION_TYPES.find((o) => o.type === type);
  };

  const getPriorityColor = (priority: FamilyObligation["priority"]) => {
    switch (priority) {
      case "essential":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      case "important":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/20";
      case "optional":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const getFrequencyText = (frequency: FamilyObligation["frequency"]) => {
    const frequencies = {
      en: {
        monthly: "Monthly",
        quarterly: "Quarterly",
        annual: "Annual",
        as_needed: "As Needed",
      },
      th: {
        monthly: "รายเดือน",
        quarterly: "รายไตรมาส",
        annual: "รายปี",
        as_needed: "ตามความจำเป็น",
      },
    };
    return frequencies[language][frequency];
  };

  const getDaysUntilDue = (nextDue?: Date) => {
    if (!nextDue) return null;
    const today = new Date();
    const diffTime = nextDue.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleAddObligation = () => {
    if (
      !newObligation.obligationType ||
      !newObligation.recipientName ||
      !newObligation.amount
    ) {
      return;
    }

    const obligation: FamilyObligationEntry = {
      id: Date.now().toString(),
      obligationType: newObligation.obligationType,
      recipientName: newObligation.recipientName,
      amount: newObligation.amount,
      frequency: newObligation.frequency || "monthly",
      isActive: true,
      notes: newObligation.notes,
    };

    setObligations((prev) => [...prev, obligation]);
    onObligationUpdate?.(obligation);
    setNewObligation({});
    setShowAddModal(false);
  };

  const handleDeleteObligation = (id: string) => {
    setObligations((prev) => prev.filter((o) => o.id !== id));
  };

  const toggleObligationStatus = (id: string) => {
    setObligations((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isActive: !o.isActive } : o)),
    );
  };

  const totalMonthlyObligations = obligations
    .filter((o) => o.isActive && o.frequency === "monthly")
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <ThemeAwareHeading level="h2" className="mb-2" gradient={isPlayMode}>
            {language === "th" ? "👨‍👩‍👧‍👦 ภาระครอบครัว" : "👨‍👩‍👧‍👦 Family Obligations"}
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary">
            {language === "th"
              ? "จัดการและติดตามการช่วยเหลือครอบครัวตามวัฒนธรรมไทย"
              : "Manage and track family support according to Thai cultural values"}
          </ThemeAwareText>
        </div>

        <ThemeAwareButton
          variant="primary"
          onClick={() => setShowAddModal(true)}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          {language === "th" ? "เพิ่มภาระ" : "Add Obligation"}
        </ThemeAwareButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ThemeAwareCard className="p-4">
          <div className="text-center">
            <ThemeAwareText color="secondary" className="text-sm mb-1">
              {language === "th" ? "ภาระที่ใช้งานอยู่" : "Active Obligations"}
            </ThemeAwareText>
            <ThemeAwareText className="text-2xl font-bold text-blue-600">
              {obligations.filter((o) => o.isActive).length}
            </ThemeAwareText>
          </div>
        </ThemeAwareCard>

        <ThemeAwareCard className="p-4">
          <div className="text-center">
            <ThemeAwareText color="secondary" className="text-sm mb-1">
              {language === "th" ? "รายเดือนรวม" : "Monthly Total"}
            </ThemeAwareText>
            <ThemeAwareText className="text-2xl font-bold text-green-600">
              {formatThaiCurrency(totalMonthlyObligations, language, true)}
            </ThemeAwareText>
          </div>
        </ThemeAwareCard>

        <ThemeAwareCard className="p-4">
          <div className="text-center">
            <ThemeAwareText color="secondary" className="text-sm mb-1">
              {language === "th" ? "ภาระจำเป็น" : "Essential Obligations"}
            </ThemeAwareText>
            <ThemeAwareText className="text-2xl font-bold text-red-600">
              {
                obligations.filter((o) => {
                  const type = getObligationType(o.obligationType);
                  return o.isActive && type?.priority === "essential";
                }).length
              }
            </ThemeAwareText>
          </div>
        </ThemeAwareCard>
      </div>

      {/* Obligations List */}
      <div className="space-y-4">
        {obligations.map((obligation, index) => {
          const type = getObligationType(obligation.obligationType);
          const daysUntilDue = getDaysUntilDue(obligation.nextDue);

          return (
            <motion.div
              key={obligation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ThemeAwareCard
                className={cn(
                  "p-6",
                  !obligation.isActive && "opacity-60",
                  isPlayMode && "border-2 border-pink-400/30",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl">{type?.icon}</div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <ThemeAwareHeading level="h3">
                          {obligation.recipientName}
                        </ThemeAwareHeading>
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            getPriorityColor(type?.priority || "optional"),
                          )}
                        >
                          {type?.priority === "essential"
                            ? language === "th"
                              ? "จำเป็น"
                              : "Essential"
                            : type?.priority === "important"
                              ? language === "th"
                                ? "สำคัญ"
                                : "Important"
                              : language === "th"
                                ? "เลือกได้"
                                : "Optional"}
                        </span>
                      </div>

                      <ThemeAwareText
                        color="secondary"
                        className="text-sm mb-1"
                      >
                        {type?.name[language]}
                      </ThemeAwareText>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <CurrencyDollarIcon className="w-4 h-4" />
                          <ThemeAwareText className="font-medium">
                            {formatThaiCurrency(obligation.amount, language)}
                          </ThemeAwareText>
                        </div>

                        <ThemeAwareText color="secondary">
                          {getFrequencyText(obligation.frequency)}
                        </ThemeAwareText>

                        {daysUntilDue !== null && (
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              daysUntilDue <= 7
                                ? "bg-red-100 text-red-600 dark:bg-red-900/20"
                                : daysUntilDue <= 14
                                  ? "bg-orange-100 text-orange-600 dark:bg-orange-900/20"
                                  : "bg-green-100 text-green-600 dark:bg-green-900/20",
                            )}
                          >
                            {daysUntilDue > 0
                              ? `${daysUntilDue} ${language === "th" ? "วัน" : "days"}`
                              : language === "th"
                                ? "เกินกำหนด"
                                : "Overdue"}
                          </span>
                        )}
                      </div>

                      {obligation.notes && (
                        <ThemeAwareText className="text-sm mt-2 italic">
                          {obligation.notes}
                        </ThemeAwareText>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <ThemeAwareButton
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleObligationStatus(obligation.id)}
                    >
                      <CheckCircleIcon
                        className={cn(
                          "w-4 h-4",
                          obligation.isActive
                            ? "text-green-600"
                            : "text-gray-400",
                        )}
                      />
                    </ThemeAwareButton>

                    <ThemeAwareButton
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingObligation(obligation)}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </ThemeAwareButton>

                    <ThemeAwareButton
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteObligation(obligation.id)}
                    >
                      <TrashIcon className="w-4 h-4 text-red-500" />
                    </ThemeAwareButton>
                  </div>
                </div>

                {/* Cosmic Effects for Play Mode */}
                {isPlayMode && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl" />
                  </div>
                )}
              </ThemeAwareCard>
            </motion.div>
          );
        })}
      </div>

      {obligations.length === 0 && (
        <ThemeAwareCard className="p-12 text-center">
          <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
          <ThemeAwareHeading level="h3" className="mb-2">
            {language === "th"
              ? "ยังไม่มีภาระครอบครัว"
              : "No Family Obligations Yet"}
          </ThemeAwareHeading>
          <ThemeAwareText color="secondary" className="mb-6">
            {language === "th"
              ? "เริ่มต้นการจัดการภาระครอบครัวตามวัฒนธรรมไทย"
              : "Start managing your family obligations according to Thai culture"}
          </ThemeAwareText>
          <ThemeAwareButton
            variant="primary"
            onClick={() => setShowAddModal(true)}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            {language === "th" ? "เพิ่มภาระแรก" : "Add First Obligation"}
          </ThemeAwareButton>
        </ThemeAwareCard>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || editingObligation) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowAddModal(false);
              setEditingObligation(null);
              setNewObligation({});
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full"
            >
              <ThemeAwareCard className="p-6">
                <ThemeAwareHeading level="h2" className="mb-6">
                  {editingObligation
                    ? language === "th"
                      ? "แก้ไขภาระครอบครัว"
                      : "Edit Family Obligation"
                    : language === "th"
                      ? "เพิ่มภาระครอบครัว"
                      : "Add Family Obligation"}
                </ThemeAwareHeading>

                <div className="space-y-4">
                  {/* Obligation Type */}
                  <div>
                    <ThemeAwareText className="text-sm font-medium mb-2">
                      {language === "th" ? "ประเภทภาระ" : "Obligation Type"}
                    </ThemeAwareText>
                    <select
                      className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={newObligation.obligationType || ""}
                      onChange={(e) =>
                        setNewObligation((prev) => ({
                          ...prev,
                          obligationType: e.target
                            .value as FamilyObligation["type"],
                        }))
                      }
                    >
                      <option value="">
                        {language === "th" ? "เลือกประเภท" : "Select Type"}
                      </option>
                      {FAMILY_OBLIGATION_TYPES.map((type) => (
                        <option key={type.id} value={type.type}>
                          {type.icon} {type.name[language]}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Recipient Name */}
                  <div>
                    <ThemeAwareText className="text-sm font-medium mb-2">
                      {language === "th" ? "ชื่อผู้รับ" : "Recipient Name"}
                    </ThemeAwareText>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      placeholder={
                        language === "th"
                          ? "เช่น คุณแม่, น้องสาว"
                          : "e.g., Mother, Younger Sister"
                      }
                      value={newObligation.recipientName || ""}
                      onChange={(e) =>
                        setNewObligation((prev) => ({
                          ...prev,
                          recipientName: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* Amount */}
                  <div>
                    <ThemeAwareText className="text-sm font-medium mb-2">
                      {language === "th" ? "จำนวนเงิน (บาท)" : "Amount (THB)"}
                    </ThemeAwareText>
                    <input
                      type="number"
                      className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      placeholder="0"
                      value={newObligation.amount || ""}
                      onChange={(e) =>
                        setNewObligation((prev) => ({
                          ...prev,
                          amount: parseFloat(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>

                  {/* Frequency */}
                  <div>
                    <ThemeAwareText className="text-sm font-medium mb-2">
                      {language === "th" ? "ความถี่" : "Frequency"}
                    </ThemeAwareText>
                    <select
                      className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={newObligation.frequency || "monthly"}
                      onChange={(e) =>
                        setNewObligation((prev) => ({
                          ...prev,
                          frequency: e.target
                            .value as FamilyObligation["frequency"],
                        }))
                      }
                    >
                      <option value="monthly">
                        {language === "th" ? "รายเดือน" : "Monthly"}
                      </option>
                      <option value="quarterly">
                        {language === "th" ? "รายไตรมาส" : "Quarterly"}
                      </option>
                      <option value="annual">
                        {language === "th" ? "รายปี" : "Annual"}
                      </option>
                      <option value="as_needed">
                        {language === "th" ? "ตามความจำเป็น" : "As Needed"}
                      </option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <ThemeAwareText className="text-sm font-medium mb-2">
                      {language === "th" ? "หมายเหตุ" : "Notes"}
                    </ThemeAwareText>
                    <textarea
                      className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      rows={3}
                      placeholder={
                        language === "th"
                          ? "หมายเหตุเพิ่มเติม..."
                          : "Additional notes..."
                      }
                      value={newObligation.notes || ""}
                      onChange={(e) =>
                        setNewObligation((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <ThemeAwareButton
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingObligation(null);
                      setNewObligation({});
                    }}
                  >
                    {language === "th" ? "ยกเลิก" : "Cancel"}
                  </ThemeAwareButton>
                  <ThemeAwareButton
                    variant="primary"
                    className="flex-1"
                    onClick={handleAddObligation}
                  >
                    {editingObligation
                      ? language === "th"
                        ? "บันทึก"
                        : "Save"
                      : language === "th"
                        ? "เพิ่ม"
                        : "Add"}
                  </ThemeAwareButton>
                </div>
              </ThemeAwareCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
