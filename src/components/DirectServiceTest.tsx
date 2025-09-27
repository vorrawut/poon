import { useEffect, useState } from "react";
import { config, shouldUseMockData } from "../../config/environments";

// Direct imports to test
import { netWorthService } from "../features/networth/services/netWorthService";
import { accountsService } from "../features/accounts/services/accountsService";

export function DirectServiceTest() {
  const [testResults, setTestResults] = useState<any>({});
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    const results: any = {};

    console.log("🧪 Starting direct service tests...");
    console.log("🧪 Environment info:", {
      env: import.meta.env.VITE_APP_ENV,
      mode: import.meta.env.MODE,
      nodeEnv: import.meta.env.NODE_ENV,
      configEnv: config.environment,
      isLocal: config.isLocal,
      shouldUseMock: shouldUseMockData(),
      dataSource: config.dataSource,
      mockDelay: config.mockApiDelay,
    });

    // Test NetWorth Service
    try {
      console.log("🧪 Testing NetWorth service...");
      const startTime = Date.now();
      const netWorthData = await netWorthService.fetchNetWorth();
      const endTime = Date.now();

      results.netWorth = {
        success: true,
        data: netWorthData,
        duration: endTime - startTime,
        totalNetWorth: netWorthData.totalNetWorth,
      };
      console.log("🧪 NetWorth service SUCCESS:", results.netWorth);
    } catch (error) {
      results.netWorth = {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
      console.error("🧪 NetWorth service FAILED:", error);
    }

    // Test Accounts Service
    try {
      console.log("🧪 Testing Accounts service...");
      const startTime = Date.now();
      const accountsData = await accountsService.fetchAccounts();
      const endTime = Date.now();

      results.accounts = {
        success: true,
        data: accountsData,
        duration: endTime - startTime,
        count: accountsData.length,
      };
      console.log("🧪 Accounts service SUCCESS:", results.accounts);
    } catch (error) {
      results.accounts = {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
      console.error("🧪 Accounts service FAILED:", error);
    }

    setTestResults(results);
    setIsRunning(false);
    console.log("🧪 All service tests completed:", results);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="bg-purple-100 border border-purple-400 rounded-lg p-4 mb-4">
      <h3 className="font-bold text-purple-800 mb-2">🧪 Direct Service Test</h3>

      {isRunning && <div className="text-purple-600">⏳ Running tests...</div>}

      <div className="space-y-2 text-sm">
        <div>
          <strong>Environment:</strong> {config.environment}
          {config.isLocal && " (LOCAL)"}
          {shouldUseMockData() && " (MOCK DATA)"}
        </div>

        {testResults.netWorth && (
          <div
            className={`p-2 rounded ${testResults.netWorth.success ? "bg-green-100" : "bg-red-100"}`}
          >
            <strong>NetWorth:</strong>
            {testResults.netWorth.success ? (
              <>
                ✅ Success - $
                {testResults.netWorth.totalNetWorth?.toLocaleString()}(
                {testResults.netWorth.duration}ms)
              </>
            ) : (
              <>❌ Failed - {testResults.netWorth.error}</>
            )}
          </div>
        )}

        {testResults.accounts && (
          <div
            className={`p-2 rounded ${testResults.accounts.success ? "bg-green-100" : "bg-red-100"}`}
          >
            <strong>Accounts:</strong>
            {testResults.accounts.success ? (
              <>
                ✅ Success - {testResults.accounts.count} accounts (
                {testResults.accounts.duration}ms)
              </>
            ) : (
              <>❌ Failed - {testResults.accounts.error}</>
            )}
          </div>
        )}
      </div>

      <button
        onClick={runTests}
        className="mt-2 px-3 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600"
        disabled={isRunning}
      >
        {isRunning ? "Running..." : "Run Tests Again"}
      </button>
    </div>
  );
}
