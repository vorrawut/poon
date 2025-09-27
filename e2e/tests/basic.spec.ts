import { test, expect } from '@playwright/test';

test.describe('Basic Dashboard Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load dashboard page successfully', async ({ page }) => {
    await test.step('Verify page loads', async () => {
      await expect(page).toHaveTitle(/Poon/);
      await expect(page.locator('body')).toBeVisible();
    });

    await test.step('Verify welcome message appears', async () => {
      await expect(page.getByText('Welcome back!')).toBeVisible({ timeout: 10000 });
    });

    await test.step('Verify financial overview text', async () => {
      await expect(page.getByText('financial overview')).toBeVisible({ timeout: 10000 });
    });
  });

  test('should show some financial data', async ({ page }) => {
    await test.step('Wait for content to load', async () => {
      // Wait for any dollar sign to appear (indicating financial data)
      await page.waitForFunction(() => {
        return document.body.textContent?.includes('$') || false;
      }, { timeout: 20000 });
    });

    await test.step('Verify financial data is present', async () => {
      const pageText = await page.textContent('body');
      expect(pageText).toContain('$');
    });
  });

  test('should have time range selector', async ({ page }) => {
    await test.step('Verify time range buttons exist', async () => {
      await expect(page.getByText('30 days')).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('7 days')).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('90 days')).toBeVisible({ timeout: 10000 });
    });

    await test.step('Verify time range can be changed', async () => {
      await page.getByText('7 days').click();
      await expect(page.locator('.bg-white.text-blue-600')).toContainText('7 days');
    });
  });

  test('should be mobile responsive', async ({ page }) => {
    await test.step('Set mobile viewport', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
    });

    await test.step('Verify mobile layout', async () => {
      await expect(page.getByText('Welcome back!')).toBeVisible();
      
      // Take a screenshot for manual review
      await page.screenshot({ 
        path: 'e2e-results/mobile-basic.png',
        fullPage: true 
      });
    });
  });

  test('should not have critical JavaScript errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await test.step('Load page and wait', async () => {
      await page.goto('/');
      await page.waitForTimeout(5000); // Give time for any errors to surface
    });

    await test.step('Check for critical errors', async () => {
      const criticalErrors = consoleErrors.filter(error => 
        !error.includes('favicon.ico') &&
        !error.includes('Extension') &&
        !error.toLowerCase().includes('warning') &&
        !error.includes('fonts.googleapis.com')
      );

      if (criticalErrors.length > 0) {
        console.log('Critical errors found:', criticalErrors);
      }
      
      expect(criticalErrors.length).toBe(0);
    });
  });
});
