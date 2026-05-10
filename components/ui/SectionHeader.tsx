'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-4 md:flex-row md:items-end md:justify-between', className)}>
      <div>
        <div className="text-sm uppercase tracking-[0.35em] font-semibold text-[var(--text-tertiary)] mb-1">
          {subtitle}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
