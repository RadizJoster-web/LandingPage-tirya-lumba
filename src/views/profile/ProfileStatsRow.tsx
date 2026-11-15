import React from 'react';

export interface StatItem {
  label: string;
  value: string;
}

interface ProfileStatsRowProps {
  stats: StatItem[];
}

export const ProfileStatsRow: React.FC<ProfileStatsRowProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-100 dark:border-slate-800 my-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="space-y-0.5 min-w-0">
          <span className="block text-[11px] font-medium text-slate-400 truncate">
            {stat.label}
          </span>
          <p className="font-heading font-bold text-sm sm:text-base text-[#1D3557] dark:text-slate-100 truncate tabular-nums">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};
