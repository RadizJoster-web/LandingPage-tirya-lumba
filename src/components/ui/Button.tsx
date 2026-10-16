import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isFullRounded?: boolean; // Landing page uses rounded-full, dashboard uses rounded-lg
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
      'inline-flex items-center justify-center font-semibold transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:ring-offset-2';

    const variants = {
      primary: 'bg-[#00B4D8] hover:bg-[#0077B6] text-white shadow-sm hover:shadow-md',
      outline:
        'bg-transparent border-2 border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6] hover:text-white',
      danger: 'bg-[#FF6F59] hover:bg-red-600 text-white shadow-sm',
      secondary: 'bg-[#E0FBFC] text-[#0077B6] hover:bg-[#c9f5f7]',
      ghost: 'bg-transparent text-[#0077B6] hover:bg-[#E0FBFC]/50',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5',
      md: 'text-sm sm:text-base px-5 py-2.5',
      lg: 'text-base sm:text-lg px-7 py-3.5',
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
