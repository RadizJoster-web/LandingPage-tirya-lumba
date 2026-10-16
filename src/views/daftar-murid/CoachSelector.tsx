import React from 'react';
import { Instructor } from '@/types';

interface CoachSelectorProps {
  startDate: string;
  availableCoaches: Instructor[];
  coachName: string;
  setCoachName: (name: string) => void;
}

export const CoachSelector: React.FC<CoachSelectorProps> = ({
  startDate,
  availableCoaches,
  coachName,
  setCoachName,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1D3557] mb-2">
        Pilih Guru / Pelatih Renang Tersedia *
      </label>
      {!startDate ? (
        <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-lg border border-slate-200">
          Silakan tentukan tanggal dan jam pertemuan terlebih dahulu untuk memfilter pelatih yang bertugas.
        </p>
      ) : availableCoaches.length === 0 ? (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs font-semibold text-amber-800">
          ⚠️ Di hari dan jam segitu belum ada guru yang tersedia di kolam ini. Silakan coba pilih hari atau jam lain.
        </div>
      ) : (
        <div className="space-y-2">
          {availableCoaches.map((c) => (
            <label
              key={c.id}
              className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${
                coachName === c.name
                  ? 'border-[#00B4D8] bg-[#E0FBFC]/50 shadow-xs'
                  : 'border-gray-200 bg-white hover:border-[#00B4D8]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="coach"
                  value={c.name}
                  checked={coachName === c.name}
                  onChange={() => setCoachName(c.name)}
                  className="text-[#00B4D8] focus:ring-[#00B4D8]"
                />
                <div>
                  <p className="font-bold text-sm text-[#1D3557]">{c.name}</p>
                  <p className="text-xs text-slate-500">{c.license}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#0077B6] bg-white px-2.5 py-1 rounded-full border border-blue-100">
                Siap Mengajar
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
