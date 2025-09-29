// Internationalization Types

export type SupportedLanguage = "en" | "th";

export interface TranslationKey {
  en: string;
  th: string;
}

export interface CommonTranslations {
  // Navigation
  navigation: {
    universe: TranslationKey;
    dashboard: TranslationKey;
    accounts: TranslationKey;
    portfolio: TranslationKey;
    moneyFlow: TranslationKey;
    timeMachine: TranslationKey;
    future: TranslationKey;
    thaiCulture: TranslationKey;
    spending: TranslationKey;
    import: TranslationKey;
    settings: TranslationKey;
  };

  // Common Actions
  actions: {
    save: TranslationKey;
    cancel: TranslationKey;
    delete: TranslationKey;
    edit: TranslationKey;
    add: TranslationKey;
    create: TranslationKey;
    update: TranslationKey;
    view: TranslationKey;
    close: TranslationKey;
    back: TranslationKey;
    next: TranslationKey;
    previous: TranslationKey;
    confirm: TranslationKey;
    loading: TranslationKey;
    retry: TranslationKey;
  };

  // Common Labels
  labels: {
    name: TranslationKey;
    description: TranslationKey;
    amount: TranslationKey;
    date: TranslationKey;
    time: TranslationKey;
    category: TranslationKey;
    type: TranslationKey;
    status: TranslationKey;
    priority: TranslationKey;
    frequency: TranslationKey;
    location: TranslationKey;
    notes: TranslationKey;
    tags: TranslationKey;
    search: TranslationKey;
    filter: TranslationKey;
    sort: TranslationKey;
    total: TranslationKey;
    balance: TranslationKey;
    progress: TranslationKey;
  };

  // Time & Dates
  time: {
    today: TranslationKey;
    yesterday: TranslationKey;
    tomorrow: TranslationKey;
    thisWeek: TranslationKey;
    thisMonth: TranslationKey;
    thisYear: TranslationKey;
    lastWeek: TranslationKey;
    lastMonth: TranslationKey;
    lastYear: TranslationKey;
    day: TranslationKey;
    days: TranslationKey;
    week: TranslationKey;
    weeks: TranslationKey;
    month: TranslationKey;
    months: TranslationKey;
    year: TranslationKey;
    years: TranslationKey;
  };

  // Status Messages
  status: {
    success: TranslationKey;
    error: TranslationKey;
    warning: TranslationKey;
    info: TranslationKey;
    completed: TranslationKey;
    pending: TranslationKey;
    active: TranslationKey;
    inactive: TranslationKey;
    enabled: TranslationKey;
    disabled: TranslationKey;
  };

  // Accessibility
  accessibility: {
    elder: TranslationKey;
    standard: TranslationKey;
    youth: TranslationKey;
    playMode: TranslationKey;
    clarityMode: TranslationKey;
    darkMode: TranslationKey;
    lightMode: TranslationKey;
    auto: TranslationKey;
  };
}

export interface FeatureTranslations {
  dashboard: {
    title: TranslationKey;
    subtitle: TranslationKey;
    welcomeMessage: TranslationKey;
    quickActions: TranslationKey;
    recentActivity: TranslationKey;
    financialSummary: TranslationKey;
  };

  accounts: {
    title: TranslationKey;
    subtitle: TranslationKey;
    addAccount: TranslationKey;
    accountBalance: TranslationKey;
    totalBalance: TranslationKey;
    accountType: TranslationKey;
    lastUpdated: TranslationKey;
  };

  goals: {
    title: TranslationKey;
    subtitle: TranslationKey;
    createGoal: TranslationKey;
    goalProgress: TranslationKey;
    targetAmount: TranslationKey;
    currentAmount: TranslationKey;
    deadline: TranslationKey;
    daysRemaining: TranslationKey;
    completed: TranslationKey;
    inProgress: TranslationKey;
    notStarted: TranslationKey;
  };

  spending: {
    title: TranslationKey;
    subtitle: TranslationKey;
    totalSpending: TranslationKey;
    monthlySpending: TranslationKey;
    categories: TranslationKey;
    transactions: TranslationKey;
    patterns: TranslationKey;
    analysis: TranslationKey;
  };

  thaiCulture: {
    title: TranslationKey;
    subtitle: TranslationKey;
    calendar: TranslationKey;
    familyObligations: TranslationKey;
    meritMaking: TranslationKey;
    festivals: TranslationKey;
    culturalWisdom: TranslationKey;
  };

  settings: {
    title: TranslationKey;
    subtitle: TranslationKey;
    language: TranslationKey;
    theme: TranslationKey;
    currency: TranslationKey;
    preferences: TranslationKey;
    accessibility: TranslationKey;
    notifications: TranslationKey;
    privacy: {
      title: TranslationKey;
      message: TranslationKey;
    };
    security: {
      title: TranslationKey;
      status: TranslationKey;
      statusMessage: TranslationKey;
      twoFactor: TranslationKey;
      twoFactorDesc: TranslationKey;
    };
    sync: {
      title: TranslationKey;
      message: TranslationKey;
    };
    backup: {
      title: TranslationKey;
      message: TranslationKey;
    };
    systemStatus: TranslationKey;
    systemStatusDesc: TranslationKey;
    about: TranslationKey;
  };
}

export interface AppTranslations {
  common: CommonTranslations;
  features: FeatureTranslations;
}

export type TranslationPath = string;
export type TranslationParams = Record<string, string | number>;
