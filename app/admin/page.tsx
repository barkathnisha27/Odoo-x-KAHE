'use client';
import React, { useEffect, useState } from 'react';
import { Card, StatCard } from '@/components/ui/Card';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { api } from '@/lib/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const data = await api.users.getStats();
      setStats(data);
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) return <PageSkeleton />;

  const COLORS = ['#00D4FF', '#10B981', '#FF7B35', '#8B5CF6', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899', '#14B8A6', '#6366F1'];

  return (
    <div className="container-custom py-8 animate-fade-in">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-gradient mb-2">Platform Analytics</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Overview of platform usage and metrics.</p>
        </div>
        <div className="text-sm font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-[var(--text-tertiary)]">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="👥" label="Total Users" value={stats.totalUsers.toLocaleString()} color="#00D4FF" trend="+12% this month" />
        <StatCard icon="🧳" label="Total Trips" value={stats.totalTrips.toLocaleString()} color="#10B981" trend="+24% this month" />
        <StatCard icon="🌐" label="Public Trips" value={stats.publicTrips.toLocaleString()} color="#8B5CF6" />
        <StatCard icon="🔥" label="Active Today" value={stats.activeToday.toLocaleString()} color="#FF7B35" trend="+5% vs yesterday" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="h-[400px] flex flex-col">
          <h3 className="text-xl font-bold font-display mb-4">Trips Created per Month</h3>
          <div className="flex-1 min-h-0 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.tripsPerMonth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: 'rgba(10,22,40,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#00D4FF" radius={[4, 4, 0, 0]} name="Trips" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="h-[400px] flex flex-col">
          <h3 className="text-xl font-bold font-display mb-4">Top Destinations</h3>
          <div className="flex-1 min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.topDestinations.slice(0, 6)}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {stats.topDestinations.slice(0, 6).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10,22,40,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Custom Legend */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4 max-w-[120px]">
              {stats.topDestinations.slice(0, 6).map((entry: any, index: number) => (
                <div key={entry.name} className="flex items-center gap-2 mb-2 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="truncate flex-1 text-[var(--text-secondary)]">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
}
