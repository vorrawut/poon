import { useState } from "react";
import { motion } from "framer-motion";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
} from "../../../core";
import { useTranslation } from "../../../libs/i18n";
import { cn } from "../../../libs/utils";

// Merit Making Activities
export interface MeritMakingActivity {
  id: string;
  type:
    | "temple_donation"
    | "monk_offering"
    | "charity"
    | "festival"
    | "ceremony";
  name: {
    en: string;
    th: string;
  };
  description: {
    en: string;
    th: string;
  };
  suggestedAmount: {
    min: number;
    max: number;
    recommended: number;
  };
  frequency: "daily" | "weekly" | "monthly" | "seasonal" | "occasional";
  meritLevel: "high" | "medium" | "low";
  icon: string;
  color: string;
  culturalSignificance: {
    en: string;
    th: string;
  };
}

export interface MeritMakingBudgetProps {
  activities?: MeritMakingActivity[];
  monthlyBudget?: number;
  onBudgetUpdate?: (budget: number) => void;
  className?: string;
}

// Mock Merit Making Activities
const mockMeritActivities: MeritMakingActivity[] = [
  {
    id: "temple-monthly",
    type: "temple_donation",
    name: {
      en: "Monthly Temple Donation",
      th: "การบริจาควัดประจำเดือน",
    },
    description: {
      en: "Regular monthly donation to support temple operations and monks",
      th: "การบริจาคประจำเดือนเพื่อสนับสนุนกิจกรรมวัดและพระสงฆ์",
    },
    suggestedAmount: {
      min: 1000,
      max: 10000,
      recommended: 3000,
    },
    frequency: "monthly",
    meritLevel: "high",
    icon: "🏛️",
    color: "#F59E0B",
    culturalSignificance: {
      en: "Supports Buddhist community and earns continuous merit",
      th: "สนับสนุนชุมชนพุทธและได้บุญอย่างต่อเนื่อง",
    },
  },
  {
    id: "monk-alms",
    type: "monk_offering",
    name: {
      en: "Monk Alms Offering",
      th: "การใส่บาตร",
    },
    description: {
      en: "Daily or weekly alms offering to monks during morning rounds",
      th: "การใส่บาตรพระสงฆ์ในตอนเช้าประจำวันหรือสัปดาห์",
    },
    suggestedAmount: {
      min: 20,
      max: 100,
      recommended: 50,
    },
    frequency: "weekly",
    meritLevel: "high",
    icon: "🍚",
    color: "#10B981",
    culturalSignificance: {
      en: "Direct support to monks and traditional Buddhist practice",
      th: "การสนับสนุนพระสงฆ์โดยตรงและปฏิบัติตามประเพณีพุทธ",
    },
  },
  {
    id: "charity-donation",
    type: "charity",
    name: {
      en: "Charity Donation",
      th: "การบริจาคการกุศล",
    },
    description: {
      en: "Donations to charitable organizations and community causes",
      th: "การบริจาคให้องค์กรการกุศลและกิจกรรมชุมชน",
    },
    suggestedAmount: {
      min: 500,
      max: 5000,
      recommended: 2000,
    },
    frequency: "monthly",
    meritLevel: "medium",
    icon: "❤️",
    color: "#EC4899",
    culturalSignificance: {
      en: "Helps those in need and builds compassionate karma",
      th: "ช่วยเหลือผู้ที่ต้องการและสร้างกรรมแห่งความเมตตา",
    },
  },
  {
    id: "festival-offering",
    type: "festival",
    name: {
      en: "Festival Offerings",
      th: "การถวายในเทศกาล",
    },
    description: {
      en: "Special offerings during Buddhist festivals and holy days",
      th: "การถวายพิเศษในเทศกาลทางพุทธศาสนาและวันสำคัญ",
    },
    suggestedAmount: {
      min: 1000,
      max: 15000,
      recommended: 5000,
    },
    frequency: "seasonal",
    meritLevel: "high",
    icon: "🎋",
    color: "#8B5CF6",
    culturalSignificance: {
      en: "Participates in community celebrations and earns special merit",
      th: "เข้าร่วมการเฉลิมฉลองชุมชนและได้บุญพิเศษ",
    },
  },
  {
    id: "ceremony-sponsorship",
    type: "ceremony",
    name: {
      en: "Ceremony Sponsorship",
      th: "การสนับสนุนพิธีกรรม",
    },
    description: {
      en: "Sponsoring religious ceremonies, ordinations, or temple events",
      th: "การสนับสนุนพิธีทางศาสนา บวช หรืองานวัด",
    },
    suggestedAmount: {
      min: 5000,
      max: 50000,
      recommended: 15000,
    },
    frequency: "occasional",
    meritLevel: "high",
    icon: "🕯️",
    color: "#EF4444",
    culturalSignificance: {
      en: "Major merit-making opportunity with lasting spiritual benefits",
      th: "โอกาสทำบุญใหญ่ที่มีผลทางจิตวิญญาณยาวนาน",
    },
  },
];

