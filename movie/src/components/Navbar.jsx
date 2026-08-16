import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, Play, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className="main-navbar">
      <div className="nav-container pill-nav">
        
        <div className="pill-section pill-left">
          <div className="pill-avatar">
            <User size={18} strokeWidth={2.5} />
          </div>
          <Link to="/movies" className="pill-link">Movies</Link>
          <Link to="/kids" className="pill-link">Kids</Link>
        </div>

        <div className="pill-section pill-center">
          <Link to="/" className="pill-brand">Dribbble</Link>
        </div>

        <div className="pill-section pill-right">
          <Link to="/3d" className="pill-link">3D</Link>
          <Link to="/imax" className="pill-link">IMAX</Link>
          <button className="pill-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`} 
        onClick={closeMenu}
      />

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
          <X size={24} />
        </button>

        <div className="mobile-nav-links">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/movies" onClick={closeMenu}>Movies</Link>
          <Link to="/series" onClick={closeMenu}>Series</Link>
          <Link to="/kids" onClick={closeMenu}>Kids</Link>
          <Link to="/3d" onClick={closeMenu}>3D</Link>
          <Link to="/imax" onClick={closeMenu}>IMAX</Link>
          
          <div className="mobile-menu-divider" />

          {user ? (
            <>
              <div className="mobile-user-info">
                Logged in as <strong>{user.email || 'User'}</strong>
              </div>
              {user.role === 'admin' && (
                <Link to="/admin" className="admin-link-mobile" onClick={closeMenu}>
                  Admin Panel
                </Link>
              )}
              <Link to="/bookings" onClick={closeMenu}>My Bookings</Link>
              <div className="mobile-menu-divider" />
              <button className="logout-btn-mobile" onClick={() => { logout(); closeMenu(); navigate('/'); }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={closeMenu} style={{ fontWeight: 'bold' }}>Login / Register</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
