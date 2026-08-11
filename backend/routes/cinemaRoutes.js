import express from 'express';
import {
  getCinemas, getCinemaById, createCinema, updateCinema, deleteCinema,
  getScreensByCinema, createScreen, deleteScreen,
  getShows, getAllShows, getShowById, getShowSeats,
  createShow, updateShow, deleteShow
} from '../controllers/cinemaController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Cinemas
router.route('/cinemas')
  .get(getCinemas)
  .post(protect, admin, createCinema);

router.route('/cinemas/:id')
  .get(getCinemaById)
  .put(protect, admin, updateCinema)
  .delete(protect, admin, deleteCinema);

// Screens
router.get('/cinemas/:cinemaId/screens', getScreensByCinema);
router.post('/screens', protect, admin, createScreen);
router.delete('/screens/:id', protect, admin, deleteScreen);

// Shows
router.get('/shows', getShows);
router.get('/shows/all', getAllShows);
router.get('/shows/:id', getShowById);
router.get('/shows/:id/seats', getShowSeats);
router.post('/shows', protect, admin, createShow);
router.put('/shows/:id', protect, admin, updateShow);
router.delete('/shows/:id', protect, admin, deleteShow);

export default router;
