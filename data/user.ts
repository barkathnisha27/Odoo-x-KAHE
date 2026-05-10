import { User } from '@/types/users';

export const mockUser: User = {
  id: 'user-1',
  email: 'alex.traveler@traveloop.com',
  name: 'Alex Traveler',
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80',
  role: 'admin',
  created_at: '2025-01-15T10:00:00Z',
};

export const mockUsers: User[] = [
  mockUser,
  { id: 'user-2', email: 'maya.chen@example.com', name: 'Maya Chen', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80', role: 'user', created_at: '2025-02-20T14:30:00Z' },
  { id: 'user-3', email: 'james.wilson@example.com', name: 'James Wilson', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80', role: 'user', created_at: '2025-03-10T09:15:00Z' },
  { id: 'user-4', email: 'sofia.garcia@example.com', name: 'Sofia Garcia', avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80', role: 'user', created_at: '2025-04-05T16:45:00Z' },
  { id: 'user-5', email: 'raj.patel@example.com', name: 'Raj Patel', avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80', role: 'user', created_at: '2025-05-12T11:20:00Z' },
];
