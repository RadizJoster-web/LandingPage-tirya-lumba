import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'landing' | 'dashboard' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'landing',
  children,
  ...props
}) => {
  const variants = {
    landing:
      'bg-white rounded-2xl p-6 shadow-lg shadow-blue-900/5 border border-blue-50/60 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10',
    dashboard:
      'bg-white rounded-lg p-5 border border-gray-200 transition-all duration-300 ease-in-out',
    glass:
      'bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg shadow-blue-900/5 border border-white/60 transition-all duration-300 ease-in-out',
  };

  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
};
