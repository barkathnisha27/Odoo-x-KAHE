'use client';
import { useEffect, useState, useCallback } from 'react';
import { City } from '@/types/cities';
import { api } from '@/lib/api';

export function useCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.cities.getAll();
      setCities(data);
    } catch (err) {
      setError((err as Error)?.message || 'Unable to load cities');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCities();
  }, [loadCities]);

  return { cities, loading, error, refresh: loadCities };
}
