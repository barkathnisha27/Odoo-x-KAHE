export type PackingCategory = 'clothing' | 'electronics' | 'documents' | 'essentials' | 'custom';

export interface PackingItem {
  id: string;
  trip_id: string;
  category: PackingCategory;
  item_name: string;
  is_checked: boolean;
  created_at: string;
}

export const PACKING_CATEGORY_ICONS: Record<PackingCategory, string> = {
  clothing: '👕',
  electronics: '💻',
  documents: '📄',
  essentials: '🧴',
  custom: '➕',
};

export const PACKING_CATEGORY_LABELS: Record<PackingCategory, string> = {
  clothing: 'Clothing',
  electronics: 'Electronics',
  documents: 'Documents',
  essentials: 'Essentials',
  custom: 'Custom',
};
