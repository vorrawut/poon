// Thai Cultural Financial Features Types

export interface ThaiCulturalCategory {
  id: string;
  name: {
    en: string;
    th: string;
  };
  description: {
    en: string;
    th: string;
  };
  icon: string;
  color: string;
  culturalContext: string;
  keywords: {
    en: string[];
    th: string[];
  };
  subcategories: {
    id: string;
    name: {
      en: string;
      th: string;
    };
  }[];
}

export interface ThaiHoliday {
  id: string;
  name: {
    en: string;
    th: string;
  };
  date: string; // Buddhist calendar date
  gregorianDate: string;
  type: 'religious' | 'royal' | 'cultural' | 'seasonal';
  significance: {
    en: string;
    th: string;
  };
  traditionalExpenses: string[];
  budgetSuggestion: {
    min: number;
    max: number;
    currency: 'THB';
  };
}

export interface MeritMakingActivity {
  id: string;
  name: {
    en: string;
    th: string;
  };
  type: 'temple_donation' | 'monk_offering' | 'charity' | 'merit_transfer';
  frequency: 'daily' | 'weekly' | 'monthly' | 'special_occasion';
  suggestedAmount: {
    min: number;
    max: number;
    currency: 'THB';
  };
  description: {
    en: string;
    th: string;
  };
  icon: string;
}

export interface FamilyObligation {
  id: string;
  name: {
    en: string;
    th: string;
  };
  type: 'parents_support' | 'siblings_support' | 'extended_family' | 'education_support';
  priority: 'essential' | 'important' | 'optional';
  frequency: 'monthly' | 'quarterly' | 'annual' | 'as_needed';
  culturalImportance: {
    en: string;
    th: string;
  };
  icon: string;
}

export interface ThaiNumberFormat {
  groupSeparator: string; // ','
  decimalSeparator: string; // '.'
  currencySymbol: string; // '฿'
  currencyPosition: 'before' | 'after';
  thousandUnit: {
    en: string; // 'K'
    th: string; // 'พัน'
  };
  millionUnit: {
    en: string; // 'M'
    th: string; // 'ล้าน'
  };
}

export interface BuddhistDate {
  buddhistYear: number;
  gregorianYear: number;
  month: number;
  day: number;
  monthName: {
    en: string;
    th: string;
  };
}

export interface ThaiCulturalInsight {
  id: string;
  title: {
    en: string;
    th: string;
  };
  content: {
    en: string;
    th: string;
  };
  category: 'spending_wisdom' | 'cultural_tip' | 'festival_planning' | 'family_finance';
  relevantSeason?: 'hot' | 'rainy' | 'cool';
  relevantHoliday?: string; // ThaiHoliday id
  icon: string;
  priority: 'high' | 'medium' | 'low';
}
