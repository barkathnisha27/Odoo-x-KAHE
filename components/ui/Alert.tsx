'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface AlertProps {
  title: string;
  description?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
}

const variantStyles: Record<NonNullable<AlertProps['variant']>, string> = {
  info: 'bg-[rgba(59,130,246,0.12)] border-[rgba(59,130,246,0.25)] text-[#93C5FD]',
  success: 'bg-[rgba(16,185,129,0.12)] border-[rgba(16,185,129,0.25)] text-[#6EE7B7]',
  warning: 'bg-[rgba(245,158,11,0.12)] border-[rgba(245,158,11,0.25)] text-[#FBBF24]',
  error: 'bg-[rgba(239,68,68,0.12)] border-[rgba(239,68,68,0.25)] text-[#FCA5A5]',
};

export function Alert({ title, description, variant = 'info', className }: AlertProps) {
  return (
    <div className={cn('rounded-2xl border px-5 py-4', variantStyles[variant], className)}>
      <p className="font-semibold">{title}</p>
      {description ? <p className="mt-1 text-sm" style={{ color: 'inherit' }}>{description}</p> : null}
    </div>
  );
}
