import mongoose from 'mongoose';

const showSchema = mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
  screenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  price: {
    standard: { type: Number, default: 350 },
    premium: { type: Number, default: 500 },
    vip: { type: Number, default: 800 }
  },
  bookedSeats: [{ type: String }] // e.g. ["A1","B3"]
}, { timestamps: true });

const Show = mongoose.model('Show', showSchema);
export default Show;
