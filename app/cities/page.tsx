'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/Alert';
import { EmptyState } from '@/components/ui/EmptyState';
import { useCities } from '@/lib/hooks/useCities';

const regions = ['All', 'Europe', 'Asia', 'North America', 'Middle East', 'Africa', 'South America', 'Oceania'];

export default function CitiesExplorer() {
  const { cities, loading, error, refresh } = useCities();
  const [search, setSearch] = useState('');
  const [activeRegion, setActiveRegion] = useState('All');

  const filteredCities = useMemo(() => {
    return cities.filter(city => {
      const matchesRegion = activeRegion === 'All' || city.region === activeRegion;
      const matchesSearch = city.name.toLowerCase().includes(search.toLowerCase()) ||
        city.country.toLowerCase().includes(search.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [cities, activeRegion, search]);

  if (loading) return <PageSkeleton />;

  if (error) {
    return (
      <div className="container-custom py-12">
        <Alert
          title="Unable to load cities"
          description={error}
          variant="error"
          className="mb-6"
        />
        <Button variant="primary" onClick={refresh}>Try again</Button>
      </div>
    );
  }

  return (
    <div className="container-custom page-content animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4 text-balance">Explore destinations built for real travel planning</h1>
        <p className="text-lg text-[var(--text-secondary)] mb-8">
          Discover ideal cities, compare average costs, and add destinations quickly to your next itinerary.
        </p>

        <div className="relative max-w-xl mx-auto">
          <Input
            placeholder="Search by city or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full py-4 pl-12 text-lg shadow-lg border-[rgba(0,212,255,0.3)] bg-[rgba(10,22,40,0.85)]"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
        {regions.map(region => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
              activeRegion === region
                ? 'bg-[#00D4FF] text-[#0A1628] shadow-sm'
                : 'bg-[rgba(255,255,255,0.05)] text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {filteredCities.length === 0 ? (
        <EmptyState
          icon={<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>}
          title="No destinations found"
          description="Try another region or search term to discover more locations."
          primaryAction={<Button variant="primary" onClick={() => setSearch('')}>Clear search</Button>}
        />
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCities.map((city, i) => (
              <motion.div
                key={city.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <Card padding="none" className="h-full overflow-hidden group">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={city.image_url}
                      alt={city.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    {city.popularity_score > 90 && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="warm" size="sm">Popular</Badge>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold font-display leading-tight text-white">{city.flag_emoji} {city.name}</h3>
                      <p className="text-sm text-white/75">{city.country}</p>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-sm line-clamp-2 mb-4 text-[var(--text-secondary)]">
                      {city.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs font-mono px-2 py-1 bg-[rgba(255,255,255,0.05)] rounded border border-white/5">
                        Avg: ${city.avg_daily_cost}/day
                      </div>
                      <span className="text-xs text-[var(--text-tertiary)]">{city.region}</span>
                    </div>
                    <Button variant="secondary" fullWidth size="sm">
                      Add to trip
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}

      <div className="mt-12 text-center text-sm text-[var(--text-tertiary)]">
        Want a custom destination list? <Link href="/trips" className="text-[#00D4FF] hover:underline">Build a trip plan</Link> and the system will suggest cities for you.
      </div>
    </div>
  );
}
