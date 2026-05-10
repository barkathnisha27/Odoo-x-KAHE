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
    <div className="container-custom page-content animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-gradient mb-2 text-balance">Platform Analytics</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Overview of platform usage and metrics.</p>
        </div>
        <div className="text-sm font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-[var(--text-tertiary)] flex-shrink-0 self-start sm:self-auto">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <StatCard icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>} label="Total Users" value={stats.totalUsers.toLocaleString()} color="#00D4FF" trend="+12% this month" />
        <StatCard icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} label="Total Trips" value={stats.totalTrips.toLocaleString()} color="#10B981" trend="+24% this month" />
        <StatCard icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 9c-1.657 0-3-4.03-3-9s1.343-9 3-9m0 9c1.657 0 3 4.03 3 9s-1.343 9-3 9m-9-9a9 9 0 019-9m-9 9c0 1.657.896 3 2 3s2-1.343 2-3-1.343-3-2-3m0 9c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2m9-9a9 9 0 01-9 9m9-9c0 1.657-.896 3-2 3s-2-1.343-2-3 1.343-3 2-3m0 9c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2" /></svg>} label="Public Trips" value={stats.publicTrips.toLocaleString()} color="#8B5CF6" />
        <StatCard icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>} label="Active Today" value={stats.activeToday.toLocaleString()} color="#FF7B35" trend="+5% vs yesterday" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
        <Card className="flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold font-display mb-4">Trips Created per Month</h3>
          <div className="flex-1 min-h-[280px] sm:min-h-[320px] text-xs">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
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

        <Card className="flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold font-display mb-4">Top Destinations</h3>
          <div className="flex-1 min-h-[280px] sm:min-h-[320px] flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <PieChart>
                  <Pie
                    data={stats.topDestinations.slice(0, 6)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
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
            </div>
            
            {/* Custom Legend — positioned properly */}
            <div className="flex flex-row sm:flex-col flex-wrap gap-2 sm:gap-2 sm:min-w-[120px]">
              {stats.topDestinations.slice(0, 6).map((entry: any, index: number) => (
                <div key={entry.name} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="truncate text-[var(--text-secondary)]">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
}
