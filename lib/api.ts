/**
 * API Service Layer - All fetch abstractions
 * Replace mock implementations with real API calls when backend is ready
 */

import { mockTrips, mockPackingItems, mockNotes, getTripById } from '@/data/trips';
import { cities, getCityById } from '@/data/cities';
import { activities, getActivitiesByCity, getActivitiesByCategory } from '@/data/activities';
import { mockUser, mockUsers } from '@/data/user';
import { Trip } from '@/types/trips';
import { PackingItem } from '@/types/packing';
import { Note } from '@/types/notes';
import { generateId, generateShareToken } from '@/lib/utils';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

// Simulate network delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// ─── AUTH ───
export const api = {
  auth: {
    async login(email: string, password: string) {
      await delay(500);
      if (email && password) {
        return { user: mockUser, token: 'mock-jwt-token' };
      }
      throw new Error('Invalid credentials');
    },

    async signup(name: string, email: string, password: string) {
      await delay(500);
      return { user: { ...mockUser, name, email }, token: 'mock-jwt-token' };
    },

    async logout() {
      await delay(200);
      return { success: true };
    },

    async getSession() {
      await delay(200);
      return { user: mockUser };
    },

    async forgotPassword(email: string) {
      await delay(500);
      return { success: true, message: `Reset link sent to ${email}` };
    },
  },

  // ─── TRIPS ───
  trips: {
    async getAll(): Promise<Trip[]> {
      await delay();
      return mockTrips;
    },

    async getById(id: string): Promise<Trip | undefined> {
      await delay();
      return getTripById(id);
    },

    async create(data: Partial<Trip>): Promise<Trip> {
      await delay(500);
      const newTrip: Trip = {
        id: generateId(),
        user_id: mockUser.id,
        name: data.name || 'New Trip',
        description: data.description || '',
        cover_image: data.cover_image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
        start_date: data.start_date || new Date().toISOString().split('T')[0],
        end_date: data.end_date || new Date().toISOString().split('T')[0],
        traveler_count: data.traveler_count || 1,
        status: 'draft',
        trip_type: data.trip_type || 'solo',
        share_token: null,
        is_public: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        stops: [],
        budget: {
          id: generateId(),
          trip_id: '',
          transport_budget: 0,
          hotel_budget: 0,
          food_budget: 0,
          activity_budget: 0,
          misc_budget: 0,
          actual_spent: 0,
          currency: 'USD',
        },
      };
      return newTrip;
    },

    async update(id: string, data: Partial<Trip>): Promise<Trip> {
      await delay(300);
      const existing = getTripById(id);
      if (!existing) throw new Error('Trip not found');
      return { ...existing, ...data, updated_at: new Date().toISOString() };
    },

    async delete(id: string): Promise<void> {
      await delay(300);
    },

    async share(id: string): Promise<string> {
      await delay(300);
      return generateShareToken();
    },

    async duplicate(id: string): Promise<Trip> {
      await delay(500);
      const existing = getTripById(id);
      if (!existing) throw new Error('Trip not found');
      return {
        ...existing,
        id: generateId(),
        name: `${existing.name} (Copy)`,
        status: 'draft',
        share_token: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    },
  },

  // ─── CITIES ───
  cities: {
    async getAll() {
      await delay();
      return cities;
    },

    async getById(id: string) {
      await delay();
      return getCityById(id);
    },

    async search(query: string) {
      await delay(200);
      const q = query.toLowerCase();
      return cities.filter(
        c => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
      );
    },

    async getByRegion(region: string) {
      await delay();
      return cities.filter(c => c.region === region);
    },

    async getTrending() {
      await delay();
      return [...cities].sort((a, b) => b.popularity_score - a.popularity_score).slice(0, 8);
    },
  },

  // ─── ACTIVITIES ───
  activities: {
    async getAll() {
      await delay();
      return activities;
    },

    async getByCity(cityId: string) {
      await delay();
      return getActivitiesByCity(cityId);
    },

    async getByCategory(category: string) {
      await delay();
      return getActivitiesByCategory(category);
    },

    async search(query: string) {
      await delay(200);
      const q = query.toLowerCase();
      return activities.filter(
        a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      );
    },
  },

  // ─── PACKING ───
  packing: {
    async getByTrip(tripId: string): Promise<PackingItem[]> {
      await delay();
      return mockPackingItems.filter(p => p.trip_id === tripId);
    },

    async addItem(tripId: string, category: string, itemName: string): Promise<PackingItem> {
      await delay(200);
      return {
        id: generateId(),
        trip_id: tripId,
        category: category as PackingItem['category'],
        item_name: itemName,
        is_checked: false,
        created_at: new Date().toISOString(),
      };
    },

    async toggleItem(itemId: string, checked: boolean): Promise<void> {
      await delay(100);
    },

    async deleteItem(itemId: string): Promise<void> {
      await delay(100);
    },
  },

  // ─── NOTES ───
  notes: {
    async getByTrip(tripId: string): Promise<Note[]> {
      await delay();
      return mockNotes.filter(n => n.trip_id === tripId);
    },

    async create(data: Partial<Note>): Promise<Note> {
      await delay(300);
      return {
        id: generateId(),
        trip_id: data.trip_id || '',
        user_id: mockUser.id,
        day_date: data.day_date || new Date().toISOString().split('T')[0],
        title: data.title || 'Untitled Note',
        content: data.content || '',
        is_pinned: false,
        created_at: new Date().toISOString(),
      };
    },

    async update(id: string, data: Partial<Note>): Promise<Note> {
      await delay(200);
      const existing = mockNotes.find(n => n.id === id);
      if (!existing) throw new Error('Note not found');
      return { ...existing, ...data };
    },

    async delete(id: string): Promise<void> {
      await delay(200);
    },
  },

  // ─── USERS / ADMIN ───
  users: {
    async getProfile() {
      await delay();
      return mockUser;
    },

    async getAllUsers() {
      await delay();
      return mockUsers;
    },

    async getStats() {
      await delay();
      return {
        totalUsers: 12847,
        totalTrips: 34291,
        publicTrips: 8621,
        activeToday: 1423,
        tripsPerMonth: [
          { month: 'Jan', count: 2100 },
          { month: 'Feb', count: 2450 },
          { month: 'Mar', count: 3200 },
          { month: 'Apr', count: 2800 },
          { month: 'May', count: 3400 },
          { month: 'Jun', count: 4100 },
          { month: 'Jul', count: 4800 },
          { month: 'Aug', count: 4500 },
          { month: 'Sep', count: 3600 },
          { month: 'Oct', count: 3100 },
          { month: 'Nov', count: 2700 },
          { month: 'Dec', count: 3200 },
        ],
        topDestinations: [
          { name: 'Paris', count: 4521 },
          { name: 'Tokyo', count: 3890 },
          { name: 'Bali', count: 3456 },
          { name: 'London', count: 3210 },
          { name: 'Dubai', count: 2987 },
          { name: 'New York', count: 2876 },
          { name: 'Rome', count: 2654 },
          { name: 'Barcelona', count: 2543 },
          { name: 'Bangkok', count: 2321 },
          { name: 'Santorini', count: 2198 },
        ],
      };
    },
  },
};
