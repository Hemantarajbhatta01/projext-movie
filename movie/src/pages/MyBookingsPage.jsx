import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as bookingApi from '../api/bookingApi';
import { Download, Calendar, MapPin, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import './MyBookings.css';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await bookingApi.getBookingHistory();
        setBookings(data);
      } catch (error) {
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="loading-screen">Loading bookings...</div>;

  return (
    <div className="my-bookings-page">
      <div className="bookings-container">
        <h1 className="page-title">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <div className="no-bookings">
            <p>You haven't booked any movies yet.</p>
            <Link to="/movies" className="browse-btn">Browse Movies</Link>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-poster">
                  <img 
                    src={booking.movieId?.poster || '/posters/dinosaur.avif'} 
                    alt={booking.movieId?.title || 'Movie'} 
                  />
                </div>
                <div className="booking-info">
                  <div className="booking-header">
                    <h2>{booking.movieId?.title || 'Movie'}</h2>
                    <span className={`status-badge ${booking.bookingStatus}`}>
                      {booking.bookingStatus}
                    </span>
                  </div>
                  
                  <div className="booking-details">
                    <p><Calendar size={16} /> {new Date(booking.showDate).toLocaleDateString()}</p>
                    <p><Clock size={16} /> {booking.showTime}</p>
                  </div>
                  
                  <div className="booking-seats">
                    <strong>Seats:</strong> {booking.seats?.join(', ') || 'N/A'}
                  </div>
                  
                  <div className="booking-footer">
                    <div className="booking-price">
                      Total: <span>Rs. {booking.totalAmount}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      ID: {booking.bookingId}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
