import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Watchlist } from './components/Watchlist';
import { RecentTransactions } from './components/RecentTransactions';
import { NewsFeed } from './components/NewsFeed';
import { TechShowcase } from './components/TechShowcase';
import './App.css';

function MainLayout() {
  return (
    <>
      <div className="dashboard-grid">
        <Dashboard />
        <Watchlist />
      </div>
      <div className="dashboard-grid">
        <RecentTransactions />
        <NewsFeed />
      </div>
    </>
  );
}

function App() {
  return (
    <div className="app-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <main className="main-content">
        <div className="content-wrapper animate-fade-in">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<MainLayout />} />
            <Route path="/showcase" element={<TechShowcase />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
