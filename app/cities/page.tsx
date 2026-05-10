'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cities, getCitiesByRegion } from '@/data/cities';
import toast from 'react-hot-toast';

export default function CitiesExplorer() {
  const [search, setSearch] = useState('');
  const [activeRegion, setActiveRegion] = useState('All');

  const regions = ['All', 'Europe', 'Asia', 'North America', 'Middle East', 'Africa', 'South America', 'Oceania'];

  const filteredCities = cities.filter(city => {
    const matchesRegion = activeRegion === 'All' || city.region === activeRegion;
    const matchesSearch = city.name.toLowerCase().includes(search.toLowerCase()) || 
                          city.country.toLowerCase().includes(search.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="container-custom py-8 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Explore Destinations</h1>
        <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
          Discover the perfect city for your next adventure.
        </p>
        
        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <Input 
            placeholder="Search by city or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full py-4 pl-12 text-lg shadow-lg border-[rgba(0,212,255,0.3)] bg-[rgba(10,22,40,0.8)]"
            icon={<span className="text-xl">🔍</span>}
          />
        </div>
      </div>

      {/* Region Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {regions.map(region => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeRegion === region 
                ? 'bg-gradient-to-r from-[#00D4FF] to-[#0099FF] text-[#0A1628] shadow-md' 
                : 'bg-[rgba(255,255,255,0.05)] text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCities.map((city, i) => (
            <motion.div
              key={city.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {city.popularity_score > 90 && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="warm" size="sm">🔥 Popular</Badge>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold font-display leading-tight">{city.flag_emoji} {city.name}</h3>
                    <p className="text-sm opacity-80">{city.country}</p>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm line-clamp-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {city.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-mono px-2 py-1 bg-[rgba(255,255,255,0.05)] rounded border border-white/5">
                      Avg: ${city.avg_daily_cost}/day
                    </div>
                    <span className="text-xs text-[var(--text-tertiary)]">{city.region}</span>
                  </div>

                  <Button variant="secondary" fullWidth size="sm" onClick={() => toast.success(`Added ${city.name} to planning board!`)}>
                    Add to Trip
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
