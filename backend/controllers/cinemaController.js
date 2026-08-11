import Cinema from '../models/Cinema.js';
import Screen from '../models/Screen.js';
import Show from '../models/Show.js';

// ─── Cinemas ───
export const getCinemas = async (req, res) => {
  const cinemas = await Cinema.find({});
  res.json(cinemas);
};

export const getCinemaById = async (req, res) => {
  const cinema = await Cinema.findById(req.params.id);
  if (cinema) res.json(cinema);
  else res.status(404).json({ message: 'Cinema not found' });
};

export const createCinema = async (req, res) => {
  const cinema = await Cinema.create(req.body);
  res.status(201).json(cinema);
};

export const updateCinema = async (req, res) => {
  const cinema = await Cinema.findById(req.params.id);
  if (cinema) {
    Object.assign(cinema, req.body);
    const updated = await cinema.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Cinema not found' });
  }
};

export const deleteCinema = async (req, res) => {
  const cinema = await Cinema.findById(req.params.id);
  if (cinema) {
    await Cinema.deleteOne({ _id: cinema._id });
    res.json({ message: 'Cinema removed' });
  } else {
    res.status(404).json({ message: 'Cinema not found' });
  }
};

// ─── Screens ───
export const getScreensByCinema = async (req, res) => {
  const screens = await Screen.find({ cinemaId: req.params.cinemaId });
  res.json(screens);
};

export const createScreen = async (req, res) => {
  const screen = await Screen.create(req.body);
  res.status(201).json(screen);
};

export const deleteScreen = async (req, res) => {
  await Screen.deleteOne({ _id: req.params.id });
  res.json({ message: 'Screen removed' });
};

// ─── Shows ───
export const getShows = async (req, res) => {
  const filter = {};
  if (req.query.movieId) filter.movieId = req.query.movieId;
  const shows = await Show.find(filter)
    .populate('movieId', 'title poster backdrop')
    .populate('cinemaId', 'name location city')
    .populate('screenId', 'screenName screenType rows columns');
  res.json(shows);
};

export const getAllShows = async (req, res) => {
  const shows = await Show.find({})
    .populate('movieId', 'title poster')
    .populate('cinemaId', 'name location city')
    .populate('screenId', 'screenName screenType');
  res.json(shows);
};

export const getShowById = async (req, res) => {
  const show = await Show.findById(req.params.id)
    .populate('movieId', 'title poster backdrop duration genre rating description releaseDate director')
    .populate('cinemaId', 'name location city')
    .populate('screenId', 'screenName screenType rows columns');
  if (show) res.json(show);
  else res.status(404).json({ message: 'Show not found' });
};

export const getShowSeats = async (req, res) => {
  const show = await Show.findById(req.params.id)
    .populate('screenId', 'rows columns');
  if (!show) return res.status(404).json({ message: 'Show not found' });

  const rows = show.screenId?.rows || 7;
  const cols = show.screenId?.columns || 16;
  const rowNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, rows);

  const seats = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 1; c <= cols; c++) {
      const row = rowNames[r];
      let type = 'standard';
      let price = show.price.standard;
      if (r < 2) { type = 'vip'; price = show.price.vip; }
      else if (r < 4) { type = 'premium'; price = show.price.premium; }

      seats.push({
        row, number: c, type, price,
        isBooked: show.bookedSeats.includes(`${row}${c}`)
      });
    }
  }

  res.json({
    seats,
    show: { time: show.time, date: show.date, price: show.price }
  });
};

export const createShow = async (req, res) => {
  const { movieId, cinemaId, screenId, date, time, priceStandard, pricePremium, priceVip } = req.body;
  const show = await Show.create({
    movieId, cinemaId, screenId, date, time,
    price: {
      standard: Number(priceStandard) || 350,
      premium: Number(pricePremium) || 500,
      vip: Number(priceVip) || 800
    }
  });
  // Return populated
  const populated = await Show.findById(show._id)
    .populate('movieId', 'title poster')
    .populate('cinemaId', 'name location city')
    .populate('screenId', 'screenName screenType');
  res.status(201).json(populated);
};

export const updateShow = async (req, res) => {
  const show = await Show.findById(req.params.id);
  if (!show) return res.status(404).json({ message: 'Show not found' });

  const { movieId, cinemaId, screenId, date, time, priceStandard, pricePremium, priceVip } = req.body;
  show.movieId = movieId || show.movieId;
  show.cinemaId = cinemaId || show.cinemaId;
  show.screenId = screenId || show.screenId;
  show.date = date || show.date;
  show.time = time || show.time;
  if (priceStandard) show.price.standard = Number(priceStandard);
  if (pricePremium) show.price.premium = Number(pricePremium);
  if (priceVip) show.price.vip = Number(priceVip);

  await show.save();
  const populated = await Show.findById(show._id)
    .populate('movieId', 'title poster')
    .populate('cinemaId', 'name location city')
    .populate('screenId', 'screenName screenType');
  res.json(populated);
};

export const deleteShow = async (req, res) => {
  await Show.deleteOne({ _id: req.params.id });
  res.json({ message: 'Show removed' });
};
