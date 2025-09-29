import type { ThaiHoliday } from '../types';

// Thai Holidays and Festivals with Financial Planning Context
export const THAI_HOLIDAYS: ThaiHoliday[] = [
  {
    id: 'songkran',
    name: {
      en: 'Songkran Festival',
      th: 'เทศกาลสงกรานต์'
    },
    date: '2567-04-13', // Buddhist year
    gregorianDate: '2024-04-13',
    type: 'cultural',
    significance: {
      en: 'Thai New Year - water festival celebrating renewal and respect for elders',
      th: 'วันปีใหม่ไทย - เทศกาลน้ำที่ฉลองการเริ่มต้นใหม่และการเคารพผู้ใหญ่'
    },
    traditionalExpenses: [
      'Water guns and equipment',
      'Travel to hometown',
      'Gifts for elders',
      'Food and drinks for celebrations',
      'New clothes',
      'Hotel accommodations'
    ],
    budgetSuggestion: {
      min: 5000,
      max: 25000,
      currency: 'THB'
    }
  },
  {
    id: 'loy_krathong',
    name: {
      en: 'Loy Krathong',
      th: 'ลอยกระทง'
    },
    date: '2567-11-15', // Buddhist year (varies by lunar calendar)
    gregorianDate: '2024-11-15',
    type: 'cultural',
    significance: {
      en: 'Festival of lights - floating lanterns to honor water spirits and Buddha',
      th: 'เทศกาลแห่งแสง - ลอยกระทงเพื่อเคารพเทพแห่งน้ำและพระพุทธเจ้า'
    },
    traditionalExpenses: [
      'Krathong materials',
      'Candles and incense',
      'Yi Peng lanterns',
      'Festival food',
      'Photography services',
      'Transportation to venues'
    ],
    budgetSuggestion: {
      min: 1000,
      max: 8000,
      currency: 'THB'
    }
  },
  {
    id: 'chinese_new_year',
    name: {
      en: 'Chinese New Year',
      th: 'ตรุษจีน'
    },
    date: '2567-02-10',
    gregorianDate: '2024-02-10',
    type: 'cultural',
    significance: {
      en: 'Celebration of lunar new year - important for Thai-Chinese community',
      th: 'การฉลองปีใหม่จันทรคติ - สำคัญสำหรับชุมชนไทยเชื้อสายจีน'
    },
    traditionalExpenses: [
      'Red envelopes (ang pao)',
      'Special foods and sweets',
      'New red clothing',
      'Family gatherings',
      'Temple visits',
      'Decorations'
    ],
    budgetSuggestion: {
      min: 3000,
      max: 15000,
      currency: 'THB'
    }
  },
  {
    id: 'vesak_day',
    name: {
      en: 'Vesak Day',
      th: 'วันวิสาขบูชา'
    },
    date: '2567-05-22',
    gregorianDate: '2024-05-22',
    type: 'religious',
    significance: {
      en: 'Buddha\'s birth, enlightenment, and death - most sacred Buddhist holiday',
      th: 'วันประสูติ ตรัสรู้ และปรินิพพานของพระพุทธเจ้า - วันสำคัญที่สุดทางพุทธศาสนา'
    },
    traditionalExpenses: [
      'Temple donations',
      'Monk offerings',
      'Merit-making activities',
      'Vegetarian food',
      'Flowers and candles',
      'Religious books'
    ],
    budgetSuggestion: {
      min: 500,
      max: 5000,
      currency: 'THB'
    }
  },
  {
    id: 'mothers_day',
    name: {
      en: 'Mother\'s Day',
      th: 'วันแม่แห่งชาติ'
    },
    date: '2567-08-12',
    gregorianDate: '2024-08-12',
    type: 'royal',
    significance: {
      en: 'Honoring Queen Sirikit and all mothers - showing gratitude to mothers',
      th: 'เทิดพระเกียรติสมเด็จพระนางเจ้าสิริกิติ์ และแม่ทุกคน - แสดงความกตัญญูต่อแม่'
    },
    traditionalExpenses: [
      'Jasmine flowers',
      'Gifts for mother',
      'Family dinner',
      'Mother\'s Day cards',
      'Jewelry or accessories',
      'Health check-up for mother'
    ],
    budgetSuggestion: {
      min: 1000,
      max: 10000,
      currency: 'THB'
    }
  },
  {
    id: 'fathers_day',
    name: {
      en: 'Father\'s Day',
      th: 'วันพ่อแห่งชาติ'
    },
    date: '2567-12-05',
    gregorianDate: '2024-12-05',
    type: 'royal',
    significance: {
      en: 'Honoring late King Bhumibol and all fathers - showing gratitude to fathers',
      th: 'เทิดพระเกียรติพระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช และพ่อทุกคน'
    },
    traditionalExpenses: [
      'Canna flowers',
      'Gifts for father',
      'Family gathering',
      'Father\'s Day cards',
      'Tools or hobby items',
      'Health check-up for father'
    ],
    budgetSuggestion: {
      min: 1000,
      max: 10000,
      currency: 'THB'
    }
  },
  {
    id: 'new_year',
    name: {
      en: 'New Year\'s Eve',
      th: 'วันสิ้นปี'
    },
    date: '2567-12-31',
    gregorianDate: '2024-12-31',
    type: 'cultural',
    significance: {
      en: 'Western New Year celebration - countdown parties and resolutions',
      th: 'การฉลองปีใหม่ตะวันตก - งานเคาท์ดาวน์และการตั้งเป้าหมายใหม่'
    },
    traditionalExpenses: [
      'Party tickets',
      'New Year outfits',
      'Fireworks viewing',
      'Countdown dinner',
      'Hotel reservations',
      'Transportation'
    ],
    budgetSuggestion: {
      min: 2000,
      max: 20000,
      currency: 'THB'
    }
  },
  {
    id: 'makha_bucha',
    name: {
      en: 'Makha Bucha Day',
      th: 'วันมาฆบูชา'
    },
    date: '2567-02-24',
    gregorianDate: '2024-02-24',
    type: 'religious',
    significance: {
      en: 'Commemoration of Buddha\'s first sermon to 1,250 disciples',
      th: 'วันที่พระพุทธเจ้าทรงแสดงธรรมแก่พระสาวกจำนวน 1,250 รูป'
    },
    traditionalExpenses: [
      'Temple donations',
      'Candles for wien tien',
      'Lotus flowers',
      'Vegetarian meals',
      'Merit-making offerings',
      'Religious books'
    ],
    budgetSuggestion: {
      min: 300,
      max: 3000,
      currency: 'THB'
    }
  }
];

// Helper functions
export function getThaiHolidaysByType(type: ThaiHoliday['type']): ThaiHoliday[] {
  return THAI_HOLIDAYS.filter(holiday => holiday.type === type);
}

export function getUpcomingThaiHolidays(months: number = 3): ThaiHoliday[] {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setMonth(today.getMonth() + months);

  return THAI_HOLIDAYS.filter(holiday => {
    const holidayDate = new Date(holiday.gregorianDate);
    return holidayDate >= today && holidayDate <= futureDate;
  }).sort((a, b) => new Date(a.gregorianDate).getTime() - new Date(b.gregorianDate).getTime());
}

export function getHolidayBudgetTotal(holidayIds: string[]): number {
  return THAI_HOLIDAYS
    .filter(holiday => holidayIds.includes(holiday.id))
    .reduce((total, holiday) => total + holiday.budgetSuggestion.max, 0);
}

export function getLocalizedHolidayName(holiday: ThaiHoliday, language: 'en' | 'th' = 'en'): string {
  return holiday.name[language];
}
