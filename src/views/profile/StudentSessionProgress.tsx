import React from 'react';

interface StudentSessionProgressProps {
  activeSessions: number;
  totalSessions?: number;
}

export const StudentSessionProgress: React.FC<StudentSessionProgressProps> = ({
  activeSessions,
  totalSessions = 4,
}) => {
  const safeTotal = Math.max(totalSessions, 1);
  const safeActive = Math.max(0, Math.min(activeSessions, safeTotal));

  return (
    <div className="rounded-xl border border-[#00B4D8]/30 bg-[#E0FBFC]/40 p-4 sm:p-5 flex items-center justify-between gap-4 dark:bg-slate-800/60 dark:border-slate-700">
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0077B6] tabular-nums dark:text-[#00B4D8]">
            {safeActive} Sesi
          </span>
          <span className="text-xs text-slate-500 font-medium dark:text-slate-400">
            tersisa dari {safeTotal} pertemuan
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">
          {safeActive === 0 ? 'Paket kursus telah selesai.' : 'Gunakan kuota sesi sesuai jadwal rutin.'}
        </p>
      </div>

      {/* Deretan Titik Indikator Sesi */}
      <div className="flex items-center gap-1.5 shrink-0" aria-label={`Sisa ${safeActive} dari ${safeTotal} sesi`}>
        {Array.from({ length: safeTotal }).map((_, idx) => {
          const isRemaining = idx < safeActive;
          return (
            <span
              key={idx}
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-200 ${
                isRemaining
                  ? 'bg-[#0077B6] shadow-2xs dark:bg-[#00B4D8]'
                  : 'bg-slate-200 border border-slate-300 dark:bg-slate-700 dark:border-slate-600'
              }`}
              title={isRemaining ? 'Sesi Aktif' : 'Sesi Selesai'}
            />
          );
        })}
      </div>
    </div>
  );
};
