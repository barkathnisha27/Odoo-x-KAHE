'use client';
import { useState, useEffect, useCallback } from 'react';
import { Trip, TripStatus } from '@/types/trips';
import { api } from '@/lib/api';

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TripStatus | 'all'>('all');

  const loadTrips = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.trips.getAll();
      setTrips(data);
    } catch (err) {
      setError((err as Error)?.message || 'Unable to load trips');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  const filteredTrips = filter === 'all' ? trips : trips.filter(t => t.status === filter);

  const addTrip = useCallback((trip: Trip) => {
    setTrips(prev => [trip, ...prev]);
  }, []);

  const updateTrip = useCallback((id: string, data: Partial<Trip>) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
  }, []);

  const deleteTrip = useCallback((id: string) => {
    setTrips(prev => prev.filter(t => t.id !== id));
  }, []);

  const duplicateTrip = useCallback((id: string) => {
    const original = trips.find(t => t.id === id);
    if (original) {
      const copy: Trip = {
        ...original,
        id: `${Date.now()}`,
        name: `${original.name} (Copy)`,
        status: 'draft',
        share_token: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setTrips(prev => [copy, ...prev]);
    }
  }, [trips]);

  return { trips: filteredTrips, allTrips: trips, loading, error, filter, setFilter, addTrip, updateTrip, deleteTrip, duplicateTrip, refresh: loadTrips };
}
