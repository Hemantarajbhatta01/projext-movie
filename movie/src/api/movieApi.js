import API from './axios';

export const getMovies = async (params) => {
  const query = params?.limit ? `?limit=${params.limit}` : '';
  return API.get(`/movies${query}`);
};

export const getMovieById = async (id) => {
  return API.get(`/movies/${id}`);
};

export const createMovie = async (data) => {
  return API.post('/movies', data);
};

export const updateMovie = async (id, data) => {
  return API.put(`/movies/${id}`, data);
};

export const deleteMovie = async (id) => {
  return API.delete(`/movies/${id}`);
};

export const uploadPoster = async (formData) => {
  return API.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
