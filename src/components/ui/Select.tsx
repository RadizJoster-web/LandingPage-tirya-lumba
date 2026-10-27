import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, id, children, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full appearance-none px-3.5 py-2.5 bg-white text-[#1D3557] text-sm sm:text-base border border-gray-200 rounded-lg shadow-xs transition-all duration-200 ease-in-out focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed pr-10 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100',
              error && 'border-[#FF6F59] focus:border-[#FF6F59] focus:ring-[#FF6F59]/20',
              className
            )}
            {...props}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {helperText && !error && (
          <p className="mt-1 text-xs text-slate-400">{helperText}</p>
        )}
        {error && <p className="mt-1 text-xs text-[#FF6F59] font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
