import { Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './Watchlist.css';
import './TradeCard.css';

const watchlistData = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 173.50, change: 1.25, isUp: true },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 202.64, change: -2.3, isUp: false },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 822.79, change: 4.5, isUp: true },
  { symbol: 'MSFT', name: 'Microsoft', price: 406.32, change: 0.8, isUp: true },
  { symbol: 'AMZN', name: 'Amazon.com', price: 178.15, change: -1.1, isUp: false },
  { symbol: 'BTC', name: 'Bitcoin', price: 67420.00, change: 5.2, isUp: true, isCrypto: true },
];

export function Watchlist() {
  return (
    <div className="watchlist-container animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="glass-panel watchlist-panel">
        <div className="watchlist-header flex-between">
          <h2 className="text-h3">Watchlist</h2>
          <button className="icon-btn add-btn"><Plus size={18} /></button>
        </div>

        <div className="watchlist-list">
          {watchlistData.map((asset) => (
            <div key={asset.symbol} className="watchlist-item">
              <div className="item-info">
                <span className="item-symbol">{asset.symbol}</span>
                <span className="item-name text-meta">{asset.name}</span>
              </div>
              
              <div className="item-sparkline">
                <svg width="60" height="24" viewBox="0 0 60 24">
                  <path 
                    d={asset.isUp ? "M 0 16 Q 15 20 30 12 T 60 4" : "M 0 4 Q 15 10 30 16 T 60 20"}
                    fill="none" 
                    stroke={asset.isUp ? 'var(--status-up)' : 'var(--status-down)'} 
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 2px 4px ${asset.isUp ? 'rgba(0, 230, 118, 0.3)' : 'rgba(255, 61, 0, 0.3)'})` }}
                  />
                </svg>
              </div>

              <div className="item-price-info">
                <span className="item-price">${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className={`item-change status-badge ${asset.isUp ? 'up' : 'down'}`} style={{ padding: '4px 8px', fontSize: '12px' }}>
                  {asset.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {asset.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="glass-panel trade-card">
        <div className="trade-card-header flex-between">
          <div className="trade-asset-info">
            <h3 className="text-h2">AAPL</h3>
            <span className="text-meta">Apple Inc.</span>
          </div>
          <span className="text-h2">$173.50</span>
        </div>
        
        <div className="trade-tabs">
          <button className="trade-tab active">Buy</button>
          <button className="trade-tab">Sell</button>
        </div>
        
        <div className="trade-form">
          <div className="trade-input-group">
            <span className="text-meta">Shares</span>
            <input type="number" className="trade-input" defaultValue="1" min="1" />
          </div>
          
          <div className="trade-summary flex-between text-meta">
            <span>Market Price</span>
            <span>$173.50</span>
          </div>
          
          <div className="trade-summary flex-between text-h3">
            <span>Estimated Cost</span>
            <span>$173.50</span>
          </div>
          
          <button className="trade-action-btn">Review Order</button>
          <div className="text-center text-meta trade-buying-power">
            Buying Power: <strong>$14,250.00</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
