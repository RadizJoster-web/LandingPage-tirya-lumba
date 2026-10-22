import React from 'react';
import { Location, SessionSlot } from '@/types';

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
}

export const ScheduleMatrixTable: React.FC<ScheduleMatrixTableProps> = ({
  selectedPools,
  sessionMap,
  selectedSlots,
  onToggleSlot,
}) => {
  return (
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
                        <th key={day} className="font-semibold text-slate-600 px-1.5 py-2 text-center">
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
                              <td key={day} className="text-center text-slate-300 px-1.5 py-2" title="Tidak ada sesi pada hari ini">
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
  );
};
