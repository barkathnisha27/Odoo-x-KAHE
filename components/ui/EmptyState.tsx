'use client';
import React from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, primaryAction, secondaryAction, className }: EmptyStateProps) {
  return (
    <Card padding="lg" className={cn('text-center flex flex-col items-center justify-center gap-4', className)}>
      <div className="text-5xl">{icon || '📭'}</div>
      <div>
        <h3 className="text-2xl font-bold font-display mb-2">{title}</h3>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center">
        {primaryAction}
        {secondaryAction}
      </div>
    </Card>
  );
}
