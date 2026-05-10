'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Card } from '@/components/ui/Card';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useBudget } from '@/lib/hooks/useBudget';
import { api } from '@/lib/api';
import { Trip } from '@/types/trips';
import { BUDGET_CATEGORIES, CURRENCIES } from '@/types/budgets';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function BudgetDashboard() {
  const params = useParams();
  const tripId = params.tripId as string;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { budget, totalBudget, remaining, percentage, isOverBudget, updateCategory, setCurrency, setBudget } = useBudget();

  useEffect(() => {
    async function load() {
      const data = await api.trips.getById(tripId);
      if (data) {
        setTrip(data);
        if (data.budget) setBudget(data.budget);
      }
      setLoading(false);
    }
    load();
  }, [tripId, setBudget]);

  const handleSave = () => {
    toast.success('Budget saved successfully! 💰');
  };

  if (loading) return <PageSkeleton />;
  if (!trip) return <div className="p-8 text-center">Trip not found</div>;

  const chartData = BUDGET_CATEGORIES.map(cat => ({
    name: cat.label,
    value: budget[cat.key],
    color: cat.color
  })).filter(d => d.value > 0);

  // Mock bar chart data for spending over time
  const barData = [
    { name: 'Day 1', spent: 120, limit: 150 },
    { name: 'Day 2', spent: 200, limit: 150 },
    { name: 'Day 3', spent: 80, limit: 150 },
    { name: 'Day 4', spent: 150, limit: 150 },
  ];

  return (
    <div className="container-custom py-8 animate-fade-in max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-[#00D4FF] font-bold text-sm mb-1 uppercase tracking-wider">{trip.name}</p>
          <h1 className="text-3xl md:text-4xl font-bold font-display">Budget Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={budget.currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className="glass-input px-3 py-2 text-sm rounded-lg border-white/10 outline-none cursor-pointer"
          >
            {CURRENCIES.map(c => <option key={c} value={c} className="bg-[#0A1628]">{c}</option>)}
          </select>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      {/* Summary Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-[rgba(0,212,255,0.1)] to-transparent border-[#00D4FF]/20">
          <p className="text-sm text-[var(--text-secondary)] mb-1">Total Budget</p>
          <p className="text-3xl font-bold font-mono text-[#00D4FF]">{formatCurrency(totalBudget, budget.currency)}</p>
        </Card>
        
        <Card className="bg-gradient-to-br from-[rgba(255,123,53,0.1)] to-transparent border-[#FF7B35]/20">
          <p className="text-sm text-[var(--text-secondary)] mb-1">Actual Spent</p>
          <p className="text-3xl font-bold font-mono text-[#FF7B35]">{formatCurrency(budget.actual_spent, budget.currency)}</p>
        </Card>
        
        <Card className={`bg-gradient-to-br ${isOverBudget ? 'from-[rgba(239,68,68,0.1)] border-[#EF4444]/20' : 'from-[rgba(16,185,129,0.1)] border-[#10B981]/20'} to-transparent`}>
          <p className="text-sm text-[var(--text-secondary)] mb-1">{isOverBudget ? 'Over Budget By' : 'Remaining'}</p>
          <p className={`text-3xl font-bold font-mono ${isOverBudget ? 'text-[#EF4444]' : 'text-[#10B981]'}`}>
            {formatCurrency(Math.abs(remaining), budget.currency)}
          </p>
        </Card>
      </div>

      {/* Smart Savings Banner */}
      {isOverBudget && (
        <div className="mb-8 p-4 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[#EF4444]/30 flex items-start gap-4 animate-fade-in">
          <span className="text-2xl mt-1">🚨</span>
          <div>
            <h4 className="font-bold text-[#EF4444] mb-1">Budget Alert</h4>
            <p className="text-sm text-[#EF4444]/80">You are currently {formatCurrency(Math.abs(remaining), budget.currency)} over budget. Consider replacing planned flights with trains or looking for mid-range dining options.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Inputs */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-display mb-4">Categories</h3>
          {BUDGET_CATEGORIES.map((cat) => (
            <Card key={cat.key} padding="sm" className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${cat.color}20` }}>
                {cat.icon}
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-[var(--text-secondary)] mb-1 block">{cat.label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">$</span>
                  <input
                    type="number"
                    value={budget[cat.key] || ''}
                    onChange={(e) => updateCategory(cat.key, parseFloat(e.target.value) || 0)}
                    className="w-full bg-transparent border-b border-white/10 py-1 pl-8 pr-2 font-mono focus:outline-none focus:border-[#00D4FF] transition-colors"
                    placeholder="0"
                  />
                </div>
              </div>
              {/* Mock actual spent per category for visuals */}
              <div className="text-right">
                <p className="text-xs text-[var(--text-tertiary)] mb-1">Spent</p>
                <p className="text-sm font-mono font-medium">{formatCurrency((budget[cat.key] * 0.8) || 0, budget.currency)}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="space-y-8">
          <Card className="h-[300px] flex flex-col">
            <h3 className="text-lg font-bold font-display mb-2">Budget Distribution</h3>
            <div className="flex-1 min-h-0 relative">
              {totalBudget > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value: any) => formatCurrency(value, budget.currency)}
                      contentStyle={{ backgroundColor: 'rgba(10,22,40,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[var(--text-tertiary)] text-sm">
                  Add budget amounts to see breakdown
                </div>
              )}
            </div>
          </Card>

          <Card className="h-[300px] flex flex-col">
            <h3 className="text-lg font-bold font-display mb-2">Daily Spending Trend</h3>
            <div className="flex-1 min-h-0 text-xs">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                  <RechartsTooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: 'rgba(10,22,40,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="spent" fill="#00D4FF" radius={[4, 4, 0, 0]} name="Actual Spent" />
                  <Bar dataKey="limit" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} name="Daily Limit" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
