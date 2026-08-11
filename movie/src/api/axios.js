import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('cinematix_user');
  if (userInfo) {
    try {
      const { token } = JSON.parse(userInfo);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (e) {
      // Invalid JSON in localStorage, clear it
      localStorage.removeItem('cinematix_user');
    }
  }
  return config;
});

// Handle 401 globally (but don't redirect if we're already on login or checking profile)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isProfileCheck = error.config?.url?.includes('/auth/profile');
      const isLoginOrRegister = error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/register');
      
      if (!isProfileCheck && !isLoginOrRegister) {
        localStorage.removeItem('cinematix_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
