import { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useLiveMarketData } from '../hooks/useLiveMarketData';
import { Play, Pause, Code, Database, Zap } from 'lucide-react';
import './TechShowcase.css';

export function TechShowcase() {
  const { state } = usePortfolio();
  const [isLiveActive, setIsLiveActive] = useState(false);
  
  // Custom Hook in action
  useLiveMarketData(isLiveActive);

  // useMemo optimization demo
  const topPerformers = useMemo(() => {
    return [...state.watchlist]
      .sort((a, b) => b.change - a.change)
      .slice(0, 3);
  }, [state.watchlist]);

  return (
    <div className="showcase-container animate-fade-in">
      <header className="showcase-header">
        <h1 className="text-h1">Technical Showcase</h1>
        <p className="text-body text-meta mt-2">
          Demonstrating advanced React patterns: Context API, useReducer, Custom Hooks, and Memoization.
        </p>
      </header>

      <div className="showcase-grid">
        
        {/* Custom Hook Demo */}
        <section className="glass-panel showcase-panel">
          <div className="panel-title flex-between">
            <h2 className="text-h3 flex-center gap-2"><Zap size={20} className="color-up" /> Custom Hooks & Live Data</h2>
            <button 
              className={`live-toggle-btn ${isLiveActive ? 'active' : ''}`}
              onClick={() => setIsLiveActive(!isLiveActive)}
            >
              {isLiveActive ? <Pause size={16} /> : <Play size={16} />}
              {isLiveActive ? 'Stop Stream' : 'Start Stream'}
            </button>
          </div>
          <p className="text-meta mb-4">
            Toggle the stream to activate `useLiveMarketData`. This hook triggers a `useEffect` interval that randomly mutates the global `PortfolioContext` watchlist, simulating a WebSocket feed.
          </p>
          
          <div className="live-data-preview">
            {state.watchlist.slice(0, 4).map(asset => (
              <div key={asset.symbol} className="preview-row flex-between">
                <span>{asset.symbol}</span>
                <span className={asset.isUp ? 'color-up' : 'color-down'}>
                  ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* useMemo Demo */}
        <section className="glass-panel showcase-panel">
          <div className="panel-title flex-between">
            <h2 className="text-h3 flex-center gap-2"><Code size={20} className="color-up" /> useMemo Optimization</h2>
          </div>
          <p className="text-meta mb-4">
            The Top Performers list below is calculated using `useMemo`. It only re-sorts the entire watchlist array when the dependency `state.watchlist` changes, avoiding expensive recalculations on generic re-renders.
          </p>
          
          <div className="performers-list">
            {topPerformers.map((asset, index) => (
              <div key={asset.symbol} className="performer-row">
                <div className="flex-center gap-2">
                  <span className="rank-badge">#{index + 1}</span>
                  <strong>{asset.symbol}</strong>
                </div>
                <span className="color-up">+{asset.change}%</span>
              </div>
            ))}
          </div>
        </section>

        {/* Context API Details */}
        <section className="glass-panel showcase-panel full-width">
          <div className="panel-title flex-between">
            <h2 className="text-h3 flex-center gap-2"><Database size={20} className="color-up" /> Global Context State Viewer</h2>
          </div>
          <p className="text-meta mb-4">
            Real-time view of the `PortfolioContext` managed by `useReducer`. Interactions in the Dashboard or Watchlist trigger dispatched actions that mutate this exact state globally.
          </p>

          <pre className="state-viewer">
            <code>
{JSON.stringify({
  buyingPower: state.buyingPower,
  portfolioValue: state.portfolioValue,
  transactionCount: state.transactions.length,
  latestTransaction: state.transactions[0]?.asset || 'None'
}, null, 2)}
            </code>
          </pre>
        </section>
      </div>
    </div>
  );
}
