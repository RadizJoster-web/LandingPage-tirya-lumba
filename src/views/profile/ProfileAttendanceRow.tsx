'use client';

import React, { useEffect, useState } from 'react';
import { request, toErrorMessage } from '@/lib/http';
import { formatDateId } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, ClipboardList, Clock } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  locationName: string;
  status: string;
}

export const ProfileAttendanceRow: React.FC = () => {
  const [attendances, setAttendances] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let active = true;
    request<AttendanceRecord[]>('/attendances/my-history', { method: 'GET' })
      .then((res) => {
        if (active) setAttendances(res.data ?? []);
      })
      .catch((err) => {
        if (active) setErrorMsg(toErrorMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="py-6 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 sm:gap-8">
      <div className="sm:w-1/3 space-y-1">
        <div className="flex items-center gap-1.5">
          <ClipboardList className="w-4 h-4 text-[#0077B6]" />
          <h3 className="font-heading text-sm font-bold text-[#1D3557] dark:text-slate-100">
            Presensi &amp; Riwayat Latihan
          </h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Log pencatatan kehadiran resmi dari instruktur pada setiap sesi latihan renang Anda.
        </p>
      </div>

      <div className="sm:w-2/3 space-y-2.5">
        {loading ? (
          <div className="py-4 flex items-center gap-2 text-xs text-slate-400">
            <span className="w-3.5 h-3.5 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
            <span>Memuat data riwayat presensi...</span>
          </div>
        ) : errorMsg ? (
          <p className="text-xs text-rose-600 bg-rose-50/60 p-3 rounded-xl border border-rose-100">
            {errorMsg}
          </p>
        ) : attendances.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-4 text-xs text-slate-400 text-center dark:bg-slate-800/40 dark:border-slate-700 space-y-1">
            <Clock className="w-5 h-5 text-slate-300 mx-auto" />
            <p className="font-semibold text-slate-600 dark:text-slate-300">
              Belum Ada Catatan Presensi
            </p>
            <p className="text-[11px] text-slate-400">
              Kehadiran Anda akan dicatat otomatis oleh pelatih setelah setiap sesi latihan selesai.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {attendances.map((att, idx) => {
              const isHadir = att.status?.toLowerCase() === 'hadir';
              const meetNumber = attendances.length - idx;

              return (
                <div
                  key={att.id}
                  className="flex items-center justify-between p-3 rounded-2xl border border-slate-200/70 bg-white/70 shadow-2xs backdrop-blur-xs text-xs dark:bg-slate-800/60 dark:border-slate-700/60"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-heading font-bold text-[11px] text-[#0077B6] bg-[#E0FBFC]/60 px-2 py-0.5 rounded-full">
                      #{meetNumber}
                    </span>
                    <span className="font-bold text-[#1D3557] dark:text-slate-100">
                      {formatDateId(att.date)}
                    </span>
                    <span className="text-slate-400 hidden sm:inline">• {att.locationName}</span>
                  </div>
                  <Badge
                    variant={isHadir ? 'success' : 'coral'}
                    size="sm"
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {att.status || 'Hadir'}
                  </Badge>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
