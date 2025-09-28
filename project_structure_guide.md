amfeature-based (easy to scale & onboard),

explicit about commons / widgets / themes,

testable (unit + integration + Playwright E2E),

monetization friendly (component library, design system, SaaS-friendly),

CI/CD + quality tool recommendations.

I’ll include a recommended folder layout, naming conventions, theming approach, testing strategy, CI tips, and authoritative references you can follow. Where useful I cite official docs and strong community best-of articles.

1 — High level principles (short)

Group by feature/domain, not by file type — keeps all things required for a feature (UI, hooks, services, tests) together and reduces cross-repo churn. 
React
+1

Separate “Design system / components / widgets” from app features — components used across features go into a controlled, versioned component library. This helps productize (sell themes, components) and simplifies QA. 
Josh W. Comeau

Use Tailwind as design tokens + utility layer, but wrap complex or frequently repeated patterns in semantic components or @apply classes / design tokens to avoid utility chaos. 
evilmartians.com
+1

Use Vitest + Testing Library for unit/DOM tests and Playwright for E2E — these integrate nicely with Vite and give fast feedback loops. 
Vitest
+2
Testing Library
+2

2 — Recommended repo layout (single-app; scale to monorepo later)
/
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
├─ public/
├─ src/
│  ├─ main.tsx
│  ├─ app/                           # app-level bootstrap, routes, providers
│  │  ├─ App.tsx
│  │  ├─ routes.tsx
│  │  └─ providers/                  # ThemeProvider, AuthProvider, i18n
│  ├─ features/                      # feature-based domains (recommended)
│  │  ├─ auth/
│  │  │  ├─ ui/                      # presentational components local to feature
│  │  │  ├─ hooks/
│  │  │  ├─ api.ts
│  │  │  ├─ auth.slice.ts            # or local state management
│  │  │  └─ LoginPage.tsx
│  │  └─ dashboard/
│  │     └─ ...
│  ├─ components/                    # globally shared presentational components (atomic)
│  │  ├─ Button/
│  │  │  ├─ Button.tsx
│  │  │  ├─ Button.test.tsx
│  │  │  └─ index.ts
│  │  └─ Icon/
│  ├─ widgets/                       # larger opinionated composite components (cards, charts)
│  │  └─ StatsCard/
│  ├─ libs/                          # pure reused utilities, date, math (no React)
│  ├─ services/                      # API clients, adapters (e.g., axios instances, msw handlers)
│  ├─ styles/                        # tailwind config wrappers, global css, tokens
│  │  ├─ tailwind.css
│  │  ├─ tokens/                     # semantic tokens backed by CSS vars or tailwind config
│  │  └─ themes.ts
│  ├─ hooks/                         # cross-feature hooks (useDebounce etc.)
│  ├─ types/                         # global app types (avoid over-using)
│  └─ tests/                         # optional common integration tests or fixtures
├─ e2e/                              # Playwright tests (run in CI as separate job)
│  ├─ playwright.config.ts
│  └─ tests/
├─ .husky/ .github/ etc.
└─ mockData/                         # 🚨 CRITICAL: ALL mock data MUST be here, NEVER in /src
   ├─ common/                        # Shared data (accounts, transactions, assets)
   │  └─ data.ts
   ├─ features/                      # Feature-specific mock data (organized by domain)
   │  ├─ dashboard/
   │  │  ├─ dashboardData.ts         # Financial universe goals, spending data
   │  │  └─ index.ts                 # Feature exports
   │  ├─ portfolio/
   │  │  ├─ portfolioData.ts         # Portfolio assets, timeline, highlights
   │  │  ├─ portfolioDetailData.ts   # Asset details, achievements
   │  │  └─ index.ts
   │  ├─ spending/
   │  │  ├─ moneyFlowData.ts         # Income streams, categories, insights
   │  │  ├─ spendingData.ts          # Payment methods, analysis
   │  │  └─ index.ts
   │  └─ widgets/
   │     ├─ widgetsData.ts           # Missions, achievements, challenges
   │     └─ index.ts
   └─ index.ts                       # Main mock data exports



Notes:

Keep component tests next to the component (co-located) so they’re easy to find and move with the component. This is recommended for maintainability. 
Max Rozen

Use components/ for small, reusable pieces (Button, TextField), widgets/ for larger composites (DashboardChart, DataTable) that combine several components and often include logic.

features/ contains pages and domain logic; each feature owns its UI, hooks, api adapters, and tests — makes team ownership clearer. 
DEV Community

3 — Component taxonomy & responsibilities

Atoms (components/) — tiny presentational components (Button, Icon, Typography). No side effects. Highly reusable. Tests: unit + snapshot.

Molecules (components/ or widgets/) — small compositions (InputWithLabel). Tests: unit + integration.

Widgets (widgets/) — larger units composed of many atoms and molecules, possibly interacting with feature APIs. Tests: integration.

