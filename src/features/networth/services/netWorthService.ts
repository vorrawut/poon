import { type NetWorthData } from "../types";
import { config, shouldUseMockData } from "../../../../config/environments";

class NetWorthService {
  private baseUrl = "/api/networth";

  async fetchNetWorth(): Promise<NetWorthData> {
    console.log("🔍 NetWorthService.fetchNetWorth called");
    console.log("🔍 Environment:", config.environment);
    console.log("🔍 Should use mock data:", shouldUseMockData());
    console.log("🔍 Config:", config);

    // Check if we should use mock data based on environment configuration
    if (shouldUseMockData()) {
      console.log(`🔄 Using mock net worth data (${config.environment} mode)`);
      // Simulate API delay for realistic UX
      await new Promise((resolve) => setTimeout(resolve, config.mockApiDelay));
      console.log("🔄 Mock delay completed, generating data...");

      const mockData = this.getMockNetWorthData();
      console.log("🔄 Mock data generated:", mockData);
      return mockData;
    }

    try {
      const apiUrl = `${config.apiBaseUrl}/networth/current`;
      console.info(`🌐 Fetching net worth from: ${apiUrl}`);

      // Create timeout signal for fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.apiTimeout);

      const response = await fetch(apiUrl, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.info("✅ Net worth data fetched successfully");
      return this.transformApiResponse(data);
    } catch (error) {
      console.warn(
        "⚠️ API failed, falling back to mock net worth data:",
        error,
      );

      // In production, show error; in development, fallback to mock
      if (config.isProduction) {
        throw error;
      }

      // Fallback to mock data for development/local
      await new Promise((resolve) => setTimeout(resolve, config.mockApiDelay));
      return this.getMockNetWorthData();
    }
  }

  async updateNetWorth(
    netWorthData: Partial<NetWorthData>,
  ): Promise<NetWorthData> {
    const response = await fetch(`${this.baseUrl}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(netWorthData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return this.transformApiResponse(data);
  }

  private transformApiResponse(data: Record<string, unknown>): NetWorthData {
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
    // Calculate realistic totals based on mock accounts
    const cash = 81670.5; // Checking + Savings accounts
    const investments = 247050.25; // 401k + IRA + Trading + Stock options
    const realEstate = 0; // No real estate in current mock data
    const other = -22803.54; // Credit cards and loans (negative)

    const totalNetWorth = cash + investments + realEstate + other; // ~305,917
    const previousNetWorth = totalNetWorth - 8347.23; // Previous month
    const netWorthChange = totalNetWorth - previousNetWorth;
    const netWorthChangePercent = (netWorthChange / previousNetWorth) * 100;

    return {
      totalNetWorth: Math.round(totalNetWorth * 100) / 100,
      netWorthChange: Math.round(netWorthChange * 100) / 100,
      netWorthChangePercent: Math.round(netWorthChangePercent * 100) / 100,
      previousNetWorth: Math.round(previousNetWorth * 100) / 100,
      lastUpdated: new Date(),
      breakdown: {
        cash: cash,
        investments: investments,
        realEstate: realEstate,
        other: other,
      },
    };
  }
}

export const netWorthService = new NetWorthService();
