import React, { useMemo } from 'react';
import { GuruStep3Props } from './types';
import { Button } from '@/components/ui/Button';

/** Urutan kolom grid: Senin → Minggu (bukan urutan enum hari API). */
const WEEK_ORDER = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

interface SessionRow {
  name: string;
  startTime: string;
  endTime: string;
  /** Nama sesi per hari yang tersedia di server. */
  byDay: Map<string, string>;
}

function buildRows(sessions: { dayOfWeek: string; sessionName: string; startTime: string; endTime: string }[]) {
  const rows = new Map<string, SessionRow>();
  for (const session of sessions) {
    const row = rows.get(session.sessionName) ?? {
      name: session.sessionName,
      startTime: session.startTime,
      endTime: session.endTime,
      byDay: new Map<string, string>(),
    };
    row.byDay.set(session.dayOfWeek, session.sessionName);
    rows.set(session.sessionName, row);
  }
  return Array.from(rows.values()).sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export const StepKolamJadwal: React.FC<GuruStep3Props> = ({
  areas,
  locations,
  selectedLocationIds,
  onToggleLocation,
  sessionMap,
  sessionsLoading,
  selectedSlots,
  onToggleSlot,
  slotCount,
  errorMsg,
  isSubmitting,
  onSubmit,
  onBack,
}) => {
  const poolsByArea = useMemo(
    () =>
      areas.map((area) => ({
        area,
        pools: locations.filter((location) => location.areaId === area.id),
      })),
    [areas, locations],
  );

  const selectedPools = useMemo(
    () => locations.filter((location) => selectedLocationIds.includes(location.id)),
    [locations, selectedLocationIds],
  );

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <label className="block text-sm font-semibold text-[#1D3557]">
            1. Pilih Kolam yang Anda Sanggupi *
          </label>
          <span className="text-xs text-[#0077B6] font-medium">
            Boleh lebih dari satu kolam
          </span>
        </div>

        <div className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-xl max-h-72 overflow-y-auto">
          {poolsByArea.map(({ area, pools }) =>
            pools.length === 0 ? null : (
              <fieldset key={area.id}>
                <legend className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                  {area.name}
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pools.map((pool) => (
                    <label
                      key={pool.id}
                      className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-[#1D3557] cursor-pointer hover:border-[#00B4D8] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLocationIds.includes(pool.id)}
                        onChange={() => onToggleLocation(pool.id)}
                        className="accent-[#00B4D8] w-4 h-4"
                      />
                      <span className="truncate">{pool.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ),
          )}
          {areas.length === 0 && (
            <p className="text-xs text-slate-500 italic">
              Tidak dapat menghubungi server. Muat ulang halaman untuk mencoba lagi.
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <label className="block text-sm font-semibold text-[#1D3557]">
            2. Centang Jadwal Mengajar *
          </label>
          <span className="text-xs text-slate-500">
            {slotCount} jadwal dipilih
          </span>
        </div>

        {selectedPools.length === 0 ? (
          <p className="text-xs text-slate-500 italic bg-white p-3 rounded-lg border border-slate-200">
            Pilih minimal satu kolam untuk menampilkan sesi hari dan jam.
          </p>
        ) : sessionsLoading ? (
          <p className="text-xs text-slate-500 italic bg-white p-3 rounded-lg border border-slate-200">
            Memuat sesi dari server…
          </p>
        ) : (
          <div className="space-y-5">
            {selectedPools.map((pool) => {
              const rows = buildRows(sessionMap[pool.id] ?? []);
              return (
                <div key={pool.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="px-3.5 py-2.5 bg-[#E0FBFC]/60 border-b border-slate-200">
                    <p className="text-sm font-bold text-[#0077B6]">{pool.name}</p>
                  </div>

                  {rows.length === 0 ? (
                    <p className="p-3 text-xs text-slate-500 italic">
                      Belum ada sesi terdaftar untuk kolam ini.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="text-left font-semibold text-slate-600 px-3 py-2 whitespace-nowrap">
                              Sesi
                            </th>
                            {WEEK_ORDER.map((day) => (
                              <th
                                key={day}
                                className="font-semibold text-slate-600 px-1.5 py-2 text-center"
                              >
                                {day.slice(0, 3)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row) => (
                            <tr key={row.name} className="border-t border-slate-100">
                              <td className="px-3 py-2 whitespace-nowrap">
                                <span className="font-medium text-[#1D3557]">{row.name}</span>
                                <span className="block text-[11px] text-slate-400">
                                  {row.startTime}–{row.endTime}
                                </span>
                              </td>
                              {WEEK_ORDER.map((day) => {
                                const sessionName = row.byDay.get(day);
                                if (!sessionName) {
                                  return (
                                    <td
                                      key={day}
                                      className="text-center text-slate-300 px-1.5 py-2"
                                      title="Tidak ada sesi pada hari ini"
                                    >
                                      –
                                    </td>
                                  );
                                }
                                const key = `${pool.id}|${day}|${sessionName}`;
                                return (
                                  <td key={day} className="text-center px-1.5 py-2">
                                    <input
                                      type="checkbox"
                                      checked={selectedSlots.includes(key)}
                                      onChange={() => onToggleSlot(key)}
                                      aria-label={`${pool.name} ${day} ${sessionName}`}
                                      className="accent-[#00B4D8] w-4 h-4 cursor-pointer"
                                    />
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-[#FF6F59]">
          {errorMsg}
        </div>
      )}

      <div className="pt-2 flex items-center justify-between gap-3">
        <Button type="button" variant="outline" size="md" onClick={onBack} disabled={isSubmitting}>
          ← Kembali
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          disabled={slotCount === 0}
        >
          Kirim Pendaftaran Pelatih
        </Button>
      </div>
    </form>
  );
};
