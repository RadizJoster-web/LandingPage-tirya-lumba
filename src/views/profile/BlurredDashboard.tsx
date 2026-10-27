import React from 'react';

interface BlurredDashboardProps {
  message?: string;
}

export const BlurredDashboard: React.FC<BlurredDashboardProps> = ({
  message = 'Dasbor aktif setelah pendaftaran diverifikasi oleh admin',
}) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-slate-50 p-6 border border-slate-200/80 dark:bg-slate-900/50 dark:border-slate-800">
      <div className="blur-[5px] select-none pointer-events-none space-y-4 opacity-60" aria-hidden="true">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 w-36 rounded bg-slate-300 dark:bg-slate-700" />
            <div className="h-2 w-24 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="h-8 w-28 rounded-lg bg-[#00B4D8]/30" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2 rounded-lg bg-white p-4 border border-slate-200/60 dark:bg-slate-800">
              <div className="h-2 w-16 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-5 w-20 rounded bg-slate-300 dark:bg-slate-600" />
            </div>
          ))}
        </div>

        <div className="divide-y divide-slate-100 rounded-lg bg-white border border-slate-200/60 dark:bg-slate-800 dark:divide-slate-700">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div className="h-2.5 w-32 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-2.5 w-16 rounded bg-slate-300 dark:bg-slate-600" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-6 bg-slate-900/5 backdrop-blur-[2px] dark:bg-slate-950/20">
        <span className="rounded-xl bg-white/95 px-5 py-2.5 text-xs font-semibold text-[#1D3557] shadow-sm border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 text-center">
          {message}
        </span>
      </div>
    </div>
  );
};
