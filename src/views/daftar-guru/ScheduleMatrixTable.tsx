import React from 'react';
import { Location, SessionSlot } from '@/types';
import { Check } from 'lucide-react';

const WEEK_ORDER = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

interface SessionRow {
  name: string;
  startTime: string;
  endTime: string;
  byDay: Map<string, string>;
}

function buildRows(sessions: SessionSlot[]): SessionRow[] {
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

interface ScheduleMatrixTableProps {
  selectedPools: Location[];
  sessionMap: Record<string, SessionSlot[]>;
  selectedSlots: string[];
  onToggleSlot: (key: string) => void;
  lockedSlots?: string[];
}

export const ScheduleMatrixTable: React.FC<ScheduleMatrixTableProps> = ({
  selectedPools,
  sessionMap,
  selectedSlots,
  onToggleSlot,
  lockedSlots = [],
}) => {
  return (
    <div className="space-y-5">
      {selectedPools.map((pool) => {
        const rows = buildRows(sessionMap[pool.id] ?? []);
        return (
          <div key={pool.id} className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs dark:bg-slate-900 dark:border-slate-800">
            <div className="px-4 py-3 bg-[#E0FBFC]/50 border-b border-slate-200/80 flex items-center justify-between dark:bg-slate-800/80 dark:border-slate-700">
              <p className="text-xs font-bold uppercase tracking-wider text-[#0077B6] dark:text-sky-300">
                {pool.name}
              </p>
              <span className="text-[11px] text-slate-400">
                Pilih sesi ketersediaan mengajar
              </span>
            </div>

            {rows.length === 0 ? (
              <p className="p-4 text-xs text-slate-400 italic">
                Belum ada sesi terdaftar untuk kolam ini.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-100 dark:bg-slate-800/40 dark:border-slate-800">
                      <th className="text-left font-semibold text-slate-500 px-3.5 py-2.5 whitespace-nowrap">
                        Sesi Jam
                      </th>
                      {WEEK_ORDER.map((day) => (
                        <th key={day} className="font-semibold text-slate-500 px-1.5 py-2.5 text-center min-w-[54px]">
                          {day.slice(0, 3)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.name} className="border-t border-slate-100 dark:border-slate-800">
                        <td className="px-3.5 py-2.5 whitespace-nowrap">
                          <span className="font-bold text-[#1D3557] dark:text-slate-100">{row.name}</span>
                          <span className="block text-[10px] text-slate-400 tabular-nums">
                            {row.startTime}–{row.endTime}
                          </span>
                        </td>
                        {WEEK_ORDER.map((day) => {
                          const sessionName = row.byDay.get(day);
                          if (!sessionName) {
                            return (
                              <td key={day} className="text-center text-slate-300 px-1 py-2 font-mono">
                                –
                              </td>
                            );
                          }
                          const key = `${pool.id}|${day}|${sessionName}`;
                          const isSelected = selectedSlots.includes(key);
                          const isLocked = lockedSlots.includes(key);

                          return (
                            <td key={day} className="text-center px-1 py-1.5">
                              <button
                                type="button"
                                disabled={isLocked}
                                onClick={() => onToggleSlot(key)}
                                title={isLocked ? 'Slot terkunci: terdapat murid aktif' : `${pool.name} ${day} ${sessionName}`}
                                className={`w-full h-8 rounded-lg text-[11px] font-bold transition-all duration-200 flex items-center justify-center gap-1 border ${
                                  isLocked
                                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-75'
                                    : isSelected
                                      ? 'bg-[#00B4D8] border-[#00B4D8] text-white shadow-xs'
                                      : 'bg-white border-slate-200 text-slate-600 hover:border-[#00B4D8] hover:text-[#0077B6] dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '+'}
                              </button>
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
  );
};
