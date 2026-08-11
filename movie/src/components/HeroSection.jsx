import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-background">
        {/* Using a placeholder for Monsters Inc background */}
        <img 
          src="https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Monsters, INC. Background" 
          className="hero-image"
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title">Monsters, INC.</h1>
        <p className="hero-description">
          Animated film that explores the world of Monstropolis, where monsters generate their city's power by scaring children at night.
        </p>
        
        <div className="hero-actions">
          <button className="btn-primary">
            Watch Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </button>
          <button className="btn-secondary">
            Details
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
