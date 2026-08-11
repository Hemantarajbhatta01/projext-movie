import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  movieId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Movie' },
  bookingId: { type: String, required: true, unique: true },
  showDate: { type: Date, required: true },
  showTime: { type: String, required: true },
  seats: [{ type: String, required: true }], // e.g. "A1", "B2"
  totalAmount: { type: Number, required: true },
  bookingStatus: { type: String, enum: ['confirmed', 'cancelled', 'pending'], default: 'pending' },
  paymentId: { type: String },
  extras: [{
    id: { type: String },
    name: { type: String },
    quantity: { type: Number },
    price: { type: Number }
  }]
}, {
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
