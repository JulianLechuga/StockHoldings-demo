import { useState } from 'react';
import { Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import './Watchlist.css';
import './TradeCard.css';

export function Watchlist() {
  const { state, dispatch } = usePortfolio();
  
  // Local Trade Panel State
  const [selectedAsset, setSelectedAsset] = useState(state.watchlist[0]);
  const [tradeAction, setTradeAction] = useState<'buy' | 'sell'>('buy');
  const [sharesValue, setSharesValue] = useState<number>(1);

  const estimatedCost = sharesValue * selectedAsset.price;
  const canAfford = tradeAction === 'buy' ? state.buyingPower >= estimatedCost : true; // Assuming we can sell infinite mock shares for demo

  // Global Mock Trade Execution
  const handleTrade = () => {
    if (sharesValue <= 0) return;
    if (tradeAction === 'buy' && !canAfford) return;

    dispatch({
      type: 'EXECUTE_TRADE',
      trade: {
        type: tradeAction,
        asset: selectedAsset.symbol,
        name: selectedAsset.name,
        shares: sharesValue,
        price: selectedAsset.price,
      },
      cost: estimatedCost
    });

    // Reset shares after successful trade
    setSharesValue(1);
  };

  return (
    <div className="watchlist-container animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="glass-panel watchlist-panel">
        <div className="watchlist-header flex-between" style={{ marginBottom: '16px' }}>
          <h2 className="text-h3">Watchlist</h2>
          <button className="icon-btn add-btn"><Plus size={18} /></button>
        </div>

        <div className="watchlist-list">
          {state.watchlist.map((asset) => (
            <div 
              key={asset.symbol} 
              className={`watchlist-item ${selectedAsset.symbol === asset.symbol ? 'selected' : ''}`}
              onClick={() => setSelectedAsset(asset)}
              style={{ cursor: 'pointer' }}
            >
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
            <h3 className="text-h2">{selectedAsset.symbol}</h3>
            <span className="text-meta">{selectedAsset.name}</span>
          </div>
          <span className="text-h2">${selectedAsset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        
        <div className="trade-tabs">
          <button 
            className={`trade-tab ${tradeAction === 'buy' ? 'active' : ''}`}
            onClick={() => setTradeAction('buy')}
          >Buy</button>
          <button 
            className={`trade-tab ${tradeAction === 'sell' ? 'active' : ''}`}
            onClick={() => setTradeAction('sell')}
          >Sell</button>
        </div>
        
        <div className="trade-form">
          <div className="trade-input-group">
            <span className="text-meta">Shares</span>
            <input 
              type="number" 
              className="trade-input" 
              value={sharesValue} 
              min="1" 
              onChange={(e) => setSharesValue(Number(e.target.value) || 0)}
            />
          </div>
          
          <div className="trade-summary flex-between text-meta">
            <span>Market Price</span>
            <span>${selectedAsset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          
          <div className="trade-summary flex-between text-h3">
            <span>Estimated Cost</span>
            <span>${estimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          
          <button 
            className={`trade-action-btn ${tradeAction === 'sell' ? 'sell-action' : ''} ${!canAfford ? 'disabled' : ''}`}
            onClick={handleTrade}
            disabled={!canAfford}
            style={{ 
              opacity: canAfford ? 1 : 0.5, 
              cursor: canAfford ? 'pointer' : 'not-allowed',
              background: tradeAction === 'sell' ? 'rgba(255, 61, 0, 0.1)' : '',
              color: tradeAction === 'sell' ? 'var(--status-down)' : '',
              borderColor: tradeAction === 'sell' ? 'rgba(255, 61, 0, 0.3)' : '',
              boxShadow: tradeAction === 'sell' ? '0 0 12px rgba(255, 61, 0, 0.15)' : ''
            }}
          >
            {canAfford ? `Review ${tradeAction === 'buy' ? 'Order' : 'Sale'}` : 'Insufficient Funds'}
          </button>

          <div className="text-center text-meta trade-buying-power">
            Buying Power: <strong className={!canAfford ? 'color-down' : ''}>${state.buyingPower.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
