import API from './axios';

export const createBooking = async (data) => {
  return API.post('/bookings', data);
};

export const getBookingHistory = async () => {
  return API.get('/bookings/mybookings');
};

export const getBookingById = async (id) => {
  return API.get(`/bookings/${id}`);
};

export const cancelBooking = async (id) => {
  return API.delete(`/bookings/${id}`);
};

export const getAllBookings = async (params) => {
  return API.get('/bookings');
};

export const getStats = async () => {
  return API.get('/stats'); // Add admin stats route if needed
};

export const initiatePayment = async (data) => {
  // return API.post('/payment/initiate', data);
  return new Promise(resolve => setTimeout(() => resolve({ data: { paymentRef: 'MOCK_REF_123' } }), 600));
};

export const verifyPayment = async (data) => {
  // return API.post('/payment/verify', data);
  return new Promise(resolve => setTimeout(() => resolve({ data: { paymentId: 'MOCK_PAY_123' } }), 600));
};
