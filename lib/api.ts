/**
 * API Service Layer - Full Backend Integration with Type Mapping
 * Connects frontend models to backend schema while maintaining compatibility
 */

import { Trip } from '@/types/trips';
import { PackingItem } from '@/types/packing';
import { Activity } from '@/types/activities';
import { Budget } from '@/types/budgets';

const API_BASE = 'http://localhost:5000/api';

// Helper for authenticated requests
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('traveloop_token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API Request failed');
  }
  
  return response.json();
}

// ─── MAPPERS ───
// These ensure the frontend receives the property names it expects

const mapTrip = (t: any): Trip => ({
  ...t,
  name: t.title, // Backend uses 'title' as requested
  budget: t.budgets ? mapBudgetListToObj(t.budgets) : undefined
});

const mapActivity = (a: any): Activity => ({
  ...a,
  name: a.title, // Backend uses 'title' as requested
  cost: a.price  // Backend uses 'price' as requested
});

const mapPackingItem = (p: any): PackingItem => ({
  ...p,
  is_checked: p.completed // Backend uses 'completed' as requested
});

const mapBudgetListToObj = (list: any[]): Budget => {
  const obj: any = {
    id: list[0]?.id || '',
    trip_id: list[0]?.trip_id || '',
    transport_budget: 0,
    hotel_budget: 0,
    food_budget: 0,
    activity_budget: 0,
    misc_budget: 0,
    actual_spent: 0,
    currency: 'USD'
  };
  
  list.forEach(item => {
    if (item.category === 'transport') obj.transport_budget = item.amount;
    if (item.category === 'hotel' || item.category === 'accommodation') obj.hotel_budget = item.amount;
    if (item.category === 'food') obj.food_budget = item.amount;
    if (item.category === 'activity') obj.activity_budget = item.amount;
    if (item.category === 'misc') obj.misc_budget = item.amount;
    obj.actual_spent += item.spent_amount;
  });
  
  return obj;
};

export const api = {
  auth: {
    async login(email: string, password: string) {
      const data = await fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (data.token) localStorage.setItem('traveloop_token', data.token);
      return data;
    },

    async signup(name: string, email: string, password: string) {
      const data = await fetchWithAuth('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      if (data.token) localStorage.setItem('traveloop_token', data.token);
      return data;
    },

    async logout() {
      localStorage.removeItem('traveloop_token');
      return { success: true };
    },

    async getProfile() {
      return fetchWithAuth('/auth/profile');
    },

    async getSession() {
      try {
        const user = await fetchWithAuth('/auth/profile');
        return { user };
      } catch (e) {
        return { user: null };
      }
    }
  },

  // ─── TRIPS ───
  trips: {
    async getAll(): Promise<Trip[]> {
      const trips = await fetchWithAuth('/trips');
      return trips.map(mapTrip);
    },

    async getById(id: string): Promise<Trip> {
      const trip = await fetchWithAuth(`/trips/${id}`);
      return mapTrip(trip);
    },

    async create(data: Partial<Trip>): Promise<Trip> {
      const backendData = { ...data, title: data.name };
      const trip = await fetchWithAuth('/trips', {
        method: 'POST',
        body: JSON.stringify(backendData),
      });
      return mapTrip(trip);
    },

    async update(id: string, data: Partial<Trip>): Promise<Trip> {
      const backendData = { ...data, title: data.name };
      const trip = await fetchWithAuth(`/trips/${id}`, {
        method: 'PUT',
        body: JSON.stringify(backendData),
      });
      return mapTrip(trip);
    },

    async delete(id: string): Promise<void> {
      await fetchWithAuth(`/trips/${id}`, { method: 'DELETE' });
    }
  },

  // ─── CITIES ───
  cities: {
    async getAll(region?: string, search?: string) {
      let url = '/cities';
      const params = new URLSearchParams();
      if (region) params.append('region', region);
      if (search) params.append('search', search);
      if (params.toString()) url += `?${params.toString()}`;
      return fetchWithAuth(url);
    },

    async getById(id: string) {
      return fetchWithAuth(`/cities/${id}`);
    }
  },

  // ─── ACTIVITIES ───
  activities: {
    async getAll(city_id?: string, category?: string, search?: string) {
      let url = '/activities';
      const params = new URLSearchParams();
      if (city_id) params.append('city_id', city_id);
      if (category) params.append('category', category);
      if (search) params.append('search', search);
      if (params.toString()) url += `?${params.toString()}`;
      const list = await fetchWithAuth(url);
      return list.map(mapActivity);
    }
  },

  // ─── PACKING ───
  packing: {
    async getByTrip(tripId: string): Promise<PackingItem[]> {
      const list = await fetchWithAuth(`/packing?trip_id=${tripId}`);
      return list.map(mapPackingItem);
    },

    async addItem(tripId: string, category: string, itemName: string): Promise<PackingItem> {
      const item = await fetchWithAuth('/packing', {
        method: 'POST',
        body: JSON.stringify({ trip_id: tripId, category, item_name: itemName }),
      });
      return mapPackingItem(item);
    },

    async toggleItem(itemId: string, completed: boolean): Promise<any> {
      const item = await fetchWithAuth(`/packing/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify({ completed }),
      });
      return mapPackingItem(item);
    },

    async deleteItem(itemId: string): Promise<void> {
      await fetchWithAuth(`/packing/${itemId}`, { method: 'DELETE' });
    },
  },

  // ─── BUDGET ───
  budget: {
    async getByTrip(tripId: string): Promise<Budget> {
      const list = await fetchWithAuth(`/budgets?trip_id=${tripId}`);
      return mapBudgetListToObj(list);
    },

    async update(tripId: string, category: string, amount: number, spent_amount: number) {
      const item = await fetchWithAuth('/budgets', {
        method: 'POST',
        body: JSON.stringify({ trip_id: tripId, category, amount, spent_amount }),
      });
      return item;
    }
  },

  // ─── SHARING ───
  share: {
    async generateLink(tripId: string) {
      return fetchWithAuth('/share', {
        method: 'POST',
        body: JSON.stringify({ trip_id: tripId }),
      });
    },

    async getBySlug(slug: string) {
      const trip = await fetchWithAuth(`/share/${slug}`);
      return mapTrip(trip);
    }
  },

  // ─── DASHBOARD ───
  dashboard: {
    async getStats() {
      return fetchWithAuth('/dashboard/stats');
    }
  }
};
