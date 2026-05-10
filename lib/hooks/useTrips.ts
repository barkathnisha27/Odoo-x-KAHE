'use client';
import { useState, useEffect, useCallback } from 'react';
import { Trip, TripStatus } from '@/types/trips';
import { mockTrips } from '@/data/trips';

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TripStatus | 'all'>('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrips(mockTrips);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

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
      };
      setTrips(prev => [copy, ...prev]);
    }
  }, [trips]);

  return { trips: filteredTrips, allTrips: trips, loading, filter, setFilter, addTrip, updateTrip, deleteTrip, duplicateTrip };
}
