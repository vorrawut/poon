// NetWorth Feature
export * from "./networth";

// Accounts Feature
export * from "./accounts";

// Quick Actions Feature
export * from "./quickactions";

// Transactions Feature
export * from "./transactions";

// AI Insights Feature
export * from "./ai-insights";

// AI Coaching Feature
export * from "./ai-coaching";

// Goals & Mission Tracking Feature
export * from "./goals";

// Thai Cultural Features
export * from "./thai-culture";

// Social Features
export * from "./social";

// Dashboard Feature
export * from "./dashboard";

// Future/Goals Feature
export * from "./future";

// Portfolio Feature
export * from "./portfolio";

// Spending Feature
export * from "./spending";

// Subscription Feature
export * from "./subscription";

// Feature exports for lazy loading (implemented features only)
export const NetWorthFeature = () => import("./networth");
export const AccountsFeature = () => import("./accounts");
export const QuickActionsFeature = () => import("./quickactions");
export const TransactionsFeature = () => import("./transactions");
export const AIInsightsFeature = () => import("./ai-insights");
export const AICoachingFeature = () => import("./ai-coaching");
export const GoalsFeature = () => import("./goals");
export const ThaiCultureFeature = () => import("./thai-culture");
export const SocialFeature = () => import("./social");
export const DashboardFeature = () => import("./dashboard");
export const FutureFeature = () => import("./future");
export const PortfolioFeature = () => import("./portfolio");
export const SpendingFeature = () => import("./spending");
export const SubscriptionFeature = () => import("./subscription");
