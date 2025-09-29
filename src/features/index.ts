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

// Goals & Mission Tracking Feature
export * from "./goals";

// Feature exports for lazy loading (implemented features only)
export const NetWorthFeature = () => import("./networth");
export const AccountsFeature = () => import("./accounts");
export const QuickActionsFeature = () => import("./quickactions");
export const TransactionsFeature = () => import("./transactions");
export const AIInsightsFeature = () => import("./ai-insights");
export const GoalsFeature = () => import("./goals");

// Future features (to be implemented)
// export const PortfolioFeature = () => import('./portfolio');
// export const AnalyticsFeature = () => import('./analytics');
// export const InsightsFeature = () => import('./insights');
// export const BudgetingFeature = () => import('./budgeting');
