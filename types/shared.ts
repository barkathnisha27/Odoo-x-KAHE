export interface SharedTrip {
  id: string;
  trip_id: string;
  token: string;
  views_count: number;
  created_at: string;
}

export interface AnalyticsEvent {
  id: string;
  event_type: string;
  user_id: string;
  trip_id: string;
  destination: string;
  created_at: string;
}
