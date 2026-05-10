export interface Budget {
  id: string;
  trip_id: string;
  transport_budget: number;
  hotel_budget: number;
  food_budget: number;
  activity_budget: number;
  misc_budget: number;
  actual_spent: number;
  currency: string;
}

export interface BudgetCategory {
  key: keyof Pick<Budget, 'transport_budget' | 'hotel_budget' | 'food_budget' | 'activity_budget' | 'misc_budget'>;
  label: string;
  icon: string;
  color: string;
  actualKey: string;
}

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  { key: 'transport_budget', label: 'Transport', icon: '✈️', color: '#00D4FF', actualKey: 'transport_actual' },
  { key: 'hotel_budget', label: 'Hotel', icon: '🏨', color: '#FF7B35', actualKey: 'hotel_actual' },
  { key: 'food_budget', label: 'Food', icon: '🍽️', color: '#10B981', actualKey: 'food_actual' },
  { key: 'activity_budget', label: 'Activities', icon: '🎯', color: '#8B5CF6', actualKey: 'activity_actual' },
  { key: 'misc_budget', label: 'Miscellaneous', icon: '📦', color: '#F59E0B', actualKey: 'misc_actual' },
];

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'SGD', 'AED', 'THB'];
