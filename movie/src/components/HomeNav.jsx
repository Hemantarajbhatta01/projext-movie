import React from 'react';
import { Link } from 'react-router-dom';
import './HomeNav.css';

const HomeNav = () => {
  return (
    <nav className="home-nav">
      <div className="home-nav-left">
        <div className="brand-logo">
          <h1>Moov</h1>
        </div>
        <ul className="nav-links">
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/">Movies</Link></li>
          <li><Link to="/">Series</Link></li>
          <li><Link to="/">Kids</Link></li>
        </ul>
      </div>
      
      <div className="home-nav-right">
        <button className="icon-btn-transparent">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        <button className="icon-btn-transparent">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        </button>
        <div className="profile-avatar">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&q=80" alt="Profile" />
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
