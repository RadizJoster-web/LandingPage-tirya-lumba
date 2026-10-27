import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'landing' | 'dashboard' | 'glass' | 'form' | 'outer';
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'landing',
  children,
  ...props
}) => {
  const variants = {
    // 16px radius for landing with soft shadow
    landing:
      'bg-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-blue-900/5 border border-slate-200/60 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 dark:bg-slate-900 dark:border-slate-800',
    // 8px radius for dashboard & portal
    dashboard:
      'bg-white rounded-lg p-5 sm:p-6 border border-gray-200/90 shadow-xs transition-all duration-300 ease-in-out dark:bg-slate-900 dark:border-slate-800',
    // Glassmorphic surface
    glass:
      'bg-white/75 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg shadow-blue-900/5 border border-white/60 dark:bg-slate-900/80 dark:border-slate-800/80',
    // Static form card (no hover lift)
    form:
      'bg-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-blue-900/5 border border-slate-100 dark:bg-slate-900 dark:border-slate-800',
    // Outer floating container for layered bento layouts (style.jpg pattern)
    outer:
      'bg-[#F8F9FA] rounded-3xl p-4 sm:p-6 border border-slate-200/50 dark:bg-slate-950 dark:border-slate-800',
  };

  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
};
