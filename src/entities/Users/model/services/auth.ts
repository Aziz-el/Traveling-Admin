import instance from '../../../../shared/lib/axios/axios';

export interface LoginResult {
  ok: boolean;
  token?: string;
  error?: string;
}

export async function login(payload: { username: string; password: string }): Promise<LoginResult> {
  try {
    const params = new URLSearchParams();
    params.append('username', payload.username.trim());
    params.append('password', payload.password);

    const res = await instance.post('/auth/login/', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const token = res?.data?.token || res?.data?.access || res?.data?.access_token;
    const refreshToken = res?.data?.refresh || res?.data?.refresh_token;
    if (token) {
      try { localStorage.setItem('token', token); } catch (e) {}
      if (refreshToken) {
        try { localStorage.setItem('refreshToken', refreshToken); } catch (e) {}
      }
      return { ok: true, token };
    }

    return { ok: false, error: 'Не удалось получить токен' };
  } catch (e: any) {
    const msg = e?.response?.data?.detail || e?.response?.data?.message || 'Ошибка входа';
    return { ok: false, error: String(msg) };
  }
}

export function logout() {
  try { localStorage.removeItem('token'); localStorage.removeItem('refreshToken'); } catch (e) {}
}

export async function checkAuth() {
  try {
    const res = await instance.get('/auth/check-auth/');
    return res.data;
  } catch (e) {
    return null;
  }
}

export default { login, logout, checkAuth };