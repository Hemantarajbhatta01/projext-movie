import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import cinemaRoutes from './routes/cinemaRoutes.js';

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json({limit: '50mb'})); app.use(express.urlencoded({limit: '50mb', extended: true}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', cinemaRoutes); // /api/cinemas, /api/shows, /api/screens

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => { console.error('GLOBAL ERROR:', err); res.status(err.status || 500).json({ message: err.message, stack: err.stack }); });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
