import { NavLink } from 'react-router-dom';
import { Home, Compass, PieChart, Activity, Bell, Settings, LogOut, Newspaper, ArrowRightLeft } from 'lucide-react';
import './Sidebar.css'; 

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
          <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/showcase" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Compass size={20} />
            <span>Tech Showcase</span>
          </NavLink>
          <NavLink to="/portfolio-demo" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <PieChart size={20} />
            <span>Portfolio</span>
          </NavLink>
          <NavLink to="/transactions-demo" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <ArrowRightLeft size={20} />
            <span>Transactions</span>
          </NavLink>
          <NavLink to="/news-demo" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Newspaper size={20} />
            <span>News</span>
          </NavLink>
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
