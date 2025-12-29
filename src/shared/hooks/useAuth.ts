import { useCallback, useEffect, useState } from 'react';
import { UserItem } from '../../entities/Users/model/types';
import { getCurrentUser } from '../../entities/Users/model/services/user';

import { login as authLogin, logout as authLogout } from '../../entities/Users/model/services/auth';

export function useAuth() {
  const [user, setUser] = useState<UserItem | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const me = await getCurrentUser();
      setUser(me);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    try {
      const res = await authLogin({ username, password });
      if (res.ok) {
        await refresh();
        return { ok: true };
      }
      return { ok: false, error: res.error };
    } catch (e) {
      return { ok: false, error: 'Ошибка входа' };
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
    try { window.location.reload(); } catch (e) {}
  }, []);

  return {
    user,
    loading,
    refresh,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole: (role: string) => !!user && user.role === role,
  };
}

export async function checkAuth(): Promise<UserItem | null> {
  try {
    const me = await getCurrentUser();
    return me;
  } catch (e) {
    return null;
  }
}
