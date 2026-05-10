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
  const paddings = { none: '', sm: 'p-4', md: 'p-8 sm:p-10', lg: 'p-10 sm:p-14' };
  return (
    <div
      className={cn(
        'glass-card overflow-hidden',
        paddings[padding],
        hover && 'hover-lift transition-transform duration-200',
        glow && 'hover:border-[#00D4FF]/30 hover:bg-white/[0.03]',
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
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  color?: string;
}

export function StatCard({ icon, label, value, trend, color = 'var(--color-accent)' }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden group" hover={false}>
      <div className="flex items-start justify-between relative z-[1]">
        <div className="min-w-0 flex-1">
          <p className="text-sm mb-1.5 font-medium truncate" style={{ color: 'var(--text-secondary)' }}>{label}</p>
          <p className="stat-number text-2xl md:text-3xl font-bold tracking-tight text-white">{value}</p>
          {trend && (
            <p className="text-xs mt-2 font-medium" style={{ color: 'var(--color-success)' }}>
              {trend}
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-[10px] bg-[rgba(255,255,255,0.06)] border border-white/5 flex items-center justify-center flex-shrink-0 ml-3" style={{ color }}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
