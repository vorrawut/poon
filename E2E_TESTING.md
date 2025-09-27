# 🎭 End-to-End Testing with Playwright

This document provides a comprehensive guide to the E2E testing setup for the Poon Personal Finance Visualizer.

## 📋 Overview

Our E2E testing suite is built with [Playwright](https://playwright.dev) and designed to:
- ✅ Test all dashboard widgets with **mock data** in local mode
- ✅ Verify responsive design across different viewports
- ✅ Ensure proper loading states and error handling
- ✅ Validate visual consistency with screenshots
- ✅ Test user interactions and functionality

## 🚀 Quick Start

### Prerequisites
```bash
# Install dependencies (includes Playwright)
make install

# Install Playwright browsers
make test-e2e-install
```

### Basic Commands
```bash
# Run all E2E tests
make test-e2e

# Run tests with visible browser (great for debugging)
make test-e2e-headed

# Run tests with interactive UI
make test-e2e-ui

# Debug specific tests
make test-e2e-debug
```

## 📁 Test Structure

```
e2e/
├── global-setup.ts          # Global test setup and server verification
├── fixtures/
│   └── mock-data.ts         # Test data and validation utilities
├── helpers/
│   └── dashboard-helpers.ts # Helper functions for dashboard interactions
└── tests/
    ├── basic.spec.ts        # Basic functionality tests
    ├── dashboard.spec.ts    # Comprehensive dashboard tests
    ├── widgets.spec.ts      # Individual widget functionality tests
    └── visual.spec.ts       # Visual regression tests
```

## 🎯 Test Categories

### 1. Basic Tests (`basic.spec.ts`)
- ✅ Page loading and basic functionality
- ✅ Mobile responsiveness
- ✅ Critical error detection
- ✅ Time range selector functionality

### 2. Dashboard Tests (`dashboard.spec.ts`)
- ✅ Complete dashboard loading with all widgets
- ✅ Net worth widget with mock data
- ✅ Accounts overview display
- ✅ Quick actions functionality
- ✅ Recent transactions display
- ✅ Loading state handling

### 3. Widget Tests (`widgets.spec.ts`)
- ✅ Individual widget functionality
- ✅ Data formatting validation
- ✅ User interactions
- ✅ Error handling
- ✅ Animation completion

### 4. Visual Tests (`visual.spec.ts`)
- ✅ Screenshot comparison
- ✅ Responsive layouts
- ✅ Different time range states
- ✅ Theme variations (if available)

## 🧪 Running Tests

### Development Workflow
```bash
# Quick check - basic functionality
npx playwright test basic.spec.ts --headed

# Full test suite for dashboard
npx playwright test dashboard.spec.ts

# Visual regression testing
npx playwright test visual.spec.ts

# Run specific test by name
npx playwright test --grep "should load dashboard with all widgets"
```

### CI/CD Integration
```bash
# Complete test suite (what runs in CI)
make test-all

# Just E2E tests
make test-e2e
```

## 🔧 Configuration

### Playwright Configuration (`playwright.config.ts`)
```typescript
{
  testDir: './e2e',
  baseURL: 'http://localhost:5174',
  webServer: {
    command: 'npm run local',  // Uses local mode with mock data
    url: 'http://localhost:5174',
    env: { VITE_APP_ENV: 'local' }
  }
}
```

### Environment Setup
Tests automatically start the app in **local mode** which:
- ✅ Uses mock data only (no real APIs)
- ✅ Faster loading times (300ms mock delay)
- ✅ Consistent test data
- ✅ Works offline

## 📊 Mock Data Validation

Our tests validate specific mock data expectations:

### Net Worth Widget
```typescript
// Expected values from mock data
totalRange: { min: 300000, max: 310000 }
changeRange: { min: 5000, max: 10000 }
percentChangeRange: { min: 2.0, max: 3.5 }
```

### Accounts
```typescript
expectedTypes: ['Checking', 'Savings', 'Investment', 'Credit', 'Loan']
expectedProviders: ['Chase Bank', 'Ally Bank', 'Vanguard', ...]
minimumCount: 8 // Should have at least 8 accounts
```

### Transactions
```typescript
expectedMerchants: ['Whole Foods', 'Netflix', 'Amazon', ...]
expectedCategories: ['groceries', 'subscriptions', 'salary', ...]
minimumCount: 10 // Should have at least 10 transactions
```

## 🎨 Visual Regression Testing

### Screenshot Comparison
Tests capture screenshots for:
- 📱 **Desktop** (1280x720)
- 📱 **Mobile** (375x667) 
- 📱 **Tablet** (768x1024)
- 🎛️ **Different time ranges** (7d, 30d, 90d)
- 🌙 **Theme variations** (if available)

### Updating Screenshots
```bash
# Update all screenshots
npx playwright test visual.spec.ts --update-snapshots

# Update specific test screenshots
npx playwright test --grep "dashboard visual baseline" --update-snapshots
```

## 🛠️ Helper Functions

### DashboardHelpers Class
```typescript
const dashboardHelpers = new DashboardHelpers(page);

// Wait for all widgets to load
await dashboardHelpers.verifyAllWidgetsLoaded();

// Get financial data
const netWorth = await dashboardHelpers.getNetWorthValue();

// Change time range
await dashboardHelpers.changeTimeRange('7 days');

// Take debug screenshots
await dashboardHelpers.takeDebugScreenshot('debug-name');
```

### MockDataValidator Class
```typescript
// Validate data formats
MockDataValidator.isValidNetWorth("$305,917.23");
MockDataValidator.isValidCurrencyFormat("$1,234.56");
MockDataValidator.hasExpectedAccountTypes(pageText);
```

## 🐛 Debugging Tests

### Debug Mode
```bash
# Interactive debugging
make test-e2e-debug

# Run with visible browser
make test-e2e-headed

# Specific test debugging
npx playwright test dashboard.spec.ts --debug
```

### Screenshots & Videos
Tests automatically capture on failure:
- 📸 Screenshots: `e2e-results/`
- 🎥 Videos: `test-results/`
- 📊 HTML Report: `e2e-results/index.html`

### Console Logging
```typescript
// Enable detailed logging in tests
console.log('🔍 Verifying all dashboard widgets are loaded...');
```

## 📈 Best Practices

### 1. Wait Strategies
```typescript
// ✅ Wait for network to be idle
await page.waitForLoadState('networkidle');

// ✅ Wait for specific elements
await page.waitForSelector('.net-worth-widget');

// ✅ Wait for data to appear
await page.waitForFunction(() => document.body.textContent?.includes('$'));
```

### 2. Reliable Selectors
```typescript
// ✅ Use semantic selectors
page.getByText('Welcome back!')
page.getByRole('button', { name: 'Add Transaction' })

// ✅ Use data-testid for complex elements
page.locator('[data-testid="net-worth-widget"]')
```

### 3. Error Handling
```typescript
// ✅ Expect specific conditions
await expect(page.getByText('Net Worth')).toBeVisible({ timeout: 10000 });

// ✅ Handle optional elements
const element = page.locator('.optional-element');
if (await element.count() > 0) {
  await element.click();
}
```

## 🔄 Continuous Integration

### GitHub Actions Integration
```yaml
- name: Run E2E tests
  run: make test-e2e

- name: Upload test results
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: e2e-results
    path: e2e-results/
```

### Local CI Simulation
```bash
# Run the same tests as CI
make test-all
```

## 📝 Writing New Tests

### Test Structure Template
```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await dashboardHelpers.waitForDashboardLoad();
  });

  test('should do something specific', async ({ page }) => {
    await test.step('Setup step', async () => {
      // Setup code
    });

    await test.step('Action step', async () => {
      // Action code
    });

    await test.step('Verification step', async () => {
      // Assertions
    });
  });
});
```

### Mock Data Guidelines
- ✅ Use consistent mock data that matches `MOCK_DATA.md`
- ✅ Validate realistic amounts and formats
- ✅ Test edge cases (negative values, large numbers)
- ✅ Verify data consistency across widgets

## 🎯 Common Issues & Solutions

### Issue: Tests timeout waiting for data
```typescript
// ✅ Solution: Increase timeout and add better waits
await page.waitForFunction(() => {
  return document.body.textContent?.includes('$');
}, { timeout: 20000 });
```

### Issue: Flaky visual tests
```typescript
// ✅ Solution: Wait for animations and stabilize
await dashboardHelpers.waitForAnimations();
await page.waitForTimeout(1000); // Extra stability
```

### Issue: Mobile tests fail
```typescript
// ✅ Solution: Set viewport before navigation
await page.setViewportSize({ width: 375, height: 667 });
await page.goto('/');
```

## 📊 Test Reports

### View Results
```bash
# Open HTML report
make test-e2e-report

# View in browser
open e2e-results/index.html
```

### Report Contents
- ✅ Test execution summary
- ✅ Failed test details with screenshots
- ✅ Performance metrics
- ✅ Browser compatibility results

---

## 🎉 Success Criteria

A successful E2E test run should verify:
- ✅ All widgets load with mock data
- ✅ Financial values are properly formatted
- ✅ User interactions work correctly
- ✅ Responsive design functions properly
- ✅ No critical JavaScript errors
- ✅ Visual consistency maintained

**Ready to test!** Use `make test-e2e` to verify all widgets are working perfectly with mock data! 🚀
