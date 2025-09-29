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
        <Route path="imports" element={<Imports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
