import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isFullRounded?: boolean; // Landing page uses rounded-full, dashboard/forms use rounded-lg
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isFullRounded = true,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium tracking-normal transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:ring-offset-2 active:scale-[0.98]';

    const variants = {
      primary:
        'bg-[#00B4D8] hover:bg-[#0077B6] text-white shadow-sm hover:shadow-md hover:shadow-cyan-500/20',
      outline:
        'bg-transparent border border-slate-200 text-[#0077B6] hover:bg-[#E0FBFC]/50 hover:border-[#0077B6] dark:border-slate-700 dark:text-sky-300',
      danger:
        'bg-[#FF6F59] hover:bg-rose-600 text-white shadow-sm hover:shadow-md hover:shadow-rose-500/20',
      secondary:
        'bg-[#E0FBFC] text-[#0077B6] hover:bg-[#cbf7fa] hover:text-[#005f92]',
      ghost:
        'bg-transparent text-[#1D3557] hover:bg-slate-100/80 hover:text-[#0077B6]',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 h-8 gap-1.5',
      md: 'text-sm px-5 py-2.5 h-10 gap-2',
      lg: 'text-base px-6 py-3 h-12 gap-2.5',
    };

    const roundedClass = isFullRounded ? 'rounded-full' : 'rounded-lg';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], roundedClass, className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
