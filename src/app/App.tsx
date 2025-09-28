import { useEffect } from "react";
import { AppProviders } from "./providers";
import { AppRoutes } from "./routes";
import { setupMockAPI } from "../services/mockAPI";
import { useInitializeData } from "../hooks/useInitializeData";

function App() {
  // Initialize data and mock API
  useInitializeData();

  useEffect(() => {
    // Setup mock API for development
    setupMockAPI();
  }, []);

  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
