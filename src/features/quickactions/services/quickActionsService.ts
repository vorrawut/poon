import { type QuickAction, type QuickActionCategory } from "../types";
import {
  mockQuickActions,
  mockQuickActionCategories,
} from "../../../../mockData/features/quickactions";

class QuickActionsService {
  private actions: QuickAction[] = [];
  private categories: QuickActionCategory[] = [];

  constructor() {
    this.initializeDefaultActions();
  }

  private initializeDefaultActions() {
    this.actions = [...mockQuickActions];
    this.categories = [...mockQuickActionCategories];
  }

  // Get all actions
  getAllActions(): QuickAction[] {
    return this.actions;
  }

  // Get actions by category
  getActionsByCategory(categoryId: string): QuickAction[] {
    return this.actions.filter((action) => action.category === categoryId);
  }

  // Get all categories
  getAllCategories(): QuickActionCategory[] {
    return this.categories;
  }

  // Get action by ID
  getActionById(id: string): QuickAction | undefined {
    return this.actions.find((action) => action.id === id);
  }

  // Get category by ID
  getCategoryById(id: string): QuickActionCategory | undefined {
    return this.categories.find((category) => category.id === id);
  }

  // Execute action by ID
  executeAction(id: string): void {
    const action = this.getActionById(id);
    if (action) {
      action.onClick();
    }
  }

  // Get actions with shortcuts
  getActionsWithShortcuts(): QuickAction[] {
    return this.actions.filter((action) => action.shortcut);
  }

  // Get premium actions
  getPremiumActions(): QuickAction[] {
    return this.actions.filter((action) => action.isPremium);
  }

  // Search actions
  searchActions(query: string): QuickAction[] {
    const lowercaseQuery = query.toLowerCase();
    return this.actions.filter(
      (action) =>
        action.label.toLowerCase().includes(lowercaseQuery) ||
        (action.description &&
          action.description.toLowerCase().includes(lowercaseQuery)),
    );
  }

  // Add custom action
  addAction(action: QuickAction): void {
    this.actions.push(action);
  }

  // Remove action
  removeAction(id: string): void {
    this.actions = this.actions.filter((action) => action.id !== id);
  }

  // Update action
  updateAction(id: string, updates: Partial<QuickAction>): void {
    const index = this.actions.findIndex((action) => action.id === id);
    if (index !== -1) {
      this.actions[index] = { ...this.actions[index], ...updates };
    }
  }
}

// Export singleton instance
export const quickActionsService = new QuickActionsService();
export default quickActionsService;
