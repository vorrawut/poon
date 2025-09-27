import { useEffect, useState } from "react";
import { netWorthService } from "../features/networth/services/netWorthService";
import { accountsService } from "../features/accounts/services/accountsService";

export function ServiceTester() {
  const [netWorthData, setNetWorthData] = useState<any>(null);
  const [accountsData, setAccountsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const testServices = async () => {
      setLoading(true);
      console.log("🧪 Testing services directly...");

      try {
        console.log("🧪 Calling netWorthService.fetchNetWorth()");
        const netWorth = await netWorthService.fetchNetWorth();
        console.log("🧪 NetWorth result:", netWorth);
        setNetWorthData(netWorth);
      } catch (error) {
        console.error("🧪 NetWorth error:", error);
        setErrors((prev) => [...prev, `NetWorth: ${error}`]);
      }

      try {
        console.log("🧪 Calling accountsService.fetchAccounts()");
        const accounts = await accountsService.fetchAccounts();
        console.log("🧪 Accounts result:", accounts);
        setAccountsData(accounts);
      } catch (error) {
        console.error("🧪 Accounts error:", error);
        setErrors((prev) => [...prev, `Accounts: ${error}`]);
      }

      setLoading(false);
    };

    testServices();
  }, []);

  if (loading) {
    return (
      <div className="bg-blue-100 p-4 rounded">🧪 Testing services...</div>
    );
  }

  return (
    <div className="bg-green-100 p-4 rounded space-y-2">
      <h3 className="font-bold">🧪 Service Test Results</h3>

      {errors.length > 0 && (
        <div className="bg-red-100 p-2 rounded">
          <strong>Errors:</strong>
          {errors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
      )}

      <div>
        <strong>NetWorth:</strong>{" "}
        {netWorthData
          ? `$${netWorthData.totalNetWorth?.toLocaleString()}`
          : "None"}
      </div>

      <div>
        <strong>Accounts:</strong>{" "}
        {accountsData ? `${accountsData.length} accounts` : "None"}
      </div>

      {netWorthData && (
        <details>
          <summary>NetWorth Data</summary>
          <pre className="text-xs">{JSON.stringify(netWorthData, null, 2)}</pre>
        </details>
      )}

      {accountsData && accountsData.length > 0 && (
        <details>
          <summary>First Account</summary>
          <pre className="text-xs">
            {JSON.stringify(accountsData[0], null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}
