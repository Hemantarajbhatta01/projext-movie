import React, { useState } from 'react';
import './MovieDetails.css';

const MovieDetails = () => {
  const [selectedTime, setSelectedTime] = useState('11:45 AM');
  
  const times = ['11:45 AM', '1:20 PM', '4:45 PM', '10:20 PM'];

  return (
    <div className="movie-details-panel">
      <div className="movie-header">
        <div className="poster-container">
          {/* using a placeholder for the poster since I don't have the exact image asset */}
          <img 
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
            alt="Zootopia 2 Poster" 
            className="movie-poster"
          />
          <button className="play-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </button>
        </div>
        
        <div className="movie-info">
          <h1>Zootopia 2</h1>
          <div className="movie-meta">
            <span>2025</span>
            <span className="dot">•</span>
            <span>2hr 45min</span>
          </div>
          
          <p className="movie-desc">
            Detectives Judy Hopps and Nick Wilde find themselves on the twisting trail of a mysterious reptile who turns the mammal metropolis of Zootopia upside down.
          </p>
          
          <div className="movie-ratings">
            <div className="rating">
              <span className="label">IMDb</span>
              <span className="value">7.7<span className="small">/10</span></span>
            </div>
            <div className="rating">
              <span className="label">Letterboxd</span>
              <span className="value">3.8<span className="small">/5</span></span>
            </div>
            <div className="rating">
              <span className="label">Critic Score</span>
              <span className="value">91%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="divider"></div>
      
      <div className="time-selector-section">
        <div className="section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>Selected Time</span>
        </div>
        <div className="time-pills">
          {times.map(time => (
            <button 
              key={time}
              className={`time-pill ${selectedTime === time ? 'active' : ''}`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="ticket-summary-section">
        <div className="section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="7" y1="4" x2="7" y2="20"></line></svg>
          <span>Selected Tickets</span>
        </div>
        
        <div className="tickets-grid">
          <div className="ticket-item">
            <div className="ticket-info">
              <span className="bold">B</span> <span className="small">row</span> <span className="bold ml">08</span> <span className="small">seat</span>
            </div>
            <div className="ticket-price">
              $ 15
              <button className="remove-btn"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>
          </div>
          <div className="ticket-item">
            <div className="ticket-info">
              <span className="bold">B</span> <span className="small">row</span> <span className="bold ml">09</span> <span className="small">seat</span>
            </div>
            <div className="ticket-price">
              $ 15
              <button className="remove-btn"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>
          </div>
          <div className="ticket-item">
            <div className="ticket-info">
              <span className="bold">B</span> <span className="small">row</span> <span className="bold ml">10</span> <span className="small">seat</span>
            </div>
            <div className="ticket-price">
              $ 15
              <button className="remove-btn"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-section">
        <div className="total-price">
          <span className="label">Total -</span>
          <span className="currency">$</span>
          <span className="amount">45</span>
        </div>
        <button className="buy-btn">Buy</button>
      </div>
    </div>
  );
};

export default MovieDetails;
