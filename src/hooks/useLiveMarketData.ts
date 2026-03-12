import { useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

// Custom Hook to simulate WebSocket live data updates
export function useLiveMarketData(isActive: boolean = true) {
  const { state, dispatch } = usePortfolio();

  useEffect(() => {
    if (!isActive) return;

    // Simulate price fluctuation every second
    const interval = setInterval(() => {
      // Pick a random asset from the watchlist
      const assetCount = state.watchlist.length;
      if (assetCount === 0) return;
      
      const randomIdx = Math.floor(Math.random() * assetCount);
      const asset = state.watchlist[randomIdx];

      // Simulate a small random price jump (-0.5% to +0.5%)
      const volatility = 0.005; // 0.5%
      const jumpRatio = 1 + (Math.random() * volatility * 2 - volatility); 
      
      const newPrice = Number((asset.price * jumpRatio).toFixed(2));
      
      // Calculate new daily change percentage slightly varied from previous
      const changeVariance = Math.random() * 0.2 - 0.1;
      const newChange = Number((asset.change + changeVariance).toFixed(2));
      const isUp = newChange >= 0;

      dispatch({
        type: 'UPDATE_TICKER',
        symbol: asset.symbol,
        newPrice,
        newChange,
        isUp,
      });

    }, 2000); // 2 second mock WebSocket tick

    return () => clearInterval(interval);
  }, [isActive, state.watchlist, dispatch]);
}
