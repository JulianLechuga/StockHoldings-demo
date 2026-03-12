import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './RecentTransactions.css';

const transactions = [
  { id: 1, type: 'buy', asset: 'AAPL', name: 'Apple Inc.', shares: 10, price: 173.50, date: 'Today, 10:24 AM' },
  { id: 2, type: 'sell', asset: 'TSLA', name: 'Tesla, Inc.', shares: 5, price: 202.64, date: 'Yesterday, 2:15 PM' },
  { id: 3, type: 'buy', asset: 'MSFT', name: 'Microsoft', shares: 2, price: 406.32, date: 'Mar 10, 9:30 AM' },
  { id: 4, type: 'deposit', asset: 'USD', name: 'Bank Transfer', shares: null, amount: 5000.00, date: 'Mar 8, 11:00 AM' }
];

export function RecentTransactions() {
  return (
    <div className="glass-panel transactions-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="panel-header flex-between">
        <h2 className="text-h3">Recent Transactions</h2>
        <button className="text-meta view-all-btn">View All</button>
      </div>

      <div className="transactions-list">
        {transactions.map((tx) => (
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
              {tx.shares ? (
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
