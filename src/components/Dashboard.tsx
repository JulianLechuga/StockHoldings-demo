import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Activity, Award } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { usePortfolio } from '../context/PortfolioContext';
import './Dashboard.css';

const data = [
  { time: '9:30 AM', value: 124500 },
  { time: '10:00 AM', value: 125200 },
  { time: '11:00 AM', value: 124800 },
  { time: '12:00 PM', value: 126500 },
  { time: '1:00 PM', value: 126100 },
  { time: '2:00 PM', value: 127800 },
  { time: '3:00 PM', value: 128450 },
  { time: '4:00 PM', value: 129240.50 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip glass-panel">
        <p className="tooltip-time">{label}</p>
        <p className="tooltip-value">${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
    );
  }
  return null;
};

export function Dashboard() {
  const { state, dispatch } = usePortfolio();
  
  // Calculate dynamic mock data
  const isUp = true;
  const startingValue = 124500;
  const todayReturn = state.portfolioValue - startingValue;
  const todayReturnPerc = ((todayReturn / startingValue) * 100).toFixed(2);

  // Quick Deposit Action
  const handleDeposit = () => {
    dispatch({ type: 'DEPOSIT', amount: 5000 });
  };

  return (
    <div className="dashboard animate-fade-in">
      <header className="dashboard-header flex-between">
        <div className="portfolio-summary">
          <h1 className="text-h2">Total Portfolio Value</h1>
          <div className="portfolio-value-container">
            <span className="text-h1 glow-text">${state.portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <div className={`status-badge ${isUp ? 'up' : 'down'}`}>
              {isUp ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
              <span className="text-h3">
                {isUp ? '+' : '-'}${Math.abs(todayReturn).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({todayReturnPerc}%)
              </span>
              <span className="text-meta">Today</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="primary-btn" onClick={handleDeposit}>Deposit $5k</button>
          <button className="secondary-btn">Trade</button>
        </div>
      </header>

      <div className="chart-section glass-panel">
        <div className="chart-controls flex-between">
          <div className="time-filters">
            <button className="filter-btn active">1D</button>
            <button className="filter-btn">1W</button>
            <button className="filter-btn">1M</button>
            <button className="filter-btn">3M</button>
            <button className="filter-btn">1Y</button>
            <button className="filter-btn">ALL</button>
          </div>
          <button className="icon-btn tooltip-trigger">
            <TrendingUp size={20} />
          </button>
        </div>
        
        <div className="main-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2962ff" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2962ff" stopOpacity={0}/>
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <XAxis dataKey="time" hide />
              <YAxis domain={['dataMin - 500', 'dataMax + 500']} hide />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#2962ff" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                activeDot={{ r: 6, fill: '#2962ff', stroke: '#fff', strokeWidth: 2, filter: 'url(#glow)' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="stats-grid">
        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper"><DollarSign size={20} /></div>
          <div className="stat-info">
            <span className="text-meta">Buying Power</span>
            <span className="text-h3">${state.buyingPower.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper success"><Activity size={20} /></div>
          <div className="stat-info">
            <span className="text-meta">Total Return</span>
            <span className="text-h3 color-up">+{todayReturnPerc}%</span>
          </div>
        </div>
        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper purple"><Award size={20} /></div>
          <div className="stat-info">
            <span className="text-meta">Transactions</span>
            <span className="text-h3">{state.transactions.length} total</span>
          </div>
        </div>
      </div>
    </div>
  );
}
