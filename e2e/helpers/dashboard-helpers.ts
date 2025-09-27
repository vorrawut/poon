import { Page, expect } from '@playwright/test';

export class DashboardHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for the dashboard to fully load with all widgets
   */
  async waitForDashboardLoad() {
    // Wait for main dashboard container
    await this.page.waitForSelector('.max-w-7xl', { timeout: 15000 });
    
    // Wait for loading states to disappear
    await this.page.waitForFunction(() => {
      const loadingElements = document.querySelectorAll('[class*="animate-pulse"], [class*="loading"]');
      return loadingElements.length === 0;
    }, { timeout: 30000 });
    
    // Wait for at least one piece of financial data to appear
    await this.page.waitForFunction(() => {
      // Look for currency symbols, numbers, or financial data indicators
      const text = document.body.textContent || '';
      return text.includes('$') || 
             text.includes('Net Worth') || 
             text.includes('Total') ||
             /\d+,\d+/.test(text); // Look for formatted numbers
    }, { timeout: 20000 });
  }

  /**
   * Wait for Net Worth widget to load with data
   */
  async waitForNetWorthWidget() {
    // Wait for the net worth widget container
    await this.page.waitForSelector('.rounded-2xl.bg-gradient-to-br', { timeout: 15000 });
    
    // Wait for actual net worth value to appear (not loading state)
    await this.page.waitForFunction(() => {
      const text = document.body.textContent || '';
      // Look for dollar amounts that aren't zero
      const dollarAmounts = text.match(/\$[\d,]+/g);
      return dollarAmounts && dollarAmounts.some(amount => 
        !amount.includes('$0') && !amount.includes('$0.00')
      );
    }, { timeout: 20000 });
  }

  /**
   * Wait for Accounts Overview widget to load
   */
  async waitForAccountsWidget() {
    // Look for account cards or account information
    await this.page.waitForFunction(() => {
      const text = document.body.textContent || '';
      return text.includes('Assets') || 
             text.includes('Liabilities') ||
             text.includes('Account') ||
             text.includes('Checking') ||
             text.includes('Savings');
    }, { timeout: 20000 });
  }

  /**
   * Wait for Quick Actions widget to load
   */
  async waitForQuickActionsWidget() {
    // Wait for quick action buttons
    await this.page.waitForFunction(() => {
      const text = document.body.textContent || '';
      return text.includes('Quick Actions') ||
             text.includes('Add Transaction') ||
             text.includes('Import CSV');
    }, { timeout: 15000 });
  }

  /**
   * Wait for Recent Transactions widget to load
   */
  async waitForTransactionsWidget() {
    // Wait for transactions data
    await this.page.waitForFunction(() => {
      const text = document.body.textContent || '';
      return text.includes('Recent Transactions') ||
             text.includes('transaction') ||
             text.includes('Whole Foods') ||
             text.includes('Netflix') ||
             text.includes('Salary');
    }, { timeout: 20000 });
  }

  /**
   * Get net worth value from the widget
   */
  async getNetWorthValue(): Promise<string> {
    await this.waitForNetWorthWidget();
    
    // Look for the main net worth display
    const netWorthElement = this.page.locator('.text-5xl.font-bold').first();
    return await netWorthElement.textContent() || '0';
  }

  /**
   * Get account count from accounts widget
   */
  async getAccountCount(): Promise<number> {
    await this.waitForAccountsWidget();
    
    // Count visible account items
    return await this.page.locator('[class*="account"], [class*="card"]').count();
  }

  /**
   * Get transaction count from transactions widget
   */
  async getTransactionCount(): Promise<number> {
    await this.waitForTransactionsWidget();
    
    // Count transaction items
    return await this.page.locator('[class*="transaction"]').count();
  }

  /**
   * Click on a quick action button
   */
  async clickQuickAction(actionName: string) {
    await this.waitForQuickActionsWidget();
    
    const button = this.page.getByText(actionName);
    await expect(button).toBeVisible();
    await button.click();
  }

  /**
   * Change time range in the dashboard
   */
  async changeTimeRange(range: '7 days' | '30 days' | '90 days') {
    const timeRangeButton = this.page.getByText(range);
    await expect(timeRangeButton).toBeVisible();
    await timeRangeButton.click();
  }

  /**
   * Verify all core widgets are present and loaded
   */
  async verifyAllWidgetsLoaded() {
    console.log('🔍 Verifying all dashboard widgets are loaded...');
    
    await this.waitForDashboardLoad();
    
    // Verify Net Worth Widget
    await this.waitForNetWorthWidget();
    console.log('✅ Net Worth widget loaded');
    
    // Verify Accounts Widget  
    await this.waitForAccountsWidget();
    console.log('✅ Accounts widget loaded');
    
    // Verify Quick Actions Widget
    await this.waitForQuickActionsWidget();
    console.log('✅ Quick Actions widget loaded');
    
    // Verify Transactions Widget
    await this.waitForTransactionsWidget();
    console.log('✅ Transactions widget loaded');
    
    console.log('🎉 All widgets verified successfully!');
  }

  /**
   * Take screenshot for debugging
   */
  async takeDebugScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `e2e-results/debug-${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  /**
   * Wait for animations to complete
   */
  async waitForAnimations() {
    // Wait for GSAP animations and CSS animations to complete
    await this.page.waitForTimeout(1000); // Give animations time to start
    
    await this.page.waitForFunction(() => {
      // Check if any elements have running animations
      const animatedElements = Array.from(document.querySelectorAll('*')).filter(el => {
        const computedStyle = window.getComputedStyle(el);
        return computedStyle.animationPlayState === 'running' || 
               computedStyle.transitionProperty !== 'none';
      });
      
      return animatedElements.length === 0;
    }, { timeout: 5000 }).catch(() => {
      // If we can't detect animations ending, just wait a bit longer
      console.log('⏰ Animations timeout - continuing with tests');
    });
  }
}
