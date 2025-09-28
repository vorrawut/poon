// Portfolio Category Mock Data

export const mockPortfolioCategoryData = {
  cash: {
    totalCash: 125000,
    emergencyFundMonths: 8.5,
    interestRate: 4.2,
    accounts: [
      {
        id: "1",
        name: "High-Yield Savings",
        type: "Savings",
        balance: 75000,
        interestRate: 4.5,
        monthlyInterest: 281,
      },
      {
        id: "2",
        name: "Checking Account",
        type: "Checking",
        balance: 25000,
        interestRate: 0.1,
        monthlyInterest: 2,
      },
      {
        id: "3",
        name: "Money Market",
        type: "Money Market",
        balance: 25000,
        interestRate: 3.8,
        monthlyInterest: 79,
      },
    ],
  },
  stocks: {
    totalValue: 280000,
    todayChange: 15420,
    allocation: 45,
    holdings: [
      {
        ticker: "TSLA",
        name: "Tesla Inc.",
        units: 500,
        value: 124500,
        change: 12.5,
      },
      {
        ticker: "AAPL",
        name: "Apple Inc.",
        units: 200,
        value: 34000,
        change: 8.2,
      },
      {
        ticker: "GOOGL",
        name: "Alphabet Inc.",
        units: 150,
        value: 45000,
        change: -2.1,
      },
      {
        ticker: "MSFT",
        name: "Microsoft Corp.",
        units: 100,
        value: 41000,
        change: 15.7,
      },
    ],
  },
  crypto: {
    totalValue: 45000,
    todayChange: -8.5,
    volatility: 0.85,
    holdings: [
      {
        symbol: "BTC",
        name: "Bitcoin",
        units: 0.8,
        value: 28000,
        change: -5.2,
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        units: 8.5,
        value: 12000,
        change: -12.8,
      },
      {
        symbol: "ADA",
        name: "Cardano",
        units: 15000,
        value: 5000,
        change: 3.4,
      },
    ],
  },
  bonds: {
    totalValue: 85000,
    todayChange: 0.8,
    avgYield: 3.2,
    holdings: [
      {
        name: "US Treasury 10Y",
        value: 45000,
        yield: 3.8,
        maturity: "2034-03-15",
      },
      {
        name: "Corporate Bonds",
        value: 25000,
        yield: 4.2,
        maturity: "2029-08-20",
      },
      {
        name: "Municipal Bonds",
        value: 15000,
        yield: 2.1,
        maturity: "2031-12-01",
      },
    ],
  },
  realestate: {
    totalValue: 450000,
    todayChange: 2.1,
    properties: [
      {
        address: "123 Main St, Bangkok",
        type: "Condo",
        value: 280000,
        monthlyRent: 15000,
        occupancy: "Rented",
      },
      {
        address: "456 Beach Rd, Phuket",
        type: "Villa",
        value: 170000,
        monthlyRent: 0,
        occupancy: "Personal Use",
      },
    ],
  },
};
