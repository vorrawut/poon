// Environment configuration for different deployment modes
export type Environment = 'local' | 'development' | 'production' | 'test';
export type DataSource = 'mock' | 'api' | 'hybrid';

export interface AppConfig {
  // App Info
  appName: string;
  appVersion: string;
  appDescription: string;
  
  // Environment
  environment: Environment;
  isDevelopment: boolean;
  isProduction: boolean;
  isLocal: boolean;
  
  // API Configuration
  apiBaseUrl: string;
  apiTimeout: number;
  
  // Data Source
  dataSource: DataSource;
  mockApiDelay: number;
  mockEnableErrors: boolean;
  
  // Features
  features: {
    analytics: boolean;
    insights: boolean;
    csvImport: boolean;
    bankLinking: boolean;
    animations: boolean;
    debugMode: boolean;
  };
  
  // Development Tools
  devTools: {
    reduxDevtools: boolean;
    reactProfiler: boolean;
  };
}

// Base configuration
const baseConfig = {
  appName: 'Poon',
  appVersion: '1.0.0',
  appDescription: 'Personal Finance Visualizer',
  apiTimeout: 10000,
  features: {
    analytics: true,
    insights: true,
    csvImport: true,
    bankLinking: true,
    animations: true,
    debugMode: false,
  },
};

// Local environment (mock data for offline development)
const localConfig: AppConfig = {
  ...baseConfig,
  environment: 'local',
  isDevelopment: false,
  isProduction: false,
  isLocal: true,
  apiBaseUrl: 'http://localhost:3001/api',
  dataSource: 'mock',
  mockApiDelay: 0, // No delay for testing
  mockEnableErrors: false,
  features: {
    ...baseConfig.features,
    debugMode: true,
  },
  devTools: {
    reduxDevtools: true,
    reactProfiler: true,
  },
};

// Development environment (mock data for local development)
const developmentConfig: AppConfig = {
  ...baseConfig,
  environment: 'development',
  isDevelopment: true,
  isProduction: false,
  isLocal: false,
  apiBaseUrl: 'http://localhost:3001/api',
  dataSource: 'mock', // Use mock data for local development
  mockApiDelay: 800, // Realistic loading experience
  mockEnableErrors: false, // Disable errors for better UX
  features: {
    ...baseConfig.features,
    debugMode: true,
  },
  devTools: {
    reduxDevtools: true,
    reactProfiler: false,
  },
};

// Production environment
const productionConfig: AppConfig = {
  ...baseConfig,
  environment: 'production',
  isDevelopment: false,
  isProduction: true,
  isLocal: false,
  apiBaseUrl: 'https://api.poon.finance/api', // Production API URL
  dataSource: 'api',
  mockApiDelay: 0,
  mockEnableErrors: false,
  features: {
    ...baseConfig.features,
    debugMode: false,
  },
  devTools: {
    reduxDevtools: false,
    reactProfiler: false,
  },
};

// Test environment (same as local but optimized for testing)
const testConfig: AppConfig = {
  ...baseConfig,
  environment: 'test',
  isDevelopment: false,
  isProduction: false,
  isLocal: false,
  apiBaseUrl: 'http://localhost:3001/api',
  dataSource: 'mock', // Always use mock data for tests
  mockApiDelay: 0, // No delays in tests
  mockEnableErrors: false,
  features: {
    ...baseConfig.features,
    debugMode: false, // Reduce noise in test output
    animations: false, // Disable animations in tests
  },
  devTools: {
    reduxDevtools: false,
    reactProfiler: false,
  },
};

// Environment selection logic
export function getConfig(): AppConfig {
  // Check for explicit environment variable first
  const viteMode = import.meta.env.VITE_APP_ENV;
  const nodeEnv = import.meta.env.NODE_ENV;
  const mode = import.meta.env.MODE;
  
  // Priority: VITE_APP_ENV > MODE > NODE_ENV
  const environment = viteMode || mode || nodeEnv || 'development';
  
  console.info(`🌍 Environment: ${environment}`);
  
  switch (environment) {
    case 'local':
      return localConfig;
    case 'test':
      return testConfig;
    case 'production':
      return productionConfig;
    case 'development':
    default:
      return developmentConfig;
  }
}

// Export the current config
export const config = getConfig();

// Helper functions
export const isLocal = () => config.isLocal;
export const isDevelopment = () => config.isDevelopment;
export const isProduction = () => config.isProduction;
export const shouldUseMockData = () => config.dataSource === 'mock' || (config.dataSource === 'hybrid' && config.isLocal);

// Debug logging
if (config.features.debugMode) {
  console.table({
    Environment: config.environment,
    'Data Source': config.dataSource,
    'API Base URL': config.apiBaseUrl,
    'Mock Delay': config.mockApiDelay + 'ms',
    'Debug Mode': config.features.debugMode,
  });
}
