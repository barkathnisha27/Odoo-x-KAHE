'use client';
import { useEffect, useState, useCallback } from 'react';
import { Activity } from '@/types/activities';
import { api } from '@/lib/api';

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.activities.getAll();
      setActivities(data);
    } catch (err) {
      setError((err as Error)?.message || 'Unable to load activities');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return { activities, loading, error, refresh: loadActivities };
}
