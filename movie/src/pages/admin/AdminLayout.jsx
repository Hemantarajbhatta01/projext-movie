import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Film, MonitorPlay, CalendarDays, LogOut, Home, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-layout">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`admin-sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Cinematix <span>Admin</span></h2>
          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/admin" end className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'} onClick={closeSidebar}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/admin/movies" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'} onClick={closeSidebar}>
            <Film size={20} /> Manage Movies
          </NavLink>
          <NavLink to="/admin/halls" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'} onClick={closeSidebar}>
            <MonitorPlay size={20} /> Manage Halls
          </NavLink>
          <NavLink to="/admin/shows" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'} onClick={closeSidebar}>
            <CalendarDays size={20} /> Manage Shows
          </NavLink>
          <NavLink to="/admin/screens" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'} onClick={closeSidebar}>
            <MonitorPlay size={20} /> Manage Screens
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={() => { navigate('/'); closeSidebar(); }}>
            <Home size={20} /> Back to Site
          </button>
          <button className="nav-item text-red" onClick={logout}>
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <div className="admin-topbar">
          <button className="mobile-sidebar-toggle" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <div className="topbar-right">
            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit' }}>
              <div className="admin-avatar" style={{ overflow: 'hidden', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt="Admin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  user?.name ? user.name.charAt(0).toUpperCase() : 'A'
                )}
              </div>
              <span>{user?.name || 'Admin User'}</span>
            </Link>
          </div>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
