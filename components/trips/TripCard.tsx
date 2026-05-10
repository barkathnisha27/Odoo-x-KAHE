'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trip } from '@/types/trips';
import { Badge } from '@/components/ui/Badge';
import { formatDateRange, formatCurrency } from '@/lib/utils';
import { getCityById } from '@/data/cities';

interface TripCardProps {
  trip: Trip;
  index?: number;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

export function TripCard({ trip, index = 0, onDelete, onDuplicate }: TripCardProps) {
  const statusVariant: Record<string, 'accent' | 'success' | 'warm' | 'default' | 'error'> = {
    upcoming: 'accent', active: 'success', completed: 'warm', draft: 'default', cancelled: 'error',
  };

  const totalBudget = trip.budget
    ? trip.budget.transport_budget + trip.budget.hotel_budget + trip.budget.food_budget + trip.budget.activity_budget + trip.budget.misc_budget
    : 0;
  const budgetPercent = totalBudget > 0 ? Math.min(100, Math.round((trip.budget?.actual_spent || 0) / totalBudget * 100)) : 0;
  const cityCount = trip.stops?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card overflow-hidden group flex flex-col"
    >
      {/* Cover Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden flex-shrink-0">
        <img
          src={trip.cover_image}
          alt={trip.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.8)] to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant={statusVariant[trip.status] || 'default'}>
            {trip.status}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex gap-1.5">
          {trip.is_public && (
            <span className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-xs" title="Public">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 016 6m-6-6a6 6 0 00-6 6m6-6v12m6-6H6" /></svg>
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-1 font-display truncate">{trip.name}</h3>
        <p className="text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>
          {formatDateRange(trip.start_date, trip.end_date)}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
            {cityCount} {cityCount === 1 ? 'city' : 'cities'}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {trip.traveler_count}
          </span>
          {totalBudget > 0 && (
            <span className="flex items-center gap-1 text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              {formatCurrency(totalBudget, trip.budget?.currency)}
            </span>
          )}
        </div>

        {/* Budget progress */}
        {totalBudget > 0 && (
          <div className="mb-4">
            <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${budgetPercent}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full rounded-full"
                style={{
                  background: budgetPercent > 90
                    ? 'linear-gradient(90deg, #EF4444, #F87171)'
                    : 'linear-gradient(90deg, #00D4FF, #0099FF)',
                }}
              />
            </div>
            <p className="text-[10px] mt-1 font-mono" style={{ color: 'var(--text-tertiary)' }}>
              {budgetPercent}% spent
            </p>
          </div>
        )}

        {/* City avatars */}
        {trip.stops && trip.stops.length > 0 && (
          <div className="flex -space-x-2 mb-4">
            {trip.stops.slice(0, 4).map((stop, idx) => {
              const city = getCityById(stop.city_id);
              return city ? (
                <div
                  key={stop.id}
                  className="w-7 h-7 rounded-full border-2 border-[var(--color-primary)] overflow-hidden"
                  style={{ zIndex: 4 - idx }}
                  title={city.name}
                >
                  <img src={city.image_url} alt={city.name} className="w-full h-full object-cover" />
                </div>
              ) : null;
            })}
            {(trip.stops?.length || 0) > 4 && (
              <div className="w-7 h-7 rounded-full border-2 border-[var(--color-primary)] bg-[rgba(255,255,255,0.1)] flex items-center justify-center text-[10px] font-bold" style={{ zIndex: 0 }}>
                +{(trip.stops?.length || 0) - 4}
              </div>
            )}
          </div>
        )}

        {/* Actions — pushed to bottom */}
        <div className="flex items-center gap-1.5 pt-3 border-t border-white/5 mt-auto">
          <Link
            href={`/itinerary/${trip.id}`}
            className="flex-1 text-center text-xs font-medium py-2 rounded-lg bg-[rgba(0,212,255,0.1)] text-[#00D4FF] hover:bg-[rgba(0,212,255,0.2)] transition-colors"
          >
            View
          </Link>
          <Link
            href={`/budget/${trip.id}`}
            className="flex-1 text-center text-xs font-medium py-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            Budget
          </Link>
          <button
            onClick={() => onDuplicate?.(trip.id)}
            className="px-2 py-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-colors text-sm flex-shrink-0"
            title="Duplicate"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V4a1 1 0 011-1h8a1 1 0 011 1v3M8 7h8m-8 0v12a1 1 0 001 1h6a1 1 0 001-1V7m-8 5h8" /></svg>
          </button>
          <button
            onClick={() => onDelete?.(trip.id)}
            className="px-2 py-2 rounded-lg hover:bg-[rgba(239,68,68,0.1)] transition-colors text-sm flex-shrink-0"
            title="Delete"
          >
            <svg className="w-4 h-4 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m1 0v12a1 1 0 01-1 1H8a1 1 0 01-1-1V7h10z" /></svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
