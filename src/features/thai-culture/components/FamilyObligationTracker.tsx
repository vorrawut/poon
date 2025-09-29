import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ThemeAwareCard, 
  ThemeAwareText, 
  ThemeAwareButton,
  ThemeAwareHeading
} from "../../../core";
import { useTranslation } from "../../../libs/i18n";
import { cn } from "../../../libs/utils";

// Thai Family Financial Obligations
export interface FamilyObligation {
  id: string;
  type: "parents" | "siblings" | "children" | "extended" | "community";
  recipient: {
    name: string;
    relationship: string;
    relationshipTh: string;
  };
  amount: {
    budgeted: number;
    frequency: "monthly" | "quarterly" | "yearly";
  };
  priority: "essential" | "important" | "optional";
  description: {
    en: string;
    th: string;
  };
  nextDueDate?: string;
  isActive: boolean;
}

export interface FamilyObligationTrackerProps {
  obligations?: FamilyObligation[];
  onObligationUpdate?: (obligation: FamilyObligation) => void;
  className?: string;
}

// Mock Data
const mockObligations: FamilyObligation[] = [
  {
    id: "parents-support",
    type: "parents",
    recipient: {
      name: "คุณแม่ คุณพ่อ",
      relationship: "Parents",
      relationshipTh: "บิดามารดา"
    },
    amount: {
      budgeted: 15000,
      frequency: "monthly"
    },
    priority: "essential",
    description: {
      en: "Monthly financial support for parents (กตัญญู)",
      th: "การส่งเงินเลี้ยงดูบิดามารดา (กตัญญู)"
    },
    nextDueDate: "2025-01-01",
    isActive: true
  },
  {
    id: "temple-donations",
    type: "community",
    recipient: {
      name: "วัดป่าแสงธรรม",
      relationship: "Local Temple",
      relationshipTh: "วัดประจำ"
    },
    amount: {
      budgeted: 5000,
      frequency: "monthly"
    },
    priority: "important",
    description: {
      en: "Regular temple donations for merit making",
      th: "การบริจาควัดเพื่อทำบุญ"
    },
    nextDueDate: "2025-01-05",
    isActive: true
  }
];

export function FamilyObligationTracker({
  obligations = mockObligations,
  onObligationUpdate: _onObligationUpdate,
  className = "",
}: FamilyObligationTrackerProps) {
  const { language } = useTranslation();
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredObligations = obligations.filter(obligation => {
    if (selectedType === 'all') return true;
    return obligation.type === selectedType;
  });

  const totalMonthly = obligations
    .filter(o => o.isActive && o.amount.frequency === 'monthly')
    .reduce((sum, o) => sum + o.amount.budgeted, 0);

  const typeColors = {
    parents: "#F59E0B",
    siblings: "#3B82F6",
    children: "#10B981",
    extended: "#8B5CF6",
    community: "#EC4899"
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading level="h2" className="text-2xl font-bold mb-2">
          👨‍👩‍👧‍👦 Family Obligations
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary" className="text-sm">
          Thai cultural family financial responsibilities
        </ThemeAwareText>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <ThemeAwareCard className="p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            ฿{totalMonthly.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Monthly Total</div>
        </ThemeAwareCard>
        
        <ThemeAwareCard className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {obligations.filter(o => o.isActive).length}
          </div>
          <div className="text-sm text-gray-400">Active Obligations</div>
        </ThemeAwareCard>
      </div>

      {/* Type Filter */}
      <div className="flex gap-2 flex-wrap justify-center">
        {(['all', 'parents', 'community', 'extended'] as const).map((type) => (
          <ThemeAwareButton
            key={type}
            variant={selectedType === type ? "primary" : "ghost"}
            size="sm"
            onClick={() => setSelectedType(type)}
            className="capitalize"
          >
            {type === 'all' ? 'All' : type}
          </ThemeAwareButton>
        ))}
      </div>

      {/* Obligations List */}
      <div className="space-y-4">
        {filteredObligations.map((obligation, index) => (
          <motion.div
            key={obligation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ThemeAwareCard className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: typeColors[obligation.type] }}
                  />
                  <div>
                    <h3 className="font-semibold">
                      {language === 'th' ? obligation.recipient.relationshipTh : obligation.recipient.relationship}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {obligation.recipient.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {language === 'th' ? obligation.description.th : obligation.description.en}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-green-300">
                    ฿{obligation.amount.budgeted.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400 capitalize">
                    {obligation.amount.frequency}
                  </div>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium mt-2 inline-block",
                    obligation.priority === 'essential' ? 'bg-red-500/20 text-red-300' :
                    obligation.priority === 'important' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-gray-500/20 text-gray-300'
                  )}>
                    {obligation.priority}
                  </span>
                </div>
              </div>
            </ThemeAwareCard>
          </motion.div>
        ))}
      </div>

      {/* Cultural Guidance */}
      <ThemeAwareCard className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
        <h3 className="font-semibold text-amber-300 mb-2">
          🙏 กตัญญู (Katanyu) - Gratitude to Parents
        </h3>
        <p className="text-sm text-gray-300 mb-3">
          Supporting parents is one of the highest virtues in Thai culture, essential for good karma and family honor.
        </p>
        <ul className="text-sm text-gray-400 space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-1">•</span>
            <span>Allocate 10-20% of income for parent support</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 mt-1">•</span>
            <span>Regular contributions show consistent care and respect</span>
          </li>
        </ul>
      </ThemeAwareCard>
    </div>
  );
}