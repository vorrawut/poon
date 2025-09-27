1) Product vision — short & brutal

Goal: one web app where you can see total net worth (all bank accounts, stocks, provident funds, insurance, company cash), and understand spending (daily/weekly/monthly breakouts by card & category). It must be simple to connect accounts where possible, and easy to import CSV / manual entries for anything that can’t be auto-linked.

Why people love it: clear totals, fast trends (growth/loss), expense categories, and explanations (e.g., “Your grocery spending +35% vs last month”). Ship the MVP with manual import and 1–2 bank connectors; add more auto-linking later.

2) MVP feature list (must-have)

Dashboard: total net worth, 7/30/90 day cashflow, top 5 assets, quick add transaction.

Accounts page: list + balances for each bank / investment / company account (refreshable).

Portfolio page: holdings (stocks + quantity + current price + change), allocation pie, P&L.

Spending page: transactions by day/week/month, top categories, trends, repeat subscriptions.

Import & sync:

CSV importer for bank statements & card statements (auto-map columns)

Bank linking via Open Banking provider (Plaid / Salt Edge) where available

Manual add/edit transactions

Filters: by year/month/custom range, by account, by category, by tag.

Comparisons: growth/loss % w/ previous period, cumulative charts.

User settings & security: MFA, export data, revoke connections.

Nice to have (stretch): scheduled sync, webhook-based updates, smart insights (AI summaries).

Key non-functional: fast, mobile-friendly, accessible (a11y), and secure-by-default.

3) Tech stack (practical & modern)

Frontend:

React 19 (latest stable at time of writing) — use Vite + TypeScript. Use React Server Components or standard client components where RSC not needed. 
React
+1

Component libs:

reactbits.dev for animated UI micro-components (buttons, loaders, animated lists) — great for polish. 
React Bits

shadcn/ui or Radix + TailwindCSS for accessible primitives and consistent design

Recharts or Chart.js (wrapper) or Recharts for interactive charts (good TypeScript support)

State: Zustand or Redux Toolkit (Zustand if you prefer simplicity)

Date lib: date-fns or luxon

Backend (choose one):

Supabase (Postgres, auth, storage, edge functions) — fastest to iterate; great for personal projects.

or Node/Express + Postgres on Vercel / Fly / Render (more control)

If you want serverless: Vercel Functions or Supabase Edge Functions

Bank & card connectors:

Plaid (best US/Canada coverage & Plaid Link), or Salt Edge (very global; 5k+ banks) — choose depending on geography & cost. Plaid and Salt Edge are the two common choices for secure account linking and transaction aggregation. 
Plaid
+1

Storage:

Postgres for normalized finance data

S3 / Supabase storage for uploaded statements

Encrypted fields for tokens (never store raw credentials)

Auth:

Supabase Auth or OAuth + WebAuthn for MFA

JWT access tokens + refresh tokens for API calls

Monitoring / error tracking:

Sentry, PostHog or Plausible for analytics.

CI/CD:

GitHub Actions -> deploy to Vercel / Netlify / Fly

4) Data model (core tables — simplified)
users (id, email, password_hash, mfa_enabled, created_at)

accounts (id, user_id, provider, provider_account_id, name, type, currency, last_sync_at, current_balance)

assets (id, user_id, account_id, asset_type, symbol, quantity, avg_price)

transactions (id, user_id, account_id, posted_at, amount, type, category, merchant, description, imported_from, tags jsonb)

portfolios (id, user_id, name, created_at)

portfolio_positions (id, portfolio_id, symbol, quantity, avg_price)

prices_cache (symbol, date, open, close, high, low, volume, source)

providers_tokens (id, user_id, provider, access_token_encrypted, refresh_token_encrypted, meta jsonb)


Notes:

Keep transactions normalized and allow manual override flags.

Keep provenance fields: imported_from and provider so you can debug import differences.

5) Data ingestion strategies — practical options (and tradeoffs)

Open Banking connectors (Plaid / Salt Edge) — best UX when supported. Plaid Link provides the cleanest flow for US/Canada; Salt Edge is more global (5k+ banks). Both return accounts and transaction data (and Plaid returns /accounts/get). Pros: automated, secure; Cons: costs, regional gaps. 
Plaid
+1

CSV import — mandatory for non-covered banks. Build a smart importer:

let user map CSV columns on first import

persist a column mapping for that issuer

sample transaction preview and auto-categorize with rules or ML

Manual Add / Company Balances — allow quick "Add balance" for company cash / bespoke assets (insurances, provident fund balances). Provide metadata fields (policy number, provider name).

Brokerage/Stock APIs — use broker API / custodial APIs or use nightly price feeds to compute market value (AlphaVantage, Yahoo Finance scrapers, or paid feed). Cache prices.

Recommendation: Ship with CSV + manual first, add Plaid/SaltEdge for your main banks second.

6) UX / UI: pages & key components

Use reactbits for subtle motion (animated counters, list reveals, micro-interactions) — it gives polish without heavy engineering. Examples: animated net-worth counter, animated list of top spend categories. 
React Bits

