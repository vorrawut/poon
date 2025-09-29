// Thai Culture Service - Buddhist Calendar and Cultural Financial Services
import type { ThaiCulturalEvent } from '../components/ThaiCalendarIntegration';
import type { FamilyObligation } from '../components/FamilyObligationTracker';
import type { MeritMakingActivity } from '../components/MeritMakingBudget';
import type { ThaiFestival } from '../components/FestivalSpendingPlanner';

// Buddhist Era Conversion
export const convertToBuddhistEra = (gregorianYear: number): number => {
  return gregorianYear + 543;
};

export const convertFromBuddhistEra = (buddhistYear: number): number => {
  return buddhistYear - 543;
};

// Thai Date Formatting
export const formatThaiDate = (date: Date, includeBuddhistEra: boolean = true): string => {
  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = includeBuddhistEra ? convertToBuddhistEra(date.getFullYear()) : date.getFullYear();
  
  return `${day} ${month} ${year}`;
};

// Thai Number Formatting
export const formatThaiCurrency = (amount: number): string => {
  return `฿${amount.toLocaleString('th-TH')}`;
};

// Cultural Financial Calculations
export const calculateFamilyObligationBudget = (
  monthlyIncome: number,
  familySize: number,
  hasElderlyParents: boolean
): {
  recommended: number;
  minimum: number;
  maximum: number;
  breakdown: Record<string, number>;
} => {
  // Thai cultural guideline: 15-25% for family obligations
  const basePercentage = 0.15;
  const maxPercentage = 0.25;
  
  // Adjust based on family circumstances
  let adjustedPercentage = basePercentage;
  
  if (hasElderlyParents) {
    adjustedPercentage += 0.05; // Additional 5% for elderly parents
  }
  
  if (familySize > 4) {
    adjustedPercentage += 0.03; // Additional 3% for larger families
  }
  
  const recommended = monthlyIncome * Math.min(adjustedPercentage, maxPercentage);
  const minimum = monthlyIncome * 0.10;
  const maximum = monthlyIncome * 0.30;
  
  const breakdown = {
    parents: recommended * 0.60, // 60% for parents
    extended: recommended * 0.25, // 25% for extended family
    community: recommended * 0.15, // 15% for community/temple
  };
  
  return {
    recommended,
    minimum,
    maximum,
    breakdown
  };
};

export const calculateMeritMakingBudget = (
  monthlyIncome: number,
  religiosity: 'low' | 'medium' | 'high' = 'medium'
): {
  recommended: number;
  breakdown: Record<string, number>;
} => {
  // Thai cultural guideline: 3-7% for merit making
  const percentages = {
    low: 0.03,
    medium: 0.05,
    high: 0.07
  };
  
  const totalBudget = monthlyIncome * percentages[religiosity];
  
  const breakdown = {
    temple_monthly: totalBudget * 0.40, // 40% for regular temple donations
    monk_alms: totalBudget * 0.20, // 20% for daily/weekly alms
    charity: totalBudget * 0.25, // 25% for charitable giving
    festivals: totalBudget * 0.15, // 15% for special festivals
  };
  
  return {
    recommended: totalBudget,
    breakdown
  };
};

// Festival Budget Calculations
export const calculateFestivalBudget = (
  monthlyIncome: number,
  familySize: number
): Record<string, number> => {
  // Base festival budget: 2-4% of annual income per major festival
  const annualIncome = monthlyIncome * 12;
  const baseFestivalBudget = annualIncome * 0.025; // 2.5% base
  
  // Adjust for family size
  const familyMultiplier = 1 + (familySize - 1) * 0.3;
  const adjustedBudget = baseFestivalBudget * familyMultiplier;
  
  return {
    songkran: adjustedBudget * 1.5, // Songkran is the biggest festival
    loy_krathong: adjustedBudget * 0.8,
    vesak: adjustedBudget * 0.6,
    new_year: adjustedBudget * 1.2,
    lent: adjustedBudget * 0.4, // Buddhist Lent has lower spending
  };
};

