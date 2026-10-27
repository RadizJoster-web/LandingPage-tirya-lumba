'use client';

import React, { useEffect, useState } from 'react';
import { request, toErrorMessage } from '@/lib/http';
import { formatDateId } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { ClipboardList } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  locationName: string;
  status: string;
}

export const StudentAttendanceHistory: React.FC = () => {
  const [attendances, setAttendances] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let active = true;

    request<AttendanceRecord[]>('/attendances/my-history', { method: 'GET' })
      .then((res) => {
        if (active) {
          setAttendances(res.data ?? []);
        }
      })
      .catch((err) => {
        if (active) {
          setErrorMsg(toErrorMessage(err));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="rounded-xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs dark:bg-slate-900 dark:border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="font-heading text-lg font-bold text-[#1D3557] dark:text-slate-100">
            Riwayat Log Presensi &amp; Kehadiran
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Catatan kehadiran resmi pada setiap sesi latihan di kolam mitra
          </p>
        </div>
        <span className="text-xs font-semibold text-[#0077B6] bg-[#E0FBFC] px-3 py-1 rounded-full border border-[#00B4D8]/30 self-start sm:self-auto tabular-nums">
          Total: {attendances.length} Pertemuan
        </span>
      </div>

      {loading ? (
        <div className="py-8 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span className="w-4 h-4 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
          <span>Memuat riwayat presensi...</span>
        </div>
      ) : errorMsg ? (
        <p className="text-xs text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100">
          {errorMsg}
        </p>
      ) : attendances.length === 0 ? (
        <div className="text-center py-10 rounded-xl bg-slate-50/60 border border-dashed border-slate-200 dark:bg-slate-800/40 dark:border-slate-700">
          <ClipboardList className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            Belum ada catatan presensi pertemuan renang
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Kehadiran Anda akan dicatat otomatis oleh instruktur setelah setiap sesi selesai.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {/* Tremor-inspired clean table layout */}
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:border-slate-800">
                <th className="py-3 px-3">Sesi Ke</th>
                <th className="py-3 px-3">Tanggal Latihan</th>
                <th className="py-3 px-3">Lokasi Kolam</th>
                <th className="py-3 px-3 text-right">Status Kehadiran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {attendances.map((item, index) => {
                const meetNumber = attendances.length - index;
                const isHadir = item.status?.toLowerCase() === 'hadir';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-bold text-[#1D3557] dark:text-slate-100">
                      #{meetNumber}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                      {formatDateId(item.date)}
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                      {item.locationName}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          isHadir
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isHadir ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