Pages:

/dashboard

big animated Net Worth number (daily change)

sparkline of cashflow last 30/90/365 days

quick cards: Cash, Investments, Provident Funds, Insurance, Company Cash

recent transactions feed (animated list)

/accounts

account list with balances, provider badges, last sync button

account detail: transactions + reconciliation controls

/portfolio

holdings table (sortable), allocation pie/donut, P&L chart

/spending

transaction heatmap (daily)

category breakdown (drillable donut)

weekly / monthly bar chart w/ filter

/imports

drag & drop CSV area, mapping assistant, import history

/insights

AI-generated natural-language summaries (e.g., “You spent 18% less on dining this month.”)

/settings

link/unlink bank providers, API tokens, export, security

Important UI behaviors:

filters should be globally controllable (top bar date picker + account selector)

charts update instantly with local state (no full-page reload)

provide “explain this number” tooltips — show how net worth computed (assets minus liabilities)

keyboard accessible and mobile responsive

7) Concrete component plan (use reactbits + your own)

AnimatedNetWorth — big number, delta highlight (reactbits animated-count)

AccountCard — small card with provider icon, balance, sync state

TransactionsList — virtualized, animated-list from reactbits for nice reveal. 
React Bits

TimeRangePicker — preset ranges + custom (apply globally)

CategoryDonut — hover slice shows top merchants

CSVImporter — preview + column mapping

PortfolioTable — server-side pagination + sort

InsightsPanel — AI summary badges (optional: call a small server function to generate)

8) Security & privacy checklist (non-negotiable)

Never store raw bank credentials. Use provider tokens (Plaid / SaltEdge) and encrypt tokens at rest (AES-GCM) with a key stored in KMS.

Transport: enforce TLS everywhere.

Auth: require strong passwords + WebAuthn/MFA for sensitive actions (linking, export).

Least privilege: service accounts for third-party APIs; rotate keys regularly.

Data export & deletion: let user export & delete data; keep logs of deletions.

Pen test & code scanning: Dependabot, Snyk, and SAST checks on CI.

Privacy: show transparent privacy policy describing third-party providers (Plaid/SaltEdge).

9) Testing & quality

Unit tests: React components (Vitest + react-testing-library)

End-to-end: Playwright for flows (import CSV, link bank via Plaid sandbox, view dashboard)

Contract tests for backend endpoints

Load test: ensure dashboard renders at scale (thousands of transactions)

Accessibility audit: axe-core checks

10) Deployment & infra (simple path)

Repo: monorepo (apps/web, packages/ui, packages/hooks)

Deploy frontend on Vercel (edge functions if needed)

Backend: Supabase or small Node app + Postgres on Render

Storage: Supabase or S3 for attachments

CI: GitHub Actions (lint, build, tests, deploy)

11) Developer tasks & timeline (milestone-oriented)

Milestone 0 — scaffold (1–2 days)

Vite + React 19 + TypeScript + Tailwind + reactbits

Auth (Supabase auth or Auth0 demo)

Basic Nav + Dashboard skeleton

Milestone 1 — core data + CSV import (1 week)

DB schema, import pipeline, manual add tx

Dashboard net worth computed from imported balances

Unit tests & Playwright smoke tests

Milestone 2 — Accounts & reconcile (1 week)

Account connect flow (Plaid sandbox or Salt Edge) + token storage (encrypted)

Account list + sync

Milestone 3 — portfolio & charts (1 week)

Holdings page, price fetching, allocation charts

Spending analytics + categories

Milestone 4 — polish & QA (1 week)

Mobile polish, accessibility, monitoring, deploy to prod

(Adapt timeline to your team. These are estimates; pick what to build first.)

12) Example folder structure (recommended)
/web
  /src
    /components
      AnimatedNetWorth.tsx
      AccountCard.tsx
      TransactionsList.tsx
    /hooks
      useAccounts.ts
      useTransactions.ts
    /pages
      dashboard.tsx
      accounts.tsx
      portfolio.tsx
      spending.tsx
    /lib
      api.ts
      categorizer.ts
    /styles
      tailwind.css
  vite.config.ts
  package.json

13) Example small React + TypeScript snippet (Dashboard net worth using reactbits idea)

This is a conceptual snippet — adapt props and styling to fit your design system.

// src/components/AnimatedNetWorth.tsx
import React from "react";
import { useAccounts } from "../hooks/useAccounts";
import { AnimatedNumber } from "react-bits"; // hypothetical import pattern

export default function AnimatedNetWorth() {
  const { totalNetWorth, changePercent } = useAccounts();

  return (
    <section className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-slate-50 to-white">
      <h3 className="text-sm uppercase text-slate-500">Net Worth</h3>
      <div className="flex items-baseline gap-4">
        <AnimatedNumber value={Math.round(totalNetWorth)} duration={900} />
        <span className={`ml-2 text-sm ${changePercent >= 0 ? "text-green-600" : "text-rose-600"}`}>
          {changePercent >= 0 ? `+${changePercent}%` : `${changePercent}%`}
        </span>
      </div>
      <p className="text-xs text-slate-400">Updated {new Date().toLocaleString()}</p>
    </section>
  );
}


