export interface QuickAction {
  id: string;
  label: string;
  description?: string;
  icon: any;
  color: string;
  shortcut?: string;
  category: 'transaction' | 'account' | 'analysis' | 'import' | 'settings';
  requiresAuth?: boolean;
  isPremium?: boolean;
  onClick: () => void | Promise<void>;
}

export interface QuickActionsConfig {
  layout: 'grid' | 'list' | 'compact';
  showLabels: boolean;
  showDescriptions: boolean;
  showShortcuts: boolean;
  maxActions?: number;
  categories?: string[];
}

export interface QuickActionCategory {
  id: string;
  label: string;
  description?: string;
  color: string;
  actions: QuickAction[];
}
