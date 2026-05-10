'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

export function Input({ label, error, icon, helperText, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            'glass-input w-full px-3.5 py-2.5 text-sm font-medium transition-colors',
            icon ? 'pl-10' : undefined,
            error ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:shadow-[0_0_0_1px_var(--color-error)]' : undefined,
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs font-medium" style={{ color: 'var(--color-error)' }}>{error}</p>}
      {helperText && !error && <p className="text-xs font-medium text-[var(--text-tertiary)]">{helperText}</p>}
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextArea({ label, error, className, id, ...props }: TextAreaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn('glass-input w-full px-3.5 py-2.5 text-sm font-medium transition-colors resize-none min-h-[100px]', className)}
        {...props}
      />
      {error && <p className="text-xs font-medium" style={{ color: 'var(--color-error)' }}>{error}</p>}
    </div>
  );
}
