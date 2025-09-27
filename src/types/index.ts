// Core Data Types
export interface User {
  id: string;
  email: string;
  name: string;
  mfa_enabled: boolean;
  created_at: string;
}

export interface Account {
  id: string;
  user_id: string;
  provider: "manual" | "plaid" | "saltedge" | "csv";
  provider_account_id?: string;
  name: string;
  type:
    | "checking"
    | "savings"
    | "investment"
    | "company"
    | "insurance"
    | "provident_fund";
  currency: string;
  last_sync_at?: string;
  current_balance: number;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

export interface Transaction {
  id: string;
  user_id: string;
  account_id: string;
  posted_at: string;
  amount: number;
  type: "debit" | "credit";
  category: string;
  subcategory?: string;
  merchant?: string;
  description: string;
  imported_from: "manual" | "csv" | "plaid" | "saltedge";
  tags: string[];
  metadata?: Record<string, unknown>;
  is_duplicate?: boolean;
}

export interface Asset {
  id: string;
  user_id: string;
  account_id: string;
  asset_type: "stock" | "crypto" | "bond" | "mutual_fund" | "etf";
  symbol: string;
  name: string;
  quantity: number;
  avg_price: number;
  current_price?: number;
  market_value?: number;
  change_percent?: number;
  change_amount?: number;
}

export interface Portfolio {
  id: string;
  user_id: string;
  name: string;
  total_value: number;
  total_cost: number;
  total_gain_loss: number;
  total_gain_loss_percent: number;
  created_at: string;
}

export interface PortfolioPosition {
  id: string;
  portfolio_id: string;
  symbol: string;
  name: string;
  quantity: number;
  avg_price: number;
  current_price: number;
  market_value: number;
  gain_loss: number;
  gain_loss_percent: number;
  weight_percent: number;
}

export interface PriceData {
  symbol: string;
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume?: number;
  source: string;
}

export interface ProviderToken {
  id: string;
  user_id: string;
  provider: "plaid" | "saltedge";
  access_token_encrypted: string;
  refresh_token_encrypted?: string;
  expires_at?: string;
  metadata?: Record<string, unknown>;
}

// UI State Types
export interface FilterState {
  dateRange: {
    from: string;
    to: string;
    preset?: "week" | "month" | "quarter" | "year" | "all";
  };
  accounts: string[];
  categories: string[];
  search?: string;
}

export interface DashboardMetrics {
  totalNetWorth: number;
  netWorthChange: number;
  netWorthChangePercent: number;
  totalAssets: number;
  totalLiabilities: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}

// CSV Import Types
export interface CSVColumn {
  index: number;
  name: string;
  sample_values: string[];
  mapped_to?:
    | "date"
    | "amount"
    | "description"
    | "category"
    | "merchant"
    | "type"
    | "ignore";
  format?: string; // For date/amount formatting
}

export interface CSVImportSession {
  id: string;
  filename: string;
  headers: string[];
  columns: CSVColumn[];
  sample_rows: string[][];
  total_rows: number;
  account_id: string;
  status: "mapping" | "preview" | "importing" | "completed" | "error";
  created_at: string;
  processed_count?: number;
  error_count?: number;
  duplicate_count?: number;
}

// Chart Data Types
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
  category?: string;
}

export interface CategorySpending {
  category: string;
  amount: number;
  count: number;
  percent: number;
  subcategories?: {
    name: string;
    amount: number;
    count: number;
  }[];
}

export interface SpendingTrend {
  period: string; // YYYY-MM or YYYY-MM-DD
  income: number;
  expenses: number;
  net: number;
  categories: CategorySpending[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

// Plaid/SaltEdge Integration Types
export interface BankConnection {
  id: string;
  provider: "plaid" | "saltedge";
  institution_name: string;
  institution_id: string;
  status: "connected" | "requires_update" | "error" | "expired";
  accounts: Account[];
  last_sync: string;
  error_message?: string;
}

export interface PlaidLinkEvent {
  event_name: string;
  institution_id?: string;
  institution_name?: string;
  error_type?: string;
  error_code?: string;
}

// Insight Types
export interface Insight {
  id: string;
  type:
    | "spending_alert"
    | "savings_goal"
    | "category_trend"
    | "income_change"
    | "subscription_detected";
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
  category?: string;
  amount?: number;
  created_at: string;
  is_read: boolean;
  metadata?: Record<string, unknown>;
}
