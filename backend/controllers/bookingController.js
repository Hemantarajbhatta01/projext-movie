import Booking from '../models/Booking.js';
import Show from '../models/Show.js';

// @desc    Create new booking
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  const { movieId, showId, showDate, showTime, seats, totalAmount, extras, paymentId } = req.body;

  if (!seats || seats.length === 0) {
    return res.status(400).json({ message: 'No seats selected' });
  }

  // Convert seats to string array for the booking
  const seatLabels = seats.map(s => typeof s === 'string' ? s : `${s.row}${s.number}`);

  const booking = new Booking({
    user: req.user._id,
    movieId,
    bookingId: 'BKG-' + Date.now(),
    showDate: showDate || new Date(),
    showTime: showTime || '12:00 PM',
    seats: seatLabels,
    totalAmount: totalAmount || 0,
    extras,
    paymentId,
    bookingStatus: 'confirmed'
  });

  const createdBooking = await booking.save();

  // Mark seats as booked on the show
  if (showId) {
    await Show.findByIdAndUpdate(showId, {
      $push: { bookedSeats: { $each: seatLabels } }
    });
  }

  // Return populated booking
  const populated = await Booking.findById(createdBooking._id)
    .populate('movieId', 'title poster');

  res.status(201).json(populated);
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('movieId', 'title poster')
    .sort({ createdAt: -1 });
  res.json(bookings);
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find({})
    .populate('user', 'name email')
    .populate('movieId', 'title')
    .sort({ createdAt: -1 });
  res.json({ bookings, total: bookings.length });
};
