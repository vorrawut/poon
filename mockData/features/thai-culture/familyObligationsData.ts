// Family Obligations Data
export interface FamilyObligation {
  id: string;
  type: "monthly_support" | "special_occasion" | "medical" | "education" | "ceremony";
  title: {
    en: string;
    th: string;
  };
  recipient: string;
  amount: number;
  frequency: "monthly" | "yearly" | "one_time" | "as_needed";
  priority: "high" | "medium" | "low";
  culturalSignificance: {
    en: string;
    th: string;
  };
  nextDue?: Date;
  isActive: boolean;
  notes?: string;
}

export const mockObligations: FamilyObligation[] = [
  {
    id: "monthly-parents",
    type: "monthly_support",
    title: {
      en: "Monthly Support for Parents",
      th: "เงินเลี้ยงดูพ่อแม่รายเดือน"
    },
    recipient: "Parents",
    amount: 8000,
    frequency: "monthly",
    priority: "high",
    culturalSignificance: {
      en: "Katanyu Katavedita - Gratitude to parents who raised us",
      th: "กตัญญูกตเวทิตา - ความกตัญญูต่อพ่อแม่ที่เลี้ยงดูเรา"
    },
    nextDue: new Date(2025, 0, 1),
    isActive: true,
    notes: "Regular monthly support as part of cultural duty"
  },
  {
    id: "grandparents-medical",
    type: "medical",
    title: {
      en: "Grandparents Medical Fund",
      th: "กองทุนค่ารักษาพยาบาลปู่ย่าตายาย"
    },
    recipient: "Grandparents",
    amount: 5000,
    frequency: "as_needed",
    priority: "high",
    culturalSignificance: {
      en: "Taking care of elderly family members is a core Thai value",
      th: "การดูแลสมาชิกครอบครัวผู้สูงอายุเป็นค่านิยมหลักของไทย"
    },
    isActive: true,
    notes: "Emergency fund for medical expenses"
  },
  {
    id: "sibling-education",
    type: "education",
    title: {
      en: "Younger Sibling University Tuition",
      th: "ค่าเทอมมหาวิทยาลัยน้องสาว"
    },
    recipient: "Younger Sister",
    amount: 15000,
    frequency: "yearly",
    priority: "medium",
    culturalSignificance: {
      en: "Supporting family education for better future opportunities",
      th: "สนับสนุนการศึกษาครอบครัวเพื่อโอกาสที่ดีกว่าในอนาคต"
    },
    nextDue: new Date(2025, 4, 15),
    isActive: true,
    notes: "Annual tuition payment for university"
  }
];
