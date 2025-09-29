import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import {
  Dashboard,
  Accounts,
  Portfolio,
  PortfolioDetail,
  Spending,
  MoneyFlow,
  MoneyTimeMachine,
  Future,
  Imports,
  Settings,
  UniverseDashboard,
  ThaiCulture,
  Social,
  AICoaching,
  AIInsights,
  Subscription,
} from "../pages";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UniverseDashboard />} />
        <Route path="universe" element={<UniverseDashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:assetId" element={<PortfolioDetail />} />
        <Route path="spending" element={<Spending />} />
        <Route path="money-flow" element={<MoneyFlow />} />
        <Route path="time-machine" element={<MoneyTimeMachine />} />
        <Route path="future" element={<Future />} />
        <Route path="thai-culture" element={<ThaiCulture />} />
        <Route path="social" element={<Social />} />
        <Route path="ai-coaching" element={<AICoaching />} />
        <Route path="ai-insights" element={<AIInsights />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="imports" element={<Imports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
