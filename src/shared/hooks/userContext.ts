import React from 'react';

export interface User {
  email: string;
  full_name?: string;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  saveUser: (user: User) => void;
  clearUser: () => void;
}

const UserContext = React.createContext<UserContextType | null>(null);

export function UserProvider(props: { children: React.ReactNode }) {
  const { useState, useEffect } = React;
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const saveUser = (u: User) => {
    setUser(u);
    try { localStorage.setItem('user', JSON.stringify(u)); } catch {}
  };

  const clearUser = () => {
    setUser(null);
    try { localStorage.removeItem('user'); } catch {}
    try { localStorage.removeItem('token'); } catch {}
  };

  return React.createElement(UserContext.Provider, { value: { user, saveUser, clearUser } }, props.children);
}

export function useUser() {
  const ctx = React.useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