Feature UI (features/*/ui) — pages, route containers, and orchestration for a feature. They wire services/state together. Tests: integration & E2E.

Design System (optional separate package) — Tokens, Tailwind config, Storybook, component exports packaged for reuse/sale.

4 — Theming / design tokens (practical)

Tailwind config is single source for tokens (colors, spacing) — but also expose CSS variables at runtime to allow theme switching (dark/light or customer brand colors). Use Tailwind’s config for build time, and CSS variables for runtime customization. 
UXPin

Put semantic tokens in src/styles/tokens/ and generate Tailwind config from those tokens (or duplicate carefully). Example:

--color-primary: #0b5fff; in :root then tailwind.config.js references var(--color-primary) in custom utilities.

Provide a ThemeProvider that toggles CSS vars and persists user theme (localStorage). For customer branding, expose a runtime JSON mapping of brand tokens to CSS vars.

Why: This gives you the Tailwind productivity (utility classes + purge/jit) while letting you do runtime theme swaps for multi-tenant apps or paid themes.

5 — Styling patterns with Tailwind

Prefer semantic wrapper classes for repeated patterns (e.g., .btn-primary { @apply px-4 py-2 rounded-md font-medium }) using @layer components in your global CSS when many components share a pattern. Avoid thousands of duplicated utility chains in JSX. 
evilmartians.com
+1

Keep critical layout primitives as components (Container, Grid, Stack) — this reduces duplication and makes spacing/token changes cheap.

Use Tailwind JIT and properly configure content globs in tailwind.config.ts to avoid missing classes in prod. 
UXPin

6 — TypeScript & types

Keep types close to the domain (feature folder). Export common shared types from types/ sparingly.

Prefer string unions over enums for cross-bundle safety (type ButtonVariant = 'primary' | 'ghost') to avoid TS runtime enum pitfalls.

7 — State & data layer

For global app state, prefer lightweight solutions: React Query (TanStack Query) for server state + local context or Zustand for local UI state. Co-locate query keys and hooks inside feature folders: features/orders/hooks/useOrders.ts.

Keep API clients in services/ and adapt/resiliently handle errors in a single layer (retry/backoff). (No citation necessary — common pattern.)

8 — Testing strategy (unit → integration → E2E)

Unit / Component tests: Vitest + React Testing Library. Co-locate tests next to components. Fast, run on pre-commit or PR. Use msw (Mock Service Worker) to mock network in component/integration tests. 
Vitest
+1

Integration tests: test multiple components together (e.g., entire widget) using RTL + Vitest.

E2E tests (Playwright): place under e2e/ or tests/e2e/, run against staging build in CI. Playwright can test visual flows, auth, payments, and regression. Use Playwright Test runner and the config that ships with npm init playwright@latest. 
DEV Community
+1

Suggested test commands in package.json:

"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:watch": "vitest --watch",
  "test:e2e": "playwright test",
  "test:e2e:headed": "playwright test --headed"
}

9 — E2E test design tips

Run Playwright against a stable staging deployment (build + serve) in CI to avoid the “it passes locally” problem.

Keep E2E minimal and high value (auth flows, checkout, payments, key path UX). Use unit/integration for lower-level checks. 
DEV Community

10 — Dev tooling & quality

Linters/formatters: ESLint + Prettier; share config. Use eslint plugin for Testing Library to enforce best practices. 
kentcdodds.com

Precommit: Husky + lint-staged to run fast checks (format, typecheck subset).

CI: split jobs: lint → unit tests → build → e2e (deploy to preview/staging) → Playwright tests. Use caching (node_modules/pnpm) to speed builds.

Storybook: highly recommended for component QA and for productizing your components (storybook + Chromatic for visual regression). (No citation necessary but strongly recommended.)

11 — Packaging / monetization paths

Component library / theme marketplace: Keep your design system as an internal package (or separate repo) so you can publish paid themes/components. Build with Vite and package via tsup or rollup.

SaaS approach: Productize features behind a subscription (usage analytics, white-label theming). Use modular architecture so features are easy to gate.

Licensing: careful with open-source vs paid — dual licensing or separate paid theme packages are common models.

12 — Example: how to add a new feature (practical steps)

src/features/payments/ — create ui/, hooks/, api.ts, payments.slice.ts, PaymentsPage.tsx.

Add local tests payments/ui/PaymentForm.test.tsx next to components.

If you add new UI patterns used elsewhere, move them to components/ and add Storybook stories.

Add Playwright E2E test only for the full checkout happy path.

13 — Mock Data Organization Rules (MANDATORY)

🚨 **CRITICAL MOCK DATA RULES:**

**Rule 1: NO Mock Data in `/src`**
- NEVER create mock data inside the `/src` directory
- ALL mock data MUST be in `/mockData` folder
- This is a MANDATORY project rule that must be enforced

**Rule 2: Feature-Based Organization**
- Organize mock data by features in `/mockData/features/`
- Each feature has its own mock data folder
- Common/shared data goes in `/mockData/common/`

**Rule 3: Centralized Imports**
```typescript
// ✅ CORRECT - Import from centralized mockData
import { mockPortfolioAssets } from "../../../../mockData/features/portfolio";

// ❌ WRONG - Local mock data in components
const mockData = [...]; // NEVER DO THIS IN /src
```

**Rule 4: Export Structure**
- Each feature mock data folder has an `index.ts` for exports
- Main `/mockData/index.ts` exports all mock data
- Clean import paths from centralized location

**Rule 5: Development Workflow**
1. Create mock data in appropriate `/mockData/features/[feature]/`
2. Export from feature index file
3. Import in components from centralized location
4. NEVER create local mock data in components

**Enforcement:**
- Code reviews must check for mock data in `/src`
- Linting rules should prevent mock data in `/src`
- All mock data must follow this structure for consistency