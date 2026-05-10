import { Trip } from '@/types/trips';
import { PackingItem } from '@/types/packing';
import { Note } from '@/types/notes';

export const mockTrips: Trip[] = [
  {
    id: 'trip-1',
    user_id: 'user-1',
    name: 'European Dream Tour',
    description: 'A magical journey through Europe\'s most iconic cities — from the romance of Paris to the history of Rome.',
    cover_image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    start_date: '2026-06-15',
    end_date: '2026-07-05',
    traveler_count: 2,
    status: 'upcoming',
    trip_type: 'couple',
    share_token: 'eu-dream-2026-abc',
    is_public: true,
    created_at: '2026-04-01T10:00:00Z',
    updated_at: '2026-05-08T15:30:00Z',
    stops: [
      { id: 'stop-1', trip_id: 'trip-1', city_id: 'city-1', order_index: 0, arrival_date: '2026-06-15', departure_date: '2026-06-20', transport_mode: 'flight', notes: 'Landing at CDG T2' },
      { id: 'stop-2', trip_id: 'trip-1', city_id: 'city-9', order_index: 1, arrival_date: '2026-06-20', departure_date: '2026-06-25', transport_mode: 'train', notes: 'TGV from Paris Gare de Lyon' },
      { id: 'stop-3', trip_id: 'trip-1', city_id: 'city-7', order_index: 2, arrival_date: '2026-06-25', departure_date: '2026-07-01', transport_mode: 'flight', notes: 'Vueling from BCN' },
      { id: 'stop-4', trip_id: 'trip-1', city_id: 'city-17', order_index: 3, arrival_date: '2026-07-01', departure_date: '2026-07-05', transport_mode: 'flight', notes: 'EasyJet from FCO' },
    ],
    budget: {
      id: 'budget-1', trip_id: 'trip-1',
      transport_budget: 1200, hotel_budget: 2500, food_budget: 1000, activity_budget: 600, misc_budget: 300,
      actual_spent: 3800, currency: 'USD',
    },
  },
  {
    id: 'trip-2',
    user_id: 'user-1',
    name: 'Southeast Asia Adventure',
    description: 'Temples, street food, and tropical beaches — the ultimate backpacking route through Southeast Asia.',
    cover_image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    start_date: '2026-08-01',
    end_date: '2026-08-20',
    traveler_count: 1,
    status: 'upcoming',
    trip_type: 'solo',
    share_token: 'sea-adv-2026-xyz',
    is_public: true,
    created_at: '2026-05-01T08:00:00Z',
    updated_at: '2026-05-09T12:00:00Z',
    stops: [
      { id: 'stop-5', trip_id: 'trip-2', city_id: 'city-8', order_index: 0, arrival_date: '2026-08-01', departure_date: '2026-08-07', transport_mode: 'flight', notes: 'BKK Suvarnabhumi' },
      { id: 'stop-6', trip_id: 'trip-2', city_id: 'city-5', order_index: 1, arrival_date: '2026-08-07', departure_date: '2026-08-14', transport_mode: 'flight', notes: 'AirAsia direct' },
      { id: 'stop-7', trip_id: 'trip-2', city_id: 'city-12', order_index: 2, arrival_date: '2026-08-14', departure_date: '2026-08-20', transport_mode: 'flight', notes: 'Scoot from DPS' },
    ],
    budget: {
      id: 'budget-2', trip_id: 'trip-2',
      transport_budget: 800, hotel_budget: 600, food_budget: 400, activity_budget: 300, misc_budget: 200,
      actual_spent: 1500, currency: 'USD',
    },
  },
  {
    id: 'trip-3',
    user_id: 'user-1',
    name: 'Middle East & India Explorer',
    description: 'From the spice markets of Delhi to the futuristic towers of Dubai — a journey of contrasts.',
    cover_image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    start_date: '2026-03-10',
    end_date: '2026-03-22',
    traveler_count: 3,
    status: 'completed',
    trip_type: 'group',
    share_token: 'mei-exp-2026-def',
    is_public: false,
    created_at: '2026-01-15T09:00:00Z',
    updated_at: '2026-03-23T18:00:00Z',
    stops: [
      { id: 'stop-8', trip_id: 'trip-3', city_id: 'city-20', order_index: 0, arrival_date: '2026-03-10', departure_date: '2026-03-14', transport_mode: 'flight', notes: 'DEL T3' },
      { id: 'stop-9', trip_id: 'trip-3', city_id: 'city-4', order_index: 1, arrival_date: '2026-03-14', departure_date: '2026-03-18', transport_mode: 'flight', notes: 'Emirates direct' },
      { id: 'stop-10', trip_id: 'trip-3', city_id: 'city-11', order_index: 2, arrival_date: '2026-03-18', departure_date: '2026-03-22', transport_mode: 'flight', notes: 'Turkish Airlines' },
    ],
    budget: {
      id: 'budget-3', trip_id: 'trip-3',
      transport_budget: 1500, hotel_budget: 1800, food_budget: 600, activity_budget: 400, misc_budget: 250,
      actual_spent: 4200, currency: 'USD',
    },
  },
  {
    id: 'trip-4',
    user_id: 'user-1',
    name: 'Japan Cultural Immersion',
    description: 'Ancient temples, bamboo forests, and the perfect bowl of ramen — deep dive into Japanese culture.',
    cover_image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    start_date: '2026-10-01',
    end_date: '2026-10-14',
    traveler_count: 2,
    status: 'draft',
    trip_type: 'couple',
    share_token: null,
    is_public: false,
    created_at: '2026-05-05T14:00:00Z',
    updated_at: '2026-05-05T14:00:00Z',
    stops: [
      { id: 'stop-11', trip_id: 'trip-4', city_id: 'city-2', order_index: 0, arrival_date: '2026-10-01', departure_date: '2026-10-07', transport_mode: 'flight', notes: 'NRT Terminal 1' },
      { id: 'stop-12', trip_id: 'trip-4', city_id: 'city-16', order_index: 1, arrival_date: '2026-10-07', departure_date: '2026-10-14', transport_mode: 'train', notes: 'Shinkansen from Tokyo' },
    ],
    budget: {
      id: 'budget-4', trip_id: 'trip-4',
      transport_budget: 900, hotel_budget: 2000, food_budget: 800, activity_budget: 500, misc_budget: 300,
      actual_spent: 0, currency: 'USD',
    },
  },
  {
    id: 'trip-5',
    user_id: 'user-1',
    name: 'Greek Island Getaway',
    description: 'Whitewashed villages, azure waters, and spectacular sunsets on the magical island of Santorini.',
    cover_image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    start_date: '2025-09-05',
    end_date: '2025-09-12',
    traveler_count: 4,
    status: 'completed',
    trip_type: 'family',
    share_token: 'greek-getaway-ghi',
    is_public: true,
    created_at: '2025-07-10T10:00:00Z',
    updated_at: '2025-09-13T09:00:00Z',
    stops: [
      { id: 'stop-13', trip_id: 'trip-5', city_id: 'city-22', order_index: 0, arrival_date: '2025-09-05', departure_date: '2025-09-12', transport_mode: 'flight', notes: 'JTR Airport, taxi to Oia' },
    ],
    budget: {
      id: 'budget-5', trip_id: 'trip-5',
      transport_budget: 600, hotel_budget: 3000, food_budget: 700, activity_budget: 400, misc_budget: 200,
      actual_spent: 4700, currency: 'USD',
    },
  },
];