// Cultural Spending Categories
export const thaiCulturalCategories = [
  {
    id: 'family_support',
    name: { en: 'Family Support', th: 'การช่วยเหลือครอบครัว' },
    subcategories: [
      { id: 'parent_allowance', name: { en: 'Parent Allowance', th: 'เงินเลี้ยงดูพ่อแม่' } },
      { id: 'elderly_care', name: { en: 'Elderly Care', th: 'การดูแลผู้สูงอายุ' } },
      { id: 'education_support', name: { en: 'Education Support', th: 'สนับสนุนการศึกษา' } },
      { id: 'healthcare_family', name: { en: 'Family Healthcare', th: 'ค่ารักษาพยาบาลครอบครัว' } }
    ]
  },
  {
    id: 'merit_making',
    name: { en: 'Merit Making', th: 'การทำบุญ' },
    subcategories: [
      { id: 'temple_donation', name: { en: 'Temple Donation', th: 'การบริจาควัด' } },
      { id: 'monk_offering', name: { en: 'Monk Offering', th: 'การใส่บาตร' } },
      { id: 'charity', name: { en: 'Charity', th: 'การกุศล' } },
      { id: 'religious_ceremony', name: { en: 'Religious Ceremony', th: 'พิธีทางศาสนา' } }
    ]
  },
  {
    id: 'cultural_festivals',
    name: { en: 'Cultural Festivals', th: 'เทศกาลวัฒนธรรม' },
    subcategories: [
      { id: 'songkran', name: { en: 'Songkran', th: 'สงกรานต์' } },
      { id: 'loy_krathong', name: { en: 'Loy Krathong', th: 'ลอยกระทง' } },
      { id: 'vesak_day', name: { en: 'Vesak Day', th: 'วันวิสาขบูชา' } },
      { id: 'buddhist_lent', name: { en: 'Buddhist Lent', th: 'เข้าพรรษา' } }
    ]
  },
  {
    id: 'traditional_ceremonies',
    name: { en: 'Traditional Ceremonies', th: 'พิธีกรรมประเพณี' },
    subcategories: [
      { id: 'wedding', name: { en: 'Wedding Ceremony', th: 'งานแต่งงาน' } },
      { id: 'funeral', name: { en: 'Funeral Ceremony', th: 'งานศพ' } },
      { id: 'ordination', name: { en: 'Ordination', th: 'บวช' } },
      { id: 'housewarming', name: { en: 'Housewarming', th: 'ขึ้นบ้านใหม่' } }
    ]
  }
];

