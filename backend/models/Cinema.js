import mongoose from 'mongoose';

const cinemaSchema = mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String },
  amenities: [{ type: String }]
}, { timestamps: true });

const Cinema = mongoose.model('Cinema', cinemaSchema);
export default Cinema;
