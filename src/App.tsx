import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Watchlist } from './components/Watchlist';
import { RecentTransactions } from './components/RecentTransactions';
import { NewsFeed } from './components/NewsFeed';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <main className="main-content">
        <div className="content-wrapper animate-fade-in">
          <div className="dashboard-grid">
            <Dashboard />
            <Watchlist />
          </div>
          <div className="dashboard-grid">
            <RecentTransactions />
            <NewsFeed />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
