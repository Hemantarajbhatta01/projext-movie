import API from './axios';

export const loginUser = async (data) => {
  return API.post('/auth/login', data);
};

export const registerUser = async (data) => {
  return API.post('/auth/register', data);
};

export const getProfile = async () => {
  return API.get('/auth/profile');
};

export const updateProfile = async (data) => {
  // return API.put('/auth/profile', data);
  // Add backend route if needed, for now throw not implemented
  throw new Error('Not implemented on backend yet');
};

export const toggleWishlist = async (movieId) => {
  // return API.post(`/auth/wishlist/${movieId}`);
  throw new Error('Not implemented on backend yet');
};

export const getUsers = async () => {
  // return API.get('/users');
  throw new Error('Not implemented on backend yet');
};

export const deleteUser = async (id) => {
  // return API.delete(`/users/${id}`);
  throw new Error('Not implemented on backend yet');
};
