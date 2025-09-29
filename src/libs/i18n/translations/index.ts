import type { AppTranslations } from "../types";
import { commonTranslations } from "./common";
import { featureTranslations } from "./features";

export const appTranslations: AppTranslations = {
  common: commonTranslations,
  features: featureTranslations,
};

export * from "./common";
export * from "./features";