// Cultural Insights and Recommendations
export const getCulturalSpendingInsights = (
  spendingData: Record<string, number>,
  monthlyIncome: number
): {
  insights: Array<{ type: 'positive' | 'warning' | 'suggestion'; message: { en: string; th: string } }>;
  culturalScore: number; // 0-100 score of cultural adherence
} => {
  const insights: Array<{ type: 'positive' | 'warning' | 'suggestion'; message: { en: string; th: string } }> = [];
  
  const familySupport = spendingData.family_support || 0;
  const meritMaking = spendingData.merit_making || 0;
  const festivals = spendingData.cultural_festivals || 0;
  
  const familySupportPercentage = (familySupport / monthlyIncome) * 100;
  const meritMakingPercentage = (meritMaking / monthlyIncome) * 100;
  
  let culturalScore = 50; // Base score
  
  // Family Support Analysis
  if (familySupportPercentage >= 15) {
    insights.push({
      type: 'positive',
      message: {
        en: 'Excellent! Your family support spending reflects strong กตัญญู (gratitude) values.',
        th: 'ดีเยี่ยม! การใช้จ่ายเพื่อครอบครัวสะท้อนคุณค่าความกตัญญูที่แข็งแกร่ง'
      }
    });
    culturalScore += 20;
  } else if (familySupportPercentage < 10) {
    insights.push({
      type: 'suggestion',
      message: {
        en: 'Consider increasing family support to align with Thai cultural values of caring for parents.',
        th: 'ควรพิจารณาเพิ่มการสนับสนุนครอบครัวให้สอดคล้องกับค่านิยมไทยในการดูแลบิดามารดา'
      }
    });
    culturalScore -= 10;
  }
  
  // Merit Making Analysis
  if (meritMakingPercentage >= 5) {
    insights.push({
      type: 'positive',
      message: {
        en: 'Your merit-making activities show good Buddhist practice and community support.',
        th: 'กิจกรรมการทำบุญของคุณแสดงการปฏิบัติธรรมและการสนับสนุนชุมชนที่ดี'
      }
    });
    culturalScore += 15;
  } else if (meritMakingPercentage < 3) {
    insights.push({
      type: 'suggestion',
      message: {
        en: 'Regular merit-making through temple donations and charity can bring spiritual benefits.',
        th: 'การทำบุญสม่ำเสมอผ่านการบริจาควัดและการกุศลจะนำมาซึ่งผลประโยชน์ทางจิตวิญญาณ'
      }
    });
  }
  
  // Festival Participation
  if (festivals > 0) {
    insights.push({
      type: 'positive',
      message: {
        en: 'Great! Participating in cultural festivals helps preserve Thai traditions.',
        th: 'ยอดเยี่ยม! การเข้าร่วมเทศกาลวัฒนธรรมช่วยอนุรักษ์ประเพณีไทย'
      }
    });
    culturalScore += 10;
  }
  
  // Overall Balance Warning
  const totalCulturalSpending = familySupport + meritMaking + festivals;
  const culturalPercentage = (totalCulturalSpending / monthlyIncome) * 100;
  
  if (culturalPercentage > 35) {
    insights.push({
      type: 'warning',
      message: {
        en: 'Cultural spending is quite high. Ensure you maintain balance with personal savings.',
        th: 'การใช้จ่ายทางวัฒนธรรมค่อนข้างสูง ควรรักษาสมดุลกับการออมส่วนตัว'
      }
    });
    culturalScore -= 5;
  }
  
  return {
    insights,
    culturalScore: Math.max(0, Math.min(100, culturalScore))
  };
};

// Thai Culture Service Class
class ThaiCultureService {
  // Get upcoming cultural events
  async getUpcomingEvents(): Promise<ThaiCulturalEvent[]> {
    // In a real app, this would fetch from an API
    // For now, return mock data
    return [];
  }
  
  // Get family obligations
  async getFamilyObligations(): Promise<FamilyObligation[]> {
    // In a real app, this would fetch from an API
    return [];
  }
  
  // Get merit making activities
  async getMeritMakingActivities(): Promise<MeritMakingActivity[]> {
    // In a real app, this would fetch from an API
    return [];
  }
  
  // Get festival data
  async getFestivals(): Promise<ThaiFestival[]> {
    // In a real app, this would fetch from an API
    return [];
  }
  
  // Calculate cultural financial recommendations
  async getCulturalFinancialRecommendations(
    monthlyIncome: number,
    familyProfile: {
      size: number;
      hasElderlyParents: boolean;
      religiosity: 'low' | 'medium' | 'high';
    }
  ) {
    const familyBudget = calculateFamilyObligationBudget(
      monthlyIncome,
      familyProfile.size,
      familyProfile.hasElderlyParents
    );
    
    const meritBudget = calculateMeritMakingBudget(
      monthlyIncome,
      familyProfile.religiosity
    );
    
    const festivalBudgets = calculateFestivalBudget(
      monthlyIncome,
      familyProfile.size
    );
    
    return {
      familyObligations: familyBudget,
      meritMaking: meritBudget,
      festivals: festivalBudgets,
      totalRecommended: familyBudget.recommended + meritBudget.recommended,
      culturalCategories: thaiCulturalCategories
    };
  }
}

export const thaiCultureService = new ThaiCultureService();
