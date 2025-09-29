import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
} from "../../../core";
import { useTranslation } from "../../../libs/i18n";
import { cn } from "../../../libs/utils";
import {
  mockThaiEvents,
  type ThaiCulturalEvent,
} from "../../../../mockData/features/thai-culture";

export interface ThaiCalendarIntegrationProps {
  currentEvents?: ThaiCulturalEvent[];
  upcomingEvents?: ThaiCulturalEvent[];
  onEventSelect?: (event: ThaiCulturalEvent) => void;
  showBuddhistEra?: boolean;
  className?: string;
}

// Re-export the type for other components
export type { ThaiCulturalEvent } from "../../../../mockData/features/thai-culture";

// Buddhist Era Converter
const convertToBuddhistEra = (gregorianYear: number): number => {
  return gregorianYear + 543;
};

const formatThaiDate = (
  date: Date,
  includeBuddhistEra: boolean = true,
): string => {
  const thaiMonths = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = includeBuddhistEra
    ? convertToBuddhistEra(date.getFullYear())
    : date.getFullYear();

  return `${day} ${month} ${year}`;
};

export function ThaiCalendarIntegration({
  currentEvents = mockThaiEvents.slice(0, 2),
  upcomingEvents = mockThaiEvents.slice(2, 4),
  onEventSelect,
  showBuddhistEra = true,
  className,
}: ThaiCalendarIntegrationProps) {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<ThaiCulturalEvent | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<"current" | "upcoming">("current");

  const today = useMemo(() => new Date(), []);
  const todayThai = useMemo(
    () => formatThaiDate(today, showBuddhistEra),
    [today, showBuddhistEra],
  );

  const handleEventClick = (event: ThaiCulturalEvent) => {
    setSelectedEvent(event);
    onEventSelect?.(event);
  };

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case "high":
        return "text-red-600 dark:text-red-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "low":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "religious":
        return "🙏";
      case "national":
        return "🇹🇭";
      case "cultural":
        return "🎭";
      case "seasonal":
        return "🌸";
      default:
        return "📅";
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading level="h2" className="mb-2">
          {t("features.thaiCulture.calendar")}
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary">{todayThai}</ThemeAwareText>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("current")}
          className={cn(
            "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeTab === "current"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
          )}
        >
          Current Events
        </button>
        <button
          onClick={() => setActiveTab("upcoming")}
          className={cn(
            "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeTab === "upcoming"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
          )}
        >
          Upcoming Events
        </button>
      </div>

      {/* Events List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {(activeTab === "current" ? currentEvents : upcomingEvents).map(
            (event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ThemeAwareCard
                  variant="elevated"
                  padding="lg"
                  hover
                  className="cursor-pointer"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{getTypeIcon(event.type)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <ThemeAwareHeading level="h3" className="truncate">
                          {event.name}
                        </ThemeAwareHeading>
                        <span
                          className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full",
                            getSignificanceColor(event.significance),
                          )}
                        >
                          {event.significance}
                        </span>
                      </div>

                      <ThemeAwareText color="secondary" className="mb-2">
                        {formatThaiDate(new Date(event.date), showBuddhistEra)}
                      </ThemeAwareText>

                      <ThemeAwareText className="mb-3">
                        {event.description.en}
                      </ThemeAwareText>

                      {event.financialImpact && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                          <ThemeAwareText
                            variant="caption"
                            className="font-medium mb-1"
                          >
                            Financial Impact: +
                            {event.financialImpact.spendingIncrease}% spending
                          </ThemeAwareText>
                          <ThemeAwareText variant="caption" color="secondary">
                            {event.financialImpact.budgetRecommendation}
                          </ThemeAwareText>
                        </div>
                      )}
                    </div>
                  </div>
                </ThemeAwareCard>
              </motion.div>
            ),
          )}
        </motion.div>
      </AnimatePresence>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">
                      {getTypeIcon(selectedEvent.type)}
                    </span>
                    <div>
                      <ThemeAwareHeading level="h2">
                        {selectedEvent.name}
                      </ThemeAwareHeading>
                      <ThemeAwareText color="secondary">
                        {selectedEvent.nameEn}
                      </ThemeAwareText>
                    </div>
                  </div>
                  <ThemeAwareButton
                    variant="ghost"
                    onClick={() => setSelectedEvent(null)}
                  >
                    ✕
                  </ThemeAwareButton>
                </div>

                <div className="space-y-4">
                  <div>
                    <ThemeAwareText className="font-medium mb-2">
                      Description
                    </ThemeAwareText>
                    <ThemeAwareText>
                      {selectedEvent.description.en}
                    </ThemeAwareText>
                    <ThemeAwareText className="mt-2 text-sm italic">
                      {selectedEvent.description.th}
                    </ThemeAwareText>
                  </div>

                  <div>
                    <ThemeAwareText className="font-medium mb-2">
                      Traditions
                    </ThemeAwareText>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.traditions.map((tradition, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                        >
                          {tradition}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <ThemeAwareText className="font-medium mb-2">
                      Modern Practices
                    </ThemeAwareText>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.modernPractices.map((practice, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm"
                        >
                          {practice}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedEvent.financialImpact && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                      <ThemeAwareText className="font-medium mb-2">
                        Financial Planning
                      </ThemeAwareText>
                      <ThemeAwareText className="mb-2">
                        Expected spending increase:{" "}
                        {selectedEvent.financialImpact.spendingIncrease}%
                      </ThemeAwareText>
                      <ThemeAwareText className="mb-2">
                        Categories:{" "}
                        {selectedEvent.financialImpact.categories.join(", ")}
                      </ThemeAwareText>
                      <ThemeAwareText>
                        {selectedEvent.financialImpact.budgetRecommendation}
                      </ThemeAwareText>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
