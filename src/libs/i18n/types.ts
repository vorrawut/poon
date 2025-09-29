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
    social: TranslationKey;
    aiCoaching: TranslationKey;
    aiInsights: TranslationKey;
    subscription: TranslationKey;
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
    personalFinance: TranslationKey;
    viewMode: TranslationKey;
    demoUser: TranslationKey;
    demoEmail: TranslationKey;
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
  loading: {
    defaultMessage: TranslationKey;
    subtitle: {
      play: TranslationKey;
      clarity: TranslationKey;
    };
    status: {
      play: TranslationKey;
      clarity: TranslationKey;
    };
  };
  ui: {
    addTransaction: TranslationKey;
    notifications: TranslationKey;
  };

  // Premium Features
  premium: {
    premiumFeature: TranslationKey;
    familyFeature: TranslationKey;
    upgradeToUnlock: TranslationKey;
    upgradeNow: TranslationKey;
    comparePlans: TranslationKey;
    currentPlan: TranslationKey;
    upgrade: TranslationKey;
    plans: {
      free: TranslationKey;
      premium: TranslationKey;
      family: TranslationKey;
    };
    benefits: {
      unlimitedGoals: TranslationKey;
      advancedAI: TranslationKey;
      prioritySupport: TranslationKey;
      familySharing: TranslationKey;
    };
    usage: {
      goals: TranslationKey;
      insights: TranslationKey;
      categories: TranslationKey;
      transactions: TranslationKey;
      accounts: TranslationKey;
      limitReached: TranslationKey;
      nearLimit: TranslationKey;
      available: TranslationKey;
    };
    features: {
      unlimitedGoals: {
        title: TranslationKey;
        description: TranslationKey;
      };
      advancedAI: {
        title: TranslationKey;
        description: TranslationKey;
      };
      familySharing: {
        title: TranslationKey;
        description: TranslationKey;
      };
    };
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
  financialUniverse: {
    loading: {
      message: TranslationKey;
    };
    error: {
      title: TranslationKey;
      message: TranslationKey;
      reload: TranslationKey;
    };
    header: {
      title: TranslationKey;
      subtitle: TranslationKey;
    };
    navigation: {
      quickActions: TranslationKey;
      detailedView: TranslationKey;
      analytics: TranslationKey;
      settings: TranslationKey;
    };
    quickAccess: {
      moonPhases: TranslationKey;
      starConstellation: TranslationKey;
    };
    stats: {
      title: TranslationKey;
      totalWorth: TranslationKey;
      monthlyFlow: TranslationKey;
      activeGoals: TranslationKey;
      goalsAchieved: TranslationKey;
      planetMass: TranslationKey;
      moonCycle: TranslationKey;
      burningStars: TranslationKey;
      ignitedStars: TranslationKey;
    };
    inspirational: {
      title: TranslationKey;
      message: TranslationKey;
    };
    wealthPlanet: {
      title: TranslationKey;
      instructions: TranslationKey;
      status: {
        growing: TranslationKey;
        declining: TranslationKey;
        stable: TranslationKey;
      };
      wealthStatus: {
        millionaire: TranslationKey;
        highNetWorth: TranslationKey;
        buildingWealth: TranslationKey;
        growingStrong: TranslationKey;
        startingJourney: TranslationKey;
      };
    };
    moonPhases: {
      phases: {
        newMoon: {
          name: TranslationKey;
          description: TranslationKey;
        };
        waxingCrescent: {
          name: TranslationKey;
          description: TranslationKey;
        };
        firstQuarter: {
          name: TranslationKey;
          description: TranslationKey;
        };
        waxingGibbous: {
          name: TranslationKey;
          description: TranslationKey;
        };
        fullMoon: {
          name: TranslationKey;
          description: TranslationKey;
        };
        waningGibbous: {
          name: TranslationKey;
          description: TranslationKey;
        };
        lastQuarter: {
          name: TranslationKey;
          description: TranslationKey;
        };
        waningCrescent: {
          name: TranslationKey;
          description: TranslationKey;
        };
      };
      comparison: TranslationKey;
    };
  };

  subscription: {
    title: TranslationKey;
    subtitle: TranslationKey;
    monthly: TranslationKey;
    yearly: TranslationKey;
    plans: {
      free: {
        name: TranslationKey;
        description: TranslationKey;
        features: {
          basicTracking: TranslationKey;
          threeGoals: TranslationKey;
          manualEntry: TranslationKey;
          basicInsights: TranslationKey;
        };
      };
      premium: {
        name: TranslationKey;
        description: TranslationKey;
        popular: TranslationKey;
        features: {
          unlimitedGoals: TranslationKey;
          advancedAI: TranslationKey;
          investmentTracking: TranslationKey;
          prioritySupport: TranslationKey;
        };
      };
      family: {
        name: TranslationKey;
        description: TranslationKey;
        features: {
          allPremium: TranslationKey;
          fiveMembers: TranslationKey;
          familyDashboard: TranslationKey;
          sharedGoals: TranslationKey;
        };
      };
    };
    actions: {
      choosePlan: TranslationKey;
      currentPlan: TranslationKey;
      upgrade: TranslationKey;
      cancel: TranslationKey;
      choose: TranslationKey;
    };
    pricing: {
      free: TranslationKey;
      month: TranslationKey;
      year: TranslationKey;
      save: TranslationKey;
      perYear: TranslationKey;
    };
    comparison: {
      title: TranslationKey;
      features: {
        goals: TranslationKey;
        insights: TranslationKey;
        investment: TranslationKey;
        members: TranslationKey;
        support: TranslationKey;
      };
      values: {
        basic: TranslationKey;
        advanced: TranslationKey;
        unlimited: TranslationKey;
        included: TranslationKey;
        notIncluded: TranslationKey;
      };
    };
  };

  social: {
    title: TranslationKey;
    subtitle: TranslationKey;
    loading: TranslationKey;
    error: TranslationKey;
    tabs: {
      profile: TranslationKey;
      challenges: TranslationKey;
      friends: TranslationKey;
      leaderboard: TranslationKey;
    };
    hub: {
      title: TranslationKey;
      subtitle: {
        play: TranslationKey;
        clarity: TranslationKey;
      };
    };
    stats: {
      friends: TranslationKey;
      achievements: TranslationKey;
      rank: TranslationKey;
      challenges: TranslationKey;
      engagement: TranslationKey;
    };
  };

  aiInsights: {
    title: TranslationKey;
    subtitle: TranslationKey;
    tabs: {
      dashboard: TranslationKey;
      patterns: TranslationKey;
      goals: TranslationKey;
      risk: TranslationKey;
    };
    cards: {
      smartInsights: {
        title: TranslationKey;
        description: TranslationKey;
      };
      riskAssessment: {
        title: TranslationKey;
        description: TranslationKey;
      };
      recommendations: {
        title: TranslationKey;
        description: TranslationKey;
      };
    };
    features: {
      spendingAnalysis: TranslationKey;
      goalOptimization: TranslationKey;
      healthScore: TranslationKey;
      predictiveAnalytics: TranslationKey;
      patternDetection: {
        title: TranslationKey;
        description: TranslationKey;
      };
      goalAcceleration: {
        title: TranslationKey;
        description: TranslationKey;
      };
      riskMitigation: {
        title: TranslationKey;
        description: TranslationKey;
      };
    };
  };

  aiCoaching: {
    title: TranslationKey;
    subtitle: TranslationKey;
    placeholder: {
      title: TranslationKey;
      message: TranslationKey;
    };
  };
}

export interface AppTranslations {
  common: CommonTranslations;
  features: FeatureTranslations;
}

export type TranslationPath = string;
export type TranslationParams = Record<string, string | number>;
