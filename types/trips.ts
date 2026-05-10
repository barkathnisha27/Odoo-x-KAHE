export type TripStatus = 'draft' | 'upcoming' | 'active' | 'completed' | 'cancelled';
export type TransportMode = 'flight' | 'train' | 'bus' | 'drive' | 'ferry' | 'walk';
export type TripType = 'solo' | 'couple' | 'family' | 'group';

export interface Trip {
  id: string;
  user_id: string;
  name: string;
  description: string;
  cover_image: string;
  start_date: string;
  end_date: string;
  traveler_count: number;
  status: TripStatus;
  trip_type: TripType;
  share_token: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  stops?: TripStop[];
  budget?: Budget;
}

export interface TripStop {
  id: string;
  trip_id: string;
  city_id: string;
  city?: City;
  order_index: number;
  arrival_date: string;
  departure_date: string;
  transport_mode: TransportMode;
  notes: string;
  activities?: TripActivity[];
}

export interface TripActivity {
  id: string;
  trip_stop_id: string;
  activity_id: string;
  activity?: Activity;
  day_date: string;
  time_slot: string;
  custom_note: string;
}

import { City } from './cities';
import { Activity } from './activities';
import { Budget } from './budgets';
