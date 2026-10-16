import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-[#1D3557] mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full px-3.5 py-2.5 bg-white text-[#1D3557] text-sm sm:text-base border border-gray-300 rounded-lg shadow-xs transition-all duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
            error && 'border-[#FF6F59] focus:border-[#FF6F59] focus:ring-[#FF6F59]/20',
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p className="mt-1 text-xs text-gray-500">{helperText}</p>
        )}
        {error && <p className="mt-1 text-xs text-[#FF6F59] font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
