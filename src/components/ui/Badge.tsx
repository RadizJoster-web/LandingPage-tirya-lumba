import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'azure' | 'coral' | 'success' | 'neutral' | 'outline' | 'slate';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'azure',
  size = 'md',
  children,
  ...props
}) => {
  const variants = {
    azure: 'bg-[#E0FBFC] text-[#0077B6] border border-[#00B4D8]/30',
    coral: 'bg-[#FF6F59]/10 text-[#FF6F59] border border-[#FF6F59]/20',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    outline: 'bg-transparent text-[#1D3557] border border-slate-200',
    slate: 'bg-slate-50 text-slate-600 border border-slate-200/60',
  };

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5 font-medium',
    md: 'text-xs px-3 py-1 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full tracking-wide transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
