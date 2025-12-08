import axios from 'axios';

const baseURL = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV
  ? '/api/v1'
  : 'https://genbiadmin1.vercel.app/api/v1';

const isnatance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

isnatance.interceptors.request.use((config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}));

isnatance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err && err?.response?.status === 401)
      localStorage.removeItem('token');
    return Promise.reject(err);
  }
);

export default isnatance;