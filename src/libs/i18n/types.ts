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
  dashboard: {
    title: TranslationKey;
    subtitle: {
      play: TranslationKey;
      clarity: TranslationKey;
    };
    recentActivity: {
      title: TranslationKey;
      subtitle: TranslationKey;
      seeAll: TranslationKey;
    };
    quickActions: {
      title: TranslationKey;
      subtitle: TranslationKey;
      addTransaction: {
        title: TranslationKey;
        description: TranslationKey;
      };
      linkAccount: {
        title: TranslationKey;
        description: TranslationKey;
      };
      importData: {
        title: TranslationKey;
        description: TranslationKey;
      };
      viewReports: {
        title: TranslationKey;
        description: TranslationKey;
      };
    };
    smartHighlights: {
      title: TranslationKey;
      subtitle: TranslationKey;
    };
    encouragement: {
      title: TranslationKey;
      message: TranslationKey;
      tip: TranslationKey;
    };
  };
  portfolio: {
    title: TranslationKey;
    subtitle: {
      play: TranslationKey;
      clarity: TranslationKey;
    };
    summary: {
      totalPortfolio: TranslationKey;
      totalGrowth: TranslationKey;
      assetClasses: TranslationKey;
    };
    navigation: {
      timeline: TranslationKey;
      simulate: TranslationKey;
    };
    table: {
      title: TranslationKey;
      subtitle: TranslationKey;
      headers: {
        asset: TranslationKey;
        value: TranslationKey;
        performance: TranslationKey;
        allocation: TranslationKey;
        growth: TranslationKey;
      };
    };
    simulation: {
      title: TranslationKey;
      subtitle: TranslationKey;
      monthlyInvestment: TranslationKey;
      expectedReturn: TranslationKey;
      timeHorizon: TranslationKey;
      projectedResults: TranslationKey;
      futureValue: TranslationKey;
      totalContributions: TranslationKey;
      investmentGrowth: TranslationKey;
      financialIndependence: TranslationKey;
    };
    smartInsights: {
      title: TranslationKey;
      subtitle: TranslationKey;
    };
  };
  accounts: {
    title: TranslationKey;
    subtitle: {
      play: TranslationKey;
      clarity: TranslationKey;
    };
    activity: {
      title: TranslationKey;
      subtitle: TranslationKey;
      seeAll: TranslationKey;
    };
    management: {
      title: TranslationKey;
      subtitle: TranslationKey;
      connectNew: {
        title: TranslationKey;
        description: TranslationKey;
      };
      importStatements: {
        title: TranslationKey;
        description: TranslationKey;
      };
      manualTransaction: {
        title: TranslationKey;
        description: TranslationKey;
      };
      accountReports: {
        title: TranslationKey;
        description: TranslationKey;
      };
      syncAll: {
        title: TranslationKey;
        description: TranslationKey;
      };
      accountSettings: {
        title: TranslationKey;
        description: TranslationKey;
      };
    };
    intelligence: {
      title: TranslationKey;
      subtitle: TranslationKey;
    };
    security: {
      title: TranslationKey;
      message: TranslationKey;
      features: TranslationKey;
    };
  };
  future: {
    title: TranslationKey;
    subtitle: {
      elder: TranslationKey;
      youth: TranslationKey;
      play: TranslationKey;
      clarity: TranslationKey;
    };
  };
  spending: {
    title: {
      play: TranslationKey;
      clarity: TranslationKey;
    };
    subtitle: {
      play: TranslationKey;
      clarity: TranslationKey;
    };
    stats: {
      totalSpent: TranslationKey;
      budgetUsed: TranslationKey;
      incomeUsed: TranslationKey;
      categories: TranslationKey;
    };
    navigation: {
      spendingGalaxy: TranslationKey;
      timelineRadar: TranslationKey;
      paymentRadar: TranslationKey;
      lifeBalance: TranslationKey;
      recurringRadar: TranslationKey;
      achievements: TranslationKey;
      aiCoach: TranslationKey;
    };
    descriptions: {
      planetView: TranslationKey;
      whenYouSpend: TranslationKey;
      methodAnalysis: TranslationKey;
      needsVsWants: TranslationKey;
      subscriptions: TranslationKey;
      levelUp: TranslationKey;
      smartTips: TranslationKey;
    };
    footer: {
      title: {
        play: TranslationKey;
        clarity: TranslationKey;
      };
      message: {
        play: TranslationKey;
        clarity: TranslationKey;
      };
      tagline: {
        play: TranslationKey;
        clarity: TranslationKey;
      };
    };
  };
  widgets: {
    smartHighlights: {
      defaultTitle: TranslationKey;
      defaultSubtitle: TranslationKey;
    };
  };
}

export interface AppTranslations {
  common: CommonTranslations;
  features: FeatureTranslations;
}

export type TranslationPath = string;
export type TranslationParams = Record<string, string | number>;
