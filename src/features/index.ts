// NetWorth Feature
export * from './networth';

// Accounts Feature
export * from './accounts';

// Quick Actions Feature  
export * from './quickactions';

// Feature exports for lazy loading (implemented features only)
export const NetWorthFeature = () => import('./networth');
export const AccountsFeature = () => import('./accounts');
export const QuickActionsFeature = () => import('./quickactions');

// Future features (to be implemented)
// export const TransactionsFeature = () => import('./transactions');
// export const PortfolioFeature = () => import('./portfolio');
// export const AnalyticsFeature = () => import('./analytics');
// export const InsightsFeature = () => import('./insights');
// export const BudgetingFeature = () => import('./budgeting');
