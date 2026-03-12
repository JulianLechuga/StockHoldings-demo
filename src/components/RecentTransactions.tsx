import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import './RecentTransactions.css';

export function RecentTransactions() {
  const { state } = usePortfolio();
  
  // Show only the 5 most recent transactions
  const displayTransactions = state.transactions.slice(0, 5);

  return (
    <div className="glass-panel transactions-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="panel-header flex-between">
        <h2 className="text-h3">Recent Transactions</h2>
        <button className="text-meta view-all-btn">
          View All ({state.transactions.length})
        </button>
      </div>

      <div className="transactions-list">
        {displayTransactions.map((tx) => (
          <div key={tx.id} className="transaction-item">
            <div className="tx-icon-wrapper">
              {tx.type === 'buy' || tx.type === 'deposit' ? (
                <ArrowDownRight size={20} className="color-up" />
              ) : (
                <ArrowUpRight size={20} className="color-down" />
              )}
            </div>
            
            <div className="tx-info">
              <span className="tx-name text-body">
                {tx.type === 'buy' ? 'Bought' : tx.type === 'sell' ? 'Sold' : 'Deposit'} {tx.asset}
              </span>
              <span className="text-meta">{tx.date}</span>
            </div>
            
            <div className="tx-amount-info">
              {tx.shares && tx.price ? (
                <>
                  <span className="tx-total text-body">
                    {tx.type === 'buy' ? '-' : '+'}${(tx.shares * tx.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-meta">{tx.shares} shares @ ${tx.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="tx-total text-body color-up">
                  +${tx.amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
