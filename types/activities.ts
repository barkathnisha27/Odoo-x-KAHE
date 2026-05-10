export type ActivityCategory = 'adventure' | 'food' | 'nightlife' | 'shopping' | 'culture' | 'sightseeing';

export interface Activity {
  id: string;
  city_id: string;
  name: string;
  category: ActivityCategory;
  duration_minutes: number;
  cost: number;
  rating: number;
  image_url: string;
  description: string;
}

export const CATEGORY_ICONS: Record<ActivityCategory, string> = {
  adventure: '🏔',
  food: '🍜',
  nightlife: '🌃',
  shopping: '🛍',
  culture: '🏛',
  sightseeing: '🌅',
};

export const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  adventure: 'Adventure',
  food: 'Food & Dining',
  nightlife: 'Nightlife',
  shopping: 'Shopping',
  culture: 'Culture',
  sightseeing: 'Sightseeing',
};
