import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  director: { type: String, required: true },
  cast: [{ type: String }],
  genre: [{ type: String }],
  duration: { type: Number, required: true },
  releaseDate: { type: Date },
  poster: { type: String },
  backdrop: { type: String },
  banner: { type: String },
  rating: { type: Number, default: 0 },
  status: { type: String, enum: ['now_showing', 'coming_soon'], default: 'now_showing' },
}, {
  timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
