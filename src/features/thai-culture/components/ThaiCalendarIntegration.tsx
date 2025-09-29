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

// Thai Buddhist Calendar and Cultural Events
export interface ThaiCulturalEvent {
  id: string;
  name: string;
  nameEn: string;
  nameTh: string;
  date: string;
  type: "religious" | "national" | "cultural" | "seasonal";
  significance: "high" | "medium" | "low";
  financialImpact: {
    spendingIncrease: number; // percentage
    categories: string[];
    budgetRecommendation: string;
  };
  traditions: string[];
  modernPractices: string[];
  icon: string;
  color: string;
  description: {
    en: string;
    th: string;
  };
}

export interface ThaiCalendarIntegrationProps {
  currentEvents?: ThaiCulturalEvent[];
  upcomingEvents?: ThaiCulturalEvent[];
  onEventSelect?: (event: ThaiCulturalEvent) => void;
  showBuddhistEra?: boolean;
  className?: string;
}

// Thai Cultural Events Data
const mockThaiEvents: ThaiCulturalEvent[] = [
  {
    id: "songkran-2025",
    name: "สงกรานต์",
    nameEn: "Songkran Festival",
    nameTh: "เทศกาลสงกรานต์",
    date: "2025-04-13",
    type: "cultural",
    significance: "high",
    financialImpact: {
      spendingIncrease: 45,
      categories: ["Travel", "Food & Dining", "Gifts", "Entertainment"],
      budgetRecommendation: "Plan ฿15,000-25,000 for travel and celebrations",
    },
    traditions: [
      "Water blessing ceremonies",
      "Visiting temples and elders",
      "Traditional Thai games",
      "Making merit with food offerings",
    ],
    modernPractices: [
      "Water fights and festivals",
      "Travel to hometowns",
      "Hotel and resort bookings",
      "Social media celebrations",
    ],
    icon: "💧",
    color: "#3B82F6",
    description: {
      en: "Thai New Year celebration with water blessings and family reunions",
      th: "เทศกาลปีใหม่ไทยด้วยการประพรมน้ำและการรวมตัวครอบครัว",
    },
  },
  {
    id: "vesak-2025",
    name: "วิสาขบูชา",
    nameEn: "Vesak Day",
    nameTh: "วันวิสาขบูชา",
    date: "2025-05-12",
    type: "religious",
    significance: "high",
    financialImpact: {
      spendingIncrease: 25,
      categories: ["Merit Making", "Temple Donations", "Food Offerings"],
      budgetRecommendation: "Allocate ฿5,000-8,000 for religious activities",
    },
    traditions: [
      "Temple visits and meditation",
      "Candle processions (Wien Tien)",
      "Merit making with monks",
      "Vegetarian meals",
    ],
    modernPractices: [
      "Online dharma teachings",
      "Digital merit making",
      "Social media sharing of good deeds",
      "Corporate CSR activities",
    ],
    icon: "🕯️",
    color: "#F59E0B",
    description: {
      en: "Buddhist holy day commemorating Buddha's birth, enlightenment, and death",
      th: "วันสำคัญทางพุทธศาสนาระลึกถึงการประสูติ ตรัสรู้ และปรินิพพานของพระพุทธเจ้า",
    },
  },
  {
    id: "lent-2025",
    name: "เข้าพรรษา",
    nameEn: "Buddhist Lent",
    nameTh: "วันเข้าพรรษา",
    date: "2025-07-13",
    type: "religious",
    significance: "high",
    financialImpact: {
      spendingIncrease: -15,
      categories: [
        "Reduced Entertainment",
        "Mindful Spending",
        "Meditation Retreats",
      ],
      budgetRecommendation:
        "Focus on savings and mindful consumption during this period",
    },
    traditions: [
      "Monks retreat to temples",
      "Reduced social activities",
      "Increased meditation practice",
      "Traditional candle offerings",
    ],
    modernPractices: [
      "Digital detox periods",
      "Mindfulness apps usage",
      "Sustainable living practices",
      "Reduced consumption habits",
    ],
    icon: "🧘",
    color: "#8B5CF6",
    description: {
      en: "Three-month Buddhist retreat period emphasizing mindfulness and restraint",
      th: "ระยะเวลาพรรษา 3 เดือนที่เน้นการมีสติและความประมาณตน",
    },
  },
  {
    id: "loy-krathong-2025",
    name: "ลอยกระทง",
    nameEn: "Loy Krathong",
    nameTh: "เทศกาลลอยกระทง",
    date: "2025-11-05",
    type: "cultural",
    significance: "high",
    financialImpact: {
      spendingIncrease: 30,
      categories: [
        "Festival Materials",
        "Travel",
        "Food & Dining",
        "Photography",
      ],
      budgetRecommendation: "Budget ฿8,000-12,000 for festival celebrations",
    },
    traditions: [
      "Floating decorated baskets",
      "Making wishes and prayers",
      "Traditional Thai performances",
      "Riverside celebrations",
    ],
    modernPractices: [
      "Eco-friendly krathongs",
      "Social media photo sharing",
      "Hotel packages and events",
      "Modern light festivals",
    ],
    icon: "🏮",
    color: "#EC4899",
    description: {
      en: "Festival of lights celebrating the end of rainy season with floating offerings",
      th: "เทศกาลแห่งแสงไฟฉลองการสิ้นสุดฤดูฝนด้วยการลอยกระทง",
    },
  },
  {
    id: "new-year-2025",
    name: "ปีใหม่",
    nameEn: "New Year",
    nameTh: "เทศกาลปีใหม่",
    date: "2025-01-01",
    type: "national",
    significance: "high",
    financialImpact: {
      spendingIncrease: 60,
      categories: [
        "Gifts",
        "Travel",
        "Celebrations",
        "Resolutions",
        "Shopping",
      ],
      budgetRecommendation: "Plan ฿20,000-35,000 for holiday season expenses",
    },
    traditions: [
      "Family gatherings",
      "Gift giving",
      "New Year resolutions",
      "Temple visits for blessings",
    ],
    modernPractices: [
      "Countdown celebrations",
      "Shopping mall events",
      "Social media posts",
      "Fitness and wellness goals",
    ],
    icon: "🎊",
    color: "#10B981",
    description: {
      en: "International New Year celebration with Thai cultural elements",
      th: "การเฉลิมฉลองปีใหม่สากลผสมผสานวัฒนธรรมไทย",
    },
  },
];

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

