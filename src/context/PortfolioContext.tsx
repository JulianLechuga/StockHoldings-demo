import { createContext, useContext, useReducer, type ReactNode } from 'react';

type Transaction = {
  id: number;
  type: 'buy' | 'sell' | 'deposit';
  asset: string;
  name?: string;
  shares?: number | null;
  price?: number;
  amount?: number;
  date: string;
};

type WatchlistItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  isUp: boolean;
  isCrypto?: boolean;
};

type PortfolioState = {
  buyingPower: number;
  portfolioValue: number;
  transactions: Transaction[];
  watchlist: WatchlistItem[];
};

type Action =
  | { type: 'DEPOSIT'; amount: number }
  | { type: 'EXECUTE_TRADE'; trade: Omit<Transaction, 'id' | 'date'>; cost: number }
  | { type: 'UPDATE_TICKER'; symbol: string; newPrice: number; newChange: number; isUp: boolean };

const initialTransactions: Transaction[] = [
  { id: 1, type: 'buy', asset: 'AAPL', name: 'Apple Inc.', shares: 10, price: 173.50, date: 'Today, 10:24 AM' },
  { id: 2, type: 'sell', asset: 'TSLA', name: 'Tesla, Inc.', shares: 5, price: 202.64, date: 'Yesterday, 2:15 PM' },
  { id: 3, type: 'buy', asset: 'MSFT', name: 'Microsoft', shares: 2, price: 406.32, date: 'Mar 10, 9:30 AM' },
  { id: 4, type: 'deposit', asset: 'USD', name: 'Bank Transfer', shares: null, amount: 5000.00, date: 'Mar 8, 11:00 AM' }
];

const initialWatchlist: WatchlistItem[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 173.50, change: 1.25, isUp: true },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 202.64, change: -2.3, isUp: false },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 822.79, change: 4.5, isUp: true },
  { symbol: 'MSFT', name: 'Microsoft', price: 406.32, change: 0.8, isUp: true },
  { symbol: 'AMZN', name: 'Amazon.com', price: 178.15, change: -1.1, isUp: false },
  { symbol: 'BTC', name: 'Bitcoin', price: 67420.00, change: 5.2, isUp: true, isCrypto: true },
];

const initialState: PortfolioState = {
  buyingPower: 14250.00,
  portfolioValue: 129240.50,
  transactions: initialTransactions,
  watchlist: initialWatchlist,
};

function portfolioReducer(state: PortfolioState, action: Action): PortfolioState {
  switch (action.type) {
    case 'DEPOSIT':
      return {
        ...state,
        buyingPower: state.buyingPower + action.amount,
        transactions: [
          {
            id: Date.now(),
            type: 'deposit',
            asset: 'USD',
            name: 'Quick Deposit',
            amount: action.amount,
            date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })
          },
          ...state.transactions
        ]
      };
    case 'EXECUTE_TRADE': {
      const isBuy = action.trade.type === 'buy';
      if (isBuy && state.buyingPower < action.cost) {
        return state; // Insufficient funds (handled previously in component, but safe here)
      }
      return {
        ...state,
        buyingPower: isBuy ? state.buyingPower - action.cost : state.buyingPower + action.cost,
        portfolioValue: isBuy ? state.portfolioValue + action.cost : state.portfolioValue - action.cost,
        transactions: [
          {
            id: Date.now(),
            ...action.trade,
            date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })
          },
          ...state.transactions
        ]
      };
    }
    case 'UPDATE_TICKER':
      return {
        ...state,
        watchlist: state.watchlist.map(item => 
          item.symbol === action.symbol 
            ? { ...item, price: action.newPrice, change: action.newChange, isUp: action.isUp }
            : item
        )
      };
    default:
      return state;
  }
}

const PortfolioContext = createContext<{
  state: PortfolioState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  return (
    <PortfolioContext.Provider value={{ state, dispatch }}>
      {children}
    </PortfolioContext.Provider>
  );
}

// Custom hook to use the Portfolio Context
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
