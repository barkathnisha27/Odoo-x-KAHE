'use client';
import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { mockUser } from '@/data/user';
import { User } from '@/types/users';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('traveloop_user') : null;
    if (stored) {
      setUser(JSON.parse(stored));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.auth.login(email, password);
      const u = { ...response.user, email };
      localStorage.setItem('traveloop_user', JSON.stringify(u));
      setUser(u);
      setIsAuthenticated(true);
      return u;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.auth.signup(name, email, password);
      const u = { ...response.user, name, email };
      localStorage.setItem('traveloop_user', JSON.stringify(u));
      setUser(u);
      setIsAuthenticated(true);
      return u;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await api.auth.logout();
    localStorage.removeItem('traveloop_user');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return { user, loading, isAuthenticated, login, signup, logout };
}
