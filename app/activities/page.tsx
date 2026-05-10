'use client';
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/Alert';
import { EmptyState } from '@/components/ui/EmptyState';
import { useActivities } from '@/lib/hooks/useActivities';
import { getCityById } from '@/data/cities';
import toast from 'react-hot-toast';

const categories = ['All', 'adventure', 'food', 'nightlife', 'shopping', 'culture', 'sightseeing'];

export default function ActivitiesBrowser() {
  const { activities, loading, error, refresh } = useActivities();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesCategory = activeCategory === 'All' || activity.category === activeCategory;
      const matchesSearch = activity.name.toLowerCase().includes(search.toLowerCase()) || activity.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activities, activeCategory, search]);

  if (loading) return <PageSkeleton />;

  if (error) {
    return (
      <div className="container-custom py-12">
        <Alert title="Unable to load activities" description={error} variant="error" className="mb-6" />
        <Button variant="primary" onClick={refresh}>Try again</Button>
      </div>
    );
  }

  return (
    <div className="container-custom page-content animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4 text-balance">Discover experiences for every trip</h1>
        <p className="text-lg text-[var(--text-secondary)] mb-8">
          Browse curated activities, compare local highlights, and add them directly to your plan.
        </p>

        <div className="relative max-w-xl mx-auto">
          <Input
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full py-4 pl-12 text-lg shadow-lg bg-[rgba(10,22,40,0.85)]"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize whitespace-nowrap flex-shrink-0 ${
              activeCategory === category
                ? 'bg-[#00D4FF] text-[#0A1628] shadow-sm'
                : 'bg-[rgba(255,255,255,0.05)] text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredActivities.length === 0 ? (
        <EmptyState
          icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10l3 3 7-7M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          title="No matching experiences"
          description="Refine your search or category to find more activities for your itinerary."
          primaryAction={<Button variant="primary" onClick={() => { setSearch(''); setActiveCategory('All'); }}>Reset filters</Button>}
        />
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredActivities.map((activity) => {
              const city = getCityById(activity.city_id);
              return (
                <motion.div
                  key={activity.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card padding="none" className="h-full overflow-hidden group flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={activity.image_url}
                        alt={activity.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3">
                        <Badge variant="default" size="sm" className="bg-black/40 border-none backdrop-blur-md capitalize">
                          {activity.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4">
                        <div className="flex items-center gap-2 text-white text-sm font-semibold mb-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          {activity.rating}
                        </div>
                        <h3 className="text-lg font-bold font-display leading-tight text-white">{activity.name}</h3>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <p className="text-sm line-clamp-2 mb-4 text-[var(--text-secondary)]">{activity.description}</p>
                      <div className="flex items-center justify-between mb-4 text-xs font-mono text-[var(--text-secondary)]">
                        <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.05)] rounded-full px-2 py-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12,6 12,12 16,14"></polyline>
                          </svg>
                          {Math.floor(activity.duration_minutes / 60)}h {activity.duration_minutes % 60 > 0 ? `${activity.duration_minutes % 60}m` : ''}
                        </div>
                        <div className="px-2 py-1 bg-[rgba(0,212,255,0.1)] text-[#00D4FF] rounded-full border border-[rgba(0,212,255,0.2)] font-semibold">
                          ${activity.cost}
                        </div>
                      </div>
                      <p className="text-xs text-[var(--text-tertiary)] mb-4">
                        <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {city?.name}, {city?.country}
                      </p>
                      <Button variant="outline" fullWidth size="sm" onClick={() => toast.success(`Added ${activity.name} to itinerary!`)}>
                        Add to itinerary
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
