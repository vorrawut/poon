export interface QuickAction {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  shortcut?: string;
  category:
    | "transaction"
    | "account"
    | "analysis"
    | "import"
    | "settings"
    | "system";
  requiresAuth?: boolean;
  isPremium?: boolean;
  onClick: () => void | Promise<void>;
}

export interface QuickActionsConfig {
  layout: "grid" | "list" | "compact";
  showLabels: boolean;
  showDescriptions: boolean;
  showShortcuts: boolean;
  maxActions?: number;
  categories?: string[];
}

export interface QuickActionCategory {
  id: string;
  name: string;
  description?: string;
  color: string;
}
