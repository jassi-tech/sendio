'use client';
import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authApi, setToken as persistToken, clearToken } from './api';
import type { User, AuthCtx } from './interface';

const Ctx = createContext<AuthCtx>({ user: null, loading: true, login: async () => {}, logout: () => {}, fetchUser: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const u = await authApi.me();
      setUser(u);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    // Sync across tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'mf_token') {
        if (e.newValue) fetchUser();
        else setUser(null);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = async (token: string) => {
    setLoading(true);
    persistToken(token);
    await fetchUser();
  };

  const logout = () => {
    clearToken();
    setUser(null);
    router.push('/auth');
  };

  return <Ctx.Provider value={{ user, loading, login, logout, fetchUser }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);

export function saveToken(token: string) { persistToken(token); }
