'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';
import { useTrips } from '@/lib/hooks/useTrips';
import { Card, StatCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
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
    <div className="container-custom page-content animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-balance">
            {greeting}, <span className="text-gradient">{user?.name?.split(' ')[0] || 'Explorer'}</span>
            <span className="inline-block animate-wave ml-2">👋</span>
          </h1>
          <p className="text-base sm:text-lg mt-2" style={{ color: 'var(--text-secondary)' }}>
            Ready for your next adventure?
          </p>
        </div>
        <Link href="/trips/create" className="flex-shrink-0">
          <Button 
            variant="primary" 
            size="lg"
            className="w-full md:w-auto"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Create New Trip
          </Button>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
        <StatCard icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>} label="Total Trips" value={totalTrips} color="#00D4FF" />
        <StatCard icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>} label="Countries Visited" value={countriesVisited} color="#10B981" />
        <StatCard icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} label="Days Traveled" value={daysTraveled} color="#8B5CF6" />
        <StatCard icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>} label="Budget Saved" value={`$${budgetSaved}`} color="#FF7B35" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
        {/* Upcoming Trips (Takes up 2 cols on desktop) */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold font-display flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#00D4FF] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Upcoming Trips
            </h2>
            <Link href="/trips" className="text-sm text-[#00D4FF] hover:underline font-medium flex-shrink-0">View All →</Link>
          </div>
          
          {upcomingTrips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {upcomingTrips.slice(0, 2).map((trip, i) => (
                <TripCard key={trip.id} trip={trip} index={i} />
              ))}
            </div>
          ) : (
            <Card padding="lg" className="flex flex-col items-center justify-center text-center min-h-[280px] border-dashed border-[rgba(255,255,255,0.1)]">
              <svg className="w-12 h-12 mb-4 opacity-50 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <h3 className="text-xl font-bold mb-2">No upcoming trips</h3>
              <p className="text-sm mb-6 max-w-sm" style={{ color: 'var(--text-secondary)' }}>
                Looks like you don&apos;t have any trips planned yet. Start building your next itinerary!
              </p>
              <Link href="/trips/create">
                <Button variant="secondary">Plan a Trip</Button>
              </Link>
            </Card>
          )}
        </div>

        {/* Mini World Map / Recent Activity */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#00D4FF] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
            Travel Map
          </h2>
          <Card padding="none" className="min-h-[300px] relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#0F2847] to-[#0A1628]">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-no-repeat bg-contain opacity-20" />
            
            {/* Animated Markers for visited places */}
            <div className="absolute top-[35%] left-[55%] w-3 h-3 bg-[#10B981] rounded-full shadow-[0_0_10px_#10B981] animate-pulse" title="Europe" />
            <div className="absolute top-[50%] left-[75%] w-3 h-3 bg-[#10B981] rounded-full shadow-[0_0_10px_#10B981] animate-pulse" style={{ animationDelay: '0.5s' }} title="Asia" />
            <div className="absolute top-[40%] left-[25%] w-3 h-3 bg-[#00D4FF] rounded-full shadow-[0_0_10px_#00D4FF] animate-pulse" style={{ animationDelay: '1s' }} title="North America (Upcoming)" />
            
            <div className="relative z-10 text-center p-6 bg-black/40 backdrop-blur-md border border-white/10 m-4 sm:m-6 rounded-xl">
              <p className="text-sm font-medium">You&apos;ve explored</p>
              <p className="text-3xl font-bold font-display text-gradient my-1">12%</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>of the world</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Recommended / Trending */}
      <div className="pb-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold font-display flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>
            Trending Destinations
          </h2>
          <Link href="/cities" className="text-sm text-[#00D4FF] hover:underline font-medium flex-shrink-0">Explore All →</Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {trending.map((city, i) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/cities#${city.id}`}>
                <div className="group relative h-40 sm:h-48 rounded-xl overflow-hidden cursor-pointer">
                  <img src={city.image_url} alt={city.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <p className="font-bold text-sm sm:text-lg">{city.flag_emoji} {city.name}</p>
                    <p className="text-xs text-white/70">{city.country}</p>
                    <div className="mt-1.5 sm:mt-2 text-[10px] font-mono px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md inline-block">
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
