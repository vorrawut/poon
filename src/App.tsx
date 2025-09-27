import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import {
  Dashboard,
  Accounts,
  Portfolio,
  Spending,
  Imports,
  Settings,
} from "./pages";
import { setupMockAPI } from "./mock/server";
import { useInitializeData } from "./hooks/useInitializeData";

function App() {
  // Initialize data and mock API
  useInitializeData();

  useEffect(() => {
    // Setup mock API for development
    setupMockAPI();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="spending" element={<Spending />} />
          <Route path="imports" element={<Imports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
