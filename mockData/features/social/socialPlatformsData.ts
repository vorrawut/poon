// Social Platforms Data for Achievement Sharing
export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  isEnabled: boolean;
}

export interface ShareTemplate {
  id: string;
  name: {
    en: string;
    th: string;
  };
  template: {
    en: string;
    th: string;
  };
  style: "celebration" | "humble" | "motivational" | "cultural";
  preview: {
    en: string;
    th: string;
  };
}

export const socialPlatforms: SocialPlatform[] = [
  {
    id: "facebook",
    name: "Facebook",
    icon: "📘",
    color: "#1877F2",
    isEnabled: true,
  },
  {
    id: "twitter",
    name: "Twitter/X",
    icon: "🐦",
    color: "#1DA1F2",
    isEnabled: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
    color: "#E4405F",
    isEnabled: true,
  },
  {
    id: "line",
    name: "LINE",
    icon: "💬",
    color: "#00C300",
    isEnabled: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    color: "#0A66C2",
    isEnabled: false,
  },
];

export const shareTemplates: ShareTemplate[] = [
  {
    id: "celebration",
    name: {
      en: "Celebration",
      th: "ฉลอง",
    },
    template: {
      en: "🎉 Just unlocked '{achievementName}' in my financial journey! {achievementDesc} #FinancialGrowth #Achievement #PoonApp",
      th: "🎉 เพิ่งปลดล็อค '{achievementName}' ในการเดินทางทางการเงิน! {achievementDesc} #การเติบโตทางการเงิน #ความสำเร็จ #PoonApp",
    },
    style: "celebration",
    preview: {
      en: "🎉 Just unlocked 'Savings Legend' in my financial journey! Saved over ฿250,000 #FinancialGrowth",
      th: "🎉 เพิ่งปลดล็อค 'ตำนานนักออม' ในการเดินทางทางการเงิน! ออมเงินได้กว่า ฿250,000 #การเติบโตทางการเงิน",
    },
  },
  {
    id: "humble",
    name: {
      en: "Humble",
      th: "ถ่อมตน",
    },
    template: {
      en: "Small step forward: {achievementDesc} 🌱 Every journey begins with a single step. #FinancialJourney #Progress",
      th: "ก้าวเล็กๆ ไปข้างหน้า: {achievementDesc} 🌱 การเดินทางทุกครั้งเริ่มต้นด้วยก้าวเดียว #การเดินทางทางการเงิน #ความก้าวหน้า",
    },
    style: "humble",
    preview: {
      en: "Small step forward: Saved over ฿250,000 🌱 Every journey begins with a single step.",
      th: "ก้าวเล็กๆ ไปข้างหน้า: ออมเงินได้กว่า ฿250,000 🌱 การเดินทางทุกครั้งเริ่มต้นด้วยก้าวเดียว",
    },
  },
  {
    id: "motivational",
    name: {
      en: "Motivational",
      th: "สร้างแรงบันดาลใจ",
    },
    template: {
      en: "💪 {achievementDesc} - Proof that consistency pays off! What's your next financial goal? #Motivation #FinancialGoals",
      th: "💪 {achievementDesc} - พิสูจน์แล้วว่าความสม่ำเสมอคุ้มค่า! เป้าหมายทางการเงินต่อไปของคุณคืออะไร? #แรงบันดาลใจ #เป้าหมายทางการเงิน",
    },
    style: "motivational",
    preview: {
      en: "💪 Saved over ฿250,000 - Proof that consistency pays off! What's your next financial goal?",
      th: "💪 ออมเงินได้กว่า ฿250,000 - พิสูจน์แล้วว่าความสม่ำเสมอคุ้มค่า! เป้าหมายทางการเงินต่อไปของคุณคืออะไร?",
    },
  },
  {
    id: "cultural",
    name: {
      en: "Cultural",
      th: "วัฒนธรรม",
    },
    template: {
      en: "🙏 Following Thai values in my financial journey: {achievementDesc} Building wealth the traditional way! #ThaiWisdom #กตัญญู",
      th: "🙏 ปฏิบัติตามคุณค่าไทยในการเดินทางทางการเงิน: {achievementDesc} สร้างความมั่งคั่งแบบดั้งเดิม! #ปัญญาไทย #กตัญญู",
    },
    style: "cultural",
    preview: {
      en: "🙏 Following Thai values in my financial journey: Saved over ฿250,000 Building wealth the traditional way!",
      th: "🙏 ปฏิบัติตามคุณค่าไทยในการเดินทางทางการเงิน: ออมเงินได้กว่า ฿250,000 สร้างความมั่งคั่งแบบดั้งเดิม!",
    },
  },
];