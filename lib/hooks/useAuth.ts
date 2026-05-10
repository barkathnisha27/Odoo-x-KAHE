'use client';
import { useState, useEffect, useCallback } from 'react';
import { mockUser } from '@/data/user';
import { User } from '@/types/users';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate auth check
    const timer = setTimeout(() => {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('traveloop_user') : null;
      if (stored) {
        setUser(JSON.parse(stored));
        setIsAuthenticated(true);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const u = { ...mockUser, email };
    localStorage.setItem('traveloop_user', JSON.stringify(u));
    setUser(u);
    setIsAuthenticated(true);
    setLoading(false);
    return u;
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const u = { ...mockUser, name, email };
    localStorage.setItem('traveloop_user', JSON.stringify(u));
    setUser(u);
    setIsAuthenticated(true);
    setLoading(false);
    return u;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('traveloop_user');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return { user, loading, isAuthenticated, login, signup, logout };
}
