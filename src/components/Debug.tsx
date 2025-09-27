import { useEffect, useState } from 'react';
import { netWorthService } from '../features/networth/services/netWorthService';
import { accountsService } from '../features/accounts/services/accountsService';
import { config, shouldUseMockData } from '../../config/environments';

export function Debug() {
  const [netWorthData, setNetWorthData] = useState<any>(null);
  const [accountsData, setAccountsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testServices = async () => {
      console.log('🔧 Testing services...');
      console.log('Environment:', config.environment);
      console.log('Should use mock:', shouldUseMockData());
      console.log('Config:', config);

      try {
        console.log('Fetching net worth...');
        const netWorth = await netWorthService.fetchNetWorth();
        console.log('Net worth result:', netWorth);
        setNetWorthData(netWorth);

        console.log('Fetching accounts...');
        const accounts = await accountsService.fetchAccounts();
        console.log('Accounts result:', accounts);
        setAccountsData(accounts);
      } catch (error) {
        console.error('Service error:', error);
      } finally {
        setLoading(false);
      }
    };

    testServices();
  }, []);

  if (loading) {
    return <div className="p-4 bg-yellow-100">Loading debug info...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 border-l-4 border-blue-500">
      <h3 className="font-bold text-lg mb-4">🔧 Debug Information</h3>

      <div className="mb-4">
        <h4 className="font-semibold">Environment:</h4>
        <pre className="text-xs bg-gray-200 p-2 rounded">
          {JSON.stringify({
            environment: config.environment,
            dataSource: config.dataSource,
            shouldUseMock: shouldUseMockData(),
            isLocal: config.isLocal,
            mockDelay: config.mockApiDelay
          }, null, 2)}
        </pre>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold">Net Worth Data:</h4>
        <pre className="text-xs bg-gray-200 p-2 rounded">
          {JSON.stringify(netWorthData, null, 2)}
        </pre>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold">Accounts Data (first 2):</h4>
        <pre className="text-xs bg-gray-200 p-2 rounded">
          {JSON.stringify(accountsData?.slice(0, 2), null, 2)}
        </pre>
      </div>
    </div>
  );
}
