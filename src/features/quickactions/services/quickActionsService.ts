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
import { type QuickAction, type QuickActionCategory } from "../types";

class QuickActionsService {
  private actions: QuickAction[] = [];
  private categories: QuickActionCategory[] = [];

  constructor() {
    this.initializeDefaultActions();
  }

  private initializeDefaultActions() {
    // Transaction Actions
    const transactionActions: QuickAction[] = [
      {
        id: "add-transaction",
        label: "Add Transaction",
        description: "Manually add a new transaction",
        icon: PlusIcon,
        color: "bg-blue-500 hover:bg-blue-600",
        shortcut: "Cmd+N",
        category: "transaction",
        onClick: () => this.handleAddTransaction(),
      },
      {
        id: "transfer-money",
        label: "Transfer Money",
        description: "Transfer between accounts",
        icon: ArrowsRightLeftIcon,
        color: "bg-purple-500 hover:bg-purple-600",
        shortcut: "Cmd+T",
        category: "transaction",
        onClick: () => this.handleTransferMoney(),
      },
      {
        id: "pay-bill",
        label: "Pay Bill",
        description: "Schedule or pay a bill",
        icon: CreditCardIcon,
        color: "bg-red-500 hover:bg-red-600",
        category: "transaction",
        onClick: () => this.handlePayBill(),
      },
    ];

    // Account Actions
    const accountActions: QuickAction[] = [
      {
        id: "link-account",
        label: "Link Account",
        description: "Connect a new bank account",
        icon: BuildingLibraryIcon,
        color: "bg-green-500 hover:bg-green-600",
        shortcut: "Cmd+L",
        category: "account",
        onClick: () => this.handleLinkAccount(),
      },
      {
        id: "add-manual-account",
        label: "Add Manual Account",
        description: "Add account without connection",
        icon: BanknotesIcon,
        color: "bg-emerald-500 hover:bg-emerald-600",
        category: "account",
        onClick: () => this.handleAddManualAccount(),
      },
    ];

    // Analysis Actions
    const analysisActions: QuickAction[] = [
      {
        id: "view-analytics",
        label: "View Analytics",
        description: "Open spending analytics",
        icon: ChartBarIcon,
        color: "bg-orange-500 hover:bg-orange-600",
        shortcut: "Cmd+A",
        category: "analysis",
        onClick: () => this.handleViewAnalytics(),
      },
      {
        id: "generate-report",
        label: "Generate Report",
        description: "Create financial report",
        icon: EyeIcon,
        color: "bg-teal-500 hover:bg-teal-600",
        category: "analysis",
        isPremium: true,
        onClick: () => this.handleGenerateReport(),
      },
    ];

    // Import Actions
    const importActions: QuickAction[] = [
      {
        id: "import-csv",
        label: "Import CSV",
        description: "Upload CSV file",
        icon: DocumentArrowUpIcon,
        color: "bg-indigo-500 hover:bg-indigo-600",
        shortcut: "Cmd+U",
        category: "import",
        onClick: () => this.handleImportCsv(),
      },
    ];

    // Settings Actions
    const settingsActions: QuickAction[] = [
      {
        id: "settings",
        label: "Settings",
        description: "Open app settings",
        icon: CogIcon,
        color: "bg-gray-500 hover:bg-gray-600",
        shortcut: "Cmd+,",
        category: "settings",
        onClick: () => this.handleOpenSettings(),
      },
    ];

    this.actions = [
      ...transactionActions,
      ...accountActions,
      ...analysisActions,
      ...importActions,
      ...settingsActions,
    ];

    this.categories = [
      {
        id: "transaction",
        label: "Transactions",
        description: "Manage your transactions",
        color: "blue",
        actions: transactionActions,
      },
      {
        id: "account",
        label: "Accounts",
        description: "Manage your accounts",
        color: "green",
        actions: accountActions,
      },
      {
        id: "analysis",
        label: "Analysis",
        description: "Financial insights",
        color: "orange",
        actions: analysisActions,
      },
      {
        id: "import",
        label: "Import",
        description: "Data import tools",
        color: "indigo",
        actions: importActions,
      },
      {
        id: "settings",
        label: "Settings",
        description: "App configuration",
        color: "gray",
        actions: settingsActions,
      },
    ];
  }

  getActions(category?: string): QuickAction[] {
    if (!category) return this.actions;
    return this.actions.filter((action) => action.category === category);
  }

  getCategories(): QuickActionCategory[] {
    return this.categories;
  }

  getAction(id: string): QuickAction | undefined {
    return this.actions.find((action) => action.id === id);
  }

  registerAction(action: QuickAction): void {
    const existingIndex = this.actions.findIndex((a) => a.id === action.id);
    if (existingIndex >= 0) {
      this.actions[existingIndex] = action;
    } else {
      this.actions.push(action);
    }
  }

  unregisterAction(id: string): void {
    this.actions = this.actions.filter((action) => action.id !== id);
  }

  // Action handlers (these would be injected or configured)
  private handleAddTransaction() {
    console.log("Add Transaction clicked");
    // Navigate to add transaction modal/page
    // This would be configured externally
  }

  private handleTransferMoney() {
    console.log("Transfer Money clicked");
    // Navigate to transfer modal/page
  }

  private handlePayBill() {
    console.log("Pay Bill clicked");
    // Navigate to bill pay modal/page
  }

  private handleLinkAccount() {
    console.log("Link Account clicked");
    // Start account linking flow
  }

  private handleAddManualAccount() {
    console.log("Add Manual Account clicked");
    // Open manual account form
  }

  private handleViewAnalytics() {
    console.log("View Analytics clicked");
    // Navigate to analytics page
  }

  private handleGenerateReport() {
    console.log("Generate Report clicked");
    // Open report generation modal
  }

  private handleImportCsv() {
    console.log("Import CSV clicked");
    // Open CSV import modal
  }

  private handleOpenSettings() {
    console.log("Open Settings clicked");
    // Navigate to settings page
  }
}

export const quickActionsService = new QuickActionsService();
