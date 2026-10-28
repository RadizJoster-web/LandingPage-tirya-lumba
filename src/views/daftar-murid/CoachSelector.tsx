import React, { useState } from 'react';
import { AvailableInstructor } from '@/types';
import { CoachCard } from './CoachCard';
import { CoachDetailModal } from './CoachDetailModal';

interface CoachSelectorProps {
  sessionReady: boolean;
  availableCoaches: AvailableInstructor[];
  isLoading: boolean;
  coachId: string;
  setCoachId: (id: string) => void;
}

export const CoachSelector: React.FC<CoachSelectorProps> = ({
  sessionReady,
  availableCoaches,
  isLoading,
  coachId,
  setCoachId,
}) => {
  const [activeCoachDetail, setActiveCoachDetail] = useState<AvailableInstructor | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Pilih Guru / Pelatih Renang *
        </label>
        {sessionReady && !isLoading && availableCoaches.length > 0 && (
          <span className="text-[11px] text-slate-400">
            {availableCoaches.length} pelatih tersedia
          </span>
        )}
      </div>

      {!sessionReady ? (
        <p className="text-xs text-slate-400 italic bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 dark:bg-slate-900 dark:border-slate-800">
          Tentukan kolam, tanggal, dan sesi jam latihan terlebih dahulu untuk memfilter pelatih yang bertugas.
        </p>
      ) : isLoading ? (
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-2.5 text-xs text-slate-500">
          <span className="w-4 h-4 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
          <span>Memeriksa ketersediaan kuota pelatih...</span>
        </div>
      ) : availableCoaches.length === 0 ? (
        <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl text-xs font-medium text-amber-800">
          Belum ada pelatih yang tersedia pada sesi dan lokasi ini (kuota penuh atau jadwal terisi). Silakan pilih sesi atau kolam lain.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto p-0.5">
          {availableCoaches.map((coach) => (
            <CoachCard
              key={coach.instructorId}
              coach={coach}
              selected={coachId === coach.instructorId}
              onSelect={setCoachId}
              onDetail={setActiveCoachDetail}
            />
          ))}
        </div>
      )}

      <CoachDetailModal
        coach={activeCoachDetail}
        onClose={() => setActiveCoachDetail(null)}
        onSelect={setCoachId}
      />
    </div>
  );
};