export const mockPackingItems: PackingItem[] = [
  // Trip 1 packing
  { id: 'pack-1', trip_id: 'trip-1', category: 'clothing', item_name: 'Light jacket', is_checked: true, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-2', trip_id: 'trip-1', category: 'clothing', item_name: 'Walking shoes', is_checked: true, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-3', trip_id: 'trip-1', category: 'clothing', item_name: 'T-shirts (5)', is_checked: false, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-4', trip_id: 'trip-1', category: 'clothing', item_name: 'Jeans (2)', is_checked: false, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-5', trip_id: 'trip-1', category: 'clothing', item_name: 'Swimwear', is_checked: false, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-6', trip_id: 'trip-1', category: 'electronics', item_name: 'Phone charger', is_checked: true, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-7', trip_id: 'trip-1', category: 'electronics', item_name: 'Power bank', is_checked: false, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-8', trip_id: 'trip-1', category: 'electronics', item_name: 'Camera + lens', is_checked: false, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-9', trip_id: 'trip-1', category: 'electronics', item_name: 'EU adapter plug', is_checked: true, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-10', trip_id: 'trip-1', category: 'documents', item_name: 'Passport', is_checked: true, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-11', trip_id: 'trip-1', category: 'documents', item_name: 'Travel insurance card', is_checked: false, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-12', trip_id: 'trip-1', category: 'documents', item_name: 'Flight printouts', is_checked: false, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-13', trip_id: 'trip-1', category: 'essentials', item_name: 'Sunscreen SPF 50', is_checked: false, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-14', trip_id: 'trip-1', category: 'essentials', item_name: 'Toothbrush + paste', is_checked: true, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-15', trip_id: 'trip-1', category: 'essentials', item_name: 'First aid kit', is_checked: false, created_at: '2026-05-01T10:00:00Z' },
  { id: 'pack-16', trip_id: 'trip-1', category: 'custom', item_name: 'Sketch notebook', is_checked: false, created_at: '2026-05-02T10:00:00Z' },
];

