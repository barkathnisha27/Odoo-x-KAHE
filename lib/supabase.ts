import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for when connected to real Supabase
export type Database = {
  public: {
    Tables: {
      users: { Row: { id: string; email: string; name: string; avatar_url: string; role: string; created_at: string } };
      trips: { Row: { id: string; user_id: string; name: string; description: string; cover_image: string; start_date: string; end_date: string; traveler_count: number; status: string; share_token: string | null; is_public: boolean; created_at: string; updated_at: string } };
      trip_stops: { Row: { id: string; trip_id: string; city_id: string; order_index: number; arrival_date: string; departure_date: string; transport_mode: string; notes: string } };
      cities: { Row: { id: string; name: string; country: string; region: string; image_url: string; avg_daily_cost: number; popularity_score: number; coordinates: { lat: number; lng: number } } };
      activities: { Row: { id: string; city_id: string; name: string; category: string; duration_minutes: number; cost: number; rating: number; image_url: string; description: string } };
      trip_activities: { Row: { id: string; trip_stop_id: string; activity_id: string; day_date: string; time_slot: string; custom_note: string } };
      budgets: { Row: { id: string; trip_id: string; transport_budget: number; hotel_budget: number; food_budget: number; activity_budget: number; misc_budget: number; actual_spent: number; currency: string } };
      packing_lists: { Row: { id: string; trip_id: string; category: string; item_name: string; is_checked: boolean; created_at: string } };
      notes: { Row: { id: string; trip_id: string; user_id: string; day_date: string; title: string; content: string; created_at: string } };
      shared_trips: { Row: { id: string; trip_id: string; token: string; views_count: number; created_at: string } };
      analytics: { Row: { id: string; event_type: string; user_id: string; trip_id: string; destination: string; created_at: string } };
    };
  };
};
