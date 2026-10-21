import React from 'react';

/** Kerangka dasbor murid/pelatih: bentuknya terlihat, datanya tidak (blur). */
export const BlurredDashboard: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70">
      <div className="blur-[4px] select-none pointer-events-none space-y-4" aria-hidden="true">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 w-32 rounded bg-slate-300" />
            <div className="h-2 w-20 rounded bg-slate-200" />
          </div>
          <div className="h-8 w-24 rounded-full bg-[#00B4D8]/50" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2 rounded-2xl bg-white p-3">
              <div className="h-2 w-12 rounded bg-slate-200" />
              <div className="h-4 w-16 rounded bg-slate-300" />
            </div>
          ))}
        </div>

        <div className="divide-y divide-slate-100 rounded-2xl bg-white">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5">
              <div className="h-6 w-6 rounded-full bg-slate-200" />
              <div className="h-2 flex-1 rounded bg-slate-200" />
              <div className="h-2 w-14 rounded bg-slate-300" />
            </div>
          ))}
        </div>
      </div>

      <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-xs font-semibold text-[#1D3557]/70 sm:text-sm">
        Dasbor murid / pelatih aktif setelah pendaftaran diverifikasi
      </span>
    </div>
  );
};
