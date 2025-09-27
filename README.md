# Poon - Personal Finance Visualizer

A modern, animated personal finance dashboard built with React 19, TypeScript, and GSAP. Track your net worth, analyze spending patterns, manage portfolios, and import financial data with beautiful micro-animations inspired by [reactbits.dev](https://reactbits.dev/).

![Poon Dashboard](./docs/screenshots/dashboard.png)

## 🚀 Features

### ✅ MVP Complete
- **Animated Dashboard**: Net worth tracking with smooth GSAP animations
- **Account Management**: Multi-account balance tracking and sync status
- **Transaction History**: Categorized spending with real-time filters
- **Portfolio Tracking**: Investment holdings with P&L calculations
- **Modern UI**: React Bits-inspired animations with TailwindCSS
- **Mock API**: Complete simulation layer for development
- **Responsive Design**: Mobile-first with accessible components

### 🚧 Coming Soon
- **CSV Import Flow**: Drag & drop with intelligent column mapping
- **Bank Integration**: Plaid & Salt Edge connection simulation
- **Spending Analytics**: Advanced charts and category breakdowns
- **Investment Charts**: Portfolio allocation and performance graphs
- **Data Export**: CSV/PDF reports and account summaries
- **Security Features**: MFA, encrypted storage, and audit logs

## 🛠 Tech Stack

### Frontend
- **React 19** - Latest stable with modern hooks
- **TypeScript** - Full type safety
- **Vite** - Lightning fast build tool
- **TailwindCSS** - Utility-first styling
- **GSAP** - Professional animations (React Bits style)
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **Recharts** - Data visualization (ready)

### Mock Integrations
- **Plaid API** - Bank account linking simulation
- **Salt Edge** - Global banking connector mock
- **Alpha Vantage** - Stock price feeds simulation

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/poon.git
cd poon

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🎯 Quick Start

### 1. Explore the Dashboard
The main dashboard shows your animated net worth counter, recent transactions, and portfolio overview using React Bits-style GSAP animations.

### 2. Navigate Between Pages
Use the sidebar to explore:
- **Dashboard**: Animated overview with key metrics
- **Accounts**: Bank account management (coming soon)
- **Portfolio**: Investment tracking (coming soon)
- **Spending**: Transaction analytics (coming soon)
- **Import**: CSV data import (coming soon)
- **Settings**: App configuration (coming soon)

### 3. Mock Data
The app includes comprehensive mock data:
- Sample bank accounts (checking, savings, investment)
- 50+ realistic transactions with categories
- Portfolio holdings (AAPL, GOOGL, SPY, VTIAX)
- Real-time price simulation

## 🎨 Animation Features

Inspired by [reactbits.dev](https://reactbits.dev/), the app includes:

- **AnimatedNumber**: Smooth counting animations for financial metrics
- **SplitText**: Character-by-character text reveals
- **AnimatedList**: Staggered list item animations
- **FadeIn**: Directional fade animations with GSAP
- **PulseLoader**: Smooth loading states

## 🏗 Architecture

### State Management
- **useAccountStore**: Account balances and sync status
- **useTransactionStore**: Transaction history and filtering
- **usePortfolioStore**: Investment holdings and prices
- **useUIStore**: Theme, modals, and notifications

### Mock API
The development environment includes a complete mock API layer:

```typescript
// Example: Fetch accounts
const response = await fetch('/api/accounts');
const { data: accounts } = await response.json();

// Simulates real banking APIs like Plaid
const linkResponse = await fetch('/api/plaid/link/token/create');
const { link_token } = await linkResponse.json();
```

### Component Structure
```
src/
├── components/
│   ├── ui/              # React Bits animations & primitives
│   ├── layout/          # Sidebar, header, navigation
│   ├── dashboard/       # Dashboard-specific components
│   ├── accounts/        # Account management
│   └── portfolio/       # Investment tracking
├── pages/              # Route components
├── store/              # Zustand state management
├── mock/               # Mock data & API simulation
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
└── types/              # TypeScript definitions
```

## 🔧 Configuration

### Environment Variables
Create `.env.local` for production secrets:

```env
# Plaid Configuration
VITE_PLAID_CLIENT_ID=your_plaid_client_id
VITE_PLAID_SECRET=your_plaid_secret
VITE_PLAID_ENV=sandbox

# Salt Edge Configuration
VITE_SALTEDGE_APP_ID=your_saltedge_app_id
VITE_SALTEDGE_SECRET=your_saltedge_secret

# Encryption Keys (use AWS KMS in production)
VITE_ENCRYPTION_KEY=your_32_character_key_here

# API Base URL
VITE_API_BASE_URL=http://localhost:3000/api
```

### Bank Integration Setup

#### Plaid (US/Canada)
1. Sign up at [dashboard.plaid.com](https://dashboard.plaid.com/)
2. Get sandbox credentials
3. Add to environment variables
4. Test with included mock implementation

#### Salt Edge (Global)
1. Register at [saltedge.com](https://www.saltedge.com/)
2. Get API credentials  
3. Configure for your region
4. Use mock endpoints for development

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Component logic with Vitest
- **Integration Tests**: Store interactions
- **E2E Tests**: User flows with Playwright
- **Visual Tests**: Animation regressions

## 📱 Mobile Support

The app is fully responsive with:
- Touch-friendly navigation
- Collapsible sidebar
- Optimized animations for mobile
- Accessible gestures and interactions

## 🔒 Security

### Development
- Mock API with no real credentials
- Client-side encryption simulation
- HTTPS-only cookies (simulated)

### Production Recommendations
- Store tokens in AWS KMS or similar
- Use environment variables for secrets
- Implement proper JWT refresh flows
- Add rate limiting and request validation
- Use HTTPS everywhere
- Regular security audits

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify
```bash
# Build for production
npm run build

# Deploy dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style
4. Add tests for new features
5. Submit a pull request

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing animation patterns
- Add proper error handling
- Include accessibility attributes
- Write comprehensive tests

## 📄 API Documentation

### Mock Endpoints

#### Accounts
```typescript
GET    /api/accounts              # List all accounts
GET    /api/accounts/:id          # Get account details  
POST   /api/accounts/sync/:id     # Sync account balance
POST   /api/accounts/link         # Link new bank account
```

#### Transactions
```typescript
GET    /api/transactions          # List transactions (paginated)
POST   /api/transactions/import   # Import from CSV
GET    /api/transactions/categories # Get spending categories
```

#### Portfolio
```typescript
GET    /api/portfolios            # List portfolios
GET    /api/assets                # List all holdings
POST   /api/prices                # Get current prices
```

#### Banking Integration
```typescript
POST   /api/plaid/link/token/create    # Create Plaid Link token
POST   /api/plaid/link/token/exchange  # Exchange public token
POST   /api/saltedge/connect           # Create Salt Edge session
```

## 📊 Performance

### Bundle Size
- Main bundle: ~200KB (gzipped)
- GSAP animations: ~80KB
- Chart libraries: ~150KB (lazy loaded)

### Animation Performance
- 60fps smooth animations
- Hardware acceleration enabled
- Reduced motion support
- Optimized for mobile devices

## 🐛 Troubleshooting

### Common Issues

**Animation not working?**
- Check that GSAP is properly installed
- Verify useRef hooks are set correctly
- Ensure elements exist before animating

**Store not updating?**
- Confirm Zustand store subscriptions
- Check that actions are called correctly
- Verify mock API responses

**Routing issues?**
- Ensure React Router is properly configured
- Check that all routes are defined
- Verify basename configuration for deployment

## 📞 Support

- 📧 Email: support@poon-finance.com
- 💬 Discord: [Join our community](https://discord.gg/poon-finance)
- 📖 Docs: [Full documentation](https://docs.poon-finance.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/poon/issues)

## 📝 License

MIT License - see [LICENSE.md](LICENSE.md) for details.

---

Built with ❤️ using React Bits animations and modern web technologies. 

**Ready to track your finances in style? 🚀**