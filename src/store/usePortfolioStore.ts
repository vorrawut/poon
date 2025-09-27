import { create } from 'zustand';
import type { Portfolio, PortfolioPosition, Asset, PriceData } from '../types';

interface PortfolioState {
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio | null;
  positions: PortfolioPosition[];
  assets: Asset[];
  priceData: { [symbol: string]: PriceData };
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setPortfolios: (portfolios: Portfolio[]) => void;
  addPortfolio: (portfolio: Portfolio) => void;
  updatePortfolio: (id: string, updates: Partial<Portfolio>) => void;
  deletePortfolio: (id: string) => void;
  selectPortfolio: (portfolio: Portfolio | null) => void;
  setPositions: (positions: PortfolioPosition[]) => void;
  addPosition: (position: PortfolioPosition) => void;
  updatePosition: (id: string, updates: Partial<PortfolioPosition>) => void;
  deletePosition: (id: string) => void;
  setAssets: (assets: Asset[]) => void;
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  updatePriceData: (symbol: string, price: PriceData) => void;
  calculatePortfolioMetrics: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Async actions
  fetchPortfolios: () => Promise<void>;
  fetchPositions: (portfolioId: string) => Promise<void>;
  fetchAssets: (accountId?: string) => Promise<void>;
  refreshPrices: (symbols: string[]) => Promise<void>;
  addHolding: (portfolioId: string, symbol: string, quantity: number, price: number) => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolios: [],
  selectedPortfolio: null,
  positions: [],
  assets: [],
  priceData: {},
  isLoading: false,
  error: null,

  setPortfolios: (portfolios) => {
    set({ portfolios });
    get().calculatePortfolioMetrics();
  },

  addPortfolio: (portfolio) => {
    set((state) => ({ portfolios: [...state.portfolios, portfolio] }));
    get().calculatePortfolioMetrics();
  },

  updatePortfolio: (id, updates) => {
    set((state) => ({
      portfolios: state.portfolios.map(portfolio =>
        portfolio.id === id ? { ...portfolio, ...updates } : portfolio
      ),
    }));
    get().calculatePortfolioMetrics();
  },

  deletePortfolio: (id) => {
    set((state) => ({
      portfolios: state.portfolios.filter(portfolio => portfolio.id !== id),
      selectedPortfolio: state.selectedPortfolio?.id === id ? null : state.selectedPortfolio,
    }));
  },

  selectPortfolio: (portfolio) => {
    set({ selectedPortfolio: portfolio });
    if (portfolio) {
      get().fetchPositions(portfolio.id);
    }
  },

  setPositions: (positions) => {
    set({ positions });
  },

  addPosition: (position) => {
    set((state) => ({ positions: [...state.positions, position] }));
  },

  updatePosition: (id, updates) => {
    set((state) => ({
      positions: state.positions.map(position =>
        position.id === id ? { ...position, ...updates } : position
      ),
    }));
  },

  deletePosition: (id) => {
    set((state) => ({
      positions: state.positions.filter(position => position.id !== id),
    }));
  },

  setAssets: (assets) => {
    set({ assets });
    // Update portfolio calculations when assets change
    get().calculatePortfolioMetrics();
  },

  addAsset: (asset) => {
    set((state) => ({ assets: [...state.assets, asset] }));
    get().calculatePortfolioMetrics();
  },

  updateAsset: (id, updates) => {
    set((state) => ({
      assets: state.assets.map(asset =>
        asset.id === id ? { ...asset, ...updates } : asset
      ),
    }));
    get().calculatePortfolioMetrics();
  },

  deleteAsset: (id) => {
    set((state) => ({
      assets: state.assets.filter(asset => asset.id !== id),
    }));
    get().calculatePortfolioMetrics();
  },

  updatePriceData: (symbol, price) => {
    set((state) => ({
      priceData: {
        ...state.priceData,
        [symbol]: price,
      },
    }));
    
    // Update assets with new prices
    const { assets } = get();
    const updatedAssets = assets.map(asset => {
      if (asset.symbol === symbol) {
        const currentPrice = price.close;
        const marketValue = asset.quantity * currentPrice;
        const costBasis = asset.quantity * asset.avg_price;
        const changeAmount = marketValue - costBasis;
        const changePercent = costBasis > 0 ? (changeAmount / costBasis) * 100 : 0;
        
        return {
          ...asset,
          current_price: currentPrice,
          market_value: marketValue,
          change_amount: changeAmount,
          change_percent: changePercent,
        };
      }
      return asset;
    });
    
    set({ assets: updatedAssets });
    get().calculatePortfolioMetrics();
  },