(Replace react-bits component names with the exact exports from reactbits docs when implementing.) 
React Bits

14) Bank linking: Plaid vs Salt Edge (short)

Plaid — excellent UX (Plaid Link), best US/Canada coverage, strong docs for accounts & transactions. Good for personal financial dashboards if your banks are covered. 
Plaid
+1

Salt Edge — extremely global coverage (5,000+ banks), strong open banking tools for Europe and APAC. Pick Salt Edge if your banks are outside Plaid’s core coverage. 
Salt Edge
+1

If you’re in Thailand: check Salt Edge coverage for Thai banks or start with CSV + manual linking and experiment with Salt Edge or local open banking providers.

15) UX tips to fix your pain points (what you told me)

Scattered bank balance problem → single “Net Worth” computation with sources & per-account drilldown. Add daily auto-sync timestamps for clarity.

Blinded about spending → show a rolling “last 30 days” spending heatmap and monthly category leaderboard. Add monthly subscription detection and a “recurring payments” view.

Multiple companies / assets → allow adding “entity” and toggling entity visibility to compute consolidated vs personal net worth.

Callouts: show a “source of truth” toggle: include/exclude company accounts from personal net worth.

16) QA, testing & real-world standards

Use TypeScript liberally (catch errors early)

Define API contracts and mock them in frontend tests (msw)

E2E tests for money-critical flows (import, reconcile)

Manual privacy review if integrating third-party providers (Plaid / SaltEdge)

17) Cursor AI prompt (ready-to-paste)

Use this as the prompt for Cursor or other code assistant — it’s explicit and actionable.

Project: Personal Finance Visualizer (React 19 + TypeScript + Vite)

Goal: Build a single-page React app (Vite + React 19 + TypeScript) that aggregates bank accounts, stocks, provident funds, insurance, and company cash and visualizes net worth and spending. Must support CSV importing and optional bank linking via Plaid or Salt Edge. Use reactbits.dev components for micro-animations. Focus on production quality, accessibility (a11y), and no obvious bugs.

Deliverables:
1. Vite + React 19 + TypeScript scaffold
2. Use TailwindCSS for styling and shadcn/radix for accessible primitives
3. Integrate reactbits components (AnimatedNumber and AnimatedList or similar) for net-worth counter and transaction list
4. Routes/pages: /dashboard, /accounts, /portfolio, /spending, /imports, /settings
5. Database schema (Postgres) and API endpoints (REST or GraphQL):
   - GET /api/accounts
   - POST /api/accounts/import (CSV)
   - POST /api/accounts/link (Plaid sandbox link or SaltEdge mock)
   - GET /api/transactions?from=yyyy-mm-dd&to=yyyy-mm-dd
   - GET /api/portfolio
6. CSV importer UI: preview, column mapping, import history, duplicate detection
7. Spending page: heatmap, weekly/monthly bar chart, category donut (drillable)
8. Portfolio page: holdings table, allocation chart, P&L
9. Auth: simple Supabase Auth or JWT demo and encrypted token storage patterns
10. Tests: unit tests (Vitest), E2E tests (Playwright) for main flows
11. CI: GitHub Actions pipeline for lint/build/tests

Implementation details and constraints:
- Use Zustand for client state or Redux Toolkit if more complex
- Use Recharts (or similar) for charts — include tooltip and legend
- Provide a `server/mock` that simulates Plaid / SaltEdge responses for dev
- Make sure tokens are not stored in plain text; show encryption placeholders
- Include instructions in README for setting up Plaid sandbox (or SaltEdge dev) and mapping CSV columns
- Accessibility: aria labels for interactive widgets, keyboard navigation
- Add an InsightsPanel that returns short AI-like summaries (placeholder function)

Please scaffold a working prototype that:
- shows a Dashboard with AnimatedNetWorth and TransactionsList (sample seeded data)
- implements CSV import flow (drag & drop + mapping + commit)
- contains mocked bank-link flow (Plaid sandbox simulation)

Return:
- a GitHub-ready repo structure
- runnable `npm run dev`, tests, and clear README for reviewers
- comment on where production secrets and encryption keys should be placed (KMS, env)

Make the UI polished and production-minded (no TODOs for crucial features); write clear code comments and include tests for the CSV importer and Dashboard logic.


18) Final practical notes & next steps

Start small: get CSV import + dashboard working first — it will already solve most of your “where is my money?” pain.

Add connectors once you confirm which banks you use most; test in sandbox mode. (Plaid and Salt Edge docs are excellent starting points.) 
Plaid
+1

If you want, I can:

generate the Vite+React+TS scaffold and example components (I can produce code right now), or

create the Cursor-ready boilerplate repo files, or

produce the exact CSV mapping UI and validation logic.