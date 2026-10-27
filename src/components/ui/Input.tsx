import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, rightElement, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full px-3.5 py-2.5 bg-white text-[#1D3557] text-sm sm:text-base border border-gray-200 rounded-lg shadow-xs transition-all duration-200 ease-in-out placeholder:text-slate-400 focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100',
              rightElement ? 'pr-11' : undefined,
              error && 'border-[#FF6F59] focus:border-[#FF6F59] focus:ring-[#FF6F59]/20',
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 flex items-center text-slate-400 hover:text-slate-600">
              {rightElement}
            </div>
          )}
        </div>
        {helperText && !error && (
          <p className="mt-1 text-xs text-slate-400">{helperText}</p>
        )}
        {error && <p className="mt-1 text-xs text-[#FF6F59] font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
