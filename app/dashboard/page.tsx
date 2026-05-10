'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';
import { useTrips } from '@/lib/hooks/useTrips';
import { Card, StatCard } from '@/components/ui/Card';
import { TripCard } from '@/components/trips/TripCard';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { getTrendingCities } from '@/data/cities';

export default function Dashboard() {
  const { user } = useAuth();
  const { trips, loading } = useTrips();
  const trending = getTrendingCities().slice(0, 4);

  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  if (loading) return <PageSkeleton />;

  const upcomingTrips = trips.filter(t => t.status === 'upcoming');
  const recentTrips = trips.slice(0, 3);
  
  // Calculate stats
  const totalTrips = trips.length;
  const countriesVisited = new Set(
    trips.filter(t => t.status === 'completed')
      .flatMap(t => t.stops?.map(s => s.city?.country) || [])
      .filter(Boolean)
  ).size;
  
  const daysTraveled = trips.filter(t => t.status === 'completed').reduce((acc, trip) => {
    const start = new Date(trip.start_date);
    const end = new Date(trip.end_date);
    return acc + Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }, 0);

  const budgetSaved = trips.filter(t => t.status === 'completed' && t.budget).reduce((acc, trip) => {
    const total = trip.budget!.transport_budget + trip.budget!.hotel_budget + trip.budget!.food_budget + trip.budget!.activity_budget + trip.budget!.misc_budget;
    const saved = total - trip.budget!.actual_spent;
    return acc + (saved > 0 ? saved : 0);
  }, 0);

  return (
    <div className="container-custom py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-display">
            {greeting}, <span className="text-gradient">{user?.name?.split(' ')[0] || 'Explorer'}</span> 👋
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--text-secondary)' }}>
            Ready for your next adventure?
          </p>
        </div>
        <Link href="/trips/create">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0099FF] text-[#0A1628] font-bold hover:shadow-[0_0_24px_rgba(0,212,255,0.35)] transition-all active:scale-[0.98]">
            <span className="text-xl">➕</span> Create New Trip
          </button>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <StatCard icon="✈️" label="Total Trips" value={totalTrips} color="#00D4FF" />
        <StatCard icon="🌍" label="Countries Visited" value={countriesVisited} color="#10B981" />
        <StatCard icon="📅" label="Days Traveled" value={daysTraveled} color="#8B5CF6" />
        <StatCard icon="💰" label="Budget Saved" value={`$${budgetSaved}`} color="#FF7B35" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Upcoming Trips (Takes up 2 cols on desktop) */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-display flex items-center gap-2">
              <span className="text-2xl">⏳</span> Upcoming Trips
            </h2>
            <Link href="/trips" className="text-sm text-[#00D4FF] hover:underline font-medium">View All →</Link>
          </div>
          
          {upcomingTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingTrips.slice(0, 2).map((trip, i) => (
                <TripCard key={trip.id} trip={trip} index={i} />
              ))}
            </div>
          ) : (
            <Card padding="lg" className="flex flex-col items-center justify-center text-center h-[300px] border-dashed border-[rgba(255,255,255,0.1)]">
              <span className="text-5xl mb-4 opacity-50">🧳</span>
              <h3 className="text-xl font-bold mb-2">No upcoming trips</h3>
              <p className="text-sm mb-6 max-w-sm" style={{ color: 'var(--text-secondary)' }}>
                Looks like you don't have any trips planned yet. Start building your next itinerary!
              </p>
              <Link href="/trips/create">
                <button className="px-6 py-2 rounded-lg bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.12)] transition-colors font-medium border border-white/10">
                  Plan a Trip
                </button>
              </Link>
            </Card>
          )}
        </div>

        {/* Mini World Map / Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold font-display mb-4">🌍 Travel Map</h2>
          <Card padding="none" className="h-[calc(100%-2.5rem)] min-h-[300px] relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#0F2847] to-[#0A1628]">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-no-repeat bg-contain opacity-20" />
            
            {/* Animated Markers for visited places */}
            <div className="absolute top-[35%] left-[55%] w-3 h-3 bg-[#10B981] rounded-full shadow-[0_0_10px_#10B981] animate-pulse" title="Europe" />
            <div className="absolute top-[50%] left-[75%] w-3 h-3 bg-[#10B981] rounded-full shadow-[0_0_10px_#10B981] animate-pulse" style={{ animationDelay: '0.5s' }} title="Asia" />
            <div className="absolute top-[40%] left-[25%] w-3 h-3 bg-[#00D4FF] rounded-full shadow-[0_0_10px_#00D4FF] animate-pulse" style={{ animationDelay: '1s' }} title="North America (Upcoming)" />
            
            <div className="relative z-10 text-center p-6 bg-black/40 backdrop-blur-md border border-white/10 m-6 rounded-xl">
              <p className="text-sm font-medium">You've explored</p>
              <p className="text-3xl font-bold font-display text-gradient my-1">12%</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>of the world</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Recommended / Trending */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-display flex items-center gap-2">
            <span className="text-2xl">🔥</span> Trending Destinations
          </h2>
          <Link href="/cities" className="text-sm text-[#00D4FF] hover:underline font-medium">Explore All →</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trending.map((city, i) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/cities#${city.id}`}>
                <div className="group relative h-48 rounded-xl overflow-hidden cursor-pointer">
                  <img src={city.image_url} alt={city.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-bold text-lg">{city.flag_emoji} {city.name}</p>
                    <p className="text-xs text-white/70">{city.country}</p>
                    <div className="mt-2 text-[10px] font-mono px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md inline-block">
                      Avg: ${city.avg_daily_cost}/day
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