// Activity Card Component
function MeritActivityCard({
  activity,
  isSelected = false,
  onSelect,
  allocatedAmount = 0,
}: {
  activity: MeritMakingActivity;
  isSelected?: boolean;
  onSelect?: () => void;
  allocatedAmount?: number;
}) {
  const { language } = useTranslation();

  const isAllocated = allocatedAmount > 0;
  const isWithinRange =
    allocatedAmount >= activity.suggestedAmount.min &&
    allocatedAmount <= activity.suggestedAmount.max;

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
          isAllocated && "bg-green-500/5 border-green-500/20",
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="text-2xl p-2 rounded-full"
              style={{
                backgroundColor: `${activity.color}20`,
                color: activity.color,
              }}
            >
              {activity.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {language === "th" ? activity.name.th : activity.name.en}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium capitalize",
                    activity.meritLevel === "high"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : activity.meritLevel === "medium"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-gray-500/20 text-gray-300",
                  )}
                >
                  {activity.meritLevel} merit
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300 capitalize">
                  {activity.frequency}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            {isAllocated ? (
              <div>
                <div
                  className={cn(
                    "text-lg font-bold",
                    isWithinRange ? "text-green-300" : "text-yellow-300",
                  )}
                >
                  ฿{allocatedAmount.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">allocated</div>
              </div>
            ) : (
              <div>
                <div className="text-lg font-bold text-purple-300">
                  ฿{activity.suggestedAmount.recommended.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">suggested</div>
              </div>
            )}
          </div>
        </div>

        <ThemeAwareText color="secondary" className="text-sm mb-3 line-clamp-2">
          {language === "th"
            ? activity.description.th
            : activity.description.en}
        </ThemeAwareText>

        <div className="text-xs text-gray-400 italic">
          {language === "th"
            ? activity.culturalSignificance.th
            : activity.culturalSignificance.en}
        </div>

        {/* Suggested Range */}
        <div className="mt-3 p-2 bg-gray-800/50 rounded text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Suggested Range:</span>
            <span className="text-white">
              ฿{activity.suggestedAmount.min.toLocaleString()} - ฿
              {activity.suggestedAmount.max.toLocaleString()}
            </span>
          </div>
        </div>
      </ThemeAwareCard>
    </motion.div>
  );
}

