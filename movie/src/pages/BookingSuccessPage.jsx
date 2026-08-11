import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Download, Ticket } from 'lucide-react';
import './Auth.css'; // Reuse auth styles for simplicity

const BookingSuccessPage = () => {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return <Navigate to="/" replace />;
  }

  const movieTitle = booking.movieTitle || booking.movieId?.title || 'Movie';
  const cinemaName = booking.cinemaName || booking.cinemaId?.name || '';
  const seatLabels = booking.seatLabels || booking.seats || [];

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '500px', textAlign: 'center' }}>
        <CheckCircle size={80} color="#4ade80" style={{ margin: '0 auto 1.5rem' }} />
        <h2>Booking Confirmed!</h2>
        <p className="auth-subtitle">Your tickets have been booked successfully.</p>
        
        <div style={{ background: 'var(--bg-panel-light, rgba(255,255,255,0.05))', padding: '1.5rem', borderRadius: '12px', margin: '2rem 0', textAlign: 'left' }}>
          <h3 style={{ marginBottom: '1rem', color: '#1da1f2' }}>{movieTitle}</h3>
          {cinemaName && <p style={{ color: 'var(--text-secondary, #9ca3af)', marginBottom: '0.5rem' }}>{cinemaName}</p>}
          <p style={{ color: 'var(--text-secondary, #9ca3af)', marginBottom: '0.5rem' }}>
            {new Date(booking.showDate).toDateString()} | {booking.showTime}
          </p>
          <p style={{ color: 'var(--text-secondary, #9ca3af)', marginBottom: '0.5rem' }}>
            Seats: {Array.isArray(seatLabels) ? seatLabels.join(', ') : seatLabels}
          </p>
          <p style={{ color: 'var(--text-secondary, #9ca3af)' }}>Booking ID: {booking.bookingId}</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/bookings" className="auth-btn" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            <Ticket size={20} /> My Bookings
          </Link>
          <Link to="/" className="auth-btn" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '0.5rem', background: 'var(--glass-bg, rgba(255,255,255,0.1))', color: 'white', border: '1px solid var(--glass-border, rgba(255,255,255,0.2))' }}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
