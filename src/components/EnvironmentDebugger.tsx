import { config, shouldUseMockData } from "../../config/environments";

export function EnvironmentDebugger() {
  console.log("🔧 Environment Debug Info:", {
    VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
    NODE_ENV: import.meta.env.NODE_ENV,
    MODE: import.meta.env.MODE,
    "Config Environment": config.environment,
    "Is Local": config.isLocal,
    "Data Source": config.dataSource,
    "Should Use Mock": shouldUseMockData(),
    "Mock API Delay": config.mockApiDelay,
    "Debug Mode": config.features?.debugMode,
    "Full Config": config,
  });

  return (
    <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded shadow-lg text-xs z-50">
      <div>
        <strong>Env:</strong> {config.environment}
      </div>
      <div>
        <strong>Data:</strong> {shouldUseMockData() ? "mock" : "api"}
      </div>
      <div>
        <strong>Local:</strong> {config.isLocal ? "yes" : "no"}
      </div>
      <div>
        <strong>VITE_APP_ENV:</strong>{" "}
        {import.meta.env.VITE_APP_ENV || "undefined"}
      </div>
    </div>
  );
}
