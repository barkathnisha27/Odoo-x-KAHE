export type Region = 'Asia' | 'Europe' | 'North America' | 'South America' | 'Africa' | 'Oceania' | 'Middle East';
export type BudgetLevel = 'budget' | 'mid-range' | 'luxury';

export interface City {
  id: string;
  name: string;
  country: string;
  region: Region;
  image_url: string;
  avg_daily_cost: number;
  popularity_score: number;
  coordinates: { lat: number; lng: number };
  flag_emoji: string;
  climate: string;
  description: string;
  top_activities?: string[];
}
