'use client';
import { useState, useCallback } from 'react';
import { Budget } from '@/types/budgets';

export function useBudget(initialBudget?: Budget) {
  const [budget, setBudget] = useState<Budget>(initialBudget || {
    id: '', trip_id: '',
    transport_budget: 0, hotel_budget: 0, food_budget: 0,
    activity_budget: 0, misc_budget: 0, actual_spent: 0, currency: 'USD',
  });

  const totalBudget = budget.transport_budget + budget.hotel_budget + budget.food_budget + budget.activity_budget + budget.misc_budget;
  const remaining = totalBudget - budget.actual_spent;
  const percentage = totalBudget > 0 ? Math.round((budget.actual_spent / totalBudget) * 100) : 0;
  const isOverBudget = budget.actual_spent > totalBudget;

  const updateCategory = useCallback((key: keyof Budget, value: number) => {
    setBudget(prev => ({ ...prev, [key]: value }));
  }, []);

  const setCurrency = useCallback((currency: string) => {
    setBudget(prev => ({ ...prev, currency }));
  }, []);

  return { budget, totalBudget, remaining, percentage, isOverBudget, updateCategory, setCurrency, setBudget };
}
