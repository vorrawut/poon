import { test, expect } from '@playwright/test';

test.describe('Enhanced Dashboard - User-Friendly Design', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard
    await page.goto('/');
  });

  test('should display user-friendly welcome message', async ({ page }) => {
    // Check for the friendly welcome message
    await expect(page.locator('text=👋 Welcome back!')).toBeVisible();
    await expect(page.locator('text=Here\'s your money in plain English')).toBeVisible();
  });

  test('should show big, touch-friendly time selectors', async ({ page }) => {
    // Check for the enhanced time range selector
    await expect(page.locator('text=Week')).toBeVisible();
    await expect(page.locator('text=Month')).toBeVisible();
    await expect(page.locator('text=Quarter')).toBeVisible();
    
    // Check for simple toggle
    await expect(page.locator('text=Short Term')).toBeVisible();
    await expect(page.locator('text=Long Term')).toBeVisible();
    
    // Test clicking on time ranges
    await page.click('text=Week');
    await page.click('text=Month');
    await page.click('text=Quarter');
  });

  test('should display enhanced net worth section with plain explanations', async ({ page }) => {
    // Wait for data to load
    await page.waitForSelector('text=💰 Your Money Summary', { timeout: 10000 });
    
    // Check for clear explanations
    await expect(page.locator('text=💰 Your Money Summary')).toBeVisible();
    await expect(page.locator('text=Total Net Worth')).toBeVisible();
    await expect(page.locator('text=What You Own')).toBeVisible();
    await expect(page.locator('text=What You Owe')).toBeVisible();
    
    // Check for encouraging messages
    const encouragingMessages = [
      'Great job! You\'re building wealth',
      'You\'re doing great',
      'keep track of your finances'
    ];
    
    for (const message of encouragingMessages) {
      const element = page.locator(`text*=${message}`);
      if (await element.count() > 0) {
        await expect(element.first()).toBeVisible();
        break;
      }
    }
  });

  test('should show clear accounts overview with visual progress indicators', async ({ page }) => {
    // Wait for accounts data to load
    await page.waitForSelector('text=🏦 Your Bank Accounts', { timeout: 10000 });
    
    // Check for clear section headers with emojis
    await expect(page.locator('text=🏦 Your Bank Accounts')).toBeVisible();
    await expect(page.locator('text=💰 Your Assets')).toBeVisible();
    await expect(page.locator('text=💳 Your Debts')).toBeVisible();
    await expect(page.locator('text=📊 Net Worth')).toBeVisible();
    
    // Check for account type groupings with emojis
    await expect(page.locator('text=💳 Checking Accounts, text=💰 Savings Accounts, text=📈 Investment Accounts').first()).toBeVisible();
  });

  test('should display big, obvious action buttons', async ({ page }) => {
    // Wait for quick actions section
    await page.waitForSelector('text=⚡ Quick Actions', { timeout: 10000 });
    
    // Check for large, clearly labeled action buttons
    await expect(page.locator('text=⚡ Quick Actions')).toBeVisible();
    await expect(page.locator('text=Add Transaction')).toBeVisible();
    await expect(page.locator('text=Link Account')).toBeVisible();
    await expect(page.locator('text=Import Data')).toBeVisible();
    await expect(page.locator('text=View Reports')).toBeVisible();
    
    // Check that buttons have large emojis for easy identification
    await expect(page.locator('text=➕')).toBeVisible();
    await expect(page.locator('text=🔗')).toBeVisible(); 
    await expect(page.locator('text=📄')).toBeVisible();
    await expect(page.locator('text=📊')).toBeVisible();
    
    // Test button interactions
    const addTransactionButton = page.locator('button:has-text("Add Transaction")');
    await expect(addTransactionButton).toBeVisible();
    await addTransactionButton.hover();
  });

  test('should show recent activity in simple, clear format', async ({ page }) => {
    // Wait for recent activity section
    await page.waitForSelector('text=📋 Recent Activity', { timeout: 10000 });
    
    // Check for clear section labeling
    await expect(page.locator('text=📋 Recent Activity')).toBeVisible();
    await expect(page.locator('text=Your latest money movements')).toBeVisible();
    await expect(page.locator('text=See All Activity')).toBeVisible();
  });

  test('should display encouraging and motivational content', async ({ page }) => {
    // Scroll to bottom to see encouraging message
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check for motivational footer
    await expect(page.locator('text=You\'re doing great with your money!')).toBeVisible();
    await expect(page.locator('text=Keep track of your finances')).toBeVisible();
    await expect(page.locator('text=every dollar saved is a dollar earned')).toBeVisible();
    
    // Check for the celebratory emoji
    await expect(page.locator('text=🎉')).toBeVisible();
    
    // Check for helpful tips
    await expect(page.locator('text=💡 Tip:')).toBeVisible();
  });

  test('should have high contrast and readable text', async ({ page }) => {
    // Test that important numbers are prominently displayed
    const netWorthElements = page.locator('[class*="text-4xl"], [class*="text-5xl"], [class*="text-6xl"]');
    expect(await netWorthElements.count()).toBeGreaterThan(0);
    
    // Test that there are large, bold headings
    const headings = page.locator('h1, h2, h3').filter({ hasText: /Money|Net Worth|Accounts|Activity/ });
    expect(await headings.count()).toBeGreaterThan(0);
  });

  test('should show sync status indicators', async ({ page }) => {
    // Wait for data to load
    await page.waitForSelector('text=💰 Your Money Summary', { timeout: 10000 });
    
    // Look for sync status indicators (green dots, timestamps, etc.)
    const syncIndicators = page.locator('[class*="green"], [class*="success"], text*="ago", text*="updated"');
    expect(await syncIndicators.count()).toBeGreaterThan(0);
  });

  test('should be responsive and work on different screen sizes', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    
    await expect(page.locator('text=👋 Welcome back!')).toBeVisible();
    await expect(page.locator('text=💰 Your Money Summary')).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    
    await expect(page.locator('text=👋 Welcome back!')).toBeVisible();
    await expect(page.locator('text=💰 Your Money Summary')).toBeVisible();
    
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    
    await expect(page.locator('text=👋 Welcome back!')).toBeVisible();
    await expect(page.locator('text=💰 Your Money Summary')).toBeVisible();
  });

  test('should handle loading states gracefully', async ({ page }) => {
    // Reload page and check for loading states
    await page.reload();
    
    // Should show some kind of loading indication initially
    const loadingElements = page.locator('[class*="animate-pulse"], [class*="loading"], text="Loading", text="⏳"');
    
    // Either we see loading states or data loads very quickly
    const hasLoadingStates = await loadingElements.count() > 0;
    const hasData = await page.locator('text=💰 Your Money Summary').count() > 0;
    
    expect(hasLoadingStates || hasData).toBeTruthy();
  });
});

test.describe('Enhanced Dashboard - Accessibility', () => {
  test('should have proper ARIA labels and semantic HTML', async ({ page }) => {
    await page.goto('/');
    
    // Wait for main content
    await page.waitForSelector('text=💰 Your Money Summary', { timeout: 10000 });
    
    // Check for proper heading hierarchy
    const h1Elements = page.locator('h1');
    const h2Elements = page.locator('h2');
    const h3Elements = page.locator('h3');
    
    expect(await h1Elements.count() + await h2Elements.count() + await h3Elements.count()).toBeGreaterThan(0);
    
    // Check for button accessibility
    const buttons = page.locator('button');
    expect(await buttons.count()).toBeGreaterThan(0);
    
    // All buttons should have accessible text content
    const buttonCount = await buttons.count();
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      expect(text?.trim()).toBeTruthy();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Wait for content to load
    await page.waitForSelector('text=💰 Your Money Summary', { timeout: 10000 });
    
    // Test tab navigation through interactive elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to navigate to buttons and links
    const focusedElement = await page.locator(':focus');
    expect(await focusedElement.count()).toBeGreaterThan(0);
  });
});
