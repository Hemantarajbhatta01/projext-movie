import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Menu, Settings2, Ticket, Search, Heart, User,
  ChevronRight, ChevronLeft, Calendar, Play, X, Clock
} from 'lucide-react';
import * as movieApi from '../api/movieApi';
import * as cinemaApi from '../api/cinemaApi';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import './BookingPage.css';

function BookingPage() {
  const { id } = useParams(); // movie ID
  const navigate = useNavigate();
  const { updateBooking } = useBooking();
  const { user } = useAuth();

  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Booking states
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Generate next 7 days
  const generateDates = () => {
    const dates = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        day: dayNames[d.getDay()],
        num: d.getDate().toString(),
        full: d.toISOString().split('T')[0]
      });
    }
    return dates;
  };
  const dates = generateDates();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, showsRes] = await Promise.all([
          movieApi.getMovieById(id),
          cinemaApi.getShows({ movieId: id })
        ]);
        setMovie(movieRes.data);
        setShows(showsRes.data);
        if (dates.length > 0) setSelectedDate(dates[0].full);
      } catch (err) {
        console.error("Failed to load booking data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Get available times for selected date
  const availableShowsForDate = shows.filter(s => {
    const showDate = new Date(s.date).toISOString().split('T')[0];
    return showDate === selectedDate;
  });
  const times = [...new Set(availableShowsForDate.map(s => s.time))];

  // When time is selected, fetch seats for that show
  useEffect(() => {
    if (selectedTime && selectedDate) {
      const show = availableShowsForDate.find(s => s.time === selectedTime);
      if (show) {
        setSelectedShow(show);
        // Fetch real seat data
        cinemaApi.getShowSeats(show._id).then(({ data }) => {
          setSeats(data.seats);
        }).catch(err => console.error('Failed to load seats', err));
        setSelectedSeats([]); // Reset seats on time change
      }
    }
  }, [selectedTime, selectedDate]);

  // Auto-select first time
  useEffect(() => {
    if (times.length > 0 && !selectedTime) {
      setSelectedTime(times[0]);
    }
  }, [times]);

  const rows = ['G', 'F', 'E', 'D', 'C', 'B', 'A'];
  const bookedSeatIds = seats.filter(s => s.isBooked).map(s => `${s.row}${s.number}`);

  const handleSeatClick = (row, num) => {
    const seatId = `${row}${num}`;
    if (bookedSeatIds.includes(seatId)) return;

    const seatData = seats.find(s => s.row === row && s.number === num);
    const price = seatData?.price || 350;
    const type = seatData?.type || 'standard';
    const isSelected = selectedSeats.some(s => s.id === seatId);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, { id: seatId, row, num, price, type }]);
    }
  };

  const removeSeat = (seatId) => {
    setSelectedSeats(selectedSeats.filter(s => s.id !== seatId));
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleBuy = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    if (!selectedShow) {
      toast.error('Please select a showtime');
      return;
    }
    // Store booking data in context
    updateBooking({
      movie,
      cinema: selectedShow.cinemaId,
      show: selectedShow,
      seats: selectedSeats.map(s => ({ row: s.row, number: s.num, type: s.type, price: s.price })),
      totalPrice
    });
    navigate('/payment');
  };

  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!movie) return <div className="loading-screen">Movie not found</div>;

  return (
    <div className="zootopia-booking-container">
      <div className="booking-inner-wrapper">
        
        {/* Top Navbar */}
        <header className="zootopia-header">
          <div className="header-left">
            <Link to="/" className="icon-box"><ChevronLeft size={20} /></Link>
            <div className="filter-pill">{movie.genre?.[0] || 'Movie'}</div>
            {selectedShow && (
              <div className="filter-pill outline">{selectedShow.cinemaId?.name} <X size={14} className="ml-icon" /></div>
            )}
          </div>
          
          <div className="header-center">
            <Link to="/" className="logo">Cinematix</Link>
          </div>
          
          <div className="header-right">
            <button className="icon-box"><Ticket size={20} /></button>
            <button className="icon-box"><Search size={20} /></button>
            <button className="icon-box"><Heart size={20} /></button>
            <button className="user-profile-btn">
              <User size={20} />
              <ChevronRight size={14} className="rotate-down" />
            </button>
          </div>
        </header>

        <main className="zootopia-main">
          {/* Left Panel */}
          <div className="zootopia-left-panel">
            
            {/* Date Selector */}
            <div className="date-carousel">
              <button className="calendar-btn"><Calendar size={20} /></button>
              <div className="dates-list">
                {dates.map((date) => (
                  <button 
                    key={date.full} 
                    className={`date-box ${selectedDate === date.full ? 'active' : ''}`}
                    onClick={() => { setSelectedDate(date.full); setSelectedTime(null); setSelectedSeats([]); }}
                  >
                    <span className="day-name">{date.day}</span>
                    <span className="day-num">{date.num}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Movie Info */}
            <div className="movie-details-block">
              <div className="poster-wrapper">
                <img src={movie.poster} alt={movie.title} className="main-poster" />
                <button className="poster-play-btn"><Play size={24} fill="currentColor" /></button>
              </div>
              <div className="movie-info-text">
                <h1>{movie.title}</h1>
                <div className="movie-meta">{new Date(movie.releaseDate).getFullYear()} · {Math.floor(movie.duration / 60)}h {movie.duration % 60}min</div>
                <p className="movie-desc">{movie.description}</p>
                <div className="movie-ratings">
                  <div className="rating-box">
                    <span className="r-label">IMDb</span>
                    <span className="r-val">{movie.rating}/10</span>
                  </div>
                  <div className="rating-box">
                    <span className="r-label">Duration</span>
                    <span className="r-val">{movie.duration}m</span>
                  </div>
                  {selectedShow && (
                    <div className="rating-box">
                      <span className="r-label">Cinema</span>
                      <span className="r-val">{selectedShow.cinemaId?.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Time Selector */}
            <div className="time-selector-block">
              <div className="section-label">
                <Clock size={16} /> Select Showtime
              </div>
              <div className="times-row">
                {times.length === 0 ? (
                  <div style={{color: '#8b95a5', fontSize: '0.9rem'}}>No shows available for this date</div>
                ) : (
                  times.map((time) => (
                    <button 
                      key={time} 
                      className={`time-pill ${selectedTime === time ? 'active' : ''}`}
                      onClick={() => { setSelectedTime(time); setSelectedSeats([]); }}
                    >
                      {time.split(' ')[0]} <span>{time.split(' ')[1]}</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Selected Tickets */}
            <div className="tickets-block">
              <div className="section-label">
                <Ticket size={16} /> Selected Tickets
              </div>
              
              <div className="tickets-grid">
                {selectedSeats.length === 0 ? (
                  <div className="empty-tickets">No seats selected</div>
                ) : (
                  selectedSeats.map(seat => (
                    <div key={seat.id} className="ticket-card">
                      <div className="t-seat">
                        <strong>{seat.row}</strong> row <strong>{seat.num.toString().padStart(2, '0')}</strong> seat
                      </div>
                      <div className="t-price">Rs. {seat.price}</div>
                      <button className="t-remove" onClick={() => removeSeat(seat.id)}>
                        <X size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="booking-footer">
                <div className="total-display">
                  Total - <span>Rs. {totalPrice}</span>
                </div>
                <button 
                  className="buy-action-btn" 
                  disabled={selectedSeats.length === 0}
                  onClick={handleBuy}
                >
                  Buy
                </button>
              </div>
            </div>

          </div>

          {/* Right Panel (Seat Map) */}
          <div className="zootopia-right-panel">
            <div className="screen-wrapper">
              <div className="screen-curve"></div>
              <div className="screen-text">S C R E E N</div>
            </div>

            {!selectedShow ? (
              <div style={{textAlign: 'center', color: '#8b95a5', padding: '3rem 1rem'}}>
                Select a date and time to view seats
              </div>
            ) : (
              <div className="seat-grid-container">
                {rows.map(row => (
                  <div key={row} className="grid-row">
                    <span className="r-indicator">{row}</span>
                    <div className="grid-seats">
                      {[...Array(16)].map((_, i) => {
                        const num = i + 1;
                        const seatId = `${row}${num}`;
                        const isBooked = bookedSeatIds.includes(seatId);
                        const isSelected = selectedSeats.some(s => s.id === seatId);
                        
                        let sClass = 's-btn';
                        if (isBooked) sClass += ' booked';
                        else if (isSelected) sClass += ' selected';
                        else sClass += ' available';

                        return (
                          <button 
                            key={num} 
                            className={sClass}
                            onClick={() => handleSeatClick(row, num)}
                            disabled={isBooked}
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>
                    <span className="r-indicator">{row}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="seat-legend-block">
              <div className="l-item">
                <div className="l-box selected"></div>
                <span>Selected</span>
              </div>
              <div className="l-item">
                <div className="l-box available"></div>
                <span>Available</span>
              </div>
              <div className="l-item">
                <div className="l-box booked"></div>
                <span>Booked</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BookingPage;
