import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'azure' | 'coral' | 'success' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'azure',
  children,
  ...props
}) => {
  const variants = {
    azure: 'bg-[#E0FBFC] text-[#0077B6] border border-[#00B4D8]/20',
    coral: 'bg-[#FF6F59]/15 text-[#FF6F59] border border-[#FF6F59]/30',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    neutral: 'bg-gray-100 text-gray-700 border border-gray-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
