import React, { useEffect, useState } from 'react';
import { request, toErrorMessage } from '@/lib/http';
import { formatDateId } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2 } from 'lucide-react';

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
    return () => { active = false; };
  }, []);

  return (
    <div className="py-6 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 sm:gap-8">
      <div className="sm:w-1/3 space-y-1">
        <h3 className="text-sm font-bold text-[#1D3557] dark:text-slate-100">
          Presensi &amp; Kehadiran
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Catatan presensi resmi dari pelatih pada sesi latihan Anda.
        </p>
      </div>

      <div className="sm:w-2/3 space-y-2">
        {loading ? (
          <div className="py-3 flex items-center gap-2 text-xs text-slate-400">
            <span className="w-3.5 h-3.5 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
            <span>Memuat catatan kehadiran...</span>
          </div>
        ) : errorMsg ? (
          <p className="text-xs text-rose-600">{errorMsg}</p>
        ) : attendances.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-slate-50/60 p-3 text-xs text-slate-400 dark:bg-slate-800/40 dark:border-slate-700">
            Belum ada catatan presensi latihan di kolam mitra.
          </div>
        ) : (
          <div className="space-y-2">
            {attendances.slice(0, 4).map((att) => (
              <div
                key={att.id}
                className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 bg-slate-50/70 text-xs dark:bg-slate-800 dark:border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold text-[#1D3557] dark:text-slate-200">
                    {formatDateId(att.date)}
                  </span>
                  <span className="text-slate-400">• {att.locationName}</span>
                </div>
                <Badge variant="success" size="sm">
                  {att.status || 'Hadir'}
                </Badge>
              </div>
            ))}
            {attendances.length > 4 && (
              <p className="text-[11px] text-slate-400 text-right">
                + {attendances.length - 4} pertemuan terdahulu
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
