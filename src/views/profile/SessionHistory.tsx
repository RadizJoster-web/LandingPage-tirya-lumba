import React from 'react';
import { DAYS_ID } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface SessionHistoryProps {
  completedSessions: number;
  totalSessions: number;
  sessionDates: Date[];
  startTime: string;
  coachName: string;
  onIncrement: () => void;
  onReset: () => void;
}

export const SessionHistory: React.FC<SessionHistoryProps> = ({
  completedSessions,
  totalSessions,
  sessionDates,
  startTime,
  coachName,
  onIncrement,
  onReset,
}) => {
  return (
    <Card variant="dashboard" className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-heading font-bold text-lg text-[#1D3557]">
            Riwayat & Jadwal 8 Pertemuan
          </h3>
          <p className="text-xs text-slate-500">
            Daftar absensi per sesi. Pelatih akan memperbarui status kehadiran setelah latihan selesai.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            isFullRounded={false}
            onClick={onIncrement}
            disabled={completedSessions >= totalSessions}
          >
            +1 Sesi Selesai (Demo)
          </Button>
          {completedSessions > 0 && (
            <Button variant="ghost" size="sm" isFullRounded={false} onClick={onReset}>
              Reset
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 border-b border-gray-200">
            <tr>
              <th className="p-3">Sesi</th>
              <th className="p-3">Tanggal Pelaksanaan</th>
              <th className="p-3">Hari & Jam</th>
              <th className="p-3">Instruktur</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sessionDates.map((dateObj, idx) => {
              const isDone = idx < completedSessions;
              const dayName = DAYS_ID[dateObj.getDay()];
              const dateFormatted = dateObj.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              });

              return (
                <tr key={idx} className={isDone ? 'bg-emerald-50/30' : 'hover:bg-slate-50'}>
                  <td className="p-3 font-semibold text-slate-700">Pertemuan #{idx + 1}</td>
                  <td className="p-3 text-slate-600">{dateFormatted}</td>
                  <td className="p-3 text-slate-600">{dayName}, {startTime} WIB</td>
                  <td className="p-3 text-slate-600">{coachName}</td>
                  <td className="p-3 text-center">
                    {isDone ? <Badge variant="success">Selesai</Badge> : <Badge variant="neutral">Terjadwal</Badge>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
