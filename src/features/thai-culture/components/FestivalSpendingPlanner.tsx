import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
} from "../../../core";
import { useTranslation } from "../../../libs/i18n";
import { cn } from "../../../libs/utils";

// Festival Spending Categories
export interface FestivalExpense {
  id: string;
  category:
    | "travel"
    | "gifts"
    | "food"
    | "ceremonies"
    | "clothing"
    | "entertainment"
    | "decorations";
  name: {
    en: string;
    th: string;
  };
  estimatedCost: {
    min: number;
    max: number;
    average: number;
  };
  priority: "essential" | "important" | "optional";
  description: {
    en: string;
    th: string;
  };
  tips: {
    en: string[];
    th: string[];
  };
}

export interface ThaiFestival {
  id: string;
  name: {
    en: string;
    th: string;
  };
  date: string;
  duration: number; // days
  significance: "high" | "medium" | "low";
  expenses: FestivalExpense[];
  totalEstimate: {
    min: number;
    max: number;
    average: number;
  };
  icon: string;
  color: string;
  culturalTips: {
    en: string[];
    th: string[];
  };
}

export interface FestivalSpendingPlannerProps {
  festivals?: ThaiFestival[];
  onPlanUpdate?: (festivalId: string, plan: Record<string, number>) => void;
  className?: string;
}

// Mock Festival Data
const mockFestivals: ThaiFestival[] = [
  {
    id: "songkran-2025",
    name: {
      en: "Songkran Festival",
      th: "เทศกาลสงกรานต์",
    },
    date: "2025-04-13",
    duration: 3,
    significance: "high",
    expenses: [
      {
        id: "songkran-travel",
        category: "travel",
        name: { en: "Travel Home", th: "เดินทางกลับบ้าน" },
        estimatedCost: { min: 2000, max: 15000, average: 8000 },
        priority: "essential",
        description: {
          en: "Transportation to hometown for family reunion",
          th: "ค่าเดินทางกลับบ้านเพื่อรวมตัวครอบครัว",
        },
        tips: {
          en: ["Book early for better prices", "Consider bus vs flight costs"],
          th: [
            "จองล่วงหน้าเพื่อราคาดีกว่า",
            "เปรียบเทียบราคารถบัสกับเครื่องบิน",
          ],
        },
      },
      {
        id: "songkran-gifts",
        category: "gifts",
        name: { en: "Gifts for Elders", th: "ของขวัญผู้สูงอายุ" },
        estimatedCost: { min: 1000, max: 5000, average: 2500 },
        priority: "important",
        description: {
          en: "Traditional gifts and offerings for parents and elders",
          th: "ของขวัญและของถวายแก่บิดามารดาและผู้สูงอายุ",
        },
        tips: {
          en: ["Focus on practical items", "Include traditional offerings"],
          th: ["เลือกของใช้จริง", "รวมของถวายตามประเพณี"],
        },
      },
      {
        id: "songkran-food",
        category: "food",
        name: { en: "Festival Food", th: "อาหารงานเทศกาล" },
        estimatedCost: { min: 1500, max: 8000, average: 4000 },
        priority: "essential",
        description: {
          en: "Family meals and traditional festival foods",
          th: "อาหารครอบครัวและอาหารประเพณีเทศกาล",
        },
        tips: {
          en: ["Share costs with family", "Prepare some dishes at home"],
          th: ["แบ่งค่าใช้จ่ายกับครอบครัว", "เตรียมอาหารบางอย่างที่บ้าน"],
        },
      },
      {
        id: "songkran-entertainment",
        category: "entertainment",
        name: { en: "Water Festival Activities", th: "กิจกรรมเล่นน้ำ" },
        estimatedCost: { min: 500, max: 3000, average: 1500 },
        priority: "optional",
        description: {
          en: "Water guns, festival activities, and entertainment",
          th: "ปืนฉีดน้ำ กิจกรรมเทศกาล และความบันเทิง",
        },
        tips: {
          en: ["Set a fun budget limit", "Join free community events"],
          th: ["ตั้งงบสนุกสนานให้จำกัด", "เข้าร่วมกิจกรรมชุมชนฟรี"],
        },
      },
    ],
    totalEstimate: { min: 5000, max: 31000, average: 16000 },
    icon: "💧",
    color: "#3B82F6",
    culturalTips: {
      en: [
        "Songkran is about family reunion and respect for elders",
        "Water blessings are more important than water fights",
        "Visit temples for traditional ceremonies",
      ],
      th: [
        "สงกรานต์คือการรวมตัวครอบครัวและเคารพผู้สูงอายุ",
        "การประพรมน้ำสำคัญกว่าการเล่นน้ำ",
        "ไปวัดทำพิธีกรรมตามประเพณี",
      ],
    },
  },
  {
    id: "loy-krathong-2025",
    name: {
      en: "Loy Krathong",
      th: "ลอยกระทง",
    },
    date: "2025-11-05",
    duration: 1,
    significance: "high",
    expenses: [
      {
        id: "loy-krathong-materials",
        category: "decorations",
        name: { en: "Krathong Materials", th: "วัสดุทำกระทง" },
        estimatedCost: { min: 200, max: 1000, average: 500 },
        priority: "essential",
        description: {
          en: "Materials to make traditional floating baskets",
          th: "วัสดุสำหรับทำกระทงประเพณี",
        },
        tips: {
          en: ["Use eco-friendly materials", "Make with family for bonding"],
          th: [
            "ใช้วัสดุที่เป็นมิตรกับสิ่งแวดล้อม",
            "ทำร่วมกับครอบครัวเพื่อความสัมพันธ์",
          ],
        },
      },
      {
        id: "loy-krathong-food",
        category: "food",
        name: { en: "Festival Dinner", th: "อาหารเย็นเทศกาล" },
        estimatedCost: { min: 500, max: 2000, average: 1000 },
        priority: "important",
        description: {
          en: "Special dinner by the water during festival",
          th: "อาหารเย็นพิเศษริมน้ำในช่วงเทศกาล",
        },
        tips: {
          en: ["Book restaurant early", "Consider riverside venues"],
          th: ["จองร้านอาหารล่วงหน้า", "พิจารณาสถานที่ริมน้ำ"],
        },
      },
    ],
    totalEstimate: { min: 700, max: 3000, average: 1500 },
    icon: "🏮",
    color: "#EC4899",
    culturalTips: {
      en: [
        "Loy Krathong is about letting go of negativity",
        "Make wishes while floating your krathong",
        "Use biodegradable materials to protect waterways",
      ],
      th: [
        "ลอยกระทงคือการปล่อยสิ่งไม่ดี",
        "ขอพรขณะลอยกระทง",
        "ใช้วัสดุย่อยสลายได้เพื่อรักษาแหล่งน้ำ",
      ],
    },
  },
];

