'use client';
import { useState, useCallback, useEffect } from 'react';
import { TripStop } from '@/types/trips';
import { cities } from '@/data/cities';

export function useItinerary(initialStops: TripStop[] = []) {
  const [stops, setStops] = useState<TripStop[]>(initialStops);

  const addStop = useCallback((cityId: string, arrivalDate: string, departureDate: string, transportMode: string = 'flight') => {
    const newStop: TripStop = {
      id: `stop-${Date.now()}`,
      trip_id: '',
      city_id: cityId,
      city: cities.find(c => c.id === cityId),
      order_index: stops.length,
      arrival_date: arrivalDate,
      departure_date: departureDate,
      transport_mode: transportMode as TripStop['transport_mode'],
      notes: '',
    };
    setStops(prev => [...prev, newStop]);
  }, [stops.length]);

  const removeStop = useCallback((stopId: string) => {
    setStops(prev => prev.filter(s => s.id !== stopId).map((s, i) => ({ ...s, order_index: i })));
  }, []);

  const reorderStops = useCallback((fromIndex: number, toIndex: number) => {
    setStops(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result.map((s, i) => ({ ...s, order_index: i }));
    });
  }, []);

  const updateStop = useCallback((stopId: string, data: Partial<TripStop>) => {
    setStops(prev => prev.map(s => s.id === stopId ? { ...s, ...data } : s));
  }, []);

  return { stops, addStop, removeStop, reorderStops, updateStop, setStops };
}
