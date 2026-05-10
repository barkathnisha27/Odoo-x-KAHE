import type { BudgetCategory } from '@/components/ui/BudgetIcons';
import { BUDGET_CATEGORIES } from '@/components/ui/BudgetIcons';

export { BUDGET_CATEGORIES };
export type { BudgetCategory };

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

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'SGD', 'AED', 'THB'];
