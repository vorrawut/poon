/**
 * Test fixtures and expected data for E2E tests
 * This should match the mock data used in the application
 */

export const expectedMockData = {
  netWorth: {
    // Expected values from mock data (approximately)
    totalRange: {
      min: 300000,
      max: 310000,
    },
    changeRange: {
      min: 5000,
      max: 10000,
    },
    percentChangeRange: {
      min: 2.0,
      max: 3.5,
    }
  },

  accounts: {
    expectedTypes: [
      'Checking',
      'Savings',
      'Investment',
      'Credit',
      'Loan'
    ],
    expectedProviders: [
      'Chase Bank',
      'Ally Bank',
      'Capital One',
      'Fidelity Investments',
      'Vanguard',
      'Robinhood',
      'American Express',
      'Toyota Financial'
    ],
    minimumCount: 8, // Should have at least 8 accounts in mock data
  },

  transactions: {
    expectedMerchants: [
      'Whole Foods Market',
      'Netflix',
      'Amazon.com',
      'Starbucks',
      'Shell',
      'Equinox'
    ],
    expectedCategories: [
      'groceries',
      'subscriptions',
      'salary',
      'interest',
      'dining',
      'shopping',
      'transportation',
      'health',
      'housing',
      'utilities'
    ],
    minimumCount: 10, // Should have at least 10 transactions
  },

  ui: {
    expectedQuickActions: [
      'Add Transaction',
      'Import CSV',
      'Link Account',
      'View Analytics'
    ],
    timeRangeOptions: [
      '7 days',
      '30 days', 
      '90 days'
    ],
    defaultTimeRange: '30 days',
  },

  formatting: {
    currencyRegex: /\$[\d,]+(\.\d{2})?/,
    percentRegex: /[\+\-]?[\d.]+%/,
    dateRegex: /\d{1,2}\/\d{1,2}\/\d{4}|\w+ \d{1,2}, \d{4}/,
  }
};

export const testViewports = {
  desktop: { width: 1280, height: 720 },
  laptop: { width: 1024, height: 768 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
  largeMobile: { width: 414, height: 896 },
};

export const testTimeouts = {
  short: 5000,
  medium: 15000,
  long: 30000,
  animation: 2000,
};

export class MockDataValidator {
  /**
   * Validate that net worth values are in expected range
   */
  static isValidNetWorth(value: string): boolean {
    const numericValue = parseFloat(value.replace(/[$,]/g, ''));
    return numericValue >= expectedMockData.netWorth.totalRange.min && 
           numericValue <= expectedMockData.netWorth.totalRange.max;
  }

  /**
   * Validate that a currency string is properly formatted
   */
  static isValidCurrencyFormat(value: string): boolean {
    return expectedMockData.formatting.currencyRegex.test(value);
  }

  /**
   * Validate that a percentage is properly formatted
   */
  static isValidPercentFormat(value: string): boolean {
    return expectedMockData.formatting.percentRegex.test(value);
  }

  /**
   * Check if text contains expected account types
   */
  static hasExpectedAccountTypes(text: string): boolean {
    return expectedMockData.accounts.expectedTypes.some(type => 
      text.includes(type)
    );
  }

  /**
   * Check if text contains expected transaction merchants
   */
  static hasExpectedTransactions(text: string): boolean {
    return expectedMockData.transactions.expectedMerchants.some(merchant => 
      text.includes(merchant)
    );
  }

  /**
   * Check if text contains expected quick actions
   */
  static hasExpectedQuickActions(text: string): boolean {
    return expectedMockData.ui.expectedQuickActions.some(action => 
      text.includes(action)
    );
  }

  /**
   * Extract all currency values from text
   */
  static extractCurrencyValues(text: string): number[] {
    const matches = text.match(/\$[\d,]+(\.\d{2})?/g) || [];
    return matches.map(match => parseFloat(match.replace(/[$,]/g, '')));
  }

  /**
   * Extract all percentage values from text
   */
  static extractPercentageValues(text: string): number[] {
    const matches = text.match(/[\+\-]?[\d.]+%/g) || [];
    return matches.map(match => parseFloat(match.replace(/[%\+]/g, '')));
  }
}
