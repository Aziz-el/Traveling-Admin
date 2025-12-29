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

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  config: any;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (token) prom.config.headers = prom.config.headers || {};
      if (token) prom.config.headers.Authorization = `Bearer ${token}`;
      prom.resolve(instance(prom.config));
    }
  });
  failedQueue = [];
};

instance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err?.config;

    if (err?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        try { localStorage.removeItem('token'); } catch(e) {}
        return Promise.reject(err);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        const refreshRes = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh/`, { refresh: refreshToken });
        const newToken = refreshRes?.data?.token || refreshRes?.data?.access || refreshRes?.data?.access_token;
        const newRefresh = refreshRes?.data?.refresh || refreshRes?.data?.refresh_token;

        if (newToken) {
          try { localStorage.setItem('token', newToken); } catch (e) {}
        }
        if (newRefresh) {
          try { localStorage.setItem('refreshToken', newRefresh); } catch (e) {}
        }

        isRefreshing = false;
        processQueue(null, newToken || null);

        if (newToken) {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return instance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);
        try { localStorage.removeItem('token'); localStorage.removeItem('refreshToken'); } catch(e) {}
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default instance;