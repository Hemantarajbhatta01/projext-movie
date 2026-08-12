import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import * as bookingApi from '../api/bookingApi';
import { toast } from 'react-hot-toast';
import { CreditCard, CheckCircle } from 'lucide-react';
import './PaymentPage.css';

const PaymentPage = () => {
  const { bookingData, clearBooking } = useBooking();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  if (!bookingData.show || !bookingData.seats || bookingData.seats.length === 0) {
    return <Navigate to="/movies" replace />;
  }

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Simulate Payment Initiation
      const { data: initData } = await bookingApi.initiatePayment({
        amount: bookingData.totalPrice,
        method: 'simulated'
      });

      // 2. Simulate Payment Verification
      const { data: verifyData } = await bookingApi.verifyPayment({
        paymentRef: initData.paymentRef
      });

      // 3. Create actual booking in database
      const { data: bookingResult } = await bookingApi.createBooking({
        movieId: bookingData.movie._id,
        showId: bookingData.show._id,
        seats: bookingData.seats,
        paymentId: verifyData.paymentId,
        totalAmount: bookingData.totalPrice,
        showDate: bookingData.show.date,
        showTime: bookingData.show.time
      });

      toast.success('Payment successful!');
      
      // Pass the full data for success page display
      const successData = {
        ...bookingResult,
        movieTitle: bookingData.movie.title,
        moviePoster: bookingData.movie.poster,
        cinemaName: bookingData.cinema?.name || bookingData.show.cinemaId?.name || 'Cinema',
        seatLabels: bookingData.seats.map(s => `${s.row}${s.number}`),
      };
      
      // Navigate FIRST, then clear booking data to avoid race condition
      // where clearing triggers a re-render and the guard redirects to /movies
      navigate('/success', { state: { booking: successData }, replace: true });
      clearBooking();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1 className="page-title">Checkout</h1>
        
        <div className="payment-content">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-card">
              <div className="summary-movie">
                <img 
                  src={bookingData.movie.poster} 
                  alt={bookingData.movie.title} 
                />
                <div>
                  <h3>{bookingData.movie.title}</h3>
                  <p>{bookingData.cinema?.name || bookingData.show.cinemaId?.name}</p>
                </div>
              </div>
              
              <div className="summary-details">
                <div className="detail-row">
                  <span>Showtime</span>
                  <span>{new Date(bookingData.show.date).toDateString()} | {bookingData.show.time}</span>
                </div>
                <div className="detail-row">
                  <span>Seats</span>
                  <span>{bookingData.seats.map(s => `${s.row}${s.number}`).join(', ')}</span>
                </div>
              </div>
              
              <div className="summary-total">
                <span>Total Amount</span>
                <span className="total-price">Rs. {bookingData.totalPrice}</span>
              </div>
            </div>
          </div>
          
          <div className="payment-methods">
            <h2>Payment Method</h2>
            
            <div className="payment-options">
              <label className="payment-option selected">
                <input type="radio" name="payment" defaultChecked />
                <div className="option-content">
                  <CreditCard size={24} />
                  <span>Simulated Card Payment</span>
                  <CheckCircle className="check-icon" size={20} />
                </div>
              </label>
              
              <label className="payment-option disabled">
                <input type="radio" name="payment" disabled />
                <div className="option-content">
                  <img src="https://khalti.s3.ap-south-1.amazonaws.com/KHALTI_LOGO_ICON.png" alt="Khalti" style={{width: 24}}/>
                  <span>Khalti Wallet (Coming Soon)</span>
                </div>
              </label>
            </div>
            
            <button 
              className="pay-btn" 
              onClick={handlePayment} 
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay Rs. ${bookingData.totalPrice}`}
            </button>
            <p className="payment-note">Note: This is a demo. No real money will be deducted.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
