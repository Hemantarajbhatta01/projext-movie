import express from 'express';
import { createBooking, getMyBookings, getAllBookings } from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, admin, getAllBookings);

router.get('/mybookings', protect, getMyBookings);

export default router;
