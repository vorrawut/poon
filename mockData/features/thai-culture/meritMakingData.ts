// Merit Making Activities Data
export interface MeritMakingActivity {
  id: string;
  name: {
    en: string;
    th: string;
  };
  type: "temple_donation" | "monk_offering" | "charity" | "ceremony" | "volunteer";
  suggestedAmount: {
    min: number;
    recommended: number;
    max: number;
  };
  frequency: "daily" | "weekly" | "monthly" | "special_occasions" | "annual";
  spiritualBenefit: {
    en: string;
    th: string;
  };
  culturalContext: {
    en: string;
    th: string;
  };
  bestTiming: string[];
  isActive: boolean;
}

export const mockMeritActivities: MeritMakingActivity[] = [
  {
    id: "morning-alms",
    name: {
      en: "Morning Alms Offering",
      th: "ใส่บาตรตอนเช้า"
    },
    type: "monk_offering",
    suggestedAmount: {
      min: 20,
      recommended: 50,
      max: 100
    },
    frequency: "daily",
    spiritualBenefit: {
      en: "Daily merit accumulation and spiritual mindfulness",
      th: "การสะสมบุญประจำวันและการมีสติทางจิตวิญญาณ"
    },
    culturalContext: {
      en: "Traditional Buddhist practice of offering food to monks",
      th: "ประเพณีพุทธที่ถวายอาหารแด่พระสงฆ์"
    },
    bestTiming: ["6:00 AM - 8:00 AM", "Early morning before work"],
    isActive: true
  },
  {
    id: "temple-donation",
    name: {
      en: "Temple Monthly Donation",
      th: "บริจาควัดรายเดือน"
    },
    type: "temple_donation",
    suggestedAmount: {
      min: 100,
      recommended: 500,
      max: 2000
    },
    frequency: "monthly",
    spiritualBenefit: {
      en: "Supporting Buddhist community and temple maintenance",
      th: "สนับสนุนชุมชนพุทธและการบำรุงรักษาวัด"
    },
    culturalContext: {
      en: "Monthly contribution to local temple for community welfare",
      th: "การบริจาครายเดือนให้วัดท้องถิ่นเพื่อสวัสดิการชุมชน"
    },
    bestTiming: ["Buddhist holy days", "Beginning of each month"],
    isActive: true
  },
  {
    id: "charity-donation",
    name: {
      en: "Charity for the Poor",
      th: "บริจาคเพื่อผู้ยากไร้"
    },
    type: "charity",
    suggestedAmount: {
      min: 200,
      recommended: 1000,
      max: 5000
    },
    frequency: "monthly",
    spiritualBenefit: {
      en: "Developing compassion and reducing attachment to material wealth",
      th: "พัฒนาความเมตตาและลดการยึดติดกับความมั่งคั่งทางวัตถุ"
    },
    culturalContext: {
      en: "Helping those in need as part of Buddhist compassion practice",
      th: "ช่วยเหลือผู้ที่ต้องการความช่วยเหลือเป็นส่วนหนึ่งของการปฏิบัติเมตตาพุทธ"
    },
    bestTiming: ["End of Buddhist Lent", "New Year period", "Personal milestone celebrations"],
    isActive: true
  }
];
