# 🌍 Environment Configuration Guide

Poon supports multiple environment configurations to optimize development workflows and deployment scenarios.

## 🎯 Available Environments

### 🏠 Local Environment (`local`)
**Perfect for offline development with rich mock data**

```bash
# NPM Scripts
npm run local

# Makefile
make local
```

**Features:**
- ✅ Uses comprehensive mock data for all features
- ✅ Fast API response simulation (300ms delays)
- ✅ No backend dependencies required
- ✅ Debug mode enabled with detailed console logging
- ✅ Redux DevTools enabled
- ✅ Perfect for UI/UX development and prototyping

**Console Output:**
```
🌍 Environment: local
🔄 Using mock net worth data (local mode)
🏦 Using mock accounts data (local mode)  
💳 Using mock transactions data (local mode)
```

### 🚀 Development Environment (`development`)
**For integration testing with real APIs**

```bash
# NPM Scripts
npm run dev

# Makefile
make dev
```

**Features:**
- 🌐 Connects to real API endpoints
- 🔄 Falls back to mock data if APIs are unavailable
- 🐛 Error simulation enabled for testing
- 🛠️ Debug mode enabled
- 📊 Redux DevTools enabled
- 🔗 Requires backend services to be running

**Console Output:**
```
🌍 Environment: development
🌐 Fetching net worth from: http://localhost:3001/api/networth/current
✅ Net worth data fetched successfully
```

### 🏭 Production Environment (`production`)
**Optimized for production deployment**

```bash
# NPM Scripts
npm run build:prod

# Makefile  
make build-prod
```

**Features:**
- 🌐 Uses production API endpoints
- 🚫 No fallback to mock data
- 🚫 Debug mode disabled
- 🚫 DevTools disabled
- ⚡ Optimized bundle size
- 🔒 Error handling shows user-friendly messages

## 📁 Configuration Structure

### Environment Files Location
```
config/
└── environments.ts    # Main configuration file
```

### Configuration Schema
```typescript
interface AppConfig {
  // Environment identification
  environment: 'local' | 'development' | 'production';
  isDevelopment: boolean;
  isProduction: boolean;  
  isLocal: boolean;

  // API configuration
  apiBaseUrl: string;
  apiTimeout: number;

  // Data source control
  dataSource: 'mock' | 'api' | 'hybrid';
  mockApiDelay: number;
  mockEnableErrors: boolean;

  // Feature flags
  features: {
    analytics: boolean;
    insights: boolean;
    csvImport: boolean;
    bankLinking: boolean;
    animations: boolean;
    debugMode: boolean;
  };

  // Development tools
  devTools: {
    reduxDevtools: boolean;
    reactProfiler: boolean;
  };
}
```

## ⚡ Quick Start Commands

### For New Developers
```bash
# Complete setup + start local development
make quick-start

# Or step by step:
make install
make local
```

### Daily Development
```bash
# Offline development (recommended)
make local

# API integration testing  
make dev

# Production build testing
make build-prod && make preview
```

### Testing & Quality
```bash
# Run all tests with coverage
make test-all

# Fix all code quality issues
make quality-fix

# Run CI pipeline locally
make ci
```

## 🔧 Environment Variables

The system uses these environment variables for configuration:

| Variable | Description | Values |
|----------|-------------|---------|
| `VITE_APP_ENV` | Primary environment selector | `local`, `development`, `production` |
| `NODE_ENV` | Node.js environment | `development`, `production` |
| `MODE` | Vite mode (fallback) | `development`, `production` |

**Priority Order:** `VITE_APP_ENV` > `MODE` > `NODE_ENV`

## 📊 Data Source Behavior

### Local Environment
```javascript
// All services immediately return mock data
const data = await netWorthService.fetchNetWorth();
// → Returns mock data after 300ms delay
```

### Development Environment
```javascript
// Services try real API first, fallback to mock
try {
  const data = await fetch('/api/networth/current');
  return data;
} catch {
  console.warn('API failed, using mock data');
  return mockData;
}
```

### Production Environment
```javascript
// Services use real API only, no fallback
try {
  const data = await fetch('/api/networth/current');
  return data;
} catch {
  throw error; // No fallback in production
}
```

## 🎨 Visual Indicators

Each environment provides visual feedback in the console:

### Local Mode
```
🏠 Local Environment Active
📊 Environment: local
🔄 Mock data delays: 300ms
🛠️ Debug mode: ON
```

### Development Mode  
```
🚀 Development Environment Active
📊 Environment: development
🌐 API endpoints: http://localhost:3001/api
🛠️ Debug mode: ON
```

### Production Mode
```
🏭 Production Environment Active
📊 Environment: production  
🌐 API endpoints: https://api.poon.finance/api
🛠️ Debug mode: OFF
```

## 🧪 Testing Environments

Each environment supports different testing approaches:

### Local Testing
- ✅ Unit tests with mock data
- ✅ UI/UX testing without backend
- ✅ Component isolation testing
- ✅ Performance testing with consistent data

### Development Testing
- ✅ Integration testing with real APIs
- ✅ Error handling testing
- ✅ Network failure simulation
- ✅ End-to-end testing

### Production Testing
- ✅ Production build validation
- ✅ Performance optimization testing
- ✅ Error boundary testing
- ✅ Security testing

## 🚀 Best Practices

### Development Workflow
1. **Start with Local** - Use `make local` for initial feature development
2. **Test Integration** - Use `make dev` to test with real APIs
3. **Validate Production** - Use `make build-prod` before deployment

### Environment Selection Guide
- 🏠 **Use Local when:**
  - Developing new UI components
  - Working offline or with unreliable internet
  - Prototyping new features
  - Backend services are unavailable

- 🚀 **Use Development when:**
  - Testing API integrations
  - Validating error handling
  - Testing real data flows
  - Preparing for production deployment

- 🏭 **Use Production when:**
  - Building for deployment
  - Performance testing
  - Final validation before release

### Debugging Tips
- Check the console for environment confirmation messages
- Use browser DevTools Network tab to verify API calls
- Look for the environment indicator in the console table
- Use `config.features.debugMode` for conditional debugging code

## 📋 Makefile Command Reference

| Command | Description | Environment |
|---------|-------------|-------------|
| `make local` | Start with mock data | Local |
| `make dev` | Start with API endpoints | Development |
| `make build-prod` | Build for production | Production |
| `make test-all` | Run all tests | All |
| `make quality-fix` | Fix code quality issues | All |
| `make ci` | Run CI pipeline | All |
| `make quick-start` | Setup + start local | Local |

## ❓ Troubleshooting

### Environment Not Loading Correctly
```bash
# Check environment variables
echo $VITE_APP_ENV
echo $NODE_ENV

# Clear cache and restart
make clean
make install
make local
```

### API Calls Failing in Development
```bash
# Verify backend is running
curl http://localhost:3001/api/health

# Check if falling back to mock data
# Look for "⚠️ API failed" messages in console

# Force local mode if needed
make local
```

### Production Build Issues
```bash
# Clean build
make clean
make build-prod

# Check for TypeScript errors
make type-check

# Run linting
make lint
```

---

**💡 Pro Tip:** Always start with `make local` for the best development experience - it provides rich mock data without requiring any backend services!
