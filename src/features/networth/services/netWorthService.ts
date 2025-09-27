import { type NetWorthData } from '../types';

class NetWorthService {
  private baseUrl = '/api/networth';

  async fetchNetWorth(): Promise<NetWorthData> {
    try {
      const response = await fetch(`${this.baseUrl}/current`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return this.transformApiResponse(data);
    } catch (error) {
      // Fallback to mock data in development
      console.warn('Using mock net worth data:', error);
      return this.getMockNetWorthData();
    }
  }

  async updateNetWorth(netWorthData: Partial<NetWorthData>): Promise<NetWorthData> {
    const response = await fetch(`${this.baseUrl}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(netWorthData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return this.transformApiResponse(data);
  }

  private transformApiResponse(data: any): NetWorthData {
    return {
      totalNetWorth: data.total_net_worth || 0,
      netWorthChange: data.net_worth_change || 0,
      netWorthChangePercent: data.net_worth_change_percent || 0,
      previousNetWorth: data.previous_net_worth || 0,
      lastUpdated: new Date(data.last_updated || Date.now()),
      breakdown: {
        cash: data.breakdown?.cash || 0,
        investments: data.breakdown?.investments || 0,
        realEstate: data.breakdown?.real_estate || 0,
        other: data.breakdown?.other || 0,
      },
    };
  }

  private getMockNetWorthData(): NetWorthData {
    return {
      totalNetWorth: 284750.50,
      netWorthChange: 12456.78,
      netWorthChangePercent: 4.57,
      previousNetWorth: 272293.72,
      lastUpdated: new Date(),
      breakdown: {
        cash: 45000,
        investments: 195000,
        realEstate: 35000,
        other: 9750.50,
      },
    };
  }
}

export const netWorthService = new NetWorthService();