// Festival Card Component
function FestivalCard({
  festival,
  isSelected = false,
  onSelect,
  plannedBudget = 0,
}: {
  festival: ThaiFestival;
  isSelected?: boolean;
  onSelect?: () => void;
  plannedBudget?: number;
}) {
  const { language } = useTranslation();

  const festivalDate = new Date(festival.date);
  const daysUntil = Math.ceil(
    (festivalDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );
  const isUpcoming = daysUntil > 0;

  return (
    <motion.div
      className={cn(
        "cursor-pointer transition-all duration-300",
        isSelected && "scale-105",
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
    >
      <ThemeAwareCard
        className={cn(
          "p-4 border-2 transition-all duration-300",
          isSelected
            ? "border-purple-500 shadow-lg shadow-purple-500/20"
            : "border-transparent",
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="text-2xl p-2 rounded-full"
              style={{
                backgroundColor: `${festival.color}20`,
                color: festival.color,
              }}
            >
              {festival.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {language === "th" ? festival.name.th : festival.name.en}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">
                  {festivalDate.toLocaleDateString()}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">
                  {festival.duration} day{festival.duration > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {isUpcoming && (
            <div className="text-right">
              <div className="text-xs text-gray-400">in</div>
              <div className="text-lg font-bold text-purple-300">
                {daysUntil}
              </div>
              <div className="text-xs text-gray-400">days</div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-lg font-bold text-green-300">
              ฿{festival.totalEstimate.average.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">Estimated Cost</div>
          </div>
          <div>
            <div
              className={cn(
                "text-lg font-bold",
                plannedBudget > 0 ? "text-blue-300" : "text-gray-400",
              )}
            >
              ฿{plannedBudget.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">Planned Budget</div>
          </div>
        </div>

        <div className="text-xs text-gray-400">
          Range: ฿{festival.totalEstimate.min.toLocaleString()} - ฿
          {festival.totalEstimate.max.toLocaleString()}
        </div>

        {plannedBudget > 0 && (
          <div className="mt-2">
            <div
              className={cn(
                "text-sm font-medium",
                plannedBudget >= festival.totalEstimate.min &&
                  plannedBudget <= festival.totalEstimate.max
                  ? "text-green-400"
                  : plannedBudget < festival.totalEstimate.min
                    ? "text-yellow-400"
                    : "text-purple-400",
              )}
            >
              {plannedBudget < festival.totalEstimate.min
                ? "⚠️ Below minimum"
                : plannedBudget > festival.totalEstimate.max
                  ? "💰 Above maximum"
                  : "✅ Within range"}
            </div>
          </div>
        )}
      </ThemeAwareCard>
    </motion.div>
  );
}

export function FestivalSpendingPlanner({
  festivals = mockFestivals,
  onPlanUpdate,
  className = "",
}: FestivalSpendingPlannerProps) {
  const { language } = useTranslation();
  const [selectedFestival, setSelectedFestival] = useState<string | null>(null);
  const [budgetPlans, setBudgetPlans] = useState<
    Record<string, Record<string, number>>
  >({});

  const selectedFestivalData = festivals.find((f) => f.id === selectedFestival);

  // Calculate total planned budget for all festivals
  const totalPlannedBudget = useMemo(() => {
    return Object.values(budgetPlans).reduce((total, festivalPlan) => {
      return (
        total +
        Object.values(festivalPlan).reduce((sum, amount) => sum + amount, 0)
      );
    }, 0);
  }, [budgetPlans]);

  const handleFestivalSelect = (festivalId: string) => {
    setSelectedFestival(selectedFestival === festivalId ? null : festivalId);
  };

  const handleExpenseUpdate = (
    festivalId: string,
    expenseId: string,
    amount: number,
  ) => {
    setBudgetPlans((prev) => ({
      ...prev,
      [festivalId]: {
        ...prev[festivalId],
        [expenseId]: amount,
      },
    }));

    onPlanUpdate?.(festivalId, {
      ...budgetPlans[festivalId],
      [expenseId]: amount,
    });
  };

  const getFestivalBudget = (festivalId: string) => {
    const plan = budgetPlans[festivalId] || {};
    return Object.values(plan).reduce((sum, amount) => sum + amount, 0);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading
          level="h2"
          className="text-2xl font-bold mb-2 flex items-center justify-center gap-2"
        >
          🎊 Festival Spending Planner
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary" className="text-sm">
          Plan and budget for Thai cultural festivals throughout the year
        </ThemeAwareText>
      </div>

      {/* Total Budget Overview */}
      <ThemeAwareCard className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
        <div className="text-center">
          <h3 className="font-semibold text-purple-300 mb-2">
            📊 Total Festival Budget
          </h3>
          <div className="text-3xl font-bold text-purple-400 mb-2">
            ฿{totalPlannedBudget.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">
            Planned across {festivals.length} festivals
          </div>
        </div>
      </ThemeAwareCard>

      {/* Festivals List */}
      <div className="space-y-4">
        {festivals.map((festival, index) => (
          <motion.div
            key={festival.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <FestivalCard
              festival={festival}
              isSelected={selectedFestival === festival.id}
              onSelect={() => handleFestivalSelect(festival.id)}
              plannedBudget={getFestivalBudget(festival.id)}
            />

            {/* Expense Breakdown */}
            {selectedFestival === festival.id && selectedFestivalData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <h4 className="text-lg font-semibold mb-4 text-purple-300">
                  💰 Expense Breakdown
                </h4>

                <div className="space-y-4">
                  {selectedFestivalData.expenses.map((expense) => {
                    const currentAmount =
                      budgetPlans[festival.id]?.[expense.id] || 0;

                    return (
                      <div
                        key={expense.id}
                        className="p-3 bg-gray-700/50 rounded border"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium">
                              {language === "th"
                                ? expense.name.th
                                : expense.name.en}
                            </h5>
                            <p className="text-sm text-gray-400">
                              {language === "th"
                                ? expense.description.th
                                : expense.description.en}
                            </p>
                            <span
                              className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium mt-1 inline-block",
                                expense.priority === "essential"
                                  ? "bg-red-500/20 text-red-300"
                                  : expense.priority === "important"
                                    ? "bg-yellow-500/20 text-yellow-300"
                                    : "bg-gray-500/20 text-gray-300",
                              )}
                            >
                              {expense.priority}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">
                              ฿{expense.estimatedCost.min.toLocaleString()} - ฿
                              {expense.estimatedCost.max.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              Avg: ฿
                              {expense.estimatedCost.average.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        {/* Quick Budget Buttons */}
                        <div className="flex gap-2 flex-wrap">
                          <ThemeAwareButton
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleExpenseUpdate(
                                festival.id,
                                expense.id,
                                expense.estimatedCost.min,
                              )
                            }
                          >
                            Min ฿{expense.estimatedCost.min.toLocaleString()}
                          </ThemeAwareButton>
                          <ThemeAwareButton
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              handleExpenseUpdate(
                                festival.id,
                                expense.id,
                                expense.estimatedCost.average,
                              )
                            }
                          >
                            Avg ฿
                            {expense.estimatedCost.average.toLocaleString()}
                          </ThemeAwareButton>
                          <ThemeAwareButton
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleExpenseUpdate(
                                festival.id,
                                expense.id,
                                expense.estimatedCost.max,
                              )
                            }
                          >
                            Max ฿{expense.estimatedCost.max.toLocaleString()}
                          </ThemeAwareButton>
                          {currentAmount > 0 && (
                            <ThemeAwareButton
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleExpenseUpdate(festival.id, expense.id, 0)
                              }
                              className="text-red-400"
                            >
                              Clear
                            </ThemeAwareButton>
                          )}
                        </div>

                        {currentAmount > 0 && (
                          <div className="mt-2 p-2 bg-green-500/10 rounded">
                            <div className="text-sm font-medium text-green-300">
                              Budgeted: ฿{currentAmount.toLocaleString()}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Cultural Tips */}
                <div className="mt-6 p-4 bg-amber-500/10 rounded border border-amber-500/20">
                  <h5 className="font-medium text-amber-300 mb-2">
                    🏮 Cultural Tips
                  </h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {(language === "th"
                      ? selectedFestivalData.culturalTips.th
                      : selectedFestivalData.culturalTips.en
                    ).map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