export function MeritMakingBudget({
  activities = mockMeritActivities,
  monthlyBudget = 10000,
  onBudgetUpdate: _onBudgetUpdate,
  className = "",
}: MeritMakingBudgetProps) {
  const { language: _language } = useTranslation();
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [allocations, setAllocations] = useState<Record<string, number>>({});

  // Calculate totals
  const totalAllocated = Object.values(allocations).reduce(
    (sum, amount) => sum + amount,
    0,
  );
  const remainingBudget = monthlyBudget - totalAllocated;
  const recommendedTotal = activities.reduce((sum, activity) => {
    if (activity.frequency === "monthly")
      return sum + activity.suggestedAmount.recommended;
    if (activity.frequency === "weekly")
      return sum + activity.suggestedAmount.recommended * 4;
    if (activity.frequency === "seasonal")
      return sum + activity.suggestedAmount.recommended / 3;
    return sum;
  }, 0);

  const handleActivitySelect = (activityId: string) => {
    setSelectedActivity(selectedActivity === activityId ? null : activityId);
  };

  const handleQuickAllocate = (activityId: string, amount: number) => {
    setAllocations((prev) => ({
      ...prev,
      [activityId]: amount,
    }));
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading
          level="h2"
          className="text-2xl font-bold mb-2 flex items-center justify-center gap-2"
        >
          🙏 Merit Making Budget
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary" className="text-sm">
          Plan your Buddhist charitable giving and temple donations
        </ThemeAwareText>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ThemeAwareCard className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">
            ฿{monthlyBudget.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Monthly Budget</div>
        </ThemeAwareCard>

        <ThemeAwareCard className="p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            ฿{totalAllocated.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Allocated</div>
        </ThemeAwareCard>

        <ThemeAwareCard className="p-4 text-center">
          <div
            className={cn(
              "text-2xl font-bold",
              remainingBudget >= 0 ? "text-purple-400" : "text-red-400",
            )}
          >
            ฿{remainingBudget.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Remaining</div>
        </ThemeAwareCard>
      </div>

      {/* Recommended vs Current */}
      <ThemeAwareCard className="p-4 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-yellow-300 mb-1">
              📊 Budget Comparison
            </h3>
            <p className="text-sm text-gray-300">
              Recommended monthly merit-making budget based on traditional
              practices
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-yellow-400">
              ฿{recommendedTotal.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Recommended</div>
          </div>
        </div>
      </ThemeAwareCard>

      {/* Activities List */}
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MeritActivityCard
              activity={activity}
              isSelected={selectedActivity === activity.id}
              onSelect={() => handleActivitySelect(activity.id)}
              allocatedAmount={allocations[activity.id] || 0}
            />

            {/* Quick Allocation Buttons */}
            {selectedActivity === activity.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <h4 className="text-sm font-semibold mb-3 text-purple-300">
                  Quick Allocate:
                </h4>
                <div className="flex gap-2 flex-wrap">
                  <ThemeAwareButton
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleQuickAllocate(
                        activity.id,
                        activity.suggestedAmount.min,
                      )
                    }
                  >
                    Min ฿{activity.suggestedAmount.min.toLocaleString()}
                  </ThemeAwareButton>
                  <ThemeAwareButton
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      handleQuickAllocate(
                        activity.id,
                        activity.suggestedAmount.recommended,
                      )
                    }
                  >
                    Recommended ฿
                    {activity.suggestedAmount.recommended.toLocaleString()}
                  </ThemeAwareButton>
                  <ThemeAwareButton
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleQuickAllocate(
                        activity.id,
                        activity.suggestedAmount.max,
                      )
                    }
                  >
                    Max ฿{activity.suggestedAmount.max.toLocaleString()}
                  </ThemeAwareButton>
                  <ThemeAwareButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickAllocate(activity.id, 0)}
                    className="text-red-400"
                  >
                    Clear
                  </ThemeAwareButton>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Cultural Guidance */}
      <ThemeAwareCard className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
        <h3 className="font-semibold text-amber-300 mb-2">
          📿 Merit Making Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-white mb-2">
              Traditional Practice:
            </h4>
            <ul className="text-gray-400 space-y-1">
              <li>
                • Regular giving is more beneficial than large occasional
                donations
              </li>
              <li>• Morning alms (ใส่บาตร) brings daily merit</li>
              <li>• Temple support maintains Buddhist community</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">Modern Approach:</h4>
            <ul className="text-gray-400 space-y-1">
              <li>• Budget 3-5% of income for merit making</li>
              <li>• Use digital payments for convenience</li>
              <li>• Track donations for tax deductions</li>
            </ul>
          </div>
        </div>
      </ThemeAwareCard>
    </div>
  );
}
