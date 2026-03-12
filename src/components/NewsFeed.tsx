import { ExternalLink, Clock } from 'lucide-react';
import './NewsFeed.css';

const newsItems = [
  { id: 1, title: 'Federal Reserve announces latest interest rate decision', source: 'Financial Times', time: '2 hours ago', category: 'Macro' },
  { id: 2, title: 'Tech stocks rally as AI chip demand continues to surge', source: 'Bloomberg', time: '4 hours ago', category: 'Tech' },
  { id: 3, title: 'Tesla drops price of Model Y in European markets', source: 'Reuters', time: '6 hours ago', category: 'Auto' },
  { id: 4, title: 'Bitcoin breaches new resistance level amidst ETF inflows', source: 'CoinDesk', time: '8 hours ago', category: 'Crypto' }
];

export function NewsFeed() {
  return (
    <div className="glass-panel news-panel animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="panel-header flex-between">
        <h2 className="text-h3">Market News</h2>
        <button className="text-meta view-all-btn">More News</button>
      </div>

      <div className="news-list">
        {newsItems.map((news) => (
          <div key={news.id} className="news-item">
            <div className="news-category">
              <span className={`category-tag ${news.category.toLowerCase()}`}>{news.category}</span>
              <span className="text-meta flex-center" style={{ gap: '4px' }}>
                <Clock size={12} />
                {news.time}
              </span>
            </div>
            
            <h4 className="news-title">{news.title}</h4>
            
            <div className="news-footer flex-between">
              <span className="text-meta">{news.source}</span>
              <button className="icon-btn read-more-btn">
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
