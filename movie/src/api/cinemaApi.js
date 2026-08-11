import API from './axios';

// ─── Cinemas ───
export const getCinemas = async () => API.get('/cinemas');
export const getCinemaById = async (id) => API.get(`/cinemas/${id}`);
export const createCinema = async (data) => API.post('/cinemas', data);
export const updateCinema = async (id, data) => API.put(`/cinemas/${id}`, data);
export const deleteCinema = async (id) => API.delete(`/cinemas/${id}`);

// ─── Screens ───
export const getScreensByCinema = async (cinemaId) => API.get(`/cinemas/${cinemaId}/screens`);
export const createScreen = async (data) => API.post('/screens', data);
export const deleteScreen = async (id) => API.delete(`/screens/${id}`);

// ─── Shows ───
export const getShows = async (params) => {
  const query = params?.movieId ? `?movieId=${params.movieId}` : '';
  return API.get(`/shows${query}`);
};
export const getAllShows = async () => API.get('/shows/all');
export const getShowById = async (id) => API.get(`/shows/${id}`);
export const getShowSeats = async (id) => API.get(`/shows/${id}/seats`);
export const createShow = async (data) => API.post('/shows', data);
export const updateShow = async (id, data) => API.put(`/shows/${id}`, data);
export const deleteShow = async (id) => API.delete(`/shows/${id}`);
