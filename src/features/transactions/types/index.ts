export type TransactionType = "debit" | "credit";
export type TransactionCategory =
  | "groceries"
  | "restaurants"
  | "gas"
  | "shopping"
  | "entertainment"
  | "utilities"
  | "insurance"
  | "healthcare"
  | "travel"
  | "education"
  | "income"
  | "transfer"
  | "investment"
  | "other";

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  merchant?: string;
  description: string;
  posted_at: Date;
  pending: boolean;
  location?: string;
  tags?: string[];
}

export interface TransactionSummary {
  totalTransactions: number;
  totalSpent: number;
  totalIncome: number;
  netCashflow: number;
  topCategory: TransactionCategory;
  recentTransactions: Transaction[];
}
