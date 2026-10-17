import React from 'react';
import { AvailableInstructor } from '@/types';
import { mediaUrl } from '@/lib/utils';

interface CoachSelectorProps {
  sessionReady: boolean;
  availableCoaches: AvailableInstructor[];
  isLoading: boolean;
  coachId: string;
  setCoachId: (id: string) => void;
}

/** Daftar guru aktif dari GET /api/instructor/available, lengkap dengan sisa kapasitas kelas. */
export const CoachSelector: React.FC<CoachSelectorProps> = ({
  sessionReady,
  availableCoaches,
  isLoading,
  coachId,
  setCoachId,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1D3557] mb-2">
        Pilih Guru / Pelatih Renang Tersedia *
      </label>

      {!sessionReady ? (
        <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-lg border border-slate-200">
          Silakan tentukan kolam, tanggal, dan sesi pertemuan terlebih dahulu untuk memfilter pelatih yang bertugas.
        </p>
      ) : isLoading ? (
        <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
          Memuat pelatih tersedia…
        </p>
      ) : availableCoaches.length === 0 ? (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs font-semibold text-amber-800">
          ⚠️ Belum ada guru yang tersedia di kolam ini pada sesi tersebut. Silakan pilih sesi atau kolam lain.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto p-1">
          {availableCoaches.map((coach) => {
            const avatar = mediaUrl(coach.profilePictureUrl);
            const remaining = Math.max(0, coach.maxCapacity - coach.currentStudentCount);
            const selected = coachId === coach.instructorId;

            return (
              <label
                key={coach.instructorId}
                className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                  selected
                    ? 'bg-[#E0FBFC] border-[#00B4D8] ring-1 ring-[#00B4D8]'
                    : 'bg-white border-gray-200 hover:border-[#00B4D8]'
                }`}
              >
                <input
                  type="radio"
                  name="coach"
                  className="sr-only"
                  checked={selected}
                  onChange={() => setCoachId(coach.instructorId)}
                />
                {avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element -- URL dinamis dari server.
                  <img
                    src={avatar}
                    alt={`Foto ${coach.fullName}`}
                    className="w-11 h-11 rounded-full object-cover shrink-0 border border-slate-200"
                  />
                ) : (
                  <span className="w-11 h-11 rounded-full bg-[#E0FBFC] text-[#0077B6] flex items-center justify-center text-xl shrink-0">
                    🏊‍♂️
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-[#1D3557] truncate">
                    {coach.fullName}
                  </span>
                  <span className="block text-[11px] text-slate-500 truncate">
                    {coach.license || 'Pelatih Tirya Lumba'}
                    {coach.experience ? ` • ${coach.experience}` : ''}
                  </span>
                  <span
                    className={`block text-[11px] font-semibold ${
                      remaining > 0 ? 'text-emerald-600' : 'text-[#FF6F59]'
                    }`}
                  >
                    {remaining > 0
                      ? `Sisa ${remaining} dari ${coach.maxCapacity} kuota`
                      : 'Kuota kelas penuh'}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};
