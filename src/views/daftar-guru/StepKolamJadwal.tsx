import React from 'react';
import { GuruStep3Props } from './types';
import { INITIAL_POOLS, DAYS_ID, SESSIONS_ID } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export const StepKolamJadwal: React.FC<GuruStep3Props> = ({
  selectedPoolIds,
  togglePoolSelection,
  availableSlots,
  toggleSlot,
  isSubmitting,
  onSubmit,
  onBack,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-[#1D3557]">
            Pilih Kolam Tempat Mengajar *
          </label>
          <span className="text-xs text-[#0077B6] font-medium">
            (Semakin banyak, semakin besar kesempatan Anda mengajar)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-1 border border-slate-200 rounded-xl">
          {INITIAL_POOLS.map((p) => {
            const isChecked = selectedPoolIds.includes(p.id);
            return (
              <label
                key={p.id}
                onClick={() => togglePoolSelection(p.id)}
                className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-[#E0FBFC]/60 border-[#00B4D8] text-[#0077B6] font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-[#00B4D8]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-0.5 rounded text-[#00B4D8] focus:ring-[#00B4D8]"
                />
                <span>{p.name}</span>
              </label>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 mt-1.5">
          {selectedPoolIds.length} kolam terpilih
        </p>
      </div>

      {/* Day & Session Availability Matrix */}
      <div>
        <label className="block text-sm font-semibold text-[#1D3557] mb-2">
          Matriks Hari & Sesi Ketersediaan Mengajar *
        </label>
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#E0FBFC]/70 text-[#0077B6] font-bold border-b border-gray-200">
              <tr>
                <th className="p-3">Hari</th>
                {SESSIONS_ID.map((s) => (
                  <th key={s} className="p-3 text-center">
                    {s.split(' ')[0]}
                    <span className="block font-normal text-[10px] text-slate-500">
                      {s.match(/\((.*?)\)/)?.[1]}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {DAYS_ID.map((dayName, dayIdx) => (
                <tr key={dayName} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700">{dayName}</td>
                  {[0, 1, 2].map((sessionIdx) => {
                    const isChecked = availableSlots.includes(`${dayIdx}|${sessionIdx}`);
                    return (
                      <td key={sessionIdx} className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSlot(dayIdx, sessionIdx)}
                          className="w-4 h-4 rounded text-[#00B4D8] focus:ring-[#00B4D8] cursor-pointer"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-1.5">
          {availableSlots.length} slot sesi dipilih
        </p>
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-between">
        <Button
          type="button"
          variant="outline"
          size="md"
          isFullRounded={true}
          onClick={onBack}
          disabled={isSubmitting}
        >
          ← Kembali
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isFullRounded={true}
          className="min-w-[160px] shadow-lg"
          isLoading={isSubmitting}
        >
          Kirim Pendaftaran Pelatih
        </Button>
      </div>
    </form>
  );
};
