import type { PackingCategory } from '@/components/ui/PackingIcons';
import { PACKING_CATEGORY_ICONS, PACKING_CATEGORY_LABELS } from '@/components/ui/PackingIcons';

export { PACKING_CATEGORY_ICONS, PACKING_CATEGORY_LABELS };
export type { PackingCategory };

export interface PackingItem {
  id: string;
  trip_id: string;
  category: PackingCategory;
  item_name: string;
  is_checked: boolean;
  created_at: string;
}
