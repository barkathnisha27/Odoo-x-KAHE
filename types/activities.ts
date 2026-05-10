import type { ActivityCategory } from '@/components/ui/ActivityIcons';
import { CATEGORY_ICONS, CATEGORY_LABELS } from '@/components/ui/ActivityIcons';

export { CATEGORY_ICONS, CATEGORY_LABELS };
export type { ActivityCategory };

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