// Event Card Component
function CulturalEventCard({
  event,
  onClick,
  isSelected = false,
}: {
  event: ThaiCulturalEvent;
  onClick?: () => void;
  isSelected?: boolean;
}) {
  const { language } = useTranslation();
  // const { themeMode } = useTheme();

  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  const daysUntil = isUpcoming
    ? Math.ceil(
        (eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
      )
    : 0;

  return (
    <motion.div
      className={cn(
        "cursor-pointer transition-all duration-300",
        isSelected && "scale-105",
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
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
                backgroundColor: `${event.color}20`,
                color: event.color,
              }}
            >
              {event.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {language === "th" ? event.nameTh : event.nameEn}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium capitalize",
                    event.type === "religious"
                      ? "bg-amber-500/20 text-amber-300"
                      : event.type === "cultural"
                        ? "bg-blue-500/20 text-blue-300"
                        : event.type === "national"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-purple-500/20 text-purple-300",
                  )}
                >
                  {event.type}
                </span>
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    event.significance === "high"
                      ? "bg-red-500/20 text-red-300"
                      : event.significance === "medium"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-gray-500/20 text-gray-300",
                  )}
                >
                  {event.significance} impact
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

        <ThemeAwareText color="secondary" className="text-sm mb-3 line-clamp-2">
          {language === "th" ? event.description.th : event.description.en}
        </ThemeAwareText>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Date:</span>
            <span className="font-medium">
              {formatThaiDate(eventDate, language === "th")}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Spending Impact:</span>
            <span
              className={cn(
                "font-medium flex items-center gap-1",
                event.financialImpact.spendingIncrease > 0
                  ? "text-red-300"
                  : event.financialImpact.spendingIncrease < 0
                    ? "text-green-300"
                    : "text-gray-300",
              )}
            >
              {event.financialImpact.spendingIncrease > 0
                ? "↗️"
                : event.financialImpact.spendingIncrease < 0
                  ? "↘️"
                  : "➡️"}
              {Math.abs(event.financialImpact.spendingIncrease)}%
            </span>
          </div>
        </div>

        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-700"
          >
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold mb-2 text-purple-300">
                  Financial Recommendation:
                </h4>
                <p className="text-sm text-gray-300">
                  {event.financialImpact.budgetRecommendation}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 text-blue-300">
                  Affected Categories:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {event.financialImpact.categories.map((category, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-700 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </ThemeAwareCard>
    </motion.div>
  );
}

export function ThaiCalendarIntegration({
  currentEvents: _currentEvents = [],
  upcomingEvents: _upcomingEvents = [],
  onEventSelect,
  showBuddhistEra = true,
  className = "",
}: ThaiCalendarIntegrationProps) {
  // const { language } = useTranslation();
  // const { themeMode } = useTheme();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"current" | "upcoming" | "all">(
    "upcoming",
  );

  // Get current and upcoming events
  const now = new Date();
  const allEvents = mockThaiEvents;

  const currentEventsData = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    const daysDiff = Math.abs(
      (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysDiff <= 7; // Within 7 days
  });

  const upcomingEventsData = allEvents
    .filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate > now;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const displayEvents =
    viewMode === "current"
      ? currentEventsData
      : viewMode === "upcoming"
        ? upcomingEventsData
        : allEvents;

  const handleEventSelect = (event: ThaiCulturalEvent) => {
    const newSelection = selectedEvent === event.id ? null : event.id;
    setSelectedEvent(newSelection);
    if (newSelection && onEventSelect) {
      onEventSelect(event);
    }
  };

  // Calculate total financial impact
  const totalImpact = useMemo(() => {
    const relevantEvents =
      viewMode === "current" ? currentEventsData : upcomingEventsData;
    return relevantEvents.reduce(
      (sum, event) => sum + event.financialImpact.spendingIncrease,
      0,
    );
  }, [viewMode, currentEventsData, upcomingEventsData]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading
          level="h2"
          className="text-2xl font-bold mb-2 flex items-center justify-center gap-2"
        >
          🇹🇭 Thai Cultural Calendar
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary" className="text-sm">
          {showBuddhistEra &&
            `Buddhist Era ${convertToBuddhistEra(new Date().getFullYear())} • `}
          Plan your finances around Thai cultural events
        </ThemeAwareText>
      </div>

      {/* View Mode Selector */}
      <div className="flex justify-center gap-2">
        {(["current", "upcoming", "all"] as const).map((mode) => (
          <ThemeAwareButton
            key={mode}
            variant={viewMode === mode ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewMode(mode)}
            className="capitalize"
          >
            {mode === "current"
              ? `Current (${currentEventsData.length})`
              : mode === "upcoming"
                ? `Upcoming (${upcomingEventsData.length})`
                : `All (${allEvents.length})`}
          </ThemeAwareButton>
        ))}
      </div>

      {/* Financial Impact Summary */}
      {viewMode !== "all" && (
        <ThemeAwareCard className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
          <div className="text-center">
            <h3 className="font-semibold text-purple-300 mb-2">
              📊 Expected Financial Impact
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div
                  className={cn(
                    "text-2xl font-bold",
                    totalImpact > 0
                      ? "text-red-400"
                      : totalImpact < 0
                        ? "text-green-400"
                        : "text-gray-400",
                  )}
                >
                  {totalImpact > 0 ? "+" : ""}
                  {totalImpact}%
                </div>
                <div className="text-sm text-gray-400">Spending Change</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {displayEvents.length}
                </div>
                <div className="text-sm text-gray-400">Events</div>
              </div>
            </div>
          </div>
        </ThemeAwareCard>
      )}

      {/* Events List */}
      <div className="space-y-4">
        <AnimatePresence>
          {displayEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CulturalEventCard
                event={event}
                onClick={() => handleEventSelect(event)}
                isSelected={selectedEvent === event.id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {displayEvents.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🗓️</div>
          <ThemeAwareText color="secondary">
            No events found for the selected period
          </ThemeAwareText>
        </div>
      )}
    </div>
  );
}
