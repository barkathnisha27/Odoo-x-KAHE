'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { activities } from '@/data/activities';
import { getCityById } from '@/data/cities';
import toast from 'react-hot-toast';

export default function ActivitiesBrowser() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'adventure', 'food', 'nightlife', 'shopping', 'culture', 'sightseeing'];

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = activeCategory === 'All' || activity.category === activeCategory;
    const matchesSearch = activity.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container-custom py-8 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Discover Experiences</h1>
        <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
          Find and book the best activities for your itinerary.
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <Input 
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full py-4 pl-12 text-lg shadow-lg"
            icon={<span className="text-xl">🔍</span>}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
              activeCategory === category 
                ? 'bg-gradient-to-r from-[#00D4FF] to-[#0099FF] text-[#0A1628] shadow-md' 
                : 'bg-[rgba(255,255,255,0.05)] text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredActivities.map((activity, i) => {
            const city = getCityById(activity.city_id);
            return (
              <motion.div
                key={activity.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card padding="none" className="h-full overflow-hidden group flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={activity.image_url} 
                      alt={activity.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge variant="default" size="sm" className="bg-black/40 backdrop-blur-md border-none capitalize">
                        {activity.category}
                      </Badge>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                      <div>
                        <div className="flex items-center gap-1 text-[#F59E0B] text-sm font-bold mb-1">
                          <span>★</span> {activity.rating}
                        </div>
                        <h3 className="text-lg font-bold font-display leading-tight text-white">{activity.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-sm line-clamp-2 mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4 text-xs font-mono">
                      <div className="px-2 py-1 bg-[rgba(255,255,255,0.05)] rounded border border-white/5 flex items-center gap-1 text-[var(--text-secondary)]">
                        <span>⏱️</span> {Math.floor(activity.duration_minutes / 60)}h {activity.duration_minutes % 60 > 0 ? `${activity.duration_minutes % 60}m` : ''}
                      </div>
                      <div className="px-2 py-1 bg-[rgba(0,212,255,0.1)] text-[#00D4FF] rounded border border-[rgba(0,212,255,0.2)] font-bold">
                        ${activity.cost}
                      </div>
                    </div>

                    <div className="text-xs text-[var(--text-tertiary)] mb-4 flex items-center gap-1">
                      <span>📍</span> {city?.name}, {city?.country}
                    </div>

                    <Button variant="outline" fullWidth size="sm" onClick={() => toast.success(`Added ${activity.name} to itinerary!`)}>
                      Add to Itinerary
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>
    </div>
  );
}
