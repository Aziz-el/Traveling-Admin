import axios from 'axios';

const baseURL =  'https://genbiadmin1.vercel.app/api/v1';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers || {} as any;
        (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
}));

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err && err?.response?.status === 401)
      localStorage.removeItem('token');
    return Promise.reject(err);
  }
);

export default instance;