import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User, Play, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Optional: add scroll listener to change navbar background when scrolling down
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`main-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="nav-brand">
            M<span className="logo-play"><Play size={22} fill="currentColor" /></span>ov
          </Link>
          <div className="nav-links">
            <Link to="/" className="active">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/series">Series</Link>
            <Link to="/kids">Kids</Link>
          </div>
        </div>

        <div className="nav-right">
          <button className="icon-btn"><Search size={20} /></button>
          <button className="icon-btn"><Bell size={20} /></button>
          
          {user ? (
            <div className="user-profile-menu">
              {user.role === 'admin' && (
                <Link to="/admin" className="admin-link" style={{ marginRight: '1rem', color: '#3b82f6', fontWeight: 'bold' }}>
                  Admin Panel
                </Link>
              )}
              <Link to="/bookings" style={{ marginRight: '1rem' }}>Bookings</Link>
              <button onClick={logout} style={{ marginRight: '1rem', color: '#ef4444' }}>Logout</button>
              <div className="avatar placeholder"><User size={16} /></div>
            </div>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}

          {/* Hamburger Button (mobile only) */}
          <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
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
          
          <div className="mobile-menu-divider" />

          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="admin-link-mobile" onClick={closeMenu}>
                  Admin Panel
                </Link>
              )}
              <Link to="/bookings" onClick={closeMenu}>My Bookings</Link>
              <div className="mobile-menu-divider" />
              <button className="logout-btn-mobile" onClick={() => { logout(); closeMenu(); }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={closeMenu}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