export const mockNotes: Note[] = [
  { id: 'note-1', trip_id: 'trip-1', user_id: 'user-1', day_date: '2026-06-15', title: 'Arrival Day Plan', content: 'Land at CDG by 8am. Take RER B to Gare du Nord, then metro to hotel near Le Marais. Rest until noon, then walk to Notre-Dame area for lunch.', is_pinned: true, created_at: '2026-05-01T10:00:00Z' },
  { id: 'note-2', trip_id: 'trip-1', user_id: 'user-1', day_date: '2026-06-16', title: 'Museum Day', content: 'Louvre opens at 9am — arrive early to beat crowds. Book timed entry in advance. After Louvre, walk through Tuileries Garden to Place de la Concorde.', is_pinned: false, created_at: '2026-05-01T11:00:00Z' },
  { id: 'note-3', trip_id: 'trip-1', user_id: 'user-1', day_date: '2026-06-20', title: 'Train to Barcelona', content: 'TGV departs Gare de Lyon at 9:40am. Arrives Barcelona Sants at 4:15pm. Buy a T-Casual card for metro on arrival.', is_pinned: true, created_at: '2026-05-02T09:00:00Z' },
  { id: 'note-4', trip_id: 'trip-3', user_id: 'user-1', day_date: '2026-03-15', title: 'Dubai Souks', content: 'Visit Gold Souk and Spice Souk in the morning when it\'s cooler. Negotiate prices — start at 50% of asking price. Amazing saffron deals.', is_pinned: false, created_at: '2026-03-15T18:00:00Z' },
  { id: 'note-5', trip_id: 'trip-5', user_id: 'user-1', day_date: '2025-09-07', title: 'Best Sunset Spot', content: 'The castle ruins in Oia get packed. Instead, found an amazing spot at Lioyerma Lounge — arrive by 6pm to get a front row seat.', is_pinned: true, created_at: '2025-09-07T20:00:00Z' },
];

export const getTripById = (id: string): Trip | undefined => mockTrips.find(t => t.id === id);
export const getTripsByStatus = (status: string): Trip[] => mockTrips.filter(t => t.status === status);
export const getPackingByTrip = (tripId: string): PackingItem[] => mockPackingItems.filter(p => p.trip_id === tripId);
export const getNotesByTrip = (tripId: string): Note[] => mockNotes.filter(n => n.trip_id === tripId);