  calculatePortfolioMetrics: () => {
    const { assets, priceData } = get();
    
    // Group assets by portfolio (using account_id as portfolio grouping for now)
    const portfolioGroups: { [key: string]: Asset[] } = {};
    assets.forEach(asset => {
      if (!portfolioGroups[asset.account_id]) {
        portfolioGroups[asset.account_id] = [];
      }
      portfolioGroups[asset.account_id].push(asset);
    });
    
    // Calculate portfolio metrics
    const updatedPortfolios = Object.entries(portfolioGroups).map(([accountId, portfolioAssets]) => {
      const totalValue = portfolioAssets.reduce((sum, asset) => {
        const currentPrice = asset.current_price || priceData[asset.symbol]?.close || asset.avg_price;
        return sum + (asset.quantity * currentPrice);
      }, 0);
      
      const totalCost = portfolioAssets.reduce((sum, asset) => {
        return sum + (asset.quantity * asset.avg_price);
      }, 0);
      
      const totalGainLoss = totalValue - totalCost;
      const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;
      
      return {
        id: accountId, // Using account ID as portfolio ID for simplicity
        user_id: 'current-user', // TODO: Get from auth context
        name: `Portfolio ${accountId}`,
        total_value: totalValue,
        total_cost: totalCost,
        total_gain_loss: totalGainLoss,
        total_gain_loss_percent: totalGainLossPercent,
        created_at: new Date().toISOString(),
      };
    });
    
    // Calculate positions with weights
    const positions = assets.map(asset => {
      const currentPrice = asset.current_price || priceData[asset.symbol]?.close || asset.avg_price;
      const marketValue = asset.quantity * currentPrice;
      const costBasis = asset.quantity * asset.avg_price;
      const gainLoss = marketValue - costBasis;
      const gainLossPercent = costBasis > 0 ? (gainLoss / costBasis) * 100 : 0;
      
      // Find the portfolio this asset belongs to
      const portfolio = updatedPortfolios.find(p => p.id === asset.account_id);
      const weightPercent = portfolio && portfolio.total_value > 0 ? 
        (marketValue / portfolio.total_value) * 100 : 0;
      
      return {
        id: asset.id,
        portfolio_id: asset.account_id,
        symbol: asset.symbol,
        name: asset.name || asset.symbol,
        quantity: asset.quantity,
        avg_price: asset.avg_price,
        current_price: currentPrice,
        market_value: marketValue,
        gain_loss: gainLoss,
        gain_loss_percent: gainLossPercent,
        weight_percent: weightPercent,
      };
    });
    
    set({ 
      portfolios: updatedPortfolios,
      positions: positions.sort((a, b) => b.market_value - a.market_value),
    });
  },

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  fetchPortfolios: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('/api/portfolios');
      if (!response.ok) throw new Error('Failed to fetch portfolios');
      
      const data = await response.json();
      get().setPortfolios(data.portfolios);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch portfolios' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPositions: async (portfolioId) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch(`/api/portfolios/${portfolioId}/positions`);
      if (!response.ok) throw new Error('Failed to fetch positions');
      
      const data = await response.json();
      get().setPositions(data.positions);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch positions' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAssets: async (accountId) => {
    set({ isLoading: true, error: null });
    
    try {
      const params = new URLSearchParams();
      if (accountId) params.append('account_id', accountId);
      
      const response = await fetch(`/api/assets?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch assets');
      
      const data = await response.json();
      get().setAssets(data.assets);
      
      // Fetch prices for all symbols
      const symbols = data.assets.map((asset: Asset) => asset.symbol);
      if (symbols.length > 0) {
        get().refreshPrices([...new Set(symbols)] as string[]);
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch assets' });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshPrices: async (symbols) => {
    try {
      const response = await fetch('/api/prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbols }),
      });
      
      if (!response.ok) throw new Error('Failed to fetch prices');
      
      const data = await response.json();
      
      // Update price data for each symbol
      data.prices.forEach((priceData: PriceData) => {
        get().updatePriceData(priceData.symbol, priceData);
      });
    } catch (error) {
      console.error('Failed to refresh prices:', error);
      // Don't set error state for price fetching failures as they're not critical
    }
  },

  addHolding: async (portfolioId, symbol, quantity, price) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('/api/holdings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolio_id: portfolioId,
          symbol,
          quantity,
          avg_price: price,
        }),
      });
      
      if (!response.ok) throw new Error('Failed to add holding');
      
      const newAsset = await response.json();
      get().addAsset(newAsset);
      
      // Refresh prices for the new symbol
      get().refreshPrices([symbol]);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add holding' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
