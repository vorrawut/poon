// Quick Actions Mock Data

import {
  PlusIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  DocumentArrowUpIcon,
  CogIcon,
  CreditCardIcon,
  BanknotesIcon,
  EyeIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  shortcut?: string;
  category: "transaction" | "account" | "analysis" | "system";
  isPremium?: boolean;
  onClick: () => void;
}

export interface QuickActionCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

// Mock action handlers
const handleAddTransaction = () => console.log("Add Transaction clicked");
const handleTransferMoney = () => console.log("Transfer Money clicked");
const handlePayBill = () => console.log("Pay Bill clicked");
const handleLinkAccount = () => console.log("Link Account clicked");
const handleAddManualAccount = () => console.log("Add Manual Account clicked");
const handleViewAnalytics = () => console.log("View Analytics clicked");
const handleGenerateReport = () => console.log("Generate Report clicked");
const handleImportData = () => console.log("Import Data clicked");
const handleExportData = () => console.log("Export Data clicked");
const handleOpenSettings = () => console.log("Open Settings clicked");

export const mockQuickActions: QuickAction[] = [
  // Transaction Actions
  {
    id: "add-transaction",
    label: "Add Transaction",
    description: "Manually add a new transaction",
    icon: PlusIcon,
    color: "bg-blue-500 hover:bg-blue-600",
    shortcut: "Cmd+N",
    category: "transaction",
    onClick: handleAddTransaction,
  },
  {
    id: "transfer-money",
    label: "Transfer Money",
    description: "Transfer between accounts",
    icon: ArrowsRightLeftIcon,
    color: "bg-purple-500 hover:bg-purple-600",
    shortcut: "Cmd+T",
    category: "transaction",
    onClick: handleTransferMoney,
  },
  {
    id: "pay-bill",
    label: "Pay Bill",
    description: "Schedule or pay a bill",
    icon: CreditCardIcon,
    color: "bg-red-500 hover:bg-red-600",
    category: "transaction",
    onClick: handlePayBill,
  },

  // Account Actions
  {
    id: "link-account",
    label: "Link Account",
    description: "Connect a new bank account",
    icon: BuildingLibraryIcon,
    color: "bg-green-500 hover:bg-green-600",
    shortcut: "Cmd+L",
    category: "account",
    onClick: handleLinkAccount,
  },
  {
    id: "add-manual-account",
    label: "Add Manual Account",
    description: "Add account without connection",
    icon: BanknotesIcon,
    color: "bg-emerald-500 hover:bg-emerald-600",
    category: "account",
    onClick: handleAddManualAccount,
  },

  // Analysis Actions
  {
    id: "view-analytics",
    label: "View Analytics",
    description: "Open spending analytics",
    icon: ChartBarIcon,
    color: "bg-orange-500 hover:bg-orange-600",
    shortcut: "Cmd+A",
    category: "analysis",
    onClick: handleViewAnalytics,
  },
  {
    id: "generate-report",
    label: "Generate Report",
    description: "Create financial report",
    icon: EyeIcon,
    color: "bg-teal-500 hover:bg-teal-600",
    category: "analysis",
    isPremium: true,
    onClick: handleGenerateReport,
  },

  // System Actions
  {
    id: "import-data",
    label: "Import Data",
    description: "Import transactions from CSV",
    icon: DocumentArrowUpIcon,
    color: "bg-indigo-500 hover:bg-indigo-600",
    shortcut: "Cmd+I",
    category: "system",
    onClick: handleImportData,
  },
  {
    id: "export-data",
    label: "Export Data",
    description: "Export your financial data",
    icon: DocumentArrowUpIcon,
    color: "bg-pink-500 hover:bg-pink-600",
    category: "system",
    isPremium: true,
    onClick: handleExportData,
  },
  {
    id: "settings",
    label: "Settings",
    description: "Configure app preferences",
    icon: CogIcon,
    color: "bg-gray-500 hover:bg-gray-600",
    shortcut: "Cmd+,",
    category: "system",
    onClick: handleOpenSettings,
  },
];

export const mockQuickActionCategories: QuickActionCategory[] = [
  {
    id: "transaction",
    name: "Transactions",
    description: "Add, edit, and manage transactions",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "account",
    name: "Accounts",
    description: "Manage bank accounts and connections",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "analysis",
    name: "Analysis",
    description: "View reports and analytics",
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: "system",
    name: "System",
    description: "App settings and data management",
    color: "bg-gray-100 text-gray-800",
  },
];
