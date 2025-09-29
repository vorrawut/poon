// Thai Cultural Categories Data
export interface CulturalCategory {
  id: string;
  name: { en: string; th: string };
  subcategories: Array<{
    id: string;
    name: { en: string; th: string };
  }>;
}

export const thaiCulturalCategories: CulturalCategory[] = [
  {
    id: "family_support",
    name: { en: "Family Support", th: "การช่วยเหลือครอบครัว" },
    subcategories: [
      {
        id: "parent_allowance",
        name: { en: "Parent Allowance", th: "เงินเลี้ยงดูพ่อแม่" },
      },
      {
        id: "elderly_care",
        name: { en: "Elderly Care", th: "การดูแลผู้สูงอายุ" },
      },
      {
        id: "education_support",
        name: { en: "Education Support", th: "สนับสนุนการศึกษา" },
      },
      {
        id: "healthcare_family",
        name: { en: "Family Healthcare", th: "ค่ารักษาพยาบาลครอบครัว" },
      },
    ],
  },
  {
    id: "merit_making",
    name: { en: "Merit Making", th: "การทำบุญ" },
    subcategories: [
      {
        id: "temple_donation",
        name: { en: "Temple Donation", th: "การบริจาควัด" },
      },
      { id: "monk_offering", name: { en: "Monk Offering", th: "การใส่บาตร" } },
      { id: "charity", name: { en: "Charity", th: "การกุศล" } },
      {
        id: "religious_ceremony",
        name: { en: "Religious Ceremony", th: "พิธีทางศาสนา" },
      },
    ],
  },
  {
    id: "cultural_festivals",
    name: { en: "Cultural Festivals", th: "เทศกาลวัฒนธรรม" },
    subcategories: [
      { id: "songkran", name: { en: "Songkran", th: "สงกรานต์" } },
      { id: "loy_krathong", name: { en: "Loy Krathong", th: "ลอยกระทง" } },
      { id: "vesak_day", name: { en: "Vesak Day", th: "วันวิสาขบูชา" } },
      { id: "buddhist_lent", name: { en: "Buddhist Lent", th: "เข้าพรรษา" } },
    ],
  },
  {
    id: "traditional_ceremonies",
    name: { en: "Traditional Ceremonies", th: "พิธีกรรมประเพณี" },
    subcategories: [
      { id: "wedding", name: { en: "Wedding Ceremony", th: "งานแต่งงาน" } },
      { id: "funeral", name: { en: "Funeral Ceremony", th: "งานศพ" } },
      { id: "ordination", name: { en: "Ordination", th: "บวช" } },
      { id: "housewarming", name: { en: "Housewarming", th: "ขึ้นบ้านใหม่" } },
    ],
  },
];
