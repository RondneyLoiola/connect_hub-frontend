import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3333';

export const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const userDataString = localStorage.getItem('connecthub:userData');
  if (userDataString) {
    try {
      const userData = JSON.parse(userDataString);
      const token = userData?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Invalid user data in localStorage', error);
    }
  }
  return config;
});