// Thai Cultural Features Exports

// Components
export { ThaiCalendarIntegration } from "./components/ThaiCalendarIntegration";
export { FamilyObligationTracker } from "./components/FamilyObligationTracker";
export { MeritMakingBudget } from "./components/MeritMakingBudget";

// Services
export {
  ThaiLocalizationService,
  thaiLocalization,
} from "./services/thaiLocalization";
export {
  formatThaiCurrency,
  formatThaiNumber,
  formatBuddhistDate,
} from "./services/thaiLocalization";

// Data
export {
  THAI_CULTURAL_CATEGORIES,
  getThaiCulturalCategory,
  getThaiCategoriesByKeyword,
  getLocalizedCategoryName,
} from "./data/culturalCategories";

export {
  THAI_HOLIDAYS,
  getThaiHolidaysByType,
  getUpcomingThaiHolidays,
  getHolidayBudgetTotal,
  getLocalizedHolidayName,
} from "./data/thaiHolidays";

// Types
export type {
  ThaiCulturalCategory,
  ThaiHoliday,
  MeritMakingActivity,
  FamilyObligation,
  ThaiNumberFormat,
  BuddhistDate,
  ThaiCulturalInsight,
} from "./types";

// Feature lazy loading
export const ThaiCultureFeature = () => import("./index");
