import Movie from '../models/Movie.js';

// @desc    Get all movies
// @route   GET /api/movies
export const getMovies = async (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 0;
    const movies = await Movie.find({}).limit(limit);
    res.json({ movies, total: movies.length, page: 1, pages: 1 });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// @desc    Create a movie
// @route   POST /api/movies
export const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a movie
// @route   PUT /api/movies/:id
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      Object.assign(movie, req.body);
      const updatedMovie = await movie.save();
      res.json(updatedMovie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) { res.status(400).json({ message: error.message }); }
};

// @desc    Delete a movie
// @route   DELETE /api/movies/:id
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      await Movie.deleteOne({ _id: movie._id });
      res.json({ message: 'Movie removed' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) { res.status(500).json({ message: error.message }); }
};
