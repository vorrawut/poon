import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting E2E Global Setup...');
  
  // Wait for the server to be ready
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('⏳ Waiting for local server to be ready...');
    
    // Wait for the app to load with retries
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        await page.goto(config.projects[0].use?.baseURL || 'http://localhost:5173', {
          waitUntil: 'load',
          timeout: 15000,
        });
        
        // Wait for React to mount
        await page.waitForSelector('body', { timeout: 10000 });
        console.log('✅ Server is ready!');
        break;
        
      } catch (error) {
        attempts++;
        if (attempts >= maxAttempts) {
          throw error;
        }
        console.log(`⏳ Server not ready, retrying... (${attempts}/${maxAttempts})`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    // Check if we're in local mode by looking for debug info or mock data indicators
    const isLocalMode = await page.evaluate(() => {
      // Check if we're in local mode
      return (window as any).__VITE_APP_ENV__ === 'local' || 
             document.documentElement.innerHTML.includes('Using mock') ||
             localStorage.getItem('app-env') === 'local';
    });
    
    if (isLocalMode) {
      console.log('✅ Local mode confirmed - tests will use mock data');
    } else {
      console.log('⚠️  Local mode not detected - tests may use real APIs');
    }
    
  } catch (error) {
    console.error('❌ Failed to verify server readiness:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;
