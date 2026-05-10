'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

export function Card({ children, className, hover = true, glow, onClick, padding = 'md' }: CardProps) {
  const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };
  return (
    <div
      className={cn(
        'glass-card',
        paddings[padding],
        hover && 'hover-lift',
        glow && 'hover-glow',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: string;
  color?: string;
}

export function StatCard({ icon, label, value, trend, color = 'var(--color-accent)' }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10" style={{
        background: `radial-gradient(circle, ${color}, transparent)`,
      }} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
          <p className="stat-number text-3xl font-bold" style={{ color }}>{value}</p>
          {trend && (
            <p className="text-xs mt-1 font-medium" style={{ color: 'var(--color-success)' }}>
              {trend}
            </p>
          )}
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </Card>
  );
}
