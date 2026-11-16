'use client';

import React from 'react';

export interface StatItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ProfileStatsRowProps {
  stats: StatItem[];
  actionButton?: React.ReactNode;
}

export const ProfileStatsRow: React.FC<ProfileStatsRowProps> = ({ stats, actionButton }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 py-5 px-5 sm:px-6 my-6 rounded-2xl bg-white/70 border border-slate-200/60 shadow-xs backdrop-blur-md dark:bg-slate-900/60 dark:border-slate-800">
      {/* Metrics group with clean vertical dividers */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 dark:divide-slate-800">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`space-y-0.5 min-w-0 ${
              idx > 0 ? 'pt-3 sm:pt-0 sm:pl-6' : ''
            }`}
          >
            <p
              className={`font-heading font-extrabold text-base sm:text-lg tracking-tight tabular-nums truncate ${
                stat.highlight
                  ? 'text-[#0077B6] dark:text-sky-300'
                  : 'text-[#1D3557] dark:text-slate-100'
              }`}
            >
              {stat.value}
            </p>
            <span className="block text-[11px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider truncate">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Signature Pill Button on the right (matching reference "Get in touch") */}
      {actionButton && (
        <div className="shrink-0 self-start sm:self-center lg:self-center w-full sm:w-auto">
          {actionButton}
        </div>
      )}
    </div>
  );
};
