'use client';
import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, variant = 'rectangular', width, height }: SkeletonProps) {
  const borderRadius = variant === 'circular' ? '50%' : variant === 'text' ? '4px' : 'var(--radius-md)';
  return (
    <div
      className={`skeleton ${className || ''}`}
      style={{ width, height: height || (variant === 'text' ? '1em' : undefined), borderRadius }}
    />
  );
}

export function TripCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <Skeleton height={200} className="w-full" />
      <div className="p-5 space-y-3">
        <Skeleton variant="text" width="70%" height={24} />
        <Skeleton variant="text" width="50%" height={16} />
        <div className="flex gap-2 mt-3">
          <Skeleton width={60} height={24} />
          <Skeleton width={80} height={24} />
        </div>
        <Skeleton height={6} className="w-full mt-3" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton variant="text" width={80} height={14} />
          <Skeleton variant="text" width={100} height={32} />
        </div>
        <Skeleton variant="circular" width={40} height={40} />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <Skeleton width="40%" height={36} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <StatCardSkeleton key={i} />)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[1,2,3].map(i => <TripCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
