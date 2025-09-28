export type AccountType =
  | "checking"
  | "savings"
  | "credit"
  | "investment"
  | "loan"
  | "mortgage";
export type AccountStatus = "active" | "inactive" | "pending" | "error";
export type SyncStatus = "synced" | "syncing" | "failed" | "manual";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  provider: string;
  providerAccountId?: string;
  balance: number;
  currency: string;
  lastSyncAt?: Date;
  status: AccountStatus;
  syncStatus: SyncStatus;
  isManual: boolean;
  metadata?: {
    accountNumber?: string;
    routingNumber?: string;
    interestRate?: number;
    creditLimit?: number;
    minimumPayment?: number;
    description?: string;
  };
}

export interface AccountBalance {
  accountId: string;
  balance: number;
  availableBalance?: number;
  pendingBalance?: number;
  lastUpdated: Date;
}

export interface AccountSyncResult {
  accountId: string;
  success: boolean;
  lastSyncAt: Date;
  error?: string;
  newTransactions: number;
}

export interface AccountsOverview {
  totalBalance: number;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  accounts: Account[];
  accountsByType: Record<AccountType, Account[]>;
  lastSyncAt?: Date;
}
