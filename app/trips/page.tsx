'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrips } from '@/lib/hooks/useTrips';
import { TripCard } from '@/components/trips/TripCard';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { TripStatus } from '@/types/trips';
import toast from 'react-hot-toast';

export default function TripsPage() {
  const { trips, loading, filter, setFilter, deleteTrip, duplicateTrip } = useTrips();
  const [search, setSearch] = useState('');

  if (loading) return <PageSkeleton />;

  const tabs: { id: TripStatus | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Trips', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
    { id: 'upcoming', label: 'Upcoming', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'active', label: 'Active', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
    { id: 'completed', label: 'Completed', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 'draft', label: 'Drafts', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> },
  ];

  const filteredTrips = trips.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchesSearch; // Status filtering is already handled by useTrips hook if we pass filter to it, but our hook currently returns filteredTrips based on filter state. Wait, our hook returns filteredTrips. Let's just use it and add search.
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(id);
      toast.success('Trip deleted');
    }
  };

  const handleDuplicate = (id: string) => {
    duplicateTrip(id);
    toast.success('Trip duplicated');
  };

  return (
    <div className="container-custom page-content animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-2">My Trips</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage all your travel plans in one place.</p>
        </div>
        
        <Link href="/trips/create">
          <Button variant="primary" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>
            Create New Trip
          </Button>
        </Link>
      </div>

      {/* Filters and Search Bar */}
      <div className="glass p-2 rounded-2xl mb-8 flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch lg:items-center justify-between border-white/10">
        <div className="flex gap-1 w-full lg:w-auto overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`flex-shrink-0 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-[rgba(255,255,255,0.1)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-64">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search trips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[rgba(0,0,0,0.2)] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors"
          />
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTrips.map((trip, i) => (
              <motion.div
                key={trip.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <TripCard 
                  trip={trip} 
                  index={i} 
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="text-6xl mb-4 opacity-50">🏜️</div>
            <h3 className="text-xl font-bold font-display mb-2">No trips found</h3>
            <p className="text-sm max-w-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              {search 
                ? `No trips matching "${search}" in this category.`
                : "You don't have any trips in this category yet."}
            </p>
            {search ? (
              <Button variant="outline" onClick={() => setSearch('')}>Clear Search</Button>
            ) : (
              <Link href="/trips/create">
                <Button variant="primary">Plan a Trip</Button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
