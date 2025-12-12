import axios from 'axios';

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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