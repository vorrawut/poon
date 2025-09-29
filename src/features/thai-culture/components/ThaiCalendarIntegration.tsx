import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarIcon,
  GiftIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareHeading,
  ThemeAwareButton,
  useTheme,
} from "../../../core";
import { cn } from "../../../libs/utils";
import { getUpcomingThaiHolidays } from "../data/thaiHolidays";
import {
  formatThaiCurrency,
  formatBuddhistDate,
} from "../services/thaiLocalization";
import type { ThaiHoliday } from "../types";

interface ThaiCalendarIntegrationProps {
  language?: "en" | "th";
  onPlanExpense?: (holiday: ThaiHoliday, amount: number) => void;
  className?: string;
}

export function ThaiCalendarIntegration({
  language = "en",
  onPlanExpense,
  className,
}: ThaiCalendarIntegrationProps) {
  const { isPlayMode } = useTheme();
  const [upcomingHolidays, setUpcomingHolidays] = useState<ThaiHoliday[]>([]);
  const [selectedHoliday, setSelectedHoliday] = useState<ThaiHoliday | null>(
    null,
  );
  const [plannedBudgets, setPlannedBudgets] = useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    const holidays = getUpcomingThaiHolidays(6); // Next 6 months
    setUpcomingHolidays(holidays);
  }, []);

  const handlePlanBudget = (holiday: ThaiHoliday, amount: number) => {
    setPlannedBudgets((prev) => ({
      ...prev,
      [holiday.id]: amount,
    }));
    onPlanExpense?.(holiday, amount);
  };

  const getHolidayTypeIcon = (type: ThaiHoliday["type"]) => {
    switch (type) {
      case "religious":
        return "🙏";
      case "royal":
        return "👑";
      case "cultural":
        return "🎉";
      case "seasonal":
        return "🌸";
      default:
        return "📅";
    }
  };

  const getHolidayTypeColor = (type: ThaiHoliday["type"]) => {
    switch (type) {
      case "religious":
        return "from-yellow-400 to-orange-500";
      case "royal":
        return "from-purple-400 to-purple-600";
      case "cultural":
        return "from-pink-400 to-red-500";
      case "seasonal":
        return "from-green-400 to-blue-500";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getDaysUntil = (dateString: string) => {
    const holidayDate = new Date(dateString);
    const today = new Date();
    const diffTime = holidayDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading level="h2" className="mb-4" gradient={isPlayMode}>
          {language === "th"
            ? "📅 ปฏิทินวัฒนธรรมไทย"
            : "📅 Thai Cultural Calendar"}
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary">
          {language === "th"
            ? "วางแผนการเงินสำหรับเทศกาลและวันสำคัญของไทย"
            : "Plan your finances for Thai festivals and important occasions"}
        </ThemeAwareText>
      </div>

      {/* Upcoming Holidays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingHolidays.map((holiday, index) => {
          const daysUntil = getDaysUntil(holiday.gregorianDate);
          const plannedBudget = plannedBudgets[holiday.id];

          return (
            <motion.div
              key={holiday.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ThemeAwareCard
                hover
                className={cn(
                  "relative overflow-hidden",
                  isPlayMode && "border-2 border-purple-400/30",
                )}
              >
                {/* Holiday Type Badge */}
                <div
                  className={cn(
                    "absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium",
                    `bg-gradient-to-r ${getHolidayTypeColor(holiday.type)}`,
                    "text-white shadow-lg",
                  )}
                >
                  {getHolidayTypeIcon(holiday.type)}
                </div>

                {/* Days Until Badge */}
                {daysUntil > 0 && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
                    {daysUntil} {language === "th" ? "วัน" : "days"}
                  </div>
                )}

                <div className="p-6">
                  <div className="mb-4">
                    <ThemeAwareHeading level="h3" className="mb-2">
                      {holiday.name[language]}
                    </ThemeAwareHeading>
                    <ThemeAwareText color="secondary" className="text-sm mb-2">
                      {formatBuddhistDate(
                        new Date(holiday.gregorianDate),
                        language,
                      )}
                    </ThemeAwareText>
                    <ThemeAwareText className="text-sm line-clamp-2">
                      {holiday.significance[language]}
                    </ThemeAwareText>
                  </div>

                  {/* Budget Information */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <ThemeAwareText color="secondary">
                        {language === "th"
                          ? "งบประมาณแนะนำ:"
                          : "Suggested Budget:"}
                      </ThemeAwareText>
                      <ThemeAwareText className="font-medium">
                        {formatThaiCurrency(
                          holiday.budgetSuggestion.min,
                          language,
                          true,
                        )}{" "}
                        -{" "}
                        {formatThaiCurrency(
                          holiday.budgetSuggestion.max,
                          language,
                          true,
                        )}
                      </ThemeAwareText>
                    </div>

                    {plannedBudget && (
                      <div className="flex items-center justify-between text-sm">
                        <ThemeAwareText color="secondary">
                          {language === "th"
                            ? "งบที่วางแผน:"
                            : "Planned Budget:"}
                        </ThemeAwareText>
                        <ThemeAwareText className="font-medium text-green-600">
                          {formatThaiCurrency(plannedBudget, language)}
                        </ThemeAwareText>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <ThemeAwareButton
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedHoliday(holiday)}
                        className="flex-1"
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {language === "th" ? "ดูรายละเอียด" : "View Details"}
                      </ThemeAwareButton>

                      {!plannedBudget && (
                        <ThemeAwareButton
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            handlePlanBudget(
                              holiday,
                              holiday.budgetSuggestion.min,
                            )
                          }
                          className="flex-1"
                        >
                          <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                          {language === "th" ? "วางแผน" : "Plan"}
                        </ThemeAwareButton>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cosmic Effects for Play Mode */}
                {isPlayMode && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-lg" />
                  </div>
                )}
              </ThemeAwareCard>
            </motion.div>
          );
        })}
      </div>

      {/* Holiday Detail Modal */}
      <AnimatePresence>
        {selectedHoliday && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedHoliday(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full"
            >
              <ThemeAwareCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">
                      {getHolidayTypeIcon(selectedHoliday.type)}
                    </span>
                    <div>
                      <ThemeAwareHeading level="h2" className="mb-1">
                        {selectedHoliday.name[language]}
                      </ThemeAwareHeading>
                      <ThemeAwareText color="secondary">
                        {formatBuddhistDate(
                          new Date(selectedHoliday.gregorianDate),
                          language,
                        )}
                      </ThemeAwareText>
                    </div>
                  </div>
                  <ThemeAwareButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedHoliday(null)}
                  >
                    ✕
                  </ThemeAwareButton>
                </div>

                <div className="space-y-6">
                  {/* Significance */}
                  <div>
                    <ThemeAwareHeading level="h3" className="mb-3">
                      {language === "th" ? "ความสำคัญ" : "Significance"}
                    </ThemeAwareHeading>
                    <ThemeAwareText>
                      {selectedHoliday.significance[language]}
                    </ThemeAwareText>
                  </div>

                  {/* Traditional Expenses */}
                  <div>
                    <ThemeAwareHeading level="h3" className="mb-3">
                      {language === "th"
                        ? "ค่าใช้จ่ายตามประเพณี"
                        : "Traditional Expenses"}
                    </ThemeAwareHeading>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedHoliday.traditionalExpenses.map(
                        (expense, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <GiftIcon className="w-4 h-4 text-purple-500" />
                            <ThemeAwareText className="text-sm">
                              {expense}
                            </ThemeAwareText>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Budget Planning */}
                  <div>
                    <ThemeAwareHeading level="h3" className="mb-3">
                      {language === "th"
                        ? "การวางแผนงบประมาณ"
                        : "Budget Planning"}
                    </ThemeAwareHeading>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <ThemeAwareText color="secondary">
                          {language === "th"
                            ? "ช่วงงบประมาณแนะนำ"
                            : "Recommended Budget Range"}
                        </ThemeAwareText>
                        <ThemeAwareText className="font-bold text-lg">
                          {formatThaiCurrency(
                            selectedHoliday.budgetSuggestion.min,
                            language,
                          )}{" "}
                          -{" "}
                          {formatThaiCurrency(
                            selectedHoliday.budgetSuggestion.max,
                            language,
                          )}
                        </ThemeAwareText>
                      </div>

                      <div className="flex gap-2">
                        <ThemeAwareButton
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handlePlanBudget(
                              selectedHoliday,
                              selectedHoliday.budgetSuggestion.min,
                            )
                          }
                        >
                          {language === "th" ? "วางแผนขั้นต่ำ" : "Plan Minimum"}
                        </ThemeAwareButton>
                        <ThemeAwareButton
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            handlePlanBudget(
                              selectedHoliday,
                              selectedHoliday.budgetSuggestion.max,
                            )
                          }
                        >
                          {language === "th" ? "วางแผนสูงสุด" : "Plan Maximum"}
                        </ThemeAwareButton>
                      </div>
                    </div>
                  </div>
                </div>
              </ThemeAwareCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Card */}
      {upcomingHolidays.length > 0 && (
        <ThemeAwareCard className="p-6">
          <div className="text-center">
            <ThemeAwareHeading level="h3" className="mb-4">
              {language === "th"
                ? "📊 สรุปงบประมาณเทศกาล"
                : "📊 Festival Budget Summary"}
            </ThemeAwareHeading>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <ThemeAwareText color="secondary" className="text-sm mb-1">
                  {language === "th"
                    ? "เทศกาลที่จะมาถึง"
                    : "Upcoming Festivals"}
                </ThemeAwareText>
                <ThemeAwareText className="text-2xl font-bold text-blue-600">
                  {upcomingHolidays.length}
                </ThemeAwareText>
              </div>

              <div className="text-center">
                <ThemeAwareText color="secondary" className="text-sm mb-1">
                  {language === "th" ? "งบที่วางแผนแล้ว" : "Planned Budget"}
                </ThemeAwareText>
                <ThemeAwareText className="text-2xl font-bold text-green-600">
                  {formatThaiCurrency(
                    Object.values(plannedBudgets).reduce(
                      (sum, amount) => sum + amount,
                      0,
                    ),
                    language,
                    true,
                  )}
                </ThemeAwareText>
              </div>

              <div className="text-center">
                <ThemeAwareText color="secondary" className="text-sm mb-1">
                  {language === "th" ? "งบประมาณแนะนำ" : "Suggested Total"}
                </ThemeAwareText>
                <ThemeAwareText className="text-2xl font-bold text-purple-600">
                  {formatThaiCurrency(
                    upcomingHolidays.reduce(
                      (sum, holiday) => sum + holiday.budgetSuggestion.max,
                      0,
                    ),
                    language,
                    true,
                  )}
                </ThemeAwareText>
              </div>
            </div>
          </div>
        </ThemeAwareCard>
      )}
    </div>
  );
}
