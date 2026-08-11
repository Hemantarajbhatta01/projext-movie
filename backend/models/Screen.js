import mongoose from 'mongoose';

const screenSchema = mongoose.Schema({
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
  screenName: { type: String, required: true },
  screenType: { type: String, enum: ['Standard', '3D', 'IMAX', 'Dolby'], default: 'Standard' },
  rows: { type: Number, default: 7 },
  columns: { type: Number, default: 16 }
}, { timestamps: true });

const Screen = mongoose.model('Screen', screenSchema);
export default Screen;
