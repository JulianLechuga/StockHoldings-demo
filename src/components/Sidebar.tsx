import { Home, Compass, PieChart, Activity, Bell, Settings, LogOut, Newspaper, ArrowRightLeft } from 'lucide-react';
import './Sidebar.css'; // Let's create a dedicated CSS for sidebar

export function Sidebar() {
  return (
    <aside className="sidebar-container">
      <div className="sidebar-logo">
        <Activity className="color-up" size={28} />
        <span className="text-h3">StockHoldings</span>
      </div>

      <div className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-label text-meta">MENU</div>
          <button className="nav-item active">
            <Home size={20} />
            <span>Dashboard</span>
          </button>
          <button className="nav-item">
            <Compass size={20} />
            <span>Discover</span>
          </button>
          <button className="nav-item">
            <PieChart size={20} />
            <span>Portfolio</span>
          </button>
          <button className="nav-item">
            <ArrowRightLeft size={20} />
            <span>Transactions</span>
          </button>
          <button className="nav-item">
            <Newspaper size={20} />
            <span>News</span>
          </button>
        </div>

        <div className="nav-section">
          <div className="nav-label text-meta">SETTINGS</div>
          <button className="nav-item">
            <Bell size={20} />
            <span>Notifications</span>
          </button>
          <button className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">JD</div>
          <div className="user-info">
            <span className="name text-body">John Doe</span>
            <span className="email text-meta">Pro Member</span>
          </div>
        </div>
        <button className="logout-btn">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}
