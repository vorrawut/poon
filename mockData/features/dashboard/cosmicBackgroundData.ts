// Ultimate cosmic background configuration data
export const mockCosmicBackgroundData = {
  // Base cosmic settings
  settings: {
    intensity: "high" as const,
    showNebula: true,
    showShootingStars: true,
    showParticles: true,
    show3DStars: true,
    interactive: true,
  },

  // Financial activity levels that affect cosmic intensity
  financialActivityLevels: {
    dormant: {
      value: 0.1,
      description: "Minimal financial activity - calm cosmic space",
      effects: {
        particleDensity: "low",
        shootingStarFrequency: 0.1,
        nebulaIntensity: 0.3,
        sparkleSpeed: 0.2,
      }
    },
    steady: {
      value: 0.4,
      description: "Regular financial activity - gentle cosmic movement",
      effects: {
        particleDensity: "medium",
        shootingStarFrequency: 0.3,
        nebulaIntensity: 0.6,
        sparkleSpeed: 0.4,
      }
    },
    active: {
      value: 0.7,
      description: "High financial activity - dynamic cosmic energy",
      effects: {
        particleDensity: "high",
        shootingStarFrequency: 0.6,
        nebulaIntensity: 0.8,
        sparkleSpeed: 0.7,
      }
    },
    explosive: {
      value: 1.0,
      description: "Peak financial activity - cosmic storm",
      effects: {
        particleDensity: "ultra",
        shootingStarFrequency: 1.0,
        nebulaIntensity: 1.0,
        sparkleSpeed: 1.0,
      }
    }
  },

  // Cosmic themes for different financial contexts
  cosmicThemes: {
    wealth_growth: {
      primaryColor: "#10B981", // Green
      secondaryColor: "#34D399",
      nebulaColor: "#065F46",
      description: "Prosperity and growth theme",
      effects: {
        particleColor: "#10B981",
        shootingStarColor: "#34D399",
        glowIntensity: 0.8,
      }
    },
    goal_achievement: {
      primaryColor: "#F59E0B", // Amber
      secondaryColor: "#FCD34D", 
      nebulaColor: "#92400E",
      description: "Achievement and success theme",
      effects: {
        particleColor: "#F59E0B",
        shootingStarColor: "#FCD34D",
        glowIntensity: 1.0,
      }
    },
    spending_control: {
      primaryColor: "#3B82F6", // Blue
      secondaryColor: "#60A5FA",
      nebulaColor: "#1E40AF",
      description: "Control and stability theme",
      effects: {
        particleColor: "#3B82F6",
        shootingStarColor: "#60A5FA",
        glowIntensity: 0.6,
      }
    },
    risk_warning: {
      primaryColor: "#EF4444", // Red
      secondaryColor: "#F87171",
      nebulaColor: "#B91C1C",
      description: "Caution and risk awareness theme",
      effects: {
        particleColor: "#EF4444",
        shootingStarColor: "#F87171",
        glowIntensity: 0.9,
      }
    },
    balance_harmony: {
      primaryColor: "#8B5CF6", // Purple
      secondaryColor: "#A78BFA",
      nebulaColor: "#6D28D9",
      description: "Balance and harmony theme",
      effects: {
        particleColor: "#8B5CF6",
        shootingStarColor: "#A78BFA",
        glowIntensity: 0.7,
      }
    }
  },

  // Dynamic cosmic events triggered by financial actions
  cosmicEvents: {
    goal_completed: {
      name: "Goal Ignition",
      duration: 5000, // 5 seconds
      effects: {
        shootingStarBurst: 10,
        particleExplosion: true,
        intensityBoost: 0.5,
        specialColor: "#FFD700", // Gold
      },
      description: "Spectacular cosmic celebration when a goal is completed"
    },
    large_expense: {
      name: "Cosmic Turbulence", 
      duration: 3000,
      effects: {
        redShootingStars: 5,
        particleScatter: true,
        intensitySpike: 0.3,
        specialColor: "#EF4444", // Red
      },
      description: "Cosmic disturbance indicating significant spending"
    },
    savings_milestone: {
      name: "Stellar Alignment",
      duration: 4000,
      effects: {
        blueShootingStars: 7,
        particleAlignment: true,
        intensityGlow: 0.4,
        specialColor: "#10B981", // Green
      },
      description: "Harmonious cosmic alignment for savings achievements"
    },
    investment_gain: {
      name: "Nebula Expansion",
      duration: 6000,
      effects: {
        nebulaGrowth: true,
        goldenParticles: true,
        intensityWave: 0.6,
        specialColor: "#F59E0B", // Amber
      },
      description: "Expanding cosmic energy from investment success"
    },
    budget_exceeded: {
      name: "Cosmic Storm",
      duration: 2500,
      effects: {
        chaosParticles: true,
        rapidShootingStars: 8,
        intensityFluctuation: 0.7,
        specialColor: "#DC2626", // Dark Red
      },
      description: "Turbulent cosmic activity when budget limits are exceeded"
    }
  },

  // Seasonal cosmic variations (Thai cultural integration)
  seasonalVariations: {
    songkran: {
      period: "April",
      theme: "water_celebration",
      effects: {
        blueParticles: true,
        flowingMotion: true,
        celebrationBursts: 0.8,
        description: "Water festival cosmic celebration"
      }
    },
    vesakhaBucha: {
      period: "May",
      theme: "spiritual_enlightenment", 
      effects: {
        goldenGlow: true,
        peacefulMotion: true,
        serenityParticles: 0.6,
        description: "Enlightened cosmic tranquility"
      }
    },
    lentBuddhist: {
      period: "July-October",
      theme: "mindful_restraint",
      effects: {
        calmParticles: true,
        slowMotion: true,
        minimalistGlow: 0.4,
        description: "Mindful and restrained cosmic energy"
      }
    },
    newYear: {
      period: "December-January",
      theme: "celebration_prosperity",
      effects: {
        fireworkParticles: true,
        celebrationBursts: 1.0,
        prosperityGlow: 0.9,
        description: "New Year cosmic celebration and prosperity"
      }
    }
  },

  // Responsive cosmic intensity based on financial metrics
  financialResponseMapping: {
    netWorthGrowth: {
      positive: {
        threshold: 5, // 5% growth
        cosmicResponse: "wealth_growth",
        activityBoost: 0.3,
      },
      negative: {
        threshold: -5, // 5% decline
        cosmicResponse: "risk_warning",
        activityBoost: 0.2,
      }
    },
    goalProgress: {
      milestone: {
        threshold: 25, // Every 25% progress
        cosmicResponse: "goal_achievement",
        activityBoost: 0.4,
      },
      completion: {
        threshold: 100, // Goal completed
        cosmicResponse: "goal_completed",
        activityBoost: 1.0,
      }
    },
    spendingPattern: {
      underBudget: {
        threshold: -10, // 10% under budget
        cosmicResponse: "balance_harmony",
        activityBoost: 0.2,
      },
      overBudget: {
        threshold: 10, // 10% over budget
        cosmicResponse: "spending_control",
        activityBoost: 0.5,
      },
      wayOverBudget: {
        threshold: 25, // 25% over budget
        cosmicResponse: "budget_exceeded",
        activityBoost: 0.8,
      }
    }
  },

  // Performance optimization settings
  performanceSettings: {
    mobile: {
      particleCount: 500,
      shootingStarFrequency: 0.2,
      nebulaComplexity: "low",
      frameRateTarget: 30,
    },
    desktop: {
      particleCount: 2000,
      shootingStarFrequency: 0.5,
      nebulaComplexity: "high", 
      frameRateTarget: 60,
    },
    highEnd: {
      particleCount: 5000,
      shootingStarFrequency: 1.0,
      nebulaComplexity: "ultra",
      frameRateTarget: 120,
    }
  },

  // Current cosmic state (dynamic)
  currentState: {
    activeTheme: "balance_harmony",
    financialActivity: 0.6,
    intensity: "high",
    activeEvents: [],
    seasonalModifier: "normal",
    lastUpdate: new Date().toISOString(),
  }
};

