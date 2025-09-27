import { netWorthService } from "../features/networth/services/netWorthService";
import { accountsService } from "../features/accounts/services/accountsService";

export function MockDataDisplay() {
  // Get the mock data directly (synchronously)
  const getMockData = () => {
    // Access the private method by creating a new instance
    const netWorthServiceInstance = netWorthService as any;
    const accountsServiceInstance = accountsService as any;

    try {
      const mockNetWorth = netWorthServiceInstance.getMockNetWorthData();
      const mockAccounts = accountsServiceInstance.getMockAccounts();

      return {
        netWorth: mockNetWorth,
        accounts: mockAccounts,
        success: true,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : String(error),
        success: false,
      };
    }
  };

  const mockData = getMockData();

  return (
    <div className="bg-orange-100 border border-orange-400 rounded-lg p-4 mb-4">
      <h3 className="font-bold text-orange-800 mb-2">
        📊 Mock Data Direct Access
      </h3>

      {mockData.success ? (
        <div className="space-y-2 text-sm">
          <div className="bg-white p-2 rounded">
            <strong>Net Worth:</strong> $
            {mockData.netWorth?.totalNetWorth?.toLocaleString()}
            <br />
            <strong>Change:</strong> $
            {mockData.netWorth?.netWorthChange?.toLocaleString()}(
            {mockData.netWorth?.netWorthChangePercent?.toFixed(1)}%)
          </div>

          <div className="bg-white p-2 rounded">
            <strong>Accounts:</strong> {mockData.accounts?.length} total
            <br />
            <strong>Types:</strong>{" "}
            {[...new Set(mockData.accounts?.map((acc: any) => acc.type))].join(
              ", ",
            )}
          </div>

          <details className="bg-white p-2 rounded">
            <summary className="cursor-pointer font-medium">
              Raw Mock Data
            </summary>
            <pre className="text-xs mt-2 overflow-auto max-h-40">
              {JSON.stringify(
                {
                  netWorth: mockData.netWorth,
                  accounts: mockData.accounts?.slice(0, 2),
                },
                null,
                2,
              )}
            </pre>
          </details>
        </div>
      ) : (
        <div className="text-red-600">
          ❌ Failed to access mock data: {mockData.error}
        </div>
      )}
    </div>
  );
}