// Utility functions for cosmic background management
export const cosmicBackgroundUtils = {
  calculateFinancialActivity: (metrics: {
    netWorthChange: number;
    goalProgress: number;
    spendingVariance: number;
    transactionCount: number;
  }) => {
    const { netWorthChange, goalProgress, spendingVariance, transactionCount } = metrics;
    
    let activity = 0.3; // Base activity
    
    // Net worth impact
    activity += Math.abs(netWorthChange) / 100 * 0.3;
    
    // Goal progress impact
    activity += goalProgress / 100 * 0.2;
    
    // Spending variance impact
    activity += Math.abs(spendingVariance) / 50 * 0.3;
    
    // Transaction frequency impact
    activity += Math.min(transactionCount / 20, 1) * 0.2;
    
    return Math.min(activity, 1.0);
  },

  getCosmicTheme: (financialContext: string) => {
    const themeMap: { [key: string]: string } = {
      "wealth_growing": "wealth_growth",
      "goal_achieved": "goal_achievement", 
      "spending_controlled": "spending_control",
      "risk_detected": "risk_warning",
      "balanced": "balance_harmony",
    };
    
    return themeMap[financialContext] || "balance_harmony";
  },

  triggerCosmicEvent: (eventType: string) => {
    const event = mockCosmicBackgroundData.cosmicEvents[eventType as keyof typeof mockCosmicBackgroundData.cosmicEvents];
    if (event) {
      return {
        ...event,
        triggeredAt: Date.now(),
        id: Math.random().toString(36).substr(2, 9),
      };
    }
    return null;
  },

  getSeasonalModifier: (date: Date = new Date()) => {
    const month = date.getMonth() + 1; // 1-12
    
    if (month === 4) return "songkran";
    if (month === 5) return "vesakhaBucha";
    if (month >= 7 && month <= 10) return "lentBuddhist";
    if (month === 12 || month === 1) return "newYear";
    
    return "normal";
  }
};
